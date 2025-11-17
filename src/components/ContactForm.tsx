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
  service: z.enum(['web', 'mobile', 'consulting', 'portfolio', 'custom', 'other'])
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
        <div
          className="mb-6 p-4 rounded-lg flex items-center"
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}
        >
          <FiCheckCircle
            className="mr-2"
            style={{ color: '#16a34a', fontSize: '1.25rem' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#16a34a'
            }}
          >
            ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)'
              }}
            >
              Nombre completo *
            </label>
            <input
              id="name"
              {...register('name')}
              type="text"
              className="w-full rounded-lg px-4 py-3 transition-all duration-200"
              style={{
                background: 'var(--cream-light)',
                border: '1.5px solid rgba(59, 90, 125, 0.15)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)'
              }}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p
                className="mt-1 text-sm"
                style={{ color: '#dc2626' }}
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)'
              }}
            >
              Email *
            </label>
            <input
              id="email"
              {...register('email')}
              type="email"
              className="w-full rounded-lg px-4 py-3 transition-all duration-200"
              style={{
                background: 'var(--cream-light)',
                border: '1.5px solid rgba(59, 90, 125, 0.15)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)'
              }}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p
                className="mt-1 text-sm"
                style={{ color: '#dc2626' }}
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-2"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
          >
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            {...register('phone')}
            type="tel"
            className="w-full rounded-lg px-4 py-3 transition-all duration-200"
            style={{
              background: 'var(--cream-light)',
              border: '1.5px solid rgba(59, 90, 125, 0.15)',
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium mb-2"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
          >
            ¿Qué servicio te interesa? *
          </label>
          <select
            id="service"
            {...register('service')}
            className="w-full rounded-lg px-4 py-3 transition-all duration-200"
            style={{
              background: 'var(--cream-light)',
              border: '1.5px solid rgba(59, 90, 125, 0.15)',
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
            disabled={isSubmitting}
          >
            <option value="web">E-commerce</option>
            <option value="mobile">Landing Page</option>
            <option value="consulting">Sitio Corporativo</option>
            <option value="portfolio">Portfolio / Marca Personal</option>
            <option value="custom">Sitio a Medida</option>
            <option value="other">Otro tipo de Proyecto</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-2"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
          >
            Mensaje *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className="w-full rounded-lg px-4 py-3 transition-all duration-200 resize-none"
            style={{
              background: 'var(--cream-light)',
              border: '1.5px solid rgba(59, 90, 125, 0.15)',
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-dark)'
            }}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p
              className="mt-1 text-sm"
              style={{ color: '#dc2626' }}
            >
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center justify-center w-full md:w-auto font-semibold px-8 py-4 rounded-full transition-all duration-300 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl'
            }`}
            style={{
              background: 'var(--blue-accent)',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 6px 20px rgba(74, 122, 184, 0.3)'
            }}
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