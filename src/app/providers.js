'use client'

import { SessionProvider } from 'next-auth/react'
import { ProfileProvider } from '@/context/ProfileContext'

export function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

export function Providers({ children }) {
  return (
    <NextAuthProvider>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </NextAuthProvider>
  )
} 