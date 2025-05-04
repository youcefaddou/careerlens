'use client'

// Fonction simple pour suivre les visites
export const trackVisit = async ({ referrer, jobType }) => {
  // Enregistrement local pour le moment
  const visits = JSON.parse(localStorage.getItem('visits') || '[]')
  
  const newVisit = {
    timestamp: new Date().toISOString(),
    referrer,
    jobType,
    userAgent: navigator.userAgent
  }
  
  visits.push(newVisit)
  localStorage.setItem('visits', JSON.stringify(visits))
  
  // En production, on pourrait envoyer à un service d'analytics
  // ou à un webhook, comme montré ci-dessous (commenté pour le moment)
  
  /*
  try {
    await fetch('/api/track-visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVisit)
    })
  } catch (error) {
    console.error('Failed to track visit:', error)
  }
  */

  console.log('Visite enregistrée:', newVisit)
} 