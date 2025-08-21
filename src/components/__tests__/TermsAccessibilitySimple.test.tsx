import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { TermsNavigationLinks } from "../TermsNavigationLinks";

describe("Terms Components Basic Accessibility", () => {
  afterEach(() => {
    cleanup();
  });

  describe("TermsNavigationLinks", () => {
    it("should render with proper accessibility attributes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

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

      cleanup();
    });

    it("should have proper responsive classes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const nav = container.querySelector("nav");
      expect(nav).toHaveClass("flex-col");
      expect(nav).toHaveClass("sm:flex-row");

      cleanup();
    });

    it("should have minimum touch target sizes", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveClass("min-h-[44px]");
      });

      cleanup();
    });

    it("should support keyboard navigation", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        expect(link).toHaveAttribute("tabIndex", "0");
        expect(link).toHaveClass("focus:outline-none");
        expect(link).toHaveClass("focus:ring-2");
      });

      cleanup();
    });

    it("should hide separators on mobile", () => {
      const { container } = render(<TermsNavigationLinks variant="footer" />);

      // Find separator by its content since it has aria-hidden="true"
      const separator = container.querySelector('[role="separator"]');
      expect(separator).toHaveClass("hidden");
      expect(separator).toHaveClass("sm:inline");

      cleanup();
    });

    it("should render contextual variant properly", () => {
      const { container } = render(
        <TermsNavigationLinks variant="contextual" />,
      );

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute(
        "aria-label",
        "Links contextuais para documentos legais",
      );
      expect(nav).toHaveClass("space-y-1");
      expect(nav).toHaveClass("sm:space-y-2");

      cleanup();
    });

    it("should render inline variant properly", () => {
      const { container } = render(<TermsNavigationLinks variant="inline" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Links para documentos legais");

      cleanup();
    });

    it("should show icons when requested", () => {
      const { container } = render(
        <TermsNavigationLinks variant="footer" showIcons={true} />,
      );

      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);

      icons.forEach((icon) => {
        expect(icon).toHaveClass("w-3");
        expect(icon).toHaveClass("h-3");
        expect(icon).toHaveClass("sm:w-4");
        expect(icon).toHaveClass("sm:h-4");
      });

      cleanup();
    });
  });
});
