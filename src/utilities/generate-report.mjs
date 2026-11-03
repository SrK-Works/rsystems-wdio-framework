import report from 'multiple-cucumber-html-reporter';
report.generate({
  jsonDir: './reports/json',
  reportPath: './reports/html',
  pageTitle: 'R Systems WDIO Framework',
  reportName: 'R Systems - WebdriverIO + Cucumber report',
  displayDuration: true,
  metadata: { browser: { name: 'chrome', version: 'latest' }, device: 'CI / local', platform: { name: process.platform } }
});
