'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function EducationBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    education: []
  })
  
  // Base de données éducation pour la simulation
  const allEducation = [
    {
      degree: 'Master en Informatique',
      specialization: 'Développement Web et Mobile',
      institution: 'Université Paris-Saclay',
      location: 'Paris, France',
      period: '2016 - 2018',
      description: 'Formation axée sur le développement d\'applications web et mobiles, avec un accent sur les technologies modernes et l\'expérience utilisateur.',
      relevantFor: ['frontend', 'backend', 'fullstack', 'mobile', 'default']
    },
    {
      degree: 'Licence en Informatique',
      specialization: 'Développement Logiciel',
      institution: 'Université Claude Bernard Lyon 1',
      location: 'Lyon, France',
      period: '2013 - 2016',
      description: 'Formation généraliste en informatique couvrant les fondamentaux de la programmation, des algorithmes, et des bases de données.',
      relevantFor: ['frontend', 'backend', 'fullstack', 'mobile', 'design', 'default']
    },
    {
      degree: 'Certification en UX/UI Design',
      specialization: 'Design d\'interfaces utilisateur',
      institution: 'OpenClassrooms',
      location: 'Formation en ligne',
      period: '2019',
      description: 'Formation sur les principes de conception d\'interfaces utilisateur, les tests d\'utilisabilité et la création de prototypes interactifs.',
      relevantFor: ['frontend', 'design', 'fullstack']
    },
    {
      degree: 'Certification AWS Solutions Architect',
      specialization: 'Architecture Cloud',
      institution: 'Amazon Web Services',
      location: 'Formation en ligne',
      period: '2020',
      description: 'Certification portant sur la conception d\'architectures scalables, hautement disponibles et tolérantes aux pannes sur AWS.',
      relevantFor: ['backend', 'fullstack']
    },
    {
      degree: 'Formation en Design Graphique',
      specialization: 'Design d\'interfaces numériques',
      institution: 'École de Design Nantes Atlantique',
      location: 'Nantes, France',
      period: '2015 - 2016',
      description: 'Formation complémentaire en design graphique orientée web et applications mobiles.',
      relevantFor: ['design', 'frontend']
    }
  ]
  
  // Simuler des données réelles
  useEffect(() => {
    // Filtrer les formations pertinentes pour le profil du visiteur
    let relevantEducation = allEducation.filter(edu => 
      edu.relevantFor.includes(profile.type) || edu.relevantFor.includes('default')
    )
    
    // Si aucune formation n'est pertinente, afficher toutes les formations
    if (relevantEducation.length === 0) {
      relevantEducation = allEducation
    }
    
    // Trier par période (plus récent d'abord)
    relevantEducation.sort((a, b) => {
      // Extrait l'année de fin
      const yearA = parseInt(a.period.split(' - ')[1] || a.period)
      const yearB = parseInt(b.period.split(' - ')[1] || b.period)
      return yearB - yearA
    })
    
    // Si le profil a des intérêts spécifiques, mettre en avant les formations pertinentes
    if (profile.interests && profile.interests.length > 0) {
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Fonction pour calculer la pertinence d'une formation
      const calculateRelevance = (education) => {
        let score = 0
        
        interestKeywords.forEach(keyword => {
          if (education.specialization.toLowerCase().includes(keyword)) score += 3
          if (education.description.toLowerCase().includes(keyword)) score += 2
          if (education.degree.toLowerCase().includes(keyword)) score += 1
        })
        
        return score
      }
      
      // Trier par pertinence
      relevantEducation.sort((a, b) => {
        const scoreA = calculateRelevance(a)
        const scoreB = calculateRelevance(b)
        
        // Si les scores sont égaux, trier par date
        if (scoreA === scoreB) {
          const yearA = parseInt(a.period.split(' - ')[1] || a.period)
          const yearB = parseInt(b.period.split(' - ')[1] || b.period)
          return yearB - yearA
        }
        
        return scoreB - scoreA
      })
    }
    
    setData({
      education: relevantEducation
    })
  }, [profile])
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">Formation</h2>
      
      <div className="space-y-6">
        {data.education.map((edu, index) => (
          <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 dark:border-gray-700 last:border-transparent last:pb-0">
            {/* Timeline dot */}
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-600"></div>
            
            {/* Content */}
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {edu.degree}
                {edu.specialization && (
                  <span className="text-gray-700 dark:text-gray-300 font-normal"> - {edu.specialization}</span>
                )}
              </h3>
              
              <div className="flex flex-wrap items-center mt-1 mb-2 text-sm">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {edu.institution}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {edu.location}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {edu.period}
                </span>
              </div>
              
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 