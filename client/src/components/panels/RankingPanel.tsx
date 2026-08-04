import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';

interface RankingEntry {
  id?: string;
  name: string;
  level?: number;
  xp?: number;
  pvpRating?: number;
  discoveries?: number;
}
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';

type RankingTab = 'level' | 'pvp' | 'discovery';

const medals = ['🥇', '🥈', '🥉'];

const sortEntries = (entries: RankingEntry[], tab: RankingTab) => {
  if (tab === 'level') {
    return [...entries].sort((a, b) => (b.level ?? 0) - (a.level ?? 0) || (b.xp ?? 0) - (a.xp ?? 0));
  }

  if (tab === 'discovery') {
    return [...entries].sort((a, b) => (b.discoveries ?? 0) - (a.discoveries ?? 0));
  }

  return entries;
};

export const RankingPanel = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [tab, setTab] = useState<RankingTab>('level');
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === 'pvp') {
      setEntries([]);
      return;
    }

    let mounted = true;
    setLoading(true);

    const loadRanking = async () => {
      const result = tab === 'level' ? await API.ranking.getByLevel(1) : await API.ranking.getByDiscoveries(1);

      if (!mounted) {
        return;
      }

      if (!result.success) {
        addNotification(t('errors.connection'), 'error');
        return;
      }

      const data = result.data as { entries?: RankingEntry[] };
      setEntries(sortEntries(data.entries ?? [], tab).slice(0, 20));
    };

    loadRanking().finally(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [addNotification, t, tab]);

  const rankedEntries = useMemo(() => sortEntries(entries, tab).slice(0, 20), [entries, tab]);

  const getValue = (entry: RankingEntry) => {
    if (tab === 'level') {
      return `${t('game.level')} ${entry.level ?? 0} • ${t('ranking.xp')} ${entry.xp ?? 0}`;
    }

    if (tab === 'discovery') {
      return `${t('ranking.discovery')}: ${entry.discoveries ?? 0}`;
    }

    return `${t('ranking.pvp')}: ${entry.pvpRating ?? 0}`;
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-night-600 bg-night-900/80 p-1.5 font-mono shadow-panel text-sm">
        {(['level', 'pvp', 'discovery'] as RankingTab[]).map((item) => (
          <button
            key={item}
            type="button"
            className={[tab === item ? 'btn-gold' : 'text-game-muted hover:bg-game-hover', 'rounded-lg py-2 transition-colors active:scale-95'].join(' ')}
            onClick={() => setTab(item)}
          >
            {t(`ranking.tabs.${item}`)}
          </button>
        ))}
      </div>

      <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        {tab === 'pvp' ? (
          <div className="flex h-full items-center justify-center text-game-muted">{t('ranking.soon.pvp')}</div>
        ) : loading ? (
          <div className="flex h-full items-center justify-center text-game-muted">{t('ranking.loading')}</div>
        ) : rankedEntries.length === 0 ? (
          <div className="flex h-full items-center justify-center text-game-muted">{t('ranking.empty')}</div>
        ) : (
          <div className="grid h-full gap-2 overflow-auto pr-1">
            {rankedEntries.map((entry, index) => {
              const isCurrentPlayer = entry.name === player?.name;

              return (
                <article
                  key={entry.id}
                  className={[
                    'grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-xl border bg-game-card p-3',
                    isCurrentPlayer ? 'border-game-gold shadow-[0_0_14px_rgb(240_192_64_/_0.18)]' : 'border-game-border'
                  ].join(' ')}
                >
                  <span className="text-center font-title text-xl text-game-gold">{medals[index] ?? `#${index + 1}`}</span>
                  <div className="min-w-0">
                    <h2 className={['truncate font-title text-lg', isCurrentPlayer ? 'text-game-gold' : 'text-game-text'].join(' ')}>
                      {entry.name}
                    </h2>
                    {isCurrentPlayer && <p className="font-mono text-xs text-game-muted">{t('ranking.you')}</p>}
                  </div>
                  <span className="font-mono text-sm text-game-muted">{getValue(entry)}</span>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
