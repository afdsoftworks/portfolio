'use client'

import Header from '@/components/admin/Header'
import ProjectForm from '@/components/admin/ProjectForm'

export const dynamic = 'force-dynamic'

export default function NewProjectPage() {
  return (
    <div>
      <Header
        title="Nuevo Proyecto"
        description="Crea un nuevo proyecto para tu portfolio"
      />
      <div className="p-8">
        <ProjectForm mode="create" />
      </div>
    </div>
  )
}
