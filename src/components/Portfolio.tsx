import Image from 'next/image'
import Link from 'next/link'
import { FiCode } from 'react-icons/fi'

export default function Portfolio() {
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
      estado: 'En construcción', // cambiar estado, admite "En construcción" & "Desplegado".
      href: '#',
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

  return (
    <section id="proyectos" className="py-20 px-6 bg-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-purple-300">Portafolio</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pronto estarán disponibles ejemplos de nuestros trabajos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {proyectos.map((proyecto) => (
            <Link
              key={proyecto.id}
              href={proyecto.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10
                         hover:border-purple-300/30 transition-all duration-300
                         flex flex-col h-full"
            >
              <div className="w-full h-56 md:h-64 lg:h-72 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center overflow-hidden">
                {proyecto.imagen ? (
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.nombre}
                    width={800}
                    height={534}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center p-6">
                    <FiCode className="mx-auto text-4xl text-white/30 mb-3" />
                    <p className="text-white/50 font-medium">Proyecto en desarrollo</p>
                    <p className="text-xs text-white/30 mt-2">Disponible pronto</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gradient-to-b from-white/5 to-white/10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{proyecto.nombre}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full
                      ${
                        proyecto.estado === 'En construcción'
                          ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-300/30'
                        : proyecto.estado === 'Desplegado'
                          ? 'bg-green-500/10 text-green-300 border border-green-300/30'
                          : 'bg-white/10 text-white'
                      }`}
                  >
                    {proyecto.estado}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{proyecto.descripcion}</p>

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {['Next.js', 'Tailwind', 'Node.js'].map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 hover:scale-105 transition-transform duration-300"
          >
            Contáctanos para iniciar tu proyecto
          </a>
        </div>
      </div>
    </section>
  )
}
