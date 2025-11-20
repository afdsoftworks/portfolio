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
  loop = false, // Cambiado a false para mostrar thumbnail al terminar
  muted = true,
  controls = false,
  width = 800,
  height = 534,
}: MediaDisplayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const [showPoster, setShowPoster] = useState(true)

  // Manejar reproducción en hover
  const handleMouseEnter = () => {
    if (videoRef.current && !autoPlay) {
      setShowPoster(false)
      videoRef.current.play().catch(() => {
        // Si falla el play, no hacer nada
      })
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current && !autoPlay) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setShowPoster(true)
    }
  }

  const handleVideoEnded = () => {
    if (!loop) {
      setShowPoster(true)
      if (videoRef.current) {
        videoRef.current.currentTime = 0
      }
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

    const posterUrl = project.video_poster || project.image_url

    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          controls={controls}
          className={className}
          onError={() => setHasError(true)}
          onEnded={handleVideoEnded}
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
          Tu navegador no soporta el elemento video.
        </video>
        {/* Poster overlay */}
        {posterUrl && showPoster && (
          <div className="absolute inset-0">
            <Image
              src={posterUrl}
              alt={project.title}
              width={width}
              height={height}
              className={className}
              priority={priority}
            />
          </div>
        )}
      </div>
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
