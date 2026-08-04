import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Purchase } from '../models/Purchase.js';
import { Player } from '../models/Player.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

export const checkoutRoutes = Router();

// Pacotes de Cristais
const PACKAGES = {
  'pack_100': { crystals: 100, priceBRL: 4.90 },
  'pack_550': { crystals: 550, priceBRL: 24.90 }, // +10% bonus
  'pack_1200': { crystals: 1200, priceBRL: 49.90 }, // +20% bonus
  'pack_2600': { crystals: 2600, priceBRL: 99.90 }, // +30% bonus
};

// 1. Criar preferência de pagamento (Pix)
checkoutRoutes.post('/create',
  authMiddleware,
  body('packageId').isIn(Object.keys(PACKAGES)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { packageId } = req.body;
      const { crystals, priceBRL } = PACKAGES[packageId];
      
      const player = await Player.findById(req.playerId);
      if (!player || !player.activeCharId) {
        return res.status(404).json({ success: false, message: 'Personagem ativo não encontrado' });
      }

      const char = player.characters.id(player.activeCharId);
      if (!char) {
        return res.status(404).json({ success: false, message: 'Personagem não encontrado' });
      }

      // Mock de integração com Mercado Pago para gerar PIX
      const externalRef = `MP-PIX-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const mockPixCopiaECola = `00020101021243650016COM.MERCADOPAGO0124${externalRef}5204000053039865802BR5910ECLIPSIA6009SAO PAULO62070503***63041234`;

      const purchase = new Purchase({
        playerId: req.playerId,
        charName: char.name,
        amountCrystals: crystals,
        amountBRL: priceBRL,
        provider: 'mercadopago',
        providerRef: externalRef,
        paymentUrl: mockPixCopiaECola,
        status: 'pending'
      });

      await purchase.save();

      res.json({
        success: true,
        purchaseId: purchase._id,
        providerRef: purchase.providerRef,
        amountCrystals: purchase.amountCrystals,
        amountBRL: purchase.amountBRL,
        paymentUrl: purchase.paymentUrl,
        qrCodeBase64: purchase.qrCodeBase64
      });
    } catch (err) {
      console.error('[Checkout Error]', err);
      res.status(500).json({ success: false, message: 'Erro ao criar pedido' });
    }
});

// 2. Webhook do Mercado Pago
checkoutRoutes.post('/webhook', async (req, res) => {
  try {
    const { action, data, type } = req.body;

    if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = data?.id || req.body?.data?.id;
      if (!paymentId) return res.sendStatus(200);

      const mockedPaymentStatus = req.body.mockStatus || 'approved'; // apenas para teste
      const externalRef = req.body.external_reference || req.body.mockRef;

      if (mockedPaymentStatus === 'approved' && externalRef) {
        const purchase = await Purchase.findOne({ providerRef: externalRef, status: 'pending' });
        
        if (purchase) {
          purchase.status = 'paid';
          purchase.paidAt = new Date();
          await purchase.save();

          // Creditar cristais
          const player = await Player.findOne({ 'characters.name': purchase.charName });
          if (player) {
            const char = player.characters.find((c) => c.name === purchase.charName);
            if (char) {
              char.crystals = (char.crystals || 0) + purchase.amountCrystals;
              await player.save();
              console.log(`[Checkout] Cristais creditados para ${char.name}: +${purchase.amountCrystals}`);
            }
          }
        }
      }
    }
    
    res.sendStatus(200);
  } catch (err) {
    console.error('[Webhook Error]', err);
    res.sendStatus(500);
  }
});

// 3. Simular Pagamento (Apenas DEV)
checkoutRoutes.post('/simulate', authMiddleware, async (req, res) => {
  try {
    const { providerRef } = req.body;
    
    const purchase = await Purchase.findOne({ providerRef, status: 'pending', playerId: req.playerId });
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Pedido pendente não encontrado' });
    }

    purchase.status = 'paid';
    purchase.paidAt = new Date();
    await purchase.save();

    const player = await Player.findById(purchase.playerId);
    if (player) {
      const char = player.characters.find((c) => c.name === purchase.charName);
      if (char) {
        char.crystals = (char.crystals || 0) + purchase.amountCrystals;
        await player.save();
      }
    }

    res.json({ success: true, message: 'Pagamento simulado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao simular' });
  }
});

// 4. Checar status da compra
checkoutRoutes.get('/status/:providerRef', authMiddleware, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ providerRef: req.params.providerRef, playerId: req.playerId });
    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
    res.json({ success: true, status: purchase.status });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});
