'use client'

import { useEffect, useState } from 'react'
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiCode, 
  FiLayers, 
  FiSmartphone,
  FiExternalLink,
  FiGithub,
  FiSend,
  FiLoader
} from 'react-icons/fi'
import { ContactForm } from '@/components/ContactForm'

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
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-900/90 backdrop-blur-md py-3 shadow-lg' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FiCode className="text-2xl text-purple-300" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-white">
              AFDSoftworks
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="hover:text-purple-300 transition">Inicio</a>
            <a href="#servicios" className="hover:text-purple-300 transition">Servicios</a>
            <a href="#proyectos" className="hover:text-purple-300 transition">Proyectos</a>
            <a href="#contacto" className="hover:text-purple-300 transition">Contacto</a>
          </div>
          <a 
            href="#contacto" 
            className="hidden md:block bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full transition backdrop-blur-sm"
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8 inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <p className="text-sm text-purple-300">Innovación digital desde 2023</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-white">
              Soluciones tecnológicas
            </span><br />
            para tu negocio
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Desarrollamos plataformas digitales a medida que potencian tu presencia en línea con tecnología de vanguardia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-white text-indigo-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform duration-300"
            >
              Contactar ahora <FiArrowRight className="ml-2" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:scale-105 transition-transform duration-300"
            >
              Nuestros servicios
            </a>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros <span className="text-purple-300">Servicios</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Ofrecemos soluciones integrales para todas tus necesidades digitales</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-b from-white/5 to-white/10 p-8 rounded-2xl border border-white/10 hover:border-purple-300/30 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="text-purple-300 text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portafolio Section */}
      <section id="proyectos" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro <span className="text-purple-300">Portafolio</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Pronto estarán disponibles ejemplos de nuestros trabajos</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-purple-300/30 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <FiCode className="mx-auto text-4xl text-white/30 mb-3" />
                    <p className="text-white/50 font-medium">Proyecto en desarrollo</p>
                    <p className="text-xs text-white/30 mt-2">Disponible pronto</p>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white/5 to-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">Proyecto #{item}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10">Próximamente</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">Este espacio mostrará uno de nuestros futuros desarrollos</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Next.js', 'Tailwind', 'Node.js'].map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 hover:scale-105 transition-transform duration-300"
            >
              Contáctanos para primeros proyectos
            </a>
          </div>
        </div>
      </section>

      {/* Contacto Section - NUEVA VERSIÓN */}
      <section id="contacto" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacta con <span className="text-purple-300">Nosotros</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Completa el formulario y nos pondremos en contacto contigo lo antes posible</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            <ContactForm />
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a href="mailto:contacto@afdsoftworks.com" className="text-purple-300 hover:text-purple-200">
                contacto@afdsoftworks.com
              </a>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <a href="tel:+1234567890" className="text-purple-300 hover:text-purple-200">
                +1 (234) 567-890
              </a>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Redes Sociales</h3>
              <div className="flex justify-center space-x-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-300 hover:text-white transition"
                    aria-label={social}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900/80 backdrop-blur-md py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <FiCode className="text-2xl text-purple-300" />
                <span className="text-xl font-bold">AFDSoftworks</span>
              </div>
              <p className="text-gray-300 mb-4">
                Especialistas en desarrollo web y soluciones digitales personalizadas.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="text-gray-300 hover:text-white transition"
                    aria-label={social}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
              <ul className="space-y-2">
                {['Inicio', 'Servicios', 'Proyectos', 'Contacto'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-300">
                <li>info@afdsoftworks.com</li>
                <li>+1 (234) 567-890</li>
                <li>Ciudad, País</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} AFDSoftworks. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const services = [
  {
    icon: <FiLayers />,
    title: "Desarrollo Web",
    description: "Sitios web responsivos y aplicaciones modernas con las últimas tecnologías."
  },
  {
    icon: <FiSmartphone />,
    title: "Aplicaciones Móviles",
    description: "Apps nativas e híbridas para iOS y Android que ofrecen experiencias excepcionales."
  },
  {
    icon: <FiCheckCircle />,
    title: "Soluciones a Medida",
    description: "Software personalizado diseñado específicamente para tus necesidades empresariales."
  }
]