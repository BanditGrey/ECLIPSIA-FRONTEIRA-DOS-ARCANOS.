import type { ItemIconName } from '../components/ui/ItemIcon';
import type { Item } from '../types/item.types';

/**
 * Mapeia um Item para o nome do ícone SVG apropriado.
 * Considera type/slot/weaponCategory/id.
 */
export function itemIconFor(item: Item): ItemIconName {
  const type = (item as any).type;
  const slot = (item as any).slot;
  const weaponCategory = (item as any).weaponCategory;
  const id = String(item.id).toLowerCase();

  // Equipamentos por slot
  switch (slot) {
    case 'weapon_main':
      switch (weaponCategory) {
        case 'sword_one': return 'sword';
        case 'sword_two': return 'greatsword';
        case 'greataxe': return 'greataxe';
        case 'dagger': return 'dagger';
        case 'great_sword': return 'greatsword';
        case 'hammer': return 'mace';
        case 'spear': return 'spear';
        case 'bow_short':
        case 'bow_long': return 'bow';
        case 'staff_one':
        case 'staff_two': return 'staff';
        default:
          // inferir do nome
          if (/axe/.test(id)) return 'greataxe';
          if (/sword|blade/.test(id)) return 'sword';
          if (/staff|rod|wand/.test(id)) return 'staff';
          if (/bow/.test(id)) return 'bow';
          if (/dagger|knife/.test(id)) return 'dagger';
          if (/mace|hammer/.test(id)) return 'mace';
          if (/spear|polearm|lance/.test(id)) return 'spear';
          return 'sword';
      }
    case 'weapon_off':
      if (weaponCategory === 'shield') return 'shield';
      if (weaponCategory === 'dagger' || weaponCategory === 'dagger_off') return 'dagger';
      if (weaponCategory === 'orb' || weaponCategory === 'tome') return 'crystal';
      return 'shield';
    case 'armor':
    case 'chest': return 'chestplate';
    case 'helmet':
    case 'head': return 'helmet';
    case 'leggings':
    case 'legs': return 'leggings';
    case 'boots':
    case 'feet': return 'boots';
    case 'gloves':
    case 'hands': return 'gloves';
    case 'cloak':
    case 'back': return 'cloak';
    case 'accessory':
      if (/ring/.test(id)) return 'ring';
      if (/amulet|necklace/.test(id)) return 'amulet';
      if (/earring/.test(id)) return 'earring';
      if (/belt/.test(id)) return 'belt';
      if (/bracelet|bracer/.test(id)) return 'bracelet';
      return 'amulet';
  }

  // Tipos de item
  switch (type) {
    case 'spirit_stone': return 'spirit_stone';
    case 'material':
      if (/herb|plant/.test(id)) return 'herb';
      if (/leather|hide/.test(id)) return 'leather';
      if (/metal|ore|ingot/.test(id)) return 'metal';
      if (/essence|dust/.test(id)) return 'essence';
      if (/bone|skull/.test(id)) return 'bone';
      if (/gem|ruby|emerald|sapphire/.test(id)) return 'gem';
      if (/crystal|shard|core/.test(id)) return 'crystal';
      return 'metal';
    case 'pet': return 'pet';
    case 'mount': return 'mount';
    case 'special':
      if (/key/.test(id)) return 'key';
      if (/map/.test(id)) return 'map';
      if (/quest/.test(id)) return 'quest_item';
      if (/gift|present/.test(id)) return 'gift';
      return 'quest_item';
    case 'consumable':
      if (/potion_hp|heal|hp_pot/.test(id)) return 'potion_hp';
      if (/potion_mp|mana|mp_pot/.test(id)) return 'potion_mp';
      if (/food|bread|meat|fish/.test(id)) return 'food';
      if (/elixir/.test(id)) return 'elixir';
      if (/scroll/.test(id)) return 'scroll';
      return 'potion_buff';
  }

  // Inferência final
  if (/potion.*hp|hp.*potion/.test(id)) return 'potion_hp';
  if (/potion.*mp|mp.*potion/.test(id)) return 'potion_mp';
  if (/potion/.test(id)) return 'potion_buff';
  if (/scroll/.test(id)) return 'scroll';
  if (/elixir/.test(id)) return 'elixir';
  if (/food|bread|meat/.test(id)) return 'food';
  if (/gold|coin/.test(id)) return 'coin';
  if (/chest|loot.?box/.test(id)) return 'chest';
  if (/diamond/.test(id)) return 'diamond';
  if (/gem/.test(id)) return 'gem';
  if (/key/.test(id)) return 'key';
  if (/map/.test(id)) return 'map';
  if (/quest/.test(id)) return 'quest_item';
  if (/pet/.test(id)) return 'pet';

  return 'item_generic';
}
