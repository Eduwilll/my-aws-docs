import type { Question } from "../lib/types/questions";

const questionsClfC0202: Question[] = [
  {
    id: "CLF-C02-02-01",
    text: "Um engenheiro de rede precisa construir uma arquitetura de nuvem híbrida conectando redes locais à Nuvem AWS usando o AWS Direct Connect. A empresa possui algumas VPCs em uma única região da AWS e espera aumentar o número de VPCs para centenas ao longo do tempo. Qual serviço ou recurso da AWS o engenheiro deve usar para simplificar e dimensionar essa conectividade à medida que o número de VPCs aumenta?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Secrets Manager",
        isCorrect: false,
        explanation:
          "O AWS Secrets Manager é usado para gerenciar segredos, não para conectividade de rede.",
      },
      {
        id: "B",
        text: "AWS Transit Gateway",
        isCorrect: true,
        explanation:
          "O AWS Transit Gateway é um hub de rede que simplifica a conectividade entre VPCs e redes on-premises, sendo ideal para cenários de escala com múltiplas VPCs.",
      },
      {
        id: "C",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço de DNS, não um serviço de conectividade de rede.",
      },
      {
        id: "D",
        text: "VPC endpoints",
        isCorrect: false,
        explanation:
          "VPC endpoints são usados para conectar VPCs a serviços AWS, não para conectividade híbrida.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/transit-gateway/"],
  },
  {
    id: "CLF-C02-02-02",
    text: "Uma empresa deseja estabelecer um cronograma para a rotação das credenciais dos usuários do banco de dados. Qual serviço da AWS oferecerá suporte a esse requisito com a MENOS sobrecarga operacional?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Secrets Manager",
        isCorrect: true,
        explanation:
          "O AWS Secrets Manager pode automatizar a rotação de credenciais de banco de dados com mínima sobrecarga operacional.",
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
          "O AWS Systems Manager é uma ferramenta de gerenciamento de operações, não é especializado em rotação de credenciais.",
      },
      {
        id: "D",
        text: "AWS Managed Services",
        isCorrect: false,
        explanation:
          "AWS Managed Services é um serviço mais amplo de gerenciamento de infraestrutura, não específico para rotação de credenciais.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/secrets-manager/"],
  },
  {
    id: "CLF-C02-02-03",
    text: "Qual serviço AWS é usado para fornecer criptografia para Amazon EBS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Certificate Manager",
        isCorrect: false,
        explanation:
          "O AWS Certificate Manager é usado para gerenciar certificados SSL/TLS, não para criptografia de volumes.",
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
          "O AWS KMS (Key Management Service) é usado para criar e gerenciar chaves de criptografia para volumes EBS e outros serviços AWS.",
      },
      {
        id: "D",
        text: "AWS Systems Manager",
        isCorrect: false,
        explanation:
          "O AWS Systems Manager é usado para gerenciamento de operações, não para criptografia.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/kms/"],
  },
  {
    id: "CLF-C02-02-04",
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
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/console/"],
  },
  {
    id: "CLF-C02-02-05",
    text: "Quais das opções a seguir são vantagens da Nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Superprovisão para garantir capacidade",
        isCorrect: false,
        explanation:
          "A superprovisão não é uma vantagem, pois leva a desperdício de recursos.",
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
          "A AWS oferece economia de escala devido ao seu grande volume de operações.",
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
    id: "CLF-C02-02-06",
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
          "Elasticidade refere-se à capacidade de aumentar ou diminuir recursos automaticamente.",
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
          "Agilidade refere-se à capacidade de implantar recursos rapidamente, não à resistência a falhas.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-02-07",
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
          "AWS CloudFormation permite criar e gerenciar infraestrutura como código, permitindo replicação consistente de ambientes.",
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
    id: "CLF-C02-02-08",
    text: "Qual característica da Nuvem AWS ajuda os usuários a eliminar a capacidade subutilizada da CPU?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elasticidade",
        isCorrect: true,
        explanation:
          "A elasticidade permite aumentar ou diminuir recursos automaticamente, eliminando capacidade subutilizada.",
      },
      {
        id: "B",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "Confiabilidade está relacionada à consistência do serviço, não à utilização de recursos.",
      },
      {
        id: "C",
        text: "Agilidade",
        isCorrect: false,
        explanation:
          "Agilidade está relacionada à velocidade de implantação, não à utilização de recursos.",
      },
      {
        id: "D",
        text: "Durabilidade",
        isCorrect: false,
        explanation:
          "Durabilidade está relacionada à preservação de dados, não à utilização de recursos.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-02-09",
    text: "Qual serviço da AWS ajuda a fornecer aplicativos altamente disponíveis com failover rápido para arquiteturas multirregionais e multi-AZ?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: false,
        explanation:
          "AWS WAF é um firewall de aplicativos web, não um serviço de failover.",
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
          "AWS Shield é um serviço de proteção contra DDoS, não um serviço de failover.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "AWS Direct Connect é um serviço de conectividade dedicada, não um serviço de failover.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/global-accelerator/"],
  },
  {
    id: "CLF-C02-02-10",
    text: "Uma empresa possui um conjunto de aplicativos de comércio eletrônico. Os aplicativos precisam ser capazes de enviar mensagens entre si. Qual serviço AWS atende a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Auto Scaling",
        isCorrect: false,
        explanation:
          "AWS Auto Scaling ajusta a capacidade de recursos, não para mensagens entre aplicativos.",
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
          "Amazon SQS é um serviço de filas de mensagens gerenciado que permite o desacoplamento e a comunicação entre aplicativos.",
      },
      {
        id: "D",
        text: "Elastic Load Balancing",
        isCorrect: false,
        explanation:
          "Elastic Load Balancing distribui tráfego, não é para mensagens entre aplicativos.",
      },
    ],
    category: "application_integration",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/sqs/"],
  },
  {
    id: "CLF-C02-02-11",
    text: "Quais são os benefícios do faturamento consolidado para serviços de nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Custo personalizado e criação de orçamento de uso",
        isCorrect: false,
        explanation:
          "Embora importante, isso não é um benefício específico do faturamento consolidado.",
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
          "O faturamento consolidado permite combinar o uso em todas as contas em uma única fatura.",
      },
      {
        id: "D",
        text: "Descontos por volume",
        isCorrect: true,
        explanation:
          "O faturamento consolidado permite que você se beneficie de preços com desconto por volume em todas as contas.",
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
    id: "CLF-C02-02-12",
    text: "Qual característica da Nuvem AWS ajuda os usuários a eliminar a capacidade subutilizada da CPU?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elasticidade",
        isCorrect: true,
        explanation:
          "A elasticidade permite aumentar ou diminuir recursos automaticamente, eliminando capacidade subutilizada.",
      },
      {
        id: "B",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "Confiabilidade está relacionada à consistência do serviço, não à utilização de recursos.",
      },
      {
        id: "C",
        text: "Agilidade",
        isCorrect: false,
        explanation:
          "Agilidade está relacionada à velocidade de implantação, não à utilização de recursos.",
      },
      {
        id: "D",
        text: "Durabilidade",
        isCorrect: false,
        explanation:
          "Durabilidade está relacionada à preservação de dados, não à utilização de recursos.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-02-13",
    text: "Qual é o melhor recurso para um usuário encontrar informações e relatórios relacionados à conformidade sobre a AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Support",
        isCorrect: false,
        explanation:
          "AWS Support é para suporte técnico, não especificamente para relatórios de conformidade.",
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
          "AWS Artifact é o recurso central para acessar relatórios de conformidade e acordos da AWS.",
      },
      {
        id: "D",
        text: "AWS Marketplace",
        isCorrect: false,
        explanation:
          "AWS Marketplace é uma loja digital, não um recurso para relatórios de conformidade.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/artifact/"],
  },
  {
    id: "CLF-C02-02-14",
    text: "Qual serviço da AWS permite que as empresas implantem um aplicativo próximo aos usuários finais?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS AppSync",
        isCorrect: false,
        explanation:
          "AWS AppSync é um serviço GraphQL gerenciado, não um serviço de distribuição de conteúdo.",
      },
      {
        id: "B",
        text: "AWS Auto Scaling",
        isCorrect: false,
        explanation:
          "AWS Auto Scaling ajusta a capacidade, não aproxima o conteúdo dos usuários.",
      },
      {
        id: "C",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "Amazon Route 53 é um serviço DNS, embora possa ajudar no roteamento, não é a principal solução para distribuição de conteúdo.",
      },
      {
        id: "D",
        text: "Amazon CloudFront",
        isCorrect: true,
        explanation:
          "Amazon CloudFront é uma rede de distribuição de conteúdo que entrega conteúdo aos usuários finais com baixa latência.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudfront/"],
  },
  {
    id: "CLF-C02-02-15",
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
          "AWS Global Accelerator melhora o desempenho usando a rede global da AWS para rotear o tráfego de forma otimizada.",
      },
      {
        id: "D",
        text: "Route table",
        isCorrect: false,
        explanation:
          "Route table é um componente de rede local da VPC, não um serviço de otimização global.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/global-accelerator/"],
  },
  {
    id: "CLF-C02-02-16",
    text: "Qual serviço AWS é usado para fornecer armazenamento de objetos altamente durável?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é um serviço de armazenamento em bloco, não de objetos.",
      },
      {
        id: "B",
        text: "Amazon FSx",
        isCorrect: false,
        explanation:
          "Amazon FSx é um serviço de armazenamento de arquivos gerenciado, não de objetos.",
      },
      {
        id: "C",
        text: "Amazon S3",
        isCorrect: true,
        explanation:
          "Amazon S3 é um serviço de armazenamento de objetos altamente durável, projetado para 99.999999999% de durabilidade.",
      },
      {
        id: "D",
        text: "Amazon Elastic File System (Amazon EFS)",
        isCorrect: false,
        explanation:
          "Amazon EFS é um serviço de armazenamento de arquivos, não de objetos.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "CLF-C02-02-17",
    text: "Qual responsabilidade pertence à AWS quando uma empresa hospeda seus bancos de dados em instâncias do Amazon EC2?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Backups de banco de dados",
        isCorrect: false,
        explanation:
          "Os backups de banco de dados em instâncias EC2 são responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Patches do sistema operacional",
        isCorrect: false,
        explanation:
          "Os patches do sistema operacional em instâncias EC2 são responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Patches de software de banco de dados",
        isCorrect: false,
        explanation:
          "Os patches de software de banco de dados em instâncias EC2 são responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "Instalações do sistema operacional",
        isCorrect: true,
        explanation:
          "A AWS é responsável por fornecer imagens base do sistema operacional através das AMIs.",
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
    id: "CLF-C02-02-18",
    text: "Quais das opções a seguir são vantagens de migrar para a Nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Não é mais necessário adivinhar qual capacidade será necessária.",
        isCorrect: true,
        explanation:
          "A AWS permite escalar recursos conforme necessário, eliminando a necessidade de prever a capacidade.",
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
          "O controle de acesso dos usuários continua sendo responsabilidade do cliente.",
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
          "O modelo pré-pago permite reduzir custos iniciais e pagar apenas pelo que usar.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-02-19",
    text: "Qual serviço da AWS é um serviço de armazenamento em nuvem híbrida que fornece aos usuários locais acesso a armazenamento em nuvem praticamente ilimitado?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é um serviço de armazenamento em bloco para instâncias EC2, não um serviço de armazenamento híbrido.",
      },
      {
        id: "B",
        text: "Amazon S3 Glacier",
        isCorrect: false,
        explanation:
          "Amazon S3 Glacier é um serviço de arquivamento, não um serviço de armazenamento híbrido.",
      },
      {
        id: "C",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "AWS DataSync é um serviço de transferência de dados, não um serviço de armazenamento híbrido.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway",
        isCorrect: true,
        explanation:
          "AWS Storage Gateway é um serviço de armazenamento híbrido que permite acesso local a armazenamento em nuvem ilimitado.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/"],
  },
  {
    id: "CLF-C02-02-20",
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
          "AWS Pricing Calculator permite estimar custos futuros baseados em casos de uso específicos.",
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
  {
    id: "CLF-C02-02-21",
    text: "Qual ferramenta um desenvolvedor deve usar para integrar recursos de serviços da AWS diretamente em um aplicativo?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço de computação serverless, não uma ferramenta de desenvolvimento.",
      },
      {
        id: "B",
        text: "AWS Software Development Kit (SDK)",
        isCorrect: true,
        explanation:
          "O AWS SDK fornece bibliotecas para integrar serviços AWS em aplicativos.",
      },
      {
        id: "C",
        text: "AWS Batch",
        isCorrect: false,
        explanation:
          "AWS Batch é para processamento em lote, não para integração de serviços.",
      },
      {
        id: "D",
        text: "AWS CodeDeploy",
        isCorrect: false,
        explanation:
          "AWS CodeDeploy é para automação de implantação, não para integração de serviços.",
      },
    ],
    category: "developer_tools",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/tools/"],
  },
  {
    id: "CLF-C02-02-22",
    text: "Qual das alternativas a seguir é um princípio de design recomendado do AWS Well-Architected Framework?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Reduza o tempo de inatividade fazendo alterações na infraestrutura com pouca frequência e em grandes incrementos.",
        isCorrect: false,
        explanation:
          "Fazer alterações grandes e infrequentes aumenta o risco e não é uma prática recomendada.",
      },
      {
        id: "B",
        text: "Aprenda a melhorar com as falhas operacionais.",
        isCorrect: true,
        explanation:
          "Aprender com falhas é um princípio fundamental do Well-Architected Framework para melhorar continuamente.",
      },
      {
        id: "C",
        text: "Invista tempo para configurar a infraestrutura manualmente.",
        isCorrect: false,
        explanation:
          "A configuração manual é propensa a erros e não é escalável.",
      },
      {
        id: "D",
        text: "Use design de aplicativo monolítico para centralização.",
        isCorrect: false,
        explanation:
          "Aplicativos monolíticos não são recomendados para arquiteturas modernas na nuvem.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-02-23",
    text: "Usar o AWS Identity and Access Management (IAM) para conceder acesso apenas aos recursos necessários para executar uma tarefa é um conceito conhecido como:",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Acesso simbólico.",
        isCorrect: false,
        explanation:
          "Acesso simbólico não é um conceito de segurança reconhecido na AWS.",
      },
      {
        id: "B",
        text: "Acesso restrito.",
        isCorrect: false,
        explanation:
          "Acesso restrito é um termo genérico, não o princípio específico usado na AWS.",
      },
      {
        id: "C",
        text: "Acesso com privilégios mínimos.",
        isCorrect: true,
        explanation:
          "O princípio do privilégio mínimo é uma prática recomendada de segurança que concede apenas os acessos necessários.",
      },
      {
        id: "D",
        text: "Acesso conforme necessário.",
        isCorrect: false,
        explanation:
          "Acesso conforme necessário é um termo genérico, não o princípio específico usado na AWS.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    ],
  },
  {
    id: "CLF-C02-02-24",
    text: "Qual serviço ou ferramenta da AWS pode ser usado para configurar um firewall para controlar o tráfego que entra e sai de uma sub-rede Amazon VPC?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: false,
        explanation:
          "AWS WAF é um firewall de aplicativo web, não para controle de tráfego de rede.",
      },
      {
        id: "B",
        text: "Network ACL",
        isCorrect: true,
        explanation:
          "Network ACLs são firewalls stateless que controlam o tráfego no nível da sub-rede.",
      },
      {
        id: "C",
        text: "AWS Firewall Manager",
        isCorrect: false,
        explanation:
          "AWS Firewall Manager é para gerenciamento centralizado de regras de firewall, não para controle direto de tráfego.",
      },
      {
        id: "D",
        text: "Security group",
        isCorrect: false,
        explanation:
          "Security groups operam no nível da instância, não no nível da sub-rede.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    ],
  },
  {
    id: "CLF-C02-02-25",
    text: "Qual serviço da AWS é usado para rastrear, registrar e auditar alterações de configuração feitas nos recursos da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "AWS Shield é um serviço de proteção contra DDoS, não para auditoria de configuração.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é para avaliação de segurança automatizada, não para auditoria de configuração.",
      },
      {
        id: "C",
        text: "AWS Config",
        isCorrect: true,
        explanation:
          "AWS Config fornece um inventário detalhado de recursos AWS e histórico de alterações de configuração.",
      },
      {
        id: "D",
        text: "AWS IAM",
        isCorrect: false,
        explanation:
          "AWS IAM é para gerenciamento de identidade e acesso, não para auditoria de configuração.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/config/"],
  },
  {
    id: "CLF-C02-02-29",
    text: "Uma empresa deseja operar um data warehouse para analisar dados sem gerenciar a infraestrutura do data warehouse. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um serviço de banco de dados relacional gerenciado, não um data warehouse.",
      },
      {
        id: "B",
        text: "Amazon Redshift Serverless",
        isCorrect: true,
        explanation:
          "Amazon Redshift Serverless permite executar análises sem gerenciar a infraestrutura do data warehouse.",
      },
      {
        id: "C",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço de computação serverless, não um data warehouse.",
      },
      {
        id: "D",
        text: "Amazon Aurora",
        isCorrect: false,
        explanation:
          "Amazon Aurora é um banco de dados relacional compatível com MySQL e PostgreSQL, não um data warehouse.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/redshift/serverless/"],
  },
  {
    id: "CLF-C02-02-30",
    text: "Como a computação em nuvem AWS ajuda as empresas a reduzir custos? (Escolha dois.)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "A AWS não cobra pelos dados enviados da Nuvem AWS para a Internet.",
        isCorrect: false,
        explanation:
          "A AWS cobra pelos dados enviados da Nuvem AWS para a Internet.",
      },
      {
        id: "B",
        text: "A AWS oferece descontos para instâncias do Amazon EC2 que permanecem inativas por mais de uma semana.",
        isCorrect: false,
        explanation: "A AWS não oferece descontos para instâncias inativas.",
      },
      {
        id: "C",
        text: "A AWS cobra os mesmos preços pelos serviços em todas as regiões da AWS.",
        isCorrect: false,
        explanation: "Os preços dos serviços AWS variam por região.",
      },
      {
        id: "D",
        text: "A AWS elimina muitos dos custos de construção e manutenção de data centers locais.",
        isCorrect: true,
        explanation:
          "A AWS elimina a necessidade de investir em infraestrutura física.",
      },
      {
        id: "E",
        text: "A AWS permite que a capacidade seja ajustada sob demanda.",
        isCorrect: true,
        explanation:
          "O ajuste de capacidade sob demanda ajuda a otimizar custos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/pricing/"],
  },
  {
    id: "CLF-C02-02-31",
    text: "Uma empresa deseja conceder aos usuários de uma conta da AWS acesso a recursos de outra conta da AWS. Os usuários atualmente não têm permissão para acessar os recursos. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Função do IAM",
        isCorrect: true,
        explanation:
          "As funções do IAM permitem acesso entre contas aos recursos AWS.",
      },
      {
        id: "B",
        text: "IAM tag",
        isCorrect: false,
        explanation:
          "IAM tags são usadas para marcar recursos, não para conceder acesso entre contas.",
      },
      {
        id: "C",
        text: "Grupo do IAM",
        isCorrect: false,
        explanation:
          "Grupos do IAM são usados para gerenciar permissões dentro de uma conta, não entre contas.",
      },
      {
        id: "D",
        text: "Analisador de acesso IAM",
        isCorrect: false,
        explanation:
          "O Analisador de acesso IAM é usado para analisar permissões, não para conceder acesso.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
    ],
  },
  {
    id: "CLF-C02-02-32",
    text: "Qual tarefa é de responsabilidade da AWS ao usar os serviços da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Gerenciamento de permissões de usuário IAM",
        isCorrect: false,
        explanation:
          "O gerenciamento de permissões IAM é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Criação de regras de grupo de segurança para acesso de saída",
        isCorrect: false,
        explanation:
          "A configuração de grupos de segurança é responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Manutenção de controles físicos e ambientais",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela segurança física e ambiental dos data centers.",
      },
      {
        id: "D",
        text: "Aplicação de patches do sistema operacional Amazon EC2",
        isCorrect: false,
        explanation:
          "A aplicação de patches em instâncias EC2 é responsabilidade do cliente.",
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
    id: "CLF-C02-02-33",
    text: "Uma empresa deseja automatizar a implantação de infraestrutura usando infraestrutura como código (IaC). A empresa deseja dimensionar as pilhas de produção para que possam ser implantadas em várias regiões da AWS. Qual serviço da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é para monitoramento, não para automação de infraestrutura.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "AWS Trusted Advisor fornece recomendações de otimização, não automação de infraestrutura.",
      },
      {
        id: "C",
        text: "AWS CloudFormation",
        isCorrect: true,
        explanation:
          "AWS CloudFormation permite automatizar a implantação de infraestrutura usando templates IaC.",
      },
      {
        id: "D",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "AWS Config é para auditoria de configuração, não para automação de infraestrutura.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudformation/"],
  },
  {
    id: "CLF-C02-02-34",
    text: "Uma empresa está executando uma carga de trabalho na Nuvem AWS. Qual prática recomendada da AWS garante a arquitetura MAIS econômica para a carga de trabalho?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Cache",
        isCorrect: true,
        explanation:
          "O uso de cache reduz a necessidade de computação repetitiva e acesso a dados, reduzindo custos.",
      },
      {
        id: "B",
        text: "Loose coupling",
        isCorrect: false,
        explanation:
          "Loose coupling é para melhorar a resiliência, não necessariamente para reduzir custos.",
      },
      {
        id: "C",
        text: "Redundância",
        isCorrect: false,
        explanation:
          "Redundância aumenta a disponibilidade mas também pode aumentar custos.",
      },
      {
        id: "D",
        text: "Redimensionamento",
        isCorrect: false,
        explanation:
          "Redimensionamento é para ajustar capacidade, mas não necessariamente a opção mais econômica.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-02-35",
    text: "Uma empresa está usando um serviço de terceiros para fazer backup de 10 TB de dados em uma biblioteca de fitas. O servidor de backup local está ficando sem espaço. A empresa deseja usar os serviços da AWS para backups sem alterar seus fluxos de trabalho de backup existentes. Qual serviço AWS a empresa deve usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Storage Gateway",
        isCorrect: true,
        explanation:
          "AWS Storage Gateway fornece uma interface compatível com fita virtual para backups na nuvem.",
      },
      {
        id: "B",
        text: "Amazon S3",
        isCorrect: false,
        explanation:
          "Amazon S3 sozinho não fornece compatibilidade direta com sistemas de backup em fita.",
      },
      {
        id: "C",
        text: "AWS Backup",
        isCorrect: false,
        explanation:
          "AWS Backup é para backups nativos da AWS, não para compatibilidade com sistemas de fita.",
      },
      {
        id: "D",
        text: "Amazon EFS",
        isCorrect: false,
        explanation:
          "Amazon EFS é um sistema de arquivos, não uma solução de backup compatível com fita.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/"],
  },
  {
    id: "CLF-C02-02-36",
    text: "Qual ferramenta da AWS oferece aos usuários a capacidade de planejar o uso do serviço, os custos do serviço e as reservas de instâncias, além de permitir que definam alertas personalizados quando seus custos ou uso excederem os limites estabelecidos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Relatórios de instâncias reservadas",
        isCorrect: false,
        explanation:
          "Relatórios de instâncias reservadas fornecem informações sobre reservas, mas não permitem definir alertas de custos.",
      },
      {
        id: "B",
        text: "AWS Budgets",
        isCorrect: true,
        explanation:
          "AWS Budgets permite planejar custos e definir alertas personalizados quando os custos ou uso excedem limites.",
      },
      {
        id: "C",
        text: "Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é para análise histórica de custos, não para definir alertas futuros.",
      },
      {
        id: "D",
        text: "AWS Cost and Usage Report",
        isCorrect: false,
        explanation:
          "AWS Cost and Usage Report fornece relatórios detalhados, mas não permite definir alertas.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
  },
  {
    id: "CLF-C02-02-37",
    text: "Quais tarefas são de responsabilidade do cliente, de acordo com o modelo de responsabilidade compartilhada da AWS? (Escolha dois.)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Configurar credenciais do IAM.",
        isCorrect: true,
        explanation:
          "A configuração de credenciais IAM é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Estabelecer a infra-estrutura global.",
        isCorrect: false,
        explanation: "A infraestrutura global é responsabilidade da AWS.",
      },
      {
        id: "C",
        text: "Execute a criptografia de dados do lado do cliente.",
        isCorrect: true,
        explanation:
          "A criptografia do lado do cliente é responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "Locais de borda seguros.",
        isCorrect: false,
        explanation:
          "A segurança física dos locais de borda é responsabilidade da AWS.",
      },
      {
        id: "E",
        text: "Corrigir instâncias de banco de dados do Amazon RDS.",
        isCorrect: false,
        explanation: "A aplicação de patches no RDS é responsabilidade da AWS.",
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
    id: "CLF-C02-02-38",
    text: "Um desenvolvedor foi contratado por uma grande empresa e precisa de credenciais da AWS. Quais são as melhores práticas de segurança que devem ser seguidas? (Escolha dois.)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Configure uma política de senha que garanta que a senha do desenvolvedor não possa ser alterada.",
        isCorrect: false,
        explanation:
          "Impedir a alteração de senha não é uma prática recomendada de segurança.",
      },
      {
        id: "B",
        text: "Certifique-se de que a política de senha da conta exija um comprimento mínimo.",
        isCorrect: true,
        explanation:
          "Políticas de senha fortes são uma prática recomendada de segurança.",
      },
      {
        id: "C",
        text: "Compartilhe as credenciais do usuário raiz da conta AWS com o desenvolvedor.",
        isCorrect: false,
        explanation: "Nunca compartilhe credenciais de usuário raiz.",
      },
      {
        id: "D",
        text: "Adicione o desenvolvedor ao grupo de administradores no AWS IAM.",
        isCorrect: false,
        explanation:
          "Conceder acesso de administrador completo viola o princípio do privilégio mínimo.",
      },
      {
        id: "E",
        text: "Conceda ao desenvolvedor acesso apenas aos recursos da AWS necessários para executar o trabalho.",
        isCorrect: true,
        explanation:
          "Seguir o princípio do privilégio mínimo é uma prática recomendada de segurança.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    ],
  },
  {
    id: "CLF-C02-02-39",
    text: "Uma empresa tem várias contas da AWS que incluem cargas de trabalho de computação que não podem ser interrompidas. A empresa deseja obter descontos de faturamento com base no uso dos serviços AWS pela empresa. Qual recurso ou opção de compra da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Marcação de recursos",
        isCorrect: false,
        explanation:
          "Marcação de recursos ajuda no rastreamento de custos, mas não fornece descontos.",
      },
      {
        id: "B",
        text: "Instâncias spot",
        isCorrect: false,
        explanation:
          "Instâncias spot podem ser interrompidas e não são adequadas para cargas de trabalho que não podem ser interrompidas.",
      },
      {
        id: "C",
        text: "Faturamento consolidado",
        isCorrect: true,
        explanation:
          "O faturamento consolidado combina o uso em várias contas para fornecer descontos por volume.",
      },
      {
        id: "D",
        text: "Preços pré-pagos",
        isCorrect: false,
        explanation:
          "Preços pré-pagos não se baseiam no uso real dos serviços.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/"],
  },
  {
    id: "CLF-C02-02-40",
    text: "Um usuário deseja permitir que aplicativos em execução em uma instância do Amazon EC2 façam chamadas para outros serviços da AWS. O acesso concedido deve ser seguro. Qual serviço ou recurso da AWS deve ser usado?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Chaves SSH do usuário IAM",
        isCorrect: false,
        explanation:
          "Chaves SSH são para acesso à instância, não para acesso a serviços AWS.",
      },
      {
        id: "B",
        text: "Security groups",
        isCorrect: false,
        explanation:
          "Security groups controlam tráfego de rede, não acesso a serviços AWS.",
      },
      {
        id: "C",
        text: "AWS Firewall Manager",
        isCorrect: false,
        explanation:
          "AWS Firewall Manager é para gerenciamento de firewall, não para acesso a serviços.",
      },
      {
        id: "D",
        text: "Funções do IAM",
        isCorrect: true,
        explanation:
          "Funções do IAM permitem que instâncias EC2 acessem serviços AWS de forma segura.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html",
    ],
  },
  {
    id: "CLF-C02-02-41",
    text: "Uma empresa deseja um servidor de arquivos Windows totalmente gerenciado para seus aplicativos baseados em Windows. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Serviço Amazon Elastic Kubernetes (Amazon EKS)",
        isCorrect: false,
        explanation:
          "Amazon EKS é um serviço de orquestração de contêineres, não um servidor de arquivos Windows.",
      },
      {
        id: "B",
        text: "Amazon EMR",
        isCorrect: false,
        explanation:
          "Amazon EMR é para processamento de big data, não um servidor de arquivos Windows.",
      },
      {
        id: "C",
        text: "Amazon Elastic Container Service (Amazon ECS)",
        isCorrect: false,
        explanation:
          "Amazon ECS é um serviço de orquestração de contêineres, não um servidor de arquivos Windows.",
      },
      {
        id: "D",
        text: "Amazon FSx",
        isCorrect: true,
        explanation:
          "Amazon FSx fornece servidores de arquivos Windows totalmente gerenciados.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/fsx/windows/"],
  },
  {
    id: "CLF-C02-02-42",
    text: "Uma empresa deseja migrar sua carga de trabalho local do NFS para a AWS. Qual tipo de AWS Storage Gateway a empresa deve usar para atender a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Gateway de volume",
        isCorrect: false,
        explanation:
          "Gateway de volume é para armazenamento em bloco, não para NFS.",
      },
      {
        id: "B",
        text: "Gateway de arquivos Amazon S3",
        isCorrect: true,
        explanation:
          "O Gateway de arquivos Amazon S3 suporta NFS e fornece acesso ao Amazon S3.",
      },
      {
        id: "C",
        text: "Gateway de fita",
        isCorrect: false,
        explanation:
          "Gateway de fita é para backup em fita virtual, não para NFS.",
      },
      {
        id: "D",
        text: "Gateway de arquivos Amazon FSx",
        isCorrect: false,
        explanation:
          "Gateway de arquivos Amazon FSx é para SMB/Windows, não para NFS.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/file/"],
  },
  {
    id: "CLF-C02-02-43",
    text: "Uma empresa precisa rastrear a atividade em suas contas da AWS e saber quando uma chamada de API é feita em seus recursos da AWS. Qual ferramenta ou serviço da AWS pode ser usado para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Inspetor da Amazon",
        isCorrect: false,
        explanation:
          "Amazon Inspector é para avaliação de segurança, não para rastreamento de atividades da API.",
      },
      {
        id: "B",
        text: "AWS IAM",
        isCorrect: false,
        explanation:
          "AWS IAM é para gerenciamento de identidade e acesso, não para rastreamento de atividades.",
      },
      {
        id: "C",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é principalmente para monitoramento de métricas, não para rastreamento de chamadas de API.",
      },
      {
        id: "D",
        text: "AWS CloudTrail",
        isCorrect: true,
        explanation:
          "AWS CloudTrail registra todas as chamadas de API feitas em sua conta AWS.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudtrail/"],
  },
  {
    id: "CLF-C02-02-44",
    text: "Uma empresa possui um aplicativo ininterrupto executado em instâncias do Amazon EC2. O aplicativo processa constantemente um backlog de arquivos em uma fila do Amazon Simple Queue Service (Amazon SQS). Espera-se que esse uso continue a crescer por anos. Qual é o modelo de compra de instância EC2 MAIS econômico para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias sob demanda",
        isCorrect: false,
        explanation:
          "Instâncias sob demanda são mais caras para uso contínuo de longo prazo.",
      },
      {
        id: "B",
        text: "Savings Plans",
        isCorrect: true,
        explanation:
          "Savings Plans oferece preços mais baixos para uso consistente de longo prazo.",
      },
      {
        id: "C",
        text: "Hosts Dedicados",
        isCorrect: false,
        explanation:
          "Hosts Dedicados são mais caros e são para requisitos específicos de licenciamento/conformidade.",
      },
      {
        id: "D",
        text: "Instâncias spot",
        isCorrect: false,
        explanation:
          "Instâncias spot podem ser interrompidas e não são adequadas para aplicativos ininterruptos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/savingsplans/"],
  },
  {
    id: "CLF-C02-02-45",
    text: "Uma empresa deseja que um serviço AWS forneça recomendações de produtos com base nos dados de seus clientes. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Rekognition",
        isCorrect: false,
        explanation:
          "Amazon Rekognition é para análise de imagens e vídeos, não para recomendações de produtos.",
      },
      {
        id: "B",
        text: "Amazon Personalize",
        isCorrect: true,
        explanation:
          "Amazon Personalize fornece recomendações personalizadas com base em dados dos clientes.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        isCorrect: false,
        explanation:
          "Amazon Comprehend é para processamento de linguagem natural, não para recomendações.",
      },
      {
        id: "D",
        text: "Amazon Polly",
        isCorrect: false,
        explanation:
          "Amazon Polly é para conversão de texto em fala, não para recomendações.",
      },
    ],
    category: "machine-learning",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/personalize/"],
  },
  {
    id: "CLF-C02-02-46",
    text: "Uma empresa está planejando sua migração para a Nuvem AWS. A empresa está identificando suas lacunas de capacidade usando as perspectivas do AWS Cloud Adoption Framework (AWS CAF). Qual fase da jornada de transformação da nuvem inclui essas atividades de identificação?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Escala",
        isCorrect: false,
        explanation:
          "A fase de escala é para expandir a adoção da nuvem, não para identificação inicial de lacunas.",
      },
      {
        id: "B",
        text: "Visualize",
        isCorrect: false,
        explanation:
          "A fase de visualização é para definir a visão de alto nível, não para identificação detalhada de lacunas.",
      },
      {
        id: "C",
        text: "Lançamento",
        isCorrect: false,
        explanation:
          "A fase de lançamento é para implementação, não para identificação de lacunas.",
      },
      {
        id: "D",
        text: "Alinhar",
        isCorrect: true,
        explanation:
          "A fase de alinhamento inclui a identificação de lacunas de capacidade usando o AWS CAF.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-adoption-framework/"],
  },
  {
    id: "CLF-C02-02-47",
    text: "Uma empresa de mídia social deseja proteger seu aplicativo Web contra explorações comuns da Web, como injeções de SQL e scripts entre sites. Qual serviço AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "AWS WAF protege aplicativos web contra explorações comuns como SQL injection e XSS.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é para avaliação de segurança automatizada, não para proteção de aplicativos web.",
      },
      {
        id: "C",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é para monitoramento, não para segurança de aplicativos web.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "Amazon GuardDuty é para detecção de ameaças, não para proteção de aplicativos web.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "CLF-C02-02-48",
    text: "Qual serviço AWS totalmente gerenciado auxilia na criação, teste e gerenciamento de imagens personalizadas do Amazon EC2?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Elastic Beanstalk",
        isCorrect: false,
        explanation:
          "AWS Elastic Beanstalk é para implantação de aplicativos, não para gerenciamento de imagens EC2.",
      },
      {
        id: "B",
        text: "Amazon Machine Image (AMI)",
        isCorrect: false,
        explanation:
          "AMI é o formato da imagem, não um serviço para gerenciar imagens.",
      },
      {
        id: "C",
        text: "Construtor de imagens EC2 (EC2 Image Builder)",
        isCorrect: true,
        explanation:
          "EC2 Image Builder automatiza a criação, manutenção e validação de imagens EC2.",
      },
      {
        id: "D",
        text: "Assistente de inicialização da AWS (AWS Launch Wizard)",
        isCorrect: false,
        explanation:
          "AWS Launch Wizard é para implantação de aplicativos, não para gerenciamento de imagens.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/image-builder/"],
  },
  {
    id: "CLF-C02-02-49",
    text: "Uma empresa deseja um processo automatizado para verificar continuamente suas instâncias do Amazon EC2 em busca de vulnerabilidades de software. Qual serviço da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "Amazon GuardDuty é para detecção de ameaças, não para verificação de vulnerabilidades.",
      },
      {
        id: "B",
        text: "Amazon Detective",
        isCorrect: false,
        explanation:
          "Amazon Detective é para investigação de segurança, não para verificação de vulnerabilidades.",
      },
      {
        id: "C",
        text: "Amazon Cognito",
        isCorrect: false,
        explanation:
          "Amazon Cognito é para autenticação de usuários, não para verificação de vulnerabilidades.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        isCorrect: true,
        explanation:
          "Amazon Inspector automatiza a avaliação de vulnerabilidades em instâncias EC2.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/inspector/"],
  },
  {
    id: "CLF-C02-02-50",
    text: "Uma empresa precisa realizar o processamento de dados uma vez por semana, o que normalmente leva cerca de 5 horas para ser concluído. Qual serviço AWS a empresa deve usar para esta carga de trabalho?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS CodeDeploy",
        isCorrect: false,
        explanation:
          "AWS CodeDeploy é para automação de implantação, não para processamento de dados.",
      },
      {
        id: "B",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda tem um limite de tempo de execução de 15 minutos, não adequado para 5 horas.",
      },
      {
        id: "C",
        text: "AWS Batch",
        isCorrect: true,
        explanation:
          "AWS Batch é ideal para processamento em lote de longa duração.",
      },
      {
        id: "D",
        text: "AWS Step Functions",
        isCorrect: false,
        explanation:
          "AWS Step Functions é para orquestração de fluxos de trabalho, não é a melhor opção para processamento em lote.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/batch/"],
  },
  {
    id: "CLF-C02-02-51",
    text: "Qual serviço ou recurso da AWS fornece informações de log do tráfego de entrada e saída em interfaces de rede em uma VPC?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "VPC Flow Logs",
        isCorrect: true,
        explanation:
          "VPC Flow Logs captura informações sobre o tráfego IP que flui para e a partir das interfaces de rede em sua VPC.",
      },
      {
        id: "B",
        text: "AWS Identity and Access Management (IAM)",
        isCorrect: false,
        explanation:
          "IAM é para gerenciamento de identidade e acesso, não para logs de tráfego de rede.",
      },
      {
        id: "C",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "CloudTrail registra atividades de API da AWS, não tráfego de rede.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch Logs",
        isCorrect: false,
        explanation:
          "CloudWatch Logs é um serviço geral de logs, mas não é específico para logs de tráfego de rede VPC.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
    ],
  },
  {
    id: "CLF-C02-02-52",
    text: "Uma empresa planeja implantar contêineres na AWS. A empresa deseja controle total dos recursos computacionais que hospedam os contêineres. Qual serviço da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Container Service (Amazon ECS)",
        isCorrect: false,
        explanation:
          "ECS pode ser usado com EC2 ou Fargate, não é por si só um serviço de computação.",
      },
      {
        id: "B",
        text: "Amazon EC2",
        isCorrect: true,
        explanation:
          "EC2 oferece controle total sobre os recursos computacionais e pode hospedar contêineres.",
      },
      {
        id: "C",
        text: "Serviço Amazon Elastic Kubernetes (Amazon EKS)",
        isCorrect: false,
        explanation:
          "EKS é um serviço gerenciado do Kubernetes, não oferece controle total dos recursos computacionais.",
      },
      {
        id: "D",
        text: "AWS Fargate",
        isCorrect: false,
        explanation:
          "Fargate é um serviço serverless, não oferece controle total dos recursos computacionais.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/containers/"],
  },
  {
    id: "CLF-C02-02-53",
    text: "Qual serviço ou recurso da AWS permite que os usuários criem novas contas da AWS, agrupem várias contas para organizar fluxos de trabalho e apliquem políticas a grupos de contas?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Organizations",
        isCorrect: true,
        explanation:
          "AWS Organizations permite gerenciar e governar várias contas AWS de forma centralizada.",
      },
      {
        id: "B",
        text: "AWS CloudFormation",
        isCorrect: false,
        explanation:
          "CloudFormation é para automação de infraestrutura, não para gerenciamento de contas.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "Trusted Advisor fornece recomendações de melhores práticas, não gerencia contas.",
      },
      {
        id: "D",
        text: "AWS Identity and Access Management (IAM)",
        isCorrect: false,
        explanation:
          "IAM gerencia acesso dentro de uma conta, não gerencia múltiplas contas.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/"],
  },
  {
    id: "CLF-C02-02-54",
    text: "Uma empresa deseja armazenar e recuperar arquivos no Amazon S3 para seus aplicativos locais existentes usando protocolos de sistema de arquivos padrão do setor. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "DataSync é para transferência de dados, não fornece acesso via protocolo de sistema de arquivos.",
      },
      {
        id: "B",
        text: "AWS Transfer Family",
        isCorrect: false,
        explanation:
          "Transfer Family é para transferência de arquivos via SFTP, não para acesso via sistema de arquivos.",
      },
      {
        id: "C",
        text: "AWS Snowball Edge",
        isCorrect: false,
        explanation:
          "Snowball Edge é para transferência de dados em massa, não para acesso contínuo via sistema de arquivos.",
      },
      {
        id: "D",
        text: "Gateway de arquivos Amazon S3",
        isCorrect: true,
        explanation:
          "O Gateway de arquivos S3 permite acessar o S3 usando protocolos de sistema de arquivos padrão.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/file/"],
  },
  {
    id: "CLF-C02-02-55",
    text: "Uma empresa quer bloquear ataques de injeção de SQL. Qual serviço ou recurso da AWS a empresa deve usar para atender a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Network ACLs",
        isCorrect: false,
        explanation:
          "Network ACLs operam na camada de rede, não podem detectar ou bloquear ataques de injeção SQL.",
      },
      {
        id: "B",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "AWS WAF pode detectar e bloquear ataques de injeção SQL em aplicações web.",
      },
      {
        id: "C",
        text: "AWS Certificate Manager (ACM)",
        isCorrect: false,
        explanation:
          "ACM é para gerenciamento de certificados SSL/TLS, não para proteção contra injeção SQL.",
      },
      {
        id: "D",
        text: "Security groups",
        isCorrect: false,
        explanation:
          "Security groups operam na camada de rede, não podem detectar ou bloquear ataques de injeção SQL.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "CLF-C02-02-56",
    text: "Uma empresa deseja uma ferramenta unificada para fornecer um método consistente de interação com os serviços da AWS. Qual serviço ou ferramenta da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Cloud9",
        isCorrect: false,
        explanation:
          "AWS Cloud9 é um IDE baseado em nuvem, não uma ferramenta de interação unificada com serviços AWS.",
      },
      {
        id: "B",
        text: "AWS Virtual Private Network (AWS VPN)",
        isCorrect: false,
        explanation:
          "AWS VPN é para conectividade segura, não para interação com serviços AWS.",
      },
      {
        id: "C",
        text: "AWS CLI",
        isCorrect: true,
        explanation:
          "AWS CLI (Command Line Interface) fornece uma ferramenta unificada para interagir com serviços AWS via linha de comando.",
      },
      {
        id: "D",
        text: "Amazon Elastic Container Service (Amazon ECS)",
        isCorrect: false,
        explanation:
          "Amazon ECS é um serviço de gerenciamento de contêineres, não uma ferramenta de interação.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cli/"],
  },
  {
    id: "CLF-C02-02-57",
    text: "Uma empresa precisa avaliar seu ambiente AWS e fornecer recomendações de melhores práticas em cinco categorias: custo, desempenho, limites de serviço, tolerância a falhas e segurança. Qual serviço AWS a empresa pode usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "AWS Shield é um serviço de proteção contra DDoS, não para recomendações de melhores práticas.",
      },
      {
        id: "B",
        text: "AWS WAF",
        isCorrect: false,
        explanation:
          "AWS WAF é para segurança de aplicações web, não para recomendações gerais.",
      },
      {
        id: "C",
        text: "AWS Service Catalog",
        isCorrect: false,
        explanation:
          "AWS Service Catalog é para gerenciamento de catálogo de serviços, não para recomendações.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        isCorrect: true,
        explanation:
          "AWS Trusted Advisor fornece recomendações em todas as cinco categorias mencionadas.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/",
    ],
  },
  {
    id: "CLF-C02-02-58",
    text: "Qual perspectiva do AWS Cloud Adoption Framework (AWS CAF) inclui recursos para gerenciamento de configuração e gerenciamento de patches?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Segurança",
        isCorrect: false,
        explanation:
          "A perspectiva de Segurança foca em riscos e conformidade, não em gerenciamento operacional.",
      },
      {
        id: "B",
        text: "Governança",
        isCorrect: false,
        explanation:
          "A perspectiva de Governança foca em controle e supervisão, não em operações técnicas.",
      },
      {
        id: "C",
        text: "Plataforma",
        isCorrect: false,
        explanation:
          "A perspectiva de Plataforma foca em design e arquitetura, não em operações.",
      },
      {
        id: "D",
        text: "Operações",
        isCorrect: true,
        explanation:
          "A perspectiva de Operações inclui gerenciamento de configuração e patches como parte das operações diárias.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-adoption-framework/"],
  },
  {
    id: "CLF-C02-02-59",
    text: "Uma empresa tem uma carga de trabalho de computação estável, previsível e ininterrupta. Quais opções de compra de instâncias do Amazon EC2 atendem a esses requisitos de maneira MAIS econômica? (Escolha dois.)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Hosts Dedicados",
        isCorrect: false,
        explanation:
          "Hosts Dedicados são mais caros e são para requisitos específicos de licenciamento/conformidade.",
      },
      {
        id: "B",
        text: "Instâncias Reservadas",
        isCorrect: true,
        explanation:
          "Instâncias Reservadas oferecem desconto significativo para uso previsível e de longo prazo.",
      },
      {
        id: "C",
        text: "Saving Plans",
        isCorrect: true,
        explanation:
          "Savings Plans oferecem preços mais baixos para uso consistente e de longo prazo.",
      },
      {
        id: "D",
        text: "Instâncias spot",
        isCorrect: false,
        explanation:
          "Instâncias spot podem ser interrompidas e não são adequadas para cargas de trabalho ininterruptas.",
      },
      {
        id: "E",
        text: "Instâncias sob demanda",
        isCorrect: false,
        explanation:
          "Instâncias sob demanda são mais caras para uso previsível e de longo prazo.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/pricing/"],
  },
  {
    id: "CLF-C02-02-60",
    text: "Qual opção é uma responsabilidade compartilhada entre a AWS e seus clientes no modelo de responsabilidade compartilhada da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Criptografia do lado do servidor do sistema de arquivos do aplicativo",
        isCorrect: false,
        explanation:
          "A criptografia do sistema de arquivos do aplicativo é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Configuração de sistemas operacionais de instâncias do Amazon EC2",
        isCorrect: false,
        explanation:
          "A configuração do sistema operacional é responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Segurança da infraestrutura física",
        isCorrect: false,
        explanation: "A segurança física é responsabilidade exclusiva da AWS.",
      },
      {
        id: "D",
        text: "Gerenciamento de patches",
        isCorrect: true,
        explanation:
          "O gerenciamento de patches é compartilhado: AWS gerencia patches da infraestrutura, cliente gerencia patches do SO e aplicativos.",
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
    id: "CLF-C02-02-61",
    text: "Uma empresa deseja operar um data warehouse para analisar dados sem gerenciar a infraestrutura do data warehouse. Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um serviço de banco de dados relacional gerenciado, não um data warehouse.",
      },
      {
        id: "B",
        text: "Amazon Redshift Serverless",
        isCorrect: true,
        explanation:
          "Amazon Redshift Serverless permite executar análises sem gerenciar a infraestrutura do data warehouse.",
      },
      {
        id: "C",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço de computação serverless, não um data warehouse.",
      },
      {
        id: "D",
        text: "Amazon Aurora",
        isCorrect: false,
        explanation:
          "Amazon Aurora é um banco de dados relacional compatível com MySQL e PostgreSQL, não um data warehouse.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/redshift/serverless/"],
  },
  {
    id: "CLF-C02-02-62",
    text: "Qual tarefa é de responsabilidade da AWS, de acordo com o modelo de responsabilidade compartilhada da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Habilite a criptografia do lado do cliente para objetos armazenados no Amazon S3",
        isCorrect: false,
        explanation:
          "A criptografia do lado do cliente é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Aplicar atualizações ao hipervisor Nitro",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela manutenção e atualização do hipervisor.",
      },
      {
        id: "C",
        text: "Aplique patch no sistema operacional convidado em uma instância do Amazon EC2",
        isCorrect: false,
        explanation:
          "O patch do sistema operacional convidado é responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "Configurar políticas de segurança do IAM para cumprir o princípio de privilégio mínimo",
        isCorrect: false,
        explanation:
          "A configuração de políticas IAM é responsabilidade do cliente.",
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
    id: "CLF-C02-02-63",
    text: "Qual opção é um recurso de perspectiva de negócios do AWS Cloud Adoption Framework (AWS CAF)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Evolução da cultura",
        isCorrect: false,
        explanation:
          "A evolução da cultura é parte da perspectiva de Pessoas, não de Negócios.",
      },
      {
        id: "B",
        text: "Gestão de eventos",
        isCorrect: false,
        explanation:
          "A gestão de eventos é parte da perspectiva de Operações, não de Negócios.",
      },
      {
        id: "C",
        text: "Monetização de dados",
        isCorrect: true,
        explanation:
          "A monetização de dados é um recurso da perspectiva de Negócios do AWS CAF.",
      },
      {
        id: "D",
        text: "Arquitetura da plataforma",
        isCorrect: false,
        explanation:
          "A arquitetura da plataforma é parte da perspectiva de Plataforma, não de Negócios.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-adoption-framework/"],
  },
  {
    id: "CLF-C02-02-64",
    text: "Uma empresa está avaliando seu plano do AWS Business Support para determinar se o plano ainda atende às necessidades da empresa. A empresa está considerando mudar para o AWS Enterprise Support. Qual benefício adicional a empresa receberá com o AWS Enterprise Support?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Uma revisão consultiva e orientação de arquitetura para os aplicativos da empresa",
        isCorrect: false,
        explanation:
          "Revisões de arquitetura estão disponíveis em ambos os planos Business e Enterprise.",
      },
      {
        id: "B",
        text: "Um conjunto completo de verificações do AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "Verificações completas do Trusted Advisor estão disponíveis em ambos os planos.",
      },
      {
        id: "C",
        text: "Um gerente técnico de contas (TAM) designado para auxiliar no monitoramento e otimização",
        isCorrect: true,
        explanation:
          "Um TAM designado é um benefício exclusivo do plano Enterprise Support.",
      },
      {
        id: "D",
        text: "Acesso por telefone, e-mail e chat para engenheiros de suporte na nuvem 24 horas por dia, 7 dias por semana",
        isCorrect: false,
        explanation:
          "Suporte 24/7 está disponível em ambos os planos Business e Enterprise.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/premiumsupport/plans/"],
  },
  {
    id: "CLF-C02-02-65",
    text: "Qual modelo de precificação interromperá uma instância do Amazon EC2 em execução se a capacidade ficar temporariamente indisponível?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias spot",
        isCorrect: true,
        explanation:
          "Instâncias spot podem ser interrompidas quando a AWS precisa recuperar a capacidade.",
      },
      {
        id: "B",
        text: "Instâncias sob demanda",
        isCorrect: false,
        explanation:
          "Instâncias sob demanda não são interrompidas devido à capacidade indisponível.",
      },
      {
        id: "C",
        text: "Instâncias reservadas padrão",
        isCorrect: false,
        explanation:
          "Instâncias reservadas padrão garantem capacidade e não são interrompidas.",
      },
      {
        id: "D",
        text: "Instâncias reservadas conversíveis",
        isCorrect: false,
        explanation:
          "Instâncias reservadas conversíveis garantem capacidade e não são interrompidas.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/spot/"],
  },
  {
    id: "CLF-C02-02-66",
    text: "Quais opções são recursos de perspectiva de segurança do AWS Cloud Adoption Framework (AWS CAF)? (Escolha dois.)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Proteção de infraestrutura",
        isCorrect: true,
        explanation:
          "A proteção de infraestrutura é um componente chave da perspectiva de segurança do AWS CAF.",
      },
      {
        id: "B",
        text: "Observabilidade",
        isCorrect: false,
        explanation:
          "Observabilidade é mais relacionada à perspectiva de operações do AWS CAF.",
      },
      {
        id: "C",
        text: "Disponibilidade e continuidade",
        isCorrect: false,
        explanation:
          "Disponibilidade e continuidade são mais relacionadas à perspectiva de operações do AWS CAF.",
      },
      {
        id: "D",
        text: "Resposta a incidentes",
        isCorrect: true,
        explanation:
          "A resposta a incidentes é um componente essencial da perspectiva de segurança do AWS CAF.",
      },
      {
        id: "E",
        text: "Gerenciamento de incidentes e problemas",
        isCorrect: false,
        explanation:
          "Gerenciamento de incidentes e problemas é mais relacionado à perspectiva de operações do AWS CAF.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-adoption-framework/"],
  },
  {
    id: "CLF-C02-02-67",
    text: "Uma empresa deseja executar sua carga de trabalho em instâncias do Amazon EC2 por mais de um ano. Essa carga de trabalho será executada continuamente. Qual opção oferece uma tarifa horária com desconto em comparação à tarifa horária de instâncias sob demanda?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Hosts Dedicados",
        isCorrect: false,
        explanation:
          "Hosts Dedicados são geralmente mais caros que instâncias sob demanda.",
      },
      {
        id: "B",
        text: "Processador AWS Graviton",
        isCorrect: false,
        explanation:
          "AWS Graviton é um tipo de processador, não um modelo de preços.",
      },
      {
        id: "C",
        text: "Planos de economia de instância EC2 (Savings Plans)",
        isCorrect: true,
        explanation:
          "Savings Plans oferecem descontos significativos para uso contínuo de longo prazo.",
      },
      {
        id: "D",
        text: "Instâncias do Amazon EC2 Auto Scaling",
        isCorrect: false,
        explanation:
          "Auto Scaling é para gerenciamento de capacidade, não um modelo de preços.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/savingsplans/"],
  },
  {
    id: "CLF-C02-02-68",
    text: "Qual característica da Nuvem AWS ajuda os usuários a eliminar a capacidade subutilizada da CPU?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elasticidade",
        isCorrect: true,
        explanation:
          "A elasticidade permite aumentar ou diminuir recursos automaticamente, eliminando capacidade subutilizada.",
      },
      {
        id: "B",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "Confiabilidade está relacionada à consistência do serviço, não à utilização de recursos.",
      },
      {
        id: "C",
        text: "Agilidade",
        isCorrect: false,
        explanation:
          "Agilidade está relacionada à velocidade de implantação, não à utilização de recursos.",
      },
      {
        id: "D",
        text: "Durabilidade",
        isCorrect: false,
        explanation:
          "Durabilidade está relacionada à preservação de dados, não à utilização de recursos.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
];

export default questionsClfC0202;
