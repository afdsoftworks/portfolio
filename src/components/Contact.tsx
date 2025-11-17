'use client'

import { ContactForm } from '@/components/ContactForm'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiGithub, FiInstagram } from 'react-icons/fi'

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section
      id="contacto"
      className="py-24 px-6"
      style={{ background: 'var(--cream-light)' }}
    >
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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
            Hablemos de{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--blue-accent)' }}>
              tu proyecto
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
            Completá el formulario y nos pondremos en contacto a la brevedad
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          style={{
            background: 'var(--white)',
            border: '1px solid rgba(59, 90, 125, 0.1)',
            boxShadow: '0 4px 16px var(--shadow-soft)'
          }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          <div
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'var(--white)',
              border: '1px solid rgba(59, 90, 125, 0.1)',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}
          >
            <FiMail
              className="mx-auto mb-3 text-3xl"
              style={{ color: 'var(--blue-accent)' }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: 'var(--text-dark)'
              }}
            >
              Email
            </h3>
            <a
              href="mailto:afdsoftworks@gmail.com"
              className="transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--blue-accent)',
                fontSize: '0.95rem'
              }}
            >
              contacto@afdsoftworks.com
            </a>
          </div>

          <div
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'var(--white)',
              border: '1px solid rgba(59, 90, 125, 0.1)',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}
          >
            <FiPhone
              className="mx-auto mb-3 text-3xl"
              style={{ color: 'var(--blue-accent)' }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: 'var(--text-dark)'
              }}
            >
              Teléfono
            </h3>
            <a
              href="https://wa.me/59892480589?text=Hola%2C%20estoy%20interesado%20en%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--blue-accent)',
                fontSize: '0.95rem'
              }}
            >
              (+598) 092-480-589
            </a>
          </div>

          <div
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'var(--white)',
              border: '1px solid rgba(59, 90, 125, 0.1)',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}
          >
            <FiGithub
              className="mx-auto mb-3 text-3xl"
              style={{ color: 'var(--blue-accent)' }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: 'var(--text-dark)'
              }}
            >
              GitHub
            </h3>
            <a
              href="https://github.com/afdsoftworks"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--blue-accent)',
                fontSize: '0.95rem'
              }}
            >
              @afdsoftworks
            </a>
          </div>

          <div
            className="p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
            style={{
              background: 'var(--white)',
              border: '1px solid rgba(59, 90, 125, 0.1)',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}
          >
            <FiInstagram
              className="mx-auto mb-3 text-3xl"
              style={{ color: 'var(--blue-accent)' }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: 'var(--font-playfair)',
                color: 'var(--text-dark)'
              }}
            >
              Instagram
            </h3>
            <a
              href="https://instagram.com/afdsoftworks"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--blue-accent)',
                fontSize: '0.95rem'
              }}
            >
              @afdsoftworks
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
