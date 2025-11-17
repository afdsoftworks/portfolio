'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FiLock, FiMail, FiAlertCircle, FiLoader } from 'react-icons/fi'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        router.push('/admin/proyectos')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--cream-primary)' }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{
          background: 'var(--white)',
          border: '1px solid rgba(59, 90, 125, 0.1)',
          boxShadow: '0 10px 40px var(--shadow-soft)',
        }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 relative rounded-full flex items-center justify-center"
              style={{
                background: 'var(--cream-light)',
                border: '2px solid rgba(59, 90, 125, 0.2)',
              }}
            >
              <Image
                src="/afd-logo.png"
                alt="AFD Softworks"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: 'var(--text-dark)',
            }}
          >
            Dashboard Admin
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-gray)',
              fontSize: '0.95rem',
            }}
          >
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg flex items-start gap-3"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <FiAlertCircle
              className="flex-shrink-0 mt-0.5"
              style={{ color: '#dc2626', fontSize: '1.25rem' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: '#dc2626',
                fontSize: '0.875rem',
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail style={{ color: 'var(--text-gray)', opacity: 0.5 }} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 focus:outline-none"
                style={{
                  background: 'var(--cream-light)',
                  border: '1.5px solid rgba(59, 90, 125, 0.15)',
                  fontFamily: 'var(--font-inter)',
                  color: 'var(--text-dark)',
                }}
                placeholder="admin@afdsoftworks.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock style={{ color: 'var(--text-gray)', opacity: 0.5 }} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 rounded-lg transition-all duration-200 focus:outline-none"
                style={{
                  background: 'var(--cream-light)',
                  border: '1.5px solid rgba(59, 90, 125, 0.15)',
                  fontFamily: 'var(--font-inter)',
                  color: 'var(--text-dark)',
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
              loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-xl'
            }`}
            style={{
              background: 'var(--blue-accent)',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 6px 20px rgba(74, 122, 184, 0.3)',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" />
                Ingresando...
              </span>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          className="text-center mt-6"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'var(--text-gray)',
            fontSize: '0.8rem',
          }}
        >
          © {new Date().getFullYear()} AFD Softworks. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
