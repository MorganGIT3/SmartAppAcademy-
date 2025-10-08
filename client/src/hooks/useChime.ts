import { useCallback } from "react";

export function useChime(volume: number = 0.3) {
  const play = useCallback(() => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Créer un filtre passe-haut pour éviter les pops
      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(200, now);

      const master = ctx.createGain();
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.01);
      master.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      
      master.connect(highpass);
      highpass.connect(ctx.destination);

      const playTone = (freq: number, start: number, duration: number, detune = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + start);
        osc.detune.setValueAtTime(detune, now + start);

        // Envelope douce pour éviter les pops
        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(0.8, now + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

        osc.connect(gain);
        gain.connect(master);

        osc.start(now + start);
        osc.stop(now + start + duration);
      };

      // Mélodie douce et agréable
      playTone(523.25, 0.0, 0.8, 0);    // C5
      playTone(659.25, 0.1, 0.7, 0);    // E5
      playTone(783.99, 0.2, 0.6, 0);    // G5
      playTone(1046.50, 0.3, 0.5, 0);   // C6

      // Fermer le contexte après la fin
      setTimeout(() => {
        try { 
          ctx.close(); 
        } catch (e) {
          // Ignorer les erreurs de fermeture
        }
      }, 2000);

    } catch (error) {
      console.log("Audio not available:", error);
    }
  }, [volume]);

  return play;
}
