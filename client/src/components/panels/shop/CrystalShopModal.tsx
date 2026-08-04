import { useState, useEffect } from 'react';
import { useI18n } from '../../../hooks/useI18n';
import { usePlayerStore } from '../../../store/usePlayerStore';
import { Modal } from '../../ui/Modal';
import { API } from '../../../services/api';

const PACKAGES = [
  { id: 'pack_100', crystals: 100, bonus: 0, priceBRL: 4.90 },
  { id: 'pack_550', crystals: 550, bonus: 10, priceBRL: 24.90 },
  { id: 'pack_1200', crystals: 1200, bonus: 20, priceBRL: 49.90 },
  { id: 'pack_2600', crystals: 2600, bonus: 30, priceBRL: 99.90 },
];

export const CrystalShopModal = () => {
  const { t } = useI18n();
  const player = usePlayerStore((state) => state.data);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const [loading, setLoading] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const reloadPlayer = async () => {
    const res = await API.player.get();
    if (res.success && res.data) {
      setPlayer(res.data as any);
    }
  };

  useEffect(() => {
    let interval: any;
    if (purchaseData && purchaseData.status === 'pending') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/checkout/status/${purchaseData.providerRef}`, {
            headers: { 'Authorization': `Bearer ${window.localStorage.getItem('eclipsia_token')}` }
          }).then(r => r.json());
          
          if (res.success && res.status === 'paid') {
            setPurchaseData((p: any) => ({ ...p, status: 'paid' }));
            await reloadPlayer();
            clearInterval(interval);
          }
        } catch (e) {
          // ignore
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [purchaseData, setPlayer]);

  const handleBuy = async (packageId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('eclipsia_token')}` 
        },
        body: JSON.stringify({ packageId })
      }).then(r => r.json());

      if (res.success) {
        setPurchaseData({ ...res, status: 'pending' });
      } else {
        alert('Erro ao criar pedido');
      }
    } catch (e) {
      alert('Erro na conexão');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(purchaseData.paymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = async () => {
    if (!purchaseData) return;
    try {
      const res = await fetch('/api/checkout/simulate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('eclipsia_token')}` 
        },
        body: JSON.stringify({ providerRef: purchaseData.providerRef })
      }).then(r => r.json());

      if (res.success) {
        setPurchaseData({ ...purchaseData, status: 'paid' });
        await reloadPlayer();
      }
    } catch (e) {}
  };

  if (!player) return null;

  return (
    <Modal id="modal-shop" title={t('shop.title')}>
      <div className="flex w-full flex-col gap-4 p-2 text-game-text">
        <header className="flex flex-col gap-1 text-center">
          <p className="font-mono text-xs text-game-muted">{t('shop.subtitle')}</p>
          <p className="mt-2 font-mono text-sm text-cyan-300">
            Seus Cristais: 💎 {player.crystals ?? 0}
          </p>
        </header>

        {!purchaseData && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="flex flex-col items-center justify-between gap-3 rounded-xl border border-game-border bg-night-900/50 p-4 transition-colors hover:border-gold-500/50 hover:bg-night-800">
                <div className="flex w-full items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-title text-lg text-cyan-300">💎 {pkg.crystals}</span>
                    {pkg.bonus > 0 && <span className="font-mono text-[10px] text-green-400">+{pkg.bonus}% {t('shop.bonus')}</span>}
                  </div>
                  <span className="font-mono text-lg text-gold-300">R$ {pkg.priceBRL.toFixed(2)}</span>
                </div>
                <button 
                  className="btn-gold w-full px-4 py-2" 
                  onClick={() => handleBuy(pkg.id)}
                  disabled={loading}
                >
                  {t('shop.buyBrl')} {pkg.priceBRL.toFixed(2)}
                </button>
              </div>
            ))}
          </div>
        )}

        {purchaseData && purchaseData.status === 'pending' && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-game-border bg-night-900/80 p-6 text-center">
            <h3 className="font-title text-xl text-yellow-300">⏳ {t('shop.pending')}</h3>
            <p className="font-mono text-sm text-game-muted">{t('shop.pixInstructions')}</p>
            
            <div className="flex w-full items-center gap-2 rounded-lg bg-night-950 p-3 font-mono text-xs text-game-text">
              <span className="truncate">{purchaseData.paymentUrl}</span>
            </div>
            
            <button className="btn-glass w-full max-w-sm px-4 py-2" onClick={handleCopy}>
              {copied ? t('shop.copied') : t('shop.copy')}
            </button>

            <p className="mt-4 animate-pulse font-mono text-xs text-game-muted">{t('shop.waiting')}</p>

            {/* Botão para dev */}
            <button className="mt-8 border-b border-red-500/30 text-xs text-red-400 opacity-50 transition-opacity hover:opacity-100" onClick={simulatePayment}>
              {t('shop.simulateDev')}
            </button>
          </div>
        )}

        {purchaseData && purchaseData.status === 'paid' && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-night-900/80 p-6 text-center">
            <h3 className="font-title text-2xl text-green-400">🎉 {t('shop.paid')}</h3>
            <p className="font-mono text-sm text-game-muted">
              +{purchaseData.amountCrystals} 💎
            </p>
            <button className="btn-gold mt-4 w-full max-w-xs px-4 py-2" onClick={() => setPurchaseData(null)}>
              {t('shop.close')}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
