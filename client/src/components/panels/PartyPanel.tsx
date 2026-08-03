import { useI18n } from '../../hooks/useI18n';
import { usePartyStore } from '../../store/usePartyStore';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

export const PartyPanel = () => {
  const { t } = useI18n();
  const members = usePartyStore((state) => state.members);
  const activeId = usePartyStore((state) => state.activeId);
  const maxSize = usePartyStore((state) => state.maxSize);
  const setActive = usePartyStore((state) => state.setActive);
  const removeMember = usePartyStore((state) => state.removeMember);
  const getXpMultiplier = usePartyStore((state) => state.getXpMultiplier);

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="flex items-center justify-between rounded-xl border border-game-border bg-game-panel p-3">
        <h1 className="font-title text-2xl font-bold text-game-gold">{t('party.title')}</h1>
        <div className="font-mono text-sm text-game-muted">
          {members.length}/{maxSize} • {t('party.xpMultiplier')} {Math.round(getXpMultiplier() * 100)}%
        </div>
      </header>

      <section className="min-h-0 overflow-hidden rounded-xl border border-game-border bg-game-panel p-3">
        {members.length === 0 ? (
          <div className="flex h-full items-center justify-center text-game-muted">{t('party.empty')}</div>
        ) : (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {members.map((member) => (
              <article key={member.id} className="rounded-xl border border-game-border bg-game-card p-3">
                <div className="grid grid-cols-[1fr_auto] gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="text-3xl">{member.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-title text-lg text-game-gold">{member.name}</h2>
                      <p className="font-mono text-xs text-game-muted">
                        {t('game.lvl')} {member.level}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1 font-mono text-[10px]">
                        {member.id === activeId && <span className="rounded bg-game-gold px-2 py-0.5 text-game-dark">{t('charSelect.activeBadge')}</span>}
                        {member.id !== activeId && <span className="rounded bg-blue-700 px-2 py-0.5 text-white">{t('charSelect.partyBadge')}</span>}
                        {!member.isAlive && <span className="rounded bg-red-700 px-2 py-0.5 text-white">💀 {t('party.dead')}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Button size="sm" disabled={member.id === activeId} onClick={() => setActive(member.id)}>
                      {t('party.activate')}
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => removeMember(member.id)}>
                      {t('party.remove')}
                    </Button>
                  </div>
                </div>

                <div className="mt-3 grid gap-2">
                  <ProgressBar current={member.hp} max={member.maxHp} type="hp" showText />
                  <ProgressBar current={member.mp} max={member.maxMp} type="mp" showText />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="rounded-xl border border-game-border bg-game-panel p-3 text-sm text-game-muted">
        {t('party.crossInfo')}
      </footer>
    </div>
  );
};
