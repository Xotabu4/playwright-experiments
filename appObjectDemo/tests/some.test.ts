import { test, expect } from '@playwright/test';
import { App } from '../pages/app';

test('example test', async ({ page }) => {
  const app = App(page);

  await app.login.open();
  await app.login.doLogin('test@test.com');

  await expect(await page.locator('div').innerText()).toHaveText('logged in');
});
