import { useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Equipment } from '../../types/player.types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MailPanel } from './MailPanel';
import { TradePanel } from './TradePanel';

type CityTab = 'tavern' | 'shop' | 'blacksmith' | 'sage' | 'board' | 'mail' | 'trade';
type ShopFilter = 'all' | 'weapons' | 'armor' | 'accessories' | 'pet' | 'mount';
type NpcId = 'old_merchant' | 'adventurer' | 'mysterious' | 'beast_tamer';

type EquipmentSlot = keyof Equipment;

interface NpcEntry {
  id: NpcId;
  icon: string;
  minLevel?: number;
  requiredTitle?: string;
  cost: number;
}

interface ShopEntry {
  id: string;
  icon: string;
  category: ShopFilter;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
  price: number;
  level: number;
  stats: string;
}

const tabs: CityTab[] = ['tavern', 'shop', 'blacksmith', 'sage', 'board', 'mail', 'trade'];
const filters: ShopFilter[] = ['all', 'weapons', 'armor', 'accessories', 'pet', 'mount'];
const equipmentSlots: EquipmentSlot[] = ['weapon_main', 'weapon_off', 'head', 'chest', 'legs', 'gloves', 'boots', 'earring', 'necklace', 'belt', 'resistance', 'amulet', 'spirit_stone', 'pet', 'mount'];
const NPC_MODAL = 'modal-city-npc';

const npcs: NpcEntry[] = [
  { id: 'old_merchant', icon: '🧓', cost: 0 },
  { id: 'adventurer', icon: '⚔', minLevel: 10, cost: 25 },
  { id: 'mysterious', icon: '🌑', requiredTitle: 'veil_tracker', cost: 50 },
  { id: 'beast_tamer', icon: '🐾', minLevel: 15, cost: 35 }
];

const shopItems: ShopEntry[] = [
  { id: 'sword_one_common_shop', icon: '⚔', category: 'weapons', rarity: 'common', price: 100, level: 1, stats: '+10' },
  { id: 'ch_3001', icon: '🥋', category: 'armor', rarity: 'uncommon', price: 160, level: 5, stats: '+8' },
  { id: 'amulet_rare_shop', icon: '🔮', category: 'accessories', rarity: 'rare', price: 300, level: 10, stats: '+5' },
  { id: 'pet_common_shop', icon: '🐾', category: 'pet', rarity: 'common', price: 250, level: 1, stats: '+1' },
  { id: 'mount_common_shop', icon: '🐴', category: 'mount', rarity: 'common', price: 500, level: 15, stats: '10%'
  }
];

const questIds = ['hunt_wolves', 'explore_forest', 'kill_boss'] as const;

export const CityPanel = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<CityTab>('tavern');
  const [filter, setFilter] = useState<ShopFilter>('all');
  const [selectedNpc, setSelectedNpc] = useState<NpcEntry | null>(null);
  const [seenDialogues, setSeenDialogues] = useState<string[]>([]);
  const openModal = useGameStore((state) => state.openModal);
  const addNotification = useGameStore((state) => state.addNotification);
  const player = usePlayerStore((state) => state.data);
  const spendGold = usePlayerStore((state) => state.spendGold);
  const addItem = usePlayerStore((state) => state.addItem);

  const visibleShopItems = useMemo(() => shopItems.filter((item) => filter === 'all' || item.category === filter), [filter]);

  const canAccessNpc = (npc: NpcEntry) => {
    if (npc.minLevel && (player?.level ?? 0) < npc.minLevel) {
      return false;
    }

    if (npc.requiredTitle && !player?.titles.includes(npc.requiredTitle)) {
      return false;
    }

    return true;
  };

  const talkToNpc = (npc: NpcEntry) => {
    if (!canAccessNpc(npc)) {
      addNotification(t('errors.levelRequired'), 'warning');
      return;
    }

    if (npc.cost > 0 && !spendGold(npc.cost)) {
      addNotification(t('errors.notEnoughGold'), 'error');
      return;
    }

    setSeenDialogues((current) => (current.includes(npc.id) ? current : [...current, npc.id]));
    setSelectedNpc(npc);
    openModal(NPC_MODAL);
  };

  const buyItem = (item: ShopEntry) => {
    if ((player?.level ?? 0) < item.level) {
      addNotification(t('errors.levelRequired'), 'warning');
      return;
    }

    if (!spendGold(item.price)) {
      addNotification(t('errors.notEnoughGold'), 'error');
      return;
    }

    if (!addItem(item.id, 1)) {
      addNotification(t('errors.inventoryFull'), 'error');
      return;
    }

    addNotification(t('city.bought'), 'success');
  };

  const upgradeCost = (itemId: string) => {
    const statTotal = itemId.toLowerCase().includes('weapon') || itemId.toLowerCase().includes('sword') ? 10 : 6;

    return statTotal * 50;
  };
  const resetCost = (player?.level ?? 1) * 100;

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-7 gap-2 rounded-xl border border-night-600 bg-night-900/80 p-1.5 font-mono text-xs shadow-panel">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'btn-gold' : 'text-game-muted hover:bg-night-800/70 hover:text-game-text', 'rounded-lg py-2 transition-all active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`city.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        {tab === 'tavern' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            <blockquote className="rounded-xl border border-night-600 bg-gradient-to-b from-night-700/60 to-night-900/80 p-4 text-center italic text-game-muted shadow-panel">
              {t('city.tavernQuote')}
            </blockquote>
            <div className="grid grid-cols-2 gap-3">
              {npcs.map((npc) => {
                const unlocked = canAccessNpc(npc);
                const seen = seenDialogues.includes(npc.id);

                return (
                  <article
                    key={npc.id}
                    className={[
                      'rounded-xl border bg-gradient-to-b from-night-700/60 to-night-900/85 p-3 transition-all',
                      unlocked ? 'border-night-600 hover:border-gold-600/60 hover:shadow-glow-sm' : 'border-night-700 opacity-75'
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <span className="sigil-disc h-12 w-12 text-2xl">{npc.icon}</span>
                      <div className="min-w-0 flex-1">
                        <h2 className="title-gold truncate font-title text-lg font-bold">{t(`city.npcs.${npc.id}.name`)}</h2>
                        <span className="chip !px-2 !py-0 text-[10px] text-game-muted">
                          {seen ? t('panels.seen') : t('panels.newRumors')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-game-muted">
                        {npc.cost > 0 ? `${t('panels.cost')}: ${npc.cost} ${t('header.gold')}` : t('panels.free')}
                      </span>
                      <Button size="sm" disabled={!unlocked} onClick={() => talkToNpc(npc)}>
                        {t('city.talk')}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'shop' && (
          <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <Button key={item} size="sm" variant={filter === item ? 'primary' : 'secondary'} onClick={() => setFilter(item)}>
                  {t(`city.filters.${item}`)}
                </Button>
              ))}
            </div>
            <div className="grid min-h-0 gap-2 overflow-auto pr-1">
              {visibleShopItems.map((item) => {
                const canBuy = (player?.gold ?? 0) >= item.price && (player?.level ?? 0) >= item.level;

                return (
                  <article key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h2 className="font-title text-lg text-game-gold">{t('items.unknownItem')}</h2>
                        <p className="font-mono text-xs text-game-muted">
                          {t(`items.rarities.${item.rarity}`)} • {t('items.mainStats')} {item.stats} • {t('city.price')} {item.price} {t('header.gold')}
                        </p>
                        <p className="font-mono text-xs text-game-faded">
                          {t('city.levelReq')} {item.level}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant={canBuy ? 'success' : 'secondary'} disabled={!canBuy} onClick={() => buyItem(item)}>
                      {canBuy ? t('city.canBuy') : t('city.cantBuy')}
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {tab === 'blacksmith' && (
          <div className="grid h-full gap-2 overflow-auto pr-1">
            <p className="text-game-muted">{t('city.blacksmithDesc')}</p>
            {equipmentSlots.map((slot) => {
              const itemId = player?.equipment[slot];

              return (
                <article key={slot} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                  <div>
                    <h2 className="font-title text-game-gold">{t(`items.slots.${slot}`)}</h2>
                    <p className="font-mono text-sm text-game-muted">{itemId ? t('items.unknownItem') : t('items.slotEmpty')}</p>
                  </div>
                  <Button size="sm" disabled={!itemId} onClick={() => itemId && spendGold(upgradeCost(itemId))}>
                    {t('city.upgrade')} • {itemId ? upgradeCost(itemId) : 0} {t('header.gold')}
                  </Button>
                </article>
              );
            })}
          </div>
        )}

        {tab === 'sage' && (
          <div className="grid h-full content-start gap-3 overflow-auto pr-1">
            <article className="rounded-xl border border-game-border bg-game-card p-4">
              <h2 className="font-title text-lg text-game-gold">{t('city.learnSkill')}</h2>
              <p className="mt-1 text-game-muted">{t('game.soon')}</p>
            </article>
            <article className="rounded-xl border border-game-border bg-game-card p-4">
              <h2 className="font-title text-lg text-game-gold">{t('city.resetStats')}</h2>
              <p className="mt-1 text-game-muted">{t('city.resetStatsDesc')}</p>
              <Button className="mt-3" disabled={(player?.gold ?? 0) < resetCost} onClick={() => spendGold(resetCost)}>
                {t('city.reset')} • {resetCost} {t('header.gold')}
              </Button>
            </article>
          </div>
        )}

        {tab === 'board' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {questIds.map((questId, index) => (
              <article key={questId} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                <div>
                  <h2 className="font-title text-lg text-game-gold">{t(`quests.${questId}.name`)}</h2>
                  <p className="text-sm text-game-muted">{t(`quests.${questId}.desc`)}</p>
                  <p className="font-mono text-xs text-game-faded">
                    {t('city.levelReq')} {index * 10 + 1}
                  </p>
                </div>
                <Button size="sm">{t('city.accept')}</Button>
              </article>
            ))}
          </div>
        )}

        {tab === 'mail' && <MailPanel />}

        {tab === 'trade' && <TradePanel />}
      </section>

      <Modal id={NPC_MODAL} title={selectedNpc ? t(`city.npcs.${selectedNpc.id}.name`) : t('city.tavern')}>
        {selectedNpc && (
          <div className="grid gap-3">
            <p className="rounded-xl border border-game-border bg-game-card p-3 text-game-muted">{t(`city.dialogues.${selectedNpc.id}`)}</p>
            <Button>{t('city.askMore')}</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
