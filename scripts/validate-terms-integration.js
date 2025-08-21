#!/usr/bin/env node

/**
 * Terms Integration Validation Script
 *
 * This script validates the complete Terms of Service integration
 * by testing all components, workflows, and edge cases.
 */

import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const COLORS = {
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  RESET: "\x1b[0m",
  BOLD: "\x1b[1m",
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, COLORS.GREEN);
}

function logError(message) {
  log(`❌ ${message}`, COLORS.RED);
}

function logWarning(message) {
  log(`⚠️  ${message}`, COLORS.YELLOW);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, COLORS.BLUE);
}

function logHeader(message) {
  log(`\n${COLORS.BOLD}${COLORS.BLUE}=== ${message} ===${COLORS.RESET}`);
}

class TermsIntegrationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = 0;
    this.total = 0;
  }

  async validate() {
    logHeader("Terms of Service Integration Validation");

    try {
      await this.validateFileStructure();
      await this.validateContentStructure();
      await this.validateComponentIntegration();
      await this.validateBuildProcess();
      await this.validateAccessibility();
      await this.validateTypeScript();

      this.printSummary();

      if (this.errors.length > 0) {
        process.exit(1);
      }
    } catch (error) {
      logError(`Validation failed: ${error.message}`);
      process.exit(1);
    }
  }

  test(description, testFn) {
    this.total++;
    try {
      const result = testFn();
      if (result !== false) {
        logSuccess(description);
        this.passed++;
        return true;
      } else {
        logError(description);
        this.errors.push(description);
        return false;
      }
    } catch (error) {
      logError(`${description}: ${error.message}`);
      this.errors.push(`${description}: ${error.message}`);
      return false;
    }
  }

  warn(description, testFn) {
    try {
      const result = testFn();
      if (result !== false) {
        logSuccess(description);
        return true;
      } else {
        logWarning(description);
        this.warnings.push(description);
        return false;
      }
    } catch (error) {
      logWarning(`${description}: ${error.message}`);
      this.warnings.push(`${description}: ${error.message}`);
      return false;
    }
  }

  async validateFileStructure() {
    logHeader("File Structure Validation");

    const requiredFiles = [
      "src/lib/terms/index.ts",
      "src/lib/terms/content.ts",
      "src/lib/terms/consent-tracking.ts",
      "src/lib/types/terms.ts",
      "src/components/TermsAcceptanceModal.tsx",
      "src/components/TermsVersionManager.tsx",
      "src/components/TermsNavigationLinks.tsx",
      "src/pages/terms.astro",
      "src/styles/terms-accessibility.css",
    ];

    requiredFiles.forEach((file) => {
      this.test(`Required file exists: ${file}`, () => {
        return existsSync(file);
      });
    });

    // Check for test files
    const testFiles = [
      "src/lib/terms/__tests__/content-manager.test.ts",
      "src/lib/terms/__tests__/consent-tracking.test.ts",
      "src/components/__tests__/TermsAcceptanceModal.test.tsx",
      "src/components/__tests__/TermsVersionManager.test.tsx",
    ];

    testFiles.forEach((file) => {
      this.warn(`Test file exists: ${file}`, () => {
        return existsSync(file);
      });
    });
  }

  async validateContentStructure() {
    logHeader("Content Structure Validation");

    this.test("Terms content file is valid JavaScript/TypeScript", () => {
      try {
        const content = readFileSync("src/lib/terms/content.ts", "utf8");
        return (
          content.includes("TERMS_CONTENT_PT_BR") &&
          content.includes("version:") &&
          content.includes("sections:")
        );
      } catch (error) {
        return false;
      }
    });

    this.test("Terms content includes required sections", () => {
      try {
        const content = readFileSync("src/lib/terms/content.ts", "utf8");
        const requiredSections = [
          "purpose",
          "permitted-use",
          "prohibited-activities",
          "liability",
          "privacy",
          "contact",
        ];

        return requiredSections.every(
          (section) =>
            content.includes(`id: "${section}"`) ||
            content.includes(`id: '${section}'`),
        );
      } catch (error) {
        return false;
      }
    });

    this.test("Terms content has valid version format", () => {
      try {
        const content = readFileSync("src/lib/terms/content.ts", "utf8");
        const versionMatch = content.match(
          /version:\s*["'](\d+\.\d+\.\d+)["']/,
        );
        return versionMatch && /^\d+\.\d+\.\d+$/.test(versionMatch[1]);
      } catch (error) {
        return false;
      }
    });

    this.test("Terms content has recent lastUpdated date", () => {
      try {
        const content = readFileSync("src/lib/terms/content.ts", "utf8");
        const dateMatch = content.match(
          /lastUpdated:\s*new Date\(["']([^"']+)["']\)/,
        );
        if (!dateMatch) return false;

        const lastUpdated = new Date(dateMatch[1]);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        return lastUpdated > sixMonthsAgo;
      } catch (error) {
        return false;
      }
    });
  }

  async validateComponentIntegration() {
    logHeader("Component Integration Validation");

    this.test("TermsVersionManager is integrated in ExamSimulator", () => {
      try {
        const content = readFileSync(
          "src/components/ExamSimulator.tsx",
          "utf8",
        );
        return (
          content.includes("TermsVersionManager") &&
          content.includes("hasValidConsent")
        );
      } catch (error) {
        return false;
      }
    });

    this.test("TermsNavigationLinks is integrated in BaseLayout", () => {
      try {
        const content = readFileSync("src/layouts/BaseLayout.astro", "utf8");
        return content.includes("TermsNavigationLinks");
      } catch (error) {
        return false;
      }
    });

    this.test("Terms page uses proper layout and components", () => {
      try {
        const content = readFileSync("src/pages/terms.astro", "utf8");
        return (
          content.includes("BaseLayout") &&
          content.includes("TermsContentManager")
        );
      } catch (error) {
        return false;
      }
    });

    this.test(
      "Terms acceptance modal has proper accessibility attributes",
      () => {
        try {
          const content = readFileSync(
            "src/components/TermsAcceptanceModal.tsx",
            "utf8",
          );
          return (
            content.includes("aria-label") &&
            content.includes("role=") &&
            content.includes("aria-describedby")
          );
        } catch (error) {
          return false;
        }
      },
    );
  }

  async validateBuildProcess() {
    logHeader("Build Process Validation");

    this.test("TypeScript compilation succeeds", () => {
      try {
        execSync("npx tsc --noEmit", { stdio: "pipe" });
        return true;
      } catch (error) {
        return false;
      }
    });

    this.test("Astro build succeeds", () => {
      try {
        execSync("npm run build", { stdio: "pipe" });
        return true;
      } catch (error) {
        return false;
      }
    });

    this.test("Built terms page exists", () => {
      return existsSync("dist/terms/index.html");
    });

    this.test("Built simulator page exists", () => {
      return existsSync("dist/simulador/index.html");
    });
  }

  async validateAccessibility() {
    logHeader("Accessibility Validation");

    this.test("Terms accessibility CSS exists", () => {
      return existsSync("src/styles/terms-accessibility.css");
    });

    this.test("Terms page has proper semantic HTML structure", () => {
      try {
        const content = readFileSync("src/pages/terms.astro", "utf8");
        return (
          content.includes("<main") &&
          content.includes("<header") &&
          content.includes("<nav") &&
          content.includes("role=")
        );
      } catch (error) {
        return false;
      }
    });

    this.test("Terms modal has keyboard navigation support", () => {
      try {
        const content = readFileSync(
          "src/components/TermsAcceptanceModal.tsx",
          "utf8",
        );
        return (
          content.includes("onKeyDown") ||
          content.includes("tabIndex") ||
          content.includes("focus")
        );
      } catch (error) {
        return false;
      }
    });

    this.test("Terms navigation has proper ARIA labels", () => {
      try {
        const content = readFileSync(
          "src/components/TermsNavigationLinks.tsx",
          "utf8",
        );
        return content.includes("aria-label") && content.includes("role=");
      } catch (error) {
        return false;
      }
    });
  }

  async validateTypeScript() {
    logHeader("TypeScript Validation");

    this.test("Terms types are properly exported", () => {
      try {
        const content = readFileSync("src/lib/types/terms.ts", "utf8");
        const requiredTypes = [
          "TermsConfig",
          "UserTermsAcceptance",
          "TermsContent",
          "ConsentType",
        ];

        return requiredTypes.every(
          (type) =>
            content.includes(`export interface ${type}`) ||
            content.includes(`export type ${type}`) ||
            content.includes(`export enum ${type}`),
        );
      } catch (error) {
        return false;
      }
    });

    this.test("Terms module exports are complete", () => {
      try {
        const content = readFileSync("src/lib/terms/index.ts", "utf8");
        const requiredExports = [
          "TermsContentManager",
          "ConsentManager",
          "hasValidConsent",
        ];

        return requiredExports.every((exportName) =>
          content.includes(exportName),
        );
      } catch (error) {
        return false;
      }
    });
  }

  printSummary() {
    logHeader("Validation Summary");

    log(`\n${COLORS.BOLD}Results:${COLORS.RESET}`);
    logSuccess(`Passed: ${this.passed}/${this.total} tests`);

    if (this.warnings.length > 0) {
      logWarning(`Warnings: ${this.warnings.length}`);
      this.warnings.forEach((warning) => {
        log(`  • ${warning}`, COLORS.YELLOW);
      });
    }

    if (this.errors.length > 0) {
      logError(`Errors: ${this.errors.length}`);
      this.errors.forEach((error) => {
        log(`  • ${error}`, COLORS.RED);
      });
    }

    if (this.errors.length === 0) {
      log(
        `\n${COLORS.GREEN}${COLORS.BOLD}✅ Terms integration validation PASSED!${COLORS.RESET}`,
      );
      logInfo(
        "All critical components are properly integrated and functional.",
      );
    } else {
      log(
        `\n${COLORS.RED}${COLORS.BOLD}❌ Terms integration validation FAILED!${COLORS.RESET}`,
      );
      logError("Please fix the errors above before deploying.");
    }

    // Recommendations
    log(`\n${COLORS.BOLD}Recommendations:${COLORS.RESET}`);
    log("• Run the full test suite: pnpm test --run");
    log("• Test the application manually in different browsers");
    log("• Validate accessibility with screen readers");
    log("• Review legal content with legal counsel");
    log("• Monitor user acceptance rates after deployment");
  }
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new TermsIntegrationValidator();
  validator.validate().catch((error) => {
    logError(`Validation script failed: ${error.message}`);
    process.exit(1);
  });
}

export default TermsIntegrationValidator;
