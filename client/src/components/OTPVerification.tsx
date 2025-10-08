"use client"
import type React from "react"
import { useState } from "react"
import { verifyAdminCode } from "@/lib/supabase"

interface OTPVerificationProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export function OTPVerification({ onSuccess, onClose }: OTPVerificationProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    setError("") // Clear error when user types
  }

  const handleVerify = async () => {
    if (code.length === 0) {
      setError("Veuillez entrer un code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await verifyAdminCode(code)
      
      if (result.valid && result.adminInfo) {
        console.log(`Code admin vérifié avec succès! Accès: ${result.adminInfo.name} (${result.adminInfo.level})`)
        onSuccess?.()
      } else {
        setError("Code invalide. Veuillez réessayer.")
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error)
      setError("Erreur lors de la vérification. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerify()
    }
  }

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-3xl" style={{ border: 'none', outline: 'none' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.giphy.com/media/xJT7pzbviKNqTqF1Ps/giphy.gif"
          alt="Tunnel animation"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/80 via-blue-800/90 to-black/95" />
      </div>

      <div className="relative z-10 p-8 py-14">
        <div className="text-center mb-8">
          <div className="w-8 h-8 mx-auto mb-6 text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M13 0L4 14h6l-2 10 9-14h-6l2-10z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-3">Enter verification code</h1>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            onKeyPress={handleKeyPress}
            placeholder="Entrez votre code admin..."
            className="w-full px-4 py-3 text-center text-lg font-medium bg-white/10 text-white placeholder-white/40 focus:bg-white/20 focus:outline-none transition-all duration-200 rounded-2xl"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        <div className="text-center space-y-3">
          <button
            onClick={handleVerify}
            disabled={isLoading || code.length === 0}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-2xl transition-all duration-200"
          >
            {isLoading ? "Vérification..." : "Vérifier le code"}
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="w-full px-6 py-2 text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
