import { useMemo, useState } from 'react';
import { archetypes } from '../../data/archetypes';
import { PROFICIENCIES, PROFICIENCY_ICONS } from '../../data/proficiencies';
import { skills } from '../../data/skills';
import { useI18n } from '../../hooks/useI18n';
import { wikiSectionOrder, wikiTranslations } from '../../i18n/wiki';
import type { WikiBlock, WikiFaqItem, WikiSectionKey } from '../../i18n/wiki';
import { useGameStore } from '../../store/useGameStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Portrait } from '../ui/Portrait';

type WikiLanguage = typeof wikiTranslations['pt-BR'];

interface WikiSectionData {
  title: string;
  blocks?: WikiBlock[];
  items?: WikiFaqItem[];
  table?: Array<Record<string, string>>;
}

const xpForLevel = (level: number) => Math.floor(100 * level ** 1.45 + level * 25);

export const WikiScreen = () => {
  const { lang, t } = useI18n();
  const [activeSection, setActiveSection] = useState<WikiSectionKey>('quick');
  const setScreen = useGameStore((state) => state.setScreen);
  const player = usePlayerStore((state) => state.data);
  const wiki = wikiTranslations[lang] as WikiLanguage;
  const section = wiki[activeSection] as WikiSectionData;

  const xpRows = useMemo(() => Array.from({ length: 100 }, (_, index) => ({ level: index + 1, xp: xpForLevel(index + 1) })), []);

  const goBack = () => {
    setScreen(player ? 'game' : 'login');
  };

  return (
    <div className="bg-eclipsia grid h-screen grid-rows-[auto_1fr] overflow-hidden text-game-text">
      <header className="relative flex h-header items-center justify-between border-b border-night-700 bg-night-900/85 px-4 backdrop-blur">
        <div>
          <h1 className="title-gold font-title text-xl font-black">{String(wiki.ui.title)}</h1>
          <p className="font-mono text-xs text-game-muted">{String(wiki.ui.subtitle)}</p>
        </div>
        <Button size="sm" variant="secondary" onClick={goBack}>
          {String(wiki.ui.back)}
        </Button>
      </header>

      <main className="grid min-h-0 grid-cols-[260px_1fr] gap-3 overflow-hidden p-3">
        <aside className="grid min-h-0 grid-rows-[auto_1fr] rounded-xl border border-night-600 bg-night-900/70 p-3 shadow-panel">
          <h2 className="mb-3 font-title text-gold-300">{String(wiki.ui.sections)}</h2>
          <nav className="grid min-h-0 gap-2 overflow-auto pr-1">
            {wikiSectionOrder.map((key) => (
              <button
                key={key}
                type="button"
                className={[
                  'rounded-lg border px-3 py-2 text-left font-mono text-xs transition-all active:scale-95',
                  activeSection === key
                    ? 'btn-gold'
                    : 'border-night-600 bg-night-900/80 text-game-muted hover:border-gold-600/50 hover:text-game-text'
                ].join(' ')}
                onClick={() => setActiveSection(key)}
              >
                {String(wiki.nav[key])}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-h-0 overflow-hidden rounded-xl border border-night-600 bg-night-900/60 shadow-panel">
          <div className="h-full overflow-auto p-4 pr-2">
            <h2 className="font-title text-3xl font-black text-game-gold">{section.title}</h2>

            <div className="mt-4 grid gap-4">
              {section.blocks?.map((block) => (
                <article key={block.title} className="rounded-xl border border-game-border bg-game-card p-4">
                  <h3 className="font-title text-xl text-game-gold">{block.title}</h3>
                  <ul className="mt-3 grid gap-2 text-game-muted">
                    {block.items.map((item) => (
                      <li key={item} className="rounded border border-game-border bg-game-primary px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}

              {activeSection === 'character' && (
                <article className="rounded-xl border border-night-600 bg-night-900/60 p-4 shadow-panel">
                  <h3 className="title-gold font-title text-xl font-bold">{t('charCreate.originTitle')}</h3>
                  <p className="mt-1 font-mono text-xs text-game-muted">{t('charCreate.originHint')}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {archetypes.map((archetype) => (
                      <div key={archetype.id} className="rounded-lg border border-night-600 bg-gradient-to-b from-night-700/60 to-night-900/80 p-3 transition-colors hover:border-gold-600/50">
                        <div className="flex items-center gap-3">
                          <Portrait
                            kind="class"
                            id={archetype.id}
                            size={52}
                            fallbackIcon={archetype.icon}
                            ring="gold"
                            className="opacity-95"
                          />
                          <strong className="title-gold font-title">{t(`charCreate.archetypes.${archetype.id}.name`)}</strong>
                        </div>
                        <p className="mt-1 text-sm italic text-game-muted">{t(`charCreate.archetypes.${archetype.id}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeSection === 'combat' && (
                <article className="rounded-xl border border-night-600 bg-night-900/60 p-4 shadow-panel">
                  <h3 className="title-gold font-title text-xl font-bold">{t('profile.proficiencies')}</h3>
                  <p className="mt-1 font-mono text-xs text-game-muted">{t('profile.proficiencyHint')}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {PROFICIENCIES.map((category) => {
                      const firstSkill = skills.find((skill) => skill.proficiency === category);

                      return (
                        <div key={category} className="rounded-lg border border-night-600 bg-gradient-to-b from-night-700/50 to-night-900/70 p-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{PROFICIENCY_ICONS[category]}</span>
                            <strong className="truncate font-title text-sm text-gold-300">
                              {t(`proficiencies.${category}.name`)}
                            </strong>
                          </div>
                          {firstSkill && (
                            <p className="mt-1 font-mono text-[10px] text-game-muted">
                              {t('profile.nextSkill')}: {t(`skills.${firstSkill.id}.name`)} · {firstSkill.requireProficiency}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </article>
              )}

              {activeSection === 'combat' && (
                <article className="rounded-xl border border-night-600 bg-night-900/60 p-4 shadow-panel">
                  <h3 className="title-gold font-title text-xl font-bold">{t('combat.skills')}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="rounded-lg border border-game-border bg-game-primary p-3">
                        <div className="flex items-center justify-between gap-2">
                          <strong className="text-game-gold">
                            {skill.icon} {t(`skills.${skill.id}.name`)}
                          </strong>
                          <span className="font-mono text-xs text-game-muted">
                            {String(wiki.ui.mp)} {skill.mp} • {String(wiki.ui.cd)} {skill.cd}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-game-muted">{t(`skills.${skill.id}.desc`)}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeSection === 'luck' && section.table && (
                <article className="rounded-xl border border-game-border bg-game-card p-4">
                  <h3 className="font-title text-xl text-game-gold">{String(wiki.ui.chance)}</h3>
                  <div className="mt-3 overflow-auto rounded-lg border border-game-border">
                    <table className="w-full border-collapse font-mono text-sm">
                      <thead className="bg-game-primary text-game-gold">
                        <tr>
                          {['luck', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'relic'].map((key) => (
                            <th key={key} className="border-b border-game-border px-3 py-2 text-left">
                              {key === 'luck' ? t('profile.stats.luck') : t(`items.rarities.${key}`)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.map((row) => (
                          <tr key={row.luck} className="odd:bg-game-card even:bg-game-primary">
                            {['luck', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'relic'].map((key) => (
                              <td key={key} className="border-b border-game-border px-3 py-2 text-game-muted">
                                {row[key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              )}

              {activeSection === 'progression' && (
                <article className="rounded-xl border border-game-border bg-game-card p-4">
                  <h3 className="font-title text-xl text-game-gold">
                    {String(wiki.ui.xp)} 1-100
                  </h3>
                  <div className="mt-3 grid max-h-80 grid-cols-4 gap-2 overflow-auto pr-1 font-mono text-xs">
                    {xpRows.map((row) => (
                      <div key={row.level} className="flex justify-between rounded border border-game-border bg-game-primary px-2 py-1">
                        <span>{String(wiki.ui.level)} {row.level}</span>
                        <span className="text-game-gold">{row.xp}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {activeSection === 'faq' && section.items && (
                <div className="grid gap-3">
                  {section.items.map((item) => (
                    <article key={item.q} className="rounded-xl border border-game-border bg-game-card p-4">
                      <h3 className="font-title text-lg text-game-gold">{item.q}</h3>
                      <p className="mt-2 text-game-muted">{item.a}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
