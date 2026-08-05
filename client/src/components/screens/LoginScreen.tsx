import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { AuthService } from '../../services/auth';
import { API } from '../../services/api';
import { useGameStore } from '../../store/useGameStore';
import type { LangCode } from '../../i18n';
import { wikiTranslations } from '../../i18n/wiki';
import { ART } from '../../data/art';
import { Button } from '../ui/Button';

type LoginTab = 'login' | 'register';

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
  const wiki = wikiTranslations[lang];
  const [tab, setTab] = useState<LoginTab>('login');
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    let mounted = true;

    API.get<{ online?: number }>('/world/state', false)
      .then((result) => {
        if (mounted && result.success) {
          setOnline(typeof result.data.online === 'number' ? result.data.online : null);
        }
      })
      .catch(() => {
        if (mounted) {
          setOnline(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (email.toLowerCase().trim() === 'teste' && password.toLowerCase().trim() === 'teste') {
        AuthService.playOfflineMock();
        return;
      }

      if (tab === 'login') {
        const response = await AuthService.login(email, password);

        if (!response.success) {
          addNotification(t('login.loginError'), 'error');
        }

        return;
      }

      if (password !== confirmPassword) {
        addNotification(t('register.passwordMismatch'), 'error');
        return;
      }

      const response = await AuthService.register(username, email, password);

      if (response.success) {
        addNotification(t('login.registerSuccess'), 'success');
      } else {
        addNotification(t('errors.generic'), 'error');
      }
    } catch {
      addNotification(tab === 'login' ? t('login.loginError') : t('errors.generic'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-game-dark text-game-text">
      {/* Arte de fundo (hero) */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-kenburns"
        style={{ backgroundImage: `url(${ART.bg.login})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/35 to-night-950/95" />
      <div className="vignette absolute inset-0" />

      {/* Seletores de idioma */}
      <div className="absolute right-4 top-4 z-20 flex gap-2">
        {languageButtons.map((item) => (
          <button
            key={item.code}
            type="button"
            className={[
              'chip transition-all active:scale-95',
              lang === item.code
                ? '!border-gold-400 text-gold-300 shadow-glow-sm'
                : 'opacity-70 hover:opacity-100 hover:text-game-text'
            ].join(' ')}
            onClick={() => setLang(item.code)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center px-6">
        {/* Emblema + título */}
        <img
          src={ART.emblem}
          alt=""
          className="mb-3 h-24 w-24 animate-floaty rounded-full opacity-95 shadow-glow-gold"
          draggable={false}
        />
        <h1 className="title-gold text-glow text-center font-title text-5xl font-black tracking-[0.22em]">
          {t('game.title')}
        </h1>
        <p className="mt-2 text-center text-lg italic text-game-muted">{t('game.subtitle')}</p>

        <div className="divider-ornate my-6 w-64">
          <span className="diamond" />
        </div>

        {/* Cartão de autenticação */}
        <section className="panel-arcane anim-up w-full rounded-xl p-6 shadow-panel">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg border border-night-600 bg-night-900/90 p-1 font-mono text-xs">
            <button
              type="button"
              className={[
                'rounded-md py-2 font-bold tracking-widest transition-all active:scale-95',
                tab === 'login' ? 'btn-gold' : 'text-game-muted hover:text-game-text'
              ].join(' ')}
              onClick={() => setTab('login')}
            >
              {t('login.loginTab')}
            </button>
            <button
              type="button"
              className={[
                'rounded-md py-2 font-bold tracking-widest transition-all active:scale-95',
                tab === 'register' ? 'btn-gold' : 'text-game-muted hover:text-game-text'
              ].join(' ')}
              onClick={() => setTab('register')}
            >
              {t('login.registerTab')}
            </button>
          </div>

          <form className="grid gap-3" onSubmit={handleSubmit}>
            {tab === 'register' && (
              <label className="grid gap-1 text-sm text-game-muted">
                <span>{t('register.username')}</span>
                <input
                  className="input-field"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder={t('register.usernamePlaceholder')}
                  autoComplete="username"
                  required
                />
              </label>
            )}

            <label className="grid gap-1 text-sm text-game-muted">
              <span>{t('login.email')}</span>
              <input
                className="input-field"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('login.emailPlaceholder') + " (ou 'teste' para Sandbox)"}
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-1 text-sm text-game-muted">
              <span>{t('login.pass')}</span>
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={t('login.passPLaceholder')}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                required
              />
            </label>

            {tab === 'register' && (
              <label className="grid gap-1 text-sm text-game-muted">
                <span>{t('register.confirmPass')}</span>
                <input
                  className="input-field"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder={t('register.confirmPass')}
                  autoComplete="new-password"
                  required
                />
              </label>
            )}

            <Button className="mt-2" fullWidth loading={loading}>
              {tab === 'login' ? t('login.enter') : t('register.create')}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setScreen('wiki')}>
              {String(wiki.ui.open)}
            </Button>
          </form>
        </section>

        {/* Rodapé */}
        <footer className="mt-6 flex items-center gap-3 font-mono text-xs text-game-faded">
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${online === null ? 'bg-game-faded' : online > 0 ? 'bg-green-400 shadow-[0_0_6px_rgb(74_222_128_/_0.9)]' : 'bg-amber-400 shadow-[0_0_6px_rgb(251_191_36_/_0.9)]'}`}
            />
            {online === null ? '···' : `${online} ${t('login.onlineLabel')}`}
          </span>
          <span className="h-3 w-px bg-game-border" />
          <span>
            {t('game.version')} 0.1.0
          </span>
        </footer>
      </main>
    </div>
  );
};
