# Tareas SEO Pendientes (Manuales)

## 🎨 Crear Imagen Open Graph ✅ COMPLETADO

**Estado**: ✅ Imagen creada y configurada
**Archivo**: `/public/og-image.png` (45KB, 1200x630px)
**Configurado en**: `src/app/layout.tsx`

**OPCIÓN RÁPIDA**:
Abre el archivo `generate-og-image.html` en tu navegador y sigue las instrucciones para capturar la imagen.

**Especificaciones**:
- Dimensiones: 1200 x 630 px
- Formato: PNG
- Peso máximo recomendado: 300KB
- Contenido: Logo AFD + "Sitios web modernos que funcionan"
- Colores de marca: Cream (#F5F1E8), Navy (#3B5A7D)

**3 Métodos Disponibles**:

1. **Screenshot de DevTools** (Más rápido)
   - Abre `generate-og-image.html`
   - F12 → Inspeccionar el elemento `.og-container`
   - Click derecho → "Capture node screenshot"
   - Guardar como `public/og-image.png`

2. **Canva** (Más control visual)
   - https://www.canva.com/
   - Diseño personalizado 1200x630px
   - Usar logo de `public/afd-logo.png`

3. **Figma** (Profesional)
   - Frame de 1200x630px
   - Importar logo y texto

**Validación**:
Después de crear la imagen, verifica en:
- OpenGraph.xyz: https://www.opengraph.xyz/
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

## 🔍 Google Search Console

**Urgencia**: Alta

1. **Verificar propiedad** en Google Search Console
   - https://search.google.com/search-console

2. **Obtener código de verificación**
   - Método recomendado: Meta tag HTML

3. **Agregar código** en `src/app/layout.tsx`:
   ```typescript
   verification: {
     google: 'TU_CODIGO_AQUI', // Línea 55
   },
   ```

4. **Enviar sitemap manualmente**:
   - URL: `https://afdsoftworks.com/sitemap.xml`
   - En Search Console > Sitemaps > Agregar nuevo sitemap

---

## 📊 Analytics y Tracking

### Google Analytics 4
1. Crear propiedad en Google Analytics
2. Instalar el script de tracking
3. Configurar eventos personalizados (opcional)

### Microsoft Clarity (Opcional pero recomendado)
- Gratis
- Heatmaps y grabaciones de sesiones
- https://clarity.microsoft.com/

---

## 🌐 Datos de Contacto en Schema.org ✅ COMPLETADO

**Estado**: ✅ Teléfono y redes sociales agregados
**Archivo**: `src/components/StructuredData.tsx`

**Completado**:
- ✅ Teléfono: "+598 92 480 589"
- ✅ Instagram: https://instagram.com/afdsoftworks
- ✅ GitHub: https://github.com/afdsoftworks

**Configurado en**:
- Organization schema (contactPoint.telephone + sameAs)
- LocalBusiness schema (telephone)

---

## 📝 Contenido Adicional Recomendado

### Blog (Opcional pero muy beneficioso para SEO)
- Crear sección `/blog`
- Publicar artículos sobre desarrollo web
- Tutoriales, casos de estudio, noticias del sector
- Frecuencia recomendada: 1-2 posts al mes

### Testimonios de Clientes
- Agregar sección de testimonios
- Usar Schema.org Review markup
- Incluir nombre, empresa y foto del cliente

---

## 🔧 Optimizaciones Técnicas Adicionales

### Comprimir Imágenes
- Favicon actual: 56KB → optimizar a ~20KB
- Herramientas: TinyPNG, Squoosh, ImageOptim

### Lighthouse Score
1. Ejecutar en Chrome DevTools
2. Objetivo: 90+ en todas las categorías
3. Prestar especial atención a:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

---

## 📱 Rich Results Testing

Después del deploy, probar:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

Verificar que todos los schemas (Organization, LocalBusiness, Service) se lean correctamente.

---

## ✅ Checklist Post-Deploy

- [x] Crear imagen Open Graph (og-image.png) ✅
- [ ] Verificar sitio en Google Search Console
- [ ] Agregar código de verificación de Google
- [ ] Enviar sitemap en Search Console
- [x] Completar datos de contacto en Schema.org ✅
- [x] Agregar redes sociales en Schema.org ✅
- [ ] Configurar Google Analytics (opcional)
- [ ] Configurar Microsoft Clarity (opcional)
- [ ] Optimizar imágenes (favicon 55KB→20KB, logo 58KB→20KB) - Usar TinyPNG/Squoosh
- [ ] Ejecutar Lighthouse audit
- [ ] Validar Rich Results
- [ ] Probar compartir en redes sociales

---

## 📈 Monitoreo Continuo

**Semanalmente**:
- Revisar posiciones en Google Search Console
- Verificar errores de indexación
- Monitorear Core Web Vitals

**Mensualmente**:
- Analizar tráfico orgánico
- Actualizar contenido desactualizado
- Agregar nuevos proyectos al portfolio

---

## 🎯 Keywords Principales

Las siguientes keywords ya están optimizadas en el sitio:
- desarrollo web uruguay
- e-commerce uruguay
- landing pages
- sitios corporativos
- portfolios profesionales
- desarrollo web a medida
- programación web

**Considera agregar contenido para**:
- "desarrollo web montevideo" (si aplica)
- "diseño web responsive"
- "aplicaciones web"
- Cualquier nicho específico que te interese posicionar
