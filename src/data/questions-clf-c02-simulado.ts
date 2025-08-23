import type { Question } from "../lib/types/questions";

export const CLF_C02_Questions: Question[] = [
  {
    id: "clf-c02-q1",
    type: "single_choice",
    text: "Qual é uma característica fundamental do modelo de computação em nuvem da AWS?",
    options: [
      {
        id: "a",
        text: "Pagamento antecipado por recursos",
        isCorrect: false,
        explanation:
          "O modelo de pagamento da AWS é baseado no uso, não em pagamento antecipado.",
      },
      {
        id: "b",
        text: "Capacidade elástica sob demanda",
        isCorrect: true,
        explanation:
          "A elasticidade é uma característica fundamental da AWS, permitindo aumentar ou diminuir recursos conforme necessário.",
      },
      {
        id: "c",
        text: "Recursos físicos dedicados apenas",
        isCorrect: false,
        explanation:
          "A AWS oferece tanto recursos compartilhados quanto dedicados, não apenas dedicados.",
      },
      {
        id: "d",
        text: "Contratos de longo prazo obrigatórios",
        isCorrect: false,
        explanation:
          "A AWS não exige contratos de longo prazo, oferecendo flexibilidade no consumo de recursos.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "clf-c02-q2",
    type: "single_choice",
    text: "Qual serviço da AWS é responsável pelo gerenciamento de identidade e acesso?",
    source: "OFFICIAL",
    options: [
      {
        id: "a",
        text: "AWS IAM",
        isCorrect: true,
        explanation:
          "O AWS IAM (Identity and Access Management) é o serviço responsável por gerenciar identidades e permissões na AWS.",
      },
      {
        id: "b",
        text: "AWS EC2",
        isCorrect: false,
        explanation:
          "AWS EC2 é um serviço de computação em nuvem, não de gerenciamento de identidade.",
      },
      {
        id: "c",
        text: "AWS S3",
        isCorrect: false,
        explanation:
          "AWS S3 é um serviço de armazenamento de objetos, não de gerenciamento de identidade.",
      },
      {
        id: "d",
        text: "AWS RDS",
        isCorrect: false,
        explanation:
          "AWS RDS é um serviço de banco de dados relacional, não de gerenciamento de identidade.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: ["https://aws.amazon.com/iam/"],
  },
  {
    id: "clf-c02-q3",
    type: "single_choice",
    text: "Qual serviço da AWS é mais adequado para executar cargas de trabalho em contêineres?",
    source: "OFFICIAL",
    options: [
      {
        id: "a",
        text: "Amazon ECS",
        isCorrect: true,
        explanation:
          "Amazon ECS (Elastic Container Service) é um serviço de orquestração de contêineres totalmente gerenciado.",
      },
      {
        id: "b",
        text: "Amazon S3",
        isCorrect: false,
        explanation:
          "Amazon S3 é um serviço de armazenamento, não de execução de contêineres.",
      },
      {
        id: "c",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um serviço de banco de dados, não de execução de contêineres.",
      },
      {
        id: "d",
        text: "Amazon SNS",
        isCorrect: false,
        explanation:
          "Amazon SNS é um serviço de mensageria, não de execução de contêineres.",
      },
    ],
    category: "technology",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ecs/"],
  },
  {
    id: "clf-c02-q4",
    type: "single_choice",
    text: "Qual plano de suporte AWS inclui acesso ao AWS Trusted Advisor completo?",
    source: "OFFICIAL",
    options: [
      {
        id: "a",
        text: "Basic",
        isCorrect: false,
        explanation:
          "O plano Basic não inclui acesso ao AWS Trusted Advisor completo.",
      },
      {
        id: "b",
        text: "Developer",
        isCorrect: false,
        explanation:
          "O plano Developer oferece acesso limitado ao AWS Trusted Advisor.",
      },
      {
        id: "c",
        text: "Business",
        isCorrect: true,
        explanation:
          "O plano Business inclui acesso completo ao AWS Trusted Advisor.",
      },
      {
        id: "d",
        text: "Enterprise On-Ramp",
        isCorrect: false,
        explanation:
          "Embora o Enterprise On-Ramp também inclua acesso completo ao Trusted Advisor, o Business é o primeiro nível que oferece este benefício.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/premiumsupport/plans/"],
  },
];
