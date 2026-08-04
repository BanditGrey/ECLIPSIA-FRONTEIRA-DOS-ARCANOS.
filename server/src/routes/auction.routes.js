import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Auction } from '../models/Auction.js';
import { Mail } from '../models/Mail.js';
import { Player } from '../models/Player.js';
import { PLAYER_CREDIT_HELPERS } from '../utils/gameUtils.js';
import { notifyPlayer } from '../utils/notify.js';

export const auctionRoutes = Router();
auctionRoutes.use(authMiddleware);

/** Taxas do leilão (💎 crystals). */
export const AUCTION_LISTING_FEE = 3;
export const AUCTION_TAX_RATE = 0.05;
const DURATIONS_H = [6, 12, 24];

const { addCrystalsToCharacter, removeFromInventory } = PLAYER_CREDIT_HELPERS;

const sanitize = (value, max = 160) => String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);

const currentBid = (auction) => auction.bids[auction.bids.length - 1] ?? null;

const publicAuction = (auction) => ({
  id: auction._id.toString(),
  itemStr: auction.itemStr,
  sellerName: auction.sellerName,
  startPrice: auction.startPrice,
  minIncrement: auction.minIncrement,
  bids: auction.bids.map((bid) => ({ name: bid.name, amount: bid.amount, at: bid.at })),
  currentBid: currentBid(auction),
  expiresAt: auction.expiresAt,
  status: auction.status,
  winnerName: auction.winnerName,
  finalAmount: auction.finalAmount
});

/** Liquidação lazy: leilões expirados são resolvidos na leitura. */
const settleExpired = async () => {
  const expired = await Auction.find({ status: 'active', expiresAt: { $lte: new Date() } });

  for (const auction of expired) {
    const bid = currentBid(auction);

    if (bid) {
      // Vencedor recebe o item por carta; vendedor recebe 💎 líquido do imposto
      await Mail.create({
        fromName: 'Leilão de Eclipsia',
        toName: bid.name,
        subject: 'Você venceu o leilão!',
        message: `Arrematado por ${bid.amount} 💎.`,
        itemStr: auction.itemStr,
        gold: 0
      });

      const net = Math.floor(bid.amount * (1 - AUCTION_TAX_RATE));

      await Mail.create({
        fromName: 'Leilão de Eclipsia',
        toName: auction.sellerName,
        subject: 'Item leiloado',
        message: `Vendido por ${bid.amount} 💎 (recebido: ${net} 💎, imposto: ${bid.amount - net} 💎).`,
        itemStr: null,
        gold: 0,
        crystals: net
      });

      auction.winnerName = bid.name;
      auction.finalAmount = bid.amount;
      notifyPlayer(bid.name, 'auction:won', { itemStr: auction.itemStr, amount: bid.amount });
      notifyPlayer(auction.sellerName, 'auction:sold', { itemStr: auction.itemStr, amount: bid.amount });
    } else {
      // Sem lances: item volta ao vendedor
      await Mail.create({
        fromName: 'Leilão de Eclipsia',
        toName: auction.sellerName,
        subject: 'Leilão sem lances',
        message: 'Seu item voltou para você.',
        itemStr: auction.itemStr,
        gold: 0
      });
    }

    auction.status = 'settled';
    await auction.save();
  }

  return expired.length;
};

/** GET /api/auction/list — leilões ativos (liquida expirados antes). */
auctionRoutes.get('/list', async (_req, res) => {
  try {
    await settleExpired();

    const auctions = await Auction.find({ status: 'active' }).sort({ expiresAt: 1 }).limit(100).lean();

    return res.json({ auctions: auctions.map(publicAuction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar leilões', error: error.message });
  }
});

/** GET /api/auction/my?sellerName= — leilões criados por mim. */
auctionRoutes.get('/my', async (req, res) => {
  try {
    const sellerName = sanitize(req.query.sellerName ?? '', 20);

    if (!sellerName) {
      return res.status(400).json({ message: 'sellerName obrigatório' });
    }

    await settleExpired();

    const auctions = await Auction.find({ sellerName }).sort({ createdAt: -1 }).limit(50).lean();

    return res.json({ auctions: auctions.map(publicAuction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar seus leilões', error: error.message });
  }
});

/** GET /api/auction/bids?name= — leilões em que dei lance (ativos + liquidados). */
auctionRoutes.get('/bids', async (req, res) => {
  try {
    const name = sanitize(req.query.name ?? '', 20);

    if (!name) {
      return res.status(400).json({ message: 'name obrigatório' });
    }

    await settleExpired();

    const auctions = await Auction.find({ 'bids.name': name }).sort({ createdAt: -1 }).limit(50).lean();

    return res.json({ auctions: auctions.map(publicAuction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar seus lances', error: error.message });
  }
});

/** POST /api/auction/create — criar leilão (taxa em 💎, item custodiado). */
auctionRoutes.post('/create', async (req, res) => {
  try {
    const { charName, itemRef, startPrice, minIncrement, durationHours } = req.body ?? {};
    const player = await Player.findOne({ 'characters.name': sanitize(charName, 20) });
    const character = player?.characters.find((c) => c.name === sanitize(charName, 20));

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const price = Math.floor(Number(startPrice));

    if (!Number.isFinite(price) || price < 1 || price > 99_999_999) {
      return res.status(400).json({ message: 'Preço inicial inválido' });
    }

    const increment = Math.max(1, Math.floor(Number(minIncrement) || 1));
    const duration = DURATIONS_H.includes(Number(durationHours)) ? Number(durationHours) : 24;

    if ((character.crystals ?? 0) < AUCTION_LISTING_FEE) {
      return res.status(400).json({ message: `Cristais insuficientes para a taxa (${AUCTION_LISTING_FEE} 💎)` });
    }

    const ref = String(itemRef ?? '');

    if (!removeFromInventory(character, ref, 1)) {
      return res.status(400).json({ message: 'Item não está no inventário' });
    }

    character.crystals = (character.crystals ?? 0) - AUCTION_LISTING_FEE;

    const auction = await Auction.create({
      itemStr: ref,
      sellerId: player._id.toString(),
      sellerName: character.name,
      startPrice: price,
      minIncrement: increment,
      expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000)
    });

    await player.save();

    return res.status(201).json({ auction: publicAuction(auction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar leilão', error: error.message });
  }
});

/** POST /api/auction/bid — dar lance (bloqueia 💎, reembolsa o anterior). */
auctionRoutes.post('/bid', async (req, res) => {
  try {
    const { auctionId, charName, amount } = req.body ?? {};
    const bidderName = sanitize(charName, 20);
    const player = await Player.findOne({ 'characters.name': bidderName });
    const bidder = player?.characters.find((c) => c.name === bidderName);

    if (!bidder) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const auction = await Auction.findById(auctionId);

    if (!auction || auction.status !== 'active') {
      return res.status(404).json({ message: 'Leilão não encontrado ou encerrado' });
    }

    if (auction.expiresAt <= new Date()) {
      await settleExpired();
      return res.status(400).json({ message: 'Leilão expirado' });
    }

    if (auction.sellerName === bidderName) {
      return res.status(400).json({ message: 'Você não pode dar lance no próprio leilão' });
    }

    const bidValue = Math.floor(Number(amount));
    const lastBid = currentBid(auction);
    const minimum = lastBid ? lastBid.amount + auction.minIncrement : auction.startPrice;

    if (!Number.isFinite(bidValue) || bidValue < minimum) {
      return res.status(400).json({ message: `Lance mínimo: ${minimum} 💎` });
    }

    if ((bidder.crystals ?? 0) < bidValue) {
      return res.status(400).json({ message: 'Cristais insuficientes' });
    }

    // Debita do novo licitante
    bidder.crystals = (bidder.crystals ?? 0) - bidValue;
    await player.save();

    // Reembolsa o licitante anterior (direto no personagem; carta se não existir)
    if (lastBid) {
      const refunded = await addCrystalsToCharacter(lastBid.name, lastBid.amount);

      if (!refunded) {
        await Mail.create({
          fromName: 'Leilão de Eclipsia',
          toName: lastBid.name,
          subject: 'Lance coberto — reembolso',
          message: `Seu lance foi coberto. Reembolso: ${lastBid.amount} 💎.`,
          itemStr: null,
          gold: 0,
          crystals: lastBid.amount
        });
      }

      notifyPlayer(lastBid.name, 'auction:outbid', { itemStr: auction.itemStr, amount: bidValue });
    }

    auction.bids.push({ name: bidderName, amount: bidValue });
    await auction.save();

    return res.json({ auction: publicAuction(auction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao dar lance', error: error.message });
  }
});

/** POST /api/auction/cancel — cancelar (só sem lances). */
auctionRoutes.post('/cancel', async (req, res) => {
  try {
    const { auctionId, charName } = req.body ?? {};
    const sellerName = sanitize(charName, 20);
    const auction = await Auction.findById(auctionId);

    if (!auction || auction.status !== 'active' || auction.sellerName !== sellerName) {
      return res.status(404).json({ message: 'Leilão não encontrado' });
    }

    if (auction.bids.length > 0) {
      return res.status(400).json({ message: 'Não é possível cancelar com lances' });
    }

    const player = await Player.findOne({ 'characters.name': sellerName });
    const character = player?.characters.find((c) => c.name === sellerName);

    if (character) {
      PLAYER_CREDIT_HELPERS.addToInventory(character, auction.itemStr, 1, character.maxInventory);
      await player.save();
    }

    auction.status = 'cancelled';
    await auction.save();

    return res.json({ auction: publicAuction(auction) });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cancelar leilão', error: error.message });
  }
});
