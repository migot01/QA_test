/**
 * E2E: Critical user journey – full booking flow (happy path).
 * Covers: Postcode → Address → Waste → Skip → Review → Confirm.
 */
import { test, expect } from '@playwright/test'

test.describe('Booking flow – happy path', () => {
  test('complete booking from postcode to confirmation', async ({ page }) => {
    await page.goto('/')

    // Step 1 – Postcode & address
    await expect(page.getByRole('heading', { name: /postcode & address/i })).toBeVisible()
    await page.getByRole('textbox', { name: /postcode/i }).fill('SW1A 1AA')
    await page.getByRole('button', { name: /find address/i }).click()
    await expect(page.getByText('10 Downing Street')).toBeVisible({ timeout: 5000 })
    await page.getByRole('button', { name: '10 Downing Street', exact: false }).first().click()
    await page.getByRole('button', { name: 'Continue' }).click()

    // Step 2 – Waste type
    await expect(page.getByRole('heading', { name: /waste type/i })).toBeVisible()
    await page.getByTestId('waste-general').check()
    await page.getByRole('button', { name: 'Continue' }).click()

    // Step 3 – Skip selection
    await expect(page.getByRole('heading', { name: /skip size/i })).toBeVisible()
    await expect(page.getByText('4yd')).toBeVisible({ timeout: 5000 })
    await page.locator('[data-skip-size="4yd"]').click()
    await page.getByRole('button', { name: 'Continue' }).click()

    // Step 4 – Review & confirm
    await expect(page.getByRole('heading', { name: /review & confirm/i })).toBeVisible()
    await expect(page.getByText('10 Downing Street')).toBeVisible()
    await expect(page.getByText('£180')).toBeVisible()
    await page.getByTestId('confirm-booking').click()

    await expect(page.getByText(/booking confirmed|BK-/i)).toBeVisible({ timeout: 5000 })
    await expect(page.locator('[data-booking-id]')).toHaveText(/BK-\d+/)
  })
})
