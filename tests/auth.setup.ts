import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Buka localhost dan lakukan login manual / mock bypass jika ada
  await page.goto("http://localhost:3000/login");

  // Jika menggunakan Google OAuth di dev, Anda bisa login manual sekali via UI Playwright:
  // npx playwright test tests/career-profile-crud.spec.ts --ui
  // Atau simpan cookies browser yang sudah login.
});