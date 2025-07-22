'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FiSend, FiLoader, FiCheckCircle } from 'react-icons/fi'

// Esquema de validación
const formSchema = z.object({
  name: z.string().min(2, { message: 'Nombre muy corto' }).max(50),
  email: z.string().email({ message: 'Email inválido' }),
  message: z.string().min(10, { message: 'Mensaje muy corto' }).max(500),
  phone: z.string().optional(),
  service: z.enum(['web', 'mobile', 'consulting', 'other']).default('web')
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
const {
  register,
  handleSubmit,
  formState: { errors },
  reset
} = useForm<FormData>({
  resolver: zodResolver(formSchema) as Resolver<FormData>
})

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center">
          <FiCheckCircle className="text-green-500 mr-2" />
          <span className="text-green-300">¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre completo *
            </label>
            <input
              id="name"
              {...register('name')}
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email *
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="tel"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
            ¿Qué servicio te interesa? *
          </label>
          <select
            id="service"
            {...register('service')}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSubmitting}
          >
            <option value="web">Desarrollo Web</option>
            <option value="mobile">Aplicaciones Móviles</option>
            <option value="consulting">Consultoría</option>
            <option value="other">Otro</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Mensaje *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              <>
                <FiSend className="mr-2" />
                Enviar mensaje
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}