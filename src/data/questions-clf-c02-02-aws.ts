import type { Question } from "../lib/types/questions";

export const questionsClfC0202: Question[] = [
  {
    id: "CLF-C02-02-01",
    text: "Qual é a opção de armazenamento padrão do serviço S3?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Standard",
        isCorrect: true,
        explanation:
          "Standard é a opção padrão devido à alta durabilidade e disponibilidade.",
      },
      {
        id: "B",
        text: "Infrequent Access",
        isCorrect: false,
        explanation:
          "Infrequent Access e Glacier têm tempos de recuperação mais longos.",
      },
      {
        id: "C",
        text: "Frequent Access",
        isCorrect: false,
        explanation: "Frequent Access não é uma classe de armazenamento.",
      },
      {
        id: "D",
        text: "Glacier",
        isCorrect: false,
        explanation: "Glacier tem tempos de recuperação mais longos.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-02",
    text: "Uma aplicação de terceiros produzirá um arquivo em um formato incompatível com o seu sistema. Qual serviço da AWS pode ser usado para transformar esse arquivo?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS DMS",
        isCorrect: false,
        explanation:
          "DataSync é para sincronização de dados; DMS é para migração de bancos de dados.",
      },
      {
        id: "B",
        text: "AWS DataSync",
        isCorrect: false,
        explanation: "DataSync é para sincronização de dados.",
      },
      {
        id: "C",
        text: "AWS DTS",
        isCorrect: false,
        explanation: "DTS não é um serviço da AWS.",
      },
      {
        id: "D",
        text: "AWS Glue",
        isCorrect: true,
        explanation:
          "AWS Glue é um serviço de ETL que automatiza a transformação de dados.",
      },
    ],
    category: "application_integration",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-03",
    text: "Qual é o banco de dados relacional totalmente gerenciado pela AWS e que pode ser 5x mais rápido que o MySQL?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aurora",
        isCorrect: true,
        explanation: "Amazon Aurora é otimizado para MySQL e PostgreSQL.",
      },
      {
        id: "B",
        text: "Neptune",
        isCorrect: false,
        explanation: "Neptune é um banco de dados de grafos.",
      },
      {
        id: "C",
        text: "MariaDB",
        isCorrect: false,
        explanation: "MariaDB não tem a mesma otimização.",
      },
      {
        id: "D",
        text: "DynamoDB",
        isCorrect: false,
        explanation: "DynamoDB é NoSQL.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-04",
    text: "Uma empresa busca aprimorar a eficiência dos custos ao utilizar o serviço S3. Como seria possível otimizar essa situação?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Criando uma cópia desses objetos em outra região",
        isCorrect: false,
        explanation: "Criar cópias em outra região não otimiza custos.",
      },
      {
        id: "B",
        text: "Criando uma cópia desses objetos em outra zona de disponibilidade",
        isCorrect: false,
        explanation:
          "Criar cópias em outra zona de disponibilidade não otimiza custos.",
      },
      {
        id: "C",
        text: "Configurando o S3 Lifecycle para que os objetos expirem em 30 dias para serem automaticamente excluídos",
        isCorrect: true,
        explanation: "O S3 Lifecycle automatiza a exclusão de dados antigos.",
      },
      {
        id: "D",
        text: "Configurando o CloudWatch para monitorar o S3 e enviar um email solicitando a exclusão dos arquivos",
        isCorrect: false,
        explanation: "CloudWatch apenas monitora.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-05",
    text: "Uma agência de publicidade pretende lançar um site com conteúdo estático. Qual serviço seria mais apropriado e econômico?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elastic File System (EFS)",
        isCorrect: false,
        explanation: "EFS é mais caro e complexo.",
      },
      {
        id: "B",
        text: "Docker",
        isCorrect: false,
        explanation: "Docker não é um serviço de armazenamento.",
      },
      {
        id: "C",
        text: "Simple Storage Service (S3)",
        isCorrect: true,
        explanation: "S3 é ideal para sites estáticos, sendo econômico.",
      },
      {
        id: "D",
        text: "Elastic Compute Cloud (EC2)",
        isCorrect: false,
        explanation: "EC2 é mais caro e complexo.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-06",
    text: "Uma empresa tem o interesse em empregar o AWS IQ para agilizar a entrega de um projeto na nuvem. Como esse serviço pode ser utilizado?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Analisando e gerando dados para gerar insights",
        isCorrect: false,
        explanation: "Não é uma função do AWS IQ.",
      },
      {
        id: "B",
        text: "Ensinando linguagem de programação em nuvem",
        isCorrect: false,
        explanation: "Não é uma função do AWS IQ.",
      },
      {
        id: "C",
        text: "Automatizando a infraestrutura na nuvem",
        isCorrect: false,
        explanation: "Não é uma função do AWS IQ.",
      },
      {
        id: "D",
        text: "Conectando especialistas da AWS para projetos de curto prazo",
        isCorrect: true,
        explanation:
          "AWS IQ conecta clientes a especialistas para projetos específicos.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-07",
    text: "Quais recursos referem-se ao Amazon S3? (Selecione 2 alternativas)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Objeto é um arquivo ou meta dado que descreve o arquivo",
        isCorrect: true,
        explanation: "A e C são conceitos fundamentais do S3.",
      },
      {
        id: "B",
        text: "Lambdas são funções sem servidores",
        isCorrect: false,
        explanation: "B e D se referem a outros serviços da AWS.",
      },
      {
        id: "C",
        text: "Bucket é um container de objetos",
        isCorrect: true,
        explanation: "A e C são conceitos fundamentais do S3.",
      },
      {
        id: "D",
        text: "Elastic Load Balancer são balanceadores de carga",
        isCorrect: false,
        explanation: "B e D se referem a outros serviços da AWS.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-08",
    text: "Uma organização almeja padronizar o processo de criação e configuração de todos os bancos de dados em sua infraestrutura por meio de código, permitindo a implementação automática através de pipelines de CI/CD. Qual serviço seria a recomendação para atender a esse propósito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS RDS",
        isCorrect: false,
        explanation: "RDS é para bancos de dados.",
      },
      {
        id: "B",
        text: "AWS IAC",
        isCorrect: false,
        explanation: "IAC não é um serviço.",
      },
      {
        id: "C",
        text: "AWS CodePipeline",
        isCorrect: false,
        explanation: "CodePipeline é para CI/CD.",
      },
      {
        id: "D",
        text: "AWS CloudFormation",
        isCorrect: true,
        explanation:
          "CloudFormation permite gerenciar infraestrutura como código.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-09",
    text: "O que é possível fazer com o Amazon QuickSight?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Capturar dados de dispositivos e streaming",
        isCorrect: false,
        explanation:
          "A, B, e C não são funcionalidades principais do QuickSight.",
      },
      {
        id: "B",
        text: "Executar MapReduce em dados distribuídos",
        isCorrect: false,
        explanation:
          "A, B, e C não são funcionalidades principais do QuickSight.",
      },
      {
        id: "C",
        text: "Consultar dados no S3",
        isCorrect: false,
        explanation:
          "A, B, e C não são funcionalidades principais do QuickSight.",
      },
      {
        id: "D",
        text: "Criar dashboards de BI com machine learning",
        isCorrect: true,
        explanation: "QuickSight é usado para criar dashboards e análises.",
      },
    ],
    category: "analytics",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-10",
    text: "Qual serviço fornece informações sobre os custos de infraestrutura na AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Inspector",
        isCorrect: false,
        explanation: "Inspector e Trusted Advisor têm outras finalidades.",
      },
      {
        id: "B",
        text: "AWS Budgets",
        isCorrect: false,
        explanation: "Budgets é para planejamento.",
      },
      {
        id: "C",
        text: "AWS Cost Explorer",
        isCorrect: true,
        explanation: "Cost Explorer permite visualizar e analisar custos.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation: "Inspector e Trusted Advisor têm outras finalidades.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-11",
    text: "Como o AWS Compute Optimizer ajuda a identificar configurações ideais na AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Análise de mercado",
        isCorrect: false,
        explanation: "As outras opções não se aplicam ao Compute Optimizer.",
      },
      {
        id: "B",
        text: "Mineração de dados",
        isCorrect: false,
        explanation: "As outras opções não se aplicam ao Compute Optimizer.",
      },
      {
        id: "C",
        text: "Machine learning",
        isCorrect: true,
        explanation:
          "Compute Optimizer usa machine learning para otimizar configurações.",
      },
      {
        id: "D",
        text: "Redes sociais",
        isCorrect: false,
        explanation: "As outras opções não se aplicam ao Compute Optimizer.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-12",
    text: "Qual é a capacidade de armazenamento do S3?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "5 Gigabytes",
        isCorrect: false,
        explanation:
          "As outras opções não refletem a verdadeira capacidade do S3.",
      },
      {
        id: "B",
        text: "50 Gigabytes",
        isCorrect: false,
        explanation:
          "As outras opções não refletem a verdadeira capacidade do S3.",
      },
      {
        id: "C",
        text: "Capacidade virtualmente ilimitada",
        isCorrect: true,
        explanation: "S3 oferece capacidade praticamente ilimitada.",
      },
      {
        id: "D",
        text: "1 Terabyte",
        isCorrect: false,
        explanation:
          "As outras opções não refletem a verdadeira capacidade do S3.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-13",
    text: "Qual serviço audita as atividades na AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Audit",
        isCorrect: false,
        explanation: "As outras opções não são para auditoria.",
      },
      {
        id: "B",
        text: "AWS CloudSearch",
        isCorrect: false,
        explanation: "As outras opções não são para auditoria.",
      },
      {
        id: "C",
        text: "AWS CloudTrail",
        isCorrect: true,
        explanation: "CloudTrail registra todas as atividades na AWS.",
      },
      {
        id: "D",
        text: "AWS Elasticsearch",
        isCorrect: false,
        explanation: "As outras opções não são para auditoria.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-14",
    text: "Quais são as formas de pagamento para instâncias EC2? (Selecione 3 alternativas)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Spot",
        isCorrect: true,
        explanation:
          "Spot, On-Demand, e Reserved são opções de pagamento para EC2.",
      },
      {
        id: "B",
        text: "On-Demand",
        isCorrect: true,
        explanation:
          "Spot, On-Demand, e Reserved são opções de pagamento para EC2.",
      },
      {
        id: "C",
        text: "On-Premise",
        isCorrect: false,
        explanation:
          "On-Premise e Tailor Made não são formas de pagamento na AWS.",
      },
      {
        id: "D",
        text: "Reserved",
        isCorrect: true,
        explanation:
          "Spot, On-Demand, e Reserved são opções de pagamento para EC2.",
      },
      {
        id: "E",
        text: "Tailor Made",
        isCorrect: false,
        explanation:
          "On-Premise e Tailor Made não são formas de pagamento na AWS.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-15",
    text: "Qual serviço permite o acesso seguro a recursos na AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "IAM Users",
        isCorrect: false,
        explanation:
          "Users, Policies, e Groups têm outras funções no gerenciamento de acesso.",
      },
      {
        id: "B",
        text: "IAM Policies",
        isCorrect: false,
        explanation:
          "Users, Policies, e Groups têm outras funções no gerenciamento de acesso.",
      },
      {
        id: "C",
        text: "IAM Groups",
        isCorrect: false,
        explanation:
          "Users, Policies, e Groups têm outras funções no gerenciamento de acesso.",
      },
      {
        id: "D",
        text: "IAM Roles",
        isCorrect: true,
        explanation: "IAM Roles concede permissões temporárias e seguras.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-16",
    text: "Qual dos seguintes serviços de banco de dados é totalmente gerenciado pela AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "MariaDB",
        isCorrect: false,
        explanation:
          "MariaDB, SQL Server, e MySQL são gerenciados, mas não são NoSQL.",
      },
      {
        id: "B",
        text: "DynamoDB",
        isCorrect: true,
        explanation:
          "DynamoDB é um banco de dados NoSQL totalmente gerenciado.",
      },
      {
        id: "C",
        text: "SQL Server",
        isCorrect: false,
        explanation:
          "MariaDB, SQL Server, e MySQL são gerenciados, mas não são NoSQL.",
      },
      {
        id: "D",
        text: "MySQL",
        isCorrect: false,
        explanation:
          "MariaDB, SQL Server, e MySQL são gerenciados, mas não são NoSQL.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-17",
    text: "Quem possui acesso completo na conta AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS IAM",
        isCorrect: false,
        explanation:
          "IAM e Administrator gerenciam acesso, mas não têm controle total.",
      },
      {
        id: "B",
        text: "AWS Account Root User",
        isCorrect: true,
        explanation: "O root user tem acesso completo à conta.",
      },
      {
        id: "C",
        text: "AWS Administrator",
        isCorrect: false,
        explanation:
          "IAM e Administrator gerenciam acesso, mas não têm controle total.",
      },
      {
        id: "D",
        text: "AWS Full User",
        isCorrect: false,
        explanation:
          "IAM e Administrator gerenciam acesso, mas não têm controle total.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  {
    id: "CLF-C02-02-18",
    text: "Quais são as principais vantagens do AWS ECS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Alta disponibilidade",
        isCorrect: false,
        explanation:
          "As outras opções são características, mas o gerenciamento simplificado é o diferencial.",
      },
      {
        id: "B",
        text: "Integração com serviços de rede",
        isCorrect: false,
        explanation:
          "As outras opções são características, mas o gerenciamento simplificado é o diferencial.",
      },
      {
        id: "C",
        text: "Gerenciamento simplificado de contêineres",
        isCorrect: true,
        explanation: "ECS facilita o gerenciamento de contêineres.",
      },
    ],
    category: "containers",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [],
  },
  // Add the remaining 61 questions here
];
