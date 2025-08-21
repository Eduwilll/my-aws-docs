/**
 * Terms of Service Type Definitions
 *
 * This file contains all TypeScript interfaces and types for the Terms of Service system,
 * including version management, user consent tracking, and content structure.
 */

// Enums for terms status and acceptance states
export enum TermsStatus {
  CURRENT = "current",
  OUTDATED = "outdated",
  PENDING = "pending",
  ARCHIVED = "archived",
}

export enum AcceptanceStatus {
  ACCEPTED = "accepted",
  DECLINED = "declined",
  PENDING = "pending",
  EXPIRED = "expired",
}

export enum ConsentType {
  INITIAL = "initial",
  UPDATE = "update",
  RENEWAL = "renewal",
}

// Core interfaces for terms version management
export interface TermsVersion {
  version: string;
  lastUpdated: Date;
  content: string;
  changes?: string[];
  status: TermsStatus;
  requiresNewAcceptance: boolean;
}

// User terms acceptance tracking
export interface UserTermsAcceptance {
  version: string;
  acceptedAt: Date;
  status: AcceptanceStatus;
  consentType: ConsentType;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

// Configuration for terms management
export interface TermsConfig {
  currentVersion: string;
  requireAcceptance: boolean;
  showChangesHighlight: boolean;
  gracePeriodDays?: number;
  enableVersionHistory: boolean;
  maxStoredVersions: number;
}

// Data structure for localStorage persistence
export interface StoredTermsData {
  acceptances: UserTermsAcceptance[];
  currentAcceptance?: UserTermsAcceptance;
  lastChecked: Date;
  userPreferences: {
    showReminders: boolean;
    emailUpdates: boolean;
  };
}

// Terms content structure and sections
export interface TermsSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isRequired: boolean;
  lastModified?: Date;
}

export interface TermsContent {
  version: string;
  lastUpdated: Date;
  sections: TermsSection[];
  metadata: {
    language: string;
    jurisdiction: string;
    effectiveDate: Date;
  };
}

// Version history and migration management
export interface VersionHistory {
  versions: TermsVersion[];
  currentVersion: string;
  migrationRules: {
    [fromVersion: string]: {
      requiresNewAcceptance: boolean;
      highlightChanges: string[];
      gracePeriodDays?: number;
    };
  };
}

// Modal and UI component props
export interface TermsAcceptanceModalProps {
  isOpen: boolean;
  onAccept: (acceptance: UserTermsAcceptance) => void;
  onDecline: () => void;
  termsVersion: TermsVersion;
  showChanges?: boolean;
  previousVersion?: string;
}

export interface TermsVersionManagerProps {
  config: TermsConfig;
  onVersionChange: (newVersion: string) => void;
  onAcceptanceRequired: (version: TermsVersion) => void;
}

// Error handling types
export interface TermsError {
  code: string;
  message: string;
  technicalMessage?: string;
  details?: any;
  timestamp: Date;
  userFriendly?: boolean;
  retryable?: boolean;
  recoveryActions?: string[];
}

export enum TermsErrorCode {
  STORAGE_UNAVAILABLE = "STORAGE_UNAVAILABLE",
  STORAGE_QUOTA_EXCEEDED = "STORAGE_QUOTA_EXCEEDED",
  VERSION_MISMATCH = "VERSION_MISMATCH",
  INVALID_ACCEPTANCE = "INVALID_ACCEPTANCE",
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DATA_CORRUPTION = "DATA_CORRUPTION",
  RETRY_EXHAUSTED = "RETRY_EXHAUSTED",
}

// Utility types for type safety
export type TermsVersionString = `${number}.${number}.${number}`;
export type AcceptanceTimestamp = Date;
export type TermsSectionId = string;

// Function signature types for terms operations
export type AcceptanceHandler = (
  acceptance: UserTermsAcceptance,
) => Promise<void>;
export type VersionChecker = (
  currentVersion: string,
  userVersion?: string,
) => boolean;
export type ContentValidator = (content: TermsContent) => boolean;
export type StorageManager = {
  save: (data: StoredTermsData) => Promise<void>;
  load: () => Promise<StoredTermsData | null>;
  clear: () => Promise<void>;
};
