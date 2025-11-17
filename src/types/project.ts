/**
 * Tipos TypeScript para Proyectos
 * Sincronizados con la tabla 'projects' de Supabase
 */

import { Database } from './database'

export type ProjectStatus = 'Desplegado' | 'En Construcción' | 'Próximamente'

export type Project = Database['public']['Tables']['projects']['Row']

export interface ProjectFormData {
  title: string
  description: string
  status: ProjectStatus
  image_url?: string | null
  link?: string | null
  tags: string[]
}

export type ProjectCreateInput = Database['public']['Tables']['projects']['Insert']

export type ProjectUpdateInput = Database['public']['Tables']['projects']['Update']

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
