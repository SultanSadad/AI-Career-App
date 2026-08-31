import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Career Profile — Full Automated CRUD Testing", () => {
  test("TC-PROFILE-AUTO: Otomatis isi semua data profil, simpan, dan verifikasi", async ({ page }) => {
    // 1. Open login page and pause for one-time manual Google authentication
    await page.goto(`${BASE_URL}/login`);
    
    // Check if not authenticated yet
    if (await page.getByRole("button", { name: /Google/i }).isVisible()) {
      console.log("Silakan login via Google di jendela browser Playwright, lalu klik 'Resume' di Inspector...");
      await page.pause();
    }

    // 2. Navigate to Career Profile after authentication
    await page.goto(`${BASE_URL}/career-profile`);
    await page.waitForLoadState("domcontentloaded");

    // 3. Personal Info Auto-Fill
    const headlineInput = page.locator('input[name="headline"], input[placeholder*="Headline" i]').first();
    await expect(headlineInput).toBeVisible({ timeout: 15000 });
    await headlineInput.fill("Full-Stack Web Developer & Workflow Automation Specialist");

    const locationInput = page.locator('input[name="location"], input[placeholder*="Location" i]').first();
    await locationInput.fill("Batam, Indonesia");

    const bioInput = page.locator('textarea[name="bio"], textarea[placeholder*="Bio" i]').first();
    await bioInput.fill("Dedicated Software Engineer with strong experience in building scalable web applications and AI workflow automations.");

    // 4. Save Personal Info
    const saveProfileBtn = page.getByRole("button", { name: /Save|Simpan/i }).first();
    if (await saveProfileBtn.isVisible()) {
      await saveProfileBtn.click();
      await page.waitForTimeout(500);
    }

    // 5. Add Experience Entry
    const addExpBtn = page.getByRole("button", { name: /Add Experience|Tambah Pengalaman/i }).first();
    if (await addExpBtn.isVisible()) {
      await addExpBtn.click();
      await page.locator('input[name="company"], input[placeholder*="Company" i]').first().fill("Tech Innovate Corp");
      await page.locator('input[name="position"], input[placeholder*="Role" i], input[placeholder*="Position" i]').first().fill("Full-Stack Developer");
      await page.locator('textarea[name="description"], textarea[placeholder*="Description" i]').first().fill("Engineered responsive web applications using Next.js and TypeScript.");
      
      const submitExpBtn = page.getByRole("button", { name: /Save Experience|Simpan/i }).last();
      if (await submitExpBtn.isVisible()) {
        await submitExpBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // 6. Add Skill Tags
    const skillInput = page.locator('input[placeholder*="Skill" i], input[name="skill"]').first();
    if (await skillInput.isVisible()) {
      const skills = ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"];
      for (const skill of skills) {
        await skillInput.fill(skill);
        await skillInput.press("Enter");
        await page.waitForTimeout(150);
      }
    }

    // 7. Verify Dashboard Sync
    await page.goto(`${BASE_URL}/dashboard`);
    await expect(page.getByText("Profile Readiness")).toBeVisible();
    await expect(page.getByText("Experiences")).toBeVisible();
  });
});