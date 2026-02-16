const formatters = ["progress", "html:reports/cucumber-report.html"];
try {
  require.resolve("allure-cucumberjs/reporter");
  formatters.push("allure-cucumberjs/reporter");
} catch (_error) {
  // Keep local runs working even when optional Allure reporter isn't installed.
}

module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: [
      "tests/helper/hook.ts",
      "tests/step_definition/**/*.ts",
    ],
    paths: ["tests/features/**/*.feature"],
    format: formatters,
    publishQuiet: true,
    defaultTimeout: 30000,
  },
};
