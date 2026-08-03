import { useCallback, useEffect, useState } from 'react';
import { itemNames } from '../../data/itemNames';
import { describeEffect } from '../../data/effectNames';
import { getEffectPairs } from '../../data/effectRegistry';
import { useI18n } from '../../hooks/useI18n';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import { refOf, usePlayerStore } from '../../store/usePlayerStore';
import type { Item } from '../../types/item.types';
import { resolveItemRef } from '../../utils/itemSerializer';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface MailEntry {
  _id: string;
  fromName: string;
  subject: string;
  message: string;
  itemStr: string | null;
  gold: number;
  crystals?: number;
  read: boolean;
  claimed: boolean;
  createdAt: string;
}

const COMPOSE_MODAL = 'modal-mail-compose';

const nameOf = (item: Item | undefined, lang: 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP') => {
  if (!item) return '???';

  return itemNames[item.id]?.[lang]?.name ?? item.id;
};

/** Correio entre jogadores — anexos via itemStr + ouro. */
export const MailPanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const openModal = useGameStore((state) => state.openModal);
  const [mails, setMails] = useState<MailEntry[]>([]);
  const [offline, setOffline] = useState(false);
  const [toName, setToName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachRef, setAttachRef] = useState('');
  const [goldAmount, setGoldAmount] = useState('0');
  const [crystalAmount, setCrystalAmount] = useState('0');

  const charName = player?.name ?? '';

  const refresh = useCallback(async () => {
    if (!charName) return;

    const result = await API.mail.inbox(charName);

    setOffline(!result.success);

    if (result.success && result.data) {
      setMails((result.data as { mails: MailEntry[] }).mails ?? []);
    }
  }, [charName]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const applyCharacter = (character: { gold?: number; inventory?: unknown[] } | undefined) => {
    if (!character) return;

    usePlayerStore.setState((state) => {
      if (!state.data) return state;

      return {
        data: {
          ...state.data,
          gold: typeof character.gold === 'number' ? character.gold : state.data.gold,
          inventory: Array.isArray(character.inventory) ? (character.inventory as typeof state.data.inventory) : state.data.inventory
        }
      };
    });
  };

  const claim = async (mailId: string) => {
    const result = await API.mail.claim(mailId, charName);

    if (!result.success) {
      addNotification(result.error ?? t('mail.error'), 'error');
      return;
    }

    applyCharacter((result.data as { character?: { gold: number; inventory: unknown[] } })?.character);
    addNotification(t('mail.claimed'), 'gold');
    void refresh();
  };

  const remove = async (mailId: string) => {
    const result = await API.mail.remove(mailId);

    if (!result.success) {
      addNotification(result.error ?? t('mail.error'), 'error');
      return;
    }

    void refresh();
  };

  const openRead = (mail: MailEntry) => {
    if (!mail.read) {
      void API.mail.read(mail._id).then(() => refresh());
    }
  };

  const send = async () => {
    if (!toName.trim()) {
      addNotification(t('mail.noRecipient'), 'warning');
      return;
    }

    const result = await API.mail.send({
      charName,
      toName: toName.trim(),
      subject,
      message,
      itemRef: attachRef || null,
      gold: Math.max(0, Math.floor(Number(goldAmount) || 0)),
      crystals: Math.max(0, Math.floor(Number(crystalAmount) || 0))
    });

    if (!result.success) {
      addNotification(result.error ?? t('mail.error'), 'error');
      return;
    }

    applyCharacter((result.data as { character?: { gold: number; inventory: unknown[] } })?.character);
    addNotification(t('mail.sent'), 'gold');
    setToName('');
    setSubject('');
    setMessage('');
    setAttachRef('');
    setGoldAmount('0');
    setCrystalAmount('0');
    void refresh();
  };

  const bagRefs = (player?.inventory ?? []).map((entry) => refOf(entry));
  const unread = mails.filter((mail) => !mail.read).length;

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-xs text-game-muted">
          {t('mail.inbox')} ({unread} {t('mail.unread')})
        </p>
        <Button onClick={() => openModal(COMPOSE_MODAL)}>{t('mail.compose')}</Button>
      </div>

      {offline && <p className="rounded-lg border border-game-border bg-game-card p-2 text-xs text-game-muted">{t('mail.offline')}</p>}

      <section className="min-h-0 overflow-auto pr-1">
        <div className="grid gap-2">
          {mails.length === 0 && <p className="text-xs text-game-muted">{t('mail.empty')}</p>}
          {mails.map((mail) => {
            const attachedItem = mail.itemStr ? resolveItemRef(mail.itemStr) : undefined;
            const hasAttachment = Boolean(mail.itemStr || mail.gold > 0 || (mail.crystals ?? 0) > 0);

            return (
              <article
                key={mail._id}
                className={['rounded-xl border bg-game-card p-3', mail.read ? 'border-game-border' : 'border-game-gold'].join(' ')}
                onClick={() => openRead(mail)}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden>{hasAttachment ? '📦' : '✉️'}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-title text-sm text-game-gold">
                      {mail.subject || t('mail.noSubject')} {!mail.read && <span className="text-[10px] text-game-muted">●</span>}
                    </h3>
                    <p className="truncate font-mono text-xs text-game-muted">
                      {t('mail.from')}: {mail.fromName} · {new Date(mail.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {hasAttachment && !mail.claimed && (
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          void claim(mail._id);
                        }}
                      >
                        {t('mail.claim')}
                      </Button>
                    )}
                    {(!hasAttachment || mail.claimed) && (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.stopPropagation();
                          void remove(mail._id);
                        }}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>

                {mail.message && <p className="mt-2 text-xs text-game-text">{mail.message}</p>}

                {attachedItem && (
                  <p className="mt-2 rounded-lg border border-game-border bg-game-dark p-2 font-mono text-xs text-game-muted">
                    {attachedItem.icon} {nameOf(attachedItem, lang)} —{' '}
                    {getEffectPairs(attachedItem.effects).slice(0, 3).map((pair) => describeEffect(pair.effectId, pair.value, lang).text).join(' · ')}
                  </p>
                )}
                {mail.gold > 0 && <p className="mt-1 font-mono text-xs text-game-gold">{mail.gold} 🪙</p>}
                {(mail.crystals ?? 0) > 0 && <p className="mt-1 font-mono text-xs text-cyan-300">{mail.crystals} 💎</p>}
              </article>
            );
          })}
        </div>
      </section>

      <Modal id={COMPOSE_MODAL} title={t('mail.compose')}>
        <div className="grid gap-2">
          <input className="input-field" value={toName} maxLength={20} onChange={(event) => setToName(event.target.value)} placeholder={t('mail.toPlaceholder')} />
          <input className="input-field" value={subject} maxLength={80} onChange={(event) => setSubject(event.target.value)} placeholder={t('mail.subjectPlaceholder')} />
          <textarea className="input-field min-h-[80px]" value={message} maxLength={500} onChange={(event) => setMessage(event.target.value)} placeholder={t('mail.messagePlaceholder')} />
          <select className="input-field" value={attachRef} onChange={(event) => setAttachRef(event.target.value)}>
            <option value="">{t('mail.noAttachment')}</option>
            {bagRefs.map((ref) => {
              const item = resolveItemRef(ref);
              return item ? <option key={ref} value={ref}>{item.icon} {nameOf(item, lang)}</option> : null;
            })}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input className="input-field" type="number" min={0} value={goldAmount} onChange={(event) => setGoldAmount(event.target.value)} placeholder={t('mail.goldPlaceholder')} />
            <input className="input-field" type="number" min={0} value={crystalAmount} onChange={(event) => setCrystalAmount(event.target.value)} placeholder={t('mail.crystalsPlaceholder')} />
          </div>
          <p className="font-mono text-[10px] text-game-muted">💎 {player?.crystals ?? 0}</p>
          <Button onClick={() => void send()}>{t('mail.send')}</Button>
        </div>
      </Modal>
    </div>
  );
};
