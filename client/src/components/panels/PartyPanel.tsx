import { useEffect, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { usePartyStore } from '../../store/usePartyStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface RealParty {
  partyId: string;
  leader: string;
  members: string[];
}

interface PartyInvite {
  partyId: string;
  fromName: string;
}

export const PartyPanel = () => {
  const { t } = useI18n();
  const playerName = usePlayerStore((state) => state.data?.name ?? '');
  const addNotification = useGameStore((state) => state.addNotification);
  const [realParty, setRealParty] = useState<RealParty | null>(null);
  const [invite, setInvite] = useState<PartyInvite | null>(null);
  const [inviteName, setInviteName] = useState('');

  useEffect(() => {
    const onInvited = (event: Event) => {
      const detail = (event as CustomEvent<PartyInvite>).detail;
      setInvite(detail);
    };

    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<RealParty>).detail;
      setRealParty(detail);
      setInvite(null);
    };

    const onLeftOrKicked = (event: Event) => {
      const type = (event as CustomEvent).type;

      if (type.includes('kicked')) {
        addNotification(t('partyReal.kicked'), 'warning');
      }

      setRealParty(null);
    };

    const onDeclined = () => addNotification(t('partyReal.declined'), 'warning');
    const onFailed = (event: Event) => {
      const detail = (event as CustomEvent<{ reason?: string }>).detail;
      addNotification(`${t('partyReal.failed')}: ${t(`partyReal.reason.${detail?.reason ?? 'busy'}`)}`, 'error');
    };

    window.addEventListener('eclipsia:party:invited', onInvited);
    window.addEventListener('eclipsia:party:updated', onUpdated);
    window.addEventListener('eclipsia:party:left', onLeftOrKicked);
    window.addEventListener('eclipsia:party:kicked', onLeftOrKicked);
    window.addEventListener('eclipsia:party:declined', onDeclined);
    window.addEventListener('eclipsia:party:failed', onFailed);

    return () => {
      window.removeEventListener('eclipsia:party:invited', onInvited);
      window.removeEventListener('eclipsia:party:updated', onUpdated);
      window.removeEventListener('eclipsia:party:left', onLeftOrKicked);
      window.removeEventListener('eclipsia:party:kicked', onLeftOrKicked);
      window.removeEventListener('eclipsia:party:declined', onDeclined);
      window.removeEventListener('eclipsia:party:failed', onFailed);
    };
  }, [addNotification, t]);

  const sendInvite = () => {
    if (!inviteName.trim() || inviteName.trim() === playerName) return;

    socketService.connect();
    socketService.inviteToParty(inviteName.trim());
    setInviteName('');
  };

  const isLeader = realParty?.leader === playerName;
  const members = usePartyStore((state) => state.members);
  const activeId = usePartyStore((state) => state.activeId);
  const maxSize = usePartyStore((state) => state.maxSize);
  const setActive = usePartyStore((state) => state.setActive);
  const removeMember = usePartyStore((state) => state.removeMember);
  const getXpMultiplier = usePartyStore((state) => state.getXpMultiplier);

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr_auto] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="flex items-center justify-between rounded-xl border border-game-border bg-game-panel p-3">
        <h1 className="font-title text-2xl font-bold text-game-gold">{t('party.title')}</h1>
        <div className="font-mono text-sm text-game-muted">
          {members.length}/{maxSize} • {t('party.xpMultiplier')} {Math.round(getXpMultiplier() * 100)}%
        </div>
      </header>

      {/* Party real (jogadores online) */}
      <section className="rounded-xl border border-game-border bg-game-panel p-3">
        <h2 className="mb-2 font-title text-lg text-game-gold">🌐 {t('partyReal.title')}</h2>

        {invite && (
          <div className="mb-2 rounded-lg border border-game-gold bg-game-dark p-2">
            <p className="text-sm text-game-text">
              {t('partyReal.invitedBy')}: <span className="text-game-gold">{invite.fromName}</span>
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button size="sm" onClick={() => socketService.respondPartyInvite(invite.partyId, true)}>
                {t('game.yes')}
              </Button>
              <Button size="sm" variant="danger" onClick={() => socketService.respondPartyInvite(invite.partyId, false)}>
                {t('game.no')}
              </Button>
            </div>
          </div>
        )}

        {realParty ? (
          <div className="grid gap-1.5">
            {realParty.members.map((member) => (
              <div key={member} className="flex items-center gap-2 rounded-lg border border-game-border bg-game-card p-2">
                <span className={['min-w-0 flex-1 truncate text-sm', member === playerName ? 'text-game-gold' : 'text-game-text'].join(' ')}>
                  {member === realParty.leader ? '👑 ' : ''}{member}
                </span>
                {isLeader && member !== playerName && (
                  <button
                    type="button"
                    className="h-6 w-6 rounded border border-game-border font-mono text-xs text-red-300 hover:bg-game-hover"
                    onClick={() => socketService.kickPartyMember(member)}
                    title={t('partyReal.kick')}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <Button size="sm" variant="danger" onClick={() => socketService.leaveParty()}>
              {t('partyReal.leave')}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              className="input-field"
              value={inviteName}
              maxLength={20}
              onChange={(event) => setInviteName(event.target.value)}
              placeholder={t('partyReal.namePlaceholder')}
            />
            <Button disabled={!inviteName.trim() || inviteName.trim() === playerName} onClick={sendInvite}>
              {t('partyReal.invite')}
            </Button>
          </div>
        )}
      </section>

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
