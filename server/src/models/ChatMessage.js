import mongoose from 'mongoose';

/** Persistência do chat. */
const ChatMessageSchema = new mongoose.Schema({
  scope: { type: String, enum: ['global', 'party', 'guild'], default: 'global' },
  scopeId: { type: String, default: null, index: true },
  playerId: { type: String, default: null },
  name: { type: String, required: true, trim: true },
  text: { type: String, required: true, maxlength: 240 },
  createdAt: { type: Date, default: Date.now, index: true }
});

ChatMessageSchema.index({ scope: 1, scopeId: 1, createdAt: -1 });

export const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
