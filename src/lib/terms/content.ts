/**
 * Terms of Service Content Management
 *
 * This module manages the terms content, including Brazilian Portuguese legal text,
 * version management, and content validation.
 */

import type {
  TermsContent,
  TermsSection,
  TermsVersion,
  TermsError,
  ContentValidator,
} from "../types/terms";
import { TermsStatus, TermsErrorCode } from "../types/terms";

// Brazilian Portuguese Terms of Service Content
export const TERMS_CONTENT_PT_BR: TermsContent = {
  version: "1.0.0",
  lastUpdated: new Date("2025-01-08"),
  metadata: {
    language: "pt-BR",
    jurisdiction: "Brasil",
    effectiveDate: new Date("2025-01-08"),
  },
  sections: [
    {
      id: "introduction",
      title: "1. Introdução",
      content: `Bem-vindo ao Simulador AWS. Este documento estabelece os termos e condições para o uso de nosso simulador educacional de certificação AWS. Ao usar este serviço, você concorda com estes termos.

Este simulador é uma ferramenta educacional independente e não possui afiliação oficial com a Amazon Web Services (AWS). O conteúdo é baseado em materiais públicos e experiência da comunidade.`,
      order: 1,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "service-purpose",
      title: "2. Finalidade do Serviço",
      content: `O simulador é destinado exclusivamente para fins educativos e de preparação para certificações AWS. O serviço oferece:

• Questões práticas baseadas nos exames oficiais AWS
• Simulações de ambiente de prova
• Relatórios de progresso e desempenho
• Materiais de estudo complementares

Este não é um serviço oficial da AWS e não garante aprovação em exames reais.`,
      order: 2,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "permitted-use",
      title: "3. Uso Permitido",
      content: `Você pode usar o simulador gratuitamente para:

• Estudar para certificações AWS
• Praticar com questões de exemplo
• Acompanhar seu progresso de aprendizado
• Compartilhar feedback sobre o conteúdo

O uso deve ser pessoal e não comercial. É proibido revender, redistribuir ou usar o conteúdo para fins comerciais sem autorização expressa.`,
      order: 3,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "prohibited-activities",
      title: "4. Atividades Proibidas",
      content: `É expressamente proibido:

• Copiar, reproduzir ou distribuir o conteúdo sem autorização
• Usar ferramentas automatizadas para extrair dados
• Tentar comprometer a segurança do sistema
• Criar contas múltiplas para contornar limitações
• Usar o serviço para atividades ilegais ou prejudiciais
• Fazer engenharia reversa do código ou algoritmos

Violações podem resultar na suspensão imediata do acesso.`,
      order: 4,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "future-changes",
      title: "5. Mudanças Futuras e Modelo de Negócio",
      content: `Reservamo-nos o direito de:

• Modificar ou descontinuar recursos do serviço
• Implementar modelos de assinatura ou pagamento no futuro
• Alterar a estrutura de preços conforme necessário
• Adicionar recursos premium ou funcionalidades pagas

Usuários existentes serão notificados com antecedência sobre mudanças significativas. O acesso gratuito atual não garante acesso gratuito perpétuo.`,
      order: 5,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "liability-disclaimer",
      title: "6. Limitação de Responsabilidade",
      content: `O serviço é fornecido "como está" sem garantias de qualquer tipo. Não nos responsabilizamos por:

• Resultados em exames oficiais AWS
• Precisão completa do conteúdo educacional
• Disponibilidade ininterrupta do serviço
• Perda de dados ou progresso do usuário
• Danos diretos ou indiretos decorrentes do uso

Nossa responsabilidade é limitada ao máximo permitido pela lei brasileira.`,
      order: 6,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "privacy-data",
      title: "7. Privacidade e Dados",
      content: `Respeitamos sua privacidade e seguimos a Lei Geral de Proteção de Dados (LGPD):

• Coletamos apenas dados necessários para o funcionamento
• Não vendemos informações pessoais a terceiros
• Dados de progresso são armazenados localmente quando possível
• Você pode solicitar remoção de seus dados a qualquer momento

Para mais detalhes, consulte nossa Política de Privacidade.`,
      order: 7,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "updates-modifications",
      title: "8. Atualizações dos Termos",
      content: `Estes termos podem ser atualizados periodicamente para:

• Refletir mudanças na legislação
• Incorporar novos recursos do serviço
• Melhorar a clareza e proteção legal
• Atender requisitos regulatórios

Usuários serão notificados sobre mudanças significativas e precisarão aceitar os novos termos para continuar usando o serviço.`,
      order: 8,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "contact-support",
      title: "9. Contato e Suporte",
      content: `Para questões sobre estes termos ou o serviço:

• Email: suporte@simuladoraws.com.br
• Formulário de contato no site
• Tempo de resposta: até 48 horas úteis

Para questões legais ou de privacidade, use o canal de contato específico indicado em nossa Política de Privacidade.`,
      order: 9,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
    {
      id: "governing-law",
      title: "10. Lei Aplicável",
      content: `Estes termos são regidos pela legislação brasileira. Qualquer disputa será resolvida nos tribunais competentes do Brasil.

Data de última atualização: 08 de janeiro de 2025
Versão: 1.0.0

Ao continuar usando o serviço, você confirma ter lido, compreendido e concordado com estes termos.`,
      order: 10,
      isRequired: true,
      lastModified: new Date("2025-01-08"),
    },
  ],
};

// Version management utilities
export class TermsVersionManager {
  private static readonly VERSION_REGEX = /^(\d+)\.(\d+)\.(\d+)$/;

  /**
   * Compare two version strings using semantic versioning
   */
  static compareVersions(version1: string, version2: string): number {
    const v1Parts = this.parseVersion(version1);
    const v2Parts = this.parseVersion(version2);

    if (!v1Parts || !v2Parts) {
      throw new Error("Invalid version format");
    }

    for (let i = 0; i < 3; i++) {
      if (v1Parts[i] > v2Parts[i]) return 1;
      if (v1Parts[i] < v2Parts[i]) return -1;
    }

    return 0;
  }

  /**
   * Check if a version is newer than another
   */
  static isNewerVersion(
    currentVersion: string,
    comparedVersion: string,
  ): boolean {
    return this.compareVersions(currentVersion, comparedVersion) > 0;
  }

  /**
   * Parse version string into numeric components
   */
  private static parseVersion(
    version: string,
  ): [number, number, number] | null {
    const match = version.match(this.VERSION_REGEX);
    if (!match) return null;

    return [
      parseInt(match[1], 10),
      parseInt(match[2], 10),
      parseInt(match[3], 10),
    ];
  }

  /**
   * Generate next version based on change type
   */
  static getNextVersion(
    currentVersion: string,
    changeType: "major" | "minor" | "patch",
  ): string {
    const parts = this.parseVersion(currentVersion);
    if (!parts) throw new Error("Invalid current version format");

    switch (changeType) {
      case "major":
        return `${parts[0] + 1}.0.0`;
      case "minor":
        return `${parts[0]}.${parts[1] + 1}.0`;
      case "patch":
        return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
      default:
        throw new Error("Invalid change type");
    }
  }

  /**
   * Create a new terms version from content
   */
  static createVersion(
    content: TermsContent,
    changes?: string[],
  ): TermsVersion {
    return {
      version: content.version,
      lastUpdated: content.lastUpdated,
      content: this.serializeContent(content),
      changes: changes || [],
      status: TermsStatus.CURRENT,
      requiresNewAcceptance: true,
    };
  }

  /**
   * Serialize terms content to string format
   */
  private static serializeContent(content: TermsContent): string {
    const sortedSections = [...content.sections].sort(
      (a, b) => a.order - b.order,
    );

    return sortedSections
      .map((section) => `${section.title}\n\n${section.content}`)
      .join("\n\n---\n\n");
  }
}

// Content validation utilities
export class TermsContentValidator {
  /**
   * Validate complete terms content structure
   */
  static validateContent(content: TermsContent): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate version format
    if (!this.isValidVersion(content.version)) {
      errors.push(
        "Invalid version format. Expected semantic versioning (x.y.z)",
      );
    }

    // Validate metadata
    if (!content.metadata.language) {
      errors.push("Language is required in metadata");
    }

    if (!content.metadata.jurisdiction) {
      errors.push("Jurisdiction is required in metadata");
    }

    // Validate sections
    if (!content.sections || content.sections.length === 0) {
      errors.push("At least one section is required");
    } else {
      errors.push(...this.validateSections(content.sections));
    }

    // Validate dates
    if (content.lastUpdated > new Date()) {
      errors.push("Last updated date cannot be in the future");
    }

    if (content.metadata.effectiveDate > new Date()) {
      errors.push("Effective date cannot be in the future");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate individual sections
   */
  private static validateSections(sections: TermsSection[]): string[] {
    const errors: string[] = [];
    const sectionIds = new Set<string>();
    const orders = new Set<number>();

    sections.forEach((section, index) => {
      // Check required fields
      if (!section.id) {
        errors.push(`Section ${index + 1}: ID is required`);
      } else if (sectionIds.has(section.id)) {
        errors.push(
          `Section ${index + 1}: Duplicate section ID '${section.id}'`,
        );
      } else {
        sectionIds.add(section.id);
      }

      if (!section.title) {
        errors.push(`Section ${index + 1}: Title is required`);
      }

      if (!section.content || section.content.trim().length === 0) {
        errors.push(`Section ${index + 1}: Content is required`);
      }

      // Check order uniqueness
      if (orders.has(section.order)) {
        errors.push(
          `Section ${index + 1}: Duplicate order number ${section.order}`,
        );
      } else {
        orders.add(section.order);
      }

      // Validate content length
      if (section.content && section.content.length > 10000) {
        errors.push(
          `Section ${index + 1}: Content exceeds maximum length (10000 characters)`,
        );
      }
    });

    return errors;
  }

  /**
   * Validate version string format
   */
  private static isValidVersion(version: string): boolean {
    return /^\d+\.\d+\.\d+$/.test(version);
  }

  /**
   * Sanitize content to prevent XSS and ensure safe rendering
   */
  static sanitizeContent(content: string): string {
    // Basic HTML entity encoding
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /**
   * Validate and sanitize a complete terms content object
   */
  static validateAndSanitize(content: TermsContent): {
    isValid: boolean;
    sanitizedContent?: TermsContent;
    errors: string[];
  } {
    const validation = this.validateContent(content);

    if (!validation.isValid) {
      return {
        isValid: false,
        errors: validation.errors,
      };
    }

    // Create sanitized copy
    const sanitizedContent: TermsContent = {
      ...content,
      sections: content.sections.map((section) => ({
        ...section,
        title: this.sanitizeContent(section.title),
        content: this.sanitizeContent(section.content),
      })),
    };

    return {
      isValid: true,
      sanitizedContent,
      errors: [],
    };
  }
}

// Content management utilities
export class TermsContentManager {
  private static currentContent: TermsContent = TERMS_CONTENT_PT_BR;

  /**
   * Get current terms content
   */
  static getCurrentContent(): TermsContent {
    return { ...this.currentContent };
  }

  /**
   * Update terms content with validation
   */
  static updateContent(newContent: TermsContent): {
    success: boolean;
    errors?: string[];
  } {
    const validation = TermsContentValidator.validateAndSanitize(newContent);

    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    this.currentContent = validation.sanitizedContent!;
    return { success: true };
  }

  /**
   * Get specific section by ID
   */
  static getSection(sectionId: string): TermsSection | null {
    const section = this.currentContent.sections.find(
      (section) => section.id === sectionId,
    );
    return section ? { ...section } : null;
  }

  /**
   * Get sections in display order
   */
  static getSectionsInOrder(): TermsSection[] {
    return [...this.currentContent.sections].sort((a, b) => a.order - b.order);
  }

  /**
   * Generate content summary for display
   */
  static generateSummary(): {
    version: string;
    lastUpdated: Date;
    sectionCount: number;
    totalLength: number;
    language: string;
  } {
    const totalLength = this.currentContent.sections.reduce(
      (sum, section) => sum + section.content.length,
      0,
    );

    return {
      version: this.currentContent.version,
      lastUpdated: this.currentContent.lastUpdated,
      sectionCount: this.currentContent.sections.length,
      totalLength,
      language: this.currentContent.metadata.language,
    };
  }

  /**
   * Create error object for terms operations
   */
  static createError(
    code: TermsErrorCode,
    message: string,
    details?: any,
  ): TermsError {
    return {
      code,
      message,
      details,
      timestamp: new Date(),
    };
  }
}

// Export the default content for easy access
export default TERMS_CONTENT_PT_BR;
