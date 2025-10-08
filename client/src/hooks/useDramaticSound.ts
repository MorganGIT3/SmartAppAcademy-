import { useCallback } from 'react';

export const useDramaticSound = () => {
  const playDramaticSound = useCallback(() => {
    // Créer un contexte audio
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Créer un oscillateur pour le son principal
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connecter les nœuds
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configuration du son - comme une ouverture de série Netflix
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // Note A3
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.3); // Monte vers A4
    
    // Envelope pour l'amplitude - crescendo puis decrescendo
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
    
    // Ajouter une réverbération simple
    const convolver = audioContext.createConvolver();
    const reverbBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 2, audioContext.sampleRate);
    
    // Créer une impulsion pour la réverbération
    for (let channel = 0; channel < 2; channel++) {
      const channelData = reverbBuffer.getChannelData(channel);
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / channelData.length, 2);
      }
    }
    
    convolver.buffer = reverbBuffer;
    
    // Connecter avec réverbération
    oscillator.disconnect();
    oscillator.connect(convolver);
    convolver.connect(gainNode);
    
    // Démarrer le son
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.0);
    
    // Nettoyer après la fin
    setTimeout(() => {
      audioContext.close();
    }, 2000);
  }, []);

  return { playDramaticSound };
};



