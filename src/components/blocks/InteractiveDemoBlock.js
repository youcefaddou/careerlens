// Server component for static content
import { getRelevantDemo } from '@/lib/demoHelper'
import ClientInteractiveDemo from './ClientInteractiveDemo'

export default function InteractiveDemoBlock({ blockData }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-semibold mb-2">Démo interactive</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Code interactif</p>
      
      <ClientInteractiveDemo blockData={blockData} />
    </section>
  )
} 