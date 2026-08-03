import { FormEvent, useEffect, useRef, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
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

export const ChatPanel = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

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
              <p key={message.id} className="text-game-text">
                [
                <span className={message.name === player?.name ? 'text-game-gold' : 'text-blue-300'}>
                  {message.name ?? t('game.unknown')}
                </span>
                ]: {message.text}
              </p>
            )
          )}
        </div>
      </section>

      <form className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border border-game-border bg-game-panel p-3" onSubmit={sendMessage}>
        <input
          className="input-field"
          value={text}
          maxLength={MAX_MESSAGE_LENGTH}
          onChange={(event) => setText(event.target.value)}
          placeholder={t('chat.placeholder')}
        />
        <Button>{t('chat.send')}</Button>
      </form>
    </div>
  );
};
