import mongoose from 'mongoose';

/**
 * Correio entre jogadores (sistema ItemEffects).
 * Anexos usam o formato itemStr: "numId|e1:v1|e2:v2|..."
 */
const ITEM_STR_REGEX = /^\d+(\|[1-9]\d*:-?\d+)*$/;

const MailSchema = new mongoose.Schema({
  fromName: { type: String, required: true, trim: true },
  toName: { type: String, required: true, trim: true, index: true },
  subject: { type: String, default: '', trim: true, maxlength: 80 },
  message: { type: String, default: '', trim: true, maxlength: 500 },
  itemStr: {
    type: String,
    default: null,
    validate: {
      validator: (value) => value === null || ITEM_STR_REGEX.test(value),
      message: (props) => `itemStr inválida: "${props.value}"`
    }
  },
  gold: { type: Number, default: 0, min: 0 },
  read: { type: Boolean, default: false },
  claimed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
});

MailSchema.index({ toName: 1, createdAt: -1 });

export const Mail = mongoose.model('Mail', MailSchema);
