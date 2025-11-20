'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiCode, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'
import { Project } from '@/types/project'
import MediaDisplay from './MediaDisplay'

interface LocalProject {
  id: string
  nombre: string
  descripcion: string
  media_type: 'image' | 'video'
  imagen: string | null
  video_url: string | null
  video_webm_url: string | null
  video_poster: string | null
  estado: 'Desplegado' | 'En Construcción' | 'Próximamente'
  href: string
  tags: string[]
  order: number
}

export default function Portfolio() {
  const { navigateToSection } = useSectionNavigation()
  const [proyectos, setProyectos] = useState<LocalProject[]>([])
  const [loading, setLoading] = useState(true)

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    fetchProyectos()
  }, [])

  const fetchProyectos = async () => {
    try {
      const res = await fetch('/api/projects')
      if (res.ok) {
        const data = await res.json()
        const projectsFromDB: Project[] = data.projects || []

        // Mapear proyectos de la BD al formato del componente
        const mappedProjects = projectsFromDB.map((p) => ({
          id: p.id,
          nombre: p.title,
          descripcion: p.description,
          media_type: p.media_type,
          imagen: p.image_url,
          video_url: p.video_url,
          video_webm_url: p.video_webm_url,
          video_poster: p.video_poster,
          estado: p.status,
          href: p.link || '#',
          tags: p.tags || [],
          order: p.order,
        }))

        // Ordenar por campo 'order'
        const sortedProjects = mappedProjects.sort((a, b) => a.order - b.order)

        setProyectos(sortedProjects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="proyectos"
      className="py-24 px-6"
      style={{ background: 'var(--cream-primary)' }}
    >
      <div className="container mx-auto max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="mb-4 leading-tight"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--text-dark)',
              fontWeight: 700
            }}
          >
            Proyectos{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--blue-accent)' }}>
              destacados
            </span>
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-gray)',
              fontSize: '1.125rem'
            }}
          >
            Soluciones digitales que transforman ideas en experiencias reales
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--blue-accent)' }}></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ y: 30 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link
                href={proyecto.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl flex flex-col h-full transition-all duration-300 hover:shadow-xl"
                style={{
                  background: 'var(--white)',
                  border: '1px solid rgba(59, 90, 125, 0.1)',
                  boxShadow: '0 2px 8px var(--shadow-soft)'
                }}
              >
                {/* Media (Image or Video) */}
                <div
                  className="w-full h-56 md:h-64 flex items-center justify-center overflow-hidden relative"
                  style={{ background: 'var(--cream-light)' }}
                >
                  {(proyecto.imagen || proyecto.video_url) ? (
                    <>
                      <MediaDisplay
                        project={{
                          media_type: proyecto.media_type || 'image',
                          image_url: proyecto.imagen,
                          video_url: proyecto.video_url,
                          video_webm_url: proyecto.video_webm_url,
                          video_poster: proyecto.video_poster,
                          title: proyecto.nombre,
                        }}
                        className="object-cover w-full h-full transition-transform duration-500"
                        width={800}
                        height={534}
                        autoPlay={false}
                        loop={true}
                        muted={true}
                        controls={false}
                      />
                      {/* Overlay on hover - solo para imágenes */}
                      {proyecto.media_type === 'image' && (
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          style={{
                            background: 'rgba(59, 90, 125, 0.9)'
                          }}
                        >
                          <FiExternalLink
                            className="text-4xl"
                            style={{ color: 'var(--white)' }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <FiCode
                        className="mx-auto text-4xl mb-3"
                        style={{ color: 'var(--navy-light)', opacity: 0.3 }}
                      />
                      <p
                        className="font-medium"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'var(--text-gray)',
                          opacity: 0.6
                        }}
                      >
                        Proyecto en desarrollo
                      </p>
                      <p
                        className="text-xs mt-2"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          color: 'var(--text-gray)',
                          opacity: 0.4
                        }}
                      >
                        Disponible pronto
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        color: 'var(--text-dark)'
                      }}
                    >
                      {proyecto.nombre}
                    </h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        ...(proyecto.estado === 'En Construcción'
                          ? {
                              background: 'rgba(234, 179, 8, 0.1)',
                              color: '#ca8a04',
                              border: '1px solid rgba(234, 179, 8, 0.3)'
                            }
                          : proyecto.estado === 'Desplegado'
                          ? {
                              background: 'rgba(34, 197, 94, 0.1)',
                              color: '#16a34a',
                              border: '1px solid rgba(34, 197, 94, 0.3)'
                            }
                          : {
                              background: 'var(--cream-light)',
                              color: 'var(--text-gray)',
                              border: '1px solid rgba(59, 90, 125, 0.1)'
                            })
                      }}
                    >
                      {proyecto.estado}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-4 flex-1"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'var(--text-gray)',
                      lineHeight: '1.6'
                    }}
                  >
                    {proyecto.descripcion}
                  </p>

                  {proyecto.tags && proyecto.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proyecto.tags.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            background: 'var(--cream-light)',
                            color: 'var(--navy-dark)',
                            border: '1px solid rgba(59, 90, 125, 0.15)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && (
          <motion.div
            initial={{ y: 20 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => navigateToSection('/contacto')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center font-semibold px-8 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'var(--blue-accent)',
                color: 'var(--white)',
                fontFamily: 'var(--font-inter)',
                boxShadow: '0 6px 20px rgba(74, 122, 184, 0.25)'
              }}
            >
              Iniciar mi proyecto
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
