import mongoose from 'mongoose';

/**
 * Sussurros (mensagens privadas) persistidos para entrega offline.
 * Sussurros com destinatário online seguem em tempo real via socket
 * (chat:whisper); esta coleção garante que ninguém perde mensagem.
 */
const WhisperSchema = new mongoose.Schema({
  fromName: { type: String, required: true, trim: true, index: true },
  toName: { type: String, required: true, trim: true, index: true },
  text: { type: String, required: true, maxlength: 240 },
  read: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

WhisperSchema.index({ toName: 1, read: 1, createdAt: -1 });

export const Whisper = mongoose.model('Whisper', WhisperSchema);
