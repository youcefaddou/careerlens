'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '@/context/ProfileContext'
import { getRelevantBlocks } from '@/lib/blockTypes'
import dynamic from 'next/dynamic'

// Import dynamique des composants de blocs
const BlockComponents = {
  header: dynamic(() => import('./blocks/HeaderBlock')),
  experience: dynamic(() => import('./blocks/ExperienceBlock')),
  skills: dynamic(() => import('./blocks/SkillsBlock')),
  education: dynamic(() => import('./blocks/EducationBlock')),
  projects: dynamic(() => import('./blocks/ProjectsBlock')),
  languages: dynamic(() => import('./blocks/LanguagesBlock')),
  certifications: dynamic(() => import('./blocks/CertificationsBlock')),
  interactiveDemo: dynamic(() => import('./blocks/InteractiveDemoBlock')),
  socialLinks: dynamic(() => import('./blocks/SocialLinksBlock'))
}

export default function DynamicCVBuilder() {
  const { profile } = useProfile()
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Récupérer les blocs pertinents en fonction du profil
    const relevantBlocks = getRelevantBlocks(profile.type)
    
    // Ordonner les blocs selon l'ordre prédéfini pour ce type de profil
    const orderedBlocks = profile.blockOrder
      .map(blockId => relevantBlocks.find(block => block.id === blockId))
      .filter(Boolean) // Filtrer les undefined
    
    setBlocks(orderedBlocks)
    setLoading(false)
  }, [profile.type, profile.blockOrder])
  
  // Afficher un état de chargement
  if (loading) {
    return (
      <div className="w-full py-10 text-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full space-y-8 py-4">
      {/* Afficher un message indiquant comment le CV a été personnalisé */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300">
        <p>
          {profile.detectionMethod === 'url_params' && (
            <>CV personnalisé en fonction de vos paramètres d'URL</>
          )}
          {profile.detectionMethod === 'referrer' && (
            <>CV personnalisé en fonction de votre site d'origine</>
          )}
          {profile.detectionMethod === 'default' && (
            <>CV personnalisé pour vous</>
          )}
        </p>
      </div>
      
      {/* Afficher les blocs dans l'ordre personnalisé */}
      {blocks.map(block => {
        const BlockComponent = BlockComponents[block.id]
        
        // Si le composant n'est pas encore chargé
        if (!BlockComponent) {
          return (
            <div key={block.id} className="animate-pulse h-24 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          )
        }
        
        return <BlockComponent key={block.id} blockData={block} />
      })}
    </div>
  )
} 