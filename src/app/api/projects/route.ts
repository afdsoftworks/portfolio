/**
 * API Route: /api/projects
 * GET: Obtener todos los proyectos
 * POST: Crear un nuevo proyecto
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ProjectCreateInput } from '@/types/project'

// GET /api/projects - Obtener todos los proyectos
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      projects,
      total: projects?.length || 0,
    })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Error al obtener proyectos', message: error.message },
      { status: 500 }
    )
  }
}

// POST /api/projects - Crear un nuevo proyecto
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

    const body: ProjectCreateInput = await request.json()

    // Obtener el último order para incrementar
    const { data: lastProject } = await supabase
      .from('projects')
      .select('order')
      .order('order', { ascending: false })
      .limit(1)
      .single()

    const newOrder = (lastProject?.order || 0) + 1

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        ...body,
        order: body.order ?? newOrder,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Error al crear proyecto', message: error.message },
      { status: 500 }
    )
  }
}
