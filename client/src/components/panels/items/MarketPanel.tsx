import { useCallback, useEffect, useState } from 'react';
import { itemNames } from '../../../data/itemNames';
import { describeEffect } from '../../../data/effectNames';
import { getEffectPairs } from '../../../data/effectRegistry';
import { useI18n } from '../../../hooks/useI18n';
import { API } from '../../../services/api';
import { useGameStore } from '../../../store/useGameStore';
import { refOf, usePlayerStore } from '../../../store/usePlayerStore';
import type { Item, Rarity } from '../../../types/item.types';
import { getItemByNumId, resolveItemRef } from '../../../utils/itemSerializer';
import { Button } from '../../ui/Button';

interface MarketListing {
  _id: string;
  sellerName: string;
  itemStr: string;
  numId: number;
  rarity: Rarity;
  price: number;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: string;
}

type MarketTab = 'buy' | 'sell' | 'mine';

/** Aplica o snapshot do personagem retornado pelo servidor (ouro/inventário). */
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

const nameOf = (item: Item | undefined, lang: 'pt-BR' | 'en-US' | 'es-ES' | 'ja-JP') => {
  if (!item) return '???';

  return itemNames[item.id]?.[lang]?.name ?? item.id;
};

/** Mercado de itens — movido a itemStr ("numId|e:v|..."), com custódia no servidor. */
export const MarketPanel = () => {
  const { t, lang } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const addNotification = useGameStore((state) => state.addNotification);
  const [tab, setTab] = useState<MarketTab>('buy');
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [myListings, setMyListings] = useState<MarketListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const [sellRef, setSellRef] = useState('');
  const [price, setPrice] = useState('100');

  const charName = player?.name ?? '';

  const refresh = useCallback(async () => {
    if (!charName) return;

    setLoading(true);
    const [marketResult, myResult] = await Promise.all([API.market.listings(), API.market.my(charName)]);

    setOffline(!marketResult.success);

    if (marketResult.success && marketResult.data) {
      setListings((marketResult.data as { listings: MarketListing[] }).listings ?? []);
    }

    if (myResult.success && myResult.data) {
      setMyListings((myResult.data as { listings: MarketListing[] }).listings ?? []);
    }

    setLoading(false);
  }, [charName]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const notifyError = (result: { error?: string }) => {
    addNotification(result.error ?? t('market.error'), 'error');
  };

  const buy = async (listingId: string) => {
    const result = await API.market.buy({ listingId, charName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    applyServerSnapshot((result.data as { character?: { gold: number; inventory: unknown[] } })?.character);
    addNotification(t('market.bought'), 'gold');
    void refresh();
  };

  const list = async () => {
    const listingPrice = Math.floor(Number(price));

    if (!sellRef || !Number.isFinite(listingPrice) || listingPrice < 1) {
      addNotification(t('market.invalidPrice'), 'warning');
      return;
    }

    const item = resolveItemRef(sellRef);
    const result = await API.market.list({ charName, itemRef: sellRef, price: listingPrice, rarity: item?.rarity });

    if (!result.success) {
      notifyError(result);
      return;
    }

    applyServerSnapshot((result.data as { character?: { gold: number; inventory: unknown[] } })?.character);
    addNotification(t('market.listed'), 'gold');
    setSellRef('');
    void refresh();
  };

  const cancel = async (listingId: string) => {
    const result = await API.market.cancel({ listingId, charName });

    if (!result.success) {
      notifyError(result);
      return;
    }

    applyServerSnapshot((result.data as { character?: { gold: number; inventory: unknown[] } })?.character);
    void refresh();
  };

  const bagRefs = (player?.inventory ?? []).map((entry) => refOf(entry));

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        {(['buy', 'sell', 'mine'] as MarketTab[]).map((marketTab) => (
          <button
            key={marketTab}
            type="button"
            className={[
              tab === marketTab ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:bg-game-hover',
              'rounded-lg border border-game-border py-1.5 transition-colors'
            ].join(' ')}
            onClick={() => setTab(marketTab)}
          >
            {t(`market.tabs.${marketTab}`)}
          </button>
        ))}
      </div>

      {offline && <p className="rounded-lg border border-game-border bg-game-card p-2 text-xs text-game-muted">{t('market.offline')}</p>}

      <section className="min-h-0 overflow-auto pr-1">
        {tab === 'buy' && (
          <div className="grid gap-2">
            {loading && <p className="text-xs text-game-muted">{t('game.loading')}</p>}
            {!loading && listings.length === 0 && <p className="text-xs text-game-muted">{t('market.empty')}</p>}
            {listings.map((listing) => {
              const item = resolveItemRef(listing.itemStr) ?? getItemByNumId(listing.numId);
              const pairs = item ? getEffectPairs(item.effects) : [];

              return (
                <article key={listing._id} className="rounded-xl border border-game-border bg-game-card p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item?.icon ?? '🎁'}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-title text-sm text-game-gold">{nameOf(item, lang)} {listing.itemStr !== item?.id ? <span className="text-[10px] text-game-muted">#{listing.numId}</span> : null}</h3>
                      <p className="truncate font-mono text-xs text-game-muted">
                        {pairs.slice(0, 3).map((pair) => describeEffect(pair.effectId, pair.value, lang).text).join(' • ')}
                      </p>
                      <p className="font-mono text-xs text-game-muted">
                        {t('market.seller')}: {listing.sellerName} · {t(`items.rarities.${listing.rarity}`)}
                      </p>
                    </div>
                    <div className="grid justify-items-end gap-1">
                      <span className="font-mono text-sm text-cyan-300">{listing.price} 💎</span>
                      <Button disabled={(player?.gold ?? 0) < listing.price} onClick={() => buy(listing._id)}>
                        {t('market.buy')}
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {tab === 'sell' && (
          <div className="grid gap-2 rounded-xl border border-game-border bg-game-card p-3">
            <p className="font-mono text-[11px] text-game-muted">{t('market.taxNote')}</p>
            <p className="font-mono text-[11px] text-cyan-300">💎 {player?.crystals ?? 0} • {t('market.crystalsCurrency')}</p>
            <select className="input-field" value={sellRef} onChange={(event) => setSellRef(event.target.value)}>
              <option value="">{t('crafting.selectItem')}</option>
              {bagRefs.map((ref) => {
                const item = resolveItemRef(ref);
                return item ? <option key={ref} value={ref}>{nameOf(item, lang)}</option> : null;
              })}
            </select>
            <input
              className="input-field"
              type="number"
              min={1}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder={t('market.price')}
            />
            <Button disabled={!sellRef} onClick={() => void list()}>
              {t('market.listItem')}
            </Button>
          </div>
        )}

        {tab === 'mine' && (
          <div className="grid gap-2">
            {myListings.length === 0 && <p className="text-xs text-game-muted">{t('market.empty')}</p>}
            {myListings.map((listing) => {
              const item = resolveItemRef(listing.itemStr);

              return (
                <article key={listing._id} className="flex items-center gap-3 rounded-xl border border-game-border bg-game-card p-3">
                  <span className="text-2xl">{item?.icon ?? '🎁'}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-title text-sm text-game-gold">{nameOf(item, lang)}</h3>
                    <p className="font-mono text-xs text-game-muted">
                      {listing.price} 💎 · {t(`market.status.${listing.status}`)}
                    </p>
                  </div>
                  {listing.status === 'active' && (
                    <Button variant="danger" onClick={() => cancel(listing._id)}>
                      {t('market.cancel')}
                    </Button>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
