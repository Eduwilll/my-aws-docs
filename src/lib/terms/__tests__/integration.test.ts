/**
 * Integration tests for Terms Content Management System
 */

import { describe, it, expect } from "vitest";
import {
  TermsVersionManager,
  TermsContentValidator,
  TermsContentManager,
  TERMS_CONTENT_PT_BR,
  TermsContent,
  TermsStatus,
} from "../index";

describe("Terms Content Management Integration", () => {
  it("should handle complete content lifecycle", () => {
    // 1. Start with default content
    const initialContent = TermsContentManager.getCurrentContent();
    expect(initialContent.version).toBe("1.0.0");

    // 2. Validate the content
    const validation = TermsContentValidator.validateContent(initialContent);
    expect(validation.isValid).toBe(true);

    // 3. Create a version from the content
    const version = TermsVersionManager.createVersion(initialContent, [
      "Initial version",
    ]);
    expect(version.version).toBe("1.0.0");
    expect(version.status).toBe(TermsStatus.CURRENT);

    // 4. Generate next version
    const nextVersionString = TermsVersionManager.getNextVersion(
      "1.0.0",
      "minor",
    );
    expect(nextVersionString).toBe("1.1.0");

    // 5. Create updated content
    const updatedContent: TermsContent = {
      ...initialContent,
      version: nextVersionString,
      lastUpdated: new Date(),
      sections: [
        ...initialContent.sections,
        {
          id: "new-section",
          title: "Nova Seção",
          content: "Conteúdo da nova seção",
          order: initialContent.sections.length + 1,
          isRequired: false,
          lastModified: new Date(),
        },
      ],
    };

    // 6. Update the content
    const updateResult = TermsContentManager.updateContent(updatedContent);
    expect(updateResult.success).toBe(true);

    // 7. Verify the update
    const currentContent = TermsContentManager.getCurrentContent();
    expect(currentContent.version).toBe("1.1.0");
    expect(currentContent.sections.length).toBe(
      initialContent.sections.length + 1,
    );

    // 8. Check version comparison
    const isNewer = TermsVersionManager.isNewerVersion("1.1.0", "1.0.0");
    expect(isNewer).toBe(true);

    // 9. Generate summary
    const summary = TermsContentManager.generateSummary();
    expect(summary.version).toBe("1.1.0");
    expect(summary.sectionCount).toBe(initialContent.sections.length + 1);
  });

  it("should handle content validation and sanitization workflow", () => {
    // Create content with potentially unsafe HTML
    const unsafeContent: TermsContent = {
      version: "1.0.0",
      lastUpdated: new Date(),
      metadata: {
        language: "pt-BR",
        jurisdiction: "Brasil",
        effectiveDate: new Date(),
      },
      sections: [
        {
          id: "test-section",
          title: '<script>alert("xss")</script>Título Seguro',
          content:
            "Conteúdo com <b>HTML</b> e <script>código malicioso</script>",
          order: 1,
          isRequired: true,
        },
      ],
    };

    // Validate and sanitize
    const result = TermsContentValidator.validateAndSanitize(unsafeContent);

    expect(result.isValid).toBe(true);
    expect(result.sanitizedContent).toBeDefined();

    // Check that HTML was sanitized
    const sanitizedSection = result.sanitizedContent!.sections[0];
    expect(sanitizedSection.title).not.toContain("<script>");
    expect(sanitizedSection.title).toContain("&lt;script&gt;");
    expect(sanitizedSection.content).not.toContain("<script>");
    expect(sanitizedSection.content).toContain("&lt;script&gt;");
  });

  it("should handle error scenarios gracefully", () => {
    // Test invalid content update
    const invalidContent: TermsContent = {
      version: "invalid-version",
      lastUpdated: new Date(),
      metadata: {
        language: "",
        jurisdiction: "",
        effectiveDate: new Date(),
      },
      sections: [],
    };

    const updateResult = TermsContentManager.updateContent(invalidContent);
    expect(updateResult.success).toBe(false);
    expect(updateResult.errors).toBeDefined();
    expect(updateResult.errors!.length).toBeGreaterThan(0);

    // Verify original content is unchanged
    const currentContent = TermsContentManager.getCurrentContent();
    expect(currentContent.version).not.toBe("invalid-version");
  });

  it("should maintain data integrity across operations", () => {
    const originalContent = TermsContentManager.getCurrentContent();
    const originalSummary = TermsContentManager.generateSummary();

    // Perform various read operations
    const section = TermsContentManager.getSection("introduction");
    const sectionsInOrder = TermsContentManager.getSectionsInOrder();
    const contentCopy = TermsContentManager.getCurrentContent();

    // Verify no mutations occurred
    const newSummary = TermsContentManager.generateSummary();
    expect(newSummary).toEqual(originalSummary);

    // Verify returned objects are copies
    expect(contentCopy).not.toBe(originalContent);
    expect(contentCopy).toEqual(originalContent);

    expect(sectionsInOrder).not.toBe(originalContent.sections);
    expect(section).not.toBe(
      originalContent.sections.find((s) => s.id === "introduction"),
    );
  });

  it("should validate default Brazilian Portuguese content", () => {
    // Ensure the default content meets all requirements
    const validation =
      TermsContentValidator.validateContent(TERMS_CONTENT_PT_BR);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);

    // Check language and jurisdiction
    expect(TERMS_CONTENT_PT_BR.metadata.language).toBe("pt-BR");
    expect(TERMS_CONTENT_PT_BR.metadata.jurisdiction).toBe("Brasil");

    // Verify all sections have Portuguese content
    TERMS_CONTENT_PT_BR.sections.forEach((section) => {
      expect(section.title).toBeTruthy();
      expect(section.content).toBeTruthy();
      expect(section.content.length).toBeGreaterThan(50); // Reasonable content length
    });

    // Check for key Portuguese terms
    const allContent = TERMS_CONTENT_PT_BR.sections
      .map((s) => s.title + " " + s.content)
      .join(" ")
      .toLowerCase();

    expect(allContent).toContain("simulador");
    expect(allContent).toContain("aws");
    expect(allContent).toContain("brasil");
    expect(allContent).toContain("termos");
  });
});
