import mongoose from 'mongoose';

/**
 * Mercado/leilão de itens (sistema ItemEffects).
 * O item listado fica custodiado no próprio listing (itemStr).
 */
const ITEM_STR_REGEX = /^\d+(\|[1-9]\d*:-?\d+)*$/;

const MarketListingSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true, trim: true, index: true },
  itemStr: {
    type: String,
    required: true,
    validate: {
      validator: (value) => ITEM_STR_REGEX.test(value),
      message: (props) => `itemStr inválida: "${props.value}"`
    }
  },
  numId: { type: Number, required: true, index: true },
  rarity: { type: String, default: 'common', index: true },
  price: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ['active', 'sold', 'cancelled'], default: 'active', index: true },
  soldTo: { type: String, default: null },
  createdAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
});

MarketListingSchema.index({ status: 1, createdAt: -1 });

export const MarketListing = mongoose.model('MarketListing', MarketListingSchema);
