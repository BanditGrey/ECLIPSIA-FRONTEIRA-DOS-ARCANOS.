import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { Mail } from '../models/Mail.js';
import { Player } from '../models/Player.js';
import { addToInventory, getCharacter, isValidItemRef, removeFromInventory } from '../utils/gameUtils.js';
import { notifyPlayer } from '../utils/notify.js';

export const mailRoutes = Router();
mailRoutes.use(authMiddleware);

const sanitize = (value, max = 500) => String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);

/** GET /api/mail/inbox?charName=Foo — caixa de entrada do personagem */
mailRoutes.get('/inbox', async (req, res) => {
  try {
    const charName = sanitize(req.query.charName ?? '', 20);

    if (!charName) {
      return res.status(400).json({ message: 'charName obrigatório' });
    }

    const mails = await Mail.find({ toName: charName, expiresAt: { $gt: new Date() } })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json({ mails });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar correio', error: error.message });
  }
});

/** POST /api/mail/send — enviar carta (com anexo itemStr e/ou ouro) */
mailRoutes.post('/send', async (req, res) => {
  try {
    const { charName, toName, subject, message, itemRef, gold, crystals } = req.body ?? {};
    const player = await Player.findById(req.playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player não encontrado' });
    }

    const sender = player.characters.find((c) => c.name === sanitize(charName, 20));

    if (!sender) {
      return res.status(404).json({ message: 'Personagem remetente não encontrado' });
    }

    const destination = sanitize(toName, 20);

    if (!destination || destination === sender.name) {
      return res.status(400).json({ message: 'Destinatário inválido' });
    }

    const recipientExists = await Player.exists({ 'characters.name': destination });

    if (!recipientExists) {
      return res.status(404).json({ message: 'Personagem destinatário não existe' });
    }

    const goldAmount = Math.max(0, Math.floor(Number(gold) || 0));
    const crystalAmount = Math.max(0, Math.floor(Number(crystals) || 0));

    if (goldAmount > sender.gold) {
      return res.status(400).json({ message: 'Ouro insuficiente' });
    }

    if (crystalAmount > (sender.crystals ?? 0)) {
      return res.status(400).json({ message: 'Cristais insuficientes' });
    }

    const attachment = itemRef ? String(itemRef) : null;

    if (attachment && !isValidItemRef(attachment)) {
      return res.status(400).json({ message: 'Item inválido' });
    }

    if (attachment && !removeFromInventory(sender, attachment, 1)) {
      return res.status(400).json({ message: 'Item não está no inventário' });
    }

    if (!attachment && goldAmount === 0 && crystalAmount === 0 && !sanitize(message, 500)) {
      return res.status(400).json({ message: 'Carta vazia' });
    }

    sender.gold -= goldAmount;
    sender.crystals = (sender.crystals ?? 0) - crystalAmount;

    const mail = await Mail.create({
      fromName: sender.name,
      toName: destination,
      subject: sanitize(subject, 80),
      message: sanitize(message, 500),
      itemStr: attachment,
      gold: goldAmount,
      crystals: crystalAmount
    });

    await player.save();

    notifyPlayer(destination, 'mail:new', { fromName: sender.name, subject: mail.subject });

    return res.status(201).json({ mail, character: sender });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao enviar carta', error: error.message });
  }
});

/** POST /api/mail/read — marca como lida */
mailRoutes.post('/read', async (req, res) => {
  try {
    const { mailId } = req.body ?? {};
    const mail = await Mail.findById(mailId);

    if (!mail) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    mail.read = true;
    await mail.save();

    return res.json({ mail });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao marcar carta', error: error.message });
  }
});

/** POST /api/mail/claim — resgata anexo (item + ouro) no personagem */
mailRoutes.post('/claim', async (req, res) => {
  try {
    const { mailId, charName } = req.body ?? {};
    const player = await Player.findById(req.playerId);
    const mail = await Mail.findById(mailId);

    if (!player || !mail) {
      return res.status(404).json({ message: 'Carta ou player não encontrado' });
    }

    const character = player.characters.find((c) => c.name === mail.toName && c.name === sanitize(charName, 20));

    if (!character) {
      return res.status(403).json({ message: 'Esta carta não é para este personagem' });
    }

    if (mail.claimed) {
      return res.status(400).json({ message: 'Anexo já resgatado' });
    }

    if (mail.itemStr && !addToInventory(character, mail.itemStr, 1, character.maxInventory)) {
      return res.status(400).json({ message: 'Inventário cheio' });
    }

    character.gold += Math.max(0, mail.gold ?? 0);
    character.crystals = (character.crystals ?? 0) + Math.max(0, mail.crystals ?? 0);
    mail.claimed = true;
    mail.read = true;
    await mail.save();
    await player.save();

    return res.json({ mail, character });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao resgatar anexo', error: error.message });
  }
});

/** DELETE /api/mail/:mailId — apaga carta (só sem anexo pendente) */
mailRoutes.delete('/:mailId', async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.mailId);

    if (!mail) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    if (!mail.claimed && (mail.itemStr || mail.gold > 0 || mail.crystals > 0)) {
      return res.status(400).json({ message: 'Resgate o anexo antes de apagar' });
    }

    await mail.deleteOne();

    return res.json({ message: 'Carta apagada' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao apagar carta', error: error.message });
  }
});
