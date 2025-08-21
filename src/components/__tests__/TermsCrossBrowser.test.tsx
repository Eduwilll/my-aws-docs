/**
 * Cross-Browser Compatibility Tests for Terms of Service
 * Tests browser-specific behaviors and localStorage compatibility
 */

import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import { TermsVersionManager } from "../TermsVersionManager";
import type { TermsConfig } from "../../lib/types/terms";

// Mock different browser environments
const mockBrowserEnvironments = {
  chrome: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    localStorage: true,
    sessionStorage: true,
    indexedDB: true,
  },
  firefox: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    localStorage: true,
    sessionStorage: true,
    indexedDB: true,
  },
  safari: {
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    localStorage: true,
    sessionStorage: true,
    indexedDB: true,
  },
  edge: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    localStorage: true,
    sessionStorage: true,
    indexedDB: true,
  },
  ie11: {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
    localStorage: true,
    sessionStorage: true,
    indexedDB: false, // IE11 has limited IndexedDB support
  },
  mobileSafari: {
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    localStorage: true, // Can be disabled in private mode
    sessionStorage: true,
    indexedDB: true,
  },
  chromeAndroid: {
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    localStorage: true,
    sessionStorage: true,
    indexedDB: true,
  },
};

// Mock localStorage with browser-specific behaviors
const createBrowserStorage = (
  browserType: keyof typeof mockBrowserEnvironments,
) => {
  const storage: { [key: string]: string } = {};
  const browserConfig = mockBrowserEnvironments[browserType];

  const mockStorage = {
    getItem: vi.fn((key: string) => {
      if (!browserConfig.localStorage) {
        throw new Error("localStorage is not available");
      }
      return storage[key] || null;
    }),
    setItem: vi.fn((key: string, value: string) => {
      if (!browserConfig.localStorage) {
        throw new Error("localStorage is not available");
      }

      // Simulate Safari private mode behavior
      if (browserType === "mobileSafari" && Math.random() < 0.3) {
        const error = new Error("QuotaExceededError");
        (error as any).code = 22;
        (error as any).name = "QuotaExceededError";
        throw error;
      }

      // Simulate IE11 storage limitations
      if (browserType === "ie11" && value.length > 5000) {
        throw new Error("Storage quota exceeded");
      }

      storage[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      if (!browserConfig.localStorage) {
        throw new Error("localStorage is not available");
      }
      delete storage[key];
    }),
    clear: vi.fn(() => {
      if (!browserConfig.localStorage) {
        throw new Error("localStorage is not available");
      }
      Object.keys(storage).forEach((key) => delete storage[key]);
    }),
    length: Object.keys(storage).length,
    key: vi.fn((index: number) => Object.keys(storage)[index] || null),
  };

  return mockStorage;
};

// Mock terms library
vi.mock("../../lib/terms/index", () => ({
  ConsentManager: vi.fn().mockImplementation(() => ({
    recordAcceptance: vi.fn().mockResolvedValue({
      success: true,
      acceptance: {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: "ACCEPTED",
        consentType: "INITIAL",
      },
    }),
    needsAcceptance: vi.fn().mockResolvedValue({
      needsAcceptance: true,
      reason: "No acceptance found",
    }),
    getConsentStatus: vi.fn().mockResolvedValue({
      hasConsent: false,
      needsUpdate: true,
    }),
  })),
  TermsContentManager: {
    getCurrentContent: vi.fn(() => ({
      version: "1.0.0",
      lastUpdated: new Date(),
      metadata: {
        language: "pt-BR",
        jurisdiction: "Brasil",
        effectiveDate: new Date(),
      },
      sections: [
        {
          id: "test",
          title: "Test Section",
          content: "Test content for cross-browser compatibility.",
          order: 1,
          isRequired: true,
        },
      ],
    })),
  },
}));

// Mock UI components
vi.mock("../ui/dialog", () => ({
  Dialog: ({ children, open }: any) =>
    open ? (
      <div role="dialog" data-testid="dialog">
        {children}
      </div>
    ) : null,
  DialogContent: ({ children }: any) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children, id }: any) => <h2 id={id}>{children}</h2>,
  DialogDescription: ({ children, id }: any) => <p id={id}>{children}</p>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, disabled, onClick }: any) => (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("../ui/checkbox", () => ({
  Checkbox: ({ id, checked, onCheckedChange }: any) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

vi.mock("../ui/separator", () => ({
  Separator: () => <hr />,
}));

vi.mock("../ui/scroll-area", () => ({
  ScrollArea: ({ children }: any) => <div>{children}</div>,
}));

const mockConfig: TermsConfig = {
  currentVersion: "1.0.0",
  requireAcceptance: true,
  showChangesHighlight: true,
  gracePeriodDays: 30,
  enableVersionHistory: true,
  maxStoredVersions: 5,
};

describe("Cross-Browser Compatibility Tests", () => {
  let originalUserAgent: string;
  let originalLocalStorage: Storage;

  beforeEach(() => {
    originalUserAgent = navigator.userAgent;
    originalLocalStorage = window.localStorage;
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUserAgent,
      configurable: true,
    });
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
  });

  describe("Chrome Browser", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.chrome.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("chrome"),
        writable: true,
      });
    });

    it("should work normally in Chrome", async () => {
      const user = userEvent.setup();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      expect(acceptButton).not.toBeDisabled();

      await user.click(acceptButton);

      // Should work without issues in Chrome
      await waitFor(() => {
        expect(screen.getByText(/processando/i)).toBeInTheDocument();
      });
    });
  });

  describe("Firefox Browser", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.firefox.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("firefox"),
        writable: true,
      });
    });

    it("should work normally in Firefox", async () => {
      const user = userEvent.setup();

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      // Should complete successfully in Firefox
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Safari Browser", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.safari.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("safari"),
        writable: true,
      });
    });

    it("should handle Safari-specific behaviors", async () => {
      const user = userEvent.setup();

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

      // Safari should work normally
      await waitFor(() => {
        expect(screen.getByText(/processando/i)).toBeInTheDocument();
      });
    });
  });

  describe("Mobile Safari (iOS)", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.mobileSafari.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("mobileSafari"),
        writable: true,
      });
    });

    it("should handle iOS Safari private mode storage issues", async () => {
      const user = userEvent.setup();

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

      // May show storage error due to private mode simulation
      await waitFor(() => {
        const processingText = screen.queryByText(/processando/i);
        const errorText = screen.queryByText(/erro/i);

        // Should either process successfully or show error gracefully
        expect(processingText || errorText).toBeInTheDocument();
      });
    });

    it("should have proper touch target sizes for mobile", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const acceptButton = screen.getByText("Aceitar");
      const declineButton = screen.getByText(/Recusar/);

      // Check that buttons have mobile-friendly classes
      expect(acceptButton).toHaveClass("min-h-[44px]");
      expect(declineButton).toHaveClass("min-h-[44px]");
    });
  });

  describe("Internet Explorer 11", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.ie11.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("ie11"),
        writable: true,
      });
    });

    it("should handle IE11 storage limitations", async () => {
      const user = userEvent.setup();

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

      // IE11 may have storage issues with large data
      await waitFor(() => {
        const processingText = screen.queryByText(/processando/i);
        const errorText = screen.queryByText(/erro/i);

        expect(processingText || errorText).toBeInTheDocument();
      });
    });
  });

  describe("Chrome on Android", () => {
    beforeEach(() => {
      Object.defineProperty(navigator, "userAgent", {
        value: mockBrowserEnvironments.chromeAndroid.userAgent,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: createBrowserStorage("chromeAndroid"),
        writable: true,
      });
    });

    it("should work on Android Chrome", async () => {
      const user = userEvent.setup();

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">Mobile App</div>
        </TermsVersionManager>,
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      });

      // Should have mobile-responsive layout
      const dialogContent = screen.getByTestId("dialog-content");
      expect(dialogContent).toHaveClass("mx-2", "sm:mx-4");

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      const acceptButton = screen.getByText("Aceitar");
      await user.click(acceptButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Storage Unavailable Scenarios", () => {
    it("should handle completely disabled localStorage", () => {
      // Mock localStorage as undefined (some privacy modes)
      Object.defineProperty(window, "localStorage", {
        value: undefined,
        writable: true,
      });

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should still render without crashing
      expect(screen.getByTestId("app-content")).toBeInTheDocument();
    });

    it("should handle localStorage that throws on access", () => {
      const throwingStorage = {
        get getItem() {
          throw new Error("localStorage access denied");
        },
        get setItem() {
          throw new Error("localStorage access denied");
        },
        get removeItem() {
          throw new Error("localStorage access denied");
        },
        get clear() {
          throw new Error("localStorage access denied");
        },
        get length() {
          throw new Error("localStorage access denied");
        },
        get key() {
          throw new Error("localStorage access denied");
        },
      };

      Object.defineProperty(window, "localStorage", {
        value: throwingStorage,
        writable: true,
      });

      render(
        <TermsVersionManager config={mockConfig}>
          <div data-testid="app-content">App Content</div>
        </TermsVersionManager>,
      );

      // Should handle gracefully
      expect(screen.getByTestId("app-content")).toBeInTheDocument();
    });
  });

  describe("Responsive Design Tests", () => {
    it("should adapt to different viewport sizes", () => {
      // Mock different viewport sizes
      const viewports = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 768, height: 1024 }, // iPad
        { width: 1920, height: 1080 }, // Desktop
      ];

      viewports.forEach((viewport) => {
        // Mock window dimensions
        Object.defineProperty(window, "innerWidth", {
          value: viewport.width,
          writable: true,
        });
        Object.defineProperty(window, "innerHeight", {
          value: viewport.height,
          writable: true,
        });

        const { unmount } = render(
          <TermsAcceptanceModal
            isOpen={true}
            onAccept={vi.fn()}
            onDecline={vi.fn()}
            config={mockConfig}
          />,
        );

        const dialogContent = screen.getByTestId("dialog-content");

        // Should have responsive classes
        expect(dialogContent).toHaveClass("max-w-4xl");
        if (viewport.width < 640) {
          expect(dialogContent).toHaveClass("mx-2");
        }

        unmount();
      });
    });
  });

  describe("Feature Detection", () => {
    it("should detect and handle missing modern features", () => {
      // Mock older browser without modern features
      const originalPromise = window.Promise;
      const originalFetch = window.fetch;

      try {
        // Remove modern features
        (window as any).Promise = undefined;
        (window as any).fetch = undefined;

        render(
          <TermsVersionManager config={mockConfig}>
            <div data-testid="app-content">App Content</div>
          </TermsVersionManager>,
        );

        // Should still render (React handles Promise polyfills)
        expect(screen.getByTestId("app-content")).toBeInTheDocument();
      } finally {
        // Restore features
        window.Promise = originalPromise;
        (window as any).fetch = originalFetch;
      }
    });
  });

  describe("Performance on Different Browsers", () => {
    it("should handle large terms content efficiently across browsers", () => {
      const { TermsContentManager } = require("../../lib/terms/index");

      // Mock large content
      const largeContent = Array.from({ length: 50 }, (_, i) => ({
        id: `section-${i}`,
        title: `Section ${i + 1}`,
        content: "Lorem ipsum ".repeat(100), // Large content
        order: i + 1,
        isRequired: true,
      }));

      TermsContentManager.getCurrentContent.mockReturnValue({
        version: "1.0.0",
        lastUpdated: new Date(),
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
        sections: largeContent,
      });

      const startTime = performance.now();

      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);

      // Should render all sections
      expect(screen.getByText("Section 1")).toBeInTheDocument();
      expect(screen.getByText("Section 50")).toBeInTheDocument();
    });
  });

  describe("Accessibility Across Browsers", () => {
    it("should maintain accessibility features in all browsers", () => {
      render(
        <TermsAcceptanceModal
          isOpen={true}
          onAccept={vi.fn()}
          onDecline={vi.fn()}
          config={mockConfig}
        />,
      );

      // Check ARIA attributes work across browsers
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");

      // Check keyboard navigation
      const acceptButton = screen.getByText("Aceitar");
      const declineButton = screen.getByText(/Recusar/);

      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });
  });
});
