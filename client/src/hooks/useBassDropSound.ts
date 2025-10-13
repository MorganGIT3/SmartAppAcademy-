import { useCallback } from 'react';

export function useBassDropSound() {
  const playBassDropSound = useCallback(() => {
    try {
      const audio = new Audio('/ES_Bass Drop, Deep Sub, 60Hz - Epidemic Sound.mp3');
      audio.volume = 0.7; // Volume modéré
      audio.play().catch(error => {
        console.warn('Erreur lors de la lecture du son bass drop:', error);
      });
    } catch (error) {
      console.warn('Erreur lors de la création du son bass drop:', error);
    }
  }, []);

  return { playBassDropSound };
}
