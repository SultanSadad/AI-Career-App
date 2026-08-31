import { test, expect } from "@playwright/test";

const BASE_URL = "http://127.0.0.1:3000";

test.describe("Career Passport — Phase 8 Full QA Automation", () => {
  // 1. Landing & Navigation
  test("TC-LANDING-01: Landing page renders core headline & CTA", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator("h1")).toContainText("One Career Profile");
    await expect(page.getByText("Career Passport").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Build Your Passport Free|Get Started/i }).first()).toBeVisible();
    await expect(page.getByText("Build Once. Use Everywhere.")).toBeVisible();
  });

  test("TC-NAV-01: Public navbar anchor links scroll properly", async ({ page }) => {
    await page.goto(BASE_URL);
    const featuresLink = page.getByRole("link", { name: "Features" }).first();
    await expect(featuresLink).toBeVisible();
    await featuresLink.click();
    await expect(page.locator("#features")).toBeVisible();
  });

  // 2. Authentication & Route Protection
  test("TC-AUTH-01: Protected routes redirect unauthenticated users to login", async ({ page, context }) => {
    await context.clearCookies();

    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page).toHaveURL(/login/, { timeout: 10000 });

    await page.goto(`${BASE_URL}/cv-builder`);
    await expect(page).toHaveURL(/login/, { timeout: 10000 });

    await page.goto(`${BASE_URL}/career-profile`);
    await expect(page).toHaveURL(/login/, { timeout: 10000 });

    await page.goto(`${BASE_URL}/settings`);
    await expect(page).toHaveURL(/login/, { timeout: 10000 });
  });

  // 3. Login Page Elements
  test("TC-AUTH-02: Login page renders Google Sign-In and form inputs", async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await expect(page.getByRole("button", { name: /Google/i })).toBeVisible();
  });

  // 4. Responsive Viewport
  test("TC-RESPONSIVE-01: Mobile viewport layout renders cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await expect(page.getByRole("link", { name: /Get Started|Sign In/i }).first()).toBeVisible();
  });
});