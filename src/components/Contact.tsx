import { ContactForm } from '@/components/ContactForm'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacta con 
                    <span className="text-purple-300"> Nosotros</span>
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">Completa el formulario y nos pondremos en contacto contigo lo antes posible</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <ContactForm />
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                    <a href="mailto:afdsoftworks@gmail.com" className="text-purple-300 hover:text-purple-200">
                        contacto@afdsoftworks.com
                    </a>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
                    <a href="tel:+5989XXXXXXX" className="text-purple-300 hover:text-purple-200">
                        (+598) 09X-XXX-XXX
                    </a>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold mb-2">Redes Sociales</h3>
                    <div className="flex justify-center space-x-4">
                        {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                            <a key={social} href="#" className="text-gray-300 hover:text-white transition" aria-label={social}>
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
