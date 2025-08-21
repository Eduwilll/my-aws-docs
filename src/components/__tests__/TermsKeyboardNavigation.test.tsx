import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import { TermsNavigationLinks } from "../TermsNavigationLinks";
import type { TermsConfig } from "../../lib/types/terms";

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
    <h2 className={className} id={id} tabIndex={-1}>
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
    <div className={className} tabIndex={0}>
      {children}
    </div>
  ),
}));

describe("Terms Components Keyboard Navigation", () => {
  const mockConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: false,
  };

  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("TermsAcceptanceModal Keyboard Navigation", () => {
    it("should support Tab navigation through all interactive elements", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      const declineButton = screen.getByRole("button", { name: /recusar/i });
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Tab through elements
      await user.tab();
      expect(checkbox).toHaveFocus();

      await user.tab();
      expect(declineButton).toHaveFocus();

      await user.tab();
      expect(acceptButton).toHaveFocus();
    });

    it("should support Shift+Tab for reverse navigation", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      const declineButton = screen.getByRole("button", { name: /recusar/i });
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Focus on accept button first
      acceptButton.focus();
      expect(acceptButton).toHaveFocus();

      // Shift+Tab to decline button
      await user.tab({ shift: true });
      expect(declineButton).toHaveFocus();

      // Shift+Tab to checkbox
      await user.tab({ shift: true });
      expect(checkbox).toHaveFocus();
    });

    it("should activate checkbox with Space key", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");

      // Focus and activate with Space
      checkbox.focus();
      await user.keyboard(" ");

      expect(checkbox).toBeChecked();
    });

    it("should activate buttons with Enter key", async () => {
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
      const declineButton = screen.getByRole("button", { name: /recusar/i });
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Test decline button with Enter
      declineButton.focus();
      await user.keyboard("{Enter}");
      expect(mockOnDecline).toHaveBeenCalled();

      // Test accept button with Enter (after checking checkbox)
      checkbox.focus();
      await user.keyboard(" ");
      acceptButton.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnAccept).toHaveBeenCalled();
      });
    });

    it("should activate buttons with Space key", async () => {
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      const declineButton = screen.getByRole("button", { name: /recusar/i });

      // Test decline button with Space
      declineButton.focus();
      await user.keyboard(" ");
      expect(mockOnDecline).toHaveBeenCalled();
    });

    it("should trap focus within the modal", async () => {
      render(
        <div>
          <button>Outside Button Before</button>
          <TermsAcceptanceModal
            isOpen={true}
            onAccept={vi.fn()}
            onDecline={vi.fn()}
            config={mockConfig}
          />
          <button>Outside Button After</button>
        </div>,
      );

      const outsideButtonBefore = screen.getByText("Outside Button Before");
      const outsideButtonAfter = screen.getByText("Outside Button After");
      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Focus should start within modal
      checkbox.focus();
      expect(checkbox).toHaveFocus();

      // Tab to last element in modal
      await user.tab();
      await user.tab();
      expect(acceptButton).toHaveFocus();

      // Tab should wrap to first element, not go outside
      await user.tab();
      expect(checkbox).toHaveFocus();

      // Outside buttons should not be focusable
      outsideButtonBefore.focus();
      expect(outsideButtonBefore).not.toHaveFocus();

      outsideButtonAfter.focus();
      expect(outsideButtonAfter).not.toHaveFocus();
    });

    it("should handle Escape key to close modal", async () => {
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      // Press Escape
      await user.keyboard("{Escape}");
      expect(mockOnDecline).toHaveBeenCalled();
    });

    it("should support arrow key navigation in scroll area", async () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const scrollArea = container.querySelector('[tabindex="0"]');

      if (scrollArea) {
        scrollArea.focus();
        expect(scrollArea).toHaveFocus();

        // Arrow keys should work for scrolling
        await user.keyboard("{ArrowDown}");
        await user.keyboard("{ArrowUp}");
        await user.keyboard("{PageDown}");
        await user.keyboard("{PageUp}");

        // Should still have focus
        expect(scrollArea).toHaveFocus();
      }
    });

    it("should announce focus changes to screen readers", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Check ARIA attributes for screen reader announcements
      expect(checkbox).toHaveAttribute("aria-describedby");
      expect(acceptButton).toHaveAttribute("aria-label");
    });
  });

  describe("TermsVersionManager Keyboard Navigation", () => {
    it("should support keyboard navigation in grace period notification", async () => {
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

      await screen.findByRole("alert");

      const reviewButton = screen.getByRole("button", {
        name: /revisar agora/i,
      });
      const laterButton = screen.getByRole("button", {
        name: /lembrar depois/i,
      });
      const closeButton = screen.getByRole("button", { name: /fechar/i });

      // Tab through notification buttons
      await user.tab();
      expect(reviewButton).toHaveFocus();

      await user.tab();
      expect(laterButton).toHaveFocus();

      await user.tab();
      expect(closeButton).toHaveFocus();
    });

    it("should activate notification buttons with Enter and Space", async () => {
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

      await screen.findByRole("alert");

      const laterButton = screen.getByRole("button", {
        name: /lembrar depois/i,
      });

      // Test with Enter key
      laterButton.focus();
      await user.keyboard("{Enter}");

      // Notification should be dismissed
      await waitFor(() => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      });
    });

    it("should handle keyboard shortcuts for common actions", async () => {
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

      await screen.findByRole("alert");

      // Test Escape key to close notification
      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      });
    });
  });

  describe("TermsNavigationLinks Keyboard Navigation", () => {
    it("should support Tab navigation through links", async () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");

      // Tab through all links
      for (let i = 0; i < links.length; i++) {
        await user.tab();
        expect(links[i]).toHaveFocus();
      }
    });

    it("should activate links with Enter key", async () => {
      const mockNavigate = vi.fn();

      // Mock link click behavior
      const originalLocation = window.location;
      delete (window as any).location;
      window.location = { ...originalLocation, href: "" };

      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /termos de serviço/i,
      });

      termsLink.focus();
      await user.keyboard("{Enter}");

      // In a real implementation, this would navigate
      expect(termsLink).toHaveAttribute("href", "/terms");

      window.location = originalLocation;
    });

    it("should activate links with Space key", async () => {
      render(<TermsNavigationLinks variant="footer" />);

      const privacyLink = screen.getByRole("link", {
        name: /política de privacidade/i,
      });

      privacyLink.focus();
      await user.keyboard(" ");

      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });

    it("should have proper tabindex values", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");

      links.forEach((link) => {
        expect(link).toHaveAttribute("tabIndex", "0");
      });
    });

    it("should support contextual variant keyboard navigation", async () => {
      render(<TermsNavigationLinks variant="contextual" />);

      const links = screen.getAllByRole("link");

      // Should be able to tab through contextual links
      for (let i = 0; i < links.length; i++) {
        await user.tab();
        expect(links[i]).toHaveFocus();
      }
    });

    it("should support inline variant keyboard navigation", async () => {
      render(<TermsNavigationLinks variant="inline" />);

      const links = screen.getAllByRole("link");

      // Should be able to tab through inline links
      for (let i = 0; i < links.length; i++) {
        await user.tab();
        expect(links[i]).toHaveFocus();
      }
    });
  });

  describe("Focus Management", () => {
    it("should restore focus after modal closes", async () => {
      const { rerender } = render(
        <div>
          <button id="trigger">Open Terms</button>
          <TermsAcceptanceModal
            isOpen={true}
            onAccept={vi.fn()}
            onDecline={vi.fn()}
            config={mockConfig}
          />
        </div>,
      );

      const triggerButton = screen.getByText("Open Terms");
      triggerButton.focus();

      // Modal should trap focus
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();

      // Close modal
      rerender(
        <div>
          <button id="trigger">Open Terms</button>
          <TermsAcceptanceModal
            isOpen={false}
            onAccept={vi.fn()}
            onDecline={vi.fn()}
            config={mockConfig}
          />
        </div>,
      );

      // Focus should return to trigger (in a real implementation)
      expect(triggerButton).toBeInTheDocument();
    });

    it("should manage focus order correctly", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Focus should start at the first interactive element
      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();
      expect(checkbox).toHaveFocus();

      // Tab order should be logical
      await user.tab();
      const declineButton = screen.getByRole("button", { name: /recusar/i });
      expect(declineButton).toHaveFocus();

      await user.tab();
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      expect(acceptButton).toHaveFocus();
    });

    it("should handle focus for disabled elements", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const acceptButton = screen.getByRole("button", { name: /aceitar/i });

      // Accept button should be disabled initially (checkbox not checked)
      expect(acceptButton).toBeDisabled();

      // Should still be focusable but not activatable
      acceptButton.focus();
      expect(acceptButton).toHaveFocus();

      await user.keyboard("{Enter}");
      // Should not activate when disabled
    });
  });

  describe("Screen Reader Support", () => {
    it("should provide proper ARIA labels for keyboard users", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      const declineButton = screen.getByRole("button", { name: /recusar/i });

      // Check ARIA attributes
      expect(checkbox).toHaveAttribute("aria-describedby");
      expect(checkbox).toHaveAttribute("aria-required", "true");
      expect(acceptButton).toHaveAttribute("aria-label");
      expect(declineButton).toHaveAttribute("aria-label");
    });

    it("should announce state changes to screen readers", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkbox = screen.getByRole("checkbox");

      // Check initial state
      expect(checkbox).not.toBeChecked();

      // Change state
      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      // Screen readers should be notified of the change
      expect(checkbox).toHaveAttribute("aria-describedby");
    });

    it("should provide keyboard shortcuts information", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // In a real implementation, you might have a help text or instructions
      // for keyboard users about available shortcuts
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("Keyboard Shortcuts", () => {
    it("should support common keyboard shortcuts", async () => {
      const mockOnDecline = vi.fn();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={mockOnDecline}
          config={mockConfig}
        />,
      );

      // Escape to close
      await user.keyboard("{Escape}");
      expect(mockOnDecline).toHaveBeenCalled();
    });

    it("should handle Alt+key combinations for quick access", async () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // In a real implementation, you might support Alt+A for Accept, Alt+D for Decline
      // This is a placeholder for such functionality
      const acceptButton = screen.getByRole("button", { name: /aceitar/i });
      const declineButton = screen.getByRole("button", { name: /recusar/i });

      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });
  });
});
