'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Siempre llamar todos los hooks antes de cualquier return
  useEffect(() => {
    // Solo redirigir si NO es la página de login
    if (pathname !== '/admin/login' && !loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router, pathname])

  // Si es la página de login, no aplicar el layout protegido
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--cream-primary)' }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--blue-accent)', borderTopColor: 'transparent' }}
          />
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-gray)',
            }}
          >
            Verificando autenticación...
          </p>
        </div>
      </div>
    )
  }

  // Si no hay usuario, no renderizar nada (el redirect se encarga)
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cream-light)' }}>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
