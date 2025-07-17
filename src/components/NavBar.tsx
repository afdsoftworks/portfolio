import { FiCode} from 'react-icons/fi'

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  return (
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
            <a href="#contacto" className="hidden md:block bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full transition backdrop-blur-sm">
                Contacto
            </a>
        </div>
    </nav>
  )
}
