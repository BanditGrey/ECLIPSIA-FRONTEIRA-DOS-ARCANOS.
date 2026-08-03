import { FormEvent, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { PlayerData } from '../../types/player.types';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

type Archetype = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

const archetypes: Array<{ id: Archetype; icon: string; atk: number; def: number; arc: number }> = [
  { id: 'blade', icon: '⚔', atk: 85, def: 45, arc: 25 },
  { id: 'arcane', icon: '🔮', atk: 35, def: 30, arc: 95 },
  { id: 'druid', icon: '🌿', atk: 45, def: 60, arc: 75 },
  { id: 'vanguard', icon: '🛡', atk: 55, def: 95, arc: 25 },
  { id: 'ranger', icon: '🏹', atk: 75, def: 40, arc: 35 },
  { id: 'spectre', icon: '🗡', atk: 80, def: 35, arc: 50 }
];

export const CharCreateScreen = () => {
  const { t } = useI18n();
  const setScreen = useGameStore((state) => state.setScreen);
  const setPanel = useGameStore((state) => state.setPanel);
  const addNotification = useGameStore((state) => state.addNotification);
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const [name, setName] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 3 || trimmedName.length > 20) {
      addNotification(t('charCreate.nameRequired'), 'error');
      return;
    }

    if (!selectedArchetype) {
      addNotification(t('charCreate.archetypeRequired'), 'error');
      return;
    }

    setLoading(true);

    try {
      const result = await API.player.create<{ playerData?: PlayerData; character?: PlayerData }>({ name: trimmedName, archetype: selectedArchetype });

      if (!result.success) {
        addNotification(t('errors.generic'), 'error');
        return;
      }

      const player = result.data.playerData ?? result.data.character;

      if (!player) {
        addNotification(t('errors.generic'), 'error');
        return;
      }

      setPlayer(player);
      setScreen('game');
      setPanel('hub');
    } catch {
      addNotification(t('errors.generic'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-game-dark p-4 text-game-text">
      <form className="mx-auto flex h-full w-full max-w-5xl flex-col rounded-2xl border border-game-border bg-game-primary p-5" onSubmit={handleSubmit}>
        <header className="shrink-0 text-center">
          <h1 className="font-title text-3xl font-black text-game-gold">{t('charCreate.destinyTitle')}</h1>
          <p className="mt-1 text-game-muted">{t('charCreate.subtitle')}</p>
        </header>

        <label className="mt-4 grid shrink-0 gap-1 text-sm text-game-muted">
          <span>{t('charCreate.nameLabel')}</span>
          <input
            className="input-field"
            value={name}
            minLength={3}
            maxLength={20}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('charCreate.namePlaceholder')}
            required
          />
        </label>

        <section className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden">
          {archetypes.map((archetype) => {
            const isSelected = selectedArchetype === archetype.id;

            return (
              <button
                key={archetype.id}
                type="button"
                className={[
                  'rounded-xl border bg-game-card p-4 text-left transition-all hover:bg-game-hover active:scale-[0.99]',
                  isSelected ? 'border-game-gold shadow-[0_0_16px_rgb(240_192_64_/_0.25)]' : 'border-game-border'
                ].join(' ')}
                onClick={() => setSelectedArchetype(archetype.id)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{archetype.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-title text-lg font-bold text-game-gold">
                      {t(`charCreate.archetypes.${archetype.id}.name`)}
                    </h2>
                    <p className="text-sm text-game-muted">{t(`charCreate.archetypes.${archetype.id}.desc`)}</p>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 font-mono text-[11px] text-game-muted">
                  <div className="grid grid-cols-[42px_1fr] items-center gap-2">
                    <span>{t('charCreate.stats.atk')}</span>
                    <ProgressBar current={archetype.atk} max={100} type="hp" />
                  </div>
                  <div className="grid grid-cols-[42px_1fr] items-center gap-2">
                    <span>{t('charCreate.stats.def')}</span>
                    <ProgressBar current={archetype.def} max={100} type="mp" />
                  </div>
                  <div className="grid grid-cols-[42px_1fr] items-center gap-2">
                    <span>{t('charCreate.stats.arc')}</span>
                    <ProgressBar current={archetype.arc} max={100} type="luck" />
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        <footer className="mt-4 shrink-0">
          <Button fullWidth loading={loading}>
            {t('charCreate.awaken')}
          </Button>
        </footer>
      </form>
    </div>
  );
};
