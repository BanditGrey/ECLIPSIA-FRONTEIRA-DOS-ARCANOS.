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

interface AuctionBid {
  name: string;
  amount: number;
  at: string;
}

interface AuctionEntry {
  id: string;
  itemStr: string;
  sellerName: string;
  startPrice: number;
  minIncrement: number;
  bids: AuctionBid[];
  currentBid: AuctionBid | null;
  expiresAt: string;
  status: string;
  winnerName?: string | null;
  finalAmount?: number | null;
}

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

type MarketTab = 'buy' | 'sell' | 'mine' | 'auctions';

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
  const [auctions, setAuctions] = useState<AuctionEntry[]>([]);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [auctionItemRef, setAuctionItemRef] = useState('');
  const [auctionStart, setAuctionStart] = useState('50');
  const [auctionDuration, setAuctionDuration] = useState(24);
  const [myBids, setMyBids] = useState<AuctionEntry[]>([]);
  const [search, setSearch] = useState('');

  const charName = player?.name ?? '';

  const refresh = useCallback(async () => {
    if (!charName) return;

    setLoading(true);
    const [marketResult, myResult, auctionResult] = await Promise.all([API.market.listings(), API.market.my(charName), API.auction.list()]);

    if (auctionResult.success && auctionResult.data) {
      setAuctions((auctionResult.data as { auctions: AuctionEntry[] }).auctions ?? []);
    }

    if (charName) {
      const bidsResult = await API.auction.myBids(charName);

      if (bidsResult.success && bidsResult.data) {
        setMyBids((bidsResult.data as { auctions: AuctionEntry[] }).auctions ?? []);
      }
    }

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

  const formatTimeLeft = (expiresAt: string) => {
    const ms = new Date(expiresAt).getTime() - Date.now();

    if (ms <= 0) {
      return t('auction.expired');
    }

    const hours = Math.floor(ms / 3_600_000);
    const minutes = Math.floor((ms % 3_600_000) / 60_000);

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const minBidFor = (auction: AuctionEntry) =>
    auction.currentBid ? auction.currentBid.amount + auction.minIncrement : auction.startPrice;

  const placeBid = async (auction: AuctionEntry, quick = false) => {
    const raw = bidAmounts[auction.id] ?? '';
    const amount = quick ? minBidFor(auction) : Math.floor(Number(raw));

    if (!Number.isFinite(amount) || amount < minBidFor(auction)) {
      addNotification(`${t('auction.bidTooLow')} (${minBidFor(auction)} 💎)`, 'warning');
      return;
    }

    const result = await API.auction.bid({ auctionId: auction.id, charName, amount });

    if (!result.success) {
      addNotification(result.error ?? t('auction.error'), 'error');
      return;
    }

    addNotification(t('auction.bidPlaced'), 'gold');
    setBidAmounts((current) => ({ ...current, [auction.id]: '' }));
    void refresh();
  };

  const createAuction = async () => {
    const startPrice = Math.floor(Number(auctionStart));

    if (!auctionItemRef || !Number.isFinite(startPrice) || startPrice < 1) {
      addNotification(t('market.invalidPrice'), 'warning');
      return;
    }

    const item = resolveItemRef(auctionItemRef);
    const result = await API.auction.create({
      charName,
      itemRef: auctionItemRef,
      startPrice,
      durationHours: auctionDuration
    });

    if (!result.success) {
      addNotification(result.error ?? t('auction.error'), 'error');
      return;
    }

    addNotification(t('auction.created'), 'gold');
    setAuctionItemRef('');
    void refresh();
  };

  const cancelAuction = async (auctionId: string) => {
    const result = await API.auction.cancel({ auctionId, charName });

    if (!result.success) {
      addNotification(result.error ?? t('auction.error'), 'error');
      return;
    }

    void refresh();
  };

  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-3 overflow-hidden">
      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        {(['buy', 'sell', 'mine', 'auctions'] as MarketTab[]).map((marketTab) => (
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
            <input
              className="input-field"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t('market.searchPlaceholder')}
            />
            {loading && <p className="text-xs text-game-muted">{t('game.loading')}</p>}
            {!loading && listings.length === 0 && <p className="text-xs text-game-muted">{t('market.empty')}</p>}
            {listings.filter((listing) => {
              if (!search.trim()) return true;

              const item = resolveItemRef(listing.itemStr);
              const name = item ? (itemNames[item.id]?.[lang]?.name ?? item.id) : listing.itemStr;

              return name.toLowerCase().includes(search.trim().toLowerCase());
            }).map((listing) => {
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

        {tab === 'auctions' && (
          <div className="grid h-full gap-3 overflow-auto pr-1">
            {/* Criar leilão */}
            <section className="grid gap-2 rounded-xl border border-game-border bg-game-card p-3">
              <h3 className="font-title text-sm text-game-gold">🔨 {t('auction.createTitle')}</h3>
              <p className="font-mono text-[11px] text-game-muted">{t('auction.feeNote')}</p>
              <div className="grid grid-cols-2 gap-2">
                <select className="input-field" value={auctionItemRef} onChange={(event) => setAuctionItemRef(event.target.value)}>
                  <option value="">{t('crafting.selectItem')}</option>
                  {bagRefs.map((ref) => {
                    const item = resolveItemRef(ref);
                    return item ? <option key={ref} value={ref}>{item.icon} {nameOf(item, lang)}</option> : null;
                  })}
                </select>
                <input className="input-field" type="number" min={1} value={auctionStart} onChange={(event) => setAuctionStart(event.target.value)} placeholder={t('auction.startPrice')} />
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <select className="input-field" value={auctionDuration} onChange={(event) => setAuctionDuration(Number(event.target.value))}>
                  <option value={6}>{t('auction.duration')} 6h</option>
                  <option value={12}>{t('auction.duration')} 12h</option>
                  <option value={24}>{t('auction.duration')} 24h</option>
                </select>
                <Button disabled={!auctionItemRef} onClick={() => void createAuction()}>
                  🔨 {t('auction.create')}
                </Button>
              </div>
            </section>

            {/* Leilões ativos */}
            <h3 className="font-title text-sm text-game-gold">{t('auction.activeTitle')}</h3>
            {/* Meus lances */}
            {myBids.length > 0 && (
              <section className="grid gap-1.5 rounded-xl border border-game-border bg-game-card p-3">
                <h3 className="font-title text-sm text-game-gold">🎯 {t('auction.myBidsTitle')}</h3>
                {myBids.slice(0, 10).map((auction) => {
                  const item = resolveItemRef(auction.itemStr);
                  const myLast = [...auction.bids].reverse().find((bid) => bid.name === charName);
                  const winning = auction.currentBid?.name === charName;

                  return (
                    <p key={`bid-${auction.id}`} className="font-mono text-xs text-game-muted">
                      {item?.icon} {nameOf(item, lang)} · {myLast?.amount ?? 0} 💎{' '}
                      {auction.status === 'settled'
                        ? winning
                          ? <span className="text-green-300">{t('auction.won')}</span>
                          : <span className="text-red-300">{t('auction.lost')}</span>
                        : winning
                          ? <span className="text-green-300">{t('auction.winning')}</span>
                          : <span className="text-yellow-300">{t('auction.outbidState')}</span>}
                    </p>
                  );
                })}
              </section>
            )}

            {auctions.length === 0 && <p className="text-xs text-game-muted">{t('auction.empty')}</p>}
            {auctions.map((auction) => {
              const item = resolveItemRef(auction.itemStr);
              const isMine = auction.sellerName === charName;

              return (
                <article key={auction.id} className="grid gap-2 rounded-xl border border-game-border bg-game-card p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item?.icon ?? '🎁'}</span>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-title text-sm text-game-gold">{nameOf(item, lang)}</h4>
                      <p className="font-mono text-xs text-game-muted">
                        {t('auction.seller')}: {auction.sellerName} · ⏳ {formatTimeLeft(auction.expiresAt)} · {auction.bids.length} {t('auction.bidsWord')}
                      </p>
                    </div>
                    <div className="grid justify-items-end">
                      <span className="font-mono text-sm text-cyan-300">
                        {auction.currentBid ? `${auction.currentBid.amount} 💎` : `${auction.startPrice} 💎 (${t('auction.startAbbr')})`}
                      </span>
                      {auction.currentBid && <span className="font-mono text-[10px] text-game-muted">{auction.currentBid.name}</span>}
                    </div>
                  </div>

                  {!isMine ? (
                    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                      <input
                        className="input-field"
                        type="number"
                        min={minBidFor(auction)}
                        value={bidAmounts[auction.id] ?? ''}
                        onChange={(event) => setBidAmounts((current) => ({ ...current, [auction.id]: event.target.value }))}
                        placeholder={`${t('auction.minBid')}: ${minBidFor(auction)} 💎`}
                      />
                      <Button size="sm" onClick={() => void placeBid(auction)}>
                        {t('auction.bid')}
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => void placeBid(auction, true)}>
                        ⚡ {minBidFor(auction)} 💎
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-game-muted">{t('auction.yours')}</span>
                      {auction.bids.length === 0 && (
                        <Button size="sm" variant="danger" onClick={() => void cancelAuction(auction.id)}>
                          {t('market.cancel')}
                        </Button>
                      )}
                    </div>
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
