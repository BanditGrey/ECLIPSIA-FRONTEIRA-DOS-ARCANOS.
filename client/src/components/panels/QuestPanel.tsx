import { useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { ProgressBar } from '../ui/ProgressBar';

type QuestTab = 'active' | 'completed';

interface QuestEntry {
  id: 'wolf_hunt_1' | 'goblin_slayer' | 'forest_explorer' | 'shadow_secret';
  icon: string;
  target: number;
  progress: number;
  rewardXp: number;
  rewardGold: number;
  rewardItem?: 'w1h_1003' | 'er_5100' | 'am_7001';
  secret?: boolean;
  unlocked?: boolean;
}

const QUEST_MODAL = 'modal-quest-detail';

const formatReward = (quest: QuestEntry, t: (path: string) => string) => {
  const parts = [`${quest.rewardXp} ${t('quests.rewardXp')}`, `${quest.rewardGold} ${t('quests.rewardGold')}`];

  if (quest.rewardItem) {
    parts.push(t(`items.names.${quest.rewardItem}`));
  }

  return parts.join(' + ');
};

export const QuestPanel = () => {
  const { t } = useI18n();
  const [tab, setTab] = useState<QuestTab>('active');
  const [selectedQuest, setSelectedQuest] = useState<QuestEntry | null>(null);
  const openModal = useGameStore((state) => state.openModal);
  const player = usePlayerStore((state) => state.data);

  const quests = useMemo<QuestEntry[]>(() => {
    const nytheraDiscoveries = player?.discoveries.filter((discovery) => discovery.toLowerCase().includes('nythera')).length ?? 0;

    return [
      {
        id: 'wolf_hunt_1',
        icon: '🐺',
        target: 10,
        progress: player?.kills.mist_wolf ?? 0,
        rewardXp: 500,
        rewardGold: 300,
        rewardItem: 'w1h_1003',
        unlocked: true
      },
      {
        id: 'goblin_slayer',
        icon: '👺',
        target: 15,
        progress: player?.kills.goblin ?? 0,
        rewardXp: 800,
        rewardGold: 500,
        rewardItem: 'er_5100',
        unlocked: true
      },
      {
        id: 'forest_explorer',
        icon: '🌲',
        target: 5,
        progress: nytheraDiscoveries,
        rewardXp: 600,
        rewardGold: 400,
        unlocked: true
      },
      {
        id: 'shadow_secret',
        icon: '🌑',
        target: 3,
        progress: nytheraDiscoveries,
        rewardXp: 1500,
        rewardGold: 1000,
        rewardItem: 'am_7001',
        secret: true,
        unlocked: nytheraDiscoveries >= 3
      }
    ];
  }, [player]);

  const completedQuests = quests.filter((quest) => quest.unlocked && quest.progress >= quest.target);
  const activeQuests = quests.filter((quest) => !quest.unlocked || quest.progress < quest.target);

  const openDetails = (quest: QuestEntry) => {
    setSelectedQuest(quest);
    openModal(QUEST_MODAL);
  };

  const visibleQuestName = (quest: QuestEntry) => (quest.secret && !quest.unlocked ? t('quests.secret') : t(`quests.${quest.id}.name`));
  const visibleQuestDesc = (quest: QuestEntry) => (quest.secret && !quest.unlocked ? t('quests.secretMystery') : t(`quests.${quest.id}.desc`));

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-game-border bg-game-panel p-2 font-mono text-sm">
        {(['active', 'completed'] as QuestTab[]).map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`quests.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-game-border bg-game-panel p-3">
        {tab === 'active' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {activeQuests.map((quest) => (
              <article key={quest.id} className="rounded-xl border border-game-border bg-game-card p-3">
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="text-3xl">{quest.secret && !quest.unlocked ? '❓' : quest.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-title text-lg text-game-gold">{quest.secret && !quest.unlocked ? t('quests.mystery') : visibleQuestName(quest)}</h2>
                      <p className="text-sm text-game-muted">{visibleQuestDesc(quest)}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" onClick={() => openDetails(quest)}>
                    {t('quests.viewDetails')}
                  </Button>
                </div>
                <div className="mt-3 grid gap-2">
                  <ProgressBar current={Math.min(quest.progress, quest.target)} max={quest.target} type="quest" showText />
                  <div className="flex justify-between font-mono text-xs text-game-muted">
                    <span>{t('quests.progressCounter')}: {Math.min(quest.progress, quest.target)}/{quest.target}</span>
                    <span>{t('quests.reward')}: {formatReward(quest, t)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === 'completed' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {completedQuests.length === 0 && <p className="text-game-muted">{t('quests.none')}</p>}
            {completedQuests.map((quest) => (
              <article key={quest.id} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{quest.icon}</span>
                  <div>
                    <h2 className="font-title text-lg text-game-gold">{visibleQuestName(quest)}</h2>
                    <p className="font-mono text-xs text-game-muted">
                      {t('quests.completedAt')}: {new Date(player?.lastLogin ?? Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-sm text-green-300">{t('quests.completed')}</span>
              </article>
            ))}
          </div>
        )}
      </section>

      <Modal id={QUEST_MODAL} title={selectedQuest ? visibleQuestName(selectedQuest) : t('quests.details')}>
        {selectedQuest && (
          <div className="grid gap-3">
            <p className="text-game-muted">{visibleQuestDesc(selectedQuest)}</p>
            <ProgressBar current={Math.min(selectedQuest.progress, selectedQuest.target)} max={selectedQuest.target} type="quest" showText />
            <p className="font-mono text-sm text-game-gold">
              {t('quests.reward')}: {formatReward(selectedQuest, t)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
