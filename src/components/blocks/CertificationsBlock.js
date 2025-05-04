'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function CertificationsBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    certifications: []
  })
  
  // Base de données de certifications pour la simulation
  const allCertifications = {
    frontend: [
      {
        name: 'React.js Advanced Patterns',
        issuer: 'Frontend Masters',
        date: 'Décembre 2021',
        description: 'Certification couvrant les patterns avancés de React incluant hooks personnalisés, performance et architecture.',
        link: 'https://example.com/cert/react'
      },
      {
        name: 'Next.js Developer',
        issuer: 'Vercel',
        date: 'Juillet 2022',
        description: 'Certification officielle de Vercel pour les développeurs Next.js, couvrant SSR, SSG et ISR.',
        link: 'https://example.com/cert/nextjs'
      },
      {
        name: 'Performance Web',
        issuer: 'Google',
        date: 'Mars 2022',
        description: 'Optimisation des performances web pour les applications modernes avec métriques Core Web Vitals.',
        link: 'https://example.com/cert/webperf'
      }
    ],
    backend: [
      {
        name: 'Node.js Services Developer',
        issuer: 'OpenJS Foundation',
        date: 'Février 2022',
        description: 'Certification sur le développement de services backend avec Node.js, incluant sécurité et scaling.',
        link: 'https://example.com/cert/nodejs'
      },
      {
        name: 'MongoDB Developer',
        issuer: 'MongoDB University',
        date: 'Octobre 2021',
        description: 'Certification officielle MongoDB couvrant la modélisation de données, les performances et l\'administration.',
        link: 'https://example.com/cert/mongodb'
      },
      {
        name: 'AWS Certified Developer Associate',
        issuer: 'Amazon Web Services',
        date: 'Mai 2022',
        description: 'Certification AWS pour les développeurs travaillant sur des applications cloud.',
        link: 'https://example.com/cert/aws'
      }
    ],
    fullstack: [
      {
        name: 'Full Stack JavaScript Developer',
        issuer: 'Udacity',
        date: 'Janvier 2022',
        description: 'Programme de certification complet couvrant le développement front-end et back-end en JavaScript.',
        link: 'https://example.com/cert/fullstack'
      },
      {
        name: 'MERN Stack Expert',
        issuer: 'CodeCademy',
        date: 'Novembre 2021',
        description: 'Certification sur la stack MERN (MongoDB, Express, React, Node.js) et les meilleures pratiques.',
        link: 'https://example.com/cert/mern'
      },
      {
        name: 'CI/CD & DevOps Essentials',
        issuer: 'GitHub Learning Lab',
        date: 'Avril 2022',
        description: 'Certification sur l\'intégration continue, le déploiement continu et les pratiques DevOps.',
        link: 'https://example.com/cert/devops'
      }
    ],
    mobile: [
      {
        name: 'React Native Developer',
        issuer: 'Meta',
        date: 'Mars 2022',
        description: 'Certification officielle de Meta sur le développement d\'applications mobiles avec React Native.',
        link: 'https://example.com/cert/reactnative'
      },
      {
        name: 'iOS App Development with Swift',
        issuer: 'Apple Developer Academy',
        date: 'Septembre 2021',
        description: 'Certification sur le développement d\'applications iOS avec Swift et SwiftUI.',
        link: 'https://example.com/cert/ios'
      },
      {
        name: 'Flutter Developer',
        issuer: 'Google Developers',
        date: 'Décembre 2021',
        description: 'Certification sur le développement d\'applications mobiles multiplateformes avec Flutter.',
        link: 'https://example.com/cert/flutter'
      }
    ],
    design: [
      {
        name: 'UI/UX Design Professional',
        issuer: 'Interaction Design Foundation',
        date: 'Janvier 2022',
        description: 'Certification couvrant les principes de conception UI/UX, la recherche utilisateur et les tests d\'utilisabilité.',
        link: 'https://example.com/cert/uiux'
      },
      {
        name: 'Accessibility Specialist',
        issuer: 'International Association of Accessibility Professionals',
        date: 'Novembre 2021',
        description: 'Certification sur la conception accessible et les bonnes pratiques d\'accessibilité web.',
        link: 'https://example.com/cert/a11y'
      },
      {
        name: 'Design Systems Architecture',
        issuer: 'DesignOps Global',
        date: 'Mai 2022',
        description: 'Certification sur la création et la maintenance de systèmes de design pour les équipes produit.',
        link: 'https://example.com/cert/designsystems'
      }
    ],
    common: [
      {
        name: 'Agile Certified Practitioner',
        issuer: 'Scrum Alliance',
        date: 'Février 2021',
        description: 'Certification sur les méthodologies agiles et les pratiques Scrum pour le développement de produits.',
        link: 'https://example.com/cert/agile'
      },
      {
        name: 'Clean Code & Software Craftsmanship',
        issuer: 'Software Crafters International',
        date: 'Août 2021',
        description: 'Certification sur les principes de code propre, les design patterns et les pratiques de développement.',
        link: 'https://example.com/cert/cleancode'
      }
    ]
  }
  
  // Simuler des données réelles
  useEffect(() => {
    // Déterminer les certifications à afficher en fonction du profil
    let relevantCertifications = []
    
    // Ajouter d'abord les certifications communes à tous les profils
    relevantCertifications = [...allCertifications.common]
    
    // Ajouter les certifications spécifiques au profil
    switch (profile.type) {
      case 'frontend':
        relevantCertifications = [...relevantCertifications, ...allCertifications.frontend]
        break
      case 'backend':
        relevantCertifications = [...relevantCertifications, ...allCertifications.backend]
        break
      case 'fullstack':
        relevantCertifications = [
          ...relevantCertifications, 
          ...allCertifications.fullstack,
          allCertifications.frontend[0],
          allCertifications.backend[0]
        ]
        break
      case 'mobile':
        relevantCertifications = [...relevantCertifications, ...allCertifications.mobile]
        break
      case 'design':
        relevantCertifications = [...relevantCertifications, ...allCertifications.design]
        break
      default:
        // Par défaut, montrer un mix de certifications
        relevantCertifications = [
          ...relevantCertifications,
          allCertifications.frontend[0],
          allCertifications.backend[0]
        ]
    }
    
    // Si des intérêts spécifiques sont détectés, les mettre en avant
    if (profile.interests && profile.interests.length > 0) {
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Fonction pour calculer la pertinence d'une certification
      const calculateRelevance = (cert) => {
        let score = 0
        
        interestKeywords.forEach(keyword => {
          if (cert.name.toLowerCase().includes(keyword)) score += 3
          if (cert.description.toLowerCase().includes(keyword)) score += 2
          if (cert.issuer.toLowerCase().includes(keyword)) score += 1
        })
        
        return score
      }
      
      // Trier les certifications par pertinence
      relevantCertifications.sort((a, b) => {
        const scoreA = calculateRelevance(a)
        const scoreB = calculateRelevance(b)
        return scoreB - scoreA
      })
    }
    
    // Trier par date (plus récent d'abord)
    relevantCertifications.sort((a, b) => {
      // Simplifier pour la démo - dans une implémentation réelle, analyser correctement les dates
      const monthsOrder = {
        'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
        'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12
      }
      
      // Extraction de la date (format "Mois YYYY")
      const [monthA, yearA] = a.date.toLowerCase().split(' ')
      const [monthB, yearB] = b.date.toLowerCase().split(' ')
      
      // Comparer d'abord par année
      if (yearA !== yearB) {
        return parseInt(yearB) - parseInt(yearA)
      }
      
      // Si même année, comparer par mois
      return monthsOrder[monthB] - monthsOrder[monthA]
    })
    
    // Limiter le nombre de certifications
    setData({
      certifications: relevantCertifications.slice(0, 4)
    })
  }, [profile.type, profile.interests])
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.certifications.map((cert, index) => (
          <div 
            key={index} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-black dark:text-white">
                  {cert.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {cert.issuer}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {cert.date}
              </span>
            </div>
            
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {cert.description}
            </p>
            
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Voir le certificat
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
} 