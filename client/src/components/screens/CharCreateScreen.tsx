import { FormEvent, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { PlayerData } from '../../types/player.types';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ART } from '../../data/art';
import { STARTING_WEAPONS } from '../../data/proficiencies';
import { Button } from '../ui/Button';
import { Portrait } from '../ui/Portrait';

type Archetype = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

const ORIGIN_ICONS: Record<Archetype, string> = {
  blade: '⚔',
  arcane: '🔮',
  druid: '🌿',
  vanguard: '🛡',
  ranger: '🏹',
  spectre: '🗡'
};

export const CharCreateScreen = () => {
  const { t } = useI18n();
  const setScreen = useGameStore((state) => state.setScreen);
  const setPanel = useGameStore((state) => state.setPanel);
  const addNotification = useGameStore((state) => state.addNotification);
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const [name, setName] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState<Archetype | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 3 || trimmedName.length > 20) {
      addNotification(t('charCreate.nameRequired'), 'error');
      return;
    }

    if (!selectedOrigin) {
      addNotification(t('charCreate.originRequired'), 'error');
      return;
    }

    if (!selectedWeapon) {
      addNotification(t('charCreate.weaponRequired'), 'error');
      return;
    }

    setLoading(true);

    try {
      const result = await API.player.create<{ playerData?: PlayerData; character?: PlayerData }>({
        name: trimmedName,
        archetype: selectedOrigin,
        startingWeapon: selectedWeapon
      });

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
    <div className="relative flex h-full overflow-hidden bg-game-dark text-game-text">
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

        {/* ORIGEM — cosmética (retrato/sigilo/identidade) */}
        <div className="mt-4 shrink-0">
          <h2 className="title-gold mb-2 text-center font-title text-lg font-bold tracking-wide">
            {t('charCreate.originTitle')}
          </h2>
          <p className="mb-3 text-center font-mono text-[11px] text-game-faded">
            {t('charCreate.originHint')}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {(['blade', 'arcane', 'druid', 'vanguard', 'ranger', 'spectre'] as Archetype[]).map((origin) => {
              const isSelected = selectedOrigin === origin;

              return (
                <button
                  key={origin}
                  type="button"
                  className={[
                    'group flex flex-col items-center gap-1.5 rounded-xl border bg-gradient-to-b from-night-700/70 to-night-900/90 p-2.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95',
                    isSelected
                      ? 'border-gold-400 shadow-glow-gold'
                      : 'border-night-600 hover:border-gold-600/60 hover:shadow-glow-sm'
                  ].join(' ')}
                  onClick={() => setSelectedOrigin(origin)}
                >
                  <Portrait
                    kind="class"
                    id={origin}
                    size={56}
                    fallbackIcon={ORIGIN_ICONS[origin]}
                    className={isSelected ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}
                  />
                  <span className={`truncate font-mono text-[11px] ${isSelected ? 'text-gold-300' : 'text-game-muted group-hover:text-game-text'}`}>
                    {t(`charCreate.archetypes.${origin}.name`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ARMA INICIAL — define a primeira proficiência */}
        <div className="mt-4 shrink-0">
          <h2 className="title-gold mb-2 text-center font-title text-lg font-bold tracking-wide">
            {t('charCreate.weaponTitle')}
          </h2>
          <p className="mb-3 text-center font-mono text-[11px] text-game-faded">
            {t('charCreate.weaponHint')}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STARTING_WEAPONS.map((weapon) => {
              const isSelected = selectedWeapon === weapon.itemRef;

              return (
                <button
                  key={weapon.itemRef}
                  type="button"
                  className={[
                    'flex items-center justify-center gap-2 rounded-xl border bg-gradient-to-b from-night-700/70 to-night-900/90 px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95',
                    isSelected
                      ? 'border-arcane-400 shadow-glow-arcane'
                      : 'border-night-600 hover:border-arcane-400/60 hover:shadow-glow-sm'
                  ].join(' ')}
                  onClick={() => setSelectedWeapon(weapon.itemRef)}
                >
                  <span className={`text-xl ${isSelected ? '' : 'opacity-80'}`}>{weapon.icon}</span>
                  <span className={`font-mono text-xs ${isSelected ? 'text-arcane-300' : 'text-game-muted group-hover:text-game-text'}`}>
                    {t(`proficiencies.${weapon.category}.name`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1" />

        <footer className="mt-4 shrink-0">
          <Button fullWidth size="lg" loading={loading}>
            {t('charCreate.awaken')}
          </Button>
        </footer>
      </form>
    </div>
  );
};
