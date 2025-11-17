'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FiCode, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'

export default function Portfolio() {
  const { navigateToSection } = useSectionNavigation()
  // proyectos “reales”
  const base = [
    {
      id: 1,
      nombre: 'Fronterón MTB',
      descripcion:
        'Vive la emoción del MTB en senderos únicos: rutas desafiantes, seguimiento en tiempo real y toda la comunidad de ciclistas en un solo sitio.',
      imagen: '/portfolio/fronteron.jpg',
      estado: 'Desplegado',
      href: 'https://www.fronteronmtb.com/',
    },
    {
      id: 2,
      nombre: 'Autoclick',
      descripcion:
        'Encuentra tu próxima máquina perfecta: amplio catálogo, filtros intuitivos y opciones de financiamiento para que estrenes vehículo sin complicaciones.',
      imagen: '/portfolio/autoclick.jpg',
      estado: 'Desplegado',
      href: 'https://autoclick.com.uy',
    },
    {
      id: 3,
      nombre: 'AeroFest',
      descripcion:
        'Punta del Este se prepara para vivir una experiencia única en 2026: un espectáculo aéreo que reunirá a los mejores pilotos y aeronaves del mundo. Con acrobacias impresionantes, exhibiciones de aviación civil y militar, y un marco inigualable junto al mar, el evento promete emoción, adrenalina y diversión para toda la familia.',
      imagen: '/portfolio/aerofest.jpg',
      estado: 'En construcción',
      href: '',
    },
    {
      id: 4,
      nombre: 'Made Bylu',
      descripcion:
        'Descubre piezas únicas y hechas con amor: ropa y accesorios artesanales diseñados y confeccionados a mano con materiales de calidad, donde cada creación cuenta una historia y refleja el cuidado por los detalles.',
      imagen: '/portfolio/imgMadeByLu.png',
      estado: 'Desplegado',
      href: 'https://madebylu.site',
    },
  ]

  // cantidad total deseada (siempre 6 y par)
  const TOTAL = 6

  // rellena con placeholders numerados desde #1
  const placeholders = Array.from(
    { length: TOTAL - base.length },
    (_, i) => ({
      id: base.length + i + 1,
      nombre: `Proyecto #${i + 1}`,
      descripcion: 'Este espacio mostrará uno de nuestros futuros desarrollos',
      imagen: null,
      estado: 'Próximamente',
      href: '#',
    })
  )

  const proyectos = [...base, ...placeholders]
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

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
                {/* Image */}
                <div
                  className="w-full h-56 md:h-64 flex items-center justify-center overflow-hidden relative"
                  style={{ background: 'var(--cream-light)' }}
                >
                  {proyecto.imagen ? (
                    <>
                      <Image
                        src={proyecto.imagen}
                        alt={proyecto.nombre}
                        width={800}
                        height={534}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay on hover */}
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
                        ...(proyecto.estado === 'En construcción'
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

                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'Tailwind', 'Node.js'].map((tech, i) => (
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
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
      </div>
    </section>
  )
}
