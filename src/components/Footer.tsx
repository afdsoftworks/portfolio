'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiArrowUp } from 'react-icons/fi'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="py-16 px-6"
      style={{
        background: 'var(--navy-dark)',
        color: 'var(--white)'
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'var(--cream-light)',
                  border: '2px solid var(--white)'
                }}
              >
                <span
                  className="font-bold italic text-sm"
                  style={{
                    fontFamily: 'var(--font-playfair)',
                    color: 'var(--navy-dark)'
                  }}
                >
                  Afd
                </span>
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                AFD
              </span>
            </div>
            <p
              className="mb-6 max-w-sm"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245, 241, 232, 0.8)',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}
            >
              Creamos sitios web modernos que funcionan. Desarrollo profesional desde Uruguay.
            </p>
            <a
              href="https://github.com/afdsoftworks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'rgba(245, 241, 232, 0.8)',
                fontSize: '0.9rem'
              }}
            >
              <FiGithub className="text-lg" />
              @afdsoftworks
            </a>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Enlaces
            </h4>
            <ul className="space-y-2">
              {['Inicio', 'Servicios', 'Proyectos', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="transition-colors duration-200 hover:opacity-100"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'rgba(245, 241, 232, 0.7)',
                      fontSize: '0.95rem'
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-lg font-semibold mb-4"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Contacto
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:afdsoftworks@gmail.com"
                  className="transition-colors duration-200 hover:opacity-100"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(245, 241, 232, 0.7)',
                    fontSize: '0.9rem'
                  }}
                >
                  contacto@afdsoftworks.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/59892480589?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:opacity-100"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: 'rgba(245, 241, 232, 0.7)',
                    fontSize: '0.9rem'
                  }}
                >
                  (+598) 092-480-589
                </a>
              </li>
              <li
                style={{
                  fontFamily: 'var(--font-inter)',
                  color: 'rgba(245, 241, 232, 0.6)',
                  fontSize: '0.9rem'
                }}
              >
                Rivera, Uruguay
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(245, 241, 232, 0.15)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(245, 241, 232, 0.6)',
              fontSize: '0.875rem'
            }}
          >
            © {new Date().getFullYear()} AFD. Todos los derechos reservados.
          </p>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
            style={{
              background: 'rgba(245, 241, 232, 0.1)',
              border: '1px solid rgba(245, 241, 232, 0.2)',
              fontFamily: 'var(--font-inter)',
              color: 'var(--white)',
              fontSize: '0.875rem'
            }}
          >
            Volver arriba <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
