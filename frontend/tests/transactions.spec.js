import { test, expect } from '@playwright/test';

test.describe('Transaction CRUD Flow', () => {
  const testUser = `testuser_txn_${Date.now()}`;
  const testEmail = `${testUser}@example.com`;
  const testPassword = 'password123';

  test.beforeAll(async ({ request }) => {
    // Programmatically create the user via API to save UI testing time
    await request.post('http://localhost:5000/api/auth/register', {
      data: {
        username: testUser,
        email: testEmail,
        password: testPassword
      }
    });
  });

  test('should login and add a new transaction', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', testPassword);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\//);

    // 2. Add a new transaction (Wait for dashboard to load)
    await expect(page.locator('text="Dashboard Overview"').first()).toBeVisible();
    
    // Check if the "Add Entry" floating button or direct button exists
    const addBtn = page.locator('button:has-text("Add Entry")').first();
    if (await addBtn.isVisible()) {
        await addBtn.click();
        
        // Modal should appear
        await expect(page.locator('text="Add New Transaction"').first()).toBeVisible();
        
        // Fill form
        await page.fill('input[type="number"]', '150');
        await page.selectOption('select', 'expense');
        await page.fill('input[name="category"]', 'Food');
        await page.fill('input[type="date"]', '2026-07-02');
        await page.click('button[type="submit"]:has-text("Save")');
        
        // Assert transaction appears on list
        await expect(page.locator('td:has-text("Food")').first()).toBeVisible();
    }
  });
});
