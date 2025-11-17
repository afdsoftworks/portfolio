-- ============================================
-- CONFIGURACIÓN DE SUPABASE PARA DASHBOARD ADMIN
-- Portfolio AFD Softworks
-- ============================================

-- 1. CREAR TABLA DE PROYECTOS
-- ============================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Desplegado', 'En Construcción', 'Próximamente')),
  image_url TEXT,
  link TEXT,
  tags TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects("order");
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en la tabla
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede LEER proyectos (para el frontend público)
CREATE POLICY "Anyone can read projects"
  ON public.projects
  FOR SELECT
  USING (true);

-- Política: Solo usuarios autenticados pueden INSERTAR
CREATE POLICY "Authenticated users can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden ACTUALIZAR
CREATE POLICY "Authenticated users can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden ELIMINAR
CREATE POLICY "Authenticated users can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- 3. STORAGE BUCKET PARA IMÁGENES
-- ============================================

-- Crear bucket para imágenes de proyectos
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage: Cualquiera puede VER imágenes
CREATE POLICY "Anyone can view project images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

-- Políticas de Storage: Solo autenticados pueden SUBIR
CREATE POLICY "Authenticated users can upload project images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

-- Políticas de Storage: Solo autenticados pueden ACTUALIZAR
CREATE POLICY "Authenticated users can update project images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');

-- Políticas de Storage: Solo autenticados pueden ELIMINAR
CREATE POLICY "Authenticated users can delete project images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');

-- ============================================
-- 4. INSERTAR PROYECTOS ACTUALES (MIGRACIÓN)
-- ============================================

INSERT INTO public.projects (title, description, status, image_url, link, tags, "order")
VALUES
  (
    'Fronterón MTB',
    'Vive la emoción del MTB en senderos únicos: rutas desafiantes, seguimiento en tiempo real y toda la comunidad de ciclistas en un solo sitio.',
    'Desplegado',
    '/portfolio/fronteron.jpg',
    'https://www.fronteronmtb.com/',
    ARRAY['Next.js', 'Tailwind', 'Node.js'],
    1
  ),
  (
    'Autoclick',
    'Encuentra tu próxima máquina perfecta: amplio catálogo, filtros intuitivos y opciones de financiamiento para que estrenes vehículo sin complicaciones.',
    'Desplegado',
    '/portfolio/autoclick.jpg',
    'https://autoclick.com.uy',
    ARRAY['Next.js', 'Tailwind', 'PostgreSQL'],
    2
  ),
  (
    'AeroFest',
    'Punta del Este se prepara para vivir una experiencia única en 2026: un espectáculo aéreo que reunirá a los mejores pilotos y aeronaves del mundo. Con acrobacias impresionantes, exhibiciones de aviación civil y militar, y un marco inigualable junto al mar, el evento promete emoción, adrenalina y diversión para toda la familia.',
    'En Construcción',
    '/portfolio/aerofest.jpg',
    '',
    ARRAY['Next.js', 'Framer Motion', 'Tailwind'],
    3
  ),
  (
    'Made Bylu',
    'Descubre piezas únicas y hechas con amor: ropa y accesorios artesanales diseñados y confeccionados a mano con materiales de calidad, donde cada creación cuenta una historia y refleja el cuidado por los detalles.',
    'Desplegado',
    '/portfolio/imgMadeByLu.png',
    'https://madebylu.site',
    ARRAY['Next.js', 'E-commerce', 'Tailwind'],
    4
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. VERIFICACIÓN
-- ============================================

-- Ver proyectos insertados
SELECT * FROM public.projects ORDER BY "order";

-- Ver configuración del bucket
SELECT * FROM storage.buckets WHERE id = 'project-images';

-- ============================================
-- NOTAS IMPORTANTES:
-- ============================================
-- 1. Ejecuta este script en el SQL Editor de Supabase
-- 2. Crea un usuario admin en Authentication > Users
-- 3. Las imágenes actuales (/portfolio/*.jpg) seguirán funcionando
--    desde el directorio /public hasta que las migres a Supabase Storage
-- 4. El campo "order" permite drag & drop para reordenar proyectos
-- ============================================
