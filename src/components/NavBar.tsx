'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'
import Image from 'next/image'
import { FiMenu, FiX } from 'react-icons/fi'

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const { navigateToSection } = useSectionNavigation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Contacto', path: '/contacto' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md py-2 shadow-sm'
          : 'py-3'
      }`}
      style={{
        background: isScrolled ? 'rgba(245, 241, 232, 0.95)' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(59, 90, 125, 0.1)' : 'none'
      }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo AFD */}
        <motion.button
          onClick={() => navigateToSection('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <div className="w-16 h-16 relative">
            <Image
              src="/afd-logo.png"
              alt="AFD Softworks"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.button>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.path}
              onClick={() => navigateToSection(item.path)}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -2 }}
              className="relative font-medium transition-colors duration-200"
              style={{
                color: 'var(--text-dark)',
                fontFamily: 'var(--font-inter)'
              }}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5"
                style={{ background: 'var(--blue-accent)' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <motion.button
          onClick={() => navigateToSection('/contacto')}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-2.5 rounded-full font-medium transition-all duration-300"
          style={{
            background: 'var(--blue-accent)',
            color: 'var(--white)',
            fontFamily: 'var(--font-inter)',
            boxShadow: '0 4px 12px rgba(74, 122, 184, 0.25)'
          }}
        >
          Hablemos
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          whileTap={{ scale: 0.95 }}
          style={{ color: 'var(--navy-dark)' }}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
              style={{ top: isScrolled ? '64px' : '76px' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-[280px] md:hidden shadow-2xl"
              style={{
                background: 'var(--cream-light)',
                marginTop: isScrolled ? '64px' : '76px',
                zIndex: 40
              }}
            >
              <div className="flex flex-col p-6 space-y-6">
                {/* Mobile Menu Items */}
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      navigateToSection(item.path)
                      setMobileMenuOpen(false)
                    }}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-left py-3 px-4 rounded-lg transition-all duration-200"
                    style={{
                      color: 'var(--text-dark)',
                      fontFamily: 'var(--font-inter)',
                      fontSize: '1.125rem',
                      fontWeight: 500
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  onClick={() => {
                    navigateToSection('/contacto')
                    setMobileMenuOpen(false)
                  }}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: menuItems.length * 0.1 }}
                  className="w-full py-3 px-6 rounded-full font-semibold transition-all duration-300"
                  style={{
                    background: 'var(--blue-accent)',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-inter)',
                    boxShadow: '0 4px 12px rgba(74, 122, 184, 0.25)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Hablemos
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
