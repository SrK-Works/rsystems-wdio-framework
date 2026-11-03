import { When } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import { getSelector } from '../maps/stitcher';
import { safeClick, softClick } from '../utilities/helpers';

// when = user actions ("I click", "I open", "I select")
When(/^I click the element "([^"]*)"$/, async (mapPath: string) => {
  await safeClick(getSelector(mapPath));
});

When(/^I open the "([^"]*)" page$/, async (path: string) => {
  await browser.url(path);
  await softClick(getSelector('component.cookie_banner.banner_form.buttons.accept_all'), 3000);
});
