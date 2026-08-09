/**
 * Telemetria local, sem PII e sem rede.
 * Mantém uma janela pequena no navegador para decisões de balanceamento e pode
 * ser enviada a um backend analítico no futuro sem alterar os sistemas de jogo.
 */
export type TelemetryEvent = {
  type: 'combat_victory' | 'exploration' | 'craft' | 'upgrade';
  at: string;
  payload: Record<string, string | number | boolean>;
};

const STORAGE_KEY = 'eclipsia_telemetry_v1';
const MAX_EVENTS = 500;

export const recordTelemetry = (type: TelemetryEvent['type'], payload: TelemetryEvent['payload']) => {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const previous = raw ? JSON.parse(raw) : [];
    const events: TelemetryEvent[] = Array.isArray(previous) ? previous : [];
    events.push({ type, at: new Date().toISOString(), payload });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    // Telemetria nunca pode interferir no loop do jogo.
  }
};

export const readTelemetry = (): TelemetryEvent[] => {
  if (typeof window === 'undefined') return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};
