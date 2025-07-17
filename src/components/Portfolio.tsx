import { FiCode } from 'react-icons/fi'

export default function Portfolio() {
  return (
    <section id="proyectos" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro 
                    <span className="text-purple-300">Portafolio</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Pronto estarán disponibles ejemplos de nuestros trabajos</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-purple-300/30 transition-all duration-300">
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
                <a href="#contacto" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 hover:scale-105 transition-transform duration-300">
                    Contáctanos para primeros proyectos
                </a>
            </div>
        </div>
    </section>
  )
}
