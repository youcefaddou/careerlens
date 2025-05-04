import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase()

          // Recherche de l'utilisateur avec l'email fourni
          const user = await User.findOne({ email: credentials.email }).select('+password')

          if (!user) {
            throw new Error('Email ou mot de passe incorrect')
          }

          // Vérification du mot de passe
          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordMatch) {
            throw new Error('Email ou mot de passe incorrect')
          }

          // Ne pas inclure le mot de passe dans la session
          const userWithoutPassword = {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileType: user.profileType,
            role: user.role,
            image: user.image || '',
          }

          return userWithoutPassword
        } catch (error) {
          console.error('Erreur d\'authentification:', error)
          throw new Error(error.message || 'Erreur d\'authentification')
        }
      },
    }),
    // Ajoutez ces providers quand vous serez prêt à les configurer
    /* 
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    */
  ],
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.profileType = user.profileType
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.profileType = token.profileType
        session.user.role = token.role
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: process.env.NEXTAUTH_SECRET || 'votre_secret_temporaire_pour_dev',
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 