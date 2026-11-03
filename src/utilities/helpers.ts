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

/** Describe whatever sits on top of an element (used to debug "not clickable"). */
export async function describeBlocker(selector: string): Promise<string> {
  return browser.execute((sel: string) => {
    const r = document.evaluate(sel, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    const el = (r.singleNodeValue || document.querySelector(sel)) as HTMLElement | null;
    if (!el) return 'element not in DOM';
    const b = el.getBoundingClientRect();
    const top = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2) as HTMLElement | null;
    return 'rect=' + Math.round(b.width) + 'x' + Math.round(b.height) + ' viewport=' + window.innerWidth +
      ' topElement=' + (top ? top.tagName + '#' + top.id + '.' + String(top.className).slice(0, 80) : 'none');
  }, selector);
}

/** Wait, scroll and click, retried on stale element / intercepted click. Falls back to a JS click. */
export async function safeClick(selector: string): Promise<void> {
  try {
    await retryAction(async () => {
      const el = await $(selector);
      await el.waitForClickable({ timeout: 10000 });
      await el.scrollIntoView({ block: 'center' });
      await el.click();
    }, 2, 500);
  } catch (e) {
    console.warn('[safeClick] normal click failed: ' + (await describeBlocker(selector)));
    // last resort: click through JavaScript (documented trade-off: skips the "real user" visibility checks)
    const el = await $(selector);
    await el.waitForExist({ timeout: 5000 });
    await browser.execute((node: HTMLElement) => node.click(), el as unknown as HTMLElement);
  }
}

export async function saveFailureScreenshot(name: string): Promise<string> {
  const safe = name.replace(/[^a-z0-9]+/gi, '_').slice(0, 80);
  const file = `./reports/screenshots/${safe}_${Date.now()}.png`;
  await browser.saveScreenshot(file);
  return file;
}
