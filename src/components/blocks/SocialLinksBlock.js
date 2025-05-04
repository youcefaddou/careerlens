'use client'

import { useState, useEffect } from 'react'
import { useProfile } from '@/context/ProfileContext'

export default function SocialLinksBlock({ blockData }) {
  const { profile } = useProfile()
  const [data, setData] = useState({
    links: []
  })
  
  // Base de données de liens sociaux pour la simulation
  const allSocialLinks = {
    // Liens professionnels (toujours affichés)
    professional: [
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        ),
        category: 'professional',
        featured: true
      },
      {
        name: 'GitHub',
        url: 'https://github.com/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        ),
        category: 'professional',
        featured: true
      }
    ],
    
    // Liens pour les développeurs frontend
    frontend: [
      {
        name: 'CodePen',
        url: 'https://codepen.io/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21.838 8.445c0-.1-.047-.15-.116-.217l-9.723-6.516c-.22-.116-.5-.116-.728 0l-9.73 6.516c-.07.067-.116.117-.116.217v7.069c0 .1.047.15.116.217l9.73 6.516c.22.116.5.116.727 0l9.724-6.516c.069-.067.116-.117.116-.217zM12 13.789L9.394 12 12 10.211 14.606 12 12 13.789zm.897-3.578l-5.2 3.471-4.201-2.804 9.401-6.215v5.548zm-1.793 4.567L6.88 12.001l5.005-3.343v5.72l-2.569-1.367-2.226 1.449zm1.793.878v5.557l-9.469-6.262 4.27-2.808 5.2 3.513zm.896-10.977l9.4 6.215-4.2 2.804-5.2-3.471V4.68zm7.096 8.1l-4.2 2.804-5.2-3.513 5.2-3.343 4.2 2.804v1.249z" />
          </svg>
        ),
        category: 'code',
        featured: false
      },
      {
        name: 'Dribbble',
        url: 'https://dribbble.com/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
          </svg>
        ),
        category: 'design',
        featured: false
      }
    ],
    
    // Liens pour les développeurs backend
    backend: [
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/users/123456/jean-dupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13h-10.66z" />
          </svg>
        ),
        category: 'code',
        featured: true
      },
      {
        name: 'Dev.to',
        url: 'https://dev.to/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.826 10.083a.784.784 0 0 0-.468-.175h-.701v4.198h.701a.786.786 0 0 0 .469-.175c.155-.117.233-.292.233-.525v-2.798c.001-.233-.079-.408-.234-.525zM19.452 3H4.548A2.453 2.453 0 0 0 2.1 5.47v13.06c0 1.364 1.084 2.47 2.448 2.47h14.904c1.364 0 2.448-1.106 2.448-2.47V5.47c0-1.364-1.084-2.47-2.448-2.47zm-8.169 9.896h-1.938v-3.793h1.938v3.793zm0-5.31H8.634v-1.35h2.649v1.35zm5.823 5.571c0 .971-.728 1.773-1.866 1.773h-2.599V8.843h2.599c1.138 0 1.866.802 1.866 1.773v2.541z" />
          </svg>
        ),
        category: 'blog',
        featured: false
      }
    ],
    
    // Liens pour les développeurs mobile
    mobile: [
      {
        name: 'App Store',
        url: 'https://apps.apple.com/developer/jean-dupont/id123456789',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z" />
          </svg>
        ),
        category: 'app',
        featured: true
      },
      {
        name: 'Google Play',
        url: 'https://play.google.com/store/apps/developer?id=jean.dupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
          </svg>
        ),
        category: 'app',
        featured: true
      }
    ],
    
    // Liens pour les designers
    design: [
      {
        name: 'Behance',
        url: 'https://www.behance.net/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.482.102.894.273 1.241.507.344.235.612.546.804.938.188.387.281.871.281 1.443 0 .619-.141 1.137-.421 1.551-.284.414-.7.753-1.255 1.014.756.214 1.311.601 1.663 1.159.35.563.527 1.248.527 2.059 0 .656-.125 1.226-.38 1.712-.254.485-.603.877-1.051 1.173-.448.295-.974.517-1.578.656-.6.137-1.232.21-1.903.21H2V5.698h5.799m-.35 4.835c.481 0 .878-.114 1.192-.345.311-.228.463-.603.463-1.119 0-.286-.051-.522-.152-.707-.103-.184-.244-.332-.424-.446-.181-.111-.381-.188-.597-.229a3.75 3.75 0 0 0-.697-.063H4.709v2.909h2.74zm.151 5.272c.267 0 .521-.023.76-.077.241-.052.453-.137.637-.261.182-.12.332-.283.44-.491.109-.206.162-.473.162-.799 0-.634-.179-1.085-.533-1.358-.355-.27-.831-.404-1.414-.404H4.709v3.39H7.6v-.002zm8.867-12.969h4.872V4.03h-4.872v-1.19zm-1.545 8.88h-.473c-.022-.19-.033-.348-.033-.51v-.379c0-.121.001-.268.01-.444.006-.174.007-.419.007-.732 0-.34-.098-.582-.291-.732-.193-.15-.486-.226-.878-.226-.149 0-.355.043-.617.123-.261.083-.432.258-.508.531a22.112 22.112 0 0 0-.121 1.178h-.487c-.01-.451-.108-.869-.28-1.265-.186-.414-.478-.736-.883-.97a2.943 2.943 0 0 0-1.432-.376c-.796 0-1.488.199-2.079.602-.692.462-1.272 1.241-1.74 2.347-.305.736-.565 1.572-.786 2.516-.215.937-.322 1.726-.322 2.365 0 .809.312 1.487.94 2.033.627.546 1.478.818 2.549.818.704 0 1.269-.121 1.694-.358.423-.243.776-.61 1.059-1.103.272.358.539.637.799.831.408.307.941.46 1.601.46.659 0 1.238-.229 1.75-.688.51-.457.777-1.119.777-1.989v-.609c0-.277.003-.553.009-.836l.01-.926v-.546c.001-.094.001-.169.001-.219 0-.646-.205-1.153-.623-1.518-.419-.367-.968-.555-1.649-.555-.555 0-1.018.089-1.388.267-.37.179-.718.444-1.038.788zM16.3 11.071c0 .546.007 1.088.022 1.634.015.545.099.844.251.896a.42.42 0 0 0 .331-.089c.142-.135.211-.601.211-1.4v-.665c0-.621-.084-1.046-.251-1.275-.168-.228-.419-.341-.753-.341-.148 0-.271.045-.367.134-.095.088-.143.283-.143.584v.522h.699zm-8.32.459c.117-.252.268-.446.456-.58.185-.135.38-.205.58-.205.145 0 .27.041.375.124.118.086.173.22.166.4-.013.334-.149.641-.41.92-.263.278-.593.48-.986.606l-.35.11c-.032-.61-.036-1.09-.011-1.445l.18.07z" />
          </svg>
        ),
        category: 'design',
        featured: true
      },
      {
        name: 'Figma',
        url: 'https://figma.com/@jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
          </svg>
        ),
        category: 'design',
        featured: false
      }
    ],
    
    // Liens communs pour tous les profils
    social: [
      {
        name: 'X',
        url: 'https://x.com/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
        category: 'social',
        featured: false
      },
      {
        name: 'YouTube',
        url: 'https://youtube.com/c/jeandupont',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
        category: 'social',
        featured: false
      }
    ]
  }
  
  // Simuler des données réelles
  useEffect(() => {
    // Récupérer d'abord les liens professionnels pour tous les profils
    let relevantLinks = [...allSocialLinks.professional]
    
    // Ajouter les liens sociaux communs
    relevantLinks = [...relevantLinks, ...allSocialLinks.social]
    
    // Ajouter les liens spécifiques au profil
    switch (profile.type) {
      case 'frontend':
        relevantLinks = [...relevantLinks, ...allSocialLinks.frontend]
        break
      case 'backend':
        relevantLinks = [...relevantLinks, ...allSocialLinks.backend]
        break
      case 'mobile':
        relevantLinks = [...relevantLinks, ...allSocialLinks.mobile]
        break
      case 'design':
        relevantLinks = [...relevantLinks, ...allSocialLinks.design]
        break
      case 'fullstack':
        // Pour full stack, ajouter un mix de frontend et backend
        relevantLinks = [
          ...relevantLinks,
          allSocialLinks.frontend[0],
          allSocialLinks.backend[0]
        ]
        break
      default:
        // Par défaut, n'ajouter aucun lien spécifique supplémentaire
        break
    }
    
    // Trier les liens : d'abord les liens mis en avant, puis par catégorie
    relevantLinks.sort((a, b) => {
      // D'abord trier par "featured"
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Ensuite par catégorie
      const categoryOrder = {
        'professional': 1,
        'code': 2,
        'design': 3,
        'app': 4,
        'blog': 5,
        'social': 6
      }
      
      return categoryOrder[a.category] - categoryOrder[b.category]
    })
    
    // Éliminer les doublons potentiels (par URL)
    const uniqueLinks = []
    const seenUrls = new Set()
    
    for (const link of relevantLinks) {
      if (!seenUrls.has(link.url)) {
        uniqueLinks.push(link)
        seenUrls.add(link.url)
      }
    }
    
    setData({
      links: uniqueLinks
    })
  }, [profile.type])
  
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-4">Réseaux sociaux</h2>
      
      <div className="flex flex-wrap gap-3">
        {data.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <span className="text-gray-700 dark:text-gray-300">
              {link.icon}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  )
} 