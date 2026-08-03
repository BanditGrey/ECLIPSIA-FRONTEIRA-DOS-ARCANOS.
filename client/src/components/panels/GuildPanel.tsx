import { useI18n } from '../../hooks/useI18n';

export const GuildPanel = () => {
  const { t } = useI18n();

  return (
    <div className="flex h-full items-center justify-center overflow-hidden bg-game-dark p-3 text-game-text">
      <section className="grid w-full max-w-md place-items-center gap-4 rounded-2xl border border-game-border bg-game-panel p-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-game-gold bg-game-card text-5xl shadow-[0_0_22px_rgb(240_192_64_/_0.18)]">
          👥
        </div>
        <h1 className="font-title text-2xl font-bold text-game-gold">{t('guild.soon')}</h1>
      </section>
    </div>
  );
};
