'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function RegisterForm({ onLoginClick }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileType: 'recruiter', // 'recruiter' ou 'candidate'
    acceptTerms: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
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
    
    // Validation du prénom
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis'
    }
    
    // Validation du nom
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis'
    }
    
    // Validation de l'email
    if (!formData.email) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    
    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères'
    }
    
    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }
    
    // Validation des conditions d'utilisation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation'
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
      setLoading(true)
      
      // Appel API pour créer l'utilisateur directement
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({
          form: data.message || 'Échec de l\'inscription. Veuillez réessayer.'
        })
        return
      }
      
      // Connexion automatique après inscription réussie
      const loginResult = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })
      
      if (loginResult.error) {
        setErrors({
          form: loginResult.error || 'Inscription réussie, mais échec de la connexion automatique.'
        })
      } else {
        // Redirection après inscription et connexion réussies
        router.push('/')
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error)
      setErrors({
        form: 'Une erreur est survenue lors de l\'inscription.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Message d'erreur global */}
      {errors.form && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg">
          {errors.form}
        </div>
      )}
      
      {/* Type de profil */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Je suis un...
        </label>
        <div className="flex space-x-4">
          <label className={`flex-1 flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
            formData.profileType === 'recruiter' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}>
            <input
              type="radio"
              name="profileType"
              value="recruiter"
              className="sr-only"
              checked={formData.profileType === 'recruiter'}
              onChange={handleChange}
            />
            <span className="ml-2 text-sm text-white">Entreprise</span>
          </label>
          <label className={`flex-1 flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
            formData.profileType === 'candidate' 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' 
              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}>
            <input
              type="radio"
              name="profileType"
              value="candidate"
              className="sr-only"
              checked={formData.profileType === 'candidate'}
              onChange={handleChange}
            />
            <span className="ml-2 text-sm text-white">Développeur</span>
          </label>
        </div>
      </div>
      
      {/* Nom et prénom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Prénom
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={`w-full px-3 py-2 border ${
              errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
          )}
        </div>
        
        {/* Nom */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nom
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={`w-full px-3 py-2 border ${
              errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>
      
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
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
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Le mot de passe doit contenir au moins 8 caractères
        </p>
      </div>
      
      {/* Confirmation du mot de passe */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirmer le mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          className={`w-full px-3 py-2 border ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white`}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
        )}
      </div>
      
      {/* Acceptation des conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.acceptTerms}
            onChange={handleChange}
          />
        </div>
        <div className="ml-2 text-sm">
          <label htmlFor="acceptTerms" className="text-gray-700 dark:text-gray-300">
            J'accepte les <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">conditions d'utilisation</a> et la <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">politique de confidentialité</a>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.acceptTerms}</p>
          )}
        </div>
      </div>
      
      {/* Bouton d'inscription */}
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
              Inscription en cours...
            </span>
          ) : (
            'Créer un compte'
          )}
        </button>
      </div>
      
      {/* Lien pour se connecter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Déjà un compte ?{' '}
        </span>
        <button
          type="button"
          onClick={onLoginClick}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Se connecter
        </button>
      </div>
    </form>
  )
} 