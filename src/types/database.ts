/**
 * Tipos generados por Supabase
 * Define la estructura de la base de datos
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          status: 'Desplegado' | 'En Construcción' | 'Próximamente'
          image_url: string | null
          link: string | null
          tags: string[]
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: 'Desplegado' | 'En Construcción' | 'Próximamente'
          image_url?: string | null
          link?: string | null
          tags?: string[]
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'Desplegado' | 'En Construcción' | 'Próximamente'
          image_url?: string | null
          link?: string | null
          tags?: string[]
          order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
