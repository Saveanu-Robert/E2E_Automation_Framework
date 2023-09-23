import { PlaywrightTestConfig } from '@playwright/test';

const RPconfig = {
  apiKey: 'playwright-api_IVVPOHxHRp2lFssXXHRDAfltVga6LPdwP10Asu8p764kCKHOCsT9H97pE_78cJDp',
  endpoint: 'https:/demo.reportportal.io/api/v1',
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

const config: PlaywrightTestConfig = {
  reporter: [['@reportportal/agent-js-playwright', RPconfig]],
  testDir: './tests',
};
export default config;