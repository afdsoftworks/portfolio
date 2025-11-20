import { chromium } from 'playwright';

async function checkDashboardErrors() {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  const errors = [];

  page.on('pageerror', error => {
    errors.push({
      type: 'PAGE_ERROR',
      message: error.message,
      stack: error.stack
    });
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({
        type: 'CONSOLE_ERROR',
        message: msg.text()
      });
    }
  });

  try {
    console.log('Navegando y haciendo login...');
    await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle' });
    await page.fill('input[type="email"]', 'paxteson@gmail.com');
    await page.fill('input[type="password"]', 'deomar0614*');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/proyectos', { timeout: 10000 });

    console.log('Esperando a que se cargue el dashboard...');
    await page.waitForTimeout(5000);

    console.log('\n=== ERRORES CAPTURADOS ===\n');
    if (errors.length === 0) {
      console.log('✅ No se encontraron errores');
    } else {
      errors.forEach((err, i) => {
        console.log(`\n${i + 1}. [${err.type}]`);
        console.log('Mensaje:', err.message);
        if (err.stack) {
          console.log('Stack:', err.stack.substring(0, 500));
        }
      });
    }

    await page.screenshot({ path: 'dashboard-final.png', fullPage: true });
    console.log('\n📸 Screenshot guardado como dashboard-final.png');

  } catch (error) {
    console.error('Error durante la prueba:', error.message);
  } finally {
    await browser.close();
  }
}

checkDashboardErrors();
