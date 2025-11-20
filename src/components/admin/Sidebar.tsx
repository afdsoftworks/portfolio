'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { FiFolder, FiMail, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '@/hooks/useAuth'

export default function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const menuItems = [
    {
      name: 'Proyectos',
      href: '/admin/proyectos',
      icon: FiFolder,
    },
    {
      name: 'Contacto',
      href: '/admin/contacto',
      icon: FiMail,
      disabled: true, // Próximamente
    },
  ]

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg"
        style={{
          background: 'var(--navy-dark)',
          color: 'var(--white)',
        }}
        aria-label="Abrir menú"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-64 min-h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--navy-dark)',
          borderRight: '1px solid rgba(245, 241, 232, 0.1)',
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'rgba(245, 241, 232, 0.1)' }}>
          <Link href="/admin/proyectos" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--cream-light)' }}
          >
            <Image
              src="/afd-logo.png"
              alt="AFD"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <h1
              className="font-bold text-lg"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: 'var(--white)',
              }}
            >
              AFD Admin
            </h1>
            <p
              className="text-xs"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245, 241, 232, 0.6)',
              }}
            >
              Dashboard
            </p>
          </div>
        </Link>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded"
            style={{ color: 'var(--white)' }}
            aria-label="Cerrar menú"
          >
            <FiX size={20} />
          </button>
        </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.disabled ? '#' : item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.disabled ? 'cursor-not-allowed opacity-50' : ''
                  } ${
                    isActive
                      ? 'shadow-lg'
                      : 'hover:bg-opacity-10'
                  }`}
                  style={{
                    background: isActive
                      ? 'var(--blue-accent)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--white)'
                      : 'rgba(245, 241, 232, 0.8)',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                  {item.disabled && (
                    <span
                      className="ml-auto text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(245, 241, 232, 0.2)',
                        color: 'rgba(245, 241, 232, 0.6)',
                      }}
                    >
                      Pronto
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'rgba(245, 241, 232, 0.1)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(245, 241, 232, 0.2)' }}
          >
            <FiUser size={18} style={{ color: 'var(--white)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--white)',
              }}
            >
              {user?.email?.split('@')[0] || 'Admin'}
            </p>
            <p
              className="text-xs truncate"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245, 241, 232, 0.6)',
              }}
            >
              {user?.email || ''}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 hover:bg-opacity-10"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            fontFamily: 'var(--font-inter)',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          <FiLogOut size={16} />
          Cerrar sesión
        </button>
      </div>
      </aside>
    </>
  )
}
