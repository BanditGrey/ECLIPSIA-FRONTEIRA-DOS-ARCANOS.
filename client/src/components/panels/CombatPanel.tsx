import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAudio } from '../../hooks/useAudio';
import { SkillEffectPanel } from '../effects/SkillEffectPanel';
import { ParticleSystem } from '../effects/ParticleSystem';
import { useI18n } from '../../hooks/useI18n';
import { ART } from '../../data/art';
import { Portrait } from '../ui/Portrait';
import { LayeredCharacter } from '../ui/LayeredCharacter';
import { MonsterLayered, MONSTER_GLOW } from '../ui/MonsterLayered';
import { SkillIcon } from '../ui/SkillIcon';
import { skillIconFor } from '../../utils/skillIcon';

const BOSS_IDS = ['bandit_leader', 'root_guardian', 'void_mirror', 'azhur', 'thal_mora', 'velkaryn'];
import { useCombatStore } from '../../store/useCombatStore';
import { useGameStore } from '../../store/useGameStore';
import { usePartyCombatStore } from '../../store/usePartyCombatStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { attack, defend, useSkill, flee } from '../../systems/combat';
import { CombatOutcomeScreen } from '../effects/CombatOutcomeScreen';
import { FloatingCombatText } from '../effects/FloatingCombatText';
import { ArcaneField } from '../effects/ArcaneField';
import { Button } from '../ui/Button';
import { ArcaneIcon } from '../ui/ArcaneIcon';
import { Modal } from '../ui/Modal';
import { ProgressBar } from '../ui/ProgressBar';

const SKILLS_MODAL = 'modal-combat-skills';
const LOG_MODAL = 'modal-combat-log';
const AUTO_MODAL = 'modal-combat-auto';
const LOOT_MODAL = 'modal-combat-loot';

const ActionButton = ({ children, onClick, variant = 'secondary' }: { children: ReactNode; onClick: () => void; variant?: 'secondary' | 'danger' }) => (
  <Button variant={variant} fullWidth onClick={onClick}>
    {children}
  </Button>
);

const SkillsModal = () => {
  const { t } = useI18n();
  const data = usePlayerStore((state) => state.data);
  const skills = data ? usePlayerStore.getState().getUsableSkillIds() : [];
  const cooldowns = useCombatStore((state) => state.skillCooldowns);

  return (
    <Modal id={SKILLS_MODAL} title={t('combat.skillsModal')}>
      <div className="grid gap-2">
        {skills.length === 0 && <p className="text-game-muted">{t('combat.noSkills')}</p>}
        {skills.map((skillId) => (
          <div key={skillId} className="rounded-lg border border-game-border bg-game-card p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SkillIcon name={skillIconFor(skillId)} size={24} />
                <strong className="text-game-gold">{t(`skills.${skillId}.name`)}</strong>
              </div>
              <span className="font-mono text-xs text-game-muted">
                {t('profile.skillInfo.cd')}: {cooldowns[skillId] ?? 0}
              </span>
            </div>
            <p className="mt-1 text-sm text-game-muted">{t(`skills.${skillId}.desc`)}</p>
            <div className="mt-2 flex justify-end">
              <Button size="sm" disabled={Boolean(cooldowns[skillId])} onClick={() => useSkill(skillId)}>
                {t('combat.cast')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const CombatLogModal = () => {
  const { t } = useI18n();
  const log = useCombatStore((state) => state.log);

  return (
    <Modal id={LOG_MODAL} title={t('combat.log.title')}>
      <div className="grid max-h-80 gap-2 overflow-auto pr-1 font-mono text-sm">
        {log.length === 0 && <p className="text-game-muted">{t('combat.log')}</p>}
        {log.map((entry, index) => (
          <div key={`${entry.turn}-${entry.type}-${index}`} className="rounded border border-game-border bg-game-card p-2">
            <span className="text-game-faded">#{entry.turn}</span> {entry.message}
          </div>
        ))}
      </div>
    </Modal>
  );
};

const AutoConfigModal = () => {
  const { t } = useI18n();
  const autoConfig = useCombatStore((state) => state.autoConfig);
  const setAutoConfig = useCombatStore((state) => state.setAutoConfig);
  const closeModal = useGameStore((state) => state.closeModal);

  return (
    <Modal id={AUTO_MODAL} title={t('combat.autoConfig.title')}>
      <div className="grid gap-3 text-sm text-game-text">
        <label className="grid gap-1">
          <span>{t('combat.autoConfig.mpThreshold')}</span>
          <input
            className="input-field"
            type="number"
            min={0}
            max={100}
            value={autoConfig.mpThreshold}
            onChange={(event) => setAutoConfig({ mpThreshold: Number(event.target.value) })}
          />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autoConfig.stopBoss} onChange={(event) => setAutoConfig({ stopBoss: event.target.checked })} />
          <span>{t('combat.autoConfig.stopBoss')}</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autoConfig.stopEvent} onChange={(event) => setAutoConfig({ stopEvent: event.target.checked })} />
          <span>{t('combat.autoConfig.stopEvent')}</span>
        </label>
        <Button onClick={closeModal}>{t('combat.autoConfig.save')}</Button>
      </div>
    </Modal>
  );
};

const LootModal = () => {
  const { t } = useI18n();

  return (
    <Modal id={LOOT_MODAL} title={t('combat.lootModal')}>
      <p className="text-game-muted">{t('combat.noLoot')}</p>
    </Modal>
  );
};

export const CombatPanel = () => {
  const [showParticles, setShowParticles] = useState(false);
  const audio = useAudio();
  const activeSkillEffect = useCombatStore((state) => state.skillEffect);
  const setActiveSkillEffect = useCombatStore((state) => state.setSkillEffect);
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const setPanel = useGameStore((state) => state.setPanel);
  const openModal = useGameStore((state) => state.openModal);
  const combat = useCombatStore();
  const huntSession = usePartyCombatStore((state) => state.session);
  const playerHit = useCombatStore((state) => state.playerHit);
  const [hitFx, setHitFx] = useState(false);
  const [hitKey, setHitKey] = useState(0);

  const [enemyShake, setEnemyShake] = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const [monsterAttacking, setMonsterAttacking] = useState(false);
  const [screenShake, setScreenShake] = useState<null | 'light' | 'heavy'>(null);
  const lastHpRef = React.useRef(player?.hp ?? 0);

  useEffect(() => {
    if (combat.log.length > 0) {
      const last = combat.log[combat.log.length - 1];
      if (['attack', 'skill', 'execute', 'pet'].includes(last.type)) {
        setEnemyShake(true);
        setTimeout(() => setEnemyShake(false), 400);
      } else if (last.type === 'enemy') {
        setPlayerShake(true);
        setMonsterAttacking(true);
        // Screen shake: heavy se dano > 25% maxHp, light caso contrário
        const curHp = player?.hp ?? 0;
        const maxHp = player?.maxHp ?? 1;
        const prev = lastHpRef.current;
        const dmg = Math.max(0, prev - curHp);
        const intensity = dmg / Math.max(1, maxHp);
        setScreenShake(intensity > 0.25 ? 'heavy' : 'light');
        setTimeout(() => setScreenShake(null), 450);
        setTimeout(() => setPlayerShake(false), 400);
        setTimeout(() => setMonsterAttacking(false), 500);
      }
    }
    lastHpRef.current = player?.hp ?? 0;
  }, [combat.log, player?.hp, player?.maxHp]);

  useEffect(() => {
    if (playerHit > 0) {
      setHitFx(true);
      setHitKey((k) => k + 1);
      const timer = setTimeout(() => setHitFx(false), 500);
      return () => clearTimeout(timer);
    }
  }, [playerHit]);

  const phase = useCombatStore((state) => state.phase);

  if (phase === 'victory' || phase === 'defeat') {
    return <CombatOutcomeScreen />;
  }

  if (!combat.active || !combat.enemy) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark p-4 text-game-text">
        <div className="grid max-w-sm gap-4 rounded-xl border border-night-600 bg-night-900/70 p-6 shadow-panel text-center">
          <p className="text-game-muted">{t('panels.selectRegion')}</p>
          <Button onClick={() => setPanel('travel')}>{t('panels.goTravel')}</Button>
        </div>
      </div>
    );
  }

  // ─── FINAL FANTASY STYLE LAYOUT ───
  return (
    <div className="relative flex h-full flex-col overflow-hidden text-game-text">
      {/* ═══ FULL-SCREEN BATTLEFIELD ═══ */}
      <div className={`relative flex-1 overflow-hidden ${screenShake === "heavy" ? "animate-[eclipsiaCritShake_0.45s_ease-out]" : screenShake === "light" ? "animate-[eclipsiaShake_0.35s_ease-out]" : ""}`}>
        {/* Background scenery */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ART.bg.combat})` }}
        />
        <ArcaneField className="absolute inset-0 h-full w-full opacity-50" density={0.8} />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/30 to-night-950/50" />

        {/* Floating combat text */}
        <FloatingCombatText />

        {/* ─── PLAYER SECTION (left side) ─── */}
        <div className="absolute left-0 top-0 flex h-full w-1/2 flex-col items-center justify-center">
          {/* Player sprite */}
          <div className="relative mb-4">
            {/* Hit flash overlay */}
            {hitFx && (
              <div key={hitKey} className="pointer-events-none absolute inset-0 z-10">
                <div className="absolute inset-0 animate-[eclipsiaShake_0.5s_ease] bg-gradient-to-b from-red-800/20 via-transparent to-red-800/20 rounded-full" />
                <ParticleSystem trigger={hitFx} type="hit" className="absolute inset-0 h-full w-full" />
              </div>
            )}

            <LayeredCharacter
              gender={(player?.gender as any) ?? 'male'}
              state={
                activeSkillEffect?.isCritical ? 'attack' :
                activeSkillEffect ? 'cast' :
                hitFx ? 'hit' :
                showParticles ? 'attack' :
                combat.autoFight ? 'walk' : 'idle'
              }
              size={160}
              flip={false}
              glowColor={
                activeSkillEffect?.damageType === 'physical' ? '#ef4444' :
                activeSkillEffect?.damageType === 'magical' ? '#3b82f6' :
                activeSkillEffect?.damageType === 'void' ? '#9333ea' :
                '#3fd9c4'
              }
            />
          </div>

          {/* Player info overlay */}
          <div className="w-48 rounded-lg border border-blue-800/50 bg-night-950/80 p-2 backdrop-blur-sm">
            <h3 className="font-title text-sm font-bold text-game-text text-center mb-1">{player?.name ?? t('game.unknown')}</h3>
            <p className="font-mono text-[10px] text-game-muted text-center mb-1">Lvl {player?.level ?? 0}</p>
            <div className="grid gap-1">
              <ProgressBar current={player?.hp ?? 0} max={player?.maxHp ?? 1} type="hp" showText />
              <ProgressBar current={player?.mp ?? 0} max={player?.maxMp ?? 1} type="mp" showText />
            </div>
          </div>
        </div>

        {/* ─── ENEMY SECTION (right side) ─── */}
        <div className="absolute right-0 top-0 flex h-full w-1/2 flex-col items-center justify-center">
          {/* Enemy sprite */}
          <div className="relative mb-4">
            {['goblin', 'rat', 'wolf_pup', 'mist_wolf', 'shadow_sprite', 'sand_scorpion', 'mirage_beast', 'dune_crawler', 'storm_harpy', 'cloud_titan', 'sea_wraith', 'deep_leviathan_jr', 'forest_golem'].includes(combat.enemy.id) ? (
              <MonsterLayered
                monsterId={combat.enemy.id as any}
                state={
                  enemyShake ? 'hit' :
                  monsterAttacking ? 'attack' :
                  'idle'
                }
                size={160}
                flip
                glowColor={BOSS_IDS.includes(combat.enemy.id) ? '#ef4444' : (MONSTER_GLOW as any)[combat.enemy.id]}
              />
            ) : (
              <Portrait kind={BOSS_IDS.includes(combat.enemy.id) ? 'boss' : 'monster'} id={combat.enemy.id} size={130} fallbackIcon={combat.enemy.icon} ring={BOSS_IDS.includes(combat.enemy.id) ? 'red' : 'arcane'} />
            )}
          </div>

          {/* Enemy info overlay */}
          <div className="w-48 rounded-lg border border-red-800/50 bg-night-950/80 p-2 backdrop-blur-sm">
            <h3 className="title-gold font-title text-sm font-bold text-center mb-1">{t(combat.enemy.nameKey)}</h3>
            <p className="font-mono text-[10px] text-game-muted text-center mb-1">Lvl {combat.enemy.level}</p>
            <ProgressBar current={combat.enemyHp} max={combat.enemyMaxHp} type="hp" showText />
          </div>
        </div>

        {/* ─── VS DIVIDER (center) ─── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="title-gold font-title text-lg font-black">VS</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </div>

        {/* ─── REGION INFO (top center) ─── */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
          <div className="rounded-full border border-night-600 bg-night-950/80 px-4 py-1 backdrop-blur-sm">
            <span className="font-mono text-xs text-game-muted">
              {combat.region || t('game.unknown')}
              {combat.isDungeon && ` · ${t('combat.floor')} ${combat.floor}/${combat.maxFloor}`}
            </span>
          </div>
        </div>

        {/* ─── HUNT SESSION INFO (if party hunting) ─── */}
        {huntSession && (
          <div className="absolute top-10 left-1/2 z-20 w-[min(24rem,92%)] -translate-x-1/2">
            <div className="rounded-lg border border-green-700/50 bg-night-950/85 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-center font-mono text-[10px] text-green-300">
                🎯 {t('partyCombat.activeHunt')}: {huntSession.region} · {t('partyCombat.round')} {huntSession.round} · ⚔ +{Math.round(huntSession.auraAtk)}% / 🛡 +{Math.round(huntSession.auraDef)}%
              </p>
              {huntSession.sizeBonus && (
                <p className="text-center font-mono text-[10px] text-green-200/80">
                  👥 {huntSession.members.length} {t('partyCombat.membersWord')} → +{huntSession.sizeBonus.xp}% XP · +{huntSession.sizeBonus.gold}% 🪙 · +{huntSession.sizeBonus.loot}% 🎁
                </p>
              )}
              {huntSession.dungeonId && huntSession.floor != null && (
                <p className="text-center font-mono text-[10px] text-green-200/80">
                  🏰 {t('partyCombat.floor')} {huntSession.floor}
                </p>
              )}
              {huntSession.members.length > 1 && (
                <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
                  {[...huntSession.members]
                    .sort((a, b) => b.dmg - a.dmg)
                    .map((member) => (
                      <p key={member.name} className="truncate font-mono text-[9px] text-green-100/70">
                        {member.name} · ⚔{member.dmg} · 💀{member.kills}
                      </p>
                    ))}
                </div>
              )}
              {combat.region !== huntSession.region && (
                <p className="mt-0.5 text-center font-mono text-[9px] text-yellow-300/90">
                  ⚠ {t('partyCombat.regionMismatch')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══ ACTION MENU (bottom) ═══ */}
      <div className="relative z-30 border-t-2 border-gold-400/30 bg-night-950/95 backdrop-blur-md">
        {/* Auto-fight indicator */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={combat.toggleAutoFight}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                combat.autoFight
                  ? 'border-green-400 bg-green-900/50 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                  : 'border-night-600 bg-night-900/80 text-game-muted hover:text-game-text'
              }`}
            >
              <ArcaneIcon name="auto" size={12} glow={combat.autoFight} className="inline mr-1" />
              AUTO {combat.autoFight ? 'ON' : 'OFF'}
            </button>
            <button
              type="button"
              onClick={combat.toggleAutoAdvance}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                combat.autoAdvance
                  ? 'border-blue-400 bg-blue-900/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                  : 'border-night-600 bg-night-900/80 text-game-muted hover:text-game-text'
              }`}
            >
              <ArcaneIcon name="advance" size={12} glow={combat.autoAdvance} className="inline mr-1" />
              ADVANCE {combat.autoAdvance ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Action buttons grid */}
        <div className="grid grid-cols-4 gap-2 p-3">
          <button
            type="button"
            onClick={() => { setShowParticles(true); attack(); }}
            className="flex flex-col items-center gap-1 rounded-lg border border-red-800/50 bg-red-950/40 py-3 transition-all hover:bg-red-900/50 hover:border-red-600/50 active:scale-95"
          >
            <ArcaneIcon name="sword" size={24} className="text-red-400" glow />
            <span className="font-title text-xs font-bold text-red-300">{t('combat.attack')}</span>
          </button>

          <button
            type="button"
            onClick={() => defend()}
            className="flex flex-col items-center gap-1 rounded-lg border border-blue-800/50 bg-blue-950/40 py-3 transition-all hover:bg-blue-900/50 hover:border-blue-600/50 active:scale-95"
          >
            <ArcaneIcon name="shield" size={24} className="text-blue-400" glow />
            <span className="font-title text-xs font-bold text-blue-300">{t('combat.defend')}</span>
          </button>

          <button
            type="button"
            onClick={() => openModal(SKILLS_MODAL)}
            className="flex flex-col items-center gap-1 rounded-lg border border-purple-800/50 bg-purple-950/40 py-3 transition-all hover:bg-purple-900/50 hover:border-purple-600/50 active:scale-95"
          >
            <ArcaneIcon name="magic" size={24} className="text-purple-400" glow />
            <span className="font-title text-xs font-bold text-purple-300">{t('combat.skills')}</span>
          </button>

          <button
            type="button"
            onClick={() => flee()}
            className="flex flex-col items-center gap-1 rounded-lg border border-yellow-800/50 bg-yellow-950/40 py-3 transition-all hover:bg-yellow-900/50 hover:border-yellow-600/50 active:scale-95"
          >
            <ArcaneIcon name="flee" size={24} className="text-yellow-400" />
            <span className="font-title text-xs font-bold text-yellow-300">{t('combat.flee')}</span>
          </button>
        </div>

        {/* Secondary actions */}
        <div className="flex justify-center gap-2 pb-2">
          <button type="button" onClick={() => openModal(LOG_MODAL)} className="font-mono text-[10px] text-game-muted hover:text-game-text transition-colors">
            {t('combat.log.title')}
          </button>
          <span className="text-game-faded">·</span>
          <button type="button" onClick={() => openModal(AUTO_MODAL)} className="font-mono text-[10px] text-game-muted hover:text-game-text transition-colors">
            {t('combat.autoConfig.title')}
          </button>
        </div>
      </div>

      {/* ═══ VFX OVERLAYS ═══ */}
      {showParticles && <ParticleSystem trigger={showParticles} type="attack" onComplete={() => setShowParticles(false)} className="absolute top-0 left-0 w-full h-full pointer-events-none z-20" />}
      {activeSkillEffect && <SkillEffectPanel {...activeSkillEffect} onComplete={() => setActiveSkillEffect(null)} showParticles narrate playSound />}

      {/* ═══ MODALS ═══ */}
      <SkillsModal />
      <CombatLogModal />
      <AutoConfigModal />
      <LootModal />
    </div>
  );
};
