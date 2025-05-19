import type { Question } from "@/lib/types/questions";

export const questionsSaaC03: Question[] = [
  {
    id: "SAA-C03-01-01",
    text: "Uma empresa está planejando migrar sua aplicação para a AWS e precisa garantir alta disponibilidade e resiliência. Qual combinação de serviços AWS atenderá melhor a esses requisitos?",
    text_en:
      "A company is planning to migrate their application to AWS and needs to ensure high availability and resilience. Which combination of AWS services would best meet these requirements?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Amazon EC2 em uma única zona de disponibilidade",
        text_en: "Amazon EC2 in a single availability zone",
        isCorrect: false,
        explanation:
          "Uma única zona de disponibilidade não oferece resiliência suficiente para garantir alta disponibilidade.",
        explanation_en:
          "A single availability zone does not provide sufficient resilience to ensure high availability.",
      },
      {
        id: "B",
        text: "Amazon EC2 em múltiplas zonas de disponibilidade com Auto Scaling",
        text_en: "Amazon EC2 in multiple availability zones with Auto Scaling",
        isCorrect: true,
        explanation:
          "Esta combinação oferece alta disponibilidade através de redundância em múltiplas zonas e capacidade de escalar automaticamente.",
        explanation_en:
          "This combination provides high availability through redundancy across multiple zones and the ability to scale automatically.",
      },
      {
        id: "C",
        text: "Amazon S3 com versionamento habilitado",
        text_en: "Amazon S3 with versioning enabled",
        isCorrect: false,
        explanation:
          "O Amazon S3 é um serviço de armazenamento e não é adequado para hospedar aplicações com requisitos de alta disponibilidade.",
        explanation_en:
          "Amazon S3 is a storage service and is not suitable for hosting applications with high availability requirements.",
      },
      {
        id: "D",
        text: "Amazon RDS em uma única zona de disponibilidade",
        text_en: "Amazon RDS in a single availability zone",
        isCorrect: false,
        explanation:
          "Uma única zona de disponibilidade para RDS não oferece a resiliência necessária para alta disponibilidade.",
        explanation_en:
          "A single availability zone for RDS does not provide the necessary resilience for high availability.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/architecture/well-architected/",
      "https://aws.amazon.com/ec2/autoscaling/",
    ],
  },
];
