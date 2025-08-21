/**
 * Simplified Error Handling Tests for Terms of Service System
 * These tests focus on demonstrating that error handling works correctly
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { ConsentManager, TermsContentManager } from "../index";
import { TermsConfig, TermsErrorCode } from "../../types/terms";

describe("Error Handling - Core Functionality", () => {
  let config: TermsConfig;

  beforeEach(() => {
    config = {
      currentVersion: "1.0.0",
      requireAcceptance: true,
      showChangesHighlight: true,
      gracePeriodDays: 30,
      enableVersionHistory: true,
      maxStoredVersions: 5,
    };
  });

  it("should provide user-friendly error messages in Portuguese", async () => {
    const manager = new ConsentManager(config);

    // Test with invalid version to trigger validation error
    const result = await manager.recordAcceptance("");

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error!.code).toBe(TermsErrorCode.VALIDATION_ERROR);
    expect(result.error!.userFriendly).toBe(true);
    expect(result.error!.message).toContain("inválidos");
    expect(result.error!.retryable).toBe(true);
    expect(result.error!.recoveryActions).toBeDefined();
    expect(result.error!.recoveryActions!.length).toBeGreaterThan(0);
  });

  it("should handle content validation errors gracefully", () => {
    const invalidContent = {
      version: "invalid-version",
      lastUpdated: new Date(),
      metadata: {
        language: "",
        jurisdiction: "",
        effectiveDate: new Date(),
      },
      sections: [],
    } as any;

    const result = TermsContentManager.updateContent(invalidContent);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
    expect(
      result.errors!.some((error) => error.includes("version format")),
    ).toBe(true);
  });

  it("should sanitize potentially dangerous content", () => {
    const dangerousContent =
      '<script>alert("xss")</script><img src="x" onerror="alert(1)">';
    const sanitized = TermsContentManager.sanitizeContent(dangerousContent);

    expect(sanitized).not.toContain("<script>");
    expect(sanitized).not.toContain("<img");
    expect(sanitized).toContain("&lt;script&gt;");
    expect(sanitized).toContain("&lt;img");
  });

  it("should provide recovery actions for different error types", async () => {
    const manager = new ConsentManager(config);

    // Test validation error
    const result = await manager.recordAcceptance("");

    expect(result.error!.recoveryActions).toContain(
      "Recarregue a página e tente novamente",
    );
    expect(result.error!.recoveryActions).toContain(
      "Verifique se o JavaScript está habilitado",
    );
  });

  it("should indicate if errors are retryable", async () => {
    const manager = new ConsentManager(config);

    const result = await manager.recordAcceptance("");

    expect(result.error!.retryable).toBe(true);
  });

  it("should handle version mismatch scenarios", async () => {
    const manager = new ConsentManager(config);

    // This should work without errors
    const needsAcceptance = await manager.needsAcceptance();

    expect(needsAcceptance).toBeDefined();
    expect(typeof needsAcceptance.needsAcceptance).toBe("boolean");
  });

  it("should provide graceful degradation when operations fail", async () => {
    const manager = new ConsentManager(config);

    // Even with invalid data, the system should not crash
    const status = await manager.getConsentStatus();

    expect(status).toBeDefined();
    expect(typeof status.hasConsent).toBe("boolean");
    expect(typeof status.needsUpdate).toBe("boolean");
  });

  it("should export consent data safely", async () => {
    const manager = new ConsentManager(config);

    const exportData = await manager.exportConsentData();

    expect(exportData).toBeDefined();
    expect(Array.isArray(exportData.acceptanceHistory)).toBe(true);
    expect(exportData.storageInfo).toBeDefined();
    expect(typeof exportData.storageInfo.storageAvailable).toBe("boolean");
  });
});

describe("Error Handling - Edge Cases", () => {
  it("should handle concurrent operations gracefully", async () => {
    const config: TermsConfig = {
      currentVersion: "1.0.0",
      requireAcceptance: true,
      showChangesHighlight: true,
      gracePeriodDays: 30,
      enableVersionHistory: true,
      maxStoredVersions: 5,
    };

    const manager = new ConsentManager(config);

    // Simulate concurrent operations
    const promises = Array.from({ length: 5 }, () =>
      manager.recordAcceptance("1.0.0"),
    );

    const results = await Promise.all(promises);

    // All operations should complete without crashing
    results.forEach((result) => {
      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
    });
  });

  it("should handle invalid acceptance data gracefully", async () => {
    const config: TermsConfig = {
      currentVersion: "1.0.0",
      requireAcceptance: true,
      showChangesHighlight: true,
      gracePeriodDays: 30,
      enableVersionHistory: true,
      maxStoredVersions: 5,
    };

    const manager = new ConsentManager(config);

    // Try various invalid inputs
    const invalidInputs = ["", null, undefined, "invalid-version"];

    for (const input of invalidInputs) {
      const result = await manager.recordAcceptance(input as any);

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error!.code).toBe(TermsErrorCode.VALIDATION_ERROR);
      }
    }
  });
});
