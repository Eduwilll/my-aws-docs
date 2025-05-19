// AWS Certified Cloud Practitioner (CLF-C02) Domain Map
export const CLF_C02_DomainMap = {
  DOMAIN_1: "Conceitos de Nuvem",
  DOMAIN_2: "Segurança e Conformidade",
  DOMAIN_3: "Tecnologia",
  DOMAIN_4: "Cobrança e Preços",
} as const;

// AWS Certified Solutions Architect - Associate (SAA-C03) Domain Map
export const SAA_C03_DomainMap = {
  DOMAIN_1: "Criação de arquiteturas seguras",
  DOMAIN_2: "Criação de arquiteturas resilientes",
  DOMAIN_3: "Criação de arquiteturas de alto desempenho",
  DOMAIN_4: "Criação de arquiteturas com custo otimizado",
} as const;

// AWS Certified Solutions Architect - Professional (SAP-C02) Domain Map
export const SAP_C02_DomainMap = {
  DOMAIN_1: "Design para Organizações",
  DOMAIN_2: "Design para Novas Soluções",
  DOMAIN_3: "Migração e Modernização",
  DOMAIN_4: "Custo e Otimização de Performance",
  DOMAIN_5: "Segurança e Conformidade",
} as const;

// AWS Certified DevOps Engineer - Professional (DOP-C02) Domain Map
export const DOP_C02_DomainMap = {
  DOMAIN_1: "SDLC Automation",
  DOMAIN_2: "Configuration Management and Infrastructure as Code",
  DOMAIN_3: "Resilient Cloud Solutions",
  DOMAIN_4: "Monitoring and Logging",
  DOMAIN_5: "Incident and Event Response",
  DOMAIN_6: "High Availability, Fault Tolerance, and Disaster Recovery",
} as const;

// Type for domain keys
export type CLF_C02_DomainKey = keyof typeof CLF_C02_DomainMap;
export type SAA_C03_DomainKey = keyof typeof SAA_C03_DomainMap;
export type SAP_C02_DomainKey = keyof typeof SAP_C02_DomainMap;
export type DOP_C02_DomainKey = keyof typeof DOP_C02_DomainMap;

// Union type for all domain keys
export type ExamDomainKey =
  | CLF_C02_DomainKey
  | SAA_C03_DomainKey
  | SAP_C02_DomainKey
  | DOP_C02_DomainKey;

// Interface for exam domain information
export interface ExamDomainInfo {
  name: string;
  percentage: number;
  description: string;
}

// Exam domain details with percentages and descriptions
export const CLF_C02_DomainDetails: Record<CLF_C02_DomainKey, ExamDomainInfo> =
  {
    DOMAIN_1: {
      name: "Conceitos de Nuvem",
      percentage: 24,
      description:
        "Fundamentos da AWS, benefícios da nuvem e serviços principais",
    },
    DOMAIN_2: {
      name: "Segurança e Conformidade",
      percentage: 30,
      description:
        "Modelo de responsabilidade compartilhada, segurança e conformidade",
    },
    DOMAIN_3: {
      name: "Tecnologia",
      percentage: 34,
      description:
        "Serviços de computação, armazenamento, banco de dados e rede",
    },
    DOMAIN_4: {
      name: "Cobrança e Preços",
      percentage: 12,
      description: "Modelos de preços, otimização de custos e suporte",
    },
  };

export const SAA_C03_DomainDetails: Record<SAA_C03_DomainKey, ExamDomainInfo> =
  {
    DOMAIN_1: {
      name: "Criação de arquiteturas seguras",
      percentage: 30,
      description: "Design de arquiteturas seguras e resilientes na AWS",
    },
    DOMAIN_2: {
      name: "Criação de arquiteturas resilientes",
      percentage: 26,
      description:
        "Design de arquiteturas altamente disponíveis e tolerantes a falhas",
    },
    DOMAIN_3: {
      name: "Criação de arquiteturas de alto desempenho",
      percentage: 24,
      description: "Design de arquiteturas escaláveis e de alto desempenho",
    },
    DOMAIN_4: {
      name: "Criação de arquiteturas com custo otimizado",
      percentage: 20,
      description: "Design de arquiteturas econômicas e otimizadas",
    },
  };
