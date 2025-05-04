'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { defaultBlockOrder } from '@/lib/blockTypes'

// Création du contexte
const ProfileContext = createContext()

/**
 * Provider du contexte de profil visiteur
 */
export function ProfileProvider({ children }) {
  // État du profil détecté
  const [visitorProfile, setVisitorProfile] = useState({
    type: 'default',          // Type de profil (frontend, backend, etc.)
    referrer: null,           // D'où vient le visiteur
    interests: [],            // Centres d'intérêt détectés
    jobParameters: null,      // Paramètres d'URL liés au job
    timeSpent: 0,             // Temps passé sur le site
    detectionMethod: null,    // Comment le profil a été détecté
    blockOrder: defaultBlockOrder.default, // Ordre des blocs pour ce profil
    lastUpdated: null,        // Dernière mise à jour du profil
  })

  // Mise à jour du profil
  const updateProfile = (newProfileData) => {
    setVisitorProfile(prev => {
      // Détermine l'ordre des blocs en fonction du type de profil
      const blockOrder = newProfileData.type 
        ? defaultBlockOrder[newProfileData.type] || defaultBlockOrder.default
        : prev.blockOrder

      return {
        ...prev,
        ...newProfileData,
        blockOrder,
        lastUpdated: new Date().toISOString()
      }
    })
  }

  // Mise à jour du temps passé
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorProfile(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Valeur du contexte
  const value = {
    profile: visitorProfile,
    updateProfile
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

/**
 * Hook personnalisé pour utiliser le contexte de profil
 */
export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile doit être utilisé avec ProfileProvider')
  }
  return context
} 