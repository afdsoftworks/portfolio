/**
 * Tipos TypeScript para Proyectos
 * Sincronizados con la tabla 'projects' de Supabase
 */

export type ProjectStatus = 'Desplegado' | 'En Construcción' | 'Próximamente'

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  image_url: string | null
  link: string | null
  tags: string[]
  order: number
  created_at: string
  updated_at: string
}

export interface ProjectFormData {
  title: string
  description: string
  status: ProjectStatus
  image_url?: string | null
  link?: string | null
  tags: string[]
}

export interface ProjectCreateInput extends ProjectFormData {
  order?: number
}

export interface ProjectUpdateInput extends Partial<ProjectFormData> {
  order?: number
}

// Para el formulario con archivo de imagen
export interface ProjectFormWithImage extends ProjectFormData {
  imageFile?: File | null
}

// Respuesta de la API
export interface ProjectsResponse {
  projects: Project[]
  total: number
}

export interface ProjectResponse {
  project: Project
}

export interface ProjectError {
  error: string
  message: string
}
