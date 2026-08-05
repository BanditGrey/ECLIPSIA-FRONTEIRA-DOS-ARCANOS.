import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import { usePartyStore } from '../../store/usePartyStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { Equipment, PlayerData } from '../../types/player.types';
import { ART } from '../../data/art';
import { Button } from '../ui/Button';
import { Portrait } from '../ui/Portrait';

type Archetype = 'blade' | 'arcane' | 'druid' | 'vanguard' | 'ranger' | 'spectre';

interface CharacterSummary {
  id: string;
  name: string;
  archetype: Archetype;
  level: number;
  activeTitle?: string | null;
}

interface ServerAccount {
  characters: Array<CharacterSummary & { _id?: string }>;
}

const MAX_CHARACTERS = 5;
const MIN_PARTY_LEVEL = 10;
const MAX_EXTRA_PARTY_MEMBERS = 4;

const archetypeIcons: Record<Archetype, string> = {
  blade: '⚔',
  arcane: '🔮',
  druid: '🌿',
  vanguard: '🛡',
  ranger: '🏹',
  spectre: '🗡'
};

const emptyEquipment: Equipment = {
  weapon_main: null,
  weapon_off: null,
  head: null,
  chest: null,
  legs: null,
  gloves: null,
  boots: null,
  earring: null,
  necklace: null,
  belt: null,
  resistance: null,
  amulet: null,
  spirit_stone: null,
  pet: null,
  mount: null
};

const normalizeCharacters = (account: ServerAccount): CharacterSummary[] => {
  return account.characters.map((character) => ({
    id: character.id ?? character._id ?? character.name,
    name: character.name,
    archetype: character.archetype,
    level: character.level,
    activeTitle: character.activeTitle ?? null
  }));
};

export const CharacterSelectScreen = () => {
  const { t } = useI18n();
  const setScreen = useGameStore((state) => state.setScreen);
  const setPanel = useGameStore((state) => state.setPanel);
  const addNotification = useGameStore((state) => state.addNotification);
  const setPlayer = usePlayerStore((state) => state.setPlayer);
  const setMembers = usePartyStore((state) => state.setMembers);
  const clearParty = usePartyStore((state) => state.clearParty);
  const [characters, setCharacters] = useState<CharacterSummary[]>([]);
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [partyMode, setPartyMode] = useState(false);
  const [partyIds, setPartyIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    API.player.get<ServerAccount>().then((result) => {
      if (!mounted) {
        return;
      }

      if (!result.success) {
        addNotification(t('errors.generic'), 'error');
        return;
      }

      const normalized = normalizeCharacters(result.data);
      setCharacters(normalized);
      setActiveCharacterId(normalized[0]?.id ?? null);
    });

    return () => {
      mounted = false;
    };
  }, [addNotification]);

  const activeCharacter = useMemo(
    () => characters.find((character) => character.id === activeCharacterId) ?? null,
    [activeCharacterId, characters]
  );

  const handleToggleParty = (character: CharacterSummary) => {
    if (character.level < MIN_PARTY_LEVEL || character.id === activeCharacterId) {
      return;
    }

    if (partyIds.includes(character.id)) {
      setPartyIds((current) => current.filter((id) => id !== character.id));
      return;
    }

    if (partyIds.length >= MAX_EXTRA_PARTY_MEMBERS) {
      addNotification(t('charSelect.partyFull'), 'warning');
      return;
    }

    setPartyIds((current) => [...current, character.id]);
  };

  const handleDelete = async (character: CharacterSummary) => {
    if (!window.confirm(t('charSelect.confirmDelete'))) {
      return;
    }

    const result = await API.player.deleteCharacter(character.id);

    if (!result.success) {
      addNotification(t('errors.generic'), 'error');
      return;
    }

    setCharacters((current) => current.filter((item) => item.id !== character.id));
    setPartyIds((current) => current.filter((id) => id !== character.id));

    if (activeCharacterId === character.id) {
      setActiveCharacterId(null);
    }
  };

  const handleEnterGame = async () => {
    if (!activeCharacter) {
      addNotification(t('charSelect.selectCharacter'), 'warning');
      return;
    }

    setLoading(true);

    try {
      const result = await API.player.selectCharacter<{ playerData?: PlayerData; character?: PlayerData }>(activeCharacter.id);

      if (!result.success) {
        clearParty();
        addNotification(t('errors.generic'), 'error');
        return;
      }

      const playerData = result.data.playerData ?? result.data.character;

      if (!playerData) {
        clearParty();
        addNotification(t('errors.generic'), 'error');
        return;
      }

      const partyCharacters = [activeCharacter, ...characters.filter((character) => partyIds.includes(character.id))];

      setPlayer(playerData);
      setMembers(
        partyCharacters.map((character) => ({
          id: character.id,
          name: character.name,
          archetype: character.archetype,
          icon: archetypeIcons[character.archetype],
          level: character.level,
          hp: 100,
          maxHp: 100,
          mp: 50,
          maxMp: 50,
          skills: [],
          equipment: emptyEquipment,
          progress: {},
          isActive: character.id === activeCharacter.id,
          isAlive: true
        }))
      );
      setScreen('game');
      setPanel('hub');
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

      <section className="panel-arcane anim-up relative z-10 mx-auto my-4 flex h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-xl p-5 shadow-panel">
        <header className="flex shrink-0 items-center justify-between border-b border-game-border pb-4">
          <div className="flex items-center gap-3">
            <img src={ART.emblem} alt="" className="h-9 w-9 rounded-full opacity-90" draggable={false} />
            <h1 className="title-gold text-glow font-title text-2xl font-black tracking-[0.16em]">
              {t('game.title')}
            </h1>
          </div>
          <span className="chip text-game-muted">
            {characters.length}/{MAX_CHARACTERS} {t('charSelect.chars')}
          </span>
        </header>

        <div className="mt-4 min-h-0 flex-1 overflow-hidden">
          {characters.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-game-border text-game-muted">
              <img src={ART.emblem} alt="" className="h-20 w-20 animate-floaty rounded-full opacity-40" draggable={false} />
              <span className="italic">{t('charSelect.noCharacters')}</span>
            </div>
          ) : (
            <div className="grid h-full gap-3 overflow-auto pr-1">
              {characters.map((character) => {
                const isActive = activeCharacterId === character.id;
                const isParty = partyIds.includes(character.id);
                const canJoinParty = character.level >= MIN_PARTY_LEVEL && !isActive;

                return (
                  <article
                    key={character.id}
                    className={[
                      'grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border bg-gradient-to-r from-night-700/60 to-night-900/80 p-4 transition-all',
                      isActive
                        ? 'border-gold-400 shadow-glow-gold'
                        : 'border-night-600 hover:border-gold-600/50 hover:shadow-glow-sm'
                    ].join(' ')}
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <Portrait
                        kind="class"
                        id={character.archetype}
                        size={64}
                        fallbackIcon={archetypeIcons[character.archetype]}
                        className="opacity-95"
                      />
                      <div className="min-w-0">
                        <h2 className="truncate font-title text-xl font-bold text-game-text">{character.name}</h2>
                        <p className="font-mono text-sm text-game-muted">
                          {t('game.lvl')} {character.level}
                        </p>
                        <div className="mt-1.5 flex gap-2 font-mono text-[10px] font-bold">
                          {isActive && (
                            <span className="rounded bg-gradient-to-b from-gold-300 to-gold-500 px-2 py-0.5 text-night-950 shadow-glow-sm">
                              {t('charSelect.activeBadge')}
                            </span>
                          )}
                          {isParty && (
                            <span className="rounded bg-gradient-to-b from-cyan-600 to-cyan-800 px-2 py-0.5 text-white">
                              {t('charSelect.partyBadge')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      <Button size="sm" variant={isActive ? 'primary' : 'secondary'} onClick={() => setActiveCharacterId(character.id)}>
                        {t('charSelect.play')}
                      </Button>

                      {partyMode && canJoinParty && (
                        <Button
                          size="sm"
                          variant={isParty ? 'danger' : 'secondary'}
                          disabled={!isParty && partyIds.length >= MAX_EXTRA_PARTY_MEMBERS}
                          onClick={() => handleToggleParty(character)}
                        >
                          {isParty ? t('charSelect.removeParty') : t('charSelect.addParty')}
                        </Button>
                      )}

                      {partyMode && character.level < MIN_PARTY_LEVEL && !isActive && (
                        <Button size="sm" variant="ghost" disabled>
                          {t('party.levelReq')}
                        </Button>
                      )}

                      <Button size="sm" variant="danger" onClick={() => handleDelete(character)}>
                        🗑
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <footer className="mt-4 grid shrink-0 grid-cols-3 gap-3 border-t border-game-border pt-4">
          <Button variant="secondary" disabled={characters.length >= MAX_CHARACTERS} onClick={() => setScreen('char-create')}>
            + {t('charSelect.createNew')}
          </Button>
          <Button variant={partyMode ? 'success' : 'secondary'} onClick={() => setPartyMode((current) => !current)}>
            {partyMode ? t('charSelect.cancelParty') : t('charSelect.manageParty')}
          </Button>
          <Button loading={loading} disabled={!activeCharacter} onClick={handleEnterGame}>
            {t('charSelect.enterGame')}
          </Button>
        </footer>
      </section>
    </div>
  );
};
