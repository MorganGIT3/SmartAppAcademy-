import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Phone, AlertCircle } from "lucide-react"

export function SimpleCalComRedirect() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)


  const handleButtonClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    setIsRedirecting(true)
    // Rediriger vers cal.com
    window.location.href = 'https://cal.com/smartappacademy/1h-d-accompagnement'
  }

  const handleCancel = () => {
    setShowConfirmation(false)
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

      {/* Popup de confirmation personnalisée */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={handleCancel}
          />
          
          {/* Contenu de la popup */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6"
          >
            {/* Icône d'alerte */}
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>

            {/* Message */}
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
              Confirmation importante
            </h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Si vous appuyez sur <span className="font-bold text-blue-600">continuer</span>, 
                vous n'aurez plus d'appel disponible pour cette semaine.
              </p>
              <p className="text-gray-600 mt-4">
                Voulez-vous vraiment continuer ?
              </p>
              <p className="text-blue-600 font-semibold mt-4">
                📅 Vous pourrez booker un nouvel appel à partir de lundi prochain
              </p>
            </div>

            {/* Message important en rouge */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 font-bold text-center">
                ⚠️ TRÈS IMPORTANT : Réserver votre appel avec le même email que vous avez utilisé pour votre connexion sur votre app SmartApp Academy™
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
              >
                Annuler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirm}
                disabled={isRedirecting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/50 transition-all flex items-center gap-2"
              >
                {isRedirecting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Redirection...
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    Continuer
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}
