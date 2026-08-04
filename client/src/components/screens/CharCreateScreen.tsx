import { FormEvent, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { PlayerData } from '../../types/player.types';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ART } from '../../data/art';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { ClassSigil } from '../ui/ClassSigil';

type Archetype = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

const archetypes: Array<{ id: Archetype; atk: number; def: number; arc: number; glow: 'gold' | 'arcane' | 'violet' }> = [
  { id: 'blade', atk: 85, def: 45, arc: 25, glow: 'gold' },
  { id: 'arcane', atk: 35, def: 30, arc: 95, glow: 'arcane' },
  { id: 'druid', atk: 45, def: 60, arc: 75, glow: 'arcane' },
  { id: 'vanguard', atk: 55, def: 95, arc: 25, glow: 'gold' },
  { id: 'ranger', atk: 75, def: 40, arc: 35, glow: 'violet' },
  { id: 'spectre', atk: 80, def: 35, arc: 50, glow: 'violet' }
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
    <div className="relative flex h-screen overflow-hidden bg-game-dark text-game-text">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${ART.bg.hub})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/40 to-night-950/95" />
      <div className="bg-eclipsia absolute inset-0" />

      <form
        className="panel-arcane anim-up relative z-10 mx-auto my-4 flex h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl p-5 shadow-panel"
        onSubmit={handleSubmit}
      >
        <header className="shrink-0 text-center">
          <div className="divider-ornate mx-auto mb-3 w-72">
            <span className="diamond" />
          </div>
          <h1 className="title-gold text-glow font-title text-3xl font-black tracking-[0.14em]">
            {t('charCreate.destinyTitle')}
          </h1>
          <p className="mt-1 italic text-game-muted">{t('charCreate.subtitle')}</p>
        </header>

        <label className="mx-auto mt-4 grid w-full max-w-sm shrink-0 gap-1 text-sm text-game-muted">
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

        <section className="mt-5 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden lg:grid-cols-3">
          {archetypes.map((archetype) => {
            const isSelected = selectedArchetype === archetype.id;

            return (
              <button
                key={archetype.id}
                type="button"
                className={[
                  'group relative flex flex-col items-center gap-2 overflow-hidden rounded-xl border bg-gradient-to-b from-night-700/70 to-night-900/90 p-4 text-center transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]',
                  isSelected
                    ? 'border-gold-400 shadow-glow-gold'
                    : 'border-night-600 hover:border-gold-600/60 hover:shadow-glow-sm'
                ].join(' ')}
                onClick={() => setSelectedArchetype(archetype.id)}
              >
                {isSelected && (
                  <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                )}
                <ClassSigil
                  archetype={archetype.id}
                  size={88}
                  glow={archetype.glow}
                  className={isSelected ? 'scale-105 transition-transform' : 'opacity-90 transition-all group-hover:opacity-100'}
                />
                <div className="min-w-0">
                  <h2 className="title-gold font-title text-lg font-bold">
                    {t(`charCreate.archetypes.${archetype.id}.name`)}
                  </h2>
                  <p className="text-sm italic text-game-muted">{t(`charCreate.archetypes.${archetype.id}.desc`)}</p>
                </div>

                <div className="mt-1 grid w-full gap-1.5 font-mono text-[11px] text-game-muted">
                  <div className="grid grid-cols-[38px_1fr] items-center gap-2">
                    <span className="text-left">{t('charCreate.stats.atk')}</span>
                    <ProgressBar current={archetype.atk} max={100} type="hp" />
                  </div>
                  <div className="grid grid-cols-[38px_1fr] items-center gap-2">
                    <span className="text-left">{t('charCreate.stats.def')}</span>
                    <ProgressBar current={archetype.def} max={100} type="mp" />
                  </div>
                  <div className="grid grid-cols-[38px_1fr] items-center gap-2">
                    <span className="text-left">{t('charCreate.stats.arc')}</span>
                    <ProgressBar current={archetype.arc} max={100} type="luck" />
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        <footer className="mt-4 shrink-0">
          <Button fullWidth size="lg" loading={loading}>
            {t('charCreate.awaken')}
          </Button>
        </footer>
      </form>
    </div>
  );
};
