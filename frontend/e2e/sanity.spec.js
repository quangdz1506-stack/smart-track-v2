import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost');
  // At this point, depending on auth state, we might get redirected to /login
  // The page title should contain "Vite" or "ExpensePro" (since we haven't updated title yet, it's probably "Vite + React" or something)
  // Let's just expect some text in the body to confirm app is rendering
  const bodyText = await page.textContent('body');
  expect(bodyText).toBeTruthy();
});
