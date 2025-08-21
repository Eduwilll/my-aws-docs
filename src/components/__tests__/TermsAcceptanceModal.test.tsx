import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import TermsAcceptanceModal from "../TermsAcceptanceModal";
import { TermsContentManager, ConsentManager } from "../../lib/terms";
import type { TermsConfig, UserTermsAcceptance } from "../../lib/types/terms";
import { ConsentType, AcceptanceStatus } from "../../lib/types/terms";

// Mock the terms modules
vi.mock("../../lib/terms", () => ({
  TermsContentManager: {
    getCurrentContent: vi.fn(),
  },
  ConsentManager: vi.fn(),
}));

// Mock the UI components
vi.mock("../ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="dialog-description">{children}</p>
  ),
  DialogFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-footer">{children}</div>
  ),
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, onClick, disabled, variant, className }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      className={className}
      data-testid={children === "Aceitar" ? "accept-button" : "decline-button"}
    >
      {children}
    </button>
  ),
}));

vi.mock("../ui/checkbox", () => ({
  Checkbox: ({ checked, onCheckedChange, id }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      id={id}
      data-testid="terms-checkbox"
    />
  ),
}));

vi.mock("../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr data-testid="separator" className={className} />
  ),
}));

vi.mock("../ui/scroll-area", () => ({
  ScrollArea: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="scroll-area" className={className}>
      {children}
    </div>
  ),
}));

describe("TermsAcceptanceModal", () => {
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
        id: "introduction",
        title: "1. Introdução",
        content: "Bem-vindo ao simulador AWS...",
        order: 1,
        isRequired: true,
        lastModified: new Date("2025-01-08"),
      },
      {
        id: "usage",
        title: "2. Uso Permitido",
        content: "Você pode usar o simulador...",
        order: 2,
        isRequired: true,
        lastModified: new Date("2025-01-08"),
      },
    ],
  };

  const mockConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: true,
    gracePeriodDays: 30,
    enableVersionHistory: true,
    maxStoredVersions: 5,
  };

  const mockOnAccept = vi.fn();
  const mockOnDecline = vi.fn();
  const mockRecordAcceptance = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    // Mock TermsContentManager
    vi.mocked(TermsContentManager.getCurrentContent).mockReturnValue(
      mockTermsContent,
    );

    // Mock ConsentManager
    const mockConsentManagerInstance = {
      recordAcceptance: mockRecordAcceptance,
    };
    vi.mocked(ConsentManager).mockImplementation(
      () => mockConsentManagerInstance as any,
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render modal when open", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      expect(screen.getByTestId("dialog")).toBeDefined();
      expect(screen.getByTestId("dialog-title")).toBeDefined();
    });

    it("should not render modal when closed", () => {
      render(
        <TermsAcceptanceModal
          isOpen={false}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      expect(screen.queryByTestId("dialog")).toBeNull();
    });

    it("should display terms content sections", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      expect(screen.getByText("1. Introdução")).toBeDefined();
      expect(screen.getByText("2. Uso Permitido")).toBeDefined();
      expect(screen.getByText("Bem-vindo ao simulador AWS...")).toBeDefined();
    });
  });

  describe("Checkbox Validation", () => {
    it("should disable accept button when checkbox is not checked", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const acceptButton = screen.getByTestId("accept-button");
      expect(acceptButton.disabled).toBe(true);
    });

    it("should enable accept button when checkbox is checked", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByTestId("terms-checkbox");
      const acceptButton = screen.getByTestId("accept-button");

      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(acceptButton.disabled).toBe(false);
      });
    });
  });

  describe("Accept/Decline Actions", () => {
    it("should call onDecline when decline button is clicked", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const declineButton = screen.getByTestId("decline-button");
      fireEvent.click(declineButton);

      expect(mockOnDecline).toHaveBeenCalledTimes(1);
    });

    it("should record acceptance and call onAccept when accept button is clicked", async () => {
      const mockAcceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.INITIAL,
        userAgent: "test-agent",
      };

      mockRecordAcceptance.mockResolvedValue({
        success: true,
        acceptance: mockAcceptance,
      });

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByTestId("terms-checkbox");
      const acceptButton = screen.getByTestId("accept-button");

      fireEvent.click(checkbox);
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(mockRecordAcceptance).toHaveBeenCalledWith(
          "1.0.0",
          ConsentType.INITIAL,
          expect.objectContaining({
            userAgent: expect.any(String),
          }),
        );
        expect(mockOnAccept).toHaveBeenCalledWith(mockAcceptance);
      });
    });
  });

  describe("Update Mode", () => {
    it("should show update title when previousVersion is provided", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
          previousVersion="0.9.0"
        />,
      );

      expect(screen.getByText("Termos de Serviço Atualizados")).toBeDefined();
    });

    it("should use UPDATE consent type when previousVersion is provided", async () => {
      const mockAcceptance: UserTermsAcceptance = {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: AcceptanceStatus.ACCEPTED,
        consentType: ConsentType.UPDATE,
      };

      mockRecordAcceptance.mockResolvedValue({
        success: true,
        acceptance: mockAcceptance,
      });

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
          previousVersion="0.9.0"
        />,
      );

      const checkbox = screen.getByTestId("terms-checkbox");
      const acceptButton = screen.getByTestId("accept-button");

      fireEvent.click(checkbox);
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(mockRecordAcceptance).toHaveBeenCalledWith(
          "1.0.0",
          ConsentType.UPDATE,
          expect.any(Object),
        );
      });
    });
  });

  describe("Error Handling", () => {
    it("should display error when acceptance recording fails", async () => {
      mockRecordAcceptance.mockResolvedValue({
        success: false,
        error: {
          code: "STORAGE_ERROR",
          message: "Failed to store acceptance",
          timestamp: new Date(),
        },
      });

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByTestId("terms-checkbox");
      const acceptButton = screen.getByTestId("accept-button");

      fireEvent.click(checkbox);
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(screen.getByText("Failed to store acceptance")).toBeDefined();
      });
    });
  });

  describe("Loading State", () => {
    it("should show loading modal when terms content is not available", () => {
      vi.mocked(TermsContentManager.getCurrentContent).mockReturnValue(
        null as any,
      );

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      expect(screen.getByText("Carregando...")).toBeDefined();
      expect(
        screen.getByText("Carregando os termos de serviço..."),
      ).toBeDefined();
    });
  });
});
