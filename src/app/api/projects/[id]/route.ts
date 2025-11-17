/**
 * API Route: /api/projects/[id]
 * GET: Obtener un proyecto específico
 * PUT: Actualizar un proyecto
 * DELETE: Eliminar un proyecto
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ProjectUpdateInput } from '@/types/project'

// GET /api/projects/[id] - Obtener un proyecto específico
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!project) {
      return NextResponse.json(
        { error: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project })
  } catch (error: any) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Error al obtener proyecto', message: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Actualizar un proyecto
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body: ProjectUpdateInput = await request.json()

    const { data: project, error } = await supabase
      .from('projects')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ project })
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Error al actualizar proyecto', message: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Eliminar un proyecto
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Proyecto eliminado' })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Error al eliminar proyecto', message: error.message },
      { status: 500 }
    )
  }
}
