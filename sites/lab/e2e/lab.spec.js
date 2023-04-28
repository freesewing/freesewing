import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:8000/')
  await page.getByRole('button', { name: 'Designs' }).click()
  await page.getByRole('link', { name: 'albert' }).click()
  await page.goto('http://localhost:8000/albert')
  await page
    .getByRole('list')
    .filter({ hasText: 'Size 28Size 30Size 32Size 34Size 36Size 38Size 40Size 42Size 44Size 46' })
    .getByRole('button', { name: 'Size 36' })
    .click()
  await page.getByTitle('draftDesign').click()

  await expect(page.getByText('Something went wrong')).toHaveCount(0)
  await expect(page.getByText('Unhandled Runtime Error')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '° Measurements' })).toBeVisible()
})
