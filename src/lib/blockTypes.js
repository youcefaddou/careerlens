/**
 * Types de blocs disponibles pour construire un CV dynamique
 */

export const blockTypes = [
  {
    id: 'header',
    name: 'En-tête',
    description: 'Informations personnelles et titre du CV',
    icon: 'user-circle',
    defaultData: {
      fullName: 'Votre Nom',
      title: 'Développeur Full Stack',
      photo: null,
      location: 'Paris, France',
      email: 'exemple@email.com',
      phone: '+33 6 12 34 56 78'
    },
    relevanceFor: ['all']
  },
  {
    id: 'experience',
    name: 'Expérience professionnelle',
    description: 'Détails sur vos expériences professionnelles',
    icon: 'briefcase',
    defaultData: {
      experiences: []
    },
    relevanceFor: ['frontend', 'backend', 'fullstack', 'mobile', 'design']
  },
  {
    id: 'skills',
    name: 'Compétences',
    description: 'Vos compétences techniques et personnelles',
    icon: 'code',
    defaultData: {
      technicalSkills: [],
      softSkills: []
    },
    relevanceFor: ['frontend', 'backend', 'fullstack', 'mobile', 'design']
  },
  {
    id: 'education',
    name: 'Formation',
    description: 'Votre parcours académique',
    icon: 'academic-cap',
    defaultData: {
      education: []
    },
    relevanceFor: ['all']
  },
  {
    id: 'projects',
    name: 'Projets',
    description: 'Projets personnels ou professionnels',
    icon: 'folder',
    defaultData: {
      projects: []
    },
    relevanceFor: ['frontend', 'backend', 'fullstack', 'mobile', 'design']
  },
  {
    id: 'languages',
    name: 'Langues',
    description: 'Langues que vous parlez',
    icon: 'globe',
    defaultData: {
      languages: []
    },
    relevanceFor: ['all']
  },
  {
    id: 'certifications',
    name: 'Certifications',
    description: 'Vos certifications professionnelles',
    icon: 'badge-check',
    defaultData: {
      certifications: []
    },
    relevanceFor: ['frontend', 'backend', 'fullstack', 'mobile', 'design']
  },
  {
    id: 'interactiveDemo',
    name: 'Démo interactive',
    description: 'Un exemple de code interactif pour montrer vos compétences',
    icon: 'code',
    defaultData: {
      language: 'javascript',
      code: '// Exemple de code'
    },
    relevanceFor: ['frontend', 'backend', 'fullstack']
  },
  {
    id: 'socialLinks',
    name: 'Réseaux sociaux',
    description: 'Liens vers vos profils sur les réseaux sociaux',
    icon: 'link',
    defaultData: {
      links: []
    },
    relevanceFor: ['all']
  }
];

/**
 * Fonction qui renvoie les blocs pertinents en fonction du type de profil
 * @param {string} profileType - Type de profil du visiteur
 * @returns {Array} Liste des blocs pertinents
 */
export function getRelevantBlocks(profileType = 'all') {
  return blockTypes.filter(block => 
    block.relevanceFor.includes('all') || block.relevanceFor.includes(profileType)
  );
}

/**
 * Ordre par défaut des blocs selon le type de profil
 */
export const defaultBlockOrder = {
  frontend: ['header', 'skills', 'projects', 'experience', 'education', 'certifications', 'interactiveDemo', 'languages', 'socialLinks'],
  backend: ['header', 'experience', 'skills', 'projects', 'education', 'certifications', 'interactiveDemo', 'languages', 'socialLinks'],
  fullstack: ['header', 'experience', 'skills', 'projects', 'education', 'certifications', 'interactiveDemo', 'languages', 'socialLinks'],
  mobile: ['header', 'skills', 'projects', 'experience', 'education', 'certifications', 'languages', 'socialLinks'],
  design: ['header', 'projects', 'skills', 'experience', 'education', 'certifications', 'languages', 'socialLinks'],
  default: ['header', 'experience', 'skills', 'education', 'projects', 'languages', 'certifications', 'socialLinks']
}; 