import mongoose from 'mongoose';

/** Persistência do chat global (últimas mensagens). */
const ChatMessageSchema = new mongoose.Schema({
  playerId: { type: String, default: null },
  name: { type: String, required: true, trim: true },
  text: { type: String, required: true, maxlength: 240 },
  createdAt: { type: Date, default: Date.now, index: true }
});

export const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
