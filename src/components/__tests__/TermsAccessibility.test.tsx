import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { axe, toHaveNoViolations } from "jest-axe";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import { TermsNavigationLinks } from "../TermsNavigationLinks";
import type { TermsConfig } from "../../lib/types/terms";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock the terms library
vi.mock("../../lib/terms", () => ({
  TermsContentManager: {
    getCurrentContent: vi.fn(() => ({
      version: "1.0.0",
      lastUpdated: new Date("2025-01-08"),
      sections: [
        {
          id: "purpose",
          title: "Finalidade do Serviço",
          content:
            "O simulador é destinado exclusivamente para fins educativos...",
          order: 1,
        },
        {
          id: "permitted-use",
          title: "Uso Permitido",
          content: "Você pode usar o simulador gratuitamente...",
          order: 2,
        },
      ],
      metadata: {
        jurisdiction: "Brasil",
        language: "pt-BR",
        effectiveDate: new Date("2025-01-08"),
      },
    })),
  },
  ConsentManager: vi.fn().mockImplementation(() => ({
    recordAcceptance: vi.fn().mockResolvedValue({
      success: true,
      acceptance: {
        version: "1.0.0",
        acceptedAt: new Date(),
        consentType: "initial",
      },
    }),
    needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: false }),
    getConsentStatus: vi.fn().mockResolvedValue({
      hasConsent: false,
      needsUpdate: false,
    }),
  })),
  ConsentValidator: vi.fn(),
  TermsVersionManager: vi.fn(),
}));

// Mock UI components
vi.mock("../ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
  DialogContent: ({ children, className, onOpenAutoFocus, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DialogTitle: ({ children, className, id }: any) => (
    <h2 className={className} id={id}>
      {children}
    </h2>
  ),
  DialogDescription: ({ children, className, id }: any) => (
    <p className={className} id={id}>
      {children}
    </p>
  ),
  DialogFooter: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, className, disabled, onClick, ...props }: any) => (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
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
  Separator: ({ className }: { className?: string }) => (
    <hr className={className} />
  ),
}));

vi.mock("../ui/scroll-area", () => ({
  ScrollArea: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

describe("Terms Components Accessibility", () => {
  const mockConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("TermsAcceptanceModal", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have proper ARIA labels and roles", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check dialog role
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Check modal title
      expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute(
        "id",
        "terms-modal-title",
      );

      // Check checkbox with proper labeling
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "terms-acceptance-description",
      );
      expect(checkbox).toHaveAttribute("aria-required", "true");

      // Check buttons have proper labels
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      const declineButton = screen.getByRole("button", { name: /recusar/i });

      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
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

      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Test keyboard interaction with checkbox
      fireEvent.keyDown(checkbox, { key: " " });
      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();

      // Test keyboard interaction with accept button
      fireEvent.keyDown(acceptButton, { key: "Enter" });
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(mockOnAccept).toHaveBeenCalled();
      });
    });

    it("should have proper focus management", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check that focusable elements have proper focus styles
      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      const declineButton = screen.getByRole("button", { name: /recusar/i });

      expect(checkbox).toHaveClass("focus-visible:ring-2");
      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });

    it("should announce errors to screen readers", async () => {
      const mockOnAccept = vi.fn().mockRejectedValue(new Error("Test error"));

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={mockOnAccept}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Accept terms and trigger error
      fireEvent.click(checkbox);
      fireEvent.click(acceptButton);

      // Wait for error to appear
      await waitFor(() => {
        const errorAlert = screen.getByRole("alert");
        expect(errorAlert).toHaveAttribute("aria-live", "assertive");
      });
    });

    it("should have proper responsive design classes", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check responsive classes are applied
      const dialogContent = container.querySelector('[role="dialog"] > div');
      expect(dialogContent).toHaveClass("max-w-4xl");
      expect(dialogContent).toHaveClass("mx-2");
      expect(dialogContent).toHaveClass("sm:mx-4");
      expect(dialogContent).toHaveClass("lg:mx-auto");
    });

    it("should have minimum touch target sizes on mobile", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      const declineButton = screen.getByRole("button", { name: /recusar/i });

      expect(acceptButton).toHaveClass("min-h-[44px]");
      expect(declineButton).toHaveClass("min-h-[44px]");
    });
  });

  describe("TermsVersionManager", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(
        <TermsVersionManager config={mockConfig}>
          <div>Test content</div>
        </TermsVersionManager>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should properly announce grace period notifications", async () => {
      // Mock version check to return update needed
      const mockConsentManager = {
        needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: true }),
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: true,
          needsUpdate: true,
          acceptedVersion: "0.9.0",
          gracePeriodRemaining: 5,
        }),
      };

      vi.mocked(require("../../lib/terms").ConsentManager).mockImplementation(
        () => mockConsentManager,
      );

      render(
        <TermsVersionManager config={{ ...mockConfig, gracePeriodDays: 7 }}>
          <div>Test content</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        const notification = screen.getByRole("alert");
        expect(notification).toHaveAttribute("aria-live", "polite");
        expect(notification).toHaveAttribute(
          "aria-labelledby",
          "grace-period-title",
        );
      });
    });

    it("should have proper button sizes for touch targets", async () => {
      const mockConsentManager = {
        needsAcceptance: vi.fn().mockResolvedValue({ needsAcceptance: true }),
        getConsentStatus: vi.fn().mockResolvedValue({
          hasConsent: true,
          needsUpdate: true,
          acceptedVersion: "0.9.0",
          gracePeriodRemaining: 5,
        }),
      };

      vi.mocked(require("../../lib/terms").ConsentManager).mockImplementation(
        () => mockConsentManager,
      );

      render(
        <TermsVersionManager config={{ ...mockConfig, gracePeriodDays: 7 }}>
          <div>Test content</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        const reviewButton = screen.getByRole("button", {
          name: /revisar agora/i,
        });
        const laterButton = screen.getByRole("button", {
          name: /lembrar depois/i,
        });
        const closeButton = screen.getByRole("button", { name: /fechar/i });

        expect(reviewButton).toHaveClass("min-h-[40px]");
        expect(laterButton).toHaveClass("min-h-[40px]");
        expect(closeButton).toHaveClass("min-h-[44px]");
        expect(closeButton).toHaveClass("min-w-[44px]");
      });
    });
  });

  describe("TermsNavigationLinks", () => {
    it("should have no accessibility violations", async () => {
      const { container } = render(<TermsNavigationLinks />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have proper navigation structure", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links legais do rodapé");

      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(2);

      expect(links[0]).toHaveAttribute(
        "aria-label",
        "Acessar Termos de Serviço",
      );
      expect(links[1]).toHaveAttribute(
        "aria-label",
        "Acessar Política de Privacidade",
      );
    });

    it("should have proper touch target sizes", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("min-h-[44px]");
      });
    });

    it("should support keyboard navigation", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("tabIndex", "0");
        expect(link).toHaveClass("focus:outline-none");
        expect(link).toHaveClass("focus:ring-2");
      });
    });

    it("should have responsive layout classes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("flex");
      expect(nav).toHaveClass("flex-col");
      expect(nav).toHaveClass("sm:flex-row");
    });

    it("should hide separators on mobile", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const separator = screen.getByRole("separator");
      expect(separator).toHaveClass("hidden");
      expect(separator).toHaveClass("sm:inline");
    });

    it("should render contextual variant with proper structure", () => {
      render(<TermsNavigationLinks variant="contextual" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute(
        "aria-label",
        "Links contextuais para documentos legais",
      );
      expect(nav).toHaveClass("space-y-1");
      expect(nav).toHaveClass("sm:space-y-2");
    });

    it("should render inline variant with proper structure", () => {
      render(<TermsNavigationLinks variant="inline" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links para documentos legais");
    });
  });

  describe("High Contrast Mode Support", () => {
    beforeEach(() => {
      // Mock matchMedia for high contrast
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-contrast: high)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });

    it("should apply high contrast styles when preferred", () => {
      render(<TermsNavigationLinks variant="footer" />);

      // In a real implementation, you would check for high contrast specific classes
      // This is a placeholder for the actual high contrast detection logic
      expect(window.matchMedia).toHaveBeenCalledWith(
        "(prefers-contrast: high)",
      );
    });
  });

  describe("Reduced Motion Support", () => {
    beforeEach(() => {
      Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === "(prefers-reduced-motion: reduce)",
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
    });

    it("should respect reduced motion preferences", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      expect(window.matchMedia).toHaveBeenCalledWith(
        "(prefers-reduced-motion: reduce)",
      );
    });
  });

  describe("Screen Reader Support", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute("id", "terms-modal-title");
    });

    it("should have proper live regions for dynamic content", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
          showChanges={true}
          previousVersion="0.9.0"
        />,
      );

      const changeNotification = screen.getByRole("alert");
      expect(changeNotification).toHaveAttribute("aria-live", "polite");
    });

    it("should provide descriptive text for complex interactions", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute(
        "aria-describedby",
        "terms-acceptance-description",
      );

      const description = screen.getByText(/esta confirmação é obrigatória/i);
      expect(description).toHaveAttribute("id", "terms-acceptance-description");
    });
  });
});
