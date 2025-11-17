'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { FiArrowRight } from 'react-icons/fi'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'
import Image from 'next/image'

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const { navigateToSection } = useSectionNavigation()

  useEffect(() => {
    if (logoRef.current && circleRef.current) {
      // Logo entrance animation with GSAP
      gsap.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.6)',
          delay: 0.3
        }
      )

      // Subtle floating animation
      gsap.to(logoRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Circle decoration animation
      gsap.fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.15,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.5
        }
      )
    }
  }, [])

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative overflow-hidden"
      style={{ background: 'var(--cream-primary)' }}
    >
      {/* Decorative circles */}
      <div
        ref={circleRef}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          border: '2px solid var(--navy-dark)',
          opacity: 0
        }}
      />

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Logo AFD grande */}
        <motion.div
          ref={logoRef}
          initial={{ opacity: 1 }}
          className="mb-4 inline-block"
        >
          <div className="w-96 h-96 md:w-[28rem] md:h-[28rem] mx-auto relative">
            <Image
              src="/afd-logo.png"
              alt="AFD Softworks Logo"
              width={448}
              height={448}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--text-dark)',
            fontWeight: 700
          }}
        >
          Creamos sitios web<br />
          <span style={{ fontStyle: 'italic' }}>modernos que funcionan.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'var(--text-gray)'
          }}
        >
          Desde e-commerce hasta portfolios personales, desarrollamos la solución digital perfecta para tu proyecto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            onClick={() => navigateToSection('/proyectos')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center font-semibold px-8 py-4 rounded-full transition-all duration-300"
            style={{
              background: 'var(--blue-accent)',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 6px 20px rgba(74, 122, 184, 0.3)'
            }}
          >
            Ver proyectos <FiArrowRight className="ml-2" />
          </motion.button>

          <motion.button
            onClick={() => navigateToSection('/contacto')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center font-semibold px-8 py-4 rounded-full transition-all duration-300"
            style={{
              background: 'transparent',
              border: '2px solid var(--navy-dark)',
              color: 'var(--navy-dark)',
              fontFamily: 'var(--font-inter)'
            }}
          >
            Hablemos
          </motion.button>
        </motion.div>

        {/* Small badge */}
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16"
        >
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-gray)',
              letterSpacing: '0.05em'
            }}
          >
            Diseño y desarrollo profesional desde Uruguay
          </p>
        </motion.div>
      </div>
    </section>
  )
}
