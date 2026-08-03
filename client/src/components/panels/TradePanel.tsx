import { useEffect, useState } from 'react';
import { itemNames } from '../../data/itemNames';
import { describeEffect } from '../../data/effectNames';
import { getEffectPairs } from '../../data/effectRegistry';
import { useI18n } from '../../hooks/useI18n';
import { socketService } from '../../services/socket';
import { useGameStore } from '../../store/useGameStore';
import { refOf, usePlayerStore } from '../../store/usePlayerStore';
import type { Item } from '../../types/item.types';
import { resolveItemRef } from '../../utils/itemSerializer';
import { Button } from '../ui/Button';

interface TradeOffer {
  items: string[];
  gold: number;
}

interface TradeSnapshot {
  tradeId: string;
  from: string;
  to: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'declined';
  offers: Record<string, TradeOffer>;
  confirmed: string[];
}

const MAX_TRADE_ITEMS = 3;

const nameOf = (item: Item | undefined, lang: 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP') => {
  if (!item) return '???';

  return itemNames[item.id]?.[lang]?.name ?? item.id;
};

const applyServerSnapshot = (character: { gold?: number; inventory?: unknown[] } | undefined) => {
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

/** Trade P2P: troca direta entre dois personagens online (via socket). */
export const TradePanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [target, setTarget] = useState('');
  const [incoming, setIncoming] = useState<{ tradeId: string; fromName: string } | null>(null);
  const [trade, setTrade] = useState<TradeSnapshot | null>(null);
  const [myItems, setMyItems] = useState<string[]>([]);
  const [myGold, setMyGold] = useState('0');
  const [pickRef, setPickRef] = useState('');

  const me = player?.name ?? '';
  const partner = trade ? (trade.from === me ? trade.to : trade.from) : '';

  useEffect(() => {
    const onRequested = (event: Event) => {
      const detail = (event as CustomEvent<{ tradeId: string; fromName: string }>).detail;
      setIncoming(detail);
    };

    const onSnapshot = (event: Event) => {
      const detail = (event as CustomEvent<TradeSnapshot>).detail;
      setTrade(detail);
      setIncoming(null);
    };

    const onCompleted = (event: Event) => {
      const detail = (event as CustomEvent<TradeSnapshot & { character?: { gold: number; inventory: unknown[] } }>).detail;
      applyServerSnapshot(detail.character);
      addNotification(t('trade.completed'), 'gold');
      setTrade(null);
      setMyItems([]);
      setMyGold('0');
    };

    const onEnd = (event: Event) => {
      const type = (event as CustomEvent).type.replace('eclipsia:', '');
      const detail = (event as CustomEvent<{ reason?: string }>).detail;

      if (type === 'trade:declined') addNotification(t('trade.declined'), 'warning');
      if (type === 'trade:cancelled') addNotification(`${t('trade.cancelled')} (${detail?.reason ?? ''})`, 'warning');
      if (type === 'trade:failed') addNotification(`${t('trade.failed')}: ${detail?.reason ?? ''}`, 'error');

      setTrade(null);
      setMyItems([]);
      setMyGold('0');
    };

    window.addEventListener('eclipsia:trade:requested', onRequested);
    window.addEventListener('eclipsia:trade:start', onSnapshot);
    window.addEventListener('eclipsia:trade:updated', onSnapshot);
    window.addEventListener('eclipsia:trade:confirmed', onSnapshot);
    window.addEventListener('eclipsia:trade:waiting', onSnapshot);
    window.addEventListener('eclipsia:trade:completed', onCompleted);
    window.addEventListener('eclipsia:trade:declined', onEnd);
    window.addEventListener('eclipsia:trade:cancelled', onEnd);
    window.addEventListener('eclipsia:trade:failed', onEnd);

    return () => {
      window.removeEventListener('eclipsia:trade:requested', onRequested);
      window.removeEventListener('eclipsia:trade:start', onSnapshot);
      window.removeEventListener('eclipsia:trade:updated', onSnapshot);
      window.removeEventListener('eclipsia:trade:confirmed', onSnapshot);
      window.removeEventListener('eclipsia:trade:waiting', onSnapshot);
      window.removeEventListener('eclipsia:trade:completed', onCompleted);
      window.removeEventListener('eclipsia:trade:declined', onEnd);
      window.removeEventListener('eclipsia:trade:cancelled', onEnd);
      window.removeEventListener('eclipsia:trade:failed', onEnd);
    };
  }, [addNotification, t]);

  const sendUpdate = (items: string[], gold: string) => {
    if (!trade) return;

    socketService.updateTrade(trade.tradeId, items, Math.max(0, Math.floor(Number(gold) || 0)));
  };

  const addItem = () => {
    if (!pickRef || myItems.length >= MAX_TRADE_ITEMS || myItems.includes(pickRef)) return;

    const next = [...myItems, pickRef];
    setMyItems(next);
    setPickRef('');
    sendUpdate(next, myGold);
  };

  const removeItem = (ref: string) => {
    const next = myItems.filter((entry) => entry !== ref);
    setMyItems(next);
    sendUpdate(next, myGold);
  };

  const bagRefs = (player?.inventory ?? []).map((entry) => refOf(entry));
  const myOffer = trade?.offers?.[me];
  const partnerOffer = trade?.offers?.[partner];
  const iConfirmed = trade?.confirmed?.includes(me) ?? false;
  const partnerConfirmed = trade?.confirmed?.includes(partner) ?? false;

  return (
    <div className="grid h-full gap-3 overflow-auto pr-1">
      {/* Pedido de trade */}
      {!trade && (
        <section className="grid gap-2 rounded-xl border border-game-border bg-game-card p-3">
          <h3 className="font-title text-game-gold">{t('trade.title')}</h3>
          <p className="font-mono text-xs text-game-muted">{t('trade.hint')}</p>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              className="input-field"
              value={target}
              maxLength={20}
              onChange={(event) => setTarget(event.target.value)}
              placeholder={t('trade.targetPlaceholder')}
            />
            <Button
              disabled={!target.trim() || target.trim() === me}
              onClick={() => {
                socketService.connect();
                socketService.requestTrade(target.trim());
              }}
            >
              {t('trade.request')}
            </Button>
          </div>

          {incoming && (
            <div className="mt-2 rounded-lg border border-game-gold bg-game-dark p-2">
              <p className="text-sm text-game-text">
                {t('trade.incoming')}: <span className="text-game-gold">{incoming.fromName}</span>
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button onClick={() => socketService.respondTrade(incoming.tradeId, true)}>{t('game.yes')}</Button>
                <Button variant="danger" onClick={() => socketService.respondTrade(incoming.tradeId, false)}>
                  {t('game.no')}
                </Button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Trade ativo */}
      {trade && (
        <section className="grid gap-3 rounded-xl border border-game-border bg-game-card p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-game-gold">
              {t('trade.with')}: {partner}
            </h3>
            <Button variant="danger" onClick={() => socketService.cancelTrade(trade.tradeId)}>
              {t('market.cancel')}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Minha oferta */}
            <div className="grid gap-2 rounded-lg border border-game-border bg-game-dark p-2">
              <p className="font-mono text-xs text-game-gold">{me}</p>
              <select className="input-field" value={pickRef} onChange={(event) => setPickRef(event.target.value)}>
                <option value="">{t('crafting.selectItem')}</option>
                {bagRefs.filter((ref) => !myItems.includes(ref)).map((ref) => {
                  const item = resolveItemRef(ref);
                  return item ? <option key={ref} value={ref}>{item.icon} {nameOf(item, lang)}</option> : null;
                })}
              </select>
              <Button disabled={!pickRef || myItems.length >= MAX_TRADE_ITEMS} onClick={addItem}>
                {t('trade.addItem')}
              </Button>
              {myItems.map((ref) => {
                const item = resolveItemRef(ref);
                return (
                  <button key={ref} type="button" className="rounded border border-game-border p-1 text-left font-mono text-xs text-game-text hover:bg-game-hover" onClick={() => removeItem(ref)}>
                    {item?.icon} {nameOf(item, lang)} ×
                  </button>
                );
              })}
              <input
                className="input-field"
                type="number"
                min={0}
                value={myGold}
                onChange={(event) => {
                  setMyGold(event.target.value);
                }}
                onBlur={() => sendUpdate(myItems, myGold)}
                placeholder={t('mail.goldPlaceholder')}
              />
              <p className="font-mono text-[10px] text-game-muted">🪙 {player?.gold ?? 0}</p>
            </div>

            {/* Oferta do parceiro */}
            <div className="grid gap-2 rounded-lg border border-game-border bg-game-dark p-2">
              <p className="font-mono text-xs text-game-gold">
                {partner} {partnerConfirmed && '✓'}
              </p>
              {(partnerOffer?.items ?? []).map((ref) => {
                const item = resolveItemRef(ref);
                const pairs = item ? getEffectPairs(item.effects) : [];
                return (
                  <div key={ref} className="rounded border border-game-border p-1 font-mono text-xs text-game-text" title={pairs.map((pair) => describeEffect(pair.effectId, pair.value, lang).text).join(' · ')}>
                    {item?.icon} {nameOf(item, lang)}
                  </div>
                );
              })}
              <p className="font-mono text-xs text-game-muted">🪙 {partnerOffer?.gold ?? 0}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-xs text-game-muted">
              {iConfirmed ? t('trade.waitingConfirm') : t('trade.confirmHint')}
            </p>
            <Button
              disabled={iConfirmed || trade.status !== 'active'}
              onClick={() => {
                sendUpdate(myItems, myGold);
                socketService.confirmTrade(trade.tradeId);
              }}
            >
              {t('trade.confirm')}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};
