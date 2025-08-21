/**
 * Comprehensive Unit Tests for Consent Tracking System
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  ConsentTracker,
  ConsentValidator,
  ConsentManager,
  hasValidConsent,
  recordUserAcceptance,
  getCurrentUserAcceptance,
} from "../consent-tracking";
import {
  UserTermsAcceptance,
  TermsConfig,
  AcceptanceStatus,
  ConsentType,
  TermsErrorCode,
} from "../../types/terms";

// Mock localStorage
const createMockStorage = () => {
  const storage: { [key: string]: string } = {};
  return {
    getItem: vi.fn((key: string) => storage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete storage[key];
    }),
    clear: vi.fn(() => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    }),
  };
};

describe("ConsentTracker", () => {
  let mockStorage: ReturnType<typeof createMockStorage>;
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    mockStorage = createMockStorage();
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });
    // Reset singleton
    (ConsentTracker as any).instance = null;
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
    (ConsentTracker as any).instance = null;
  });

  describe("getInstance", () => {
    it("should return singleton instance", () => {
      const instance1 = ConsentTracker.getInstance();
      const instance2 = ConsentTracker.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe("storeAcceptance", () => {
    it("should store acceptance successfully", async () => {
      const tracker = ConsentTracker.getInstance();
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = await tracker.storeAcceptance(acceptance);

      expect(result.success).toBe(true);
      expect(mockStorage.setItem).toHaveBeenCalled();
    });

    it("should handle storage errors gracefully", async () => {
      mockStorage.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      const tracker = ConsentTracker.getInstance();
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = await tracker.storeAcceptance(acceptance);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error!.code).toBe(TermsErrorCode.STORAGE_UNAVAILABLE);
    });

    it("should handle quota exceeded errors", async () => {
      mockStorage.setItem.mockImplementation(() => {
        const error = new Error("QuotaExceededError");
        (error as any).code = 22;
        (error as any).name = "QuotaExceededError";
        throw error;
      });

      const tracker = ConsentTracker.getInstance();
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = await tracker.storeAcceptance(acceptance);

      expect(result.success).toBe(false);
      expect(result.error!.code).toBe(TermsErrorCode.STORAGE_QUOTA_EXCEEDED);
    });

    it("should maintain acceptance history with limit", async () => {
      const tracker = ConsentTracker.getInstance();

      // Store multiple acceptances
      for (let i = 0; i < 12; i++) {
        const acceptance: UserTermsAcceptance = {
          version: `1.${i}.0`,
          acceptedAt: new Date(),
          status: AcceptanceStatus.ACCEPTED,
          consentType: ConsentType.INITIAL,
        };
        await tracker.storeAcceptance(acceptance);
      }

      const data = await tracker.loadStoredData();
      expect(data!.acceptances.length).toBeLessThanOrEqual(10); // MAX_ACCEPTANCE_HISTORY
    });
  });

  describe("loadStoredData", () => {
    it("should load stored data successfully", async () => {
      const testData = {
        acceptances: [
          {
            version: "1.0.0",
            acceptedAt: new Date().toISOString(),
            status: AcceptanceStatus.ACCEPTED,
            consentType: ConsentType.INITIAL,
          },
        ],
        lastChecked: new Date().toISOString(),
        userPreferences: {
          showReminders: true,
          emailUpdates: false,
        },
      };

      mockStorage.getItem.mockReturnValue(JSON.stringify(testData));

      const tracker = ConsentTracker.getInstance();
      const data = await tracker.loadStoredData();

      expect(data).toBeDefined();
      expect(data!.acceptances).toHaveLength(1);
      expect(data!.acceptances[0].acceptedAt).toBeInstanceOf(Date);
    });

    it("should handle corrupted JSON data", async () => {
      mockStorage.getItem.mockReturnValue("{ invalid json");

      const tracker = ConsentTracker.getInstance();
      const data = await tracker.loadStoredData();

      expect(data).toBeNull();
    });

    it("should recover from partial data corruption", async () => {
      const partialData = {
        acceptances: "not an array",
        lastChecked: "invalid date",
        userPreferences: { showReminders: true },
      };

      mockStorage.getItem.mockReturnValue(JSON.stringify(partialData));

      const tracker = ConsentTracker.getInstance();
      const data = await tracker.loadStoredData();

      expect(data).toBeDefined();
      expect(Array.isArray(data!.acceptances)).toBe(true);
      expect(data!.lastChecked).toBeInstanceOf(Date);
    });

    it("should return null when no data exists", async () => {
      mockStorage.getItem.mockReturnValue(null);

      const tracker = ConsentTracker.getInstance();
      const data = await tracker.loadStoredData();

      expect(data).toBeNull();
    });
  });

  describe("getCurrentAcceptance", () => {
    it("should return current acceptance", async () => {
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const tracker = ConsentTracker.getInstance();
      await tracker.storeAcceptance(acceptance);

      const current = await tracker.getCurrentAcceptance();
      expect(current).toBeDefined();
      expect(current!.version).toBe("1.0.0");
    });

    it("should return null when no acceptance exists", async () => {
      const tracker = ConsentTracker.getInstance();
      const current = await tracker.getCurrentAcceptance();
      expect(current).toBeNull();
    });
  });

  describe("clearStoredData", () => {
    it("should clear all stored data", async () => {
      const tracker = ConsentTracker.getInstance();

      // Store some data first
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };
      await tracker.storeAcceptance(acceptance);

      // Clear data
      await tracker.clearStoredData();

      expect(mockStorage.removeItem).toHaveBeenCalled();

      const data = await tracker.loadStoredData();
      expect(data).toBeNull();
    });
  });

  describe("isStorageAvailable", () => {
    it("should detect storage availability", () => {
      const tracker = ConsentTracker.getInstance();
      expect(tracker.isStorageAvailable()).toBe(true);
    });

    it("should detect storage unavailability", () => {
      mockStorage.setItem.mockImplementation(() => {
        throw new Error("Storage not available");
      });

      // Create new instance to trigger availability check
      (ConsentTracker as any).instance = null;
      const tracker = ConsentTracker.getInstance();
      expect(tracker.isStorageAvailable()).toBe(false);
    });
  });
});

describe("ConsentValidator", () => {
  describe("hasValidConsent", () => {
    let tracker: ConsentTracker;

    beforeEach(() => {
      const mockStorage = createMockStorage();
      Object.defineProperty(window, "localStorage", {
        value: mockStorage,
        writable: true,
      });
      (ConsentTracker as any).instance = null;
      tracker = ConsentTracker.getInstance();
    });

    it("should return invalid when no acceptance exists", async () => {
      const result = await ConsentValidator.hasValidConsent("1.0.0");

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe("No acceptance found");
    });

    it("should return invalid for version mismatch", async () => {
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      await tracker.storeAcceptance(acceptance);

      const result = await ConsentValidator.hasValidConsent("2.0.0");

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe("Version mismatch");
      expect(result.acceptance).toBeDefined();
    });

    it("should return valid for matching version", async () => {
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      await tracker.storeAcceptance(acceptance);

      const result = await ConsentValidator.hasValidConsent("1.0.0");

      expect(result.isValid).toBe(true);
      expect(result.acceptance).toBeDefined();
    });

    it("should handle expired acceptance", async () => {
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.EXPIRED,
        consentType: ConsentType.INITIAL,
      };

      await tracker.storeAcceptance(acceptance);

      const result = await ConsentValidator.hasValidConsent("1.0.0");

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe("Acceptance expired");
    });

    it("should handle grace period expiration", async () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 35); // 35 days ago

      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: oldDate,
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.UPDATE,
      };

      await tracker.storeAcceptance(acceptance);

      const result = await ConsentValidator.hasValidConsent("1.0.0", 30);

      expect(result.isValid).toBe(false);
      expect(result.reason).toBe("Grace period expired");
    });
  });

  describe("isVersionCompatible", () => {
    it("should return true for exact match", () => {
      expect(ConsentValidator.isVersionCompatible("1.0.0", "1.0.0")).toBe(true);
    });

    it("should return false for different versions", () => {
      expect(ConsentValidator.isVersionCompatible("1.0.0", "2.0.0")).toBe(
        false,
      );
    });

    it("should return false for empty versions", () => {
      expect(ConsentValidator.isVersionCompatible("", "1.0.0")).toBe(false);
      expect(ConsentValidator.isVersionCompatible("1.0.0", "")).toBe(false);
    });
  });

  describe("validateAcceptance", () => {
    it("should validate correct acceptance data", () => {
      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = ConsentValidator.validateAcceptance(acceptance);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should detect missing required fields", () => {
      const acceptance = {
        version: "",
        acceptedAt: null,
        status: null,
        consentType: null,
      } as any;

      const result = ConsentValidator.validateAcceptance(acceptance);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain("Version is required");
    });

    it("should detect invalid version format", () => {
      const acceptance: UserTermsAcceptance = {
        version: "invalid-version",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = ConsentValidator.validateAcceptance(acceptance);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Invalid version format");
    });

    it("should detect future timestamps", () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      const acceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: futureDate,
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      };

      const result = ConsentValidator.validateAcceptance(acceptance);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Acceptance timestamp cannot be in the future",
      );
    });
  });

  describe("createAcceptance", () => {
    it("should create valid acceptance record", () => {
      const acceptance = ConsentValidator.createAcceptance("1.0.0");

      expect(acceptance.version).toBe("1.0.0");
      expect(acceptance.acceptedAt).toBeInstanceOf(Date);
      expect(acceptance.status).toBe(AcceptanceStatus.ACCEPTED);
      expect(acceptance.consentType).toBe(ConsentType.INITIAL);
    });

    it("should merge additional data", () => {
      const acceptance = ConsentValidator.createAcceptance(
        "1.0.0",
        ConsentType.UPDATE,
        {
          userAgent: "test-agent",
        },
      );

      expect(acceptance.consentType).toBe(ConsentType.UPDATE);
      expect(acceptance.userAgent).toBe("test-agent");
    });
  });
});

describe("ConsentManager", () => {
  let config: TermsConfig;
  let manager: ConsentManager;

  beforeEach(() => {
    const mockStorage = createMockStorage();
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });
    (ConsentTracker as any).instance = null;

    config = {
      currentVersion: "1.0.0",
      requireAcceptance: true,
      showChangesHighlight: true,
      gracePeriodDays: 30,
      enableVersionHistory: true,
      maxStoredVersions: 5,
    };

    manager = new ConsentManager(config);
  });

  describe("recordAcceptance", () => {
    it("should record acceptance successfully", async () => {
      const result = await manager.recordAcceptance("1.0.0");

      expect(result.success).toBe(true);
      expect(result.acceptance).toBeDefined();
      expect(result.acceptance!.version).toBe("1.0.0");
    });

    it("should validate acceptance data", async () => {
      const result = await manager.recordAcceptance("");

      expect(result.success).toBe(false);
      expect(result.error!.code).toBe(TermsErrorCode.VALIDATION_ERROR);
      expect(result.error!.userFriendly).toBe(true);
    });

    it("should include recovery actions in errors", async () => {
      const result = await manager.recordAcceptance("");

      expect(result.error!.recoveryActions).toBeDefined();
      expect(result.error!.recoveryActions!.length).toBeGreaterThan(0);
    });
  });

  describe("needsAcceptance", () => {
    it("should return false when acceptance not required", async () => {
      const configNoAcceptance = { ...config, requireAcceptance: false };
      const managerNoAcceptance = new ConsentManager(configNoAcceptance);

      const result = await managerNoAcceptance.needsAcceptance();

      expect(result.needsAcceptance).toBe(false);
    });

    it("should return true when no acceptance exists", async () => {
      const result = await manager.needsAcceptance();

      expect(result.needsAcceptance).toBe(true);
    });

    it("should return false when valid acceptance exists", async () => {
      await manager.recordAcceptance("1.0.0");

      const result = await manager.needsAcceptance();

      expect(result.needsAcceptance).toBe(false);
    });
  });

  describe("getConsentStatus", () => {
    it("should return no consent status when no acceptance exists", async () => {
      const status = await manager.getConsentStatus();

      expect(status.hasConsent).toBe(false);
      expect(status.needsUpdate).toBe(true);
    });

    it("should return consent status with version info", async () => {
      await manager.recordAcceptance("1.0.0");

      const status = await manager.getConsentStatus();

      expect(status.hasConsent).toBe(true);
      expect(status.acceptedVersion).toBe("1.0.0");
      expect(status.needsUpdate).toBe(false);
    });

    it("should calculate grace period remaining", async () => {
      await manager.recordAcceptance("1.0.0", ConsentType.UPDATE);

      const status = await manager.getConsentStatus();

      expect(status.gracePeriodRemaining).toBeDefined();
      expect(status.gracePeriodRemaining).toBeGreaterThan(0);
    });
  });

  describe("exportConsentData", () => {
    it("should export consent data for LGPD compliance", async () => {
      await manager.recordAcceptance("1.0.0");

      const exportData = await manager.exportConsentData();

      expect(exportData.acceptanceHistory).toBeDefined();
      expect(exportData.currentAcceptance).toBeDefined();
      expect(exportData.storageInfo).toBeDefined();
      expect(exportData.storageInfo.storageAvailable).toBe(true);
    });
  });
});

describe("Convenience Functions", () => {
  beforeEach(() => {
    const mockStorage = createMockStorage();
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });
    (ConsentTracker as any).instance = null;
  });

  describe("hasValidConsent", () => {
    it("should return boolean result", async () => {
      const result = await hasValidConsent("1.0.0");
      expect(typeof result).toBe("boolean");
    });
  });

  describe("recordUserAcceptance", () => {
    it("should record acceptance and return boolean", async () => {
      const result = await recordUserAcceptance("1.0.0");
      expect(typeof result).toBe("boolean");
      expect(result).toBe(true);
    });
  });

  describe("getCurrentUserAcceptance", () => {
    it("should return current acceptance or null", async () => {
      const result = await getCurrentUserAcceptance();
      expect(result).toBeNull();

      await recordUserAcceptance("1.0.0");

      const result2 = await getCurrentUserAcceptance();
      expect(result2).toBeDefined();
      expect(result2!.version).toBe("1.0.0");
    });
  });
});
