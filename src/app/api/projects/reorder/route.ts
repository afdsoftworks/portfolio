import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * PUT /api/projects/reorder
 * Actualiza el orden de los proyectos
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener el nuevo orden desde el body
    const body = await request.json() as { projects: Array<{ id: string; order: number }> }

    if (!body.projects || !Array.isArray(body.projects)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
    }

    // Actualizar el orden de cada proyecto
    const updates = body.projects.map(async (project) => {
      const { error } = await supabase
        .from('projects')
        .update({ order: project.order })
        .eq('id', project.id)

      if (error) throw error
    })

    await Promise.all(updates)

    return NextResponse.json({ success: true, message: 'Orden actualizado correctamente' })
  } catch (error: unknown) {
    console.error('Error updating project order:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el orden', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
