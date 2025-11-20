/**
 * API Route: /api/upload
 * POST: Subir imagen o video a Supabase Storage
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
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

    // Validar tipo de archivo (imágenes y videos)
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    const allAllowedTypes = [...allowedImageTypes, ...allowedVideoTypes]

    if (!allAllowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo JPG, PNG, WEBP, MP4, WEBM' },
        { status: 400 }
      )
    }

    // Determinar si es imagen o video
    const isVideo = allowedVideoTypes.includes(file.type)

    // Validar tamaño según tipo de archivo
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024 // 50MB para videos, 5MB para imágenes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Archivo muy grande. Máximo ${isVideo ? '50MB' : '5MB'}` },
        { status: 400 }
      )
    }

    // Generar nombre único
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`
    const filePath = `projects/${fileName}`

    // Subir a Supabase Storage (usar mismo bucket para imágenes y videos)
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

// DELETE /api/upload - Eliminar archivo de Supabase Storage
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
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
