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
      className="anim-fade fixed inset-0 z-[900] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={handleClose}
      role="presentation"
    >
      <section
        className="panel-arcane anim-up max-h-[90vh] w-full max-w-lg overflow-hidden rounded-xl shadow-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
      >
        <header className="flex h-12 items-center justify-between border-b border-game-border bg-night-900/80 px-4">
          <h2 id={`${id}-title`} className="title-gold font-title text-lg font-bold">
            {title}
          </h2>
          <button
            type="button"
            className="icon-tile flex h-8 w-8 items-center justify-center rounded-lg text-game-muted transition-colors hover:text-game-gold active:scale-95"
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
