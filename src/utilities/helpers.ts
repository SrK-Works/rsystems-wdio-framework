import { browser, $ } from '@wdio/globals';

/** Retry any async action. Re-throws the last error when attempts run out. */
export async function retryAction<T>(action: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
  let lastError: unknown;
  for (let i = 1; i <= retries; i++) {
    try {
      return await action();
    } catch (e) {
      lastError = e;
      console.warn(`[retry] attempt ${i}/${retries} failed: ${(e as Error).message}`);
      if (i < retries) await browser.pause(delayMs);
    }
  }
  throw lastError;
}

/** Click only if the element appears within the timeout; never fails the test. */
export async function softClick(selector: string, timeout = 5000): Promise<boolean> {
  try {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout });
    await el.click();
    return true;
  } catch {
    return false; // optional element (popup/banner) not there, carry on
  }
}

/** Wait, scroll and click, retried on stale element / intercepted click. */
export async function safeClick(selector: string): Promise<void> {
  await retryAction(async () => {
    const el = await $(selector);
    await el.waitForClickable({ timeout: 15000 });
    await el.scrollIntoView({ block: 'center' });
    await el.click();
  });
}

export async function saveFailureScreenshot(name: string): Promise<string> {
  const safe = name.replace(/[^a-z0-9]+/gi, '_').slice(0, 80);
  const file = `./reports/screenshots/${safe}_${Date.now()}.png`;
  await browser.saveScreenshot(file);
  return file;
}
