'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Project } from '@/types/project'

interface MediaDisplayProps {
  project: Pick<Project, 'media_type' | 'image_url' | 'video_url' | 'video_webm_url' | 'video_poster' | 'title'>
  className?: string
  priority?: boolean
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  width?: number
  height?: number
}

export default function MediaDisplay({
  project,
  className = '',
  priority = false,
  autoPlay = false, // Cambiado a false por defecto
  loop = true,
  muted = true,
  controls = false,
  width = 800,
  height = 534,
}: MediaDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)

  // Manejar reproducción en hover
  const handleMouseEnter = () => {
    if (videoRef.current && !autoPlay) {
      videoRef.current.play().catch(() => {
        // Si falla el play, no hacer nada
      })
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && !autoPlay) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0 // Reiniciar al inicio
    }
  }

  // Si es un video y tiene URLs
  if (project.media_type === 'video' && (project.video_url || project.video_webm_url)) {
    if (hasError) {
      // Fallback a imagen si el video falla
      return project.image_url ? (
        <Image
          src={project.image_url}
          alt={project.title}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
      ) : (
        <div className={`flex items-center justify-center ${className}`} style={{ background: 'var(--cream-light)' }}>
          <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-gray)' }}>
            Sin media
          </p>
        </div>
      )
    }

    return (
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        poster={project.video_poster || project.image_url || undefined}
        className={className}
        onError={() => setHasError(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        preload="metadata"
      >
        {/* WebM primero (mejor compresión) */}
        {project.video_webm_url && (
          <source src={project.video_webm_url} type="video/webm" />
        )}
        {/* MP4 como fallback (mayor compatibilidad) */}
        {project.video_url && (
          <source src={project.video_url} type="video/mp4" />
        )}
        {/* Fallback a imagen si el navegador no soporta video */}
        {project.image_url && (
          <Image
            src={project.image_url}
            alt={project.title}
            width={width}
            height={height}
            className={className}
          />
        )}
        Tu navegador no soporta el elemento video.
      </video>
    )
  }

  // Si es imagen o no tiene video, mostrar imagen
  if (project.image_url) {
    return (
      <Image
        src={project.image_url}
        alt={project.title}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    )
  }

  // Sin media
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ background: 'var(--cream-light)' }}>
      <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-gray)' }}>
        Sin media
      </p>
    </div>
  )
}
