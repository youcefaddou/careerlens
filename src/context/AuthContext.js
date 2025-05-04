'use client'

import { createContext, useContext, useState, useEffect } from 'react'

// Définition du contexte
const AuthContext = createContext(undefined)

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé avec AuthProvider')
  }
  return context
}

// Provider qui enveloppe les composants avec le contexte d'authentification
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Vérifier l'authentification au chargement initial
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        // Récupérer le token du localStorage
        const token = localStorage.getItem('userToken')
        
        if (token) {
          // Ici, vous pourriez faire une requête à votre API pour valider le token
          // et récupérer les données de l'utilisateur
          // Pour l'instant, on simule un utilisateur connecté
          
          // Simulation d'une récupération d'utilisateur
          const userData = {
            id: '123',
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@example.com',
            role: 'recruiter',
            avatarInitials: 'JD'
          }
          
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Erreur d\'authentification:', err)
        setError('Erreur lors de la vérification de l\'authentification')
        setUser(null)
        // Effacer le token en cas d'erreur
        localStorage.removeItem('userToken')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setLoading(true)
      
      // Ici, vous feriez une requête à votre API d'authentification
      // Pour l'instant, on simule une connexion réussie
      
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simuler un utilisateur connecté
      const userData = {
        id: '123',
        firstName: 'Jean',
        lastName: 'Dupont',
        email: email,
        role: 'recruiter',
        avatarInitials: 'JD'
      }
      
      // Stocker le token dans le localStorage
      localStorage.setItem('userToken', 'fake-jwt-token-' + Date.now())
      
      setUser(userData)
      setError(null)
      
      return { success: true, user: userData }
    } catch (err) {
      console.error('Erreur de connexion:', err)
      setError('Identifiants invalides')
      return { success: false, error: 'Identifiants invalides' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      setLoading(true)
      
      // Ici, vous feriez une requête à votre API d'inscription
      // Pour l'instant, on simule une inscription réussie
      
      // Simuler une requête d'API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Créer un objet utilisateur à partir des données d'inscription
      const newUser = {
        id: 'new-' + Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.profileType,
        avatarInitials: `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`
      }
      
      // Stocker le token dans le localStorage
      localStorage.setItem('userToken', 'fake-jwt-token-' + Date.now())
      
      setUser(newUser)
      setError(null)
      
      return { success: true, user: newUser }
    } catch (err) {
      console.error('Erreur d\'inscription:', err)
      setError('Erreur lors de l\'inscription')
      return { success: false, error: 'Erreur lors de l\'inscription' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('userToken')
    setUser(null)
  }

  // Valeurs exposées par le contexte
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 