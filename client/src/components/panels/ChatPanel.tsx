import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { itemNames } from '../../data/itemNames';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { resolveItemRef } from '../../utils/itemSerializer';
import { Button } from '../ui/Button';

type ChatKind = 'system' | 'global' | 'party' | 'guild' | 'whisper-in' | 'whisper-out' | 'invite';

interface ChatMessage {
  id: string;
  kind: ChatKind;
  name?: string;
  text: string;
  invitePartyId?: string;
  inviteFrom?: string;
  inviteResolved?: boolean;
}

const MAX_MESSAGES = 80;
const MAX_MESSAGE_LENGTH = 240;

const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

const createMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Chat global com camada social:
 * - Comandos: /convite (party), /w (sussurro), /r (responder), /p (party), /help
 * - Convites de party chegam como cards clicáveis no chat
 * - Nomes são clicáveis: convidar ou sussurrar
 * - Presença online (entrou/saiu da fronteira)
 * - Links de item [item:numId|e:v|...]
 */
export const ChatPanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [actionTarget, setActionTarget] = useState<string | null>(null);
  const [lastWhisperFrom, setLastWhisperFrom] = useState<string | null>(null);
  const mutedRef = useRef<Set<string>>(
    new Set(JSON.parse((typeof window !== 'undefined' && window.localStorage.getItem('eclipsia_muted')) || '[]') as string[])
  );

  const isMuted = (name: string) => mutedRef.current.has(name.toLowerCase());

  const setMuted = (name: string, muted: boolean) => {
    const key = name.toLowerCase();

    if (muted) {
      mutedRef.current.add(key);
    } else {
      mutedRef.current.delete(key);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('eclipsia_muted', JSON.stringify([...mutedRef.current]));
    }
  };
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const me = player?.name ?? '';

  const appendMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message].slice(-MAX_MESSAGES));
  };

  const appendSystem = (systemText: string) => {
    appendMessage({ id: createMessageId(), kind: 'system', text: systemText });
  };

  useEffect(() => {
    socketService.connect();
    appendMessage({ id: createMessageId(), kind: 'system', text: t('chat.connected') });

    const handleHistory = (event: Event) => {
      const payload = (event as CustomEvent<{ messages?: Array<{ id?: string; name?: string; text?: string }> }>).detail;
      const history = payload?.messages ?? [];

      if (history.length > 0) {
        setMessages((current) => [
          ...history.map((entry) => ({
            id: entry.id ?? createMessageId(),
            kind: 'global' as const,
            name: sanitizeText(entry.name ?? t('game.unknown')),
            text: sanitizeText(entry.text ?? '')
          })),
          ...current
        ].slice(-MAX_MESSAGES));
      }
    };

    const handleChatMessage = (event: Event) => {
      const payload = (event as CustomEvent<{ id?: string; name?: string; text?: string; type?: string }>).detail;
      const name = sanitizeText(payload.name ?? t('game.unknown'));

      if (isMuted(name)) return;

      appendMessage({
        id: payload.id ?? createMessageId(),
        kind: 'global',
        name,
        text: sanitizeText(payload.text ?? '')
      });
    };

    const handleWhisper = (event: Event) => {
      const payload = (event as CustomEvent<{ fromName?: string; text?: string }>).detail;
      const fromName = sanitizeText(payload.fromName ?? '?');

      if (isMuted(fromName)) return;

      setLastWhisperFrom(fromName);
      appendMessage({ id: createMessageId(), kind: 'whisper-in', name: fromName, text: sanitizeText(payload.text ?? '') });
    };

    const handleWhisperFailed = async (event: Event) => {
      const payload = (event as CustomEvent<{ toName?: string; text?: string }>).detail;
      const toName = sanitizeText(payload.toName ?? '?');

      // Destinatário offline: persiste para entrega quando ele conectar
      if (payload.text && me) {
        const result = await API.whisper.send({ fromName: me, toName, text: sanitizeText(payload.text) });

        if (result.success) {
          appendSystem(`✉️ ${t('chat.whisperQueued')} (${toName})`);
          return;
        }
      }

      appendSystem(`${t('chat.whisperOffline')} (${toName})`);
    };

    const handlePartyChat = (event: Event) => {
      const payload = (event as CustomEvent<{ id?: string; name?: string; text?: string }>).detail;
      const name = sanitizeText(payload.name ?? '?');

      if (isMuted(name)) return;

      appendMessage({
        id: payload.id ?? createMessageId(),
        kind: 'party',
        name,
        text: sanitizeText(payload.text ?? '')
      });
    };

    const handleWho = (event: Event) => {
      const payload = (event as CustomEvent<{ names?: string[]; count?: number }>).detail;
      const names = payload?.names ?? [];

      appendSystem(`👥 ${t('chat.whoOnline')} (${payload?.count ?? names.length}): ${names.join(', ') || '—'}`);
    };

    const handlePresence = (event: Event) => {
      const payload = (event as CustomEvent<{ name?: string; online?: boolean }>).detail;
      const name = sanitizeText(payload.name ?? '');

      if (!name || name === me) return;

      appendSystem(payload.online ? `✨ ${name} ${t('chat.presenceIn')}` : `🌑 ${name} ${t('chat.presenceOut')}`);
    };

    const handlePartyInvited = (event: Event) => {
      const payload = (event as CustomEvent<{ partyId: string; fromName: string }>).detail;

      appendMessage({
        id: createMessageId(),
        kind: 'invite',
        text: '',
        invitePartyId: payload.partyId,
        inviteFrom: sanitizeText(payload.fromName)
      });
    };

    // Sussurros recebidos offline (persistidos no servidor)
    const loadOfflineWhispers = async () => {
      if (!me) return;

      const result = await API.whisper.inbox(me);

      if (result.success && result.data) {
        const whispers = (result.data as { whispers: Array<{ fromName: string; text: string; createdAt: string }> }).whispers ?? [];

        if (whispers.length > 0) {
          appendSystem(`✉️ ${whispers.length} ${t('chat.offlineWhispers')}`);

          [...whispers].reverse().forEach((whisper) => {
            if (!isMuted(whisper.fromName)) {
              setLastWhisperFrom(whisper.fromName);
              appendMessage({
                id: createMessageId(),
                kind: 'whisper-in',
                name: sanitizeText(whisper.fromName),
                text: sanitizeText(whisper.text)
              });
            }
          });

          void API.whisper.read(me);
        }
      }
    };

    void loadOfflineWhispers();

    const handlePartyHistory = (event: Event) => {
      const payload = (event as CustomEvent<{ messages?: Array<{ id?: string; name?: string; text?: string }> }>).detail;
      const history = payload?.messages ?? [];

      if (history.length > 0) {
        setMessages((current) => {
          // Avoid duplicates if reconnecting
          const existingIds = new Set(current.map(m => m.id));
          const newMessages = history
            .filter(entry => !entry.id || !existingIds.has(entry.id))
            .map((entry) => ({
              id: entry.id ?? createMessageId(),
              kind: 'party' as const,
              name: sanitizeText(entry.name ?? t('game.unknown')),
              text: sanitizeText(entry.text ?? '')
            }));
            
          return [...current, ...newMessages];
        });
      }
    };

    const handleGuildHistory = (event: Event) => {
      const payload = (event as CustomEvent<{ messages?: Array<{ id?: string; name?: string; text?: string }> }>).detail;
      const history = payload?.messages ?? [];

      if (history.length > 0) {
        setMessages((current) => {
          // Avoid duplicates if reconnecting
          const existingIds = new Set(current.map(m => m.id));
          const newMessages = history
            .filter(entry => !entry.id || !existingIds.has(entry.id))
            .map((entry) => ({
              id: entry.id ?? createMessageId(),
              kind: 'guild' as const,
              name: sanitizeText(entry.name ?? t('game.unknown')),
              text: sanitizeText(entry.text ?? '')
            }));
            
          return [...current, ...newMessages];
        });
      }
    };

    window.addEventListener('eclipsia:who:list', handleWho);
    window.addEventListener('eclipsia:chat-history', handleHistory);
    window.addEventListener('eclipsia:chat-party-history', handlePartyHistory);
    window.addEventListener('eclipsia:chat-guild-history', handleGuildHistory);
    window.addEventListener('eclipsia:chat-message', handleChatMessage);
    window.addEventListener('eclipsia:chat:whisper', handleWhisper);
    window.addEventListener('eclipsia:chat:whisper_failed', handleWhisperFailed);
    window.addEventListener('eclipsia:chat:party', handlePartyChat);
    window.addEventListener('eclipsia:chat:presence', handlePresence);
    window.addEventListener('eclipsia:party:invited', handlePartyInvited);

    return () => {
      window.removeEventListener('eclipsia:who:list', handleWho);
      window.removeEventListener('eclipsia:chat-history', handleHistory);
      window.removeEventListener('eclipsia:chat-party-history', handlePartyHistory);
      window.removeEventListener('eclipsia:chat-guild-history', handleGuildHistory);
      window.removeEventListener('eclipsia:chat-message', handleChatMessage);
      window.removeEventListener('eclipsia:chat:whisper', handleWhisper);
      window.removeEventListener('eclipsia:chat:whisper_failed', handleWhisperFailed);
      window.removeEventListener('eclipsia:chat:party', handlePartyChat);
      window.removeEventListener('eclipsia:chat:presence', handlePresence);
      window.removeEventListener('eclipsia:party:invited', handlePartyInvited);
    };
  }, [me, t]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  /** Resolve comandos /... — retorna true quando consumiu a entrada. */
  const handleCommand = (raw: string): boolean => {
    const [command, ...rest] = raw.split(/\s+/);
    const cmd = command.toLowerCase();

    if (cmd === '/help' || cmd === '/ajuda') {
      appendSystem('/convite <nome> · /w <nome> <msg> · /r <msg> · /p <msg> · /help');
      return true;
    }

    if (cmd === '/convite' || cmd === '/invite' || cmd === '/party-invite') {
      const target = sanitizeText(rest[0] ?? '');

      if (!target || target === me) {
        appendSystem(t('chat.badCommand'));
        return true;
      }

      socketService.inviteToParty(target);
      appendSystem(`🤝 ${t('chat.inviteSent')} ${target}`);
      return true;
    }

    if (cmd === '/w' || cmd === '/msg' || cmd === '/sussurrar' || cmd === '/whisper') {
      const target = sanitizeText(rest[0] ?? '');
      const body = sanitizeText(rest.slice(1).join(' '));

      if (!target || !body || target === me) {
        appendSystem(`${t('chat.badCommand')} — /w <nome> <msg>`);
        return true;
      }

      socketService.sendWhisper(target, body);
      setLastWhisperFrom(target);
      appendMessage({ id: createMessageId(), kind: 'whisper-out', name: target, text: body });
      return true;
    }

    if (cmd === '/r' || cmd === '/responder') {
      const body = sanitizeText(rest.join(' '));

      if (!lastWhisperFrom || !body) {
        appendSystem(t('chat.noReplyTarget'));
        return true;
      }

      socketService.sendWhisper(lastWhisperFrom, body);
      appendMessage({ id: createMessageId(), kind: 'whisper-out', name: lastWhisperFrom, text: body });
      return true;
    }

    if (cmd === '/who' || cmd === '/online') {
      socketService.requestWho();
      return true;
    }

    if (cmd === '/mute' || cmd === '/bloquear') {
      const target = sanitizeText(rest[0] ?? '');

      if (!target || target === me) {
        appendSystem(`${t('chat.badCommand')} — /mute <nome>`);
        return true;
      }

      setMuted(target, true);
      appendSystem(`🔇 ${target} ${t('chat.muted')}`);
      return true;
    }

    if (cmd === '/unmute' || cmd === '/desbloquear') {
      const target = sanitizeText(rest[0] ?? '');

      if (!target) {
        appendSystem(`${t('chat.badCommand')} — /unmute <nome>`);
        return true;
      }

      setMuted(target, false);
      appendSystem(`🔊 ${target} ${t('chat.unmuted')}`);
      return true;
    }

    if (cmd === '/p' || cmd === '/party') {
      const body = sanitizeText(rest.join(' '));

      if (!body) {
        appendSystem(`${t('chat.badCommand')} — /p <msg>`);
        return true;
      }

      socketService.sendPartyMessage(body);
      return true;
    }

    return false;
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanText = sanitizeText(text);

    if (!cleanText) {
      addNotification(t('chat.empty'), 'warning');
      return;
    }

    if (cleanText.startsWith('/')) {
      if (handleCommand(cleanText)) {
        setText('');
        return;
      }
    }

    socketService.sendChatMessage(cleanText);
    setText('');
  };

  const resolveInvite = (messageId: string, accept: boolean, partyId: string) => {
    socketService.respondPartyInvite(partyId, accept);
    setMessages((current) => current.map((message) => (message.id === messageId ? { ...message, inviteResolved: true } : message)));
  };

  /** Renderiza texto com links de item "[item:...]" como chips. */
  const renderWithItemLinks = (messageId: string, raw: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    const regex = /\[item:([0-9|:-]+)\]/g;

    while ((match = regex.exec(raw)) !== null) {
      if (match.index > last) {
        parts.push(raw.slice(last, match.index));
      }

      const ref = match[1];
      const item = resolveItemRef(ref);
      const label = item ? `${item.icon} ${itemNames[item.id]?.[lang]?.name ?? item.id}` : `[${ref}]`;

      parts.push(
        <span key={`${messageId}-${match.index}`} className="mx-0.5 inline-flex items-center rounded border border-game-gold bg-game-card px-1 align-baseline text-game-gold" title={ref}>
          {label}
        </span>
      );

      last = match.index + match[0].length;
    }

    if (last < raw.length) {
      parts.push(raw.slice(last));
    }

    return parts;
  };

  const renderName = (name: string) => (
    <button
      type="button"
      className={name === me ? 'text-game-gold' : 'text-blue-300 hover:underline'}
      onClick={() => name !== me && setActionTarget(name)}
    >
      {name}
    </button>
  );

  const renderMessage = (message: ChatMessage) => {
    switch (message.kind) {
      case 'system':
        return (
          <p key={message.id} className="text-game-gold italic">
            [{t('chat.systemName')}] {message.text}
          </p>
        );
      case 'party':
        return (
          <p key={message.id} className="text-game-text">
            <span className="text-green-400">[{t('chat.partyPrefix')}]</span> [{renderName(message.name ?? '?')}]: {renderWithItemLinks(message.id, message.text)}
          </p>
        );
      case 'whisper-in':
        return (
          <p key={message.id} className="text-violet-300 italic">
            {t('chat.whisperFrom')} {renderName(message.name ?? '?')}: {message.text}
          </p>
        );
      case 'whisper-out':
        return (
          <p key={message.id} className="text-violet-400/80 italic">
            {t('chat.whisperTo')} {message.name}: {message.text}
          </p>
        );
      case 'invite':
        return (
          <div key={message.id} className="my-1 rounded-lg border border-game-gold bg-game-card p-2">
            <p className="text-sm text-game-text">
              🤝 {t('chat.inviteCard')} <span className="text-game-gold">{message.inviteFrom}</span>
            </p>
            {message.inviteResolved ? (
              <p className="mt-1 font-mono text-xs text-game-muted">{t('chat.inviteAnswered')}</p>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button size="sm" onClick={() => resolveInvite(message.id, true, message.invitePartyId ?? '')}>
                  {t('game.yes')}
                </Button>
                <Button size="sm" variant="danger" onClick={() => resolveInvite(message.id, false, message.invitePartyId ?? '')}>
                  {t('game.no')}
                </Button>
              </div>
            )}
          </div>
        );
      default:
        return (
          <p key={message.id} className="text-game-text">
            [{renderName(message.name ?? t('game.unknown'))}]: {renderWithItemLinks(message.id, message.text)}
          </p>
        );
    }
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <h1 className="font-title text-2xl font-bold text-game-gold">{t('chat.title')}</h1>
        <p className="font-mono text-[10px] text-game-faded">{t('chat.commandHint')} · /who · /mute · /unmute</p>
      </header>

      <section ref={listRef} className="min-h-0 overflow-auto rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel">
        <div className="grid gap-2 font-mono text-sm">
          {messages.map(renderMessage)}
        </div>
      </section>

      <div className="grid gap-2">
        {actionTarget && (
          <div className="flex items-center gap-2 rounded-lg border border-game-border bg-game-card p-2 font-mono text-xs">
            <span className="text-game-gold">@{actionTarget}</span>
            <button
              type="button"
              className="rounded border border-game-border px-2 py-1 text-game-text hover:bg-game-hover"
              onClick={() => {
                socketService.inviteToParty(actionTarget);
                appendSystem(`🤝 ${t('chat.inviteSent')} ${actionTarget}`);
                setActionTarget(null);
              }}
            >
              🤝 {t('chat.actionInvite')}
            </button>
            <button
              type="button"
              className="rounded border border-game-border px-2 py-1 text-violet-300 hover:bg-game-hover"
              onClick={() => {
                setText(`/w ${actionTarget} `);
                setActionTarget(null);
                inputRef.current?.focus();
              }}
            >
              💬 {t('chat.actionWhisper')}
            </button>
            <button
              type="button"
              className="rounded border border-game-border px-2 py-1 text-red-300 hover:bg-game-hover"
              onClick={() => {
                setMuted(actionTarget, true);
                appendSystem(`🔇 ${actionTarget} ${t('chat.muted')}`);
                setActionTarget(null);
              }}
            >
              🔇 {t('chat.actionMute')}
            </button>
            <button type="button" className="ml-auto rounded border border-game-border px-2 py-1 text-game-muted hover:bg-game-hover" onClick={() => setActionTarget(null)}>
              ✕
            </button>
          </div>
        )}

        <form className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border border-night-600 bg-night-900/60 p-3 shadow-panel" onSubmit={sendMessage}>
          <input
            ref={inputRef}
            className="input-field"
            value={text}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => setText(event.target.value)}
            placeholder={t('chat.placeholder')}
          />
          <Button>{t('chat.send')}</Button>
        </form>
      </div>
    </div>
  );
};
