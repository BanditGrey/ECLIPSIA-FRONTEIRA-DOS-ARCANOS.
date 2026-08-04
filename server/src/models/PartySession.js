import mongoose from 'mongoose';

const PartySchema = new mongoose.Schema({
  partyId: { type: String, required: true, unique: true, index: true },
  leader: { type: String, required: true },
  members: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export const PartySession = mongoose.model('PartySession', PartySchema);
