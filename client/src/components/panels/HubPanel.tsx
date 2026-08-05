import { useI18n } from '../../hooks/useI18n';
import { wikiTranslations } from '../../i18n/wiki';
import { useGameStore } from '../../store/useGameStore';
import { usePetStore } from '../../store/usePetStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import type { GamePanel } from '../../store/useGameStore';
import { ART } from '../../data/art';
import { ImpulseDisplay } from '../ui/ImpulseDisplay';
import { PetDisplay } from '../ui/PetDisplay';
import { ProgressBar } from '../ui/ProgressBar';
import { Portrait } from '../ui/Portrait';

export const HubPanel = () => {
  const { lang, t } = useI18n();
  const wiki = wikiTranslations[lang];
  const player = usePlayerStore((state) => state.data);
  const getTotalAtk = usePlayerStore((state) => state.getTotalAtk);
  const getTotalDef = usePlayerStore((state) => state.getTotalDef);
  const setPanel = useGameStore((state) => state.setPanel);
  const setScreen = useGameStore((state) => state.setScreen);
  const activePetId = usePetStore((state) => state.activePetId);
  const hasPetOrMount = Boolean(activePetId || player?.equipment.pet || player?.equipment.mount);

  const combatPower = (getTotalAtk() ?? 0) + (getTotalDef() ?? 0) + (player?.hp ?? 0);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4 text-game-text bg-game-dark">
      
      {/* ── CARD DO PERSONAGEM (DASHBOARD IDLE) ── */}
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/40 bg-night-900 p-4 shadow-glow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-night-950 via-night-900 to-night-800 opacity-90" />
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gold-500/10 blur-2xl" />
        
        <div className="relative flex items-center gap-4">
          <Portrait kind="class" id={player?.archetype ?? 'blade'} size={80} ring="gold" />
          <div className="flex-1 min-w-0">
            <h2 className="title-gold font-title text-2xl font-black truncate">{player?.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xs text-game-muted">{t('game.lvl')} {player?.level}</span>
              <span className="h-1 w-1 rounded-full bg-game-muted" />
              <span className="font-mono text-[10px] text-cyan-300 font-black">CP: {combatPower.toLocaleString()} ⚔️</span>
            </div>
            <div className="mt-2">
              <ProgressBar current={player?.xp ?? 0} max={player?.xpToNext ?? 100} type="xp" showText />
            </div>
          </div>
        </div>

        {/* Recursos Rápidos */}
        <div className="relative mt-4 flex items-center justify-between rounded-xl bg-black/40 p-2 px-4 border border-white/5">
          <div className="flex items-center gap-2 font-mono text-sm text-gold-300">
            <span className="text-lg">🪙</span> {player?.gold?.toLocaleString() ?? 0}
          </div>
          <div className="flex items-center gap-2 font-mono text-sm text-cyan-300">
            <span className="text-lg">💎</span> {player?.crystals?.toLocaleString() ?? 0}
          </div>
        </div>
      </div>

      {/* ── CTA PRINCIPAL: COMBATE ── */}
      <button 
        onClick={() => setPanel('combat')}
        className="group relative flex h-36 shrink-0 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-red-900/80 shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all hover:border-red-500 active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60" style={{ backgroundImage: `url(${ART.bg.combat})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/60 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-1">
          <span className="text-4xl drop-shadow-md transition-transform group-hover:scale-110 group-hover:animate-eclipsiaShake">⚔️</span>
          <span className="font-title text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ENTRAR EM COMBATE</span>
          <span className="font-mono text-[10px] text-red-300 uppercase tracking-widest bg-red-950/80 px-2 py-0.5 rounded border border-red-900">Modo Auto-Batalha</span>
        </div>
      </button>

      {/* ── BOTÕES SECUNDÁRIOS EM GRID IDLE ── */}
      <div className="grid grid-cols-2 gap-3 min-h-0">
        <button onClick={() => setPanel('city')} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-night-600 bg-night-800/80 py-4 transition-all hover:bg-night-700 hover:border-gold-500/50 active:scale-95 shadow-sm">
          <span className="text-3xl drop-shadow-md">🏰</span>
          <span className="font-title text-sm font-bold text-game-text">{t('hub.city')}</span>
        </button>
        <button onClick={() => setPanel('items')} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-night-600 bg-night-800/80 py-4 transition-all hover:bg-night-700 hover:border-arcane-500/50 active:scale-95 shadow-sm">
          <span className="text-3xl drop-shadow-md">🎒</span>
          <span className="font-title text-sm font-bold text-game-text">{t('hub.items')}</span>
        </button>
        <button onClick={() => setPanel('quest')} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-night-600 bg-night-800/80 py-4 transition-all hover:bg-night-700 hover:border-game-border active:scale-95 shadow-sm">
          <span className="text-3xl drop-shadow-md">📜</span>
          <span className="font-title text-sm font-bold text-game-text">{t('hub.quests')}</span>
        </button>
        <button onClick={() => setPanel('travel')} className="flex flex-col items-center justify-center gap-2 rounded-xl border border-night-600 bg-night-800/80 py-4 transition-all hover:bg-night-700 hover:border-game-border active:scale-95 shadow-sm">
          <span className="text-3xl drop-shadow-md">🗺️</span>
          <span className="font-title text-sm font-bold text-game-text">{t('hub.travel')}</span>
        </button>
      </div>

      {hasPetOrMount && (
        <div className="grid grid-cols-2 gap-3 mb-2 mt-auto">
          {player?.equipment.mount && <ImpulseDisplay />}
          {activePetId && <PetDisplay />}
        </div>
      )}
    </div>
  );
};
