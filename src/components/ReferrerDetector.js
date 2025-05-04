'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useProfile } from '@/context/ProfileContext'

export default function ReferrerDetector() {
  const [referrer, setReferrer] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateProfile } = useProfile()
  
  // Détecter le type de profil à partir des paramètres d'URL
  const detectProfileFromParams = () => {
    const jobType = searchParams.get('job')
    
    if (!jobType) return null
    
    // Mapper le paramètre job vers un type de profil
    const profileMapping = {
      'frontend': 'frontend',
      'backend': 'backend',
      'fullstack': 'fullstack',
      'mobile': 'mobile',
      'design': 'design',
      'general': 'default'
    }
    
    return profileMapping[jobType] || 'default'
  }
  
  // Détecter les intérêts du visiteur
  const detectInterests = () => {
    const interests = []
    
    // Vérifier les paramètres d'URL pour les intérêts
    const skills = searchParams.get('skills')
    if (skills) {
      interests.push(...skills.split(','))
    }
    
    return interests
  }
  
  // Détecter le type de profil à partir du référent
  const detectProfileFromReferrer = (referrerUrl) => {
    if (!referrerUrl) return null
    
    // Définir des règles de détection basées sur le référent
    if (referrerUrl.includes('linkedin.com')) {
      return 'professional'
    } else if (referrerUrl.includes('github.com')) {
      return 'developer'
    } else if (referrerUrl.includes('behance.net') || referrerUrl.includes('dribbble.com')) {
      return 'design'
    } else if (referrerUrl.includes('indeed.com') || referrerUrl.includes('monster.com')) {
      return 'jobseeker'
    }
    
    return null
  }
  
  useEffect(() => {
    // Détecte d'où vient le visiteur
    const referrerUrl = document.referrer
    setReferrer(referrerUrl)
    
    // Paramètres d'URL pour le job
    const jobParams = {}
    searchParams.forEach((value, key) => {
      jobParams[key] = value
    })
    
    // Détecter le type de profil
    const profileType = detectProfileFromParams() || detectProfileFromReferrer(referrerUrl) || 'default'
    
    // Détecter les intérêts
    const interests = detectInterests()
    
    // Déterminer la méthode de détection
    let detectionMethod = 'default'
    if (searchParams.get('job')) {
      detectionMethod = 'url_params'
    } else if (referrerUrl) {
      detectionMethod = 'referrer'
    }
    
    // Enregistre l'information de référent dans localStorage
    if (referrerUrl) {
      localStorage.setItem('referrer', referrerUrl)
    }
    
    // Mettre à jour le profil dans le contexte
    updateProfile({
      type: profileType,
      referrer: referrerUrl,
      interests,
      jobParameters: jobParams,
      detectionMethod
    })
    
    // Si le visiteur vient de LinkedIn et n'a pas de paramètre job
    if (referrerUrl && referrerUrl.includes('linkedin.com') && !searchParams.get('job')) {
      // Rediriger vers une URL avec le paramètre ?job=general
      router.push('/?job=general')
    }
    
    // Analyser l'historique de navigation si disponible
    if (window.performance && window.performance.navigation) {
      const navigationHistory = {
        type: window.performance.navigation.type,
        redirectCount: window.performance.navigation.redirectCount
      }
      
      console.log('Navigation history:', navigationHistory)
    }
  }, [router, searchParams, updateProfile])
  
  return null // Ce composant n'affiche rien, il effectue juste la logique
} 