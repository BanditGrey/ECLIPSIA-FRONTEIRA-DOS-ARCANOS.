import { useEffect, useState } from 'react';
import { Suspense, lazy } from 'react';

const HubPanel = lazy(() => import('./components/panels/HubPanel').then(m => ({ default: m.HubPanel })));
const RankingPanel = lazy(() => import('./components/panels/RankingPanel').then(m => ({ default: m.RankingPanel })));
const TravelPanel = lazy(() => import('./components/panels/TravelPanel').then(m => ({ default: m.TravelPanel })));
const WikiScreen = lazy(() => import('./components/screens/WikiScreen').then(m => ({ default: m.WikiScreen })));
const ItemsPanel = lazy(() => import('./components/panels/ItemsPanel').then(m => ({ default: m.ItemsPanel })));
import './index.css';
import { ITEMS } from './data/items';
import { registerPetData } from './store/usePetStore';
import { registerPlayerItems } from './store/usePlayerStore';
import type { Item } from './types/item.types';
import { GameLayout } from './components/layout/GameLayout';
import { CharCreateScreen } from './components/screens/CharCreateScreen';
import { CharacterSelectScreen } from './components/screens/CharacterSelectScreen';
import { LoginScreen } from './components/screens/LoginScreen';

import { ChatPanel } from './components/panels/ChatPanel';
import { CityPanel } from './components/panels/CityPanel';
import { CombatPanel } from './components/panels/CombatPanel';
import { GuildPanel } from './components/panels/GuildPanel';


import { PartyPanel } from './components/panels/PartyPanel';
import { ProfilePanel } from './components/panels/ProfilePanel';
import { QuestPanel } from './components/panels/QuestPanel';

import { BossPanel } from './components/panels/BossPanel';

import { useI18n } from './hooks/useI18n';
import { Auth } from './services/auth';
import { HiddenEvents } from './systems/hiddenEvents';
import { Impulse } from './systems/impulse';
import { Quests } from './systems/quests';
import { useGameStore } from './store/useGameStore';
import { Notifications } from './components/ui/Notifications';

// Registra o catálogo de itens (com effects) no store do jogador.
registerPlayerItems(Object.values(ITEMS));

// Registra os dados reais dos pets do catálogo (sem isso, equipPet
// usaria o fallback genérico de 50 HP / 5 ATK para todos).
for (const item of Object.values(ITEMS) as Item[]) {
  if (item.petData) {
    registerPetData(item.id, item.petData);
  }
}

const ActivePanel = () => {
  const panel = useGameStore((state) => state.panel);

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gold">Carregando painel...</div>}>
      {(() => {
        switch (panel) {
          case 'hub':
            return <HubPanel />;
    case 'travel':
      return <TravelPanel />;
    case 'combat':
      return <CombatPanel />;
    case 'boss':
      return <BossPanel />;
    case 'items':
      return <ItemsPanel />;
    case 'profile':
      return <ProfilePanel />;
    case 'quest':
      return <QuestPanel />;
    case 'ranking':
      return <RankingPanel />;
    case 'chat':
      return <ChatPanel />;
    case 'guild':
      return <GuildPanel />;
    case 'city':
      return <CityPanel />;
    case 'party':
      return <PartyPanel />;
          default:
            return <HubPanel />;
        }
      })()}
    </Suspense>
  );
};

export const App = () => {
  const { t } = useI18n();
  const screen = useGameStore((state) => state.screen);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeApp = async () => {
      await Auth.checkSession();
      Quests.init();
      HiddenEvents.init();
      Impulse.init();

      if (mounted) {
        setIsInitializing(false);
      }
    };

    initializeApp();

    return () => {
      mounted = false;
    };
  }, []);

  if (isInitializing) {
    return (
      <div className="bg-eclipsia flex h-full flex-col items-center justify-center gap-4 overflow-hidden text-game-gold">
        <img
          src="/assets/emblem.png"
          alt=""
          className="h-20 w-20 animate-floaty rounded-full opacity-90 shadow-glow-gold"
          draggable={false}
        />
        <span className="anim-pulse title-gold font-title text-xl tracking-[0.2em]">{t('app.initializing')}</span>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen />;
      case 'char-create':
        return <CharCreateScreen />;
      case 'char-select':
        return <CharacterSelectScreen />;
      case 'game':
        return (
          <GameLayout>
            <ActivePanel />
          </GameLayout>
        );
      case 'wiki':
        return <WikiScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <>
      {renderScreen()}
      <Notifications />
    </>
  );
};

export default App;
