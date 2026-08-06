import mongoose from 'mongoose';

const GuildMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['leader', 'officer', 'member'], default: 'member' },
    joinedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const GuildSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 24 },
  leaderName: { type: String, required: true, trim: true },
  motd: { type: String, default: '', maxlength: 160 },
  members: { type: [GuildMemberSchema], default: [] },
  maxMembers: { type: Number, default: 20 },
  createdAt: { type: Date, default: Date.now }
});

export const Guild = mongoose.model('Guild', GuildSchema);
