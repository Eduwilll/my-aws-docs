/**
 * Integration Tests for Terms Components
 * Tests complete user acceptance flows and component interactions
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import { TermsNavigationLinks } from "../TermsNavigationLinks";
import type { TermsConfig, UserTermsAcceptance } from "../../lib/types/terms";
import { AcceptanceStatus, ConsentType } from "../../lib/types/terms";

// Mock the terms library
vi.mock("../../lib/terms/index", () => ({
  ConsentManager: vi.fn(),
  TermsContentManager: {
    getCurrentContent: vi.fn(),
  },
  ConsentValidator: {
    hasValidConsent: vi.fn(),
  },
}));

// Mock UI components
vi.mock("../ui/dialog", () => ({
  Dialog: ({ children, open, onOpenChange }: any) =>
    open ? (
      <div
        role="dialog"
        data-testid="dialog"
        onClick={() => onOpenChange?.(false)}
      >
        {children}
      </div>
    ) : null,
  DialogContent: ({ children, className, onOpenAutoFocus, ...props }: any) => (
    <div className={className} data-testid="dialog-content" {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children, className, id }: any) => (
    <h2 className={className} id={id} data-testid="dialog-title">
      {children}
    </h2>
  ),
  DialogDescription: ({ children, className, id }: any) => (
    <p className={className} id={id} data-testid="dialog-description">
      {children}
    </p>
  ),
  DialogFooter: ({ children, className }: any) => (
    <div className={className} data-testid="dialog-footer">
      {children}
    </div>
  ),
}));

vi.mock("../ui/button", () => ({
  Button: ({
    children,
    className,
    disabled,
    onClick,
    variant,
    ...props
  }: any) => (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  ),
}));

vi.mock("../ui/checkbox", () => ({
  Checkbox: ({ id, checked, onCheckedChange, className, ...props }: any) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={className}
      {...props}
    />
  ),
}));

vi.mock("../ui/separator", () => ({
  Separator: ({ className }: any) => (
    <hr className={className} data-testid="separator" />
  ),
}));

vi.mock("../ui/scroll-area", () => ({
  ScrollArea: ({ children, className }: any) => (
    <div className={className} data-testid="scroll-area">
      {children}
    </div>
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
      id: "purpose",
      title: "Finalidade do Serviço",
      content:
        "O simulador é destinado exclusivamente para fins educativos e de preparação para exames.",
      order: 1,
      isRequired: true,
    },
    {
      id: "permitted-use",
      title: "Uso Permitido",
      content:
        "Você pode usar o simulador gratuitamente para estudar e praticar.",
      order: 2,
      isRequired: true,
    },
  ],
};

describe("Terms Integration Tests", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    const { TermsContentManager } = require("../../lib/terms/index");
    TermsContentManager.getCurrentContent.mockReturnValue(mockTermsContent);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Complete User Acceptance Flow", () => {
    it("should complete full acceptance flow for new user", async () => {
      const { ConsentManager } = require("../../lib/terms/index");
      const mockRecordAcceptance = vi.fn().mockResolvedValue({
        success: true,
        acceptance: {
          version: "1.0.0",
          acceptedAt: new Date(),
          status: AcceptanceStatus.ACCEPTED,
          consentType: ConsentType.INITIAL,
        },
      });

      ConsentManager.mockImplementation(() => ({
        recordAcceptance: mockRecordAcceptance,
      }));

      const mockOnAccept = vi.fn();
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      // Verify modal is displayed
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Termos de Serviço")).toBeInTheDocument();

      // Verify terms content is displayed
      expect(screen.getByText("Finalidade do Serviço")).toBeInTheDocument();
      expect(screen.getByText(/simulador é destinado/)).toBeInTheDocument();

      // Check the acceptance checkbox
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      // Click accept button
      const acceptButton = screen.getByText("Aceitar");
      expect(acceptButton).not.toBeDisabled();

      await user.click(acceptButton);

      // Verify acceptance was recorded
      await waitFor(() => {
        expect(mockRecordAcceptance).toHaveBeenCalledWith(
          "1.0.0",
          ConsentType.INITIAL,
          expect.objectContaining({
            userAgent: expect.any(String),
          }),
        );
      });

      // Verify onAccept callback was called
      await waitFor(() => {
        expect(mockOnAccept).toHaveBeenCalledWith(
          expect.objectContaining({
            version: "1.0.0",
            status: AcceptanceStatus.ACCEPTED,
          }),
        );
      });
    });

    it("should handle version update flow", async () => {
      const { ConsentManager } = require("../../lib/terms/index");
      const mockRecordAcceptance = vi.fn().mockResolvedValue({
        success: true,
        acceptance: {
          version: "2.0.0",
          acceptedAt: new Date(),
          status: AcceptanceStatus.ACCEPTED,
          consentType: ConsentType.UPDATE,
        },
      });

      ConsentManager.mockImplementation(() => ({
        recordAcceptance: mockRecordAcceptance,
      }));

      const mockOnAccept = vi.fn();
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={{ ...mockConfig, currentVersion: "2.0.0" }}
          showChanges={true}
          previousVersion="1.0.0"
        />,
      );

      // Verify update-specific content
      expect(
        screen.getByText("Termos de Serviço Atualizados"),
      ).toBeInTheDocument();
      expect(screen.getByText(/versão 1.0.0 para 2.0.0/)).toBeInTheDocument();
      expect(screen.getByText(/Principais alterações/)).toBeInTheDocument();

      // Complete acceptance flow
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      // Verify update consent type was used
      await waitFor(() => {
        expect(mockRecordAcceptance).toHaveBeenCalledWith(
          "2.0.0",
          ConsentType.UPDATE,
          expect.any(Object),
        );
      });
    });

    it("should handle decline flow", async () => {
      const mockOnAccept = vi.fn();
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const declineButton = screen.getByText(/Recusar e Voltar/);
      await user.click(declineButton);

      expect(mockOnDecline).toHaveBeenCalled();
      expect(mockOnAccept).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling Integration", () => {
    it("should handle storage errors with retry mechanism", async () => {
      const { ConsentManager } = require("../../lib/terms/index");
      let attemptCount = 0;

      const mockRecordAcceptance = vi.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount <= 2) {
          return Promise.resolve({
            success: false,
            error: {
              code: "STORAGE_UNAVAILABLE",
              message: "Erro temporário de armazenamento",
              userFriendly: true,
              retryable: true,
            },
          });
        }
        return Promise.resolve({
          success: true,
          acceptance: {
            version: "1.0.0",
            acceptedAt: new Date(),
            status: AcceptanceStatus.ACCEPTED,
            consentType: ConsentType.INITIAL,
          },
        });
      });

      ConsentManager.mockImplementation(() => ({
        recordAcceptance: mockRecordAcceptance,
      }));

      const mockOnAccept = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Accept terms
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Erro temporário/)).toBeInTheDocument();
      });

      // Retry
      const retryButton = screen.getByText("Tentar Novamente");
      await user.click(retryButton);

      // Wait for second error
      await waitFor(() => {
        expect(screen.getByText("Tentativa 1 de 3")).toBeInTheDocument();
      });

      // Retry again
      await user.click(screen.getByText("Tentar Novamente"));

      // Should eventually succeed
      await waitFor(() => {
        expect(mockOnAccept).toHaveBeenCalled();
      });

      expect(attemptCount).toBe(3);
    });

    it("should show recovery suggestions after max retries", async () => {
      const { ConsentManager } = require("../../lib/terms/index");

      const mockRecordAcceptance = vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: "STORAGE_UNAVAILABLE",
          message: "Erro persistente",
          userFriendly: true,
          retryable: true,
        },
      });

      ConsentManager.mockImplementation(() => ({
        recordAcceptance: mockRecordAcceptance,
      }));

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Accept terms
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      // Retry 3 times
      for (let i = 0; i < 3; i++) {
        await waitFor(() => {
          expect(screen.getByText("Tentar Novamente")).toBeInTheDocument();
        });

        const retryButton = screen.getByText("Tentar Novamente");
        await user.click(retryButton);
      }

      // Should show recovery suggestions
      await waitFor(() => {
        expect(
          screen.getByText(/Múltiplas tentativas falharam/),
        ).toBeInTheDocument();
        expect(screen.getByText(/Recarregue a página/)).toBeInTheDocument();
        expect(screen.getByText(/Continuar Mesmo Assim/)).toBeInTheDocument();
      });
    });
  });

  describe("TermsVersionManager Integration", () => {
    it("should manage version checking and modal display", async () => {
      const { ConsentManager } = require("../../lib/terms/index");

      const mockNeedsAcceptance = vi.fn().mockResolvedValue({
        needsAcceptance: true,
        reason: "No acceptance found",
      });

      const mockRecordAcceptance = vi.fn().mockResolvedValue({
        success: true,
        acceptance: {
          version: "1.0.0",
          acceptedAt: new Date(),
          status: AcceptanceStatus.ACCEPTED,
          consentType: ConsentType.INITIAL,
        },
      });

      ConsentManager.mockImplementation(() => ({
        needsAcceptance: mockNeedsAcceptance,
        recordAcceptance: mockRecordAcceptance,
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: false,
          needsUpdate: true,
        }),
      }));

      const mockOnAcceptanceRequired = vi.fn();
      const mockOnAcceptanceComplete = vi.fn();

      render(
        <TermsVersionManager
          config={mockConfig}
          onAcceptanceRequired={mockOnAcceptanceRequired}
          onAcceptanceComplete={mockOnAcceptanceComplete}
        >
          <div data-testid="child-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should render children immediately
      expect(screen.getByTestId("child-content")).toBeInTheDocument();

      // Should check for acceptance requirement
      await waitFor(() => {
        expect(mockNeedsAcceptance).toHaveBeenCalled();
      });

      // Should show modal when acceptance is needed
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      // Should call acceptance required callback
      expect(mockOnAcceptanceRequired).toHaveBeenCalledWith("1.0.0");

      // Complete acceptance in modal
      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      // Should call completion callback
      await waitFor(() => {
        expect(mockOnAcceptanceComplete).toHaveBeenCalled();
      });
    });

    it("should handle grace period notifications", async () => {
      const { ConsentManager } = require("../../lib/terms/index");

      const mockNeedsAcceptance = vi.fn().mockResolvedValue({
        needsAcceptance: true,
        reason: "Version mismatch",
      });

      const mockGetConsentStatus = vi.fn().mockResolvedValue({
        hasConsent: true,
        needsUpdate: true,
        acceptedVersion: "0.9.0",
        gracePeriodRemaining: 15,
      });

      ConsentManager.mockImplementation(() => ({
        needsAcceptance: mockNeedsAcceptance,
        getConsentStatus: mockGetConsentStatus,
      }));

      render(
        <TermsVersionManager config={{ ...mockConfig, gracePeriodDays: 30 }}>
          <div data-testid="child-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should show grace period notification
      await waitFor(() => {
        expect(screen.getByText("Termos Atualizados")).toBeInTheDocument();
        expect(screen.getByText(/15 dias para revisar/)).toBeInTheDocument();
      });

      // Should have action buttons
      expect(screen.getByText("Revisar Agora")).toBeInTheDocument();
      expect(screen.getByText("Lembrar Depois")).toBeInTheDocument();

      // Test "Review Now" button
      const reviewButton = screen.getByText("Revisar Agora");
      await user.click(reviewButton);

      // Should show modal
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility Integration", () => {
    it("should maintain focus management throughout acceptance flow", async () => {
      const { ConsentManager } = require("../../lib/terms/index");
      ConsentManager.mockImplementation(() => ({
        recordAcceptance: vi.fn().mockResolvedValue({
          success: true,
          acceptance: {
            version: "1.0.0",
            acceptedAt: new Date(),
            status: AcceptanceStatus.ACCEPTED,
            consentType: ConsentType.INITIAL,
          },
        }),
      }));

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check initial focus management
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      // Test keyboard navigation
      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByText("Aceitar");
      const declineButton = screen.getByText(/Recusar/);

      // All interactive elements should be focusable
      expect(checkbox).toHaveAttribute("tabIndex", "0");
      expect(acceptButton).not.toHaveAttribute("disabled");
      expect(declineButton).not.toHaveAttribute("disabled");

      // Test keyboard interaction
      checkbox.focus();
      fireEvent.keyDown(checkbox, { key: " " });
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();

      // Accept button should be enabled
      expect(acceptButton).not.toBeDisabled();
    });

    it("should provide proper ARIA labels and descriptions", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check ARIA attributes
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      const title = screen.getByTestId("dialog-title");
      expect(title).toHaveAttribute("id", "terms-modal-title");

      const description = screen.getByTestId("dialog-description");
      expect(description).toHaveAttribute("id", "terms-modal-description");

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "terms-acceptance-description",
      );
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Navigation Links Integration", () => {
    it("should render navigation links with proper accessibility", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links legais do rodapé");

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(2);

      links.forEach((link) => {
        expect(link).toHaveAttribute("aria-label");
        expect(link).toHaveAttribute("tabIndex", "0");
      });
    });

    it("should render different variants correctly", () => {
      const { rerender } = render(<TermsNavigationLinks variant="footer" />);

      let nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links legais do rodapé");

      rerender(<TermsNavigationLinks variant="contextual" />);

      nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute(
        "aria-label",
        "Links contextuais para documentos legais",
      );

      rerender(<TermsNavigationLinks variant="inline" />);

      nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links para documentos legais");
    });
  });

  describe("Cross-browser Compatibility", () => {
    it("should handle different user agents", async () => {
      const { ConsentManager } = require("../../lib/terms/index");
      const mockRecordAcceptance = vi.fn().mockResolvedValue({
        success: true,
        acceptance: {
          version: "1.0.0",
          acceptedAt: new Date(),
          status: AcceptanceStatus.ACCEPTED,
          consentType: ConsentType.INITIAL,
        },
      });

      ConsentManager.mockImplementation(() => ({
        recordAcceptance: mockRecordAcceptance,
      }));

      // Mock different user agents
      const originalUserAgent = navigator.userAgent;
      Object.defineProperty(navigator, "userAgent", {
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        configurable: true,
      });

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      await waitFor(() => {
        expect(mockRecordAcceptance).toHaveBeenCalledWith(
          "1.0.0",
          ConsentType.INITIAL,
          expect.objectContaining({
            userAgent: expect.stringContaining("Mozilla"),
          }),
        );
      });

      // Restore original user agent
      Object.defineProperty(navigator, "userAgent", {
        value: originalUserAgent,
        configurable: true,
      });
    });
  });
});
