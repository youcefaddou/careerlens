'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginForm({ onRegisterClick }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Effacer l'erreur lorsque l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      // Utiliser la fonction login du contexte d'authentification
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Rediriger après connexion réussie
        router.push('/')
      } else {
        setErrors({
          form: result.error || 'Échec de la connexion. Veuillez vérifier vos identifiants.'
        })
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      setErrors({
        form: 'Une erreur est survenue lors de la connexion.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Message d'erreur global */}
      {errors.form && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg">
          {errors.form}
        </div>
      )}
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={`w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mot de passe
          </label>
          <Link 
            href="/auth/reset-password" 
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={`w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
        )}
      </div>

      {/* Se souvenir de moi */}
      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Se souvenir de moi
        </label>
      </div>

      {/* Bouton de connexion */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading
              ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion en cours...
            </span>
          ) : (
            'Se connecter'
          )}
        </button>
      </div>

      {/* Options de connexion alternatives */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Ou continuer avec
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" />
            </svg>
            GitHub
          </button>
        </div>
      </div>

      {/* Lien pour s'inscrire */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Vous n'avez pas de compte ?{' '}
        </span>
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Créer un compte
        </button>
      </div>
    </form>
  )
} 