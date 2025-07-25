import Link from 'next/link'
import { FiCode } from 'react-icons/fi'

export default function Portfolio() {
  const proyectos = [
    {
      id: 1,
      nombre: 'Fronterón MTB',
      descripcion:
        'Vive la emoción del MTB en senderos únicos: rutas desafiantes, seguimiento en tiempo real y toda la comunidad de ciclistas en un solo sitio.',
      imagen: '/portfolio/fronteron.jpg',
      estado: 'En construcción',
      href: 'https://www.fronteronmtb.com/',
    },
    {
      id: 1.1,
      nombre: 'Florería Brasil',
      descripcion:
        'Explora nuestra colección de ramos frescos y personalizados: flores autóctonas, arreglos exclusivos y entregas puntuales para cada ocasión.',
      imagen: '/portfolio/floreria.jpg',
      estado: 'En construcción',
      href: '',
    },
    {
      id: 1.2,
      nombre: 'Autoclick',
      descripcion:
        'Encuentra tu próxima máquina perfecta: amplio catálogo, filtros intuitivos y opciones de financiamiento para que estrenes vehículo sin complicaciones.',
      imagen: '/portfolio/autoclick.png',
      estado: 'En construcción',
      href: 'https://autoclick-lyart.vercel.app/',
    },
    ...Array.from({ length: 4 }, (_, i) => ({
      id: i + 2,
      nombre: `Proyecto #${i + 2}`,
      descripcion: 'Este espacio mostrará uno de nuestros futuros desarrollos',
      imagen: null,
      estado: 'Próximamente',
      href: '#',
    })),
  ]

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <Link
              key={proyecto.id}
              href={proyecto.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-purple-300/30 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                {proyecto.imagen ? (
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.nombre}
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

              <div className="p-6 bg-gradient-to-b from-white/5 to-white/10">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">{proyecto.nombre}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full
                      ${
                        proyecto.estado === 'En construcción'
                          ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-300/30'
                          : 'bg-white/10 text-white'
                      }`}
                  >
                    {proyecto.estado}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{proyecto.descripcion}</p>

                <div className="flex flex-wrap gap-2 mb-4">
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
            Contáctanos para primeros proyectos
          </a>
        </div>
      </div>
    </section>
  )
}
