'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function SkillsBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    technicalSkills: [],
    softSkills: []
  })
  
  // Base de données de compétences pour la simulation
  const allSkills = {
    technical: {
      frontend: [
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'TailwindCSS', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'Redux', level: 75 },
        { name: 'GraphQL (client)', level: 70 },
        { name: 'Jest/Testing Library', level: 65 },
        { name: 'Webpack', level: 60 }
      ],
      backend: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'GraphQL (server)', level: 75 },
        { name: 'REST API', level: 90 },
        { name: 'Docker', level: 65 },
        { name: 'AWS', level: 60 },
        { name: 'Authentication/JWT', level: 80 },
        { name: 'Microservices', level: 65 }
      ],
      mobile: [
        { name: 'React Native', level: 80 },
        { name: 'Expo', level: 85 },
        { name: 'iOS Development', level: 60 },
        { name: 'Android Development', level: 60 },
        { name: 'Mobile UI Design', level: 75 },
        { name: 'App Store Deployment', level: 70 },
        { name: 'Push Notifications', level: 65 },
        { name: 'Offline Storage', level: 75 },
        { name: 'Mobile Testing', level: 70 },
        { name: 'Native Modules', level: 60 }
      ],
      design: [
        { name: 'Figma', level: 85 },
        { name: 'Adobe XD', level: 75 },
        { name: 'UI Design', level: 80 },
        { name: 'UX Research', level: 70 },
        { name: 'Wireframing', level: 85 },
        { name: 'Prototyping', level: 80 },
        { name: 'Design Systems', level: 75 },
        { name: 'Responsive Design', level: 90 },
        { name: 'Accessibility', level: 75 },
        { name: 'CSS Animations', level: 80 }
      ]
    },
    soft: [
      { name: 'Communication', level: 90 },
      { name: 'Travail d\'équipe', level: 85 },
      { name: 'Gestion de projet', level: 80 },
      { name: 'Résolution de problèmes', level: 95 },
      { name: 'Adaptabilité', level: 90 },
      { name: 'Autonomie', level: 85 },
      { name: 'Créativité', level: 80 },
      { name: 'Organisation', level: 85 }
    ]
  }
  
  // Simuler des données réelles
  useEffect(() => {
    // Déterminer les compétences à afficher en fonction du profil
    let relevantTechnicalSkills = []
    
    // Compétences techniques en fonction du profil
    switch (profile.type) {
      case 'frontend':
        relevantTechnicalSkills = allSkills.technical.frontend
        break
      case 'backend':
        relevantTechnicalSkills = allSkills.technical.backend
        break
      case 'mobile':
        relevantTechnicalSkills = allSkills.technical.mobile
        break
      case 'design':
        relevantTechnicalSkills = allSkills.technical.design
        break
      case 'fullstack':
        // Pour full stack, prendre un mix de frontend et backend
        relevantTechnicalSkills = [
          ...allSkills.technical.frontend.slice(0, 5),
          ...allSkills.technical.backend.slice(0, 5)
        ]
        break
      default:
        // Par défaut, montrer un mix de toutes les compétences
        relevantTechnicalSkills = [
          ...allSkills.technical.frontend.slice(0, 3),
          ...allSkills.technical.backend.slice(0, 3),
          ...allSkills.technical.mobile.slice(0, 2),
          ...allSkills.technical.design.slice(0, 2)
        ]
    }
    
    // Si des intérêts spécifiques sont détectés, les mettre en avant
    if (profile.interests && profile.interests.length > 0) {
      // Filtre toutes les compétences pour mettre en avant celles qui correspondent aux intérêts
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Fonction pour vérifier si une compétence correspond à un intérêt
      const matchesInterest = (skill) => {
        return interestKeywords.some(keyword => 
          skill.name.toLowerCase().includes(keyword)
        )
      }
      
      // Trier les compétences pour mettre en avant celles qui correspondent aux intérêts
      relevantTechnicalSkills.sort((a, b) => {
        const aMatches = matchesInterest(a)
        const bMatches = matchesInterest(b)
        
        if (aMatches && !bMatches) return -1
        if (!aMatches && bMatches) return 1
        return 0
      })
    }
    
    setData({
      technicalSkills: relevantTechnicalSkills,
      softSkills: allSkills.soft
    })
  }, [profile.type, profile.interests])
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">Compétences</h2>
      
      {/* Compétences techniques */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-black dark:text-gray-200">Compétences techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.technicalSkills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 dark:bg-blue-600" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Compétences personnelles */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-black dark:text-gray-200">Compétences personnelles</h3>
        <div className="flex flex-wrap gap-3">
          {data.softSkills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm text-gray-700 dark:text-gray-300"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 