# R Systems - WebdriverIO + Cucumber + TypeScript framework

A small but complete UI test automation framework, built as a learning/interview project. It runs **read-only** checks against the public website <https://www.rsystems.com> (no logins, no form submissions).

| Layer | Technology |
|---|---|
| Runner | WebdriverIO v9 |
| BDD | Cucumber (Gherkin) |
| Language | TypeScript (ESM) |
| Assertions | Chai `expect` |
| Test data | JSON files + Scenario Outline Examples |
| Reports | Spec (console), JUnit XML, Cucumber JSON -> HTML |
| CI | GitHub Actions + a Jenkinsfile |

## Project structure

```
src/
  features/            .feature files (Gherkin scenarios)
  step-definitions/    given.ts / when.ts / then.ts
  maps/
    web/screens/       selectors for ONE page
    web/components/    reusable widgets (cookie banner)
    web/menus/         navigation present on ALL pages
    stitcher.ts        combines every map into one "ui" object
  wdio/custom.service.ts   custom WDIO service (hooks: data load, step timer, screenshot on failure)
  utilities/           retry, softClick, safeClick, JSON loader, report generator
data/json-files/       external test data
wdio.conf.ts           central configuration
Jenkinsfile            Jenkins pipeline
.github/workflows/     GitHub Actions pipeline
```

## Concepts shown (map to common interview questions)

- **Gherkin**: Feature, Background, Scenario, Scenario Outline + Examples, tags (`@smoke`, `@regression`).
- **Step placement**: preconditions in `given.ts`, actions in `when.ts`, assertions in `then.ts`.
- **Screen maps + stitcher**: steps never contain hard-coded selectors. A step receives `menu.topnav.nav_form.links.join_us` and the stitcher resolves it (`ui.menu.topnav.containers.nav_form.links.join_us.self`).
- **Waits**: `waitforTimeout` 30s globally, explicit `waitForDisplayed`, `waitForExist`, `waitForClickable`, and `browser.waitUntil` with a `timeoutMsg`. No hard `pause` except inside the retry helper.
- **async/await**: every WDIO command returns a Promise and is awaited.
- **Error handling**: `softClick` (optional cookie banner), `retryAction` and `safeClick` (stale or intercepted clicks), screenshot on failure in `afterStep`, `specFileRetries` in the config.
- **Custom service + hooks**: `beforeFeature`, `beforeStep`, `afterStep`, `afterFeature`.
- **Parallelism**: `maxInstances: 3`. Cross-browser: add more entries under `capabilities`.
- **Config**: `suites`, `capabilities`, `services`, `reporters`, `cucumberOpts`, `specFileRetries`.
- **CI/CD**: `Jenkinsfile` (`post { always { junit / publishHTML / archiveArtifacts } }`) and GitHub Actions.

## Run it

Requires Node 20+ and Google Chrome.

```bash
npm install
npm test                     # all features, headless
npm run test:smoke           # only @smoke
npm run test:regression      # only @regression
HEADLESS=false npm test      # watch the browser
npx wdio run wdio.conf.ts --suite navigation   # one named suite
TAGS="@home and @smoke" npm test               # any tag expression
npm run report               # build HTML report from reports/json
```

Reports end up in `reports/` (`junit/`, `json/`, `html/`, `screenshots/`).

## Add a new test

1. Add selectors to a map file (or reuse one).
2. Write the scenario in a `.feature` file using the existing steps.
3. Only if a step is missing, add it to `given.ts`, `when.ts` or `then.ts`.
