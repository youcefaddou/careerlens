/**
 * @typedef {Object} Project
 * @property {number} id - Identifiant unique du projet
 * @property {string} title - Titre du projet
 * @property {string} description - Description du projet
 * @property {string[]} tags - Tags liés au projet (ex: 'frontend', 'react')
 * @property {'simple'|'medium'|'complex'} complexity - Niveau de complexité du projet
 * @property {string} url - URL du code source du projet
 */

/**
 * @typedef {Object} Visit
 * @property {string} timestamp - Horodatage de la visite
 * @property {string} referrer - URL de référence d'où vient le visiteur
 * @property {string} jobType - Type d'emploi recherché (tiré de l'URL)
 * @property {string} userAgent - User agent du navigateur
 */ 