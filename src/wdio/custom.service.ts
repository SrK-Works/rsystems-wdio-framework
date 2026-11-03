import { mkdirSync } from 'node:fs';
import { loadJson } from '../utilities/test-data';
import { saveFailureScreenshot } from '../utilities/helpers';

/**
 * Custom WDIO service. Lifecycle hooks used (in order):
 * onPrepare -> before -> beforeFeature -> beforeScenario -> beforeStep
 * -> afterStep -> afterScenario -> afterFeature -> after -> onComplete
 */
export default class CustomService {
  private stepStart = 0;
  private featureStart = 0;

  // WDIO passes (serviceOptions, capabilities, config) to every service
  constructor(_options?: unknown, _capabilities?: unknown, _config?: unknown) {}

  // beforeFeature: load external data once per feature
  beforeFeature(uri: string, feature: { name: string }) {
    this.featureStart = Date.now();
    (globalThis as any).siteData = loadJson('site.json');
    mkdirSync('./reports/screenshots', { recursive: true });
    console.log(`\n[service] FEATURE START: ${feature.name}`);
  }

  // beforeStep: start timer
  beforeStep() {
    this.stepStart = Date.now();
  }

  // afterStep: log step duration + pass/fail, screenshot on failure
  async afterStep(step: { text: string }, scenario: { name: string }, result: { passed: boolean }) {
    const ms = Date.now() - this.stepStart;
    console.log(`[service] ${result.passed ? 'PASS' : 'FAIL'} (${ms}ms) ${step.text}`);
    if (!result.passed) {
      const file = await saveFailureScreenshot(scenario.name);
      console.log(`[service] screenshot saved: ${file}`);
    }
  }

  // afterFeature: summary (in the real project we wrote results back to SmartSheet here)
  afterFeature(uri: string, feature: { name: string }) {
    console.log(`[service] FEATURE END: ${feature.name} in ${Date.now() - this.featureStart}ms`);
  }
}
