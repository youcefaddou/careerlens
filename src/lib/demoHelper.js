import { demoExamples } from './demoExamples'

/**
 * Get the relevant demo examples based on profile type and interests
 * Cette fonction est utilisée côté serveur pour le SEO
 */
export function getRelevantDemo(profileType = 'default', interests = []) {
  // Déterminer la démo à afficher en fonction du profil
  let demo
  
  switch (profileType) {
    case 'frontend':
      demo = demoExamples.frontend
      break
    case 'backend':
      demo = demoExamples.backend
      break
    case 'mobile':
      demo = demoExamples.mobile
      break
    case 'design':
      demo = demoExamples.design
      break
    case 'fullstack':
      demo = demoExamples.fullstack
      break
    default:
      // Par défaut, montrer la démo frontend
      demo = demoExamples.frontend
  }
  
  // Si des intérêts spécifiques sont détectés
  if (interests && interests.length > 0) {
    const interestKeywords = interests.map(interest => interest.toLowerCase())
    
    // Vérifier si un intérêt correspond à une démo spécifique
    const interestToDemo = {
      'react': demoExamples.frontend,
      'express': demoExamples.backend,
      'api': demoExamples.backend,
      'serverless': demoExamples.fullstack,
      'aws': demoExamples.fullstack,
      'react native': demoExamples.mobile,
      'mobile': demoExamples.mobile,
      'animation': demoExamples.design,
      'gsap': demoExamples.design
    }
    
    // Chercher une démo correspondant aux intérêts
    for (const interest of interestKeywords) {
      for (const keyword in interestToDemo) {
        if (interest.includes(keyword) || keyword.includes(interest)) {
          demo = interestToDemo[keyword]
          break
        }
      }
    }
  }
  
  return demo
} 