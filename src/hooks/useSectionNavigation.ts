'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useSectionNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Handle direct navigation to section URLs
    const sectionMap: { [key: string]: string } = {
      '/': 'inicio',
      '/servicios': 'servicios',
      '/proyectos': 'proyectos',
      '/contacto': 'contacto'
    }

    const sectionId = sectionMap[pathname]

    if (sectionId && pathname !== '/') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [pathname])

  useEffect(() => {
    // Observer for updating URL based on visible section
    const sections = [
      { id: 'inicio', path: '/' },
      { id: 'servicios', path: '/servicios' },
      { id: 'proyectos', path: '/proyectos' },
      { id: 'contacto', path: '/contacto' }
    ]

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find(s => s.id === entry.target.id)
          if (section && window.location.pathname !== section.path) {
            window.history.pushState(null, '', section.path)
          }
        }
      })
    }, observerOptions)

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const navigateToSection = (path: string) => {
    router.push(path, { scroll: false })

    const sectionMap: { [key: string]: string } = {
      '/': 'inicio',
      '/servicios': 'servicios',
      '/proyectos': 'proyectos',
      '/contacto': 'contacto'
    }

    const sectionId = sectionMap[path]
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)
    }
  }

  return { navigateToSection }
}
