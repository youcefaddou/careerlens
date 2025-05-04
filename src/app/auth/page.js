import AuthTabs from '@/components/auth/AuthTabs'

export const metadata = {
  title: 'Connexion / Inscription | CareerLens',
  description: 'Connectez-vous ou créez un compte pour personnaliser votre expérience CareerLens',
}

export default function AuthPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bienvenue sur CareerLens
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Connectez-vous ou créez un compte pour une expérience personnalisée
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <AuthTabs />
        </div>
      </div>
    </div>
  )
} 