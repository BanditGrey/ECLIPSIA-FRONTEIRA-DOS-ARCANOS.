/**
 * Utilitários compartilhados (correio/mercado): formato itemStr e
 * manipulação do inventário dos personagens no banco.
 */

export const ITEM_STR_REGEX = /^\d+(\|-?\d+:-?\d+)*$/;

export const isValidItemRef = (ref) => typeof ref === 'string' && ITEM_STR_REGEX.test(ref);

export const getNumId = (ref) => {
  if (!isValidItemRef(ref)) return null;
  return Number(ref.split('|')[0]);
};

/** Adiciona um item (itemStr ou id legado) ao inventário do personagem. */
export const addToInventory = (character, ref, qty = 1, maxInventory = 20) => {
  const entry = character.inventory.find((inv) => (inv.itemStr ?? inv.id) === ref);

  if (entry) {
    entry.qty += qty;
    return true;
  }

  if (character.inventory.length >= maxInventory) {
    return false;
  }

  if (ITEM_STR_REGEX.test(ref)) {
    character.inventory.push({ itemStr: ref, id: null, qty });
  } else {
    character.inventory.push({ itemStr: null, id: ref, qty });
  }

  return true;
};

/** Remove `qty` unidades de um item do inventário. Retorna false se insuficiente. */
export const removeFromInventory = (character, ref, qty = 1) => {
  const index = character.inventory.findIndex((inv) => (inv.itemStr ?? inv.id) === ref);

  if (index < 0 || character.inventory[index].qty < qty) {
    return false;
  }

  character.inventory[index].qty -= qty;

  if (character.inventory[index].qty <= 0) {
    character.inventory.splice(index, 1);
  }

  return true;
};

/** Localiza o personagem ativo (ou por id) dentro do documento do jogador. */
export const getCharacter = (player, charId) => {
  if (!player) return null;

  if (charId) {
    return player.characters.id(charId);
  }

  return player.characters.find((c) => c._id.toString() === player.activeCharId) ?? player.characters[0] ?? null;
};

/** Encontra o documento Player que possui um personagem com o nome dado. */
export const findPlayerByCharacterName = async (PlayerModel, name) => {
  return PlayerModel.findOne({ 'characters.name': name });
};
