import { FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  return (
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
                <a href="#contacto" className="inline-flex items-center justify-center bg-white text-indigo-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform duration-300">
                    Contactar ahora <FiArrowRight className="ml-2" />
                </a>
                <a href="#servicios" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:scale-105 transition-transform duration-300">
                    Nuestros servicios
                </a>
            </div>
        </div>
    </section>
  )
}
