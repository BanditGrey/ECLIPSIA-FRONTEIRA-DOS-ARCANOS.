import type { ReactNode } from 'react';
import { Notifications } from '../ui/Notifications';
import { Header } from './Header';
import { Navbar } from './Navbar';

interface GameLayoutProps {
  children: ReactNode;
}

export const GameLayout = ({ children }: GameLayoutProps) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-game-dark text-game-text">
      <Header />
      <main className="relative flex-1 overflow-hidden">{children}</main>
      <Navbar />
      <Notifications />
    </div>
  );
};
