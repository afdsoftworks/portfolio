import { chromium } from 'playwright';

async function testEditProject() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    console.log('1. Navegando y haciendo login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', 'paxteson@gmail.com');
    await page.fill('input[type="password"]', 'deomar0614*');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/proyectos', { timeout: 10000 });

    console.log('2. Esperando a que se cargue la lista de proyectos...');
    await page.waitForTimeout(2000);

    console.log('3. Haciendo clic en el primer botón "Editar"...');
    const editButton = await page.locator('button:has-text("Editar")').first();
    await editButton.click();

    console.log('4. Esperando a que cargue la página de edición...');
    await page.waitForURL('**/admin/proyectos/**', { timeout: 10000 });
    await page.waitForTimeout(2000);

    const currentURL = page.url();
    console.log('✅ URL actual:', currentURL);

    // Verificar que el formulario esté presente
    const titleInput = await page.locator('input[name="title"]').count();
    const descriptionInput = await page.locator('textarea[name="description"]').count();

    if (titleInput > 0 && descriptionInput > 0) {
      console.log('✅ Formulario de edición cargado correctamente');

      // Obtener el título del proyecto
      const title = await page.locator('input[name="title"]').inputValue();
      console.log('📝 Editando proyecto:', title);
    } else {
      console.log('❌ No se encontró el formulario');
    }

    // Tomar screenshot
    await page.screenshot({ path: 'edit-project-page.png', fullPage: true });
    console.log('📸 Screenshot guardado como edit-project-page.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'edit-error.png' });
  } finally {
    await browser.close();
  }
}

testEditProject();
