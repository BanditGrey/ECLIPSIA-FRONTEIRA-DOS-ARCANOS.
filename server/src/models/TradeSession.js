import mongoose from 'mongoose';

const TradeOfferSchema = new mongoose.Schema(
  {
    items: { type: [String], default: [] },
    gold: { type: Number, default: 0, min: 0 }
  },
  { _id: false }
);

const TradeSchema = new mongoose.Schema({
  tradeId: { type: String, required: true, unique: true, index: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  status: { type: String, enum: ['pending', 'active', 'declined', 'cancelled', 'completed'], default: 'pending' },
  offers: {
    type: Map,
    of: TradeOfferSchema,
    default: {}
  },
  confirmed: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // Auto-deleta após 24h
});

export const TradeSession = mongoose.model('TradeSession', TradeSchema);
