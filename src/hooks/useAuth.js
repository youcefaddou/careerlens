'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = status === 'authenticated'

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        setError(result.error)
        return { success: false, error: result.error }
      }

      // Redirection après connexion réussie
      return { success: true }
    } catch (err) {
      console.error('Erreur de connexion:', err)
      setError('Une erreur est survenue lors de la connexion')
      return { success: false, error: 'Une erreur est survenue lors de la connexion' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction d'inscription
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)

      // Appel API pour créer l'utilisateur
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Erreur lors de l\'inscription')
        return { success: false, error: data.message }
      }

      // Connexion automatique après inscription réussie
      return await login(userData.email, userData.password)
    } catch (err) {
      console.error('Erreur d\'inscription:', err)
      setError('Une erreur est survenue lors de l\'inscription')
      return { success: false, error: 'Une erreur est survenue lors de l\'inscription' }
    } finally {
      setLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = async () => {
    try {
      setLoading(true)
      await signOut({ redirect: false })
      router.push('/')
    } catch (err) {
      console.error('Erreur de déconnexion:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    user: session?.user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
  }
} 