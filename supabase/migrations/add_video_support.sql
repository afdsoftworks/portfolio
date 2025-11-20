-- Migración: Agregar soporte para videos en proyectos
-- Fecha: 2025-11-17

-- Agregar columnas para videos
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS video_webm_url TEXT,
ADD COLUMN IF NOT EXISTS video_poster TEXT;

-- Crear índice para búsquedas por tipo de media
CREATE INDEX IF NOT EXISTS idx_projects_media_type ON projects(media_type);

-- Comentarios para documentación
COMMENT ON COLUMN projects.media_type IS 'Tipo de media del proyecto: image o video';
COMMENT ON COLUMN projects.video_url IS 'URL del video MP4 del proyecto';
COMMENT ON COLUMN projects.video_webm_url IS 'URL del video WebM del proyecto (opcional, mejor compresión)';
COMMENT ON COLUMN projects.video_poster IS 'URL de la imagen poster/thumbnail del video';
