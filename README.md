# playwright-bdd-pom

A robust, scalable testing framework built with Playwright, Cucumber (JS), and TypeScript. This project features dynamic payload builders, automated session/token management, and BDD-driven scenarios for clear communication between technical and non-technical stakeholders.

# run only Web tests:

```
npx cucumber-js --tags "@web"
```

# run Smoke tests on Web:

```
npx cucumber-js --tags "@web and @smoke"
```

# run everything EXCEPT Regression:

```
npx cucumber-js --tags "not @regression"
```
