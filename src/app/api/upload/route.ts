/**
 * API Route: /api/upload
 * POST: Subir imagen a Supabase Storage
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceClient()

    // Verificar autenticación
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó archivo' },
        { status: 400 }
      )
    }

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo JPG, PNG, WEBP' },
        { status: 400 }
      )
    }

    // Validar tamaño (máx 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Archivo muy grande. Máximo 5MB' },
        { status: 400 }
      )
    }

    // Generar nombre único
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`
    const filePath = `projects/${fileName}`

    // Subir a Supabase Storage
    const { error } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath)

    return NextResponse.json({
      url: publicUrl,
      path: filePath,
    })
  } catch (error: unknown) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Error al subir archivo', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/upload - Eliminar imagen de Supabase Storage
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServiceClient()

    // Verificar autenticación
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { path } = await request.json()

    if (!path) {
      return NextResponse.json(
        { error: 'No se proporcionó ruta del archivo' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from('project-images')
      .remove([path])

    if (error) throw error

    return NextResponse.json({ message: 'Archivo eliminado' })
  } catch (error: unknown) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { error: 'Error al eliminar archivo', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
