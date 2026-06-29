import { test, expect } from '@playwright/test';

test.describe.serial('Authentication Flow', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test${Date.now()}@test.com`,
    password: 'password123'
  };

  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input[type="text"]', testUser.username);
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    
    await page.click('button[type="submit"]');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should login successfully and redirect to dashboard', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\//);
    
    // Should see the main app elements
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });

  test('should show error for invalid login', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'wrong@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    
    await page.click('button[type="submit"]');
    
    // Should display error message
    const errorMsg = page.locator('.bg-error-container');
    await expect(errorMsg).toBeVisible();
  });
});
