'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiShoppingCart, FiLayout, FiBriefcase, FiUser, FiTool, FiTrendingUp } from 'react-icons/fi'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'

const services = [
  {
    icon: FiShoppingCart,
    title: "E-commerce",
    description: "tiendas rápidas, seguras y listas para vender.",
    color: "#4A7AB8"
  },
  {
    icon: FiLayout,
    title: "Landing Pages",
    description: "ideales para campañas, servicios o lanzamientos.",
    color: "#5B7A9D"
  },
  {
    icon: FiBriefcase,
    title: "Sitios Corporativos",
    description: "profesionales, claros y confiables.",
    color: "#3B5A7D"
  },
  {
    icon: FiUser,
    title: "Marcas Personales & Portfolios",
    description: "mostrás tu trabajo con presencia.",
    color: "#4A7AB8"
  },
  {
    icon: FiTrendingUp,
    title: "Optimización & SEO",
    description: "mejoramos tu posicionamiento y rendimiento web.",
    color: "#3B5A7D"
  },
  {
    icon: FiTool,
    title: "Sitios a Medida",
    description: "desarrollados especialmente para tu idea.",
    color: "#5B7A9D"
  }
]

export default function Services() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const { navigateToSection } = useSectionNavigation()

  return (
    <section
      id="servicios"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'var(--cream-light)' }}
    >
      <div className="container mx-auto max-w-6xl" ref={ref}>
        {/* Main heading */}
        <motion.h2
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            color: 'var(--text-dark)',
            fontWeight: 700
          }}
        >
          Nuestros <span style={{ fontStyle: 'italic', color: 'var(--blue-accent)' }}>servicios</span>
        </motion.h2>

        <motion.p
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16 max-w-2xl mx-auto"
          style={{
            fontFamily: 'var(--font-inter)',
            color: 'var(--text-gray)',
            fontSize: '1.125rem'
          }}
        >
          Creamos sitios web modernos que funcionan
        </motion.p>

        {/* Services Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ y: 30 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300"
                style={{
                  background: 'var(--white)',
                  border: '1px solid rgba(59, 90, 125, 0.1)',
                  boxShadow: '0 2px 8px var(--shadow-soft)',
                  cursor: 'pointer'
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}15`,
                    color: service.color
                  }}
                >
                  <Icon className="text-2xl" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    fontStyle: 'italic',
                    color: 'var(--text-dark)'
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'var(--text-gray)',
                    fontSize: '0.95rem'
                  }}
                >
                  {service.description}
                </p>

                {/* Hover effect border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: `2px solid ${service.color}`,
                  }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigateToSection('/contacto')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block font-medium px-8 py-3 rounded-full transition-all duration-300"
            style={{
              background: 'var(--blue-accent)',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 6px 20px rgba(74, 122, 184, 0.25)'
            }}
          >
            Empezar mi proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
