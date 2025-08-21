/**
 * User Consent Tracking System
 *
 * This module provides utilities for tracking user consent to Terms of Service,
 * including localStorage management, version compatibility checking, and error handling.
 */

import type {
  UserTermsAcceptance,
  StoredTermsData,
  TermsConfig,
  TermsError,
} from "../types/terms";
import { TermsErrorCode, AcceptanceStatus, ConsentType } from "../types/terms";

// Constants for localStorage management
const STORAGE_KEY = "terms-consent-data";
const STORAGE_VERSION = "1.0.0";
const MAX_ACCEPTANCE_HISTORY = 10;
const DEFAULT_GRACE_PERIOD_DAYS = 30;

/**
 * Main consent tracking class with localStorage utilities
 */
export class ConsentTracker {
  private static instance: ConsentTracker | null = null;
  private storageAvailable: boolean = false;
  private fallbackData: StoredTermsData | null = null;
  private retryAttempts: number = 3;
  private retryDelay: number = 1000; // 1 second

  private constructor() {
    this.storageAvailable = this.checkStorageAvailability();
  }

  /**
   * Get singleton instance of ConsentTracker
   */
  static getInstance(): ConsentTracker {
    if (!ConsentTracker.instance) {
      ConsentTracker.instance = new ConsentTracker();
    }
    return ConsentTracker.instance;
  }

  /**
   * Check if localStorage is available and functional
   */
  private checkStorageAvailability(): boolean {
    try {
      const testKey = "__terms_storage_test__";
      localStorage.setItem(testKey, "test");
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      return retrieved === "test";
    } catch (error) {
      console.warn(
        "localStorage not available, using fallback storage:",
        error,
      );
      return false;
    }
  }

  /**
   * Retry operation with exponential backoff
   */
  private async retryOperation<T>(
    operation: () => Promise<T>,
    operationName: string,
    maxRetries: number = this.retryAttempts,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `${operationName} failed (attempt ${attempt}/${maxRetries}):`,
          error,
        );

        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff: wait longer between retries
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Create user-friendly error messages
   */
  private createUserFriendlyError(
    code: TermsErrorCode,
    technicalMessage: string,
    userMessage: string,
    details?: any,
  ): TermsError {
    return {
      code,
      message: userMessage,
      technicalMessage,
      details,
      timestamp: new Date(),
      userFriendly: true,
    };
  }

  /**
   * Store user acceptance data with error handling and retry logic
   */
  async storeAcceptance(acceptance: UserTermsAcceptance): Promise<{
    success: boolean;
    error?: TermsError;
  }> {
    try {
      return await this.retryOperation(async () => {
        const currentData = await this.loadStoredData();

        // Add new acceptance to history
        const updatedAcceptances = [
          acceptance,
          ...(currentData?.acceptances || []),
        ].slice(0, MAX_ACCEPTANCE_HISTORY);

        const updatedData: StoredTermsData = {
          acceptances: updatedAcceptances,
          currentAcceptance: acceptance,
          lastChecked: new Date(),
          userPreferences: currentData?.userPreferences || {
            showReminders: true,
            emailUpdates: false,
          },
        };

        await this.saveStoredData(updatedData);
        return { success: true };
      }, "storeAcceptance");
    } catch (error) {
      // Determine the appropriate error type and user message
      let errorCode = TermsErrorCode.STORAGE_UNAVAILABLE;
      let userMessage =
        "Não foi possível salvar sua aceitação dos termos. Tente novamente.";

      if (error instanceof Error) {
        if (
          error.message.includes("quota") ||
          error.message.includes("QuotaExceededError")
        ) {
          errorCode = TermsErrorCode.STORAGE_QUOTA_EXCEEDED;
          userMessage =
            "Espaço de armazenamento insuficiente. Limpe alguns dados do navegador e tente novamente.";
        } else if (error.message.includes("localStorage not available")) {
          userMessage =
            "Armazenamento local não disponível. Verifique as configurações do navegador.";
        }
      }

      const termsError = this.createUserFriendlyError(
        errorCode,
        `Failed to store user acceptance: ${error}`,
        userMessage,
        {
          originalError: error,
          storageAvailable: this.storageAvailable,
          retryAttempts: this.retryAttempts,
        },
      );
      return { success: false, error: termsError };
    }
  }

  /**
   * Load stored consent data with fallback handling and data recovery
   */
  async loadStoredData(): Promise<StoredTermsData | null> {
    try {
      if (this.storageAvailable) {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          try {
            const parsed = JSON.parse(storedData);
            const deserialized = this.deserializeStoredData(parsed);

            // Validate the loaded data structure
            if (this.validateStoredData(deserialized)) {
              return deserialized;
            } else {
              console.warn(
                "Stored data validation failed, attempting recovery",
              );
              return this.recoverCorruptedData(parsed);
            }
          } catch (parseError) {
            console.warn(
              "JSON parse error, attempting data recovery:",
              parseError,
            );
            // Try to recover from corrupted JSON
            return this.recoverCorruptedData(storedData);
          }
        }
      }
      return this.fallbackData;
    } catch (error) {
      console.warn("Failed to load stored consent data:", error);
      // Return fallback data or null instead of throwing
      return this.fallbackData;
    }
  }

  /**
   * Validate stored data structure
   */
  private validateStoredData(data: StoredTermsData): boolean {
    if (!data || typeof data !== "object") return false;
    if (!Array.isArray(data.acceptances)) return false;
    if (data.lastChecked && !(data.lastChecked instanceof Date)) return false;
    if (
      data.currentAcceptance &&
      !this.validateAcceptanceStructure(data.currentAcceptance)
    )
      return false;

    return true;
  }

  /**
   * Validate acceptance data structure
   */
  private validateAcceptanceStructure(
    acceptance: UserTermsAcceptance,
  ): boolean {
    return !!(
      acceptance &&
      typeof acceptance === "object" &&
      acceptance.version &&
      acceptance.acceptedAt instanceof Date &&
      acceptance.status &&
      acceptance.consentType
    );
  }

  /**
   * Attempt to recover corrupted data
   */
  private recoverCorruptedData(corruptedData: any): StoredTermsData | null {
    try {
      // If it's a string, try to extract JSON-like parts
      if (typeof corruptedData === "string") {
        // Look for JSON patterns in the string
        const jsonMatch = corruptedData.match(/\{.*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return this.createMinimalValidData(parsed);
        }
      }

      // If it's an object, try to salvage what we can
      if (typeof corruptedData === "object") {
        return this.createMinimalValidData(corruptedData);
      }

      return null;
    } catch (error) {
      console.warn("Data recovery failed:", error);
      return null;
    }
  }

  /**
   * Create minimal valid data structure from partial data
   */
  private createMinimalValidData(partialData: any): StoredTermsData {
    return {
      acceptances: Array.isArray(partialData.acceptances)
        ? partialData.acceptances.filter(this.validateAcceptanceStructure)
        : [],
      currentAcceptance: this.validateAcceptanceStructure(
        partialData.currentAcceptance,
      )
        ? partialData.currentAcceptance
        : undefined,
      lastChecked: new Date(),
      userPreferences: {
        showReminders: partialData.userPreferences?.showReminders ?? true,
        emailUpdates: partialData.userPreferences?.emailUpdates ?? false,
      },
    };
  }

  /**
   * Save data to localStorage or fallback storage with enhanced error handling
   */
  private async saveStoredData(data: StoredTermsData): Promise<void> {
    const serializedData = this.serializeStoredData(data);

    if (this.storageAvailable) {
      try {
        const dataString = JSON.stringify(serializedData);

        // Check if data size is reasonable (< 5MB for localStorage)
        if (dataString.length > 5 * 1024 * 1024) {
          console.warn(
            "Data size exceeds recommended localStorage limit, trimming history",
          );
          // Trim acceptance history to reduce size
          const trimmedData = {
            ...data,
            acceptances: data.acceptances.slice(0, 5), // Keep only 5 most recent
          };
          const trimmedSerialized = this.serializeStoredData(trimmedData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedSerialized));
        } else {
          localStorage.setItem(STORAGE_KEY, dataString);
        }
      } catch (error) {
        // Handle different types of storage errors
        if (error instanceof DOMException) {
          if (error.code === 22 || error.name === "QuotaExceededError") {
            // Storage quota exceeded - try to free up space
            console.warn("Storage quota exceeded, attempting cleanup");
            await this.cleanupOldData();

            // Try again with minimal data
            const minimalData = {
              ...data,
              acceptances: data.acceptances.slice(0, 1), // Keep only current
            };
            const minimalSerialized = this.serializeStoredData(minimalData);

            try {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(minimalSerialized),
              );
            } catch (retryError) {
              // If still failing, use fallback storage
              this.fallbackData = data;
              throw new Error(
                "localStorage quota exceeded, using fallback storage",
              );
            }
          } else {
            // Other DOM exceptions
            this.fallbackData = data;
            throw new Error(`localStorage error: ${error.message}`);
          }
        } else {
          // Other errors
          this.fallbackData = data;
          throw new Error(`localStorage save failed: ${error}`);
        }
      }
    } else {
      this.fallbackData = data;
    }
  }

  /**
   * Clean up old data to free storage space
   */
  private async cleanupOldData(): Promise<void> {
    try {
      // Remove old terms-related keys that might exist
      const keysToCheck = [
        "terms-consent-data-backup",
        "terms-old-data",
        "terms-temp-data",
      ];

      keysToCheck.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          // Ignore cleanup errors
        }
      });
    } catch (error) {
      console.warn("Cleanup failed:", error);
    }
  }

  /**
   * Serialize data for storage (handle Date objects)
   */
  private serializeStoredData(data: StoredTermsData): any {
    return {
      ...data,
      acceptances: data.acceptances.map((acceptance) => ({
        ...acceptance,
        acceptedAt: acceptance.acceptedAt.toISOString(),
      })),
      currentAcceptance: data.currentAcceptance
        ? {
            ...data.currentAcceptance,
            acceptedAt: data.currentAcceptance.acceptedAt.toISOString(),
          }
        : undefined,
      lastChecked: data.lastChecked.toISOString(),
      storageVersion: STORAGE_VERSION,
    };
  }

  /**
   * Deserialize data from storage (restore Date objects)
   */
  private deserializeStoredData(data: any): StoredTermsData {
    return {
      ...data,
      acceptances: (data.acceptances || []).map((acceptance: any) => ({
        ...acceptance,
        acceptedAt: new Date(acceptance.acceptedAt),
      })),
      currentAcceptance: data.currentAcceptance
        ? {
            ...data.currentAcceptance,
            acceptedAt: new Date(data.currentAcceptance.acceptedAt),
          }
        : undefined,
      lastChecked: new Date(data.lastChecked),
    };
  }

  /**
   * Clear all stored consent data
   */
  async clearStoredData(): Promise<void> {
    try {
      if (this.storageAvailable) {
        localStorage.removeItem(STORAGE_KEY);
      }
      this.fallbackData = null;
    } catch (error) {
      console.warn("Failed to clear stored consent data:", error);
    }
  }

  /**
   * Get current user acceptance status
   */
  async getCurrentAcceptance(): Promise<UserTermsAcceptance | null> {
    const data = await this.loadStoredData();
    return data?.currentAcceptance || null;
  }

  /**
   * Get acceptance history for user
   */
  async getAcceptanceHistory(): Promise<UserTermsAcceptance[]> {
    const data = await this.loadStoredData();
    return data?.acceptances || [];
  }

  /**
   * Update last checked timestamp
   */
  async updateLastChecked(): Promise<void> {
    const data = await this.loadStoredData();
    if (data) {
      data.lastChecked = new Date();
      await this.saveStoredData(data);
    }
  }

  /**
   * Create standardized error object
   */
  private createError(
    code: TermsErrorCode,
    message: string,
    details?: any,
  ): TermsError {
    return {
      code,
      message,
      details,
      timestamp: new Date(),
    };
  }

  /**
   * Sanitize content to prevent XSS (delegated to TermsContentManager)
   */
  static sanitizeContent(content: string): string {
    // Basic HTML entity encoding
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /**
   * Check if storage is available for diagnostics
   */
  isStorageAvailable(): boolean {
    return this.storageAvailable;
  }
}

/**
 * Consent validation utilities
 */
export class ConsentValidator {
  /**
   * Check if user has accepted current terms version
   */
  static async hasValidConsent(
    currentVersion: string,
    gracePeriodDays: number = DEFAULT_GRACE_PERIOD_DAYS,
  ): Promise<{
    isValid: boolean;
    acceptance?: UserTermsAcceptance;
    reason?: string;
  }> {
    const tracker = ConsentTracker.getInstance();
    const currentAcceptance = await tracker.getCurrentAcceptance();

    if (!currentAcceptance) {
      return {
        isValid: false,
        reason: "No acceptance found",
      };
    }

    // Check version compatibility
    if (currentAcceptance.version !== currentVersion) {
      return {
        isValid: false,
        acceptance: currentAcceptance,
        reason: "Version mismatch",
      };
    }

    // Check if acceptance is still valid (not expired)
    if (currentAcceptance.status === AcceptanceStatus.EXPIRED) {
      return {
        isValid: false,
        acceptance: currentAcceptance,
        reason: "Acceptance expired",
      };
    }

    // Check grace period for updates
    const daysSinceAcceptance = Math.floor(
      (Date.now() - currentAcceptance.acceptedAt.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (
      currentAcceptance.consentType === ConsentType.UPDATE &&
      daysSinceAcceptance > gracePeriodDays
    ) {
      return {
        isValid: false,
        acceptance: currentAcceptance,
        reason: "Grace period expired",
      };
    }

    return {
      isValid: true,
      acceptance: currentAcceptance,
    };
  }

  /**
   * Check version compatibility between user acceptance and current version
   */
  static isVersionCompatible(
    userVersion: string,
    currentVersion: string,
  ): boolean {
    if (!userVersion || !currentVersion) {
      return false;
    }

    // For now, require exact version match
    // This can be enhanced later for backward compatibility rules
    return userVersion === currentVersion;
  }

  /**
   * Validate acceptance data structure
   */
  static validateAcceptance(acceptance: UserTermsAcceptance): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields
    if (!acceptance.version) {
      errors.push("Version is required");
    }

    if (!acceptance.acceptedAt) {
      errors.push("Acceptance timestamp is required");
    }

    if (!acceptance.status) {
      errors.push("Acceptance status is required");
    }

    if (!acceptance.consentType) {
      errors.push("Consent type is required");
    }

    // Validate version format
    if (acceptance.version && !this.isValidVersionFormat(acceptance.version)) {
      errors.push("Invalid version format");
    }

    // Validate timestamp
    if (acceptance.acceptedAt && acceptance.acceptedAt > new Date()) {
      errors.push("Acceptance timestamp cannot be in the future");
    }

    // Validate status
    if (
      acceptance.status &&
      !Object.values(AcceptanceStatus).includes(acceptance.status)
    ) {
      errors.push("Invalid acceptance status");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if version string follows semantic versioning
   */
  private static isValidVersionFormat(version: string): boolean {
    return /^\d+\.\d+\.\d+$/.test(version);
  }

  /**
   * Create new acceptance record
   */
  static createAcceptance(
    version: string,
    consentType: ConsentType = ConsentType.INITIAL,
    additionalData?: Partial<UserTermsAcceptance>,
  ): UserTermsAcceptance {
    return {
      version,
      acceptedAt: new Date(),
      status: AcceptanceStatus.ACCEPTED,
      consentType,
      ...additionalData,
    };
  }
}

/**
 * High-level consent management utilities
 */
export class ConsentManager {
  private tracker: ConsentTracker;
  private config: TermsConfig;

  constructor(config: TermsConfig) {
    this.tracker = ConsentTracker.getInstance();
    this.config = config;
  }

  /**
   * Record user acceptance of terms with enhanced error handling
   */
  async recordAcceptance(
    version: string,
    consentType: ConsentType = ConsentType.INITIAL,
    additionalData?: Partial<UserTermsAcceptance>,
  ): Promise<{
    success: boolean;
    acceptance?: UserTermsAcceptance;
    error?: TermsError;
  }> {
    try {
      const acceptance = ConsentValidator.createAcceptance(
        version,
        consentType,
        additionalData,
      );

      // Validate acceptance data
      const validation = ConsentValidator.validateAcceptance(acceptance);
      if (!validation.isValid) {
        return {
          success: false,
          error: {
            code: TermsErrorCode.VALIDATION_ERROR,
            message: "Os dados de aceitação são inválidos. Tente novamente.",
            technicalMessage: `Invalid acceptance data: ${validation.errors.join(", ")}`,
            details: validation.errors,
            timestamp: new Date(),
            userFriendly: true,
            retryable: true,
            recoveryActions: [
              "Recarregue a página e tente novamente",
              "Verifique se o JavaScript está habilitado",
              "Entre em contato com o suporte se o problema persistir",
            ],
          },
        };
      }

      const result = await this.tracker.storeAcceptance(acceptance);

      if (result.success) {
        return {
          success: true,
          acceptance,
        };
      } else {
        // Enhance the error with recovery actions
        const enhancedError = result.error
          ? {
              ...result.error,
              retryable: true,
              recoveryActions: this.getRecoveryActions(result.error.code),
            }
          : undefined;

        return {
          success: false,
          error: enhancedError,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: TermsErrorCode.STORAGE_UNAVAILABLE,
          message: "Erro inesperado ao registrar aceitação. Tente novamente.",
          technicalMessage: `Failed to record acceptance: ${error}`,
          details: error,
          timestamp: new Date(),
          userFriendly: true,
          retryable: true,
          recoveryActions: [
            "Tente novamente em alguns segundos",
            "Verifique sua conexão com a internet",
            "Recarregue a página se o problema persistir",
          ],
        },
      };
    }
  }

  /**
   * Get recovery actions based on error code
   */
  private getRecoveryActions(errorCode: string): string[] {
    switch (errorCode) {
      case TermsErrorCode.STORAGE_UNAVAILABLE:
        return [
          "Verifique se o armazenamento local está habilitado no navegador",
          "Tente usar um navegador diferente",
          "Limpe o cache e cookies do navegador",
        ];
      case TermsErrorCode.STORAGE_QUOTA_EXCEEDED:
        return [
          "Limpe dados desnecessários do navegador",
          "Feche outras abas que possam estar usando muito armazenamento",
          "Considere usar o modo privado/incógnito",
        ];
      case TermsErrorCode.VERSION_MISMATCH:
        return [
          "Recarregue a página para obter a versão mais recente",
          "Limpe o cache do navegador",
          "Verifique se há atualizações do navegador",
        ];
      case TermsErrorCode.DATA_CORRUPTION:
        return [
          "Limpe os dados do site nas configurações do navegador",
          "Recarregue a página",
          "Entre em contato com o suporte se necessário",
        ];
      default:
        return [
          "Tente novamente em alguns momentos",
          "Recarregue a página se o problema persistir",
          "Entre em contato com o suporte se necessário",
        ];
    }
  }

  /**
   * Check if user needs to accept terms
   */
  async needsAcceptance(): Promise<{
    needsAcceptance: boolean;
    reason?: string;
    currentAcceptance?: UserTermsAcceptance;
  }> {
    if (!this.config.requireAcceptance) {
      return { needsAcceptance: false };
    }

    const validation = await ConsentValidator.hasValidConsent(
      this.config.currentVersion,
      this.config.gracePeriodDays,
    );

    return {
      needsAcceptance: !validation.isValid,
      reason: validation.reason,
      currentAcceptance: validation.acceptance,
    };
  }

  /**
   * Get user's consent status summary
   */
  async getConsentStatus(): Promise<{
    hasConsent: boolean;
    currentVersion?: string;
    acceptedVersion?: string;
    acceptedAt?: Date;
    needsUpdate: boolean;
    gracePeriodRemaining?: number;
  }> {
    const currentAcceptance = await this.tracker.getCurrentAcceptance();

    if (!currentAcceptance) {
      return {
        hasConsent: false,
        needsUpdate: true,
      };
    }

    const needsUpdate = !ConsentValidator.isVersionCompatible(
      currentAcceptance.version,
      this.config.currentVersion,
    );

    let gracePeriodRemaining: number | undefined;
    if (
      currentAcceptance.consentType === ConsentType.UPDATE &&
      this.config.gracePeriodDays
    ) {
      const daysSinceAcceptance = Math.floor(
        (Date.now() - currentAcceptance.acceptedAt.getTime()) /
          (1000 * 60 * 60 * 24),
      );
      gracePeriodRemaining = Math.max(
        0,
        this.config.gracePeriodDays - daysSinceAcceptance,
      );
    }

    return {
      hasConsent: true,
      currentVersion: this.config.currentVersion,
      acceptedVersion: currentAcceptance.version,
      acceptedAt: currentAcceptance.acceptedAt,
      needsUpdate,
      gracePeriodRemaining,
    };
  }

  /**
   * Clear all user consent data
   */
  async clearConsent(): Promise<void> {
    await this.tracker.clearStoredData();
  }

  /**
   * Export consent data for user (LGPD compliance)
   */
  async exportConsentData(): Promise<{
    acceptanceHistory: UserTermsAcceptance[];
    currentAcceptance?: UserTermsAcceptance;
    lastChecked: Date;
    storageInfo: {
      storageAvailable: boolean;
      dataLocation: string;
    };
  }> {
    const data = await this.tracker.loadStoredData();

    return {
      acceptanceHistory: data?.acceptances || [],
      currentAcceptance: data?.currentAcceptance,
      lastChecked: data?.lastChecked || new Date(),
      storageInfo: {
        storageAvailable: this.tracker.isStorageAvailable(),
        dataLocation: this.tracker.isStorageAvailable()
          ? "localStorage"
          : "memory",
      },
    };
  }
}

// Export convenience functions for common operations
export const consentTracker = ConsentTracker.getInstance();

/**
 * Quick function to check if user has valid consent
 */
export async function hasValidConsent(
  currentVersion: string,
  gracePeriodDays?: number,
): Promise<boolean> {
  const result = await ConsentValidator.hasValidConsent(
    currentVersion,
    gracePeriodDays,
  );
  return result.isValid;
}

/**
 * Quick function to record user acceptance
 */
export async function recordUserAcceptance(
  version: string,
  consentType: ConsentType = ConsentType.INITIAL,
): Promise<boolean> {
  const result = await consentTracker.storeAcceptance(
    ConsentValidator.createAcceptance(version, consentType),
  );
  return result.success;
}

/**
 * Quick function to get current acceptance
 */
export async function getCurrentUserAcceptance(): Promise<UserTermsAcceptance | null> {
  return await consentTracker.getCurrentAcceptance();
}
