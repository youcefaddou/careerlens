'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const user = session?.user
  const router = useRouter()
  
  const pathname = usePathname()

  // Gestion du mode sombre
  useEffect(() => {
    // Vérifie les préférences de l'utilisateur
    const savedMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true')
    } else {
      setIsDarkMode(prefersDark)
    }
    
    // Applique le mode sombre au document
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  // Détection du scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fonction pour basculer le mode sombre
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('darkMode', newMode.toString())
  }

  // Fonction pour la déconnexion
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
    setIsUserMenuOpen(false)
  }

  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    return 'U';
  }

  // Liens de navigation
  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/?job=frontend', label: 'Développeurs' },
    { href: '/?job=backend', label: 'Entreprises' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              CareerLens
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  pathname === link.href 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-800 font-semibold dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Bouton Mode Sombre */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 font-semibold dark:text-gray-300"
              aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center rounded-full bg-gray-100 dark:bg-gray-800 p-1 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                  id="user-menu-button"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Ouvrir le menu utilisateur</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <span className="text-xs font-medium">{getInitials()}</span>
                  </div>
                </button>

                {/* Dropdown menu */}
                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Mon profil
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth"
                  className="text-sm font-medium text-gray-800 font-semibold dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth?tab=register"
                  className="text-sm font-medium px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Inscription
                </Link>
              </div>
            )}
          </nav>

          {/* Menu Mobile - Bouton */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Menu principal"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile - Panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth links - Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Paramètres
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link
                  href="/auth?tab=register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
            
            {/* Bouton Mode Sombre - Mobile */}
            <div className="px-3 py-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="mr-3">
                  {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                  )}
                </span>
                {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}