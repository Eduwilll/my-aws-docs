/**
 * Unit tests for Terms Content Management System
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  TermsVersionManager,
  TermsContentValidator,
  TermsContentManager,
  TERMS_CONTENT_PT_BR,
} from "../content";
import {
  TermsContent,
  TermsSection,
  TermsStatus,
  TermsErrorCode,
} from "../../types/terms";

describe("TermsVersionManager", () => {
  describe("compareVersions", () => {
    it("should correctly compare semantic versions", () => {
      expect(TermsVersionManager.compareVersions("1.0.0", "1.0.0")).toBe(0);
      expect(TermsVersionManager.compareVersions("1.0.1", "1.0.0")).toBe(1);
      expect(TermsVersionManager.compareVersions("1.0.0", "1.0.1")).toBe(-1);
      expect(TermsVersionManager.compareVersions("2.0.0", "1.9.9")).toBe(1);
      expect(TermsVersionManager.compareVersions("1.2.0", "1.1.9")).toBe(1);
    });

    it("should throw error for invalid version format", () => {
      expect(() => TermsVersionManager.compareVersions("1.0", "1.0.0")).toThrow(
        "Invalid version format",
      );
      expect(() =>
        TermsVersionManager.compareVersions("v1.0.0", "1.0.0"),
      ).toThrow("Invalid version format");
      expect(() =>
        TermsVersionManager.compareVersions("1.0.0", "invalid"),
      ).toThrow("Invalid version format");
    });
  });

  describe("isNewerVersion", () => {
    it("should correctly identify newer versions", () => {
      expect(TermsVersionManager.isNewerVersion("1.0.1", "1.0.0")).toBe(true);
      expect(TermsVersionManager.isNewerVersion("1.0.0", "1.0.1")).toBe(false);
      expect(TermsVersionManager.isNewerVersion("1.0.0", "1.0.0")).toBe(false);
      expect(TermsVersionManager.isNewerVersion("2.0.0", "1.9.9")).toBe(true);
    });
  });

  describe("getNextVersion", () => {
    it("should generate correct next versions", () => {
      expect(TermsVersionManager.getNextVersion("1.0.0", "patch")).toBe(
        "1.0.1",
      );
      expect(TermsVersionManager.getNextVersion("1.0.0", "minor")).toBe(
        "1.1.0",
      );
      expect(TermsVersionManager.getNextVersion("1.0.0", "major")).toBe(
        "2.0.0",
      );
      expect(TermsVersionManager.getNextVersion("1.2.3", "patch")).toBe(
        "1.2.4",
      );
      expect(TermsVersionManager.getNextVersion("1.2.3", "minor")).toBe(
        "1.3.0",
      );
      expect(TermsVersionManager.getNextVersion("1.2.3", "major")).toBe(
        "2.0.0",
      );
    });

    it("should throw error for invalid version or change type", () => {
      expect(() =>
        TermsVersionManager.getNextVersion("invalid", "patch"),
      ).toThrow("Invalid current version format");
      expect(() =>
        TermsVersionManager.getNextVersion("1.0.0", "invalid" as any),
      ).toThrow("Invalid change type");
    });
  });

  describe("createVersion", () => {
    it("should create a valid terms version from content", () => {
      const mockContent: TermsContent = {
        version: "1.0.0",
        lastUpdated: new Date("2025-01-08"),
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date("2025-01-08"),
        },
        sections: [
          {
            id: "test",
            title: "Test Section",
            content: "Test content",
            order: 1,
            isRequired: true,
          },
        ],
      };

      const changes = ["Added new section"];
      const version = TermsVersionManager.createVersion(mockContent, changes);

      expect(version.version).toBe("1.0.0");
      expect(version.lastUpdated).toEqual(new Date("2025-01-08"));
      expect(version.changes).toEqual(changes);
      expect(version.status).toBe(TermsStatus.CURRENT);
      expect(version.requiresNewAcceptance).toBe(true);
      expect(version.content).toContain("Test Section");
      expect(version.content).toContain("Test content");
    });
  });
});

describe("TermsContentValidator", () => {
  let validContent: TermsContent;

  beforeEach(() => {
    validContent = {
      version: "1.0.0",
      lastUpdated: new Date("2025-01-08"),
      metadata: {
        language: "pt-BR",
        jurisdiction: "Brasil",
        effectiveDate: new Date("2025-01-08"),
      },
      sections: [
        {
          id: "section1",
          title: "Section 1",
          content: "Content 1",
          order: 1,
          isRequired: true,
        },
        {
          id: "section2",
          title: "Section 2",
          content: "Content 2",
          order: 2,
          isRequired: false,
        },
      ],
    };
  });

  describe("validateContent", () => {
    it("should validate correct content structure", () => {
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should detect invalid version format", () => {
      validContent.version = "invalid";
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Invalid version format. Expected semantic versioning (x.y.z)",
      );
    });

    it("should detect missing metadata", () => {
      validContent.metadata.language = "";
      validContent.metadata.jurisdiction = "";
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Language is required in metadata");
      expect(result.errors).toContain("Jurisdiction is required in metadata");
    });

    it("should detect empty sections", () => {
      validContent.sections = [];
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("At least one section is required");
    });

    it("should detect duplicate section IDs", () => {
      validContent.sections[1].id = "section1";
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((error) => error.includes("Duplicate section ID")),
      ).toBe(true);
    });

    it("should detect duplicate order numbers", () => {
      validContent.sections[1].order = 1;
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((error) => error.includes("Duplicate order number")),
      ).toBe(true);
    });

    it("should detect missing required fields", () => {
      validContent.sections[0].id = "";
      validContent.sections[0].title = "";
      validContent.sections[0].content = "";
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((error) => error.includes("ID is required")),
      ).toBe(true);
      expect(
        result.errors.some((error) => error.includes("Title is required")),
      ).toBe(true);
      expect(
        result.errors.some((error) => error.includes("Content is required")),
      ).toBe(true);
    });

    it("should detect future dates", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      validContent.lastUpdated = futureDate;
      validContent.metadata.effectiveDate = futureDate;

      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Last updated date cannot be in the future",
      );
      expect(result.errors).toContain("Effective date cannot be in the future");
    });

    it("should detect content that exceeds maximum length", () => {
      validContent.sections[0].content = "a".repeat(10001);
      const result = TermsContentValidator.validateContent(validContent);
      expect(result.isValid).toBe(false);
      expect(
        result.errors.some((error) =>
          error.includes("Content exceeds maximum length"),
        ),
      ).toBe(true);
    });
  });

  describe("sanitizeContent", () => {
    it("should sanitize HTML entities", () => {
      const unsafeContent =
        '<script>alert("xss")</script> & "quotes" \'single\' /slash/';
      const sanitized = TermsContentValidator.sanitizeContent(unsafeContent);

      expect(sanitized).toBe(
        "&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt; &amp; &quot;quotes&quot; &#x27;single&#x27; &#x2F;slash&#x2F;",
      );
      expect(sanitized).not.toContain("<script>");
      expect(sanitized).not.toContain("</script>");
    });

    it("should handle empty and null content", () => {
      expect(TermsContentValidator.sanitizeContent("")).toBe("");
      expect(TermsContentValidator.sanitizeContent("normal text")).toBe(
        "normal text",
      );
    });
  });

  describe("validateAndSanitize", () => {
    it("should validate and sanitize valid content", () => {
      const result = TermsContentValidator.validateAndSanitize(validContent);

      expect(result.isValid).toBe(true);
      expect(result.sanitizedContent).toBeDefined();
      expect(result.errors).toHaveLength(0);
      expect(result.sanitizedContent!.sections[0].title).toBe("Section 1");
    });

    it("should return errors for invalid content without sanitizing", () => {
      validContent.version = "invalid";
      const result = TermsContentValidator.validateAndSanitize(validContent);

      expect(result.isValid).toBe(false);
      expect(result.sanitizedContent).toBeUndefined();
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("should sanitize content with HTML entities", () => {
      validContent.sections[0].title = "<b>Bold Title</b>";
      validContent.sections[0].content =
        'Content with <script>alert("xss")</script>';

      const result = TermsContentValidator.validateAndSanitize(validContent);

      expect(result.isValid).toBe(true);
      expect(result.sanitizedContent!.sections[0].title).toBe(
        "&lt;b&gt;Bold Title&lt;&#x2F;b&gt;",
      );
      expect(result.sanitizedContent!.sections[0].content).toContain(
        "&lt;script&gt;",
      );
    });
  });
});

describe("TermsContentManager", () => {
  beforeEach(() => {
    // Reset to default content before each test
    TermsContentManager.updateContent(TERMS_CONTENT_PT_BR);
  });

  describe("getCurrentContent", () => {
    it("should return current terms content", () => {
      const content = TermsContentManager.getCurrentContent();
      expect(content.version).toBe("1.0.0");
      expect(content.metadata.language).toBe("pt-BR");
      expect(content.sections.length).toBeGreaterThan(0);
    });

    it("should return a copy, not the original object", () => {
      const content1 = TermsContentManager.getCurrentContent();
      const content2 = TermsContentManager.getCurrentContent();

      expect(content1).not.toBe(content2);
      expect(content1).toEqual(content2);
    });
  });

  describe("updateContent", () => {
    it("should update content with valid data", () => {
      const newContent: TermsContent = {
        version: "2.0.0",
        lastUpdated: new Date("2025-01-09"),
        metadata: {
          language: "pt-BR",
          jurisdiction: "Brasil",
          effectiveDate: new Date("2025-01-09"),
        },
        sections: [
          {
            id: "new-section",
            title: "New Section",
            content: "New content",
            order: 1,
            isRequired: true,
          },
        ],
      };

      const result = TermsContentManager.updateContent(newContent);
      expect(result.success).toBe(true);
      expect(result.errors).toBeUndefined();

      const currentContent = TermsContentManager.getCurrentContent();
      expect(currentContent.version).toBe("2.0.0");
    });

    it("should reject invalid content", () => {
      const invalidContent: TermsContent = {
        version: "invalid",
        lastUpdated: new Date(),
        metadata: {
          language: "",
          jurisdiction: "",
          effectiveDate: new Date(),
        },
        sections: [],
      };

      const result = TermsContentManager.updateContent(invalidContent);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });
  });

  describe("getSection", () => {
    it("should return existing section by ID", () => {
      const section = TermsContentManager.getSection("introduction");
      expect(section).toBeDefined();
      expect(section!.id).toBe("introduction");
      expect(section!.title).toContain("Introdução");
    });

    it("should return null for non-existing section", () => {
      const section = TermsContentManager.getSection("non-existing");
      expect(section).toBeNull();
    });
  });

  describe("getSectionsInOrder", () => {
    it("should return sections sorted by order", () => {
      const sections = TermsContentManager.getSectionsInOrder();

      expect(sections.length).toBeGreaterThan(0);

      for (let i = 1; i < sections.length; i++) {
        expect(sections[i].order).toBeGreaterThanOrEqual(sections[i - 1].order);
      }
    });

    it("should return a copy of sections array", () => {
      const sections1 = TermsContentManager.getSectionsInOrder();
      const sections2 = TermsContentManager.getSectionsInOrder();

      expect(sections1).not.toBe(sections2);
      expect(sections1).toEqual(sections2);
    });
  });

  describe("generateSummary", () => {
    it("should generate correct content summary", () => {
      const summary = TermsContentManager.generateSummary();

      expect(summary.version).toBe("1.0.0");
      expect(summary.lastUpdated).toEqual(new Date("2025-01-08"));
      expect(summary.sectionCount).toBeGreaterThan(0);
      expect(summary.totalLength).toBeGreaterThan(0);
      expect(summary.language).toBe("pt-BR");
    });

    it("should calculate total length correctly", () => {
      const content = TermsContentManager.getCurrentContent();
      const expectedLength = content.sections.reduce(
        (sum, section) => sum + section.content.length,
        0,
      );

      const summary = TermsContentManager.generateSummary();
      expect(summary.totalLength).toBe(expectedLength);
    });
  });

  describe("createError", () => {
    it("should create error object with correct properties", () => {
      const error = TermsContentManager.createError(
        TermsErrorCode.VALIDATION_ERROR,
        "Test error message",
        { detail: "test" },
      );

      expect(error.code).toBe(TermsErrorCode.VALIDATION_ERROR);
      expect(error.message).toBe("Test error message");
      expect(error.details).toEqual({ detail: "test" });
      expect(error.timestamp).toBeInstanceOf(Date);
    });

    it("should create error without details", () => {
      const error = TermsContentManager.createError(
        TermsErrorCode.NETWORK_ERROR,
        "Network error",
      );

      expect(error.code).toBe(TermsErrorCode.NETWORK_ERROR);
      expect(error.message).toBe("Network error");
      expect(error.details).toBeUndefined();
    });
  });
});

describe("TERMS_CONTENT_PT_BR", () => {
  it("should have valid structure", () => {
    const validation =
      TermsContentValidator.validateContent(TERMS_CONTENT_PT_BR);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it("should contain all required sections", () => {
    const requiredSectionIds = [
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

    const sectionIds = TERMS_CONTENT_PT_BR.sections.map(
      (section) => section.id,
    );

    requiredSectionIds.forEach((requiredId) => {
      expect(sectionIds).toContain(requiredId);
    });
  });

  it("should have Brazilian Portuguese content", () => {
    expect(TERMS_CONTENT_PT_BR.metadata.language).toBe("pt-BR");
    expect(TERMS_CONTENT_PT_BR.metadata.jurisdiction).toBe("Brasil");

    // Check for Portuguese content
    const introSection = TERMS_CONTENT_PT_BR.sections.find(
      (s) => s.id === "introduction",
    );
    expect(introSection?.content).toContain("Bem-vindo");
    expect(introSection?.content).toContain("simulador");
  });

  it("should have proper section ordering", () => {
    const sections = TERMS_CONTENT_PT_BR.sections;
    const orders = sections.map((s) => s.order);
    const sortedOrders = [...orders].sort((a, b) => a - b);

    expect(orders).toEqual(sortedOrders);
    expect(orders[0]).toBe(1);
    expect(orders[orders.length - 1]).toBe(sections.length);
  });
});
