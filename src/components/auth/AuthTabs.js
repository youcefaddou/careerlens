'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login'
  const [activeTab, setActiveTab] = useState(defaultTab)

  // Synchroniser l'onglet actif avec les paramètres d'URL
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab')
    if (tabFromUrl === 'register' || tabFromUrl === 'login') {
      setActiveTab(tabFromUrl)
    }
  }, [searchParams])

  // Change l'onglet actif et met à jour l'URL
  const handleTabChange = (tab) => {
    // N'effectuer le changement que si l'onglet est différent
    if (tab !== activeTab) {
      setActiveTab(tab)
      
      // Met à jour l'URL pour permettre le partage direct et les deeplinks
      // Utiliser une méthode qui ne provoque pas de re-rendu
      const url = new URL(window.location.href)
      url.searchParams.set('tab', tab)
      
      // Utiliser replaceState de l'API History au lieu de router.replace
      window.history.replaceState({}, '', url.toString())
    }
  }

  return (
    <div>
      {/* Onglets */}
      <div className="flex">
        <button
          onClick={() => handleTabChange('login')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'login'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => handleTabChange('register')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'register'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Inscription
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="p-6">
        {activeTab === 'login' ? (
          <LoginForm onRegisterClick={() => handleTabChange('register')} />
        ) : (
          <RegisterForm onLoginClick={() => handleTabChange('login')} />
        )}
      </div>
    </div>
  )
} 