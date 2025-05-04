import ReferrerDetector from "@/components/ReferrerDetector";
import ProjectShowcase from "@/components/ProjectShowcase";
import InteractiveDemo from "@/components/InteractiveDemo";
import VisitTracker from "@/components/VisitTracker";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-16 pb-10 px-4 md:px-8">
      {/* Détecteur d'origine du visiteur - invisible */}
      <ReferrerDetector />

      {/* Hero Section */}
      <section className="w-full max-w-4xl py-12 md:py-24 space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            CareerLens <span className="text-blue-600 dark:text-blue-400">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Une plateforme intelligente qui adapte son contenu selon le profil du visiteur et ses intérêts
          </p>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            React
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Next.js
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-300">
            Node.js
          </span>
          <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300">
            TypeScript
          </span>
          <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900 px-3 py-1 text-sm font-medium text-yellow-700 dark:text-yellow-300">
            JavaScript
          </span>
        </div>
      </section>

      <div className="w-full max-w-4xl space-y-16">
        {/* Projets affichés de manière dynamique en fonction de l'URL et du comportement */}
        <ProjectShowcase />
        
        {/* Démo interactive de code */}
        <InteractiveDemo />
        
        {/* CTA Section */}
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Vous êtes intéressé?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Contactez-nous pour découvrir comment CareerLens peut améliorer votre présence en ligne
            </p>
          </div>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Nous contacter
          </a>
        </section>
      </div>
      
      {/* Footer simplifié */}
      <footer className="w-full max-w-4xl mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} CareerLens. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Tracker invisible pour les analytics */}
      <VisitTracker />
    </main>
  );
}
