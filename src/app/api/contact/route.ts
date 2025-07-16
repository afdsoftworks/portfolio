import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Aquí puedes agregar la lógica para enviar el email
    // Por ejemplo, usando Resend, Nodemailer, o un servicio como Formspree
    console.log('Datos del formulario:', body)
    
    // Simulamos un delay de red
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true,
      message: 'Mensaje recibido correctamente' 
    })
    
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}