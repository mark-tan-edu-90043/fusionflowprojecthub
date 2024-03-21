import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Admin Sign in' }).click();
  await page.locator('div').filter({ hasText: /^Email Address$/ }).locator('div').click();
  await page.locator('input[type="text"]').fill('admin@admin.com');
  await page.locator('input[type="text"]').press('Tab');
  await page.locator('input[type="password"]').fill('password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Admin Panel').click();
  await expect(page.getByText('Staff Management')).toBeVisible();
});

test('failedLogin', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Admin Sign in' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('asdf@asdf.com');
  await page.locator('input[type="text"]').press('Tab');
  await page.locator('input[type="password"]').fill('asdfdasfasdf');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('Incorrect email or password.')).toBeVisible();
});

test('insufficientpermsLogin', async ({ page }) => {
  await page.goto('http://localhost:3001/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Admin Sign in' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('account@account.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText('You do not have permission to')).toBeVisible();
});