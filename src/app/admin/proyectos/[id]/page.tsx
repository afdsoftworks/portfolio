'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/admin/Header'
import ProjectForm from '@/components/admin/ProjectForm'
import { Project } from '@/types/project'
import { FiLoader } from 'react-icons/fi'

export const dynamic = 'force-dynamic'

export default function EditProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/projects/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setProject(data.project)
      } else {
        setError('Proyecto no encontrado')
      }
    } catch (err) {
      console.error('Error fetching project:', err)
      setError('Error al cargar el proyecto')
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl" style={{ color: 'var(--blue-accent)' }} />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div>
        <Header title="Error" description={error || 'Proyecto no encontrado'} />
        <div className="p-8">
          <div
            className="p-6 rounded-xl text-center"
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <p style={{ fontFamily: 'var(--font-inter)', color: '#dc2626' }}>
              {error || 'Proyecto no encontrado'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Editar Proyecto"
        description={`Editando: ${project.title}`}
      />
      <div className="p-8">
        <ProjectForm project={project} mode="edit" />
      </div>
    </div>
  )
}
