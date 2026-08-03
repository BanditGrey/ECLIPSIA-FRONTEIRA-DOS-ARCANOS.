import { useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Equipment, InventoryItem } from '../../types/player.types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

type ItemsTab = 'equipped' | 'bag' | 'crafting' | 'market';
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
}

const tabs: ItemsTab[] = ['equipped', 'bag', 'crafting', 'market'];
const weaponSlots: EquipmentSlot[] = ['weapon_main', 'weapon_off'];
const armorSlots: EquipmentSlot[] = ['head', 'chest', 'legs', 'gloves', 'boots'];
const accessorySlots: EquipmentSlot[] = ['earring', 'necklace', 'belt', 'resistance', 'amulet', 'spirit_stone', 'pet', 'mount'];
const allSlots: EquipmentSlot[] = [...weaponSlots, ...armorSlots, ...accessorySlots];
const DETAIL_MODAL = 'modal-item-detail';

const rarityBorder: Record<Rarity, string> = {
  common: 'border-rarity-common',
  uncommon: 'border-rarity-uncommon',
  rare: 'border-rarity-rare',
  epic: 'border-rarity-epic',
  legendary: 'border-rarity-legendary',
  relic: 'border-rarity-relic'
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
  const { t } = useI18n();
  const [tab, setTab] = useState<ItemsTab>('equipped');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const openModal = useGameStore((state) => state.openModal);
  const addNotification = useGameStore((state) => state.addNotification);
  const player = usePlayerStore((state) => state.data);
  const equip = usePlayerStore((state) => state.equip);
  const unequip = usePlayerStore((state) => state.unequip);
  const removeItem = usePlayerStore((state) => state.removeItem);

  const mainWeaponTwoHanded = useMemo(() => Boolean(player?.equipment.weapon_main && isTwoHanded(player.equipment.weapon_main)), [player]);

  const openDetail = (item: InventoryItem) => {
    setSelectedItem(item);
    openModal(DETAIL_MODAL);
  };

  const itemName = () => t('items.unknownItem');
  const itemDesc = () => t('items.genericDesc');

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
            <p className="truncate text-sm text-game-text">{itemId ? itemName() : t('items.slotEmpty')}</p>
            {blocked && <p className="text-xs text-red-300">{t('items.twoHandedBlocked')}</p>}
            {meta && (
              <p className="font-mono text-xs text-game-muted">
                {Object.entries(meta.stats).map(([key, value]) => `${t(key === 'atk' ? 'charCreate.stats.atk' : 'charCreate.stats.def')} +${value}`).join(' • ')}
              </p>
            )}
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

  const selectedMeta = selectedItem ? getItemMeta(selectedItem.id) : null;
  const equippedCurrent = selectedMeta?.slot && player ? player.equipment[selectedMeta.slot] : null;

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-4 gap-2 rounded-xl border border-game-border bg-game-panel p-2 font-mono text-sm">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`items.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-game-border bg-game-panel p-3">
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
              {player?.inventory.length ?? 0}/20 {t('items.slots')}
            </div>
            <div className="grid min-h-0 grid-cols-4 gap-2 overflow-auto pr-1">
              {(player?.inventory ?? []).map((item) => {
                const meta = getItemMeta(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={['relative rounded-xl border bg-game-card p-3 transition-colors hover:bg-game-hover active:scale-95', rarityBorder[meta.rarity]].join(' ')}
                    onClick={() => openDetail(item)}
                  >
                    <span className="text-4xl">{meta.icon}</span>
                    {item.qty > 1 && <span className="absolute right-2 top-2 rounded bg-game-primary px-1.5 font-mono text-xs">×{item.qty}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {(tab === 'crafting' || tab === 'market') && (
          <div className="flex h-full items-center justify-center text-game-muted">{t('game.soon')}</div>
        )}
      </section>

      <Modal id={DETAIL_MODAL} title={selectedMeta ? itemName() : t('items.unknownItem')}>
        {selectedItem && selectedMeta && (
          <div className="grid gap-3">
            <header className="flex items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
              <span className="text-4xl">{selectedMeta.icon}</span>
              <div>
                <h2 className="font-title text-xl text-game-gold">{itemName()}</h2>
                <p className={['font-mono text-xs', rarityText[selectedMeta.rarity]].join(' ')}>
                  {t(`items.rarities.${selectedMeta.rarity}`)} • {selectedMeta.slot ? t(`items.slots.${selectedMeta.slot}`) : t('game.unknown')}
                </p>
              </div>
            </header>

            <p className="text-game-muted">{itemDesc()}</p>

            <section className="rounded-xl border border-game-border bg-game-card p-3">
              <h3 className="mb-2 font-title text-game-gold">{t('items.mainStats')}</h3>
              <div className="grid gap-1 font-mono text-sm">
                {Object.entries(selectedMeta.stats).map(([key, value]) => (
                  <span key={key} className={value >= 0 ? 'text-green-300' : 'text-red-300'}>
                    {t(key === 'atk' ? 'charCreate.stats.atk' : 'charCreate.stats.def')}: {value > 0 ? '+' : ''}{value}
                  </span>
                ))}
              </div>
            </section>

            {selectedMeta.spiritChance && (
              <section className="rounded-xl border border-game-border bg-game-card p-3 text-sm text-game-muted">
                {t('items.spiritStoneEffect')}: {t('items.spiritEffects.all_boost')} • {selectedMeta.spiritChance}%
              </section>
            )}

            {selectedMeta.isTwoHanded && <p className="rounded-lg border border-game-gold bg-game-primary p-2 text-sm text-game-gold">{t('items.twoHandedWarning')}</p>}

            <section className="rounded-xl border border-game-border bg-game-card p-3 text-sm text-game-muted">
              <h3 className="mb-1 font-title text-game-gold">{t('items.comparison')}</h3>
              {t('items.currentEquipped')}: {equippedCurrent ? t('items.unknownItem') : t('panels.none')}
            </section>

            <div className="grid grid-cols-2 gap-2">
              <Button
                disabled={!selectedMeta.slot}
                onClick={() => {
                  if (!equip(selectedItem.id)) {
                    addNotification(t('items.twoHandedBlocked'), 'warning');
                  }
                }}
              >
                {t('items.equip')}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm(t('items.confirmDiscard'))) {
                    removeItem(selectedItem.id, 1);
                  }
                }}
              >
                {t('items.discard')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
