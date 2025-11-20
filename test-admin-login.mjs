import { chromium } from 'playwright';

async function testAdminLogin() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Escuchar errores de consola y de página
    const consoleMessages = [];
    const pageErrors = [];

    page.on('console', msg => {
      const text = `[${msg.type()}] ${msg.text()}`;
      consoleMessages.push(text);
      console.log('CONSOLE:', text);
    });

    page.on('pageerror', error => {
      pageErrors.push(error.message);
      console.log('PAGE ERROR:', error.message);
      console.log('ERROR STACK:', error.stack);
    });

    console.log('🌐 Navegando a http://localhost:3000/admin/login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });

    console.log('📄 Contenido HTML de la página:');
    const html = await page.content();
    console.log(html);

    // Guardar HTML completo
    const fs = await import('fs');
    fs.writeFileSync('page-content.html', html);
    console.log('💾 HTML guardado en page-content.html');

    console.log('⏳ Esperando que cargue el formulario de login...');
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });

    console.log('📧 Ingresando email...');
    await page.fill('input[type="email"]', 'paxteson@gmail.com');

    console.log('🔒 Ingresando contraseña...');
    await page.fill('input[type="password"]', 'deomar0614*');

    console.log('🚀 Haciendo clic en "Ingresar"...');
    await page.click('button[type="submit"]');

    console.log('⏳ Esperando redirección...');
    await page.waitForURL('**/admin/proyectos', { timeout: 10000 });

    console.log('✅ Login exitoso! URL actual:', page.url());

    // Esperar un poco para que se cargue completamente
    await page.waitForTimeout(3000);

    // Tomar screenshot
    await page.screenshot({ path: 'admin-dashboard.png', fullPage: true });
    console.log('📸 Screenshot guardado como admin-dashboard.png');

    // Mostrar resumen de errores
    console.log('\n📊 Resumen de errores capturados:');
    console.log('Total de errores:', pageErrors.length);
    if (pageErrors.length > 0) {
      console.log('\n🔴 Errores de página:');
      pageErrors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
    }

    // Mostrar mensajes de consola con error o warning
    const errorLogs = consoleMessages.filter(msg => msg.includes('[error]') || msg.includes('[warning]'));
    if (errorLogs.length > 0) {
      console.log('\n⚠️ Mensajes de error/warning en consola:');
      errorLogs.forEach((msg, i) => console.log(`${i + 1}. ${msg}`));
    }

    // Esperar un poco más
    console.log('\n👀 Esperando 2 segundos más...');
    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('❌ Error:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
    console.log('📸 Screenshot del error guardado como error-screenshot.png');
  } finally {
    await browser.close();
  }
}

testAdminLogin();
