import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import TermsNavigationLinks from "../TermsNavigationLinks";

afterEach(() => {
  cleanup();
});

describe("TermsNavigationLinks", () => {
  describe("Footer variant", () => {
    it("renders footer links with proper structure", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });
      const separator = screen.getByText("|");

      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute("href", "/terms");
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute("href", "/privacy");
      expect(separator).toBeInTheDocument();
    });

    it("applies correct CSS classes for footer variant", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      expect(termsLink).toHaveClass("text-muted-foreground");
      expect(termsLink).toHaveClass("hover:text-primary");
      expect(termsLink).toHaveClass("transition-colors");
    });

    it("shows icons when showIcons is true", () => {
      render(<TermsNavigationLinks variant="footer" showIcons={true} />);

      // Icons should be present but we can't easily test for specific lucide icons
      // We can test that the links contain spans with flex layout for icons
      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const span = termsLink.querySelector("span");
      expect(span).toHaveClass("flex", "items-center", "gap-1");
    });
  });

  describe("Inline variant", () => {
    it("renders inline links with proper structure", () => {
      render(<TermsNavigationLinks variant="inline" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });
      const connector = screen.getByText("e");

      expect(termsLink).toBeInTheDocument();
      expect(privacyLink).toBeInTheDocument();
      expect(connector).toBeInTheDocument();
    });

    it("applies correct CSS classes for inline variant", () => {
      render(<TermsNavigationLinks variant="inline" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      expect(termsLink).toHaveClass("text-foreground");
      expect(termsLink).toHaveClass("underline");
      expect(termsLink).toHaveClass("underline-offset-4");
    });
  });

  describe("Contextual variant", () => {
    it("renders contextual links with proper structure", () => {
      render(<TermsNavigationLinks variant="contextual" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });

      expect(termsLink).toBeInTheDocument();
      expect(privacyLink).toBeInTheDocument();
    });

    it("applies correct CSS classes for contextual variant", () => {
      render(<TermsNavigationLinks variant="contextual" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      expect(termsLink).toHaveClass("text-sm");
      expect(termsLink).toHaveClass("text-muted-foreground");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });

      expect(termsLink).toHaveAttribute(
        "aria-label",
        "Acessar Termos de Serviço",
      );
      expect(privacyLink).toHaveAttribute(
        "aria-label",
        "Acessar Política de Privacidade",
      );
    });

    it("has proper role attributes", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });

      expect(termsLink).toHaveAttribute("role", "link");
      expect(privacyLink).toHaveAttribute("role", "link");
    });

    it("has proper tabIndex for keyboard navigation", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      const privacyLink = screen.getByRole("link", {
        name: /acessar política de privacidade/i,
      });

      expect(termsLink).toHaveAttribute("tabIndex", "0");
      expect(privacyLink).toHaveAttribute("tabIndex", "0");
    });

    it("has focus ring classes for keyboard navigation", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      expect(termsLink).toHaveClass("focus:outline-none");
      expect(termsLink).toHaveClass("focus:ring-2");
      expect(termsLink).toHaveClass("focus:ring-primary");
      expect(termsLink).toHaveClass("focus:ring-offset-2");
      expect(termsLink).toHaveClass("rounded-sm");
    });

    it("marks decorative elements with aria-hidden", () => {
      render(<TermsNavigationLinks variant="footer" />);

      const separator = screen.getByText("|");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Custom styling", () => {
    it("applies custom className", () => {
      render(
        <TermsNavigationLinks variant="footer" className="custom-class" />,
      );

      const container = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      }).parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("combines custom className with variant classes", () => {
      render(
        <TermsNavigationLinks variant="inline" className="custom-class" />,
      );

      const termsLink = screen.getByRole("link", {
        name: /acessar termos de serviço/i,
      });
      expect(termsLink).toHaveClass("custom-class");
      expect(termsLink).toHaveClass("text-foreground"); // variant class should still be present
    });
  });

  describe("Edge cases", () => {
    it("handles invalid variant gracefully", () => {
      // @ts-expect-error Testing invalid variant
      const { container } = render(<TermsNavigationLinks variant="invalid" />);

      // Should render nothing for invalid variant
      expect(container.firstChild).toBeNull();
    });

    it("renders nothing for unknown variant", () => {
      // @ts-expect-error Testing unknown variant
      const { container } = render(<TermsNavigationLinks variant="unknown" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Link targets", () => {
    it("has correct href attributes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const termsLink = container.querySelector('a[href="/terms"]');
      const privacyLink = container.querySelector('a[href="/privacy"]');

      expect(termsLink).toBeInTheDocument();
      expect(privacyLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute("href", "/terms");
      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });
  });
});
