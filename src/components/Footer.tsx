import { FiCode } from 'react-icons/fi'

export default function Footer() {
  return (
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
                        {/* 
                        {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                            <a key={social} href="#" className="text-gray-300 hover:text-white transition" aria-label={social}>
                                {social}
                            </a>
                        ))}
                        */}
                        <a key={'GitHub'} href="https://github.com/afdsoftworks" className="text-gray-300 hover:text-white transition" aria-label={'GitHub'}>
                            {'GitHub'}
                        </a>
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
                        <li> <a href="mailto:afdsoftworks@gmail.com">info@afdsoftworks.com</a></li>
                        <li>(+598) 09X-XXX-XXX</li>
                        <li>Rivera, Uruguay</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} AFDSoftworks. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  )
}
