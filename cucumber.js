// cucumber.js in the root folder
export default {
  // Use 'import' instead of 'require' for support code
  import: ["tests/steps/**/*.ts", "tests/helper/hook.ts"],
  paths: ["tests/features/**/*.feature"],
  // Ensure we use the ESM version of the ts-node loader
  loader: ["ts-node/esm"],
  format: ["progress-bar", "html:reports/cucumber-report.html"],
};
