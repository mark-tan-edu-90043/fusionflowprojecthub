import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.sait.ca/');
  await page.getByRole('searchbox', { name: 'Search' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('Software Development');
  await page.getByRole('searchbox', { name: 'Search' }).press('Enter');
  await page.getByPlaceholder('Enter your search term here').fill('Software Development');
  await expect(page.getByRole('link', { name: 'Software Development', exact: true })).toBeVisible();
});