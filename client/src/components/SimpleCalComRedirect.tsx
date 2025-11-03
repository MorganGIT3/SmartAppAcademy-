import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Phone, AlertCircle } from "lucide-react"
import { getCurrentUser, getUserCallLimits, type UserCallLimits } from "@/lib/supabase"

export function SimpleCalComRedirect() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const [callLimits, setCallLimits] = useState<UserCallLimits | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  // Charger les données de l'utilisateur au montage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await getCurrentUser()
        if (user && user.email) {
          setUserEmail(user.email)
        }

        const limits = await getUserCallLimits()
        if (limits) {
          setCallLimits(limits)
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  const handleButtonClick = () => {
    // Vérifier s'il reste des appels
    if (callLimits && callLimits.calls_remaining <= 0) {
      alert('❌ Vous avez atteint votre limite de 2 appels pour cette semaine. Vos appels se rechargeront lundi prochain.')
      return
    }
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    setIsRedirecting(true)
    // Rediriger vers cal.com avec l'email pré-rempli
    const calComUrl = `https://cal.com/smartappacademy/1h-d-accompagnement?email=${encodeURIComponent(userEmail)}`
    window.location.href = calComUrl
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Message appels restants en haut à droite */}
      <div className="absolute top-6 right-6 z-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800 to-black text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {isLoading ? (
            <span className="font-semibold">⏳ Chargement...</span>
          ) : (
            <span className="font-semibold">
              📞 Il vous reste {callLimits?.calls_remaining ?? 2} appel{(callLimits?.calls_remaining ?? 2) > 1 ? 's' : ''}
            </span>
          )}
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          {/* Icône animée moderne */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="mb-8 mx-auto w-24 h-24 backdrop-blur-2xl bg-white/[0.02] border border-white/[0.05] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Phone className="h-12 w-12 text-blue-400 relative z-10" />
          </motion.div>

          {/* Titre avec effet moderne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-2">
              Réserve tes appels de la semaine
            </h1>
            <motion.div 
              className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/60 mb-12"
          >
            Un moment privilégié pour échanger et avancer ensemble
          </motion.p>

          {/* Bouton principal moderne */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleButtonClick}
            className="relative backdrop-blur-2xl bg-blue-500/20 border border-blue-400/30 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-3 mx-auto group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Calendar className="h-6 w-6 text-blue-400 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Booker mes appels de la semaine</span>
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
                vous n'aurez plus que <span className="font-bold text-blue-600">{(callLimits?.calls_remaining ?? 2) - 1} appel{((callLimits?.calls_remaining ?? 2) - 1) > 1 ? 's' : ''}</span> disponible{((callLimits?.calls_remaining ?? 2) - 1) > 1 ? 's' : ''} pour cette semaine.
              </p>
              <p className="text-gray-600 mt-4">
                Voulez-vous vraiment continuer ?
              </p>
              <p className="text-blue-600 font-semibold mt-4">
                📅 Vous pourrez booker 2 nouveaux appels à partir de lundi prochain
              </p>
            </div>

            {/* Message important en rouge avec email */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 font-bold text-center mb-3">
                ⚠️ TRÈS IMPORTANT : Réservez votre appel avec le même email que votre compte ZeroToApp
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-3 mt-3">
                <p className="text-gray-600 text-sm mb-1 text-center">Votre email de connexion :</p>
                <p className="text-red-600 font-bold text-lg text-center break-all">
                  {userEmail || 'Chargement...'}
                </p>
              </div>
              <p className="text-red-600 text-sm mt-3 text-center">
                ⚠️ Si vous utilisez un autre email, l'appel ne sera PAS pris en compte !
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
