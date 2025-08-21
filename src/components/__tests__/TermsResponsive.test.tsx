import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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
  DialogContent: ({ children, className, ...props }: any) => (
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
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("../ui/checkbox", () => ({
  Checkbox: ({ className, ...props }: any) => (
    <input type="checkbox" className={className} {...props} />
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

// Utility function to simulate different viewport sizes
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event("resize"));
};

describe("Terms Components Responsive Design", () => {
  const mockConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to desktop size
    setViewportSize(1024, 768);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("TermsAcceptanceModal Responsive Design", () => {
    it("should have mobile-first responsive classes", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const dialogContent = container.querySelector('[role="dialog"] > div');

      // Check mobile-first responsive width classes
      expect(dialogContent).toHaveClass("w-[calc(100vw-1rem)]");
      expect(dialogContent).toHaveClass("sm:w-[calc(100vw-2rem)]");
      expect(dialogContent).toHaveClass("lg:w-full");

      // Check responsive margins
      expect(dialogContent).toHaveClass("mx-2");
      expect(dialogContent).toHaveClass("sm:mx-4");
      expect(dialogContent).toHaveClass("lg:mx-auto");
    });

    it("should have responsive scroll area heights", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const scrollArea = container.querySelector(
        '[aria-label="Área de rolagem dos termos"]',
      );

      expect(scrollArea).toHaveClass("max-h-[35vh]");
      expect(scrollArea).toHaveClass("sm:max-h-[45vh]");
      expect(scrollArea).toHaveClass("lg:max-h-[50vh]");
    });

    it("should have responsive padding for scroll area", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const scrollArea = container.querySelector(
        '[aria-label="Área de rolagem dos termos"]',
      );

      expect(scrollArea).toHaveClass("pr-1");
      expect(scrollArea).toHaveClass("sm:pr-2");
      expect(scrollArea).toHaveClass("lg:pr-4");
    });

    it("should have responsive button layout", () => {
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

      // Check responsive width classes
      expect(acceptButton).toHaveClass("w-full");
      expect(acceptButton).toHaveClass("sm:w-auto");
      expect(declineButton).toHaveClass("w-full");
      expect(declineButton).toHaveClass("sm:w-auto");

      // Check minimum touch target sizes
      expect(acceptButton).toHaveClass("min-h-[44px]");
      expect(declineButton).toHaveClass("min-h-[44px]");
    });

    it("should have responsive text sizes", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const title = container.querySelector("#terms-modal-title");
      expect(title).toHaveClass("text-lg");
      expect(title).toHaveClass("sm:text-xl");

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveClass("text-sm");
        expect(button).toHaveClass("sm:text-base");
      });
    });

    it("should have responsive checkbox spacing", () => {
      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const checkboxContainer = container.querySelector(
        ".flex.items-start.space-x-2",
      );
      expect(checkboxContainer).toHaveClass("space-x-2");
      expect(checkboxContainer).toHaveClass("sm:space-x-3");

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("h-5");
      expect(checkbox).toHaveClass("w-5");
      expect(checkbox).toHaveClass("sm:h-4");
      expect(checkbox).toHaveClass("sm:w-4");
    });

    it("should handle mobile viewport correctly", () => {
      setViewportSize(375, 667); // iPhone SE size

      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const dialogContent = container.querySelector('[role="dialog"] > div');
      expect(dialogContent).toHaveClass("max-h-[95vh]");
    });

    it("should handle tablet viewport correctly", () => {
      setViewportSize(768, 1024); // iPad size

      const { container } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const dialogContent = container.querySelector('[role="dialog"] > div');
      expect(dialogContent).toHaveClass("sm:max-h-[90vh]");
    });
  });

  describe("TermsVersionManager Responsive Design", () => {
    it("should have responsive notification layout", async () => {
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

      // Wait for notification to appear
      await screen.findByRole("alert");

      const notification = screen.getByRole("alert");

      // Check responsive max-width classes
      expect(notification).toHaveClass("max-w-xs");
      expect(notification).toHaveClass("sm:max-w-sm");
      expect(notification).toHaveClass("lg:max-w-md");

      // Check responsive padding
      expect(notification).toHaveClass("p-3");
      expect(notification).toHaveClass("sm:p-4");
    });

    it("should have responsive button layout in notifications", async () => {
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

      // Check responsive text sizes
      expect(reviewButton).toHaveClass("text-xs");
      expect(reviewButton).toHaveClass("sm:text-sm");
      expect(laterButton).toHaveClass("text-xs");
      expect(laterButton).toHaveClass("sm:text-sm");

      // Check minimum touch target sizes
      expect(reviewButton).toHaveClass("min-h-[40px]");
      expect(laterButton).toHaveClass("min-h-[40px]");
      expect(closeButton).toHaveClass("min-h-[44px]");
      expect(closeButton).toHaveClass("min-w-[44px]");
    });

    it("should have responsive close button icon size", async () => {
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

      const { container } = render(
        <TermsVersionManager config={{ ...mockConfig, gracePeriodDays: 7 }}>
          <div>Test content</div>
        </TermsVersionManager>,
      );

      await screen.findByRole("alert");

      const closeIcon = container.querySelector("svg");
      expect(closeIcon).toHaveClass("h-4");
      expect(closeIcon).toHaveClass("w-4");
      expect(closeIcon).toHaveClass("sm:h-5");
      expect(closeIcon).toHaveClass("sm:w-5");
    });
  });

  describe("TermsNavigationLinks Responsive Design", () => {
    it("should have responsive layout for footer variant", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const nav = container.querySelector("nav");

      // Check responsive flex direction
      expect(nav).toHaveClass("flex-col");
      expect(nav).toHaveClass("sm:flex-row");

      // Check responsive gap
      expect(nav).toHaveClass("gap-2");
      expect(nav).toHaveClass("sm:gap-4");
    });

    it("should have responsive text sizes", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("text-sm");
        expect(link).toHaveClass("sm:text-base");
      });
    });

    it("should have proper touch target sizes", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("min-h-[44px]");
      });
    });

    it("should hide separators on mobile", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const separator = screen.getByRole("separator");
      expect(separator).toHaveClass("hidden");
      expect(separator).toHaveClass("sm:inline");
    });

    it("should have responsive icon sizes", () => {
      const { container } = render(
        <TermsNavigationLinks variant="footer" showIcons={true} />,
      );

      const icons = container.querySelectorAll("svg");
      icons.forEach((icon) => {
        expect(icon).toHaveClass("w-3");
        expect(icon).toHaveClass("h-3");
        expect(icon).toHaveClass("sm:w-4");
        expect(icon).toHaveClass("sm:h-4");
      });
    });

    it("should have responsive spacing for contextual variant", () => {
      const { container } = render(
        <TermsNavigationLinks variant="contextual" />,
      );

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("space-y-1");
      expect(nav).toHaveClass("sm:space-y-2");
    });

    it("should handle mobile viewport for footer links", () => {
      setViewportSize(375, 667); // Mobile size

      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("flex-col");

      // Separator should be hidden on mobile
      const separator = screen.getByRole("separator");
      expect(separator).toHaveClass("hidden");
    });

    it("should handle tablet viewport for footer links", () => {
      setViewportSize(768, 1024); // Tablet size

      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("sm:flex-row");

      // Separator should be visible on tablet+
      const separator = screen.getByRole("separator");
      expect(separator).toHaveClass("sm:inline");
    });
  });

  describe("Cross-Device Compatibility", () => {
    const viewportSizes = [
      { name: "Mobile Small", width: 320, height: 568 },
      { name: "Mobile Medium", width: 375, height: 667 },
      { name: "Mobile Large", width: 414, height: 896 },
      { name: "Tablet Portrait", width: 768, height: 1024 },
      { name: "Tablet Landscape", width: 1024, height: 768 },
      { name: "Desktop Small", width: 1280, height: 720 },
      { name: "Desktop Large", width: 1920, height: 1080 },
    ];

    viewportSizes.forEach(({ name, width, height }) => {
      it(`should render properly on ${name} (${width}x${height})`, () => {
        setViewportSize(width, height);

        const { container } = render(
          <div>
            <TermsAcceptanceModal
              isOpen={true}
              onAccept={vi.fn()}
              onDecline={vi.fn()}
              config={mockConfig}
            />
            <TermsNavigationLinks variant="footer" />
          </div>,
        );

        // Basic rendering check
        expect(container).toBeInTheDocument();
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
      });
    });
  });

  describe("Print Styles", () => {
    it("should have print-friendly classes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      // In a real implementation, you would check for print-specific classes
      // This is a placeholder for print style testing
      expect(container).toBeInTheDocument();
    });
  });

  describe("Orientation Changes", () => {
    it("should handle orientation changes gracefully", () => {
      // Portrait
      setViewportSize(375, 667);

      const { rerender } = render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Landscape
      setViewportSize(667, 375);

      rerender(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
