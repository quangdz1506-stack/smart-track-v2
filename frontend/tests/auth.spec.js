import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const testUser = `testuser_${Date.now()}`;
  const testEmail = `${testUser}@example.com`;
  const testPassword = 'password123';

  test('should register a new user, fail on duplicate, and login successfully', async ({ page }) => {
    // 1. Navigate to login and click register
    await page.goto('/login');
    await expect(page).toHaveTitle(/ExpensePro/i);
    
    await page.click('text="Register here"');
    await expect(page.url()).toContain('/register');

    // 2. Fill out registration form
    await page.fill('input[type="text"]', testUser);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    // 3. Should redirect to login on success
    await expect(page).toHaveURL(/\/login/);

    // 4. Try to register same user again (duplicate test)
    await page.goto('/register');
    await page.fill('input[type="text"]', testUser);
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    
    // Expect error message
    const errorMsg = page.locator('.bg-error-container');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('User already exists');

    // 5. Login with new user
    await page.goto('/login');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');

    // 6. Should redirect to dashboard
    await expect(page).toHaveURL(/\//);
    await expect(page.locator('h1')).toBeVisible(); // Overview Dashboard header or similar
  });
});
