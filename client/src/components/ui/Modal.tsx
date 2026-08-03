import type { ReactNode } from 'react';
import { useGameStore } from '../../store/useGameStore';

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ id, title, children, onClose }: ModalProps) => {
  const activeModal = useGameStore((state) => state.activeModal);
  const closeModal = useGameStore((state) => state.closeModal);

  if (activeModal !== id) {
    return null;
  }

  const handleClose = () => {
    onClose?.();
    closeModal();
  };

  return (
    <div
      className="anim-fade fixed inset-0 z-[900] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={handleClose}
      role="presentation"
    >
      <section
        className="anim-up max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl border border-game-border bg-game-panel shadow-2xl shadow-black/50"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
      >
        <header className="flex h-12 items-center justify-between border-b border-game-border bg-game-primary px-4">
          <h2 id={`${id}-title`} className="font-title text-lg font-bold text-game-gold">
            {title}
          </h2>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-game-muted transition-colors hover:bg-game-hover hover:text-game-text active:scale-95"
            onClick={handleClose}
            aria-label="close"
          >
            ×
          </button>
        </header>
        <div className="max-h-[calc(90vh-48px)] overflow-auto p-4">{children}</div>
      </section>
    </div>
  );
};
