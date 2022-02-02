import { test, expect } from '@playwright/test';
import { App } from '../pages/app';


const extendedTest = test.extend<{ app: ReturnType<typeof App> }>({
  app: async ({ page }, use) => {
    await use(App(page));
  }
})

extendedTest('example test', async ({ page, app }) => {
  await app.login.open();
  await app.login.doLogin('test@test.com');

  await expect(await page.locator('div')).toHaveText('logged in');
});
