#!/usr/bin/env node

/**
 * Terms of Service Test Runner
 * Provides convenient commands to run different categories of tests
 */

const { execSync } = require("child_process");
const path = require("path");

const testCategories = {
  unit: [
    "src/lib/terms/__tests__/consent-tracking.test.ts",
    "src/lib/terms/__tests__/content-manager.test.ts",
    "src/lib/terms/__tests__/error-handling-simple.test.ts",
  ],
  integration: ["src/components/__tests__/TermsIntegration.test.tsx"],
  e2e: ["src/components/__tests__/TermsEndToEnd.test.tsx"],
  accessibility: [
    "src/components/__tests__/TermsAccessibility.test.tsx",
    "src/components/__tests__/TermsKeyboardNavigation.test.tsx",
    "src/components/__tests__/TermsHighContrast.test.tsx",
    "src/components/__tests__/TermsResponsive.test.tsx",
  ],
  crossBrowser: ["src/components/__tests__/TermsCrossBrowser.test.tsx"],
  edgeCases: ["src/components/__tests__/TermsEdgeCases.test.tsx"],
  errorHandling: [
    "src/lib/terms/__tests__/error-handling.test.ts",
    "src/components/__tests__/TermsErrorHandling.test.tsx",
  ],
};

function runTests(category, options = {}) {
  const { watch = false, coverage = false, verbose = false } = options;

  if (!testCategories[category]) {
    console.error(`Unknown test category: ${category}`);
    console.log(
      "Available categories:",
      Object.keys(testCategories).join(", "),
    );
    process.exit(1);
  }

  const testFiles = testCategories[category].join(" ");
  let command = `pnpm vitest run ${testFiles}`;

  if (watch) {
    command = command.replace("run", "watch");
  }

  if (coverage) {
    command += " --coverage";
  }

  if (verbose) {
    command += " --reporter=verbose";
  }

  console.log(`Running ${category} tests...`);
  console.log(`Command: ${command}`);

  try {
    execSync(command, { stdio: "inherit", cwd: process.cwd() });
    console.log(`✅ ${category} tests completed successfully`);
  } catch (error) {
    console.error(`❌ ${category} tests failed`);
    process.exit(1);
  }
}

function runAllTests(options = {}) {
  console.log("Running all Terms of Service tests...");

  const categories = Object.keys(testCategories);
  let failedCategories = [];

  for (const category of categories) {
    try {
      console.log(`\n📋 Running ${category} tests...`);
      runTests(category, { ...options, watch: false });
    } catch (error) {
      failedCategories.push(category);
    }
  }

  console.log("\n📊 Test Summary:");
  console.log(
    `✅ Passed: ${categories.length - failedCategories.length}/${categories.length}`,
  );

  if (failedCategories.length > 0) {
    console.log(`❌ Failed: ${failedCategories.join(", ")}`);
    process.exit(1);
  } else {
    console.log("🎉 All test categories passed!");
  }
}

function showHelp() {
  console.log(`
Terms of Service Test Runner

Usage:
  node scripts/test-terms.js <category> [options]
  node scripts/test-terms.js all [options]

Categories:
  unit          - Unit tests for utility functions
  integration   - Component integration tests
  e2e           - End-to-end user journey tests
  accessibility - Accessibility and WCAG compliance tests
  crossBrowser  - Cross-browser compatibility tests
  edgeCases     - Edge cases and extreme scenarios
  errorHandling - Error handling and recovery tests
  all           - Run all test categories

Options:
  --watch       - Run tests in watch mode
  --coverage    - Generate coverage report
  --verbose     - Verbose output
  --help        - Show this help message

Examples:
  node scripts/test-terms.js unit
  node scripts/test-terms.js accessibility --watch
  node scripts/test-terms.js all --coverage
  `);
}

// Parse command line arguments
const args = process.argv.slice(2);
const category = args[0];
const options = {
  watch: args.includes("--watch"),
  coverage: args.includes("--coverage"),
  verbose: args.includes("--verbose"),
};

if (!category || args.includes("--help")) {
  showHelp();
  process.exit(0);
}

if (category === "all") {
  runAllTests(options);
} else {
  runTests(category, options);
}
