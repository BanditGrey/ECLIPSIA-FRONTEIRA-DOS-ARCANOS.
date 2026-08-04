import type { ReactNode } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { ART } from '../../data/art';
import { Portrait } from '../ui/Portrait';

const BOSS_IDS = ['bandit_leader', 'root_guardian', 'void_mirror', 'azhur', 'thal_mora', 'velkaryn'];
import { useCombatStore } from '../../store/useCombatStore';
import { useGameStore } from '../../store/useGameStore';
import { usePartyCombatStore } from '../../store/usePartyCombatStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';
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
  const skills = usePlayerStore((state) => state.data?.skills ?? []);
  const cooldowns = useCombatStore((state) => state.skillCooldowns);

  return (
    <Modal id={SKILLS_MODAL} title={t('combat.skillsModal')}>
      <div className="grid gap-2">
        {skills.length === 0 && <p className="text-game-muted">{t('combat.noSkills')}</p>}
        {skills.map((skillId) => (
          <div key={skillId} className="rounded-lg border border-game-border bg-game-card p-3">
            <div className="flex items-center justify-between gap-3">
              <strong className="text-game-gold">{t(`skills.${skillId}.name`)}</strong>
              <span className="font-mono text-xs text-game-muted">
                {t('profile.skillInfo.cd')}: {cooldowns[skillId] ?? 0}
              </span>
            </div>
            <p className="mt-1 text-sm text-game-muted">{t(`skills.${skillId}.desc`)}</p>
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
        <Button>{t('combat.autoConfig.save')}</Button>
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
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const setPanel = useGameStore((state) => state.setPanel);
  const openModal = useGameStore((state) => state.openModal);
  const combat = useCombatStore();
  const huntSession = usePartyCombatStore((state) => state.session);

  if (!combat.active || !combat.enemy) {
    return (
      <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark p-4 text-game-text">
        <div className="grid max-w-sm gap-4 rounded-xl border border-game-border bg-game-panel p-6 text-center">
          <p className="text-game-muted">{t('panels.selectRegion')}</p>
          <Button onClick={() => setPanel('travel')}>{t('panels.goTravel')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <div className="grid gap-2">
        <header className="flex items-center justify-between rounded-lg border border-game-border bg-game-panel px-3 py-2 font-mono text-sm text-game-muted">
          <span>{combat.region || t('game.unknown')}</span>
          {combat.isDungeon && (
            <span>
              {t('combat.floor')} {combat.floor}/{combat.maxFloor}
            </span>
          )}
        </header>

        {huntSession && (
          <div className="rounded-lg border border-green-700 bg-game-panel px-3 py-1.5 font-mono text-xs text-green-300">
            <p>
              🎯 {t('partyCombat.activeHunt')} · {t('partyCombat.round')} {huntSession.round} · ⚔ +{huntSession.auraAtk}% 🛡 +{huntSession.auraDef}%
              {huntSession.sizeBonus && (
                <>
                  {' '}· 👥 {huntSession.members.length} → +{huntSession.sizeBonus.xp}% XP · +{huntSession.sizeBonus.gold}% 🪙 · +{huntSession.sizeBonus.loot}% 🎁
                </>
              )}
              {huntSession.dungeonId && (
                <>
                  {' '}· 🏰 {t('partyCombat.floor')} {huntSession.floor ?? 1}
                </>
              )}
              {combat.region !== huntSession.region && <span className="text-yellow-300"> · {t('partyCombat.regionMismatch')}</span>}
            </p>
            <p className="text-green-200/80">
              {[...huntSession.members]
                .sort((a, b) => b.dmg - a.dmg)
                .map((member) => `${member.name} ${member.dmg}⚔ ${member.kills}💀`)
                .join(' · ')}
            </p>
          </div>
        )}
      </div>

      <main className="grid min-h-0 grid-rows-[1fr_auto_1fr] gap-3 overflow-hidden">
        {/* Inimigo — campo de batalha ao fundo */}
        <section className="relative overflow-hidden rounded-xl border border-red-800/70 bg-night-900/70 shadow-panel">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${ART.bg.combat})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-transparent to-night-950/80" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

          <div className="relative grid p-4">
            <div className="flex items-center gap-4">
              {BOSS_IDS.includes(combat.enemy.id) ? (
                <Portrait kind="boss" id={combat.enemy.id} size={72} fallbackIcon={combat.enemy.icon} ring="red" />
              ) : (
                <span className="sigil-disc h-16 w-16 text-4xl">{combat.enemy.icon}</span>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="title-gold truncate font-title text-xl font-bold">{t(combat.enemy.nameKey)}</h2>
                <p className="font-mono text-sm text-game-muted">
                  {t('game.lvl')} {combat.enemy.level}
                </p>
              </div>
            </div>
            <ProgressBar className="mt-3" current={combat.enemyHp} max={combat.enemyMaxHp} type="hp" showText />
          </div>
        </section>

        <div className="divider-ornate flex items-center justify-center px-10 font-title text-xl font-black">
          <span className="diamond" />
          <span className="title-gold mx-3">{t('combat.vs')}</span>
          <span className="diamond" />
        </div>

        <section className="relative overflow-hidden rounded-xl border border-blue-800/70 bg-night-900/70 p-4 shadow-panel">
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <Portrait
                kind="class"
                id={player?.archetype ?? 'blade'}
                size={60}
                fallbackIcon="⚔"
                ring="arcane"
              />
              <div>
                <h2 className="font-title text-xl text-game-text">{player?.name ?? t('game.unknown')}</h2>
                <p className="font-mono text-sm text-game-muted">
                  {t('game.lvl')} {player?.level ?? 0}
                </p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              <ProgressBar current={player?.hp ?? 0} max={player?.maxHp ?? 1} type="hp" showText />
              <ProgressBar current={player?.mp ?? 0} max={player?.maxMp ?? 1} type="mp" showText />
            </div>
          </div>
        </section>
      </main>

      <footer className="grid shrink-0 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <ActionButton onClick={() => combat.addLog('attack', t('combat.attack'))}>⚔ {t('combat.attack')}</ActionButton>
          <ActionButton onClick={() => combat.addLog('defend', t('combat.defend'))}>🛡 {t('combat.defend')}</ActionButton>
          <ActionButton onClick={() => openModal(SKILLS_MODAL)}>🔮 {t('combat.skills')}</ActionButton>
          <ActionButton variant="danger" onClick={() => combat.resetCombat()}>🏃 {t('combat.flee')}</ActionButton>
        </div>
        <Button variant="ghost" fullWidth onClick={() => openModal(LOG_MODAL)}>
          {t('combat.log.title')}
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant={combat.autoFight ? 'success' : 'secondary'} onClick={combat.toggleAutoFight}>
            🤖 {t('combat.autoFight')} [{combat.autoFight ? t('combat.on') : t('combat.off')}]
          </Button>
          <Button variant={combat.autoAdvance ? 'success' : 'secondary'} onClick={combat.toggleAutoAdvance}>
            ⏩ {t('combat.autoAdvance')} [{combat.autoAdvance ? t('combat.on') : t('combat.off')}]
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={() => openModal(AUTO_MODAL)}>
          {t('combat.autoConfig.title')}
        </Button>
      </footer>

      <SkillsModal />
      <CombatLogModal />
      <AutoConfigModal />
      <LootModal />
    </div>
  );
};
