'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/admin/Header'
import { Project } from '@/types/project'
import { FiPlus, FiEdit, FiTrash2, FiExternalLink, FiLoader } from 'react-icons/fi'
import Image from 'next/image'

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id))
      } else {
        alert('Error al eliminar proyecto')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error al eliminar proyecto')
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Desplegado':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.3)' }
      case 'En Construcción':
        return { bg: 'rgba(234, 179, 8, 0.1)', color: '#ca8a04', border: 'rgba(234, 179, 8, 0.3)' }
      default:
        return { bg: 'var(--cream-light)', color: 'var(--text-gray)', border: 'rgba(59, 90, 125, 0.1)' }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl" style={{ color: 'var(--blue-accent)' }} />
      </div>
    )
  }

  return (
    <div>
      <Header
        title="Proyectos"
        description="Gestiona los proyectos del portfolio"
        action={
          <button
            onClick={() => router.push('/admin/proyectos/nuevo')}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'var(--blue-accent)',
              color: 'var(--white)',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 4px 12px rgba(74, 122, 184, 0.3)',
            }}
          >
            <FiPlus size={20} />
            Nuevo Proyecto
          </button>
        }
      />

      <div className="p-8">
        {projects.length === 0 ? (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              background: 'var(--white)',
              border: '1px solid rgba(59, 90, 125, 0.1)',
            }}
          >
            <p
              className="text-lg mb-4"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-gray)',
              }}
            >
              No hay proyectos aún
            </p>
            <button
              onClick={() => router.push('/admin/proyectos/nuevo')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
              style={{
                background: 'var(--blue-accent)',
                color: 'var(--white)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              <FiPlus />
              Crear Primer Proyecto
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const statusColors = getStatusColor(project.status)

              return (
                <div
                  key={project.id}
                  className="rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid rgba(59, 90, 125, 0.1)',
                  }}
                >
                  {/* Image */}
                  <div
                    className="w-full h-48 flex items-center justify-center"
                    style={{ background: 'var(--cream-light)' }}
                  >
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <p
                          style={{
                            fontFamily: 'var(--font-inter)',
                            color: 'var(--text-gray)',
                            opacity: 0.5,
                          }}
                        >
                          Sin imagen
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="text-lg font-bold flex-1"
                        style={{
                          fontFamily: 'var(--font-playfair)',
                          color: 'var(--text-dark)',
                        }}
                      >
                        {project.title}
                      </h3>
                      <span
                        className="text-xs px-2.5 py-1 rounded-full ml-2"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          background: statusColors.bg,
                          color: statusColors.color,
                          border: `1px solid ${statusColors.border}`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p
                      className="text-sm mb-3 line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        color: 'var(--text-gray)',
                      }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            background: 'var(--cream-light)',
                            color: 'var(--navy-dark)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            fontFamily: 'var(--font-inter)',
                            color: 'var(--text-gray)',
                          }}
                        >
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/proyectos/${project.id}`)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors"
                        style={{
                          background: 'var(--blue-accent)',
                          color: 'var(--white)',
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.875rem',
                        }}
                      >
                        <FiEdit size={16} />
                        Editar
                      </button>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-2 rounded-lg transition-colors"
                          style={{
                            background: 'var(--cream-light)',
                            color: 'var(--text-dark)',
                          }}
                        >
                          <FiExternalLink size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="flex items-center justify-center px-3 py-2 rounded-lg transition-colors"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#dc2626',
                        }}
                      >
                        {deleting === project.id ? (
                          <FiLoader className="animate-spin" size={16} />
                        ) : (
                          <FiTrash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
