import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-night-950 p-6 text-center font-mono text-game-text">
          <h1 className="mb-4 text-4xl font-bold text-red-500">Ocorreu um erro crítico</h1>
          <p className="mb-6 text-lg text-game-muted">A interface do jogo travou. Detalhes do erro:</p>
          <div className="max-w-2xl overflow-auto rounded-lg border border-red-900/50 bg-black/50 p-4 text-left text-sm text-red-300 shadow-2xl">
            {this.state.error?.message}
          </div>
          <button
            className="mt-8 rounded bg-gold-600 px-6 py-2 text-white hover:bg-gold-500"
            onClick={() => window.location.reload()}
          >
            Recarregar Jogo
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
