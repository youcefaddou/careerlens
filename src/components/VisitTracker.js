'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackVisit } from '@/lib/analytics'

export default function VisitTracker() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Obtiens des informations sur la visite
    const referrer = localStorage.getItem('referrer') || document.referrer
    const jobType = searchParams.get('job') || 'unknown'
    
    // Enregistre la visite
    trackVisit({ referrer, jobType })
  }, [searchParams])
  
  return null // Composant invisible
} 