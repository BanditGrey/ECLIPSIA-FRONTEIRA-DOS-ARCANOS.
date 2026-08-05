import { useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { PlayerData } from '../../types/player.types';
import { usePlayerStore } from '../../store/usePlayerStore';
import { ART } from '../../data/art';
import { ArcaneIcon } from '../ui/ArcaneIcon';
import { LayeredCharacter } from '../ui/LayeredCharacter';
import { ItemIcon, type ItemIconName } from '../ui/ItemIcon';

type Gender = 'male' | 'female';

const WEAPONS = [
  { id: 'w1h_1000', cat: 'sword_one', icon: 'sword' as ItemIconName },
  { id: 'w1h_1100', cat: 'dagger', icon: 'dagger' as ItemIconName },
  { id: 'w1h_1150', cat: 'staff_one', icon: 'staff' as ItemIconName },
  { id: 'w1h_1200', cat: 'bow_short', icon: 'bow' as ItemIconName },
];

export const CharCreateScreen = () => {
  const { t } = useI18n();
  const setScreen = useGameStore((s) => s.setScreen);
  const setPanel = useGameStore((s) => s.setPanel);
  const addNotification = useGameStore((s) => s.addNotification);
  const setPlayer = usePlayerStore((s) => s.setPlayer);

  const [gender, setGender] = useState<Gender>('female');
  const [name, setName] = useState('');
  const [weapon, setWeapon] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const n = name.trim();
    if (n.length < 3 || n.length > 20) { addNotification('Nome: 3-20 caracteres', 'error'); return; }
    if (!weapon) { addNotification('Escolha uma arma', 'error'); return; }
    setLoading(true);
    try {
      const res = await API.player.create<{ playerData?: PlayerData; character?: PlayerData }>({
        name: n, gender, archetype: 'blade', startingWeapon: weapon,
      });
      if (!res.success) { addNotification('Erro ao criar', 'error'); return; }
      const p = res.data.playerData ?? res.data.character;
      if (!p) { addNotification('Erro ao criar', 'error'); return; }
      setPlayer(p);
      setScreen('game');
      setPanel('hub');
    } catch { addNotification('Erro de rede', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="relative flex h-full overflow-hidden bg-game-dark text-game-text">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${ART.bg.login})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950/90 via-night-950/60 to-night-950/90" />

      <div className="relative z-10 flex h-full w-full">
        {/* LEFT: Character Preview */}
        <div className="hidden md:flex md:w-[55%] flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent opacity-60" />
          <LayeredCharacter gender={gender} state="idle" size={220} glowColor={gender === 'male' ? '#3b82f6' : '#a855f7'} />
          {name.trim() && (
            <div className="absolute bottom-16 text-center">
              <h2 className="title-gold text-glow font-title text-3xl font-black tracking-wide">{name.trim()}</h2>
              <p className="font-mono text-sm text-game-muted mt-1">{gender === 'male' ? 'Masculino' : 'Feminino'}</p>
            </div>
          )}
        </div>

        {/* RIGHT: Form */}
        <div className="flex w-full md:w-[45%] flex-col overflow-y-auto p-6">
          <header className="text-center mb-6">
            <div className="divider-ornate mx-auto mb-3 w-48"><span className="diamond" /></div>
            <h1 className="title-gold text-glow font-title text-2xl font-black tracking-[0.14em]">FORJE SEU DESTINO</h1>
          </header>

          {/* Gender */}
          <section className="mb-6">
            <h2 className="title-gold mb-3 font-title text-base font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold">1</span>
              Gênero
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button key={g} type="button" onClick={() => setGender(g)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all active:scale-95 overflow-hidden ${
                    gender === g ? 'border-gold-400 shadow-glow-gold bg-night-800/80' : 'border-night-600 bg-night-900/60 hover:border-gold-600/40'
                  }`}>
                  {gender === g && <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent" />}
                  <div className="relative h-20 w-14 overflow-hidden"><LayeredCharacter gender={g} state="idle" size={56} /></div>
                  <span className={`font-title text-sm font-bold ${gender === g ? 'text-gold-300' : 'text-game-muted'}`}>
                    {g === 'male' ? 'Masculino' : 'Feminino'}
                  </span>
                  {gender === g && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-night-950">
                      <ArcaneIcon name="star" size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Name */}
          <section className="mb-6">
            <h2 className="title-gold mb-3 font-title text-base font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold">2</span>
              Nome
            </h2>
            <input className="input-field text-lg" value={name} minLength={3} maxLength={20}
              onChange={(e) => setName(e.target.value)} placeholder="Digite o nome" />
            <p className="mt-1 font-mono text-[11px] text-game-faded">3-20 caracteres</p>
          </section>

          {/* Weapon */}
          <section className="mb-6">
            <h2 className="title-gold mb-3 font-title text-base font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold">3</span>
              Arma Inicial
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {WEAPONS.map((w) => (
                <button key={w.id} type="button" onClick={() => setWeapon(w.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-all active:scale-95 ${
                    weapon === w.id ? 'border-arcane-400 shadow-glow-arcane bg-night-800/90' : 'border-night-600 bg-night-900/70 hover:border-arcane-400/40'
                  }`}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                    weapon === w.id ? 'border-arcane-400/50 bg-arcane-500/15 text-arcane-300' : 'border-night-600 text-game-muted'
                  }`}><ItemIcon name={w.icon} size={18} /></span>
                  <span className={`font-mono text-xs ${weapon === w.id ? 'text-arcane-300' : 'text-game-muted'}`}>
                    {t(`proficiencies.${w.cat}.name`)}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="flex-1" />

          {/* Mobile preview */}
          <div className="md:hidden mb-4 flex justify-center">
            <div className="relative h-44 w-28 overflow-hidden rounded-xl border-2 border-gold-500/30">
              <LayeredCharacter gender={gender} state="idle" size={112} glowColor="#f0c04a" />
            </div>
          </div>

          <button type="button" disabled={name.trim().length < 3 || !weapon || loading} onClick={handleCreate}
            className={`w-full rounded-xl py-4 font-title text-lg font-black tracking-widest transition-all active:scale-[0.97] ${
              name.trim().length >= 3 && weapon ? 'btn-gold text-night-950' : 'border border-night-600 bg-night-800/60 text-game-muted cursor-not-allowed'
            }`}>
            {loading ? 'Criando...' : 'DESPERTAR'}
          </button>
        </div>
      </div>
    </div>
  );
};
