'use client'

import { useState } from 'react'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    job: '',
  })
  
  const [status, setStatus] = useState({ type: '', message: '' })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation simple
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({
        type: 'error',
        message: 'Veuillez remplir tous les champs obligatoires'
      })
      return
    }
    
    // Simuler l'envoi (à remplacer par un vrai envoi d'e-mail)
    setStatus({ type: 'loading', message: 'Envoi en cours...' })
    
    try {
      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simule un succès (en production, ceci serait un appel API réel)
      console.log('Données du formulaire soumises:', formState)
      
      // Réinitialiser le formulaire
      setFormState({
        name: '',
        email: '',
        message: '',
        company: '',
        job: '',
      })
      
      setStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
      })
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.'
      })
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center pt-16 pb-10 px-4 md:px-8">
      <div className="w-full max-w-4xl py-12 md:py-24 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          Contactez-nous
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  />
                </div>
                
                <div>
                  <label htmlFor="job" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Poste
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    value={formState.job}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formState.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : 'Envoyer le message'}
                </button>
              </div>
              
              {status.message && (
                <div className={`mt-3 text-sm ${status.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
          
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">À propos de CareerLens</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                CareerLens est une plateforme innovante qui permet d'adapter le contenu de votre portfolio en fonction du profil des visiteurs. Notre technologie intelligente offre une expérience personnalisée pour maximiser l'impact de votre présence en ligne.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 mr-2 mt-0.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Détection intelligente des visiteurs
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 mr-2 mt-0.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Analyse comportementale avancée
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 mr-2 mt-0.5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Contenu personnalisé pour chaque visiteur
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-3">Nos coordonnées</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <span>contact@careerlens.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span>+33 6 12 34 56 78</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 