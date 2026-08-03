import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Mail } from '../models/Mail.js';
import { MarketListing } from '../models/MarketListing.js';
import { Player } from '../models/Player.js';
import { addToInventory, getNumId, isValidItemRef, removeFromInventory } from '../utils/gameUtils.js';

export const marketRoutes = Router();
marketRoutes.use(authMiddleware);

const RARITIES = new Set(['common', 'uncommon', 'rare', 'epic', 'legendary', 'relic']);

/** GET /api/market/listings?rarity=&numId=&q= — listagens ativas */
marketRoutes.get('/listings', async (req, res) => {
  try {
    const query = { status: 'active', expiresAt: { $gt: new Date() } };

    if (RARITIES.has(req.query.rarity)) {
      query.rarity = req.query.rarity;
    }

    const numId = Number(req.query.numId);

    if (Number.isInteger(numId) && numId > 0) {
      query.numId = numId;
    }

    const listings = await MarketListing.find(query).sort({ createdAt: -1 }).limit(100).lean();

    return res.json({ listings });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar mercado', error: error.message });
  }
});

/** GET /api/market/my?sellerName= — minhas listagens */
marketRoutes.get('/my', async (req, res) => {
  try {
    const sellerName = String(req.query.sellerName ?? '').trim();
    const listings = await MarketListing.find({ sellerName, status: { $in: ['active', 'sold', 'cancelled'] } })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json({ listings });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar suas ofertas', error: error.message });
  }
});

/** POST /api/market/list — colocar item do inventário à venda */
marketRoutes.post('/list', async (req, res) => {
  try {
    const { charName, itemRef, price, rarity } = req.body ?? {};
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    const character = player.characters.find((c) => c.name === String(charName ?? '').trim());

    if (!character) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const ref = String(itemRef ?? '');

    if (!isValidItemRef(ref)) {
      return res.status(400).json({ message: 'Item inválido' });
    }

    const listingPrice = Math.floor(Number(price));

    if (!Number.isFinite(listingPrice) || listingPrice < 1 || listingPrice > 99_999_999) {
      return res.status(400).json({ message: 'Preço inválido' });
    }

    if (!removeFromInventory(character, ref, 1)) {
      return res.status(400).json({ message: 'Item não está no inventário' });
    }

    const listing = await MarketListing.create({
      sellerId: player._id.toString(),
      sellerName: character.name,
      itemStr: ref,
      numId: getNumId(ref),
      rarity: RARITIES.has(rarity) ? rarity : 'common',
      price: listingPrice
    });

    await player.save();

    return res.status(201).json({ listing, character });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar oferta', error: error.message });
  }
});

/** POST /api/market/buy — compra: ouro sai, item entra, vendedor recebe por carta */
marketRoutes.post('/buy', async (req, res) => {
  try {
    const { listingId, charName } = req.body ?? {};
    const player = await Player.findById(req.playerId);
    const listing = await MarketListing.findById(listingId);

    if (!player || !listing) {
      return res.status(404).json({ message: 'Oferta ou player não encontrado' });
    }

    if (listing.status !== 'active') {
      return res.status(400).json({ message: 'Oferta indisponível' });
    }

    const buyer = player.characters.find((c) => c.name === String(charName ?? '').trim());

    if (!buyer) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    if (buyer.gold < listing.price) {
      return res.status(400).json({ message: 'Ouro insuficiente' });
    }

    if (!addToInventory(buyer, listing.itemStr, 1, buyer.maxInventory)) {
      return res.status(400).json({ message: 'Inventário cheio' });
    }

    buyer.gold -= listing.price;
    listing.status = 'sold';
    listing.soldTo = buyer.name;
    await listing.save();

    // Pagamento ao vendedor via correio (sistema de mail já existente)
    await Mail.create({
      fromName: 'Mercado de Eclipsia',
      toName: listing.sellerName,
      subject: 'Item vendido',
      message: `Seu item foi vendido por ${listing.price} de ouro.`,
      itemStr: null,
      gold: listing.price
    });

    await player.save();

    return res.json({ listing, character: buyer });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao comprar', error: error.message });
  }
});

/** POST /api/market/cancel — cancela e devolve o item ao vendedor */
marketRoutes.post('/cancel', async (req, res) => {
  try {
    const { listingId, charName } = req.body ?? {};
    const player = await Player.findById(req.playerId);
    const listing = await MarketListing.findById(listingId);

    if (!player || !listing) {
      return res.status(404).json({ message: 'Oferta ou player não encontrado' });
    }

    if (listing.status !== 'active') {
      return res.status(400).json({ message: 'Oferta indisponível' });
    }

    const character = player.characters.find((c) => c.name === String(charName ?? '').trim());

    if (!character || listing.sellerName !== character.name) {
      return res.status(403).json({ message: 'Esta oferta não é sua' });
    }

    if (!addToInventory(character, listing.itemStr, 1, character.maxInventory)) {
      return res.status(400).json({ message: 'Inventário cheio' });
    }

    listing.status = 'cancelled';
    await listing.save();
    await player.save();

    return res.json({ listing, character });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cancelar oferta', error: error.message });
  }
});
