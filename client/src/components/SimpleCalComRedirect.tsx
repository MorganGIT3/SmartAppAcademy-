import { motion } from "framer-motion"
import { Calendar, Phone } from "lucide-react"

export function SimpleCalComRedirect() {

  // Son agréable pour la popup
  const playChimeSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Jouer une séquence de notes agréables (accord majeur)
    const playNote = (frequency: number, startTime: number, duration: number = 0.3) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration)
      
      oscillator.start(audioContext.currentTime + startTime)
      oscillator.stop(audioContext.currentTime + startTime + duration)
    }
    
    // Jouer un joli accord (Do majeur)
    const baseTime = 0
    playNote(523.25, baseTime, 0.4)      // Do
    playNote(659.25, baseTime + 0.1, 0.4) // Mi
    playNote(783.99, baseTime + 0.2, 0.5) // Sol
  }

  const handleButtonClick = () => {
    playChimeSound()
    // Rediriger directement vers cal.com
    window.location.href = 'https://cal.com/smartappacademy/1h-d-accompagnement'
  }

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          {/* Icône animée */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            className="mb-8 mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50"
          >
            <Phone className="h-16 w-16 text-white" />
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Réserve ton appel de la semaine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300 mb-12"
          >
            Un moment privilégié pour échanger et avancer ensemble
          </motion.p>

          {/* Bouton principal */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <Calendar className="h-8 w-8" />
            Booker mon appel de la semaine
          </motion.button>
        </motion.div>
      </div>

    </div>
  )
}
