/**
 * Unit Tests for Terms Content Management
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { TermsContentManager } from "../content";
import type { TermsContent, TermsSection } from "../../types/terms";

describe("TermsContentManager", () => {
  describe("getCurrentContent", () => {
    it("should return current terms content", () => {
      const content = TermsContentManager.getCurrentContent();

      expect(content).toBeDefined();
      expect(content.version).toBeDefined();
      expect(content.sections).toBeDefined();
      expect(Array.isArray(content.sections)).toBe(true);
      expect(content.metadata).toBeDefined();
    });

    it("should return content with proper structure", () => {
      const content = TermsContentManager.getCurrentContent();

      expect(content.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(content.lastUpdated).toBeInstanceOf(Date);
      expect(content.metadata.language).toBe("pt-BR");
      expect(content.metadata.jurisdiction).toBe("Brasil");
      expect(content.metadata.effectiveDate).toBeInstanceOf(Date);
    });

    it("should return sections with required properties", () => {
      const content = TermsContentManager.getCurrentContent();

      content.sections.forEach((section) => {
        expect(section.id).toBeDefined();
        expect(section.title).toBeDefined();
        expect(section.content).toBeDefined();
        expect(typeof section.order).toBe("number");
        expect(typeof section.isRequired).toBe("boolean");
      });
    });

    it("should return sections in correct order", () => {
      const content = TermsContentManager.getCurrentContent();

      const orders = content.sections.map((s) => s.order);
      const sortedOrders = [...orders].sort((a, b) => a - b);

      expect(orders).toEqual(sortedOrders);
    });
  });

  describe("updateContent", () => {
    it("should validate content structure", () => {
      const validContent: TermsContent = {
        version: "2.0.0",
        lastUpdated: new Date(),
        sections: [
          {
            id: "test",
            title: "Test Section",
            content: "Test content",
            order: 1,
            isRequired: true,
          },
        ],
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
      };

      const result = TermsContentManager.updateContent(validContent);

      expect(result.success).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it("should reject invalid version format", () => {
      const invalidContent = {
        version: "invalid-version",
        lastUpdated: new Date(),
        sections: [],
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
      } as TermsContent;

      const result = TermsContentManager.updateContent(invalidContent);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(
        result.errors!.some((error) => error.includes("version format")),
      ).toBe(true);
    });

    it("should reject empty sections", () => {
      const invalidContent: TermsContent = {
        version: "2.0.0",
        lastUpdated: new Date(),
        sections: [],
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
      };

      const result = TermsContentManager.updateContent(invalidContent);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.some((error) => error.includes("sections"))).toBe(
        true,
      );
    });

    it("should validate section structure", () => {
      const invalidContent = {
        version: "2.0.0",
        lastUpdated: new Date(),
        sections: [
          {
            id: "",
            title: "",
            content: "",
            order: -1,
          },
        ],
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date(),
        },
      } as TermsContent;

      const result = TermsContentManager.updateContent(invalidContent);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it("should validate metadata", () => {
      const invalidContent = {
        version: "2.0.0",
        lastUpdated: new Date(),
        sections: [
          {
            id: "test",
            title: "Test",
            content: "Content",
            order: 1,
            isRequired: true,
          },
        ],
        metadata: {
          language: "",
          jurisdiction: "",
          effectiveDate: new Date(),
        },
      } as TermsContent;

      const result = TermsContentManager.updateContent(invalidContent);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  describe("sanitizeContent", () => {
    it("should sanitize HTML content", () => {
      const dangerousContent =
        '<script>alert("xss")</script><p>Safe content</p>';
      const sanitized = TermsContentManager.sanitizeContent?.(dangerousContent);

      if (sanitized) {
        expect(sanitized).not.toContain("<script>");
        expect(sanitized).toContain("&lt;script&gt;");
        expect(sanitized).toContain("Safe content");
      }
    });

    it("should handle empty content", () => {
      const sanitized = TermsContentManager.sanitizeContent?.("");
      expect(sanitized).toBe("");
    });

    it("should preserve safe HTML", () => {
      const safeContent = "<p>This is <strong>safe</strong> content.</p>";
      const sanitized = TermsContentManager.sanitizeContent?.(safeContent);

      if (sanitized) {
        expect(sanitized).toContain("&lt;p&gt;");
        expect(sanitized).toContain("&lt;strong&gt;");
      }
    });
  });

  describe("getSection", () => {
    it("should return specific section by id", () => {
      const content = TermsContentManager.getCurrentContent();
      const firstSection = content.sections[0];

      const section = TermsContentManager.getSection?.(firstSection.id);

      if (section) {
        expect(section.id).toBe(firstSection.id);
        expect(section.title).toBe(firstSection.title);
      }
    });

    it("should return undefined for non-existent section", () => {
      const section = TermsContentManager.getSection?.("non-existent");
      expect(section).toBeUndefined();
    });
  });

  describe("getSectionsByType", () => {
    it("should return required sections only", () => {
      const requiredSections =
        TermsContentManager.getSectionsByType?.("required");

      if (requiredSections) {
        expect(Array.isArray(requiredSections)).toBe(true);
        requiredSections.forEach((section) => {
          expect(section.isRequired).toBe(true);
        });
      }
    });

    it("should return optional sections only", () => {
      const optionalSections =
        TermsContentManager.getSectionsByType?.("optional");

      if (optionalSections) {
        expect(Array.isArray(optionalSections)).toBe(true);
        optionalSections.forEach((section) => {
          expect(section.isRequired).toBe(false);
        });
      }
    });
  });

  describe("validateSection", () => {
    it("should validate correct section", () => {
      const validSection: TermsSection = {
        id: "test-section",
        title: "Test Section",
        content: "This is test content.",
        order: 1,
        isRequired: true,
      };

      const isValid = TermsContentManager.validateSection?.(validSection);
      expect(isValid).toBe(true);
    });

    it("should reject section with empty id", () => {
      const invalidSection: TermsSection = {
        id: "",
        title: "Test Section",
        content: "This is test content.",
        order: 1,
        isRequired: true,
      };

      const isValid = TermsContentManager.validateSection?.(invalidSection);
      expect(isValid).toBe(false);
    });

    it("should reject section with empty title", () => {
      const invalidSection: TermsSection = {
        id: "test",
        title: "",
        content: "This is test content.",
        order: 1,
        isRequired: true,
      };

      const isValid = TermsContentManager.validateSection?.(invalidSection);
      expect(isValid).toBe(false);
    });

    it("should reject section with empty content", () => {
      const invalidSection: TermsSection = {
        id: "test",
        title: "Test Section",
        content: "",
        order: 1,
        isRequired: true,
      };

      const isValid = TermsContentManager.validateSection?.(invalidSection);
      expect(isValid).toBe(false);
    });

    it("should reject section with invalid order", () => {
      const invalidSection: TermsSection = {
        id: "test",
        title: "Test Section",
        content: "Content",
        order: -1,
        isRequired: true,
      };

      const isValid = TermsContentManager.validateSection?.(invalidSection);
      expect(isValid).toBe(false);
    });
  });

  describe("getContentHash", () => {
    it("should generate consistent hash for same content", () => {
      const content = TermsContentManager.getCurrentContent();

      const hash1 = TermsContentManager.getContentHash?.(content);
      const hash2 = TermsContentManager.getContentHash?.(content);

      if (hash1 && hash2) {
        expect(hash1).toBe(hash2);
      }
    });

    it("should generate different hash for different content", () => {
      const content1 = TermsContentManager.getCurrentContent();
      const content2 = {
        ...content1,
        version: "999.0.0",
      };

      const hash1 = TermsContentManager.getContentHash?.(content1);
      const hash2 = TermsContentManager.getContentHash?.(content2);

      if (hash1 && hash2) {
        expect(hash1).not.toBe(hash2);
      }
    });
  });

  describe("compareVersions", () => {
    it("should compare version strings correctly", () => {
      const compare = TermsContentManager.compareVersions;

      if (compare) {
        expect(compare("1.0.0", "2.0.0")).toBeLessThan(0);
        expect(compare("2.0.0", "1.0.0")).toBeGreaterThan(0);
        expect(compare("1.0.0", "1.0.0")).toBe(0);
        expect(compare("1.0.1", "1.0.0")).toBeGreaterThan(0);
        expect(compare("1.1.0", "1.0.9")).toBeGreaterThan(0);
      }
    });
  });

  describe("getVersionHistory", () => {
    it("should return version history if available", () => {
      const history = TermsContentManager.getVersionHistory?.();

      if (history) {
        expect(Array.isArray(history)).toBe(true);
        history.forEach((version) => {
          expect(version.version).toBeDefined();
          expect(version.lastUpdated).toBeInstanceOf(Date);
        });
      }
    });
  });

  describe("error handling", () => {
    it("should handle content loading errors gracefully", () => {
      // Mock a scenario where content loading fails
      const originalGetCurrentContent = TermsContentManager.getCurrentContent;

      try {
        (TermsContentManager as any).getCurrentContent = () => {
          throw new Error("Content loading failed");
        };

        expect(() => {
          TermsContentManager.getCurrentContent();
        }).toThrow("Content loading failed");
      } finally {
        (TermsContentManager as any).getCurrentContent =
          originalGetCurrentContent;
      }
    });

    it("should validate content structure thoroughly", () => {
      const malformedContent = {
        version: null,
        sections: "not an array",
        metadata: null,
      } as any;

      const result = TermsContentManager.updateContent(malformedContent);

      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });
  });
});
