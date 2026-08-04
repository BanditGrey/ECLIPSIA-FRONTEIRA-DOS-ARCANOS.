import mongoose from 'mongoose';

/**
 * Leilão de itens (💎 crystals). O item fica custodiado no leilão;
 * lances bloqueiam crystals do licitante; liquidação lazy na listagem.
 */
const ITEM_STR_REGEX = /^\d+(\|-?\d+:-?\d+)*$/;

const BidSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 1 },
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const AuctionSchema = new mongoose.Schema({
  itemStr: {
    type: String,
    required: true,
    validate: {
      validator: (value) => ITEM_STR_REGEX.test(value),
      message: (props) => `itemStr inválida: "${props.value}"`
    }
  },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true, trim: true, index: true },
  startPrice: { type: Number, required: true, min: 1 },
  minIncrement: { type: Number, default: 1, min: 1 },
  bids: { type: [BidSchema], default: [] },
  expiresAt: { type: Date, required: true, index: true },
  status: { type: String, enum: ['active', 'settled', 'cancelled'], default: 'active', index: true },
  winnerName: { type: String, default: null },
  finalAmount: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
});

AuctionSchema.index({ status: 1, expiresAt: 1 });

export const Auction = mongoose.model('Auction', AuctionSchema);
