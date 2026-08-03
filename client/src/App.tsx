import { useEffect, useState } from 'react';
import './index.css';
import { GameLayout } from './components/layout/GameLayout';
import { CharCreateScreen } from './components/screens/CharCreateScreen';
import { CharacterSelectScreen } from './components/screens/CharacterSelectScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { WikiScreen } from './components/screens/WikiScreen';
import { ChatPanel } from './components/panels/ChatPanel';
import { CityPanel } from './components/panels/CityPanel';
import { CombatPanel } from './components/panels/CombatPanel';
import { GuildPanel } from './components/panels/GuildPanel';
import { HubPanel } from './components/panels/HubPanel';
import { ItemsPanel } from './components/panels/ItemsPanel';
import { PartyPanel } from './components/panels/PartyPanel';
import { ProfilePanel } from './components/panels/ProfilePanel';
import { QuestPanel } from './components/panels/QuestPanel';
import { RankingPanel } from './components/panels/RankingPanel';
import { TravelPanel } from './components/panels/TravelPanel';
import { useI18n } from './hooks/useI18n';
import { Auth } from './services/auth';
import { HiddenEvents } from './systems/hiddenEvents';
import { Impulse } from './systems/impulse';
import { Quests } from './systems/quests';
import { useGameStore } from './store/useGameStore';

const ActivePanel = () => {
  const panel = useGameStore((state) => state.panel);

  switch (panel) {
    case 'hub':
      return <HubPanel />;
    case 'travel':
      return <TravelPanel />;
    case 'combat':
      return <CombatPanel />;
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
      <div className="flex h-screen items-center justify-center overflow-hidden bg-game-dark text-game-gold">
        <span className="anim-pulse font-title text-xl">{t('app.initializing')}</span>
      </div>
    );
  }

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

export default App;
