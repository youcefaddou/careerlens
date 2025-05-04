'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { projects } from '@/lib/projects'

export default function ProjectShowcase() {
  const [relevantProjects, setRelevantProjects] = useState([])
  const [timeSpent, setTimeSpent] = useState(0)
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Timer pour suivre le temps passé sur la page
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)
    
    // Nettoie le timer
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    // Obtient le paramètre job de l'URL (ex: ?job=frontend)
    const jobType = searchParams.get('job')
    
    // Filtrer les projets en fonction des paramètres d'URL
    let filteredProjects = [...projects]
    
    if (jobType) {
      filteredProjects = projects.filter(project => 
        project.tags.includes(jobType.toLowerCase())
      )
    }
    
    // Si l'utilisateur est resté plus de 10 secondes, montrer aussi les projets complexes
    if (timeSpent > 10) {
      const complexProjects = projects.filter(project => project.complexity === 'complex')
      // Assure-toi qu'il n'y a pas de doublons
      filteredProjects = [...new Set([...filteredProjects, ...complexProjects])]
    }
    
    setRelevantProjects(filteredProjects)
  }, [searchParams, timeSpent])
  
  // Map des couleurs pour les tags
  const tagColors = {
    frontend: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300' },
    react: { bg: 'bg-cyan-100 dark:bg-cyan-900', text: 'text-cyan-700 dark:text-cyan-300' },
    javascript: { bg: 'bg-yellow-100 dark:bg-yellow-900', text: 'text-yellow-700 dark:text-yellow-300' },
    nextjs: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' },
    tailwind: { bg: 'bg-teal-100 dark:bg-teal-900', text: 'text-teal-700 dark:text-teal-300' },
    backend: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300' },
    nodejs: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300' },
    express: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' },
    mobile: { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-300' },
    'react-native': { bg: 'bg-indigo-100 dark:bg-indigo-900', text: 'text-indigo-700 dark:text-indigo-300' },
  }
  
  // Fonction pour obtenir les couleurs d'un tag
  const getTagColors = (tag) => {
    return tagColors[tag] || { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' }
  }
  
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Projets Pertinents</h2>
      {relevantProjects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Chargement des projets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantProjects.map(project => (
            <div key={project.id} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map(tag => {
                  const { bg, text } = getTagColors(tag)
                  return (
                    <span key={tag} className={`${bg} ${text} px-2 py-1 rounded-full text-sm`}>
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
} 