import { FormEvent, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { AuthService } from '../../services/auth';
import { useGameStore } from '../../store/useGameStore';
import type { LangCode } from '../../i18n';
import { wikiTranslations } from '../../i18n/wiki';
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
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(42,63,95,0.45),_rgba(6,10,20,0.95)_45%,_#060a14_100%)]" />

      <div className="absolute right-4 top-4 z-10 flex gap-2">
        {languageButtons.map((item) => (
          <button
            key={item.code}
            type="button"
            className={[
              'rounded-md border px-2 py-1 font-mono text-xs transition-colors active:scale-95',
              lang === item.code
                ? 'border-game-gold bg-game-card text-game-gold'
                : 'border-game-border bg-game-primary text-game-muted hover:text-game-text'
            ].join(' ')}
            onClick={() => setLang(item.code)}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center justify-center px-6">
        <section className="w-full rounded-2xl border border-game-border bg-game-primary/90 p-6 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="text-center">
            <h1 className="font-title text-5xl font-black tracking-[0.18em] text-game-gold drop-shadow">{t('game.title')}</h1>
            <p className="mt-2 text-lg italic text-game-muted">{t('game.subtitle')}</p>
            <div className="mx-auto my-5 h-px w-40 bg-game-gold" />
          </div>

          <div className="mb-5 grid grid-cols-2 rounded-lg border border-game-border bg-game-dark p-1 font-mono text-sm">
            <button
              type="button"
              className={[
                'rounded-md py-2 transition-colors active:scale-95',
                tab === 'login' ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:text-game-text'
              ].join(' ')}
              onClick={() => setTab('login')}
            >
              {t('login.loginTab')}
            </button>
            <button
              type="button"
              className={[
                'rounded-md py-2 transition-colors active:scale-95',
                tab === 'register' ? 'bg-game-gold text-game-dark' : 'text-game-muted hover:text-game-text'
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
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('login.emailPlaceholder')}
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

            <Button className="mt-2 border-blue-500 !bg-blue-700 !text-white hover:!bg-blue-600" fullWidth loading={loading}>
              {tab === 'login' ? t('login.enter') : t('register.create')}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setScreen('wiki')}>
              {String(wiki.ui.open)}
            </Button>
          </form>
        </section>

        <footer className="mt-5 font-mono text-xs text-game-faded">
          {t('game.version')} 0.1.0
        </footer>
      </main>
    </div>
  );
};
