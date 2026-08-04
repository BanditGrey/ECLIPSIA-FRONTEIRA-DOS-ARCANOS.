import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';

type GuildRole = 'leader' | 'officer' | 'member';

interface GuildMember {
  name: string;
  role: GuildRole;
  joinedAt: string;
}

interface Guild {
  id: string;
  name: string;
  leaderName: string;
  motd: string;
  members: GuildMember[];
  maxMembers: number;
  memberCount: number;
}

interface GuildSummary {
  id: string;
  name: string;
  leaderName: string;
  motd: string;
  memberCount: number;
  maxMembers: number;
}

interface GuildChatMessage {
  id: string;
  name: string;
  text: string;
}

const MAX_GUILD_MESSAGES = 50;

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const roleOrder: Record<GuildRole, number> = { leader: 0, officer: 1, member: 2 };

/** Painel de guildas: criar/entrar, cargos, mensagem do dia e chat de guilda. */
export const GuildPanel = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [guild, setGuild] = useState<Guild | null>(null);
  const [directory, setDirectory] = useState<GuildSummary[]>([]);
  const [offline, setOffline] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [motdText, setMotdText] = useState('');
  const [messages, setMessages] = useState<GuildChatMessage[]>([]);
  const [chatText, setChatText] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);

  const charName = player?.name ?? '';
  const myRole: GuildRole | null = guild?.members.find((member) => member.name === charName)?.role ?? null;
  const isLeader = myRole === 'leader';
  const isOfficerOrBetter = myRole === 'leader' || myRole === 'officer';

  const refresh = useCallback(async () => {
    if (!charName) return;

    const [myResult, listResult] = await Promise.all([API.guild.my(charName), API.guild.list()]);

    setOffline(!myResult.success);

    if (myResult.success && myResult.data) {
      const current = (myResult.data as { guild: Guild | null }).guild;
      setGuild(current);
      setMotdText(current?.motd ?? '');
    }

    if (listResult.success && listResult.data) {
      setDirectory((listResult.data as { guilds: GuildSummary[] }).guilds ?? []);
    }
  }, [charName]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Entra na sala da guilda + escuta eventos push
  useEffect(() => {
    if (guild?.id) {
      socketService.connect();
      socketService.joinGuildRoom(guild.id);
    }
  }, [guild?.id]);

  useEffect(() => {
    const onMessage = (event: Event) => {
      const payload = (event as CustomEvent<{ id?: string; name?: string; text?: string }>).detail;

      setMessages((current) =>
        [...current, { id: payload.id ?? createId(), name: payload.name ?? '?', text: payload.text ?? '' }].slice(-MAX_GUILD_MESSAGES)
      );
    };

    const onUpdated = (event: Event) => {
      const payload = (event as CustomEvent<{ guild?: Guild }>).detail;

      if (payload.guild) {
        setGuild(payload.guild);
        setMotdText(payload.guild.motd ?? '');
      }
    };

    const onKickedOrDisbanded = () => {
      setGuild(null);
      setMessages([]);
      addNotification(t('guild.removed'), 'warning');
      void refresh();
    };

    window.addEventListener('eclipsia:guild-message', onMessage);
    window.addEventListener('eclipsia:guild:updated', onUpdated);
    window.addEventListener('eclipsia:guild:kicked', onKickedOrDisbanded);
    window.addEventListener('eclipsia:guild:disbanded', onKickedOrDisbanded);

    return () => {
      window.removeEventListener('eclipsia:guild-message', onMessage);
      window.removeEventListener('eclipsia:guild:updated', onUpdated);
      window.removeEventListener('eclipsia:guild:kicked', onKickedOrDisbanded);
      window.removeEventListener('eclipsia:guild:disbanded', onKickedOrDisbanded);
    };
  }, [addNotification, refresh, t]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const notifyError = (result: { error?: string }) => {
    addNotification(result.error ?? t('guild.error'), 'error');
  };

  const createGuild = async () => {
    const result = await API.guild.create({ charName, name: newGuildName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    setNewGuildName('');
    addNotification(t('guild.created'), 'gold');
    void refresh();
  };

  const joinGuild = async (guildId: string) => {
    const result = await API.guild.join({ charName, guildId });

    if (!result.success) {
      notifyError(result);
      return;
    }

    addNotification(t('guild.joined'), 'gold');
    void refresh();
  };

  const leaveGuild = async () => {
    if (!window.confirm(t('guild.leaveConfirm'))) return;

    const result = await API.guild.leave({ charName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    setGuild(null);
    setMessages([]);
    void refresh();
  };

  const disbandGuild = async () => {
    if (!window.confirm(t('guild.disbandConfirm'))) return;

    const result = await API.guild.disband({ charName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    setGuild(null);
    setMessages([]);
    addNotification(t('guild.disbanded'), 'warning');
  };

  const kickMember = async (targetName: string) => {
    if (!window.confirm(`${t('guild.kick')} ${targetName}?`)) return;

    const result = await API.guild.kick({ charName, targetName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    void refresh();
  };

  const toggleRole = async (targetName: string) => {
    const result = await API.guild.promote({ charName, targetName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    void refresh();
  };

  const saveMotd = async () => {
    const result = await API.guild.motd({ charName, motd: motdText });

    if (!result.success) {
      notifyError(result);
      return;
    }

    addNotification(t('guild.motdSaved'), 'gold');
  };

  const sendChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!chatText.trim()) return;

    socketService.sendGuildMessage(chatText);
    setChatText('');
  };

  // ── Sem guilda: criar + diretório ──
  if (!guild) {
    return (
      <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
        <header className="rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
          <h1 className="font-title text-2xl font-bold text-game-gold">{t('guild.title')}</h1>
        </header>

        {offline && <p className="rounded-lg border border-game-border bg-game-card p-2 text-xs text-game-muted">{t('guild.offline')}</p>}

        <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3 overflow-hidden">
          <section className="grid gap-2 rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
            <h2 className="font-title text-game-gold">{t('guild.createTitle')}</h2>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <input
                className="input-field"
                value={newGuildName}
                maxLength={24}
                onChange={(event) => setNewGuildName(event.target.value)}
                placeholder={t('guild.namePlaceholder')}
              />
              <Button disabled={newGuildName.trim().length < 3} onClick={() => void createGuild()}>
                {t('guild.create')}
              </Button>
            </div>
          </section>

          <section className="min-h-0 overflow-auto rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
            <h2 className="mb-2 font-title text-game-gold">{t('guild.browse')}</h2>
            <div className="grid gap-2">
              {directory.length === 0 && <p className="text-xs text-game-muted">{t('guild.empty')}</p>}
              {directory.map((entry) => (
                <article key={entry.id} className="flex items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                  <span className="text-2xl" aria-hidden>🏰</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-title text-sm text-game-gold">{entry.name}</h3>
                    <p className="truncate font-mono text-xs text-game-muted">
                      {t('guild.leaderLabel')}: {entry.leaderName} · {entry.memberCount}/{entry.maxMembers} {t('guild.membersWord')}
                    </p>
                  </div>
                  <Button onClick={() => void joinGuild(entry.id)} disabled={entry.memberCount >= entry.maxMembers}>
                    {t('guild.join')}
                  </Button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ── Com guilda ──
  const sortedMembers = [...guild.members].sort((a, b) => roleOrder[a.role] - roleOrder[b.role] || a.name.localeCompare(b.name));

  return (
    <div className="grid h-full grid-rows-[auto_auto_1fr] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="flex items-center justify-between gap-2 rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <div>
          <h1 className="font-title text-2xl font-bold text-game-gold">{guild.name}</h1>
          <p className="font-mono text-xs text-game-muted">
            {guild.memberCount}/{guild.maxMembers} {t('guild.membersWord')} · {t('guild.yourRole')}: {t(`guild.role.${myRole}`)}
          </p>
        </div>
        <div className="flex gap-2">
          {isLeader && (
            <Button variant="danger" onClick={() => void disbandGuild()}>
              {t('guild.disband')}
            </Button>
          )}
          <Button variant="danger" onClick={() => void leaveGuild()}>
            {t('guild.leave')}
          </Button>
        </div>
      </header>

      {/* MOTD */}
      <section className="rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <h2 className="mb-1 font-title text-sm text-game-gold">{t('guild.motd')}</h2>
        {isOfficerOrBetter ? (
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input className="input-field" value={motdText} maxLength={160} onChange={(event) => setMotdText(event.target.value)} placeholder={t('guild.motdPlaceholder')} />
            <Button onClick={() => void saveMotd()}>{t('guild.saveMotd')}</Button>
          </div>
        ) : (
          <p className="text-sm text-game-text">{guild.motd || t('guild.empty')}</p>
        )}
      </section>

      <div className="grid min-h-0 grid-cols-2 gap-3 overflow-hidden">
        {/* Membros */}
        <section className="min-h-0 overflow-auto rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
          <h2 className="mb-2 font-title text-sm text-game-gold">{t('guild.members')}</h2>
          <div className="grid gap-1.5">
            {sortedMembers.map((member) => (
              <article key={member.name} className="flex items-center gap-2 rounded-lg border border-game-border bg-game-card p-2">
                <span
                  className={[
                    'rounded px-1.5 py-0.5 font-mono text-[10px]',
                    member.role === 'leader' ? 'btn-gold' : member.role === 'officer' ? 'bg-game-primary text-game-dark' : 'bg-game-hover text-game-muted'
                  ].join(' ')}
                >
                  {t(`guild.role.${member.role}`)}
                </span>
                <span className={['min-w-0 flex-1 truncate text-sm', member.name === charName ? 'text-game-gold' : 'text-game-text'].join(' ')}>
                  {member.name}
                </span>
                {member.name !== charName && member.role !== 'leader' && (
                  <span className="flex gap-1">
                    {isLeader && (
                      <button type="button" className="h-6 w-6 rounded border border-game-border font-mono text-xs text-game-muted hover:bg-game-hover" onClick={() => void toggleRole(member.name)} title={member.role === 'officer' ? t('guild.demote') : t('guild.promote')}>
                        {member.role === 'officer' ? '↓' : '↑'}
                      </button>
                    )}
                    {(isLeader || (myRole === 'officer' && member.role === 'member')) && (
                      <button type="button" className="h-6 w-6 rounded border border-game-border font-mono text-xs text-red-300 hover:bg-game-hover" onClick={() => void kickMember(member.name)} title={t('guild.kick')}>
                        ×
                      </button>
                    )}
                  </span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Chat da guilda */}
        <section className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2 rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
          <h2 className="font-title text-sm text-game-gold">{t('guild.chatTitle')}</h2>
          <div ref={chatRef} className="min-h-0 overflow-auto font-mono text-xs">
            {messages.length === 0 && <p className="text-game-muted">{t('guild.empty')}</p>}
            {messages.map((message) => (
              <p key={message.id} className="text-game-text">
                [<span className={message.name === charName ? 'text-game-gold' : 'text-blue-300'}>{message.name}</span>]: {message.text}
              </p>
            ))}
          </div>
          <form className="grid grid-cols-[1fr_auto] gap-2" onSubmit={sendChat}>
            <input className="input-field" value={chatText} maxLength={240} onChange={(event) => setChatText(event.target.value)} placeholder={t('guild.chatPlaceholder')} />
            <Button>{t('chat.send')}</Button>
          </form>
        </section>
      </div>
    </div>
  );
};
