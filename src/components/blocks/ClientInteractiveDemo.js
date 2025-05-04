'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Constantes de démos déplacées dans un fichier séparé pour SEO
import { demoExamples } from '@/lib/demoExamples'

export default function ClientInteractiveDemo({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    language: 'javascript',
    code: '// Chargement en cours...',
    title: 'Code interactif',
    description: ''
  })
  const [theme, setTheme] = useState('light')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')
  
  // Détecter si dark mode est activé
  useEffect(() => {
    // Vérifier le thème actuel via un attribut sur <html>
    const isDarkMode = document.documentElement.classList.contains('dark')
    setTheme(isDarkMode ? 'dark' : 'light')

    // Observer les changements de thème
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])
  
  // Simuler des données réelles
  useEffect(() => {
    // Déterminer la démo à afficher en fonction du profil
    let demo
    
    switch (profile.type) {
      case 'frontend':
        demo = demoExamples.frontend
        break
      case 'backend':
        demo = demoExamples.backend
        break
      case 'mobile':
        demo = demoExamples.mobile
        break
      case 'design':
        demo = demoExamples.design
        break
      case 'fullstack':
        demo = demoExamples.fullstack
        break
      default:
        // Par défaut, montrer la démo frontend
        demo = demoExamples.frontend
    }
    
    // Si des intérêts spécifiques sont détectés
    if (profile.interests && profile.interests.length > 0) {
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Vérifier si un intérêt correspond à une démo spécifique
      const interestToDemo = {
        'react': demoExamples.frontend,
        'express': demoExamples.backend,
        'api': demoExamples.backend,
        'serverless': demoExamples.fullstack,
        'aws': demoExamples.fullstack,
        'react native': demoExamples.mobile,
        'mobile': demoExamples.mobile,
        'animation': demoExamples.design,
        'gsap': demoExamples.design
      }
      
      // Chercher une démo correspondant aux intérêts
      for (const interest of interestKeywords) {
        for (const keyword in interestToDemo) {
          if (interest.includes(keyword) || keyword.includes(interest)) {
            demo = interestToDemo[keyword]
            break
          }
        }
      }
    }
    
    setData(demo)
  }, [profile.type, profile.interests])
  
  // Simuler l'exécution du code
  const handleRunCode = () => {
    setIsRunning(true)
    setOutput('')
    
    // Simuler un délai de traitement
    setTimeout(() => {
      let result = ''
      
      switch (profile.type) {
        case 'frontend':
          result = 'Animation initialisée avec succès ✅\nLes composants utilisent maintenant des transitions fluides.'
          break
        case 'backend':
          result = 'Serveur démarré sur le port 3000 ✅\nAPI REST disponible aux endpoints :\n- POST /api/login\n- GET /api/profile\n- GET /api/admin'
          break
        case 'fullstack':
          result = 'Fonctions déployées avec succès ✅\nEndpoints API Gateway disponibles:\n- POST /tasks\n- GET /tasks/{userId}\n- PATCH /tasks/{taskId}/status'
          break
        case 'mobile':
          result = 'Application lancée sur le simulateur ✅\nArticles chargés et affichés dans la liste.'
          break
        case 'design':
          result = 'Animations initialisées ✅\nGSAP Timeline activée avec succès.\nInteractions ScrollTrigger configurées.'
          break
        default:
          result = 'Code exécuté avec succès ✅'
      }
      
      setOutput(result)
      setIsRunning(false)
    }, 1500)
  }
  
  return (
    <>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{data.title}</p>
      
      {data.description && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-800 dark:text-blue-300">
          {data.description}
        </div>
      )}
      
      <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-auto max-h-[400px]">
          <SyntaxHighlighter
            language={data.language}
            style={theme === 'dark' ? vscDarkPlus : prism}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: '1rem',
              fontSize: '0.9rem',
              backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f5f5'
            }}
          >
            {data.code}
          </SyntaxHighlighter>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {data.language === 'javascript' ? 'JavaScript' : data.language}
          </div>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-md text-sm font-medium ${
              isRunning
                ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRunning ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exécution...
              </span>
            ) : (
              'Exécuter'
            )}
          </button>
        </div>
      </div>
      
      {/* Console de sortie */}
      {output && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Résultat
          </h3>
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm whitespace-pre-line">
            {output}
          </div>
        </div>
      )}
    </>
  )
} 