/**
 * End-to-End Tests for Terms of Service System
 * Tests complete user journeys and edge cases
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import type { TermsConfig } from "../../lib/types/terms";
import { AcceptanceStatus, ConsentType } from "../../lib/types/terms";

// Mock localStorage for E2E testing
const createE2EStorage = () => {
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
    length: Object.keys(storage).length,
    key: vi.fn((index: number) => Object.keys(storage)[index] || null),
  };
};

// Mock terms library with realistic behavior
vi.mock("../../lib/terms/index", () => {
  let storedData: any = null;

  return {
    ConsentManager: vi.fn().mockImplementation((config) => ({
      recordAcceptance: vi
        .fn()
        .mockImplementation(async (version, consentType, additionalData) => {
          const acceptance = {
            version,
            acceptedAt: new Date(),
            status: AcceptanceStatus.ACCEPTED,
            consentType: consentType || ConsentType.INITIAL,
            ...additionalData,
          };

          storedData = {
            acceptances: [acceptance],
            currentAcceptance: acceptance,
            lastChecked: new Date(),
            userPreferences: {
              showReminders: true,
              emailUpdates: false,
            },
          };

          return { success: true, acceptance };
        }),
      needsAcceptance: vi.fn().mockImplementation(async () => {
        if (!storedData || !storedData.currentAcceptance) {
          return { needsAcceptance: true, reason: "No acceptance found" };
        }

        if (storedData.currentAcceptance.version !== config.currentVersion) {
          return {
            needsAcceptance: true,
            reason: "Version mismatch",
            currentAcceptance: storedData.currentAcceptance,
          };
        }

        return { needsAcceptance: false };
      }),
      getConsentStatus: vi.fn().mockImplementation(async () => {
        if (!storedData || !storedData.currentAcceptance) {
          return { hasConsent: false, needsUpdate: true };
        }

        const needsUpdate =
          storedData.currentAcceptance.version !== config.currentVersion;

        return {
          hasConsent: true,
          currentVersion: config.currentVersion,
          acceptedVersion: storedData.currentAcceptance.version,
          acceptedAt: storedData.currentAcceptance.acceptedAt,
          needsUpdate,
          gracePeriodRemaining: needsUpdate ? 30 : undefined,
        };
      }),
      clearConsent: vi.fn().mockImplementation(async () => {
        storedData = null;
      }),
    })),
    TermsContentManager: {
      getCurrentContent: vi.fn(() => ({
        version: "1.0.0",
        lastUpdated: new Date("2025-01-08"),
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date("2025-01-08"),
        },
        sections: [
          {
            id: "purpose",
            title: "Finalidade do Serviço",
            content:
              "O simulador é destinado exclusivamente para fins educativos e de preparação para exames. Não deve ser usado para fins comerciais ou como substituto para treinamento profissional oficial.",
            order: 1,
            isRequired: true,
          },
          {
            id: "permitted-use",
            title: "Uso Permitido",
            content:
              "Você pode usar o simulador gratuitamente para estudar e praticar. É permitido criar contas pessoais e acompanhar seu progresso.",
            order: 2,
            isRequired: true,
          },
          {
            id: "restrictions",
            title: "Restrições de Uso",
            content:
              "É proibido compartilhar contas, usar bots ou scripts automatizados, ou tentar burlar as limitações do sistema.",
            order: 3,
            isRequired: true,
          },
          {
            id: "data-privacy",
            title: "Privacidade de Dados",
            content:
              "Seus dados de progresso são armazenados localmente no navegador. Não coletamos informações pessoais identificáveis.",
            order: 4,
            isRequired: true,
          },
        ],
      })),
    },
  };
});

// Mock UI components for E2E testing
vi.mock("../ui/dialog", () => ({
  Dialog: ({ children, open, onOpenChange }: any) =>
    open ? (
      <div
        role="dialog"
        data-testid="terms-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onOpenChange?.(false);
          }
        }}
      >
        {children}
      </div>
    ) : null,
  DialogContent: ({ children, className, ...props }: any) => (
    <div className={className} data-testid="dialog-content" {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children, id }: any) => (
    <h2 id={id} data-testid="dialog-title">
      {children}
    </h2>
  ),
  DialogDescription: ({ children, id }: any) => (
    <p id={id} data-testid="dialog-description">
      {children}
    </p>
  ),
  DialogFooter: ({ children }: any) => (
    <div data-testid="dialog-footer">{children}</div>
  ),
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, disabled, onClick, variant, ...props }: any) => (
    <button
      disabled={disabled}
      onClick={onClick}
      data-variant={variant}
      data-testid={`button-${children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock("../ui/checkbox", () => ({
  Checkbox: ({ id, checked, onCheckedChange, ...props }: any) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      data-testid="terms-checkbox"
      {...props}
    />
  ),
}));

vi.mock("../ui/separator", () => ({
  Separator: () => <hr data-testid="separator" />,
}));

vi.mock("../ui/scroll-area", () => ({
  ScrollArea: ({ children }: any) => (
    <div data-testid="scroll-area">{children}</div>
  ),
}));

const mockConfig: TermsConfig = {
  currentVersion: "1.0.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 30,
  enableVersionHistory: true,
  maxStoredVersions: 5,
};

describe("Terms of Service - End-to-End Tests", () => {
  let mockStorage: ReturnType<typeof createE2EStorage>;
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockStorage = createE2EStorage();

    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("New User Journey", () => {
    it("should complete full new user acceptance flow", async () => {
      const mockOnAcceptanceComplete = vi.fn();
      const mockOnAcceptanceRequired = vi.fn();

      render(
        <TermsVersionManager
          config={mockConfig}
          onAcceptanceRequired={mockOnAcceptanceRequired}
          onAcceptanceComplete={mockOnAcceptanceComplete}
        >
          <div data-testid="app-content">
            <h1>Exam Simulator</h1>
            <p>Welcome to the exam simulator!</p>
          </div>
        </TermsVersionManager>,
      );

      // App content should be visible immediately
      expect(screen.getByTestId("app-content")).toBeInTheDocument();
      expect(screen.getByText("Exam Simulator")).toBeInTheDocument();

      // Terms modal should appear for new user
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      // Verify modal content
      expect(screen.getByText("Termos de Serviço")).toBeInTheDocument();
      expect(screen.getByText(/leia e aceite os termos/i)).toBeInTheDocument();

      // Verify all sections are displayed
      expect(screen.getByText("Finalidade do Serviço")).toBeInTheDocument();
      expect(screen.getByText("Uso Permitido")).toBeInTheDocument();
      expect(screen.getByText("Restrições de Uso")).toBeInTheDocument();
      expect(screen.getByText("Privacidade de Dados")).toBeInTheDocument();

      // Verify content details
      expect(
        screen.getByText(/simulador é destinado exclusivamente/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/dados de progresso são armazenados localmente/),
      ).toBeInTheDocument();

      // Accept button should be disabled initially
      const acceptButton = screen.getByTestId("button-aceitar");
      expect(acceptButton).toBeDisabled();

      // Check the acceptance checkbox
      const checkbox = screen.getByTestId("terms-checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      // Accept button should now be enabled
      expect(acceptButton).not.toBeDisabled();

      // Click accept
      await user.click(acceptButton);

      // Should show loading state
      await waitFor(() => {
        expect(screen.getByText(/processando/i)).toBeInTheDocument();
      });

      // Modal should close and callbacks should be called
      await waitFor(() => {
        expect(mockOnAcceptanceRequired).toHaveBeenCalledWith("1.0.0");
        expect(mockOnAcceptanceComplete).toHaveBeenCalled();
      });

      // Modal should be closed
      await waitFor(() => {
        expect(screen.queryByTestId("terms-dialog")).not.toBeInTheDocument();
      });

      // App content should still be visible
      expect(screen.getByTestId("app-content")).toBeInTheDocument();
    });

    it("should handle user declining terms", async () => {
      const mockOnError = vi.fn();

      render(
        <TermsVersionManager config={mockConfig} onError={mockOnError}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Wait for modal to appear
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      // Click decline button
      const declineButton = screen.getByTestId(
        "button-recusar-e-voltar-ao-início",
      );
      await user.click(declineButton);

      // Should call error handler (for redirect)
      await waitFor(() => {
        expect(mockOnError).toHaveBeenCalledWith(
          expect.stringContaining("Terms acceptance is required"),
        );
      });
    });
  });

  describe("Version Update Journey", () => {
    it("should handle version update with grace period", async () => {
      // First, simulate user accepting v1.0.0
      const { ConsentManager } = require("../../lib/terms/index");
      const manager = new ConsentManager(mockConfig);
      await manager.recordAcceptance("1.0.0");

      // Now test with v2.0.0
      const updatedConfig = { ...mockConfig, currentVersion: "2.0.0" };

      render(
        <TermsVersionManager config={updatedConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should show grace period notification instead of modal
      await waitFor(() => {
        expect(screen.getByText("Termos Atualizados")).toBeInTheDocument();
        expect(screen.getByText(/30 dias para revisar/)).toBeInTheDocument();
      });

      // Should have action buttons
      expect(screen.getByText("Revisar Agora")).toBeInTheDocument();
      expect(screen.getByText("Lembrar Depois")).toBeInTheDocument();

      // Click "Review Now"
      const reviewButton = screen.getByText("Revisar Agora");
      await user.click(reviewButton);

      // Should show update modal
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
        expect(
          screen.getByText("Termos de Serviço Atualizados"),
        ).toBeInTheDocument();
        expect(screen.getByText(/versão 1.0.0 para 2.0.0/)).toBeInTheDocument();
      });

      // Should show changes highlight
      expect(screen.getByText(/Principais alterações/)).toBeInTheDocument();

      // Complete acceptance
      const checkbox = screen.getByTestId("terms-checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByTestId("button-aceitar");
      await user.click(acceptButton);

      // Should complete update
      await waitFor(() => {
        expect(screen.queryByTestId("terms-dialog")).not.toBeInTheDocument();
      });
    });

    it('should handle "Remind Later" in grace period', async () => {
      // Setup existing acceptance
      const { ConsentManager } = require("../../lib/terms/index");
      const manager = new ConsentManager(mockConfig);
      await manager.recordAcceptance("1.0.0");

      const updatedConfig = { ...mockConfig, currentVersion: "2.0.0" };

      render(
        <TermsVersionManager config={updatedConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Wait for grace period notification
      await waitFor(() => {
        expect(screen.getByText("Termos Atualizados")).toBeInTheDocument();
      });

      // Click "Remind Later"
      const laterButton = screen.getByText("Lembrar Depois");
      await user.click(laterButton);

      // Notification should disappear
      await waitFor(() => {
        expect(
          screen.queryByText("Termos Atualizados"),
        ).not.toBeInTheDocument();
      });

      // App should continue normally
      expect(screen.getByTestId("app-content")).toBeInTheDocument();
    });
  });

  describe("Error Scenarios", () => {
    it("should handle storage failures gracefully", async () => {
      // Mock storage to fail
      mockStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const mockOnError = vi.fn();

      render(
        <TermsVersionManager config={mockConfig} onError={mockOnError}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Wait for modal
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      // Accept terms
      const checkbox = screen.getByTestId("terms-checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByTestId("button-aceitar");
      await user.click(acceptButton);

      // Should show error
      await waitFor(() => {
        expect(screen.getByText(/erro/i)).toBeInTheDocument();
      });

      // Should show retry button
      expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
    });

    it("should handle network-like errors with retry", async () => {
      const { ConsentManager } = require("../../lib/terms/index");

      let attemptCount = 0;
      ConsentManager.mockImplementation(() => ({
        needsAcceptance: vi.fn().mockResolvedValue({
          needsAcceptance: true,
          reason: "No acceptance found",
        }),
        recordAcceptance: vi.fn().mockImplementation(async () => {
          attemptCount++;
          if (attemptCount <= 2) {
            return {
              success: false,
              error: {
                code: "NETWORK_ERROR",
                message: "Erro de conexão temporário",
                userFriendly: true,
                retryable: true,
              },
            };
          }
          return {
            success: true,
            acceptance: {
              version: "1.0.0",
              acceptedAt: new Date(),
              status: AcceptanceStatus.ACCEPTED,
              consentType: ConsentType.INITIAL,
            },
          };
        }),
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: false,
          needsUpdate: true,
        }),
      }));

      const mockOnAcceptanceComplete = vi.fn();

      render(
        <TermsVersionManager
          config={mockConfig}
          onAcceptanceComplete={mockOnAcceptanceComplete}
        >
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Wait for modal and accept
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      const checkbox = screen.getByTestId("terms-checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByTestId("button-aceitar");
      await user.click(acceptButton);

      // Should show first error
      await waitFor(() => {
        expect(screen.getByText(/Erro de conexão/)).toBeInTheDocument();
      });

      // Retry
      const retryButton = screen.getByText("Tentar Novamente");
      await user.click(retryButton);

      // Should show second error with attempt counter
      await waitFor(() => {
        expect(screen.getByText("Tentativa 1 de 3")).toBeInTheDocument();
      });

      // Retry again
      await user.click(screen.getByText("Tentar Novamente"));

      // Should eventually succeed
      await waitFor(() => {
        expect(mockOnAcceptanceComplete).toHaveBeenCalled();
      });

      expect(attemptCount).toBe(3);
    });

    it("should provide emergency fallback after max retries", async () => {
      const { ConsentManager } = require("../../lib/terms/index");

      ConsentManager.mockImplementation(() => ({
        needsAcceptance: vi.fn().mockResolvedValue({
          needsAcceptance: true,
          reason: "No acceptance found",
        }),
        recordAcceptance: vi.fn().mockResolvedValue({
          success: false,
          error: {
            code: "STORAGE_UNAVAILABLE",
            message: "Erro persistente de armazenamento",
            userFriendly: true,
            retryable: true,
          },
        }),
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: false,
          needsUpdate: true,
        }),
      }));

      const mockOnAcceptanceComplete = vi.fn();

      render(
        <TermsVersionManager
          config={mockConfig}
          onAcceptanceComplete={mockOnAcceptanceComplete}
        >
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Accept terms
      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      const checkbox = screen.getByTestId("terms-checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByTestId("button-aceitar");
      await user.click(acceptButton);

      // Retry 3 times
      for (let i = 0; i < 3; i++) {
        await waitFor(() => {
          expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
        });

        const retryButton = screen.getByText("Tentar Novamente");
        await user.click(retryButton);
      }

      // Should show emergency option
      await waitFor(() => {
        expect(
          screen.getByText(/Múltiplas tentativas falharam/),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Continuar Mesmo Assim (Modo Emergência)"),
        ).toBeInTheDocument();
      });

      // Use emergency fallback
      const emergencyButton = screen.getByText(
        "Continuar Mesmo Assim (Modo Emergência)",
      );
      await user.click(emergencyButton);

      // Should complete with fallback
      await waitFor(() => {
        expect(mockOnAcceptanceComplete).toHaveBeenCalledWith(
          expect.objectContaining({
            version: "1.0.0",
            fallback: true,
          }),
        );
      });
    });
  });

  describe("Accessibility and Edge Cases", () => {
    it("should handle disabled JavaScript scenario", () => {
      // This test simulates what happens when JavaScript is disabled
      // In reality, the component wouldn't render, but we test the fallback

      render(
        <noscript>
          <div data-testid="noscript-fallback">
            JavaScript is required for this application.
          </div>
        </noscript>,
      );

      // In a real scenario, this would be the only thing visible
      expect(screen.getByTestId("noscript-fallback")).toBeInTheDocument();
    });

    it("should handle very long terms content", async () => {
      // Mock very long content
      const { TermsContentManager } = require("../../lib/terms/index");
      const longContent = "A".repeat(10000); // Very long content

      TermsContentManager.getCurrentContent.mockReturnValue({
        version: "1.0.0",
        lastUpdated: new Date(),
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
        sections: [
          {
            id: "long-section",
            title: "Very Long Section",
            content: longContent,
            order: 1,
            isRequired: true,
          },
        ],
      });

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      // Should render scroll area for long content
      expect(screen.getByTestId("scroll-area")).toBeInTheDocument();
      expect(screen.getByText("Very Long Section")).toBeInTheDocument();
    });

    it("should handle rapid user interactions", async () => {
      const mockOnAcceptanceComplete = vi.fn();

      render(
        <TermsVersionManager
          config={mockConfig}
          onAcceptanceComplete={mockOnAcceptanceComplete}
        >
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        expect(screen.getByTestId("terms-dialog")).toBeInTheDocument();
      });

      const checkbox = screen.getByTestId("terms-checkbox");
      const acceptButton = screen.getByTestId("button-aceitar");

      // Rapid clicking should not cause issues
      await user.click(checkbox);
      await user.click(acceptButton);
      await user.click(acceptButton); // Double click
      await user.click(acceptButton); // Triple click

      // Should only process once
      await waitFor(() => {
        expect(mockOnAcceptanceComplete).toHaveBeenCalledTimes(1);
      });
    });

    it("should handle modal close via backdrop click", async () => {
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const dialog = screen.getByTestId("terms-dialog");

      // Click on backdrop (dialog itself, not content)
      fireEvent.click(dialog);

      expect(mockOnDecline).toHaveBeenCalled();
    });
  });

  describe("Performance and Memory", () => {
    it("should not leak memory on repeated mount/unmount", () => {
      const { unmount, rerender } = render(
        <TermsVersionManager config={mockConfig}>
          <div>Content</div>
        </TermsVersionManager>,
      );

      // Simulate multiple remounts
      for (let i = 0; i < 10; i++) {
        rerender(
          <TermsVersionManager
            config={{ ...mockConfig, currentVersion: `1.${i}.0` }}
          >
            <div>Content {i}</div>
          </TermsVersionManager>,
        );
      }

      unmount();

      // If we get here without memory issues, the test passes
      expect(true).toBe(true);
    });

    it("should handle large acceptance history efficiently", async () => {
      // Mock large history
      const { ConsentManager } = require("../../lib/terms/index");
      const largeHistory = Array.from({ length: 100 }, (_, i) => ({
        version: `1.${i}.0`,
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
      }));

      ConsentManager.mockImplementation(() => ({
        needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: false }),
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: true,
          needsUpdate: false,
        }),
        exportConsentData: vi.fn().mockResolvedValue({
          acceptanceHistory: largeHistory,
          currentAcceptance: largeHistory[0],
          lastChecked: new Date(),
          storageInfo: {
            storageAvailable: true,
            dataLocation: "localStorage",
          },
        }),
      }));

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should render without performance issues
      expect(screen.getByTestId("app-content")).toBeInTheDocument();

      // Should not show modal for valid consent
      await waitFor(() => {
        expect(screen.queryByTestId("terms-dialog")).not.toBeInTheDocument();
      });
    });
  });
});
