import mongoose from 'mongoose';

/**
 * Registro de compra de cristais com dinheiro real.
 */
const PurchaseSchema = new mongoose.Schema({
  playerId: { type: String, required: true, index: true },
  charName: { type: String, required: true, trim: true },
  amountCrystals: { type: Number, required: true, min: 1 },
  amountBRL: { type: Number, required: true, min: 0.01 },
  provider: { type: String, enum: ['mercadopago'], default: 'mercadopago' },
  providerRef: { type: String, required: true, unique: true }, // ID de referência externa / PIX
  paymentUrl: { type: String, default: null }, // URL ou QR Code do PIX (copia e cola)
  qrCodeBase64: { type: String, default: null },
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending', index: true },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date, default: null }
});

export const Purchase = mongoose.model('Purchase', PurchaseSchema);
