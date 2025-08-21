/**
 * Terms of Service Module
 *
 * This module provides comprehensive terms of service functionality including
 * content management, version tracking, and user consent handling.
 */

// Export all types
export * from "../types/terms";

// Export content management utilities
export {
  TermsVersionManager,
  TermsContentValidator,
  TermsContentManager,
  TERMS_CONTENT_PT_BR,
} from "./content";

// Export consent tracking utilities
export {
  ConsentTracker,
  ConsentValidator,
  ConsentManager,
  consentTracker,
  hasValidConsent,
  recordUserAcceptance,
  getCurrentUserAcceptance,
} from "./consent-tracking";

// Export default content for easy access
export { default as defaultTermsContent } from "./content";
