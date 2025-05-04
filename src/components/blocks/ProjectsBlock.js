'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'
import Image from 'next/image'

export default function ProjectsBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    projects: []
  })
  
  // Base de données de projets pour la simulation
  const allProjects = {
    // Projets orientés frontend
    frontend: [
      {
        title: 'Platform UI',
        description: 'Refonte complète de l\'interface utilisateur d\'une plateforme SaaS avec React et TailwindCSS. Création d\'un design system complet et mise en place d\'une bibliothèque de composants.',
        image: '/images/projects/platform-ui.jpg',
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Storybook'],
        link: 'https://github.com/example/platform-ui',
        featured: true
      },
      {
        title: 'E-Commerce NextJS',
        description: 'Site e-commerce développé avec Next.js et Stripe. Implémentation de fonctionnalités avancées comme la recherche instantanée, le filtrage dynamique et les paiements sécurisés.',
        image: '/images/projects/ecommerce.jpg',
        technologies: ['Next.js', 'React', 'Stripe', 'MongoDB'],
        link: 'https://github.com/example/ecommerce',
        featured: false
      },
      {
        title: 'Dashboard Analytics',
        description: 'Tableau de bord d\'analyse de données avec des visualisations interactives. Utilisation de D3.js pour créer des graphiques personnalisés et adaptables.',
        image: '/images/projects/dashboard.jpg',
        technologies: ['React', 'D3.js', 'Redux', 'Styled Components'],
        link: 'https://github.com/example/dashboard',
        featured: true
      }
    ],
    
    // Projets orientés backend
    backend: [
      {
        title: 'API RESTful',
        description: 'API RESTful complète pour une application de gestion de tâches. Implémentation de l\'authentification JWT, gestion des rôles et des permissions, et documentation Swagger.',
        image: '/images/projects/api-rest.jpg',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Swagger', 'JWT'],
        link: 'https://github.com/example/task-api',
        featured: true
      },
      {
        title: 'Microservices',
        description: 'Architecture de microservices pour une application de commerce électronique. Services pour la gestion des utilisateurs, des produits, des commandes et des paiements.',
        image: '/images/projects/microservices.jpg',
        technologies: ['Node.js', 'Docker', 'Kubernetes', 'RabbitMQ'],
        link: 'https://github.com/example/microservices',
        featured: true
      },
      {
        title: 'Serverless Functions',
        description: 'Collection de fonctions serverless pour traiter des données en temps réel. Déploiement sur AWS Lambda avec intégration à API Gateway et DynamoDB.',
        image: '/images/projects/serverless.jpg',
        technologies: ['AWS Lambda', 'DynamoDB', 'API Gateway', 'Serverless Framework'],
        link: 'https://github.com/example/serverless',
        featured: false
      }
    ],
    
    // Projets orientés fullstack
    fullstack: [
      {
        title: 'Plateforme de Formation',
        description: 'Plateforme de formation en ligne avec système de gestion de contenu, authentification des utilisateurs, paiements et suivi de progression.',
        image: '/images/projects/learning-platform.jpg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
        link: 'https://github.com/example/learning-platform',
        featured: true
      },
      {
        title: 'Réseau Social',
        description: 'Application de réseau social avec fonctionnalités de publication, commentaires, notifications en temps réel et messagerie instantanée.',
        image: '/images/projects/social-network.jpg',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
        link: 'https://github.com/example/social-network',
        featured: true
      },
      {
        title: 'Système de Gestion',
        description: 'Système de gestion d\'entreprise avec modules pour la gestion des clients, des factures, des stocks et des ressources humaines.',
        image: '/images/projects/management-system.jpg',
        technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Docker'],
        link: 'https://github.com/example/management-system',
        featured: false
      }
    ],
    
    // Projets orientés mobile
    mobile: [
      {
        title: 'Application de Livraison',
        description: 'Application mobile de livraison de repas avec géolocalisation en temps réel, passerelle de paiement et notifications push.',
        image: '/images/projects/delivery-app.jpg',
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'Google Maps API'],
        link: 'https://github.com/example/delivery-app',
        featured: true
      },
      {
        title: 'Fitness Tracker',
        description: 'Application de suivi de fitness avec intégration de capteurs, suivi d\'activité et analyses personnalisées.',
        image: '/images/projects/fitness-app.jpg',
        technologies: ['React Native', 'TypeScript', 'HealthKit', 'Google Fit'],
        link: 'https://github.com/example/fitness-app',
        featured: false
      },
      {
        title: 'Application Hors-ligne',
        description: 'Application mobile fonctionnant entièrement hors-ligne avec synchronisation des données lorsque la connexion est disponible.',
        image: '/images/projects/offline-app.jpg',
        technologies: ['React Native', 'Redux', 'AsyncStorage', 'SQLite'],
        link: 'https://github.com/example/offline-app',
        featured: true
      }
    ],
    
    // Projets orientés design
    design: [
      {
        title: 'Design System',
        description: 'Système de design complet avec documentation, guides de style et bibliothèque de composants réutilisables.',
        image: '/images/projects/design-system.jpg',
        technologies: ['Figma', 'React', 'Storybook', 'Styled Components'],
        link: 'https://github.com/example/design-system',
        featured: true
      },
      {
        title: 'Refonte de Site Web',
        description: 'Refonte complète de l\'identité visuelle et de l\'expérience utilisateur d\'un site web e-commerce.',
        image: '/images/projects/website-redesign.jpg',
        technologies: ['Figma', 'HTML/CSS', 'JavaScript', 'Webflow'],
        link: 'https://github.com/example/website-redesign',
        featured: true
      },
      {
        title: 'Application Mobile UI',
        description: 'Conception d\'interface utilisateur pour une application mobile de finance personnelle avec un focus sur l\'accessibilité.',
        image: '/images/projects/mobile-ui.jpg',
        technologies: ['Adobe XD', 'Sketch', 'Principle', 'Accessibility'],
        link: 'https://github.com/example/mobile-ui',
        featured: false
      }
    ]
  }
  
  // Simuler des données réelles
  useEffect(() => {
    // Déterminer les projets à afficher en fonction du profil
    let relevantProjects = []
    
    // Projets en fonction du profil
    switch (profile.type) {
      case 'frontend':
        relevantProjects = allProjects.frontend
        break
      case 'backend':
        relevantProjects = allProjects.backend
        break
      case 'mobile':
        relevantProjects = allProjects.mobile
        break
      case 'design':
        relevantProjects = allProjects.design
        break
      case 'fullstack':
        relevantProjects = allProjects.fullstack
        break
      default:
        // Par défaut, prendre un mix de tous les types de projets
        relevantProjects = [
          allProjects.frontend[0],
          allProjects.backend[0],
          allProjects.mobile[0]
        ]
    }
    
    // Mettre les projets mis en avant en premier
    relevantProjects.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
    
    // Si des intérêts spécifiques sont détectés, les mettre en avant
    if (profile.interests && profile.interests.length > 0) {
      // Fusionner tous les projets
      const allProjectsList = [
        ...allProjects.frontend,
        ...allProjects.backend,
        ...allProjects.fullstack,
        ...allProjects.mobile,
        ...allProjects.design
      ]
      
      const interestKeywords = profile.interests.map(interest => interest.toLowerCase())
      
      // Fonction pour calculer la pertinence d'un projet
      const calculateRelevance = (project) => {
        let score = 0
        
        interestKeywords.forEach(keyword => {
          // Vérifier le titre
          if (project.title.toLowerCase().includes(keyword)) {
            score += 3
          }
          
          // Vérifier la description
          if (project.description.toLowerCase().includes(keyword)) {
            score += 2
          }
          
          // Vérifier les technologies
          project.technologies.forEach(tech => {
            if (tech.toLowerCase().includes(keyword)) {
              score += 5
            }
          })
        })
        
        return score
      }
      
      // Trouver les projets les plus pertinents parmi tous les projets
      const projectsWithScores = allProjectsList.map(project => ({
        ...project,
        relevanceScore: calculateRelevance(project)
      }))
      
      // Filtrer les projets avec un score de pertinence
      const interestingProjects = projectsWithScores
        .filter(project => project.relevanceScore > 0)
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 2) // Prendre les deux projets les plus pertinents
      
      // Si des projets pertinents ont été trouvés, les ajouter au début
      if (interestingProjects.length > 0) {
        // Filtrer les doublons
        const projectIds = new Set(interestingProjects.map(p => p.title))
        relevantProjects = [
          ...interestingProjects,
          ...relevantProjects.filter(p => !projectIds.has(p.title))
        ].slice(0, 3) // Limiter à 3 projets
      }
    }
    
    setData({
      projects: relevantProjects
    })
  }, [profile.type, profile.interests])
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-6">Projets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((project, index) => (
          <div 
            key={index} 
            className={`project-card border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${index === 0 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            {project.image && (
              <div className="relative h-48 w-full">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Contenu du projet */}
            <div className="p-4">
              {/* Titre du projet */}
              <h3 className={`text-lg font-semibold mb-2 ${
                // Appliquer le texte blanc pour les projets spécifiques
                ['E-Commerce NextJS', 'API RESTful', 'Application mobile React Native', 'Application React E-Commerce', 'Portfolio Next.js', 'API RESTful Node.js'].includes(project.title)
                  ? 'project-title-white'
                  : 'text-black dark:text-white'
              }`}>
                {project.title}
                {project.featured && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Featured
                  </span>
                )}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Lien */}
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                Voir le projet
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 