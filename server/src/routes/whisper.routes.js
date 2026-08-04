import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Whisper } from '../models/Whisper.js';

export const whisperRoutes = Router();
whisperRoutes.use(authMiddleware);

const sanitize = (value, max = 240) => String(value ?? '').replace(/[<>]/g, '').replace(/javascript:/gi, '').trim().slice(0, max);

/** GET /api/whisper/inbox?charName= — sussurros não lidos (máx. 50). */
whisperRoutes.get('/inbox', async (req, res) => {
  try {
    const charName = sanitize(req.query.charName ?? '', 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const whispers = await Whisper.find({ toName: charName, read: false })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json({ whispers });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar sussurros', error: error.message });
  }
});

/** POST /api/whisper/send — sussurro offline (persistido p/ o destinatário). */
whisperRoutes.post('/send', async (req, res) => {
  try {
    const fromName = sanitize(req.body?.fromName ?? '', 20);
    const toName = sanitize(req.body?.toName ?? '', 20);
    const text = sanitize(req.body?.text ?? '');

    if (!fromName || !toName || !text || fromName === toName) {
      return res.status(400).json({ message: 'Sussurro inválido' });
    }

    const whisper = await Whisper.create({ fromName, toName, text });

    return res.status(201).json({ whisper });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao enviar sussurro', error: error.message });
  }
});

/** POST /api/whisper/read — marca como lidos (todos ou de um remetente). */
whisperRoutes.post('/read', async (req, res) => {
  try {
    const charName = sanitize(req.body?.charName ?? '', 20);
    const fromName = sanitize(req.body?.fromName ?? '', 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const filter = { toName: charName, read: false };

    if (fromName) {
      filter.fromName = fromName;
    }

    const result = await Whisper.updateMany(filter, { read: true });

    return res.json({ marked: result.modifiedCount });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao marcar sussurros', error: error.message });
  }
});
