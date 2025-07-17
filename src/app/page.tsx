'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/NavBar';
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    document.title = 'AFDSoftworks | Soluciones digitales a medida'
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  )
}
