import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { AuthService } from '../../services/auth';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { LangCode } from '../../i18n';
import { ART } from '../../data/art';

const languageButtons: Array<{ code: LangCode; labelKey: string }> = [
  { code: 'pt-BR', labelKey: 'settings.languageButtons.pt' },
  { code: 'en-US', labelKey: 'settings.languageButtons.en' },
  { code: 'es-ES', labelKey: 'settings.languageButtons.es' },
  { code: 'ja-JP', labelKey: 'settings.languageButtons.ja' }
];

export const LoginScreen = () => {
  const { lang, setLang, t } = useI18n();
  const setScreen = useGameStore((state) => state.setScreen);
  const addNotification = useGameStore((state) => state.addNotification);

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Busca status do servidor silenciosamente
  useEffect(() => {
    let mounted = true;
    API.get<{ online?: number }>('/world/state', false)
      .then((result) => {
        if (mounted && result.success) {
          setOnline(typeof result.data.online === 'number' ? result.data.online : null);
        }
      })
      .catch(() => {
        if (mounted) setOnline(null);
      });
    return () => { mounted = false; };
  }, []);

  const handleOfflineMode = () => {
    try {
      AuthService.playOfflineMock();
    } catch (e: any) {
      addNotification(`Erro ao carregar offline: ${e.message}`, 'error');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // Login
      if (tab === 'login') {
        const response = await AuthService.login(email, password);
        if (!response.success) {
          addNotification(t('login.loginError'), 'error');
        }
        return;
      }

      // Registro
      if (tab === 'register') {
        const response = await AuthService.register(username, email, password);
        if (response.success) {
          addNotification(t('login.registerSuccess'), 'success');
          setTab('login');
        } else {
          addNotification(t('errors.generic'), 'error');
        }
      }
    } catch (err: any) {
      addNotification('Erro de rede ao conectar. Tente o Modo Offline.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-game-dark text-game-text">
      {/* Background Cinematográfico */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url(${ART.bg.login})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/35 to-night-950/95" />
      <div className="vignette absolute inset-0" />

      {/* Botões de Idioma no Topo */}
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        {languageButtons.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`chip transition-all active:scale-95 ${lang === item.code ? '!border-gold-400 text-gold-300 shadow-glow-sm' : 'opacity-70 hover:opacity-100 hover:text-game-text'}`}
            onClick={() => setLang(item.code)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center px-6">
        
        {/* Header do Jogo */}
        <img src={ART.emblem} alt="Eclipsia" className="mb-3 h-24 w-24 animate-floaty rounded-full opacity-95 shadow-glow-gold" draggable={false} />
        <h1 className="title-gold text-glow text-center font-title text-5xl font-black tracking-[0.22em]">
          {t('game.title')}
        </h1>
        <p className="mt-2 text-center text-lg italic text-game-muted">{t('game.subtitle')}</p>

        <div className="divider-ornate my-6 w-64"><span className="diamond" /></div>

        {/* MODO OFFLINE / SANDBOX DIRETO */}
        <button 
          type="button" 
          onClick={handleOfflineMode}
          className="w-full mb-6 py-4 rounded-xl border border-arcane-400/50 bg-gradient-to-r from-night-800/90 via-arcane-600/30 to-night-800/90 text-arcane-300 font-bold font-title tracking-widest hover:border-arcane-400 hover:text-white transition-all shadow-[0_0_15px_rgba(63,217,196,0.15)] active:scale-95"
        >
          ► ENTRAR (MODO SANDBOX)
        </button>

        {/* Container de Login Opcional */}
        <section className="panel-arcane w-full rounded-xl p-6 shadow-panel">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg border border-night-600 bg-night-900/90 p-1 font-mono text-xs">
            <button
              type="button"
              className={`rounded-md py-2 font-bold tracking-widest transition-all active:scale-95 ${tab === 'login' ? 'btn-gold' : 'text-game-muted hover:text-game-text'}`}
              onClick={() => setTab('login')}
            >
              {t('login.loginTab')}
            </button>
            <button
              type="button"
              className={`rounded-md py-2 font-bold tracking-widest transition-all active:scale-95 ${tab === 'register' ? 'btn-gold' : 'text-game-muted hover:text-game-text'}`}
              onClick={() => setTab('register')}
            >
              {t('login.registerTab')}
            </button>
          </div>

          <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
            {tab === 'register' && (
              <input
                className="input-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('register.namePlaceholder')}
                required
              />
            )}
            
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.emailPlaceholder')}
              required
            />
            
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.passPLaceholder')}
              required
            />

            <button type="submit" disabled={loading} className="btn-gold w-full py-2 mt-2 rounded-lg font-bold disabled:opacity-50">
              {tab === 'login' ? t('login.enter') : t('register.create')}
            </button>
          </form>
          
          <button 
            type="button" 
            onClick={() => setScreen('wiki')}
            className="w-full mt-3 py-2 text-sm text-game-muted hover:text-white transition-colors"
          >
            Enciclopédia / Wiki
          </button>
        </section>

        {/* Rodapé Server Status */}
        <footer className="mt-6 flex items-center gap-3 font-mono text-xs text-game-faded">
          <span className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${online === null ? 'bg-game-faded' : 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.9)]'}`} />
            {online === null ? 'Servidor Offline' : `${online} Online`}
          </span>
          <span className="h-3 w-px bg-game-border" />
          <span>v1.0</span>
        </footer>

      </main>
    </div>
  );
};
