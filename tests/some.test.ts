import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

['data provider 1', 'data provider 2', 'data provider 3'].map(data => {
  test(data, async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const title = page.locator('.navbar__inner .navbar__title');
    await expect(title).toHaveText('Playwright');




    const gameId = 123
    const requestUrl = 'requrl.com'
    
    const url = page.evaluate(async ({ gameId, requestUrl }) => {
      return fetch(requestUrl)
        .then((r) => r.json())
        .then((d) => {
          const result = d.games.filter((item) => item.gameId === gameId);
          return result.map((item) => item.jsPublicUrl).join('');
        });
    }, { gameId, requestUrl} );

  });
})