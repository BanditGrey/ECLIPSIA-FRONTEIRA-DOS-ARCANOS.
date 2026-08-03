import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { itemNames } from '../../data/itemNames';
import { describeEffect } from '../../data/effectNames';
import { getEffectPairs } from '../../data/effectRegistry';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { resolveItemRef } from '../../utils/itemSerializer';
import { Button } from '../ui/Button';

interface ChatMessage {
  id: string;
  type: 'system' | 'player';
  name?: string;
  text: string;
}

const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 240;

const sanitizeText = (value: string) =>
  value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);

const createMessageId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const ITEM_LINK_REGEX = /\[item:([0-9|:-]+)\]/g;

export const ChatPanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [expandedLink, setExpandedLink] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  /** Renderiza texto com links de item "[item:numId|e:v|...]" como chips. */
  const renderWithItemLinks = (messageId: string, raw: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    const regex = new RegExp(ITEM_LINK_REGEX.source, 'g');

    while ((match = regex.exec(raw)) !== null) {
      if (match.index > last) {
        parts.push(raw.slice(last, match.index));
      }

      const ref = match[1];
      const item = resolveItemRef(ref);
      const label = item ? `${item.icon} ${itemNames[item.id]?.[lang]?.name ?? item.id}` : `[${ref}]`;
      const tooltip = item
        ? getEffectPairs(item.effects).map((pair) => describeEffect(pair.effectId, pair.value, lang).text).join(' · ')
        : ref;

      parts.push(
        <button
          key={`${messageId}-${match.index}`}
          type="button"
          className="mx-0.5 inline-flex items-center rounded border border-game-gold bg-game-card px-1 align-baseline text-game-gold hover:bg-game-hover"
          title={tooltip}
          onClick={() => setExpandedLink(expandedLink === ref ? null : ref)}
        >
          {label}
        </button>
      );

      last = match.index + match[0].length;
    }

    if (last < raw.length) {
      parts.push(raw.slice(last));
    }

    return parts;
  };

  const renderItemDetails = (ref: string) => {
    const item = resolveItemRef(ref);

    if (!item) return null;

    return (
      <div className="mt-1 rounded-lg border border-game-border bg-game-card p-2 font-mono text-xs">
        <p className="text-game-gold">{item.icon} {itemNames[item.id]?.[lang]?.name ?? item.id}</p>
        {getEffectPairs(item.effects).map((pair, index) => {
          const line = describeEffect(pair.effectId, pair.value, lang);
          return (
            <p key={index} className={line.colorClass}>
              {line.text}
            </p>
          );
        })}
      </div>
    );
  };

  const appendMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message].slice(-MAX_MESSAGES));
  };

  useEffect(() => {
    socketService.connect();
    appendMessage({ id: createMessageId(), type: 'system', text: t('chat.connected') });

    const handleChatMessage = (event: Event) => {
      const payload = (event as CustomEvent<{ id?: string; name?: string; text?: string; type?: 'system' | 'player' }>).detail;

      appendMessage({
        id: payload.id ?? createMessageId(),
        type: payload.type ?? 'player',
        name: sanitizeText(payload.name ?? t('game.unknown')),
        text: sanitizeText(payload.text ?? '')
      });
    };

    window.addEventListener('eclipsia:chat-message', handleChatMessage);

    return () => {
      window.removeEventListener('eclipsia:chat-message', handleChatMessage);
    };
  }, [t]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanText = sanitizeText(text);

    if (!cleanText) {
      addNotification(t('chat.empty'), 'warning');
      return;
    }

    if (text.length > MAX_MESSAGE_LENGTH) {
      addNotification(t('chat.messageTooLong'), 'warning');
    }

    socketService.sendChatMessage(cleanText);
    setText('');
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3 overflow-hidden bg-game-dark p-3 text-game-text">
      <header className="rounded-xl border border-game-border bg-game-panel p-3">
        <h1 className="font-title text-2xl font-bold text-game-gold">{t('chat.title')}</h1>
      </header>

      <section ref={listRef} className="min-h-0 overflow-auto rounded-xl border border-game-border bg-game-panel p-3">
        <div className="grid gap-2 font-mono text-sm">
          {messages.map((message) =>
            message.type === 'system' ? (
              <p key={message.id} className="text-game-gold italic">
                [{t('chat.systemName')}] {message.text}
              </p>
            ) : (
              <div key={message.id} className="text-game-text">
                <p>
                  [
                  <span className={message.name === player?.name ? 'text-game-gold' : 'text-blue-300'}>
                    {message.name ?? t('game.unknown')}
                  </span>
                  ]: {renderWithItemLinks(message.id, message.text)}
                </p>
                {expandedLink && message.text.includes(`[item:${expandedLink}]`) && renderItemDetails(expandedLink)}
              </div>
            )
          )}
        </div>
      </section>

      <form className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border border-game-border bg-game-panel p-3" onSubmit={sendMessage}>
        <div className="grid gap-1">
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              className="input-field"
              value={text}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setText(event.target.value)}
              placeholder={t('chat.placeholder')}
            />
            <Button>{t('chat.send')}</Button>
          </div>
          <p className="font-mono text-[10px] text-game-faded">{t('chat.itemLinkHint')}</p>
        </div>
      </form>
    </div>
  );
};
