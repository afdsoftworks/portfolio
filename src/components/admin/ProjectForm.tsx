'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/types/project'
import { FiSave, FiX, FiUpload, FiLoader, FiExternalLink, FiImage, FiVideo } from 'react-icons/fi'
import Image from 'next/image'
import MediaDisplay from '@/components/MediaDisplay'

interface ProjectFormProps {
  project?: Project
  mode: 'create' | 'edit'
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    media_type: (project?.media_type || 'image') as 'image' | 'video',
    image_url: project?.image_url || '',
    video_url: project?.video_url || '',
    video_webm_url: project?.video_webm_url || '',
    video_poster: project?.video_poster || '',
    link: project?.link || '',
    tags: project?.tags?.join(', ') || '',
    status: project?.status || 'En Construcción',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMediaTypeChange = (type: 'image' | 'video') => {
    setFormData(prev => ({ ...prev, media_type: type }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    const isVideoField = fieldName === 'video_url' || fieldName === 'video_webm_url'
    const isImageField = fieldName === 'image_url' || fieldName === 'video_poster'

    if (isVideoField && !file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video')
      return
    }
    if (isImageField && !file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen')
      return
    }

    // Validar tamaño
    const maxSize = isVideoField ? 50 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`Archivo muy grande. Máximo ${isVideoField ? '50MB' : '5MB'}`)
      return
    }

    setUploading(true)
    try {
      const supabase = createClient()

      // Generar nombre único
      const timestamp = Date.now()
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`
      const filePath = `projects/${fileName}`

      // Subir directamente a Supabase Storage
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

      setFormData(prev => ({ ...prev, [fieldName]: publicUrl }))
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error al subir el archivo')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Construir payload SOLO con campos que existen en la base de datos
      const payload: {
        title: string
        description: string
        status: string
        media_type: 'image' | 'video'
        image_url?: string | null
        video_url?: string | null
        video_webm_url?: string | null
        video_poster?: string | null
        link?: string | null
        tags: string[]
      } = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        media_type: formData.media_type,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      }

      // Solo incluir campos relevantes según el tipo de media
      if (formData.media_type === 'image') {
        if (formData.image_url) payload.image_url = formData.image_url
      } else {
        if (formData.video_url) payload.video_url = formData.video_url
        if (formData.video_webm_url) payload.video_webm_url = formData.video_webm_url
        if (formData.video_poster) payload.video_poster = formData.video_poster
        if (formData.image_url) payload.image_url = formData.image_url // Fallback
      }

      if (formData.link) payload.link = formData.link

      const url = mode === 'create' ? '/api/projects' : `/api/projects/${project?.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/proyectos')
        router.refresh()
      } else {
        const error = await res.json()
        alert(`Error: ${error.message || 'No se pudo guardar el proyecto'}`)
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error al guardar el proyecto')
    } finally {
      setLoading(false)
    }
  }

  // Vista previa de tags
  const previewTags = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : []

  // Color del estado
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

  const statusColors = getStatusColor(formData.status)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Selector de tipo de media */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Tipo de Media
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleMediaTypeChange('image')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all"
                style={{
                  background: formData.media_type === 'image' ? 'var(--blue-accent)' : 'var(--cream-light)',
                  color: formData.media_type === 'image' ? 'var(--white)' : 'var(--text-dark)',
                  border: `2px solid ${formData.media_type === 'image' ? 'var(--blue-accent)' : 'rgba(59, 90, 125, 0.2)'}`,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <FiImage />
                Imagen
              </button>
              <button
                type="button"
                onClick={() => handleMediaTypeChange('video')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all"
                style={{
                  background: formData.media_type === 'video' ? 'var(--blue-accent)' : 'var(--cream-light)',
                  color: formData.media_type === 'video' ? 'var(--white)' : 'var(--text-dark)',
                  border: `2px solid ${formData.media_type === 'video' ? 'var(--blue-accent)' : 'rgba(59, 90, 125, 0.2)'}`,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                <FiVideo />
                Video
              </button>
            </div>
          </div>

          {/* Upload de Imagen (siempre visible como fallback para videos) */}
          {formData.media_type === 'image' && (
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
                Imagen del Proyecto
              </label>
              <div className="flex items-start gap-4">
                {formData.image_url && (
                  <div className="w-48 h-32 relative rounded-lg overflow-hidden" style={{ background: 'var(--cream-light)' }}>
                    <Image src={formData.image_url} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <label
                  className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  style={{
                    background: uploading ? 'var(--cream-light)' : 'var(--blue-accent)',
                    color: uploading ? 'var(--text-gray)' : 'var(--white)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
                  {uploading ? 'Subiendo...' : 'Subir Imagen'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image_url')}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Upload de Videos */}
          {formData.media_type === 'video' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
                  Video MP4 (Requerido)
                </label>
                <div className="flex items-start gap-4">
                  {formData.video_url && (
                    <div className="w-48 h-32 relative rounded-lg overflow-hidden" style={{ background: 'var(--cream-light)' }}>
                      <video src={formData.video_url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                    </div>
                  )}
                  <label
                    className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    style={{
                      background: uploading ? 'var(--cream-light)' : 'var(--blue-accent)',
                      color: uploading ? 'var(--text-gray)' : 'var(--white)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
                    {uploading ? 'Subiendo...' : 'Subir MP4'}
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={(e) => handleFileUpload(e, 'video_url')}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs mt-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-gray)' }}>
                  Recomendado: 720p-1080p, 30fps, máx 10MB
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
                  Video WebM (Opcional - Mejor compresión)
                </label>
                <label
                  className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors inline-flex"
                  style={{
                    background: uploading ? 'var(--cream-light)' : 'rgba(74, 122, 184, 0.1)',
                    color: 'var(--blue-accent)',
                    border: '1px solid rgba(74, 122, 184, 0.3)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
                  {uploading ? 'Subiendo...' : formData.video_webm_url ? 'Cambiar WebM' : 'Subir WebM'}
                  <input
                    type="file"
                    accept="video/webm"
                    onChange={(e) => handleFileUpload(e, 'video_webm_url')}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
                  Imagen Poster (Thumbnail del video)
                </label>
                <div className="flex items-start gap-4">
                  {formData.video_poster && (
                    <div className="w-48 h-32 relative rounded-lg overflow-hidden" style={{ background: 'var(--cream-light)' }}>
                      <Image src={formData.video_poster} alt="Poster" fill className="object-cover" />
                    </div>
                  )}
                  <label
                    className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    style={{
                      background: uploading ? 'var(--cream-light)' : 'rgba(74, 122, 184, 0.1)',
                      color: 'var(--blue-accent)',
                      border: '1px solid rgba(74, 122, 184, 0.3)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
                    {uploading ? 'Subiendo...' : 'Subir Poster'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'video_poster')}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </>
          )}

          {/* Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'var(--cream-light)',
                border: '1px solid rgba(59, 90, 125, 0.2)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Descripción *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'var(--cream-light)',
                border: '1px solid rgba(59, 90, 125, 0.2)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Link del Proyecto
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'var(--cream-light)',
                border: '1px solid rgba(59, 90, 125, 0.2)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Tags (separados por comas)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Next.js, TailwindCSS, TypeScript"
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'var(--cream-light)',
                border: '1px solid rgba(59, 90, 125, 0.2)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Estado */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-dark)' }}>
              Estado
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg"
              style={{
                background: 'var(--cream-light)',
                border: '1px solid rgba(59, 90, 125, 0.2)',
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-dark)',
              }}
            >
              <option value="En Construcción">En Construcción</option>
              <option value="Desplegado">Desplegado</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
              style={{
                background: loading ? 'var(--cream-light)' : 'var(--blue-accent)',
                color: loading ? 'var(--text-gray)' : 'var(--white)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
              {loading ? 'Guardando...' : 'Guardar Proyecto'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
              style={{
                background: 'var(--cream-light)',
                color: 'var(--text-dark)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              <FiX />
              Cancelar
            </button>
          </div>
        </div>
      </form>

      {/* Vista Previa */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="mb-4">
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: 'var(--text-dark)', fontSize: '1.25rem', fontWeight: 600 }}>
            Vista Previa
          </h3>
          <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-gray)', fontSize: '0.875rem' }}>
            Así se verá tu proyecto
          </p>
        </div>

        <div
          className="rounded-xl overflow-hidden transition-all duration-200"
          style={{
            background: 'var(--white)',
            border: '1px solid rgba(59, 90, 125, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Media del proyecto */}
          <div
            className="w-full h-56 flex items-center justify-center relative"
            style={{ background: 'var(--cream-light)' }}
          >
            {(formData.image_url || formData.video_url) ? (
              <MediaDisplay
                project={{
                  media_type: formData.media_type,
                  image_url: formData.image_url,
                  video_url: formData.video_url,
                  video_webm_url: formData.video_webm_url,
                  video_poster: formData.video_poster,
                  title: formData.title || 'Preview',
                }}
                className="object-cover w-full h-full"
                width={800}
                height={534}
                autoPlay={true}
                loop={true}
                muted={true}
              />
            ) : (
              <div style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-gray)', textAlign: 'center' }}>
                <FiUpload size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Sin media</p>
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3
                className="text-xl font-bold flex-1"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  color: 'var(--text-dark)',
                }}
              >
                {formData.title || 'Título del Proyecto'}
              </h3>
              <span
                className="text-xs px-2.5 py-1 rounded-full ml-2 whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-inter)',
                  background: statusColors.bg,
                  color: statusColors.color,
                  border: `1px solid ${statusColors.border}`,
                }}
              >
                {formData.status}
              </span>
            </div>

            <p
              className="text-sm mb-4"
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-gray)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {formData.description || 'Descripción del proyecto...'}
            </p>

            {/* Tags */}
            {previewTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {previewTags.slice(0, 5).map((tag, i) => (
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
                {previewTags.length > 5 && (
                  <span
                    className="text-xs px-2 py-1"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: 'var(--text-gray)',
                    }}
                  >
                    +{previewTags.length - 5}
                  </span>
                )}
              </div>
            )}

            {/* Link */}
            {formData.link && (
              <div className="flex gap-2">
                <a
                  href={formData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  style={{
                    background: 'var(--blue-accent)',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-inter)',
                  }}
                >
                  <FiExternalLink size={12} />
                  Ver Proyecto
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
