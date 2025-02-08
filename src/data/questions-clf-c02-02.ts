import type { Question } from "../lib/types/questions";

const questionsClfC0202: Question[] = [
  {
    id: "CLF-C02-02-04",
    text: "Um engenheiro de rede precisa construir uma arquitetura de nuvem híbrida conectando redes locais à Nuvem AWS usando o AWS Direct Connect. A empresa possui algumas VPCs em uma única região da AWS e espera aumentar o número de VPCs para centenas ao longo do tempo. Qual serviço ou recurso da AWS o engenheiro deve usar para simplificar e dimensionar essa conectividade à medida que o número de VPCs aumenta?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Secrets Manager",
        isCorrect: false,
        explanation:
          "O AWS Secrets Manager é usado para gerenciar credenciais, não para conectividade de rede.",
      },
      {
        id: "B",
        text: "AWS Transit Gateway",
        isCorrect: true,
        explanation:
          "O AWS Transit Gateway é projetado especificamente para simplificar a conectividade entre VPCs e redes locais, permitindo escalar facilmente à medida que o número de VPCs aumenta.",
      },
      {
        id: "C",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço de DNS, não é usado para conectividade de rede VPC.",
      },
      {
        id: "D",
        text: "VPC endpoints",
        isCorrect: false,
        explanation:
          "VPC endpoints são usados para conectar VPCs a serviços AWS, não para conectividade entre VPCs ou com redes locais.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/transit-gateway/"],
  },
  {
    id: "CLF-C02-02-05",
    text: "Uma empresa deseja estabelecer um cronograma para a rotação das credenciais dos usuários do banco de dados. Qual serviço da AWS oferecerá suporte a esse requisito com a MENOS sobrecarga operacional?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Secrets Manager",
        isCorrect: true,
        explanation:
          "O AWS Secrets Manager pode automaticamente rotacionar credenciais de banco de dados com mínima intervenção manual.",
      },
      {
        id: "B",
        text: "AWS License Manager",
        isCorrect: false,
        explanation:
          "O AWS License Manager é usado para gerenciar licenças de software, não credenciais.",
      },
      {
        id: "C",
        text: "AWS Systems Manager",
        isCorrect: false,
        explanation:
          "O AWS Systems Manager é uma ferramenta de gerenciamento de recursos, não é especializado em rotação de credenciais.",
      },
      {
        id: "D",
        text: "AWS Managed Services",
        isCorrect: false,
        explanation:
          "O AWS Managed Services é um serviço mais amplo de gerenciamento de infraestrutura, não é específico para rotação de credenciais.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/secrets-manager/"],
  },
  {
    id: "CLF-C02-02-06",
    text: "Qual serviço AWS é usado para fornecer criptografia para Amazon EBS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Certificate Manager",
        isCorrect: false,
        explanation:
          "O AWS Certificate Manager é usado para gerenciar certificados SSL/TLS, não para criptografia de volumes EBS.",
      },
      {
        id: "B",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config é usado para avaliar e auditar configurações de recursos, não para criptografia.",
      },
      {
        id: "C",
        text: "AWS KMS",
        isCorrect: true,
        explanation:
          "O AWS KMS (Key Management Service) é usado para gerenciar chaves de criptografia para volumes EBS e outros serviços AWS.",
      },
      {
        id: "D",
        text: "AWS Systems Manager",
        isCorrect: false,
        explanation:
          "O AWS Systems Manager é usado para gerenciamento de recursos, não para criptografia.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/kms/"],
  },
  {
    id: "CLF-C02-02-07",
    text: "Uma empresa deseja gerenciar seus recursos da Nuvem AWS por meio de uma interface web. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Management Console",
        isCorrect: true,
        explanation:
          "O AWS Management Console é a interface web oficial da AWS para gerenciar recursos.",
      },
      {
        id: "B",
        text: "AWS Cloud9",
        isCorrect: false,
        explanation:
          "O AWS Cloud9 é um ambiente de desenvolvimento integrado (IDE), não uma interface de gerenciamento geral.",
      },
      {
        id: "C",
        text: "AWS CLI",
        isCorrect: false,
        explanation:
          "O AWS CLI é uma interface de linha de comando, não uma interface web.",
      },
      {
        id: "D",
        text: "AWS SDK",
        isCorrect: false,
        explanation:
          "O AWS SDK é um conjunto de bibliotecas de desenvolvimento, não uma interface web.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "easy",
    references: ["https://aws.amazon.com/console/"],
  },
  {
    id: "CLF-C02-02-08",
    text: "Quais das opções a seguir são vantagens da Nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Superprovisão para garantir capacidade",
        isCorrect: false,
        explanation:
          "A superprovisão não é uma vantagem, pois leva a custos desnecessários.",
      },
      {
        id: "B",
        text: "Foco no gerenciamento da infraestrutura de hardware",
        isCorrect: false,
        explanation:
          "A AWS gerencia a infraestrutura de hardware, permitindo que os clientes foquem em suas aplicações.",
      },
      {
        id: "C",
        text: "Elevadas economias de escala",
        isCorrect: true,
        explanation:
          "A AWS oferece economias de escala devido ao seu grande volume de operações.",
      },
      {
        id: "D",
        text: "Trocar despesas variáveis por despesas de capital",
        isCorrect: false,
        explanation:
          "A AWS permite trocar despesas de capital por despesas variáveis, não o contrário.",
      },
      {
        id: "E",
        text: "Lançar globalmente em minutos",
        isCorrect: true,
        explanation:
          "A AWS permite implantar aplicações globalmente em minutos usando sua infraestrutura global.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-02-09",
    text: "Qual benefício da Nuvem AWS é demonstrado pela capacidade de uma arquitetura de resistir a falhas com tempo de inatividade mínimo?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Alta disponibilidade",
        isCorrect: true,
        explanation:
          "Alta disponibilidade refere-se à capacidade de um sistema continuar funcionando mesmo quando ocorrem falhas.",
      },
      {
        id: "B",
        text: "Elasticidade",
        isCorrect: false,
        explanation:
          "Elasticidade refere-se à capacidade de aumentar ou diminuir recursos automaticamente conforme a demanda.",
      },
      {
        id: "C",
        text: "Escalabilidade",
        isCorrect: false,
        explanation:
          "Escalabilidade é a capacidade de aumentar ou diminuir recursos, mas não está diretamente relacionada à resistência a falhas.",
      },
      {
        id: "D",
        text: "Agilidade",
        isCorrect: false,
        explanation:
          "Agilidade refere-se à capacidade de desenvolver e implantar aplicações rapidamente.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-02-10",
    text: "Um desenvolvedor precisa manter uma infraestrutura de ambiente de desenvolvimento e uma infraestrutura de ambiente de produção de forma repetível. Qual serviço AWS o desenvolvedor deve usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "AWS Shield é um serviço de proteção contra DDoS, não para gerenciamento de infraestrutura.",
      },
      {
        id: "B",
        text: "AWS IoT Device Defender",
        isCorrect: false,
        explanation:
          "AWS IoT Device Defender é para segurança de dispositivos IoT, não para gerenciamento de infraestrutura.",
      },
      {
        id: "C",
        text: "AWS CloudFormation",
        isCorrect: true,
        explanation:
          "AWS CloudFormation permite criar e gerenciar infraestrutura como código de forma repetível.",
      },
      {
        id: "D",
        text: "AWS Ground Station",
        isCorrect: false,
        explanation:
          "AWS Ground Station é para comunicação com satélites, não para gerenciamento de infraestrutura.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudformation/"],
  },
  {
    id: "CLF-C02-02-11",
    text: "Qual tarefa é de responsabilidade do cliente, de acordo com o modelo de responsabilidade compartilhada da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Mantenha a segurança da Nuvem AWS.",
        isCorrect: false,
        explanation: "A segurança da nuvem é responsabilidade da AWS.",
      },
      {
        id: "B",
        text: "Aplicar patch no sistema operacional das instâncias do Amazon RDS.",
        isCorrect: false,
        explanation:
          "A AWS é responsável por patches do sistema operacional no RDS.",
      },
      {
        id: "C",
        text: "Implementar controles físicos e ambientais.",
        isCorrect: false,
        explanation:
          "Controles físicos e ambientais são responsabilidade da AWS.",
      },
      {
        id: "D",
        text: "Configurar firewalls e redes.",
        isCorrect: true,
        explanation:
          "A configuração de firewalls e redes é responsabilidade do cliente.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-02-12",
    text: "Qual serviço da AWS ajuda a fornecer aplicativos altamente disponíveis com failover rápido para arquiteturas multirregionais e multi-AZ?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: false,
        explanation:
          "AWS WAF é um firewall de aplicações web, não um serviço de disponibilidade.",
      },
      {
        id: "B",
        text: "AWS Global Accelerator",
        isCorrect: true,
        explanation:
          "AWS Global Accelerator melhora a disponibilidade de aplicativos direcionando o tráfego para endpoints saudáveis em várias regiões.",
      },
      {
        id: "C",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "AWS Shield é um serviço de proteção contra DDoS, não um serviço de disponibilidade.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "AWS Direct Connect é um serviço de conectividade dedicada, não um serviço de disponibilidade.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/global-accelerator/"],
  },
  {
    id: "CLF-C02-02-13",
    text: "Uma empresa possui um conjunto de aplicativos de comércio eletrônico. Os aplicativos precisam ser capazes de enviar mensagens entre si. Qual serviço AWS atende a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Auto Scaling",
        isCorrect: false,
        explanation:
          "AWS Auto Scaling é para ajustar capacidade, não para mensagens entre aplicativos.",
      },
      {
        id: "B",
        text: "Amazon Kinesis Data Streams",
        isCorrect: false,
        explanation:
          "Kinesis Data Streams é para processamento de dados em tempo real, não é a melhor opção para mensagens entre aplicativos.",
      },
      {
        id: "C",
        text: "Amazon Simple Queue Service (Amazon SQS)",
        isCorrect: true,
        explanation:
          "Amazon SQS é um serviço de filas de mensagens que permite desacoplamento e comunicação entre aplicativos.",
      },
      {
        id: "D",
        text: "Elastic Load Balancing",
        isCorrect: false,
        explanation:
          "Elastic Load Balancing é para distribuir tráfego, não para mensagens entre aplicativos.",
      },
    ],
    category: "application_integration",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/sqs/"],
  },
  {
    id: "CLF-C02-02-14",
    text: "Quais são os benefícios do faturamento consolidado para serviços de nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Custo personalizado e criação de orçamento de uso",
        isCorrect: false,
        explanation:
          "Embora seja possível criar orçamentos, não é um benefício específico do faturamento consolidado.",
      },
      {
        id: "B",
        text: "Opções de parcelamento",
        isCorrect: false,
        explanation:
          "O parcelamento não é um benefício do faturamento consolidado.",
      },
      {
        id: "C",
        text: "Uma fatura para várias contas",
        isCorrect: true,
        explanation:
          "O faturamento consolidado permite receber uma única fatura para todas as contas AWS da organização.",
      },
      {
        id: "D",
        text: "Descontos por volume",
        isCorrect: true,
        explanation:
          "O faturamento consolidado permite combinar o uso em todas as contas para compartilhar descontos por volume.",
      },
      {
        id: "E",
        text: "Uma taxa adicional mínima para uso",
        isCorrect: false,
        explanation:
          "Não há taxa adicional mínima para usar o faturamento consolidado.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/"],
  },
  {
    id: "CLF-C02-02-15",
    text: "Um usuário deseja revisar todos os buckets do Amazon S3 com ACLs e políticas de bucket do S3 no console do S3. Qual serviço ou recurso da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Access Analyzer for S3",
        isCorrect: true,
        explanation:
          "O Access Analyzer for S3 permite revisar facilmente as permissões de acesso para buckets S3, incluindo ACLs e políticas.",
      },
      {
        id: "B",
        text: "S3 Multi-Region Access Points",
        isCorrect: false,
        explanation:
          "S3 Multi-Region Access Points é usado para acesso a dados em várias regiões, não para análise de permissões.",
      },
      {
        id: "C",
        text: "S3 Storage Lens",
        isCorrect: false,
        explanation:
          "S3 Storage Lens é usado para análise de uso e atividade, não para análise de permissões.",
      },
      {
        id: "D",
        text: "AWS IAM Identity Center (AWS Single Sign-On)",
        isCorrect: false,
        explanation:
          "O IAM Identity Center é usado para gerenciamento de acesso centralizado, não para análise de permissões S3.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/features/access-analyzer/"],
  },
  {
    id: "CLF-C02-02-16",
    text: "Qual é o melhor recurso para um usuário encontrar informações e relatórios relacionados à conformidade sobre a AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Support",
        isCorrect: false,
        explanation:
          "AWS Support é para suporte técnico, não é a melhor fonte para relatórios de conformidade.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é para avaliação de segurança automatizada, não para relatórios de conformidade.",
      },
      {
        id: "C",
        text: "AWS Artifact",
        isCorrect: true,
        explanation:
          "AWS Artifact é o portal central para acessar relatórios de conformidade e acordos da AWS.",
      },
      {
        id: "D",
        text: "AWS Marketplace",
        isCorrect: false,
        explanation:
          "AWS Marketplace é uma loja digital, não uma fonte de relatórios de conformidade.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/artifact/"],
  },
  {
    id: "CLF-C02-02-17",
    text: "Qual serviço da AWS permite que as empresas implantem um aplicativo próximo aos usuários finais?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS AppSync",
        isCorrect: false,
        explanation:
          "AWS AppSync é um serviço GraphQL gerenciado, não é usado para distribuição de conteúdo.",
      },
      {
        id: "B",
        text: "AWS Auto Scaling",
        isCorrect: false,
        explanation:
          "AWS Auto Scaling é para ajustar capacidade, não para distribuição de conteúdo.",
      },
      {
        id: "C",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "Amazon Route 53 é um serviço DNS, embora ajude no roteamento, não é usado para distribuição de conteúdo.",
      },
      {
        id: "D",
        text: "Amazon CloudFront",
        isCorrect: true,
        explanation:
          "Amazon CloudFront é uma rede de entrega de conteúdo (CDN) que distribui conteúdo globalmente próximo aos usuários.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudfront/"],
  },
  {
    id: "CLF-C02-02-18",
    text: "Qual serviço ou recurso da AWS melhora o desempenho da rede enviando tráfego através da infraestrutura de rede mundial da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Transit Gateway",
        isCorrect: false,
        explanation:
          "AWS Transit Gateway é para conectividade entre VPCs e redes on-premises, não para otimização global de tráfego.",
      },
      {
        id: "B",
        text: "Amazon VPC",
        isCorrect: false,
        explanation:
          "Amazon VPC é para redes virtuais isoladas, não para otimização global de tráfego.",
      },
      {
        id: "C",
        text: "AWS Global Accelerator",
        isCorrect: true,
        explanation:
          "AWS Global Accelerator melhora o desempenho usando a rede global da AWS para otimizar o caminho do tráfego.",
      },
      {
        id: "D",
        text: "Route table",
        isCorrect: false,
        explanation:
          "Route table é para roteamento dentro de uma VPC, não para otimização global de tráfego.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/global-accelerator/"],
  },
  {
    id: "CLF-C02-02-19",
    text: "Qual serviço da AWS oferece armazenamento de objetos altamente durável?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é para armazenamento em bloco, não é otimizado para durabilidade de objetos.",
      },
      {
        id: "B",
        text: "Amazon FSx",
        isCorrect: false,
        explanation:
          "Amazon FSx é para sistemas de arquivos gerenciados, não para armazenamento de objetos.",
      },
      {
        id: "C",
        text: "Amazon S3",
        isCorrect: true,
        explanation:
          "Amazon S3 oferece armazenamento de objetos com durabilidade de 99,999999999% (11 noves).",
      },
      {
        id: "D",
        text: "Amazon Elastic File System (Amazon EFS)",
        isCorrect: false,
        explanation:
          "Amazon EFS é para sistemas de arquivos compartilhados, não para armazenamento de objetos.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "CLF-C02-02-20",
    text: "Qual responsabilidade pertence à AWS quando uma empresa hospeda seus bancos de dados em instâncias do Amazon EC2?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Backups de banco de dados",
        isCorrect: false,
        explanation:
          "Em instâncias EC2, os backups de banco de dados são responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Patches do sistema operacional",
        isCorrect: false,
        explanation:
          "Em instâncias EC2, os patches do sistema operacional são responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Patches de software de banco de dados",
        isCorrect: false,
        explanation:
          "Em instâncias EC2, os patches de software de banco de dados são responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "Instalações do sistema operacional",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela infraestrutura subjacente, incluindo a capacidade de instalar sistemas operacionais.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-02-21",
    text: "Quais das opções a seguir são vantagens de migrar para a Nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Não é mais necessário adivinhar qual capacidade será necessária.",
        isCorrect: true,
        explanation:
          "A AWS permite escalar recursos conforme necessário, eliminando a necessidade de prever capacidade.",
      },
      {
        id: "B",
        text: "A capacidade de ter controle total sobre a infraestrutura física.",
        isCorrect: false,
        explanation: "A AWS gerencia a infraestrutura física, não o cliente.",
      },
      {
        id: "C",
        text: "Não se preocupe mais com os controles de acesso dos usuários.",
        isCorrect: false,
        explanation:
          "O controle de acesso dos usuários ainda é responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "A capacidade de transferir a responsabilidade por toda a segurança para a AWS.",
        isCorrect: false,
        explanation:
          "A segurança é uma responsabilidade compartilhada entre AWS e cliente.",
      },
      {
        id: "E",
        text: "A capacidade de usar o modelo pré-pago.",
        isCorrect: true,
        explanation:
          "O modelo de pagamento conforme o uso é uma vantagem significativa da nuvem AWS.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-02-22",
    text: "Qual serviço da AWS é um serviço de armazenamento em nuvem híbrida que fornece aos usuários locais acesso a armazenamento em nuvem praticamente ilimitado?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é para armazenamento em bloco anexado a instâncias EC2, não para armazenamento híbrido.",
      },
      {
        id: "B",
        text: "Amazon S3 Glacier",
        isCorrect: false,
        explanation:
          "Amazon S3 Glacier é para arquivamento de longo prazo, não para armazenamento híbrido.",
      },
      {
        id: "C",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "AWS DataSync é para transferência de dados, não para armazenamento híbrido contínuo.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway",
        isCorrect: true,
        explanation:
          "AWS Storage Gateway fornece acesso local a armazenamento em nuvem ilimitado, ideal para cenários híbridos.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/"],
  },
  {
    id: "CLF-C02-02-23",
    text: "Uma empresa planeja migrar para a AWS e deseja criar estimativas de custos para seus casos de uso da AWS. Qual serviço ou ferramenta da AWS a empresa pode usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "AWS Cost Explorer é para análise de custos existentes, não para estimativas futuras.",
      },
      {
        id: "B",
        text: "AWS Pricing Calculator",
        isCorrect: true,
        explanation:
          "AWS Pricing Calculator permite estimar custos para diferentes cenários de uso da AWS.",
      },
      {
        id: "C",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é para monitoramento, não para estimativas de custos.",
      },
      {
        id: "D",
        text: "AWS Budgets",
        isCorrect: false,
        explanation:
          "AWS Budgets é para definir alertas de orçamento, não para estimativas de custos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://calculator.aws/"],
  },
];

export default questionsClfC0202;
