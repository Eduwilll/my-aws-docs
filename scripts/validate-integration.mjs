#!/usr/bin/env node

/**
 * Terms Integration Validation Script
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m'
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

function logHeader(message) {
  log(`\n${COLORS.BOLD}${COLORS.BLUE}=== ${message} ===${COLORS.RESET}`);
}

let passed = 0;
let total = 0;
let errors = [];

function test(description, testFn) {
  total++;
  try {
    const result = testFn();
    if (result !== false) {
      logSuccess(description);
      passed++;
      return true;
    } else {
      logError(description);
      errors.push(description);
      return false;
    }
  } catch (error) {
    logError(`${description}: ${error.message}`);
    errors.push(`${description}: ${error.message}`);
    return false;
  }
}

logHeader('Terms of Service Integration Validation');

// File Structure Validation
logHeader('File Structure Validation');

const requiredFiles = [
  'src/lib/terms/index.ts',
  'src/lib/terms/content.ts',
  'src/lib/terms/consent-tracking.ts',
  'src/lib/types/terms.ts',
  'src/components/TermsAcceptanceModal.tsx',
  'src/components/TermsVersionManager.tsx',
  'src/components/TermsNavigationLinks.tsx',
  'src/pages/terms.astro',
  'src/styles/terms-accessibility.css'
];

requiredFiles.forEach(file => {
  test(`Required file exists: ${file}`, () => {
    return existsSync(file);
  });
});

// Content Structure Validation
logHeader('Content Structure Validation');

test('Terms content file is valid', () => {
  try {
    const content = readFileSync('src/lib/terms/content.ts', 'utf8');
    return content.includes('TERMS_CONTENT_PT_BR') && 
           content.includes('version:') &&
           content.includes('sections:');
  } catch (error) {
    return false;
  }
});

test('Terms content has valid version format', () => {
  try {
    const content = readFileSync('src/lib/terms/content.ts', 'utf8');
    const versionMatch = content.match(/version:\s*["'](\d+\.\d+\.\d+)["']/);
    return versionMatch && /^\d+\.\d+\.\d+$/.test(versionMatch[1]);
  } catch (error) {
    return false;
  }
});

// Component Integration Validation
logHeader('Component Integration Validation');

test('TermsVersionManager is integrated in ExamSimulator', () => {
  try {
    const content = readFileSync('src/components/ExamSimulator.tsx', 'utf8');
    return content.includes('TermsVersionManager') && 
           content.includes('hasValidConsent');
  } catch (error) {
    return false;
  }
});

test('TermsNavigationLinks is integrated in BaseLayout', () => {
  try {
    const content = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
    return content.includes('TermsNavigationLinks');
  } catch (error) {
    return false;
  }
});

test('Terms page uses proper components', () => {
  try {
    const content = readFileSync('src/pages/terms.astro', 'utf8');
    return content.includes('BaseLayout') && 
           content.includes('TermsContentManager');
  } catch (error) {
    return false;
  }
});

// Build Process Validation
logHeader('Build Process Validation');

test('TypeScript compilation succeeds', () => {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
});

// Summary
logHeader('Validation Summary');

log(`\n${COLORS.BOLD}Results:${COLORS.RESET}`);
logSuccess(`Passed: ${passed}/${total} tests`);

if (errors.length > 0) {
  logError(`Errors: ${errors.length}`);
  errors.forEach(error => {
    log(`  • ${error}`, COLORS.RED);
  });
}

if (errors.length === 0) {
  log(`\n${COLORS.GREEN}${COLORS.BOLD}✅ Terms integration validation PASSED!${COLORS.RESET}`);
  log('All critical components are properly integrated and functional.');
} else {
  log(`\n${COLORS.RED}${COLORS.BOLD}❌ Terms integration validation FAILED!${COLORS.RESET}`);
  logError('Please fix the errors above before deploying.');
  process.exit(1);
}