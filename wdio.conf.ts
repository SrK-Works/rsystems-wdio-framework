
import CustomService from './src/wdio/custom.service';

const headless = process.env.HEADLESS !== 'false';
const baseUrl = process.env.BASE_URL || 'https://www.rsystems.com';

const chromeArgs = ['--window-size=1920,1080', '--disable-notifications', '--no-sandbox'];
if (headless) chromeArgs.push('--headless=new', '--disable-gpu');
// rsystems.com's CDN returns 403 to the default "HeadlessChrome" user agent from CI IP ranges,
// so we present a regular desktop Chrome user agent.
chromeArgs.push(
  '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  '--disable-blink-features=AutomationControlled'
);

export const config: WebdriverIO.Config = {
  runner: 'local',
  framework: 'cucumber',

  specs: ['./src/features/**/*.feature'],
  // suites run with: npx wdio run wdio.conf.ts --suite smoke
  suites: {
    navigation: ['./src/features/navigation.feature'],
    quality: ['./src/features/quality_engineering.feature'],
    home: ['./src/features/home.feature']
  },

  maxInstances: 3, // parallel spec files
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': { args: chromeArgs }
    }
  ],

  baseUrl,
  logLevel: 'warn',
  waitforTimeout: 30000,          // element waits (default is a few seconds)
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  specFileRetries: 1,             // re-run a failed spec file once (flaky network)
  specFileRetriesDelay: 3,
  bail: 0,

  // cast: WDIO hook typings are strict; our service implements only the hooks it needs
  services: [[CustomService as any, {}]],

  reporters: [
    'spec',
    ['junit', { outputDir: './reports/junit', outputFileFormat: () => `results-${Date.now()}.xml` }],
    ['cucumberjs-json', { jsonFolder: './reports/json', language: 'en' }]
  ],

  cucumberOpts: {
    require: ['./src/step-definitions/*.ts'],
    timeout: 120000,              // max time per step
    tagExpression: process.env.TAGS || '',
    failFast: false
  }
};
