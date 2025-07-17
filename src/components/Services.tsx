import {  
  FiCheckCircle, 
  FiLayers, 
  FiSmartphone
} from 'react-icons/fi'

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

export default function Services() {
  return (
    <section id="servicios" className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros 
                    <span className="text-purple-300">Servicios</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Ofrecemos soluciones integrales para todas tus necesidades digitales</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <div key={index} className="bg-gradient-to-b from-white/5 to-white/10 p-8 rounded-2xl border border-white/10 hover:border-purple-300/30 hover:translate-y-[-5px] transition-all duration-300">
                    <div className="text-purple-300 text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                </div>
            ))}
            </div>
        </div>
    </section>
  )
}
