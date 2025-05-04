'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useProfile } from '@/context/ProfileContext'

export default function HeaderBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState(blockData.defaultData)
  
  // Simuler des données réelles
  useEffect(() => {
    // Dans une implémentation réelle, ces données viendraient d'une API ou d'une base de données
    const mockData = {
      fullName: 'Jean Dupont',
      title: getPersonalizedTitle(profile.type),
      photo: '/images/profile-placeholder.jpg',
      location: 'Paris, France',
      email: 'contact@jeandupont.fr',
      phone: '+33 6 12 34 56 78'
    }
    
    setData(mockData)
  }, [profile.type])
  
  // Personnaliser le titre en fonction du profil du visiteur
  function getPersonalizedTitle(profileType) {
    switch(profileType) {
      case 'frontend':
        return 'Développeur Frontend React/Next.js';
      case 'backend':
        return 'Développeur Backend Node.js/Express';
      case 'fullstack':
        return 'Développeur Full Stack JavaScript';
      case 'mobile':
        return 'Développeur Mobile React Native';
      case 'design':
        return 'Designer UI/UX & Développeur Frontend';
      case 'developer':
        return 'Développeur Web Passionné';
      case 'professional':
        return 'Ingénieur Logiciel Expérimenté';
      default:
        return 'Développeur Web Full Stack';
    }
  }
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Photo de profil */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-blue-500 dark:border-blue-400">
            {data.photo ? (
              <Image 
                src={data.photo} 
                alt={data.fullName} 
                width={128} 
                height={128} 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">{data.fullName.charAt(0)}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Informations */}
        <div className="flex-grow space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.fullName}</h1>
          <h2 className="text-xl text-blue-600 dark:text-blue-400">{data.title}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mt-3">
            {/* Location */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{data.location}</span>
            </div>
            
            {/* Email */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{data.email}</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Badge indiquant la personnalisation */}
      {profile.detectionMethod !== 'default' && (
        <div className="absolute top-3 right-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs py-1 px-2 rounded-full">
          Personnalisé
        </div>
      )}
    </section>
  )
} 