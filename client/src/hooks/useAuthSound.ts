import { useCallback } from 'react';

export const useAuthSound = () => {
  const playAuthSound = useCallback(() => {
    // Créer un contexte audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Créer un oscillateur pour le son principal
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connecter les nœuds
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configuration du son - version modifiée du son dramatique
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(330, audioContext.currentTime); // Note E4
    oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.4); // Monte vers E5
    
    // Envelope pour l'amplitude - crescendo puis decrescendo
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
    
    // Ajouter une réverbération simple
    const convolver = audioContext.createConvolver();
    const reverbBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 1.5, audioContext.sampleRate);
    
    // Créer une impulsion pour la réverbération
    for (let channel = 0; channel < 2; channel++) {
      const channelData = reverbBuffer.getChannelData(channel);
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / channelData.length, 1.5);
      }
    }
    
    convolver.buffer = reverbBuffer;
    
    // Connecter avec réverbération
    oscillator.disconnect();
    oscillator.connect(convolver);
    convolver.connect(gainNode);
    
    // Démarrer le son
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.2);
    
    // Nettoyer après la fin
    setTimeout(() => {
      audioContext.close();
    }, 2000);
  }, []);

  return { playAuthSound };
};
