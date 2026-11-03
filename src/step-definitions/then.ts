import { Then } from '@wdio/cucumber-framework';
import { browser, $ } from '@wdio/globals';
import { expect } from 'chai';
import { getSelector } from '../maps/stitcher';

// then = assertions ("should", "expect", "verify")
Then(/^the page title should contain "([^"]*)"$/, async (text: string) => {
  try {
    await browser.waitUntil(async () => (await browser.getTitle()).includes(text), { timeout: 15000 });
  } catch {
    // include what we actually saw: makes CI failures self-explanatory
    const body = (await $('body').getText()).replace(/\s+/g, ' ').slice(0, 200);
    throw new Error(`Title never contained "${text}". Actual title: "${await browser.getTitle()}" url: ${await browser.getUrl()} body: ${body}`);
  }
});

Then(/^the URL should contain "([^"]*)"$/, async (fragment: string) => {
  await browser.waitUntil(async () => (await browser.getUrl()).includes(fragment), {
    timeout: 15000,
    timeoutMsg: `URL never contained "${fragment}"`
  });
  expect(await browser.getUrl()).to.contain(fragment);
});

Then(/^the element "([^"]*)" should be displayed$/, async (mapPath: string) => {
  const el = await $(getSelector(mapPath));
  await el.waitForDisplayed({ timeout: 20000 });
  expect(await el.isDisplayed()).to.be.true; // note the await
});

Then(/^the element "([^"]*)" should be present$/, async (mapPath: string) => {
  const el = await $(getSelector(mapPath));
  await el.waitForExist({ timeout: 20000 });
  expect(await el.isExisting()).to.be.true;
});

Then(/^the main heading should not be empty$/, async () => {
  const text = (await $(getSelector('screen.service.service_form.text.main_heading')).getText()).trim();
  expect(text.length).to.be.above(0);
});

Then(/^the main heading should contain "([^"]*)"$/, async (text: string) => {
  const heading = await $(getSelector('screen.service.service_form.text.main_heading')).getText();
  expect(heading).to.contain(text);
});
