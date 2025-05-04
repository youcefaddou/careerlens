'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function LanguagesBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    languages: []
  })
  
  // Base de données de langues pour la simulation
  const allLanguages = [
    {
      name: 'Français',
      level: 'Natif',
      proficiency: 100,
      description: 'Langue maternelle'
    },
    {
      name: 'Anglais',
      level: 'Courant',
      proficiency: 90,
      description: 'Utilisation professionnelle quotidienne, TOEIC 950/990'
    },
    {
      name: 'Espagnol',
      level: 'Intermédiaire',
      proficiency: 65,
      description: 'Conversation courante, compréhension de textes techniques'
    },
    {
      name: 'Allemand',
      level: 'Débutant',
      proficiency: 30,
      description: 'Notions de base, vocabulaire technique informatique'
    },
    {
      name: 'Japonais',
      level: 'Débutant',
      proficiency: 20,
      description: 'Apprentissage en cours, niveau conversationnel basique'
    }
  ]
  
  // Simuler des données réelles
  useEffect(() => {
    // Pour les langues, pas de personnalisation spécifique au profil
    // Mais on pourrait imaginer mettre en avant certaines langues selon le profil
    // Par exemple, pour un profil orienté international
    
    let languagesToShow = [...allLanguages]
    
    // Si le visiteur vient d'un site ou d'une recherche dans une langue spécifique
    // On pourrait détecter la langue de l'URL référente et mettre en avant cette langue
    // Ici, c'est une simulation simplifiée
    
    if (profile.referrer) {
      // Exemple : si le référent contient "es" ou "spanish", on met en avant l'espagnol
      if (profile.referrer.includes('es.') || profile.referrer.toLowerCase().includes('spanish')) {
        // Réorganiser pour mettre l'espagnol en avant
        languagesToShow.sort((a, b) => {
          if (a.name === 'Espagnol') return -1
          if (b.name === 'Espagnol') return 1
          return 0
        })
      }
      
      // Exemple : si le référent contient "en" ou "english", on met en avant l'anglais
      if (profile.referrer.includes('en.') || profile.referrer.toLowerCase().includes('english')) {
        // Réorganiser pour mettre l'anglais en avant
        languagesToShow.sort((a, b) => {
          if (a.name === 'Anglais') return -1
          if (b.name === 'Anglais') return 1
          return 0
        })
      }
    }
    
    // Si des intérêts spécifiques liés aux langues sont détectés
    if (profile.interests && profile.interests.length > 0) {
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Si l'intérêt concerne une langue spécifique
      const languageInterests = {
        'english': 'Anglais',
        'anglais': 'Anglais',
        'spanish': 'Espagnol',
        'espagnol': 'Espagnol',
        'german': 'Allemand',
        'allemand': 'Allemand',
        'japanese': 'Japonais',
        'japonais': 'Japonais'
      }
      
      // Vérifier si un intérêt correspond à une langue
      for (const interest of interestKeywords) {
        const languageName = languageInterests[interest]
        if (languageName) {
          // Réorganiser pour mettre cette langue en avant
          languagesToShow.sort((a, b) => {
            if (a.name === languageName) return -1
            if (b.name === languageName) return 1
            return 0
          })
          break // Une seule réorganisation pour éviter les conflits
        }
      }
    }
    
    // Dans tous les cas, le français reste toujours en première position pour un CV français
    // à moins d'une détection spécifique ci-dessus
    setData({
      languages: languagesToShow
    })
  }, [profile])
  
  // Fonction pour déterminer la couleur de la barre de progression
  const getProgressColor = (proficiency) => {
    if (proficiency >= 80) return 'bg-green-500 dark:bg-green-600'
    if (proficiency >= 60) return 'bg-blue-500 dark:bg-blue-600'
    if (proficiency >= 40) return 'bg-yellow-500 dark:bg-yellow-600'
    return 'bg-orange-500 dark:bg-orange-600'
  }
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">Langues</h2>
      
      <div className="space-y-4">
        {data.languages.map((language, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="w-full md:w-32 flex-shrink-0">
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                {language.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language.level}
              </p>
            </div>
            
            {/* Barre de progression */}
            <div className="flex-grow">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(language.proficiency)}`} 
                  style={{ width: `${language.proficiency}%` }}
                ></div>
              </div>
              
              {/* Description */}
              {language.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {language.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Note sur les certifications linguistiques */}
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
        Les niveaux sont basés sur le Cadre Européen Commun de Référence pour les Langues (CECRL).
      </p>
    </section>
  )
} 