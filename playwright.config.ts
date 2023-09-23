import { defineConfig, devices } from '@playwright/test';

const RPconfig = {
  apiKey: 'playwright-api_IVVPOHxHRp2lFssXXHRDAfltVga6LPdwP10Asu8p764kCKHOCsT9H97pE_78cJDp',
  endpoint: 'https:/demo.reportportal.io',
  project: 'default_personal',
  launch: 'E2E_Automation_Framework',
  attributes: [
    {
      key: 'key',
      value: 'value',
    },
    {
      value: 'value',
    },
  ],
  description: 'This is a demo run',
};

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 3 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 12 : undefined,

  reporter: [['allure-playwright'], ['@reportportal/agent-js-playwright', RPconfig]], 

  use: {
    baseURL: 'https://qacart-todo.herokuapp.com',
		trace: 'on-first-retry',
		video: "retain-on-failure",
		screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
     {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'] },
     },
     {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 12'] },
     },
  ],

});
