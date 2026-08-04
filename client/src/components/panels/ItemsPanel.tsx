import { useMemo, useState } from 'react';
import { describeEffect, getEffectIcon, getEffectName } from '../../data/effectNames';
import { getEffect, getEffectPairs } from '../../data/effectRegistry';
import { itemNames } from '../../data/itemNames';
import { weaponCategoryOf } from '../../data/proficiencies';
import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { refOf, usePlayerStore } from '../../store/usePlayerStore';
import type { ItemEffect } from '../../types/item.types';
import type { Equipment, InventoryItem } from '../../types/player.types';
import { resolveItemRef, serializeItem } from '../../utils/itemSerializer';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { CraftingPanel } from './items/CraftingPanel';
import { MarketPanel } from './items/MarketPanel';

type ItemsTab = 'equipped' | 'bag' | 'storage' | 'crafting' | 'market';
type EquipmentSlot = keyof Equipment;
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'relic';

interface ItemMeta {
  id: string;
  icon: string;
  slot: EquipmentSlot | null;
  rarity: Rarity;
  isTwoHanded: boolean;
  stats: Record<string, number>;
  spiritChance?: number;
  /** numId do catálogo (quando o item está registrado). */
  numId?: number;
  /** Effects numéricos — fonte de verdade dos bônus. */
  effects?: ItemEffect;
  /** Id base no catálogo (para nomes/descrições). */
  catalogId?: string;
  /** Item serializado ("numId|e:v|...") para correio/mercado/chat. */
  itemStr?: string;
}

const tabs: ItemsTab[] = ['equipped', 'bag', 'storage', 'crafting', 'market'];
const weaponSlots: EquipmentSlot[] = ['weapon_main', 'weapon_off'];
const armorSlots: EquipmentSlot[] = ['head', 'chest', 'legs', 'gloves', 'boots'];
const accessorySlots: EquipmentSlot[] = ['earring', 'necklace', 'belt', 'resistance', 'amulet', 'spirit_stone', 'pet', 'mount'];
const allSlots: EquipmentSlot[] = [...weaponSlots, ...armorSlots, ...accessorySlots];
const DETAIL_MODAL = 'modal-item-detail';

const rarityBorder: Record<Rarity, string> = {
  common: 'border-rarity-common',
  uncommon: 'border-rarity-uncommon shadow-[0_0_12px_rgb(34_197_94_/_0.18)]',
  rare: 'border-rarity-rare shadow-[0_0_12px_rgb(59_130_246_/_0.22)]',
  epic: 'border-rarity-epic shadow-[0_0_14px_rgb(168_85_247_/_0.25)]',
  legendary: 'border-rarity-legendary shadow-[0_0_18px_rgb(245_158_11_/_0.35)]',
  relic: 'border-rarity-relic shadow-[0_0_18px_rgb(239_68_68_/_0.35)]'
};

const rarityText: Record<Rarity, string> = {
  common: 'text-rarity-common',
  uncommon: 'text-rarity-uncommon',
  rare: 'text-rarity-rare',
  epic: 'text-rarity-epic',
  legendary: 'text-rarity-legendary',
  relic: 'text-rarity-relic'
};

const slotIconFallback: Record<EquipmentSlot, string> = {
  weapon_main: '⚔',
  weapon_off: '🛡',
  head: '🎩',
  chest: '🥋',
  legs: '👖',
  gloves: '🧤',
  boots: '🥾',
  earring: '💠',
  necklace: '📿',
  belt: '🧷',
  resistance: '🔰',
  amulet: '🔮',
  spirit_stone: '💎',
  pet: '🐾',
  mount: '🐴'
};

const inferSlot = (itemId: string): EquipmentSlot | null => {
  const normalized = itemId.toLowerCase();
  const direct = allSlots.find((slot) => normalized.includes(slot));

  if (direct) {
    return direct;
  }

  if (normalized.includes('shield') || normalized.includes('orb') || normalized.includes('tome')) {
    return 'weapon_off';
  }

  if (normalized.includes('sword') || normalized.includes('bow') || normalized.includes('staff') || normalized.includes('dagger')) {
    return 'weapon_main';
  }

  if (normalized.includes('pet')) {
    return 'pet';
  }

  if (normalized.includes('mount')) {
    return 'mount';
  }

  return null;
};

const inferRarity = (itemId: string): Rarity => {
  const normalized = itemId.toLowerCase();

  if (normalized.includes('relic')) return 'relic';
  if (normalized.includes('legendary')) return 'legendary';
  if (normalized.includes('epic')) return 'epic';
  if (normalized.includes('rare')) return 'rare';
  if (normalized.includes('uncommon')) return 'uncommon';

  return 'common';
};

const isTwoHanded = (itemId: string) => {
  const normalized = itemId.toLowerCase();

  return normalized.includes('2h') || normalized.includes('two') || normalized.includes('great') || normalized.includes('bow_long') || normalized.includes('staff_two');
};

const getItemMeta = (itemId: string): ItemMeta => {
  // 1) Catálogo real (com effects) — suporta id ou itemStr serializada
  const catalogItem = resolveItemRef(itemId);

  if (catalogItem) {
    const slot = allSlots.includes(catalogItem.slot as EquipmentSlot) ? (catalogItem.slot as EquipmentSlot) : null;
    const stats: Record<string, number> = catalogItem.stats
      ? Object.fromEntries(Object.entries(catalogItem.stats).filter(([, value]) => typeof value === 'number'))
      : {};

    return {
      id: itemId,
      icon: catalogItem.icon,
      slot,
      rarity: catalogItem.rarity,
      isTwoHanded: Boolean(catalogItem.isTwoHanded),
      stats,
      spiritChance: catalogItem.spiritStone ? Math.round(catalogItem.spiritStone.effectChance * 100) : undefined,
      numId: catalogItem.numId,
      effects: catalogItem.effects,
      catalogId: catalogItem.id,
      itemStr: serializeItem(catalogItem)
    };
  }

  // 2) Fallback legado: item não registrado no catálogo
  const slot = inferSlot(itemId);
  const twoHanded = isTwoHanded(itemId);

  return {
    id: itemId,
    icon: slot ? slotIconFallback[slot] : '🎁',
    slot,
    rarity: inferRarity(itemId),
    isTwoHanded: twoHanded,
    stats: slot?.startsWith('weapon') ? { atk: twoHanded ? 18 : 10 } : slot ? { def: 6 } : {},
    spiritChance: slot === 'spirit_stone' ? 12 : undefined
  };
};

export const ItemsPanel = () => {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<ItemsTab>('equipped');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [selectedSource, setSelectedSource] = useState<'bag' | 'storage'>('bag');
  const openModal = useGameStore((state) => state.openModal);
  const addNotification = useGameStore((state) => state.addNotification);
  const player = usePlayerStore((state) => state.data);
  const equip = usePlayerStore((state) => state.equip);
  const unequip = usePlayerStore((state) => state.unequip);
  const removeItem = usePlayerStore((state) => state.removeItem);
  const depositItem = usePlayerStore((state) => state.depositItem);
  const withdrawItem = usePlayerStore((state) => state.withdrawItem);

  const mainWeaponTwoHanded = useMemo(() => Boolean(player?.equipment.weapon_main && isTwoHanded(player.equipment.weapon_main)), [player]);

  const openDetail = (item: InventoryItem, source: 'bag' | 'storage' = 'bag') => {
    setSelectedItem(item);
    setSelectedSource(source);
    openModal(DETAIL_MODAL);
  };

  const itemName = (meta: ItemMeta | null) => {
    if (meta?.catalogId) {
      const entry = itemNames[meta.catalogId]?.[lang];

      if (entry?.name) {
        return entry.name;
      }
    }

    return t('items.unknownItem');
  };

  const itemDesc = (meta: ItemMeta | null) => {
    if (meta?.catalogId) {
      const entry = itemNames[meta.catalogId]?.[lang];

      if (entry?.desc) {
        return entry.desc;
      }
    }

    return t('items.genericDesc');
  };

  /** Resumo compacto dos effects (até 2 pares) para os slots equipados. */
  const effectSummary = (meta: ItemMeta) => {
    const pairs = getEffectPairs(meta.effects);

    if (pairs.length > 0) {
      return pairs.slice(0, 2).map(({ effectId, value }) => describeEffect(effectId, value, lang).text).join(' • ');
    }

    return Object.entries(meta.stats).map(([key, value]) => `${t(key === 'atk' ? 'charCreate.stats.atk' : 'charCreate.stats.def')} +${value}`).join(' • ');
  };

  /**
   * Diff effect-a-effect entre o item selecionado e o equipado no mesmo
   * slot: verde se o novo é melhor, vermelho se é pior.
   */
  const effectDiffRows = (newMeta: ItemMeta, oldItemId: string) => {
    const oldMeta = getItemMeta(oldItemId);
    const newPairs = new Map(getEffectPairs(newMeta.effects).map((pair) => [pair.effectId, pair.value]));
    const oldPairs = new Map(getEffectPairs(oldMeta.effects).map((pair) => [pair.effectId, pair.value]));
    const ids = [...new Set([...newPairs.keys(), ...oldPairs.keys()])];

    return ids.map((effectId) => {
      const newValue = newPairs.get(effectId) ?? 0;
      const oldValue = oldPairs.get(effectId) ?? 0;

      return { effectId, newValue, oldValue, delta: newValue - oldValue };
    });
  };

  const renderSlot = (slot: EquipmentSlot) => {
    const itemId = player?.equipment[slot];
    const meta = itemId ? getItemMeta(itemId) : null;
    const blocked = slot === 'weapon_off' && mainWeaponTwoHanded;

    return (
      <article key={slot} className={['rounded-xl border bg-game-card p-3', meta ? rarityBorder[meta.rarity] : 'border-game-border', blocked ? 'opacity-60' : ''].join(' ')}>
        <div className="flex items-start gap-3">
          <span className="text-3xl">{meta?.icon ?? slotIconFallback[slot]}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-title text-sm text-game-gold">{t(`items.slots.${slot}`)}</h3>
              {meta?.isTwoHanded && <span className="rounded bg-game-gold px-1.5 py-0.5 font-mono text-[10px] text-game-dark">{t('items.twoHandedBadge')}</span>}
            </div>
            <p className="truncate text-sm text-game-text">{itemId && meta ? itemName(meta) : t('items.slotEmpty')}</p>
            {blocked && <p className="text-xs text-red-300">{t('items.twoHandedBlocked')}</p>}
            {meta && <p className="font-mono text-xs text-game-muted">{effectSummary(meta)}</p>}
          </div>
          {itemId && (
            <button
              type="button"
              className="h-7 w-7 rounded border border-game-border text-game-muted hover:bg-game-hover hover:text-game-text active:scale-95"
              onClick={() => unequip(slot)}
              aria-label={t('items.unequip')}
            >
              ×
            </button>
          )}
        </div>
      </article>
    );
  };

  const renderEquipmentGroup = (titleKey: string, slots: EquipmentSlot[]) => (
    <section className="grid gap-2">
      <h2 className="font-title text-lg text-game-gold">{t(titleKey)}</h2>
      <div className="grid grid-cols-2 gap-2">{slots.map(renderSlot)}</div>
    </section>
  );

  const selectedMeta = selectedItem ? getItemMeta(refOf(selectedItem)) : null;
  const equippedCurrent = selectedMeta?.slot && player ? player.equipment[selectedMeta.slot] : null;
  const selectedWeaponCategory = selectedItem ? weaponCategoryOf(refOf(selectedItem)) : null;

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-5 gap-2 rounded-xl border border-night-600 bg-night-900/80 p-1.5 font-mono shadow-panel text-sm">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'btn-gold' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`items.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        {tab === 'equipped' && (
          <div className="grid h-full gap-4 overflow-auto pr-1">
            {renderEquipmentGroup('items.groups.weapons', weaponSlots)}
            {renderEquipmentGroup('items.groups.armor', armorSlots)}
            {renderEquipmentGroup('items.groups.accessories', accessorySlots)}
          </div>
        )}

        {tab === 'bag' && (
          <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
            <div className="font-mono text-sm text-game-muted">
              {player?.inventory.length ?? 0}/{player?.maxInventory ?? 60} {t('items.slots')}
            </div>
            <div className="grid min-h-0 grid-cols-4 gap-2 overflow-auto pr-1">
              {(player?.inventory ?? []).map((item) => {
                const meta = getItemMeta(refOf(item));

                return (
                  <button
                    key={refOf(item)}
                    type="button"
                    className={['relative rounded-xl border bg-game-card p-3 transition-colors hover:bg-game-hover active:scale-95', rarityBorder[meta.rarity]].join(' ')}
                    onClick={() => openDetail(item, 'bag')}
                  >
                    <span className="text-4xl">{meta.icon}</span>
                    {item.qty > 1 && <span className="absolute right-2 top-2 rounded bg-game-primary px-1.5 font-mono text-xs">×{item.qty}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'storage' && (
          <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
            <div className="font-mono text-sm text-game-muted">
              {(player?.storage ?? []).length}/{player?.maxStorage ?? 500} {t('items.storageSlots')}
            </div>
            <div className="grid min-h-0 grid-cols-4 gap-2 overflow-auto pr-1">
              {(player?.storage ?? []).map((item) => {
                const meta = getItemMeta(refOf(item));

                return (
                  <button
                    key={refOf(item)}
                    type="button"
                    className={['relative rounded-xl border bg-game-card p-3 transition-colors hover:bg-game-hover active:scale-95', rarityBorder[meta.rarity]].join(' ')}
                    onClick={() => openDetail(item, 'storage')}
                  >
                    <span className="text-4xl">{meta.icon}</span>
                    {item.qty > 1 && <span className="absolute right-2 top-2 rounded bg-game-primary px-1.5 font-mono text-xs">×{item.qty}</span>}
                  </button>
                );
              })}
              {(player?.storage ?? []).length === 0 && (
                <p className="col-span-4 text-sm text-game-muted">{t('items.storageEmpty')}</p>
              )}
            </div>
          </div>
        )}

        {tab === 'crafting' && <CraftingPanel />}

        {tab === 'market' && <MarketPanel />}
      </section>

      <Modal id={DETAIL_MODAL} title={selectedMeta ? itemName(selectedMeta) : t('items.unknownItem')}>
        {selectedItem && selectedMeta && (
          <div className="grid gap-3">
            <header className="flex items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
              <span className="text-4xl">{selectedMeta.icon}</span>
              <div>
                <h2 className="font-title text-xl text-game-gold">{itemName(selectedMeta)}</h2>
                <p className={['font-mono text-xs', rarityText[selectedMeta.rarity]].join(' ')}>
                  {t(`items.rarities.${selectedMeta.rarity}`)} • {selectedMeta.slot ? t(`items.slots.${selectedMeta.slot}`) : t('game.unknown')}
                  {selectedMeta.numId !== undefined && <> • #{selectedMeta.numId}</>}
                </p>
              </div>
            </header>

            <p className="text-game-muted">{itemDesc(selectedMeta)}</p>

            {/* Tabela de effects — fonte de verdade dos bônus */}
            <section className="rounded-xl border border-game-border bg-game-card p-3">
              <h3 className="mb-2 font-title text-game-gold">{t('items.effects')}</h3>
              {getEffectPairs(selectedMeta.effects).length > 0 ? (
                <div className="grid gap-1 font-mono text-sm">
                  {getEffectPairs(selectedMeta.effects).map(({ effectId, value }, index) => {
                    const line = describeEffect(effectId, value, lang);

                    return (
                      <span
                        key={`${effectId}-${index}`}
                        className={['flex items-center gap-2', line.colorClass].join(' ')}
                        title={`${getEffectName(effectId, lang)} — ${getEffect(effectId)?.description ?? ''}`}
                      >
                        <span aria-hidden>{getEffectIcon(effectId)}</span>
                        <span>{line.text}</span>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-1 font-mono text-sm">
                  {Object.entries(selectedMeta.stats).map(([key, value]) => (
                    <span key={key} className={value >= 0 ? 'text-green-300' : 'text-red-300'}>
                      {t(key === 'atk' ? 'charCreate.stats.atk' : 'charCreate.stats.def')}: {value > 0 ? '+' : ''}{value}
                    </span>
                  ))}
                  {Object.keys(selectedMeta.stats).length === 0 && <span className="text-game-muted">{t('items.noEffects')}</span>}
                </div>
              )}
            </section>

            {selectedMeta.spiritChance && (
              <section className="rounded-xl border border-game-border bg-game-card p-3 text-sm text-game-muted">
                {t('items.spiritStoneEffect')}: {t('items.spiritEffects.all_boost')} • {selectedMeta.spiritChance}%
              </section>
            )}



            <section className="rounded-xl border border-game-border bg-game-card p-3 text-sm text-game-muted">
              <h3 className="mb-1 font-title text-game-gold">{t('items.comparison')}</h3>
              {equippedCurrent ? (
                <div className="grid gap-1">
                  <p>
                    {t('items.currentEquipped')}: {itemName(getItemMeta(equippedCurrent))}
                  </p>
                  <div className="grid gap-1 font-mono text-xs">
                    {effectDiffRows(selectedMeta, equippedCurrent).map(({ effectId, newValue, oldValue, delta }) => (
                      <span
                        key={`diff-${effectId}`}
                        className={['flex items-center gap-2', delta > 0 ? 'text-green-300' : delta < 0 ? 'text-red-300' : 'text-game-muted'].join(' ')}
                        title={`${getEffectName(effectId, lang)} — ${getEffect(effectId)?.description ?? ''}`}
                      >
                        <span aria-hidden>{getEffectIcon(effectId)}</span>
                        <span>{getEffectName(effectId, lang)}</span>
                        <span className="ml-auto">
                          {oldValue} → {newValue} ({delta > 0 ? '+' : ''}{delta})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <span>{t('panels.none')}</span>
              )}
            </section>

            {selectedMeta.itemStr && (
              <p className="break-all rounded-lg border border-game-border bg-game-dark p-2 font-mono text-[10px] text-game-muted">
                {t('items.itemCode')}: {selectedMeta.itemStr}
              </p>
            )}

            {selectedSource === 'bag' ? (
              <div className="grid grid-cols-3 gap-2">
                {selectedWeaponCategory ? (
                  <>
                    <Button
                      onClick={() => {
                        if (!equip(refOf(selectedItem), 'weapon_main')) {
                          addNotification(t('items.sameWeaponCategory'), 'warning');
                        }
                      }}
                    >
                      {t('items.equipMain')}
                    </Button>
                    <Button
                      onClick={() => {
                        if (!equip(refOf(selectedItem), 'weapon_off')) {
                          addNotification(t('items.sameWeaponCategory'), 'warning');
                        }
                      }}
                    >
                      {t('items.equipOff')}
                    </Button>
                  </>
                ) : (
                  <Button disabled={!selectedMeta.slot} onClick={() => equip(refOf(selectedItem))}>
                    {t('items.equip')}
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (!depositItem(refOf(selectedItem), 1)) {
                      addNotification(t('items.storageFull'), 'warning');
                    }
                  }}
                >
                  {t('items.deposit')}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (window.confirm(t('items.confirmDiscard'))) {
                      removeItem(refOf(selectedItem), 1);
                    }
                  }}
                >
                  {t('items.discard')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => {
                    if (!withdrawItem(refOf(selectedItem), 1)) {
                      addNotification(t('items.bagFull'), 'warning');
                    }
                  }}
                >
                  {t('items.withdraw')}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (window.confirm(t('items.confirmDiscard'))) {
                      withdrawItem(refOf(selectedItem), selectedItem.qty);
                    }
                  }}
                >
                  {t('items.discard')}
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
