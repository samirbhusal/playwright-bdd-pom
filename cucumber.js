// cucumber.js in the root folder
export default {
  // Use 'import' instead of 'require' for support code
  import: [
    "tests/steps/**/*.ts",
    "tests/helper/hook.ts",
    "tests/steps/web/*.ts", // Explicitly add the web folder
    "tests/steps/api/*.ts",
  ],
  paths: ["tests/features/api/*.feature", "tests/features/web/*.feature"],
  // Ensure we use the ESM version of the ts-node loader
  loader: ["ts-node/esm"],
  format: ["progress-bar", "html:reports/cucumber-report.html"],

  defaultTimeout: 30000,
};
