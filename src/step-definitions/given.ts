import { Given } from '@wdio/cucumber-framework';
import { browser, $ } from '@wdio/globals';
import { getSelector } from '../maps/stitcher';
import { softClick } from '../utilities/helpers';

// given = preconditions ("I have", "I am", "I open")
Given(/^I open the R Systems website$/, async () => {
  await browser.url('/');
  // the consent banner is optional, so a soft click never fails the step
  await softClick(getSelector('component.cookie_banner.banner_form.buttons.accept_all'), 5000);
  await $('body').waitForDisplayed();
});
