/**
 * Notificações em tempo real: mantém o mapa de jogadores online e
 * permite que rotas REST (mail/mercado) emitam eventos via socket.
 */

export const onlinePlayers = new Map();

let ioRef = null;

export const setIO = (io) => {
  ioRef = io;
};

/** Envia um evento ao socket do personagem com o nome dado (se online). */
export const notifyPlayer = (characterName, event, payload) => {
  if (!ioRef || !characterName) return false;

  const entry = onlinePlayers.get(characterName);

  if (!entry) return false;

  ioRef.to(entry.socketId).emit(event, payload);
  return true;
};
