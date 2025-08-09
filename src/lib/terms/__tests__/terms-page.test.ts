/**
 * Terms of Service Page Tests
 *
 * Tests for the terms.astro page rendering and content structure
 */

import { describe, it, expect, beforeEach } from "vitest";
import { TermsContentManager } from "../content";
import type { TermsContent, TermsSection } from "../../types/terms";

describe("Terms Page Content Structure", () => {
  let termsContent: TermsContent;
  let sectionsInOrder: TermsSection[];

  beforeEach(() => {
    termsContent = TermsContentManager.getCurrentContent();
    sectionsInOrder = TermsContentManager.getSectionsInOrder();
  });

  describe("Content Validation", () => {
    it("should have valid terms content structure", () => {
      expect(termsContent).toBeDefined();
      expect(termsContent.version).toBe("1.0.0");
      expect(termsContent.sections).toHaveLength(10);
      expect(termsContent.metadata.language).toBe("pt-BR");
      expect(termsContent.metadata.jurisdiction).toBe("Brasil");
    });

    it("should have all required sections in correct order", () => {
      const expectedSections = [
        "introduction",
        "service-purpose",
        "permitted-use",
        "prohibited-activities",
        "future-changes",
        "liability-disclaimer",
        "privacy-data",
        "updates-modifications",
        "contact-support",
        "governing-law",
      ];

      expect(sectionsInOrder).toHaveLength(10);

      sectionsInOrder.forEach((section, index) => {
        expect(section.id).toBe(expectedSections[index]);
        expect(section.order).toBe(index + 1);
        expect(section.isRequired).toBe(true);
      });
    });

    it("should have proper section titles in Portuguese", () => {
      const expectedTitles = [
        "1. Introdução",
        "2. Finalidade do Serviço",
        "3. Uso Permitido",
        "4. Atividades Proibidas",
        "5. Mudanças Futuras e Modelo de Negócio",
        "6. Limitação de Responsabilidade",
        "7. Privacidade e Dados",
        "8. Atualizações dos Termos",
        "9. Contato e Suporte",
        "10. Lei Aplicável",
      ];

      sectionsInOrder.forEach((section, index) => {
        expect(section.title).toBe(expectedTitles[index]);
      });
    });

    it("should have non-empty content for all sections", () => {
      sectionsInOrder.forEach((section) => {
        expect(section.content).toBeDefined();
        expect(section.content.trim().length).toBeGreaterThan(50);
        expect(section.content).not.toContain("<script>");
        expect(section.content).not.toContain("<iframe>");
      });
    });
  });

  describe("Date and Version Information", () => {
    it("should have valid dates", () => {
      expect(termsContent.lastUpdated).toBeInstanceOf(Date);
      expect(termsContent.metadata.effectiveDate).toBeInstanceOf(Date);
      expect(termsContent.lastUpdated.getTime()).toBeLessThanOrEqual(
        Date.now(),
      );
      expect(termsContent.metadata.effectiveDate.getTime()).toBeLessThanOrEqual(
        Date.now(),
      );
    });

    it("should format dates correctly for Brazilian locale", () => {
      const lastUpdatedFormatted = termsContent.lastUpdated.toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );

      const effectiveDateFormatted =
        termsContent.metadata.effectiveDate.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

      expect(lastUpdatedFormatted).toMatch(/^\d{1,2} de \w+ de \d{4}$/);
      expect(effectiveDateFormatted).toMatch(/^\d{1,2} de \w+ de \d{4}$/);
    });

    it("should have valid semantic version", () => {
      expect(termsContent.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("Content Summary", () => {
    it("should generate accurate summary information", () => {
      const summary = TermsContentManager.generateSummary();

      expect(summary.version).toBe("1.0.0");
      expect(summary.sectionCount).toBe(10);
      expect(summary.language).toBe("pt-BR");
      expect(summary.totalLength).toBeGreaterThan(1000);
      expect(summary.lastUpdated).toBeInstanceOf(Date);
    });
  });

  describe("Accessibility and SEO Requirements", () => {
    it("should have proper section IDs for navigation", () => {
      sectionsInOrder.forEach((section) => {
        expect(section.id).toMatch(/^[a-z-]+$/);
        expect(section.id).not.toContain(" ");
        expect(section.id.length).toBeGreaterThan(3);
      });
    });

    it("should have structured content for screen readers", () => {
      sectionsInOrder.forEach((section) => {
        // Check that titles are properly formatted
        expect(section.title).toMatch(/^\d+\./);

        // Check that content doesn't have accessibility issues
        expect(section.content).not.toContain("click here");
        expect(section.content).not.toContain("read more");
      });
    });
  });

  describe("Legal Content Validation", () => {
    it("should include required legal disclaimers", () => {
      const content = sectionsInOrder.map((s) => s.content).join(" ");

      // Check for key legal terms
      expect(content).toContain("AWS");
      expect(content).toContain("educativo");
      expect(content).toContain("responsabilidade");
      expect(content).toContain("LGPD");
      expect(content).toContain("Brasil");
    });

    it("should have contact information", () => {
      const contactSection = sectionsInOrder.find(
        (s) => s.id === "contact-support",
      );
      expect(contactSection).toBeDefined();
      expect(contactSection!.content).toContain("suporte@simuladoraws.com.br");
      expect(contactSection!.content).toContain("48 horas");
    });

    it("should include proper jurisdiction information", () => {
      const governingLawSection = sectionsInOrder.find(
        (s) => s.id === "governing-law",
      );
      expect(governingLawSection).toBeDefined();
      expect(governingLawSection!.content).toContain("legislação brasileira");
      expect(governingLawSection!.content).toContain(
        "tribunais competentes do Brasil",
      );
    });
  });

  describe("Content Security", () => {
    it("should not contain potentially dangerous content", () => {
      sectionsInOrder.forEach((section) => {
        // Check for script tags
        expect(section.content.toLowerCase()).not.toContain("<script");
        expect(section.content.toLowerCase()).not.toContain("javascript:");
        expect(section.content.toLowerCase()).not.toContain("onclick");
        expect(section.content.toLowerCase()).not.toContain("onerror");

        // Check for iframe or embed tags
        expect(section.content.toLowerCase()).not.toContain("<iframe");
        expect(section.content.toLowerCase()).not.toContain("<embed");
        expect(section.content.toLowerCase()).not.toContain("<object");
      });
    });

    it("should have safe email and contact formats", () => {
      const contactSection = sectionsInOrder.find(
        (s) => s.id === "contact-support",
      );
      expect(contactSection).toBeDefined();

      // Email should be properly formatted
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      expect(contactSection!.content).toMatch(emailRegex);
    });
  });

  describe("Responsive Design Requirements", () => {
    it("should have content suitable for mobile display", () => {
      sectionsInOrder.forEach((section) => {
        // Check that content doesn't have extremely long lines
        const lines = section.content.split("\n");
        lines.forEach((line) => {
          if (line.trim().length > 0) {
            expect(line.length).toBeLessThan(500); // Reasonable line length
          }
        });
      });
    });

    it("should have proper heading hierarchy", () => {
      sectionsInOrder.forEach((section, index) => {
        // All main sections should start with a number
        expect(section.title).toMatch(/^\d+\./);

        // Order should be sequential
        expect(section.order).toBe(index + 1);
      });
    });
  });
});

describe("Terms Page Integration", () => {
  let termsContent: TermsContent;
  let sectionsInOrder: TermsSection[];

  beforeEach(() => {
    termsContent = TermsContentManager.getCurrentContent();
    sectionsInOrder = TermsContentManager.getSectionsInOrder();
  });

  describe("Navigation Structure", () => {
    it("should generate proper anchor links", () => {
      sectionsInOrder.forEach((section) => {
        const expectedAnchor = `section-${section.id}`;
        expect(expectedAnchor).toMatch(/^section-[a-z-]+$/);
      });
    });

    it("should have table of contents data", () => {
      expect(sectionsInOrder.length).toBeGreaterThan(0);

      sectionsInOrder.forEach((section) => {
        expect(section.id).toBeDefined();
        expect(section.title).toBeDefined();
        expect(section.order).toBeGreaterThan(0);
      });
    });
  });

  describe("Print Functionality", () => {
    it("should have content suitable for printing", () => {
      // Check that content doesn't rely on interactive elements
      sectionsInOrder.forEach((section) => {
        expect(section.content).not.toContain("click");
        expect(section.content).not.toContain("hover");
      });
    });
  });

  describe("Metadata for SEO", () => {
    it("should have proper metadata structure", () => {
      expect(termsContent.metadata).toBeDefined();
      expect(termsContent.metadata.language).toBe("pt-BR");
      expect(termsContent.metadata.jurisdiction).toBe("Brasil");
      expect(termsContent.metadata.effectiveDate).toBeInstanceOf(Date);
    });
  });
});
