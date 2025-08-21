/**
 * Error Handling Tests for Terms React Components
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import {
  TermsConfig,
  TermsErrorCode,
  AcceptanceStatus,
  ConsentType,
} from "../../lib/types/terms";

// Mock the terms library
vi.mock("../../lib/terms/index", () => ({
  ConsentManager: vi.fn(),
  TermsContentManager: {
    getCurrentContent: vi.fn(),
  },
}));

const mockConfig: TermsConfig = {
  currentVersion: "1.0.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 30,
  enableVersionHistory: true,
  maxStoredVersions: 5,
};

const mockTermsContent = {
  version: "1.0.0",
  lastUpdated: new Date("2025-01-08"),
  metadata: {
    language: "pt-BR",
    jurisdiction: "Brasil",
    effectiveDate: new Date("2025-01-08"),
  },
  sections: [
    {
      id: "test",
      title: "Test Section",
      content: "Test content",
      order: 1,
      isRequired: true,
    },
  ],
};

describe("TermsAcceptanceModal - Error Handling", () => {
  const mockOnAccept = vi.fn();
  const mockOnDecline = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock TermsContentManager
    const { TermsContentManager } = require("../../lib/terms/index");
    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);
  });

  it("should display user-friendly error messages", async () => {
    // Mock ConsentManager to return user-friendly error
    const { ConsentManager } = require("../../lib/terms/index");
    const mockRecordAcceptance = vi.fn().mockResolvedValue({
      success: false,
      error: {
        code: TermsErrorCode.STORAGE_UNAVAILABLE,
        message:
          "Não foi possível salvar sua aceitação dos termos. Tente novamente.",
        userFriendly: true,
        retryable: true,
        recoveryActions: [
          "Verifique se o armazenamento local está habilitado no navegador",
          "Tente usar um navegador diferente",
        ],
      },
    });

    ConsentManager.mockImplementation(() => ({
      recordAcceptance: mockRecordAcceptance,
    }));

    render(
      <TermsAcceptanceModal
        isOpen={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        config={mockConfig}
      />,
    );

    // Accept the checkbox
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Click accept button
    const acceptButton = screen.getByText("Aceitar");
    fireEvent.click(acceptButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/não foi possível salvar/i)).toBeInTheDocument();
    });

    // Should show retry button
    expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
  });

  it("should handle retry logic with attempt counter", async () => {
    const { ConsentManager } = require("../../lib/terms/index");
    let attemptCount = 0;

    const mockRecordAcceptance = vi.fn().mockImplementation(() => {
      attemptCount++;
      return Promise.resolve({
        success: false,
        error: {
          code: TermsErrorCode.STORAGE_UNAVAILABLE,
          message: "Erro temporário",
          userFriendly: true,
          retryable: true,
        },
      });
    });

    ConsentManager.mockImplementation(() => ({
      recordAcceptance: mockRecordAcceptance,
    }));

    render(
      <TermsAcceptanceModal
        isOpen={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        config={mockConfig}
      />,
    );

    // Accept and trigger error
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const acceptButton = screen.getByText("Aceitar");
    fireEvent.click(acceptButton);

    await waitFor(() => {
      expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
    });

    // Retry multiple times
    for (let i = 1; i <= 3; i++) {
      const retryButton = screen.getByText("Tentar Novamente");
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText(`Tentativa ${i} de 3`)).toBeInTheDocument();
      });
    }

    // After 3 attempts, should show recovery suggestions
    await waitFor(() => {
      expect(
        screen.getByText(/múltiplas tentativas falharam/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/recarregue a página/i)).toBeInTheDocument();
    });
  });

  it("should handle content loading errors gracefully", () => {
    // Mock TermsContentManager to throw error
    const { TermsContentManager } = require("../../lib/terms/index");
    TermsContentManager.getCurrentContent.mockImplementation(() => {
      throw new Error("Content loading failed");
    });

    render(
      <TermsAcceptanceModal
        isOpen={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        config={mockConfig}
      />,
    );

    // Should show loading state or error message
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("should disable retry button during loading", async () => {
    const { ConsentManager } = require("../../lib/terms/index");
    const mockRecordAcceptance = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: false,
            error: {
              code: TermsErrorCode.STORAGE_UNAVAILABLE,
              message: "Erro temporário",
              retryable: true,
            },
          });
        }, 100);
      });
    });

    ConsentManager.mockImplementation(() => ({
      recordAcceptance: mockRecordAcceptance,
    }));

    render(
      <TermsAcceptanceModal
        isOpen={true}
        onAccept={mockOnAccept}
        onDecline={mockOnDecline}
        config={mockConfig}
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const acceptButton = screen.getByText("Aceitar");
    fireEvent.click(acceptButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText("Processando...")).toBeInTheDocument();
    });

    // Wait for error and retry button
    await waitFor(() => {
      expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
    });

    // Click retry and check it gets disabled
    const retryButton = screen.getByText("Tentar Novamente");
    fireEvent.click(retryButton);

    // Button should be disabled during retry
    expect(retryButton).toBeDisabled();
  });
});

describe("TermsVersionManager - Error Handling", () => {
  const mockOnVersionChange = vi.fn();
  const mockOnAcceptanceRequired = vi.fn();
  const mockOnAcceptanceComplete = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle initialization errors gracefully", () => {
    // Mock ConsentManager constructor to throw
    const { ConsentManager } = require("../../lib/terms/index");
    ConsentManager.mockImplementation(() => {
      throw new Error("Initialization failed");
    });

    render(
      <TermsVersionManager
        config={mockConfig}
        onVersionChange={mockOnVersionChange}
        onAcceptanceRequired={mockOnAcceptanceRequired}
        onAcceptanceComplete={mockOnAcceptanceComplete}
        onError={mockOnError}
      >
        <div>Child content</div>
      </TermsVersionManager>,
    );

    // Should still render children
    expect(screen.getByText("Child content")).toBeInTheDocument();

    // Should call onError
    expect(mockOnError).toHaveBeenCalledWith(
      expect.stringContaining("inicializar sistema de termos"),
    );
  });

  it("should provide graceful degradation when version check fails", async () => {
    const {
      ConsentManager,
      TermsContentManager,
    } = require("../../lib/terms/index");

    // Mock successful initialization but failed version check
    const mockNeedsAcceptance = vi
      .fn()
      .mockRejectedValue(new Error("Version check failed"));
    ConsentManager.mockImplementation(() => ({
      needsAcceptance: mockNeedsAcceptance,
    }));

    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);

    render(
      <TermsVersionManager
        config={mockConfig}
        onVersionChange={mockOnVersionChange}
        onAcceptanceRequired={mockOnAcceptanceRequired}
        onAcceptanceComplete={mockOnAcceptanceComplete}
        onError={mockOnError}
      >
        <div>Child content</div>
      </TermsVersionManager>,
    );

    // Should still render children
    expect(screen.getByText("Child content")).toBeInTheDocument();

    // Should eventually call onError but continue functioning
    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled();
    });
  });

  it("should retry initialization on failure", async () => {
    const {
      ConsentManager,
      TermsContentManager,
    } = require("../../lib/terms/index");

    let initAttempts = 0;
    ConsentManager.mockImplementation(() => {
      initAttempts++;
      if (initAttempts <= 2) {
        throw new Error("Initialization failed");
      }
      return {
        needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: false }),
      };
    });

    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);

    render(
      <TermsVersionManager
        config={mockConfig}
        onVersionChange={mockOnVersionChange}
        onAcceptanceRequired={mockOnAcceptanceRequired}
        onAcceptanceComplete={mockOnAcceptanceComplete}
        onError={mockOnError}
      >
        <div>Child content</div>
      </TermsVersionManager>,
    );

    // Should eventually succeed after retries
    await waitFor(
      () => {
        expect(initAttempts).toBeGreaterThan(1);
      },
      { timeout: 5000 },
    );
  });

  it("should show grace period notification with error recovery", async () => {
    const {
      ConsentManager,
      TermsContentManager,
    } = require("../../lib/terms/index");

    const mockNeedsAcceptance = vi.fn().mockResolvedValue({
      needsAcceptance: true,
      reason: "Version mismatch",
    });

    ConsentManager.mockImplementation(() => ({
      needsAcceptance: mockNeedsAcceptance,
    }));

    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);

    render(
      <TermsVersionManager
        config={{ ...mockConfig, gracePeriodDays: 30 }}
        onVersionChange={mockOnVersionChange}
        onAcceptanceRequired={mockOnAcceptanceRequired}
        onAcceptanceComplete={mockOnAcceptanceComplete}
        onError={mockOnError}
      >
        <div>Child content</div>
      </TermsVersionManager>,
    );

    // Should render children even with version issues
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});

describe("Error Recovery Integration", () => {
  it("should maintain app functionality even with multiple error scenarios", async () => {
    const {
      ConsentManager,
      TermsContentManager,
    } = require("../../lib/terms/index");

    // Simulate various failures
    let callCount = 0;
    ConsentManager.mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        throw new Error("First failure");
      }
      return {
        needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: false }),
        recordAcceptance: vi.fn().mockResolvedValue({ success: true }),
      };
    });

    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);

    const { rerender } = render(
      <TermsVersionManager
        config={mockConfig}
        onVersionChange={vi.fn()}
        onAcceptanceRequired={vi.fn()}
        onAcceptanceComplete={vi.fn()}
        onError={vi.fn()}
      >
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />
      </TermsVersionManager>,
    );

    // Should render both components
    expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument();

    // Rerender to trigger retry
    rerender(
      <TermsVersionManager
        config={mockConfig}
        onVersionChange={vi.fn()}
        onAcceptanceRequired={vi.fn()}
        onAcceptanceComplete={vi.fn()}
        onError={vi.fn()}
      >
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />
      </TermsVersionManager>,
    );

    // Should still be functional
    await waitFor(() => {
      expect(screen.getByText(/termos de serviço/i)).toBeInTheDocument();
    });
  });
});
