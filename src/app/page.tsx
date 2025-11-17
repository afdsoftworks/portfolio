'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/NavBar';
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DecorativeElements from '@/components/DecorativeElements'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  useSectionNavigation() // Initialize section navigation

  useEffect(() => {
    document.title = 'AFDSoftworks | Soluciones digitales a medida'
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--cream-primary)', color: 'var(--text-dark)' }}>
      <DecorativeElements />
      <div className="relative z-10">
        <Navbar isScrolled={isScrolled} />
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
