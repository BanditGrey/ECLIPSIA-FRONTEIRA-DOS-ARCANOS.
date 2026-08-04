/**
 * HOOK BÁSICO PARA ÁUDIO — Controle de volume, mute e reprodução
 */
import { useState, useCallback, useEffect } from 'react';

const DEFAULT_VOLUME = 0.7;

export interface AudioState {
  volume: number;
  muted: boolean;
  bgmPlaying: boolean;
}

export const useAudio = () => {
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [bgmPlaying, setBgmPlaying] = useState(false);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const setVolumeLevel = useCallback((level: number) => {
    setVolume(Math.max(0, Math.min(1, level)));
  }, []);

  const playBgm = useCallback(() => {
    setBgmPlaying(true);
  }, []);

  const stopBgm = useCallback(() => {
    setBgmPlaying(false);
  }, []);

  const playSound = useCallback((path: string, loop = false) => {
    if (muted) return;

    try {
      const audio = new Audio(path);
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(() => {
        // Silenciosamente falha se o usuário ainda não interagiu
      });

      if (!loop) {
        audio.addEventListener('ended', () => {
          // Limpeza automática
        });
      }
    } catch {
      // Falha silenciosamente se o áudio não estiver disponível
    }
  }, [muted, volume]);

  return {
    volume,
    muted,
    bgmPlaying,
    toggleMute,
    setVolumeLevel,
    playBgm,
    stopBgm,
    playSound
  };
};
