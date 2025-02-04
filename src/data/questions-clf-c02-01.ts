// src/data/questions-clf-c02-01.ts
import type { Question } from "../lib/types/questions";

export const questionsClfC0201: Question[] = [
  {
    id: "CLF-C02-01-01",
    text: "Uma empresa planeja usar um dispositivo Amazon Snowball Edge para transferir arquivos para a Nuvem AWS. Quais atividades relacionadas a um dispositivo Snowball Edge estão disponíveis gratuitamente para a empresa?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Uso do dispositivo Snowball Edge por um período de 10 dias",
        isCorrect: true,
        explanation:
          "A AWS oferece 10 dias gratuitos de uso do dispositivo Snowball Edge. Após esse período, são cobradas taxas diárias adicionais.",
      },
      {
        id: "B",
        text: "A transferência de dados do Amazon S3 para o dispositivo Snowball Edge",
        isCorrect: false,
        explanation:
          "A transferência de dados do S3 para o Snowball Edge é cobrada.",
      },
      {
        id: "C",
        text: "A transferência de dados do dispositivo Snowball Edge para o Amazon S3",
        isCorrect: false,
        explanation:
          "A transferência de dados do Snowball Edge para o S3 é cobrada.",
      },
      {
        id: "D",
        text: "Uso diário do dispositivo Snowball Edge após 10 dias",
        isCorrect: false,
        explanation:
          "Após os 10 dias gratuitos iniciais, são cobradas taxas diárias pelo uso do dispositivo.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/snowball/pricing/"],
  },
  {
    id: "CLF-C02-01-02",
    text: "Uma empresa implantou aplicativos em instâncias do Amazon EC2. A empresa precisa avaliar as vulnerabilidades das aplicações e identificar implantações de infraestrutura que não atendam às melhores práticas. Qual serviço AWS a empresa pode usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O Trusted Advisor fornece recomendações de melhores práticas, mas não avalia vulnerabilidades de aplicações.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        isCorrect: true,
        explanation:
          "O Amazon Inspector é um serviço automatizado de avaliação de segurança que ajuda a melhorar a segurança e a conformidade dos aplicativos implantados na AWS.",
      },
      {
        id: "C",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config avalia a configuração dos recursos AWS, mas não avalia vulnerabilidades de aplicações.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "O GuardDuty é um serviço de detecção de ameaças, não um serviço de avaliação de vulnerabilidades.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/inspector/"],
  },
  {
    id: "CLF-C02-01-03",
    text: "Uma empresa possui um grupo centralizado de usuários com grandes requisitos de armazenamento de arquivos que excederam o espaço disponível no local. A empresa deseja ampliar seus recursos de armazenamento de arquivos para esse grupo, mantendo ao mesmo tempo o benefício de desempenho do compartilhamento local de conteúdo. Qual é a solução AWS MAIS eficiente operacionalmente para este cenário?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Crie um bucket do Amazon S3 para cada usuário. Monte cada bucket usando um utilitário de montagem do sistema de arquivos S3.",
        isCorrect: false,
        explanation:
          "Montar buckets S3 como sistemas de arquivos não é uma solução eficiente para compartilhamento de arquivos com alto desempenho.",
      },
      {
        id: "B",
        text: "Configurar e implantar um gateway de arquivos do AWS Storage Gateway. Conecte a estação de trabalho de cada usuário ao gateway de arquivos.",
        isCorrect: true,
        explanation:
          "O AWS Storage Gateway com File Gateway é a solução mais eficiente para estender o armazenamento local para a nuvem mantendo o desempenho local.",
      },
      {
        id: "C",
        text: "Mova o ambiente de trabalho de cada usuário para o Amazon WorkSpaces. Configure uma conta do Amazon WorkDocs para cada usuário.",
        isCorrect: false,
        explanation:
          "Mover para WorkSpaces é uma solução excessiva quando o requisito é apenas armazenamento de arquivos.",
      },
      {
        id: "D",
        text: "Implante uma instância do Amazon EC2 e anexe um volume de IOPS provisionadas do Amazon Elastic Block Store (Amazon EBS). Compartilhe o volume EBS diretamente com os usuários.",
        isCorrect: false,
        explanation:
          "Volumes EBS não podem ser compartilhados diretamente com múltiplos usuários desta forma.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/storagegateway/"],
  },
  {
    id: "CLF-C02-01-04",
    text: "De acordo com as práticas recomendadas de segurança, como uma instância do Amazon EC2 deve receber acesso a um bucket do Amazon S3?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Codifique a chave secreta e a chave de acesso de um usuário IAM diretamente no aplicativo e faça upload do arquivo.",
        isCorrect: false,
        explanation:
          "Nunca é uma boa prática codificar credenciais diretamente no código.",
      },
      {
        id: "B",
        text: "Armazene a chave secreta e a chave de acesso do usuário IAM em um arquivo de texto na instância EC2, leia as chaves e faça upload do arquivo.",
        isCorrect: false,
        explanation: "Armazenar credenciais em arquivos de texto não é seguro.",
      },
      {
        id: "C",
        text: "Faça com que a instância do EC2 assuma uma função(role) para obter os privilégios para fazer upload do arquivo.",
        isCorrect: true,
        explanation:
          "Usar funções IAM é a prática recomendada para conceder permissões a instâncias EC2.",
      },
      {
        id: "D",
        text: "Modifique a política do bucket S3 para que qualquer serviço possa fazer upload para ela a qualquer momento.",
        isCorrect: false,
        explanation:
          "Permitir acesso irrestrito a um bucket S3 é uma prática insegura.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/iam/"],
  },
  {
    id: "CLF-C02-01-05",
    text: "Qual opção é de responsabilidade do cliente ao usar o Amazon DynamoDB no modelo de responsabilidade compartilhada da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Segurança física do DynamoDB",
        isCorrect: false,
        explanation: "A segurança física é responsabilidade da AWS.",
      },
      {
        id: "B",
        text: "Aplicação de patch do DynamoDB",
        isCorrect: false,
        explanation: "A aplicação de patches é gerenciada pela AWS.",
      },
      {
        id: "C",
        text: "Acesso às tabelas do DynamoDB",
        isCorrect: true,
        explanation:
          "O controle de acesso aos recursos é responsabilidade do cliente.",
      },
      {
        id: "D",
        text: "Criptografia de dados em repouso no DynamoDB",
        isCorrect: false,
        explanation: "A criptografia em repouso é gerenciada pela AWS.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-01-06",
    text: "Qual opção é uma perspectiva que inclui recursos básicos do AWS Cloud Adoption Framework (AWS CAF)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Sustentabilidade",
        isCorrect: false,
        explanation:
          "Sustentabilidade não é uma perspectiva básica do AWS CAF.",
      },
      {
        id: "B",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "Eficiência de desempenho não é uma perspectiva básica do AWS CAF.",
      },
      {
        id: "C",
        text: "Governança",
        isCorrect: true,
        explanation:
          "Governança é uma das perspectivas básicas do AWS Cloud Adoption Framework.",
      },
      {
        id: "D",
        text: "Confiabilidade",
        isCorrect: false,
        explanation: "Confiabilidade não é uma perspectiva básica do AWS CAF.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-adoption-framework/"],
  },
  {
    id: "CLF-C02-01-07",
    text: "Uma empresa está executando e gerenciando seu próprio ambiente Docker em instâncias do Amazon EC2. A empresa deseja uma alternativa para ajudar a gerenciar o tamanho do cluster, a programação e a manutenção do ambiente. Qual serviço da AWS atende a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço serverless e não é específico para gerenciamento de contêineres.",
      },
      {
        id: "B",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um serviço de banco de dados relacional e não está relacionado ao gerenciamento de contêineres.",
      },
      {
        id: "C",
        text: "AWS Fargate",
        isCorrect: true,
        explanation:
          "AWS Fargate é um mecanismo de computação serverless para contêineres que elimina a necessidade de gerenciar servidores ou clusters.",
      },
      {
        id: "D",
        text: "Amazon Athena",
        isCorrect: false,
        explanation:
          "Amazon Athena é um serviço de consulta interativa e não está relacionado ao gerenciamento de contêineres.",
      },
    ],
    category: "containers",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/fargate/"],
  },
  {
    id: "CLF-C02-01-08",
    text: "Uma empresa deseja executar um banco de dados NoSQL em instâncias do Amazon EC2. Qual tarefa é de responsabilidade da AWS neste cenário?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Atualizar o sistema operacional convidado das instâncias EC2.",
        isCorrect: false,
        explanation:
          "A atualização do sistema operacional convidado é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Manter a alta disponibilidade na camada de banco de dados.",
        isCorrect: false,
        explanation:
          "A configuração e manutenção da alta disponibilidade do banco de dados é responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Corrigir a infraestrutura física que hospeda as instâncias do EC2.",
        isCorrect: true,
        explanation:
          "A manutenção da infraestrutura física é responsabilidade da AWS.",
      },
      {
        id: "D",
        text: "Configurar o firewall do grupo de segurança.",
        isCorrect: false,
        explanation:
          "A configuração de grupos de segurança é responsabilidade do cliente.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-01-09",
    text: "Quais serviços ou ferramentas da AWS podem identificar oportunidades de redimensionamento para instâncias do Amazon EC2?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        isCorrect: true,
        explanation:
          "O AWS Cost Explorer pode ajudar a identificar instâncias EC2 mal dimensionadas através de análise de custos e utilização.",
      },
      {
        id: "B",
        text: "AWS Billing Conductor",
        isCorrect: false,
        explanation:
          "O AWS Billing Conductor é usado para gerenciamento de faturamento e não para análise de dimensionamento.",
      },
      {
        id: "C",
        text: "Amazon CodeGuru",
        isCorrect: false,
        explanation:
          "O Amazon CodeGuru é usado para revisão de código e análise de performance de aplicações, não para dimensionamento de instâncias.",
      },
      {
        id: "D",
        text: "Amazon SageMaker",
        isCorrect: false,
        explanation:
          "O Amazon SageMaker é um serviço de machine learning e não está relacionado ao dimensionamento de instâncias.",
      },
      {
        id: "E",
        text: "AWS Compute Optimizer",
        isCorrect: true,
        explanation:
          "O AWS Compute Optimizer usa machine learning para analisar métricas de utilização e fazer recomendações de dimensionamento.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/compute-optimizer/"],
  },
  {
    id: "CLF-C02-01-10",
    text: "Quais das opções a seguir são benefícios de usar o AWS Trusted Advisor?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Fornecimento de orquestração de contêineres de alto desempenho.",
        isCorrect: false,
        explanation:
          "O Trusted Advisor não fornece orquestração de contêineres.",
      },
      {
        id: "B",
        text: "Criação e rotação de chaves de criptografia.",
        isCorrect: false,
        explanation: "O Trusted Advisor não gerencia chaves de criptografia.",
      },
      {
        id: "C",
        text: "Detectando recursos subutilizados para economizar custos.",
        isCorrect: true,
        explanation:
          "O Trusted Advisor ajuda a identificar recursos subutilizados e fornece recomendações de otimização de custos.",
      },
      {
        id: "D",
        text: "Melhorar a segurança monitorando proativamente o ambiente AWS.",
        isCorrect: true,
        explanation:
          "O Trusted Advisor fornece recomendações de segurança e monitora proativamente o ambiente AWS.",
      },
      {
        id: "E",
        text: "Implementação de marcação forçada em recursos da AWS",
        isCorrect: false,
        explanation: "O Trusted Advisor não força a implementação de tags.",
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
    id: "CLF-C02-01-11",
    text: "Qual das opções a seguir é uma vantagem que os usuários experimentam ao migrar cargas de trabalho locais para a Nuvem AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Eliminação de despesas com operação e manutenção de data centers.",
        isCorrect: true,
        explanation:
          "A migração para a AWS elimina a necessidade de manter e operar data centers próprios.",
      },
      {
        id: "B",
        text: "Descontos de preço idênticos aos descontos de fornecedores de hardware.",
        isCorrect: false,
        explanation:
          "Os modelos de preços da AWS são diferentes dos fornecedores de hardware tradicionais.",
      },
      {
        id: "C",
        text: "Distribuição de todos os controles operacionais para AWS",
        isCorrect: false,
        explanation:
          "O cliente ainda mantém controle sobre muitos aspectos operacionais no modelo de responsabilidade compartilhada.",
      },
      {
        id: "D",
        text: "Eliminação de despesas operacionais.",
        isCorrect: false,
        explanation:
          "A migração para a nuvem não elimina todas as despesas operacionais, apenas as transforma.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloud-migration/"],
  },
  {
    id: "CLF-C02-01-12",
    text: "Uma empresa deseja gerenciar serviços de TI implantados e governar sua infraestrutura como modelos de código (IaC). Qual serviço da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Resource Explorer",
        isCorrect: false,
        explanation:
          "O AWS Resource Explorer é usado para pesquisar recursos, não para gerenciar infraestrutura como código.",
      },
      {
        id: "B",
        text: "AWS Service Catalog",
        isCorrect: true,
        explanation:
          "O AWS Service Catalog permite gerenciar catálogos de serviços de TI aprovados para uso na AWS e governar a infraestrutura como código.",
      },
      {
        id: "C",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations é usado para gerenciar várias contas AWS, não para infraestrutura como código.",
      },
      {
        id: "D",
        text: "AWS Systems Manager",
        isCorrect: false,
        explanation:
          "O AWS Systems Manager é usado para gerenciamento de operações, não primariamente para infraestrutura como código.",
      },
    ],
    category: "management",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/servicecatalog/"],
  },
  {
    id: "CLF-C02-01-13",
    text: "Qual serviço ou ferramenta da AWS ajuda os usuários a visualizar, compreender e gerenciar gastos e uso ao longo do tempo?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations é usado para gerenciar várias contas AWS, não para análise de custos.",
      },
      {
        id: "B",
        text: "AWS Pricing Calculator",
        isCorrect: false,
        explanation:
          "O AWS Pricing Calculator é usado para estimar custos futuros, não para analisar gastos atuais.",
      },
      {
        id: "C",
        text: "AWS Cost Explorer",
        isCorrect: true,
        explanation:
          "O AWS Cost Explorer fornece visualização e análise detalhada dos custos e uso da AWS ao longo do tempo.",
      },
      {
        id: "D",
        text: "AWS Service Catalog",
        isCorrect: false,
        explanation:
          "O AWS Service Catalog é usado para gerenciar catálogos de serviços, não para análise de custos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
    ],
  },
  {
    id: "CLF-C02-01-14",
    text: "Uma empresa está usando uma plataforma central de dados para gerenciar vários tipos de dados de seus clientes. A empresa deseja usar os serviços da AWS para descobrir, transformar e visualizar os dados. Qual combinação de serviços da AWS a empresa deve usar para atender a esses requisitos?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "AWS Glue",
        isCorrect: true,
        explanation:
          "O AWS Glue é um serviço de ETL totalmente gerenciado que facilita a descoberta e transformação de dados.",
      },
      {
        id: "B",
        text: "Amazon Elastic File System (Amazon EFS)",
        isCorrect: false,
        explanation:
          "O Amazon EFS é um serviço de armazenamento de arquivos, não de análise de dados.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        isCorrect: false,
        explanation:
          "O Amazon Redshift é um data warehouse, não uma ferramenta de descoberta ou visualização de dados.",
      },
      {
        id: "D",
        text: "Amazon QuickSight",
        isCorrect: true,
        explanation:
          "O Amazon QuickSight é um serviço de visualização de dados que permite criar dashboards e análises interativas.",
      },
      {
        id: "E",
        text: "Amazon Quantum Ledger Database (Amazon QLDB)",
        isCorrect: false,
        explanation:
          "O Amazon QLDB é um banco de dados de registro imutável, não uma ferramenta de análise ou visualização.",
      },
    ],
    category: "analytics",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/glue/",
      "https://aws.amazon.com/quicksight/",
    ],
  },
  {
    id: "CLF-C02-01-15",
    text: "Uma empresa global deseja migrar seus aplicativos de terceiros para a Nuvem AWS. A empresa deseja a ajuda de uma equipe global de especialistas para concluir a migração de forma mais rápida e confiável, de acordo com as melhores práticas internas da AWS. Qual serviço ou recurso da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Support",
        isCorrect: false,
        explanation:
          "O AWS Support fornece suporte técnico, mas não é especializado em serviços de migração.",
      },
      {
        id: "B",
        text: "AWS Professional Services",
        isCorrect: true,
        explanation:
          "O AWS Professional Services oferece uma equipe global de especialistas que ajudam os clientes a alcançar resultados específicos relacionados à adoção da AWS.",
      },
      {
        id: "C",
        text: "AWS Launch Wizard",
        isCorrect: false,
        explanation:
          "O AWS Launch Wizard é uma ferramenta de implantação, não um serviço de consultoria.",
      },
      {
        id: "D",
        text: "AWS Managed Services (AMS)",
        isCorrect: false,
        explanation:
          "O AWS Managed Services fornece operações contínuas, não serviços de migração específicos.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/professional-services/"],
  },
  {
    id: "CLF-C02-01-16",
    text: "Uma plataforma de e-learning precisa executar um aplicativo durante 2 meses por ano. O aplicativo será implantado em instâncias do Amazon EC2. Qualquer tempo de inatividade do aplicativo durante esses 2 meses deve ser evitado. Qual opção de compra do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias Reservadas",
        isCorrect: false,
        explanation:
          "Instâncias Reservadas são mais econômicas para uso contínuo por 1 ou 3 anos, não para uso sazonal.",
      },
      {
        id: "B",
        text: "Hosts Dedicados",
        isCorrect: false,
        explanation:
          "Hosts Dedicados são mais caros e são usados quando você precisa de hardware dedicado.",
      },
      {
        id: "C",
        text: "Instâncias Spot",
        isCorrect: false,
        explanation:
          "Instâncias Spot podem ser interrompidas e não são adequadas quando o tempo de inatividade deve ser evitado.",
      },
      {
        id: "D",
        text: "Instâncias Sob Demanda",
        isCorrect: true,
        explanation:
          "Instâncias Sob Demanda são a melhor opção para uso de curto prazo quando o tempo de inatividade deve ser evitado.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/pricing/"],
  },
  {
    id: "CLF-C02-01-17",
    text: "Um desenvolvedor deseja implantar um aplicativo rapidamente na AWS sem criar manualmente os recursos necessários. Qual serviço da AWS atenderá a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon EC2",
        isCorrect: false,
        explanation: "O Amazon EC2 requer configuração manual significativa.",
      },
      {
        id: "B",
        text: "AWS Elastic Beanstalk",
        isCorrect: true,
        explanation:
          "O AWS Elastic Beanstalk é um serviço que facilita a implantação rápida de aplicativos, gerenciando automaticamente os recursos necessários.",
      },
      {
        id: "C",
        text: "AWS CodeBuild",
        isCorrect: false,
        explanation:
          "O AWS CodeBuild é um serviço de compilação, não de implantação de aplicativos.",
      },
      {
        id: "D",
        text: "Amazon Personalize",
        isCorrect: false,
        explanation:
          "O Amazon Personalize é um serviço de machine learning para recomendações personalizadas.",
      },
    ],
    category: "deployment",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/elasticbeanstalk/"],
  },
  {
    id: "CLF-C02-01-18",
    text: "Uma empresa está armazenando dados confidenciais de clientes em um bucket do Amazon S3. A empresa deseja proteger os dados contra exclusão ou substituição acidental. Qual recurso do S3 a empresa deve usar para atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Regras do ciclo de vida",
        isCorrect: false,
        explanation:
          "As regras do ciclo de vida são usadas para gerenciar o armazenamento de objetos, não para proteção contra exclusão.",
      },
      {
        id: "B",
        text: "Versionamento",
        isCorrect: true,
        explanation:
          "O versionamento do S3 protege contra exclusão ou substituição acidental mantendo várias versões dos objetos.",
      },
      {
        id: "C",
        text: "Políticas de bucket",
        isCorrect: false,
        explanation:
          "As políticas de bucket controlam o acesso ao bucket, não protegem contra exclusão acidental.",
      },
      {
        id: "D",
        text: "Criptografia do lado do servidor",
        isCorrect: false,
        explanation:
          "A criptografia protege os dados em repouso, não contra exclusão acidental.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/features/versioning/"],
  },
  {
    id: "CLF-C02-01-19",
    text: "Qual serviço ou ferramenta da AWS permite que um usuário estabeleça uma conexão de rede dedicada entre o data center local de uma empresa e a Nuvem AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Direct Connect",
        isCorrect: true,
        explanation:
          "O AWS Direct Connect fornece uma conexão de rede dedicada entre o data center local e a AWS.",
      },
      {
        id: "B",
        text: "VPC Peering",
        isCorrect: false,
        explanation:
          "O VPC Peering conecta VPCs entre si, não data centers locais à AWS.",
      },
      {
        id: "C",
        text: "AWS VPN",
        isCorrect: false,
        explanation:
          "O AWS VPN fornece uma conexão criptografada através da internet, não uma conexão dedicada.",
      },
      {
        id: "D",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço de DNS, não de conectividade de rede.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/directconnect/"],
  },
  {
    id: "CLF-C02-01-20",
    text: "Uma empresa de jogos online precisa escolher uma opção de compra para executar suas instâncias do Amazon EC2 por 1 ano. O tráfego da web é consistente e qualquer aumento no tráfego é previsível. As instâncias EC2 devem estar online e disponíveis sem qualquer interrupção. Qual opção de compra de instância do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
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
        text: "Instâncias Reservadas",
        isCorrect: true,
        explanation:
          "Instâncias Reservadas oferecem o melhor preço para uso contínuo e previsível por 1 ou 3 anos.",
      },
      {
        id: "C",
        text: "Instâncias spot",
        isCorrect: false,
        explanation:
          "Instâncias spot podem ser interrompidas e não são adequadas quando a disponibilidade contínua é necessária.",
      },
      {
        id: "D",
        text: "Frota Spot (Spot Fleet)",
        isCorrect: false,
        explanation:
          "Frota Spot também pode ser interrompida e não é adequada para cargas de trabalho que exigem disponibilidade contínua.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/pricing/reserved-instances/"],
  },
  {
    id: "CLF-C02-01-21",
    text: "Qual serviço ou recurso da AWS permite que um usuário estabeleça uma conexão de rede dedicada entre o data center local de uma empresa e a Nuvem AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Direct Connect",
        isCorrect: true,
        explanation:
          "O AWS Direct Connect fornece uma conexão de rede dedicada entre o data center local e a AWS.",
      },
      {
        id: "B",
        text: "VPC Peering",
        isCorrect: false,
        explanation:
          "O VPC Peering conecta VPCs entre si, não data centers locais à AWS.",
      },
      {
        id: "C",
        text: "AWS VPN",
        isCorrect: false,
        explanation:
          "O AWS VPN fornece uma conexão criptografada através da internet, não uma conexão dedicada.",
      },
      {
        id: "D",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço de DNS, não de conectividade de rede.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/directconnect/"],
  },
  {
    id: "CLF-C02-01-22",
    text: "Qual opção é uma localização física da infraestrutura global da AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "O AWS DataSync é um serviço de transferência de dados, não uma localização física.",
      },
      {
        id: "B",
        text: "Região AWS",
        isCorrect: true,
        explanation:
          "Uma Região AWS é uma localização física onde a AWS tem múltiplos data centers agrupados.",
      },
      {
        id: "C",
        text: "Amazon Connect",
        isCorrect: false,
        explanation:
          "O Amazon Connect é um serviço de contact center, não uma fonte de informações sobre segurança.",
      },
      {
        id: "D",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations é um serviço de gerenciamento de contas, não uma localização física.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/about-aws/global-infrastructure/"],
  },
  {
    id: "CLF-C02-01-23",
    text: "Uma empresa deseja proteger suas informações, sistemas e ativos da Nuvem AWS enquanto executa tarefas de avaliação e mitigação de riscos. Qual pilar do AWS Well-Architected Framework é apoiado por essas metas?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "O pilar Confiabilidade foca na capacidade de um sistema se recuperar de falhas e continuar funcionando.",
      },
      {
        id: "B",
        text: "Segurança",
        isCorrect: true,
        explanation:
          "O pilar Segurança foca na proteção de informações e sistemas, incluindo avaliação e mitigação de riscos.",
      },
      {
        id: "C",
        text: "Excelência operacional",
        isCorrect: false,
        explanation:
          "O pilar Excelência Operacional foca em executar e monitorar sistemas para entregar valor comercial.",
      },
      {
        id: "D",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "O pilar Eficiência de Desempenho foca no uso eficiente dos recursos computacionais.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-01-24",
    text: "Qual é o propósito de ter um gateway de internet dentro de uma VPC?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Para criar uma conexão VPN com a VPC.",
        isCorrect: false,
        explanation:
          "Conexões VPN são estabelecidas através de um Virtual Private Gateway, não um Internet Gateway.",
      },
      {
        id: "B",
        text: "Para permitir a comunicação entre a VPC e a Internet.",
        isCorrect: true,
        explanation:
          "O Internet Gateway permite que recursos dentro da VPC se comuniquem com a Internet.",
      },
      {
        id: "C",
        text: "Para impor restrições de largura de banda ao tráfego da Internet.",
        isCorrect: false,
        explanation: "O Internet Gateway não controla a largura de banda.",
      },
      {
        id: "D",
        text: "Para balancear a carga do tráfego da Internet nas instâncias do Amazon EC2.",
        isCorrect: false,
        explanation:
          "O balanceamento de carga é feito pelo Elastic Load Balancer, não pelo Internet Gateway.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
    ],
  },
  {
    id: "CLF-C02-01-25",
    text: "Uma empresa está executando um aplicativo local monolítico que não é escalonável e é difícil de manter. A empresa tem um plano para migrar o aplicativo para AWS e dividir o aplicativo em microsserviços. Qual prática recomendada do AWS Well-Architected Framework a empresa está seguindo com este plano?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Integre testes funcionais como parte da implantação da AWS.",
        isCorrect: false,
        explanation:
          "A integração de testes é uma boa prática, mas não está diretamente relacionada à arquitetura de microsserviços.",
      },
      {
        id: "B",
        text: "Use a automação para implantar mudanças.",
        isCorrect: false,
        explanation:
          "A automação é uma boa prática, mas não está diretamente relacionada à arquitetura de microsserviços.",
      },
      {
        id: "C",
        text: "Implante o aplicativo em vários locais.",
        isCorrect: false,
        explanation:
          "A implantação em vários locais é uma boa prática para alta disponibilidade, mas não está relacionada à arquitetura de microsserviços.",
      },
      {
        id: "D",
        text: "Implementar dependências fracamente acopladas.",
        isCorrect: true,
        explanation:
          "A implementação de dependências fracamente acopladas é uma prática recomendada ao dividir um aplicativo monolítico em microsserviços.",
      },
    ],
    category: "architecture-design",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-01-26",
    text: "Uma empresa possui uma conta AWS. A empresa deseja auditar sua senha e acessar detalhes de rotação de chaves para fins de conformidade. Qual serviço ou ferramenta da AWS atenderá a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "IAM Access Analyzer",
        isCorrect: false,
        explanation:
          "O IAM Access Analyzer analisa políticas de recursos para identificar recursos compartilhados, não para auditoria de credenciais.",
      },
      {
        id: "B",
        text: "AWS Artifact",
        isCorrect: false,
        explanation:
          "O AWS Artifact fornece relatórios de conformidade e acordos, não informações sobre credenciais.",
      },
      {
        id: "C",
        text: "IAM Credential Report",
        isCorrect: true,
        explanation:
          "O IAM Credential Report fornece informações detalhadas sobre o status das credenciais dos usuários, incluindo senhas e chaves de acesso.",
      },
      {
        id: "D",
        text: "AWS Audit Manager",
        isCorrect: false,
        explanation:
          "O AWS Audit Manager ajuda a avaliar continuamente se suas políticas e procedimentos estão operando de forma eficaz, não é específico para auditoria de credenciais.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html",
    ],
  },
  {
    id: "CLF-C02-01-27",
    text: "Uma empresa deseja receber uma notificação quando um limite de custo específico da AWS for atingido. Quais serviços ou ferramentas da AWS a empresa pode usar para atender a esse requisito?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Amazon Simple Queue Service (Amazon SQS)",
        isCorrect: false,
        explanation:
          "O Amazon SQS é um serviço de filas, não é usado para monitoramento de custos.",
      },
      {
        id: "B",
        text: "AWS Budgets",
        isCorrect: true,
        explanation:
          "O AWS Budgets permite definir alertas personalizados que notificam quando os custos excedem limites definidos.",
      },
      {
        id: "C",
        text: "Cost Explorer",
        isCorrect: false,
        explanation:
          "O Cost Explorer é usado para visualizar e analisar custos, não para configurar alertas.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch",
        isCorrect: true,
        explanation:
          "O Amazon CloudWatch pode ser usado para criar alarmes baseados em métricas de faturamento.",
      },
      {
        id: "E",
        text: "AWS Cost and Usage Report",
        isCorrect: false,
        explanation:
          "O AWS Cost and Usage Report fornece dados detalhados de custos, mas não oferece notificações.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/aws-cost-management/aws-budgets/",
      "https://aws.amazon.com/cloudwatch/",
    ],
  },
  {
    id: "CLF-C02-01-28",
    text: "Qual serviço ou recurso da AWS fornece respostas às perguntas relacionadas à segurança mais frequentes que a AWS recebe de seus usuários?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Artifact",
        isCorrect: false,
        explanation:
          "O AWS Artifact fornece relatórios de conformidade e acordos, não respostas a perguntas frequentes.",
      },
      {
        id: "B",
        text: "Amazon Connect",
        isCorrect: false,
        explanation:
          "O Amazon Connect é um serviço de contact center, não uma fonte de informações sobre segurança.",
      },
      {
        id: "C",
        text: "AWS Chatbot",
        isCorrect: false,
        explanation:
          "O AWS Chatbot é uma ferramenta de notificação e comando interativo, não uma fonte de informações sobre segurança.",
      },
      {
        id: "D",
        text: "AWS Knowledge Center (Centro de Conhecimento)",
        isCorrect: true,
        explanation:
          "O AWS Knowledge Center contém respostas às perguntas mais frequentes, incluindo questões de segurança.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/premiumsupport/knowledge-center/"],
  },
  {
    id: "CLF-C02-01-29",
    text: "Quais tarefas são responsabilidades do cliente, de acordo com o modelo de responsabilidade compartilhada da AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Configurar o grupo de segurança fornecido pela AWS.",
        isCorrect: true,
        explanation:
          "A configuração de grupos de segurança é responsabilidade do cliente.",
      },
      {
        id: "B",
        text: "Classificar os ativos da empresa na Nuvem AWS.",
        isCorrect: true,
        explanation:
          "A classificação e gestão de ativos é responsabilidade do cliente.",
      },
      {
        id: "C",
        text: "Determine quais zonas de disponibilidade usar para buckets do Amazon S3.",
        isCorrect: false,
        explanation:
          "Os buckets S3 são automaticamente replicados pela AWS em todas as AZs de uma região.",
      },
      {
        id: "D",
        text: "Corrigir ou atualizar o Amazon DynamoDB.",
        isCorrect: false,
        explanation:
          "A manutenção e atualização do DynamoDB é responsabilidade da AWS.",
      },
      {
        id: "E",
        text: "Selecione instâncias do Amazon EC2 para executar o AWS Lambda.",
        isCorrect: false,
        explanation:
          "O AWS Lambda é um serviço serverless e a AWS gerencia a infraestrutura subjacente.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-01-30",
    text: "Quais das alternativas a seguir são pilares do AWS Well-Architected Framework?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Disponibilidade",
        isCorrect: false,
        explanation:
          "Disponibilidade é um aspecto do pilar Confiabilidade, não um pilar separado.",
      },
      {
        id: "B",
        text: "Confiabilidade",
        isCorrect: true,
        explanation:
          "Confiabilidade é um dos cinco pilares do AWS Well-Architected Framework.",
      },
      {
        id: "C",
        text: "Escalabilidade",
        isCorrect: false,
        explanation:
          "Escalabilidade é um aspecto do pilar Eficiência de Desempenho, não um pilar separado.",
      },
      {
        id: "D",
        text: "Design responsivo",
        isCorrect: false,
        explanation:
          "Design responsivo não é um pilar do AWS Well-Architected Framework.",
      },
      {
        id: "E",
        text: "Excelência operacional",
        isCorrect: true,
        explanation:
          "Excelência operacional é um dos cinco pilares do AWS Well-Architected Framework.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-01-31",
    text: "Qual serviço ou recurso da AWS é usado para enviar mensagens de texto e e-mail de aplicativos distribuídos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Simple Notification Service (Amazon SNS)",
        isCorrect: true,
        explanation:
          "O Amazon SNS é um serviço de mensagens pub/sub totalmente gerenciado que pode enviar notificações por SMS e e-mail.",
      },
      {
        id: "B",
        text: "Amazon Simple Email Service (Amazon SES)",
        isCorrect: false,
        explanation:
          "O Amazon SES é apenas para envio de e-mails, não para mensagens de texto.",
      },
      {
        id: "C",
        text: "Alertas do Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Os alertas do CloudWatch são para monitoramento, não para envio direto de mensagens.",
      },
      {
        id: "D",
        text: "Amazon Simple Queue Service (Amazon SQS)",
        isCorrect: false,
        explanation:
          "O Amazon SQS é um serviço de filas de mensagens, não para envio direto de notificações.",
      },
    ],
    category: "application_integration",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/sns/"],
  },
  {
    id: "CLF-C02-01-32",
    text: "Um usuário precisa de acesso programático aos recursos da AWS por meio da AWS CLI ou da API da AWS. Qual opção fornecerá ao usuário o acesso apropriado?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "O Amazon Inspector é um serviço de avaliação de segurança automatizado, não fornece credenciais de acesso.",
      },
      {
        id: "B",
        text: "Access keys (Chaves de Acesso)",
        isCorrect: true,
        explanation:
          "As chaves de acesso (ID da chave de acesso e chave de acesso secreta) são necessárias para acesso programático à AWS.",
      },
      {
        id: "C",
        text: "SSH Public Keys (Chaves Púbicas SSH)",
        isCorrect: false,
        explanation:
          "As chaves SSH são usadas para acesso a instâncias EC2, não para acesso programático à AWS.",
      },
      {
        id: "D",
        text: "Chaves do AWS Key Management Service (AWS KMS)",
        isCorrect: false,
        explanation:
          "As chaves KMS são usadas para criptografia, não para autenticação.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html",
    ],
  },
  {
    id: "CLF-C02-01-33",
    text: "Uma empresa executa milhares de simulações simultâneas usando o AWS Batch. Cada simulação não tem estado, é tolerante a falhas e dura até 3 horas. Qual modelo de precificação permite à empresa otimizar custos e atender a esses requisitos?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias Reservadas",
        isCorrect: false,
        explanation:
          "Instâncias Reservadas são mais adequadas para uso contínuo e previsível.",
      },
      {
        id: "B",
        text: "Instâncias Spot",
        isCorrect: true,
        explanation:
          "Instâncias Spot são ideais para cargas de trabalho tolerantes a falhas e oferecem o maior desconto.",
      },
      {
        id: "C",
        text: "Instâncias Sob Demanda",
        isCorrect: false,
        explanation:
          "Instâncias Sob Demanda são mais caras e não são a opção mais econômica para cargas de trabalho tolerantes a falhas.",
      },
      {
        id: "D",
        text: "Instâncias Dedicadas",
        isCorrect: false,
        explanation:
          "Instâncias Dedicadas são mais caras e são usadas quando você precisa de hardware dedicado.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/spot/"],
  },
  {
    id: "CLF-C02-01-34",
    text: "O que significa o conceito de agilidade na computação em nuvem AWS?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "A velocidade com que os recursos da AWS são implementados.",
        isCorrect: true,
        explanation:
          "A agilidade na nuvem inclui a capacidade de provisionar recursos rapidamente.",
      },
      {
        id: "B",
        text: "A velocidade com que a AWS cria novas regiões da AWS.",
        isCorrect: false,
        explanation:
          "A expansão geográfica da AWS não está diretamente relacionada ao conceito de agilidade.",
      },
      {
        id: "C",
        text: "A capacidade de experimentar rapidamente.",
        isCorrect: true,
        explanation:
          "A agilidade permite que as empresas experimentem e inovem rapidamente com baixo risco.",
      },
      {
        id: "D",
        text: "A eliminação do desperdício de capacidade",
        isCorrect: false,
        explanation:
          "Isso está mais relacionado à eficiência de custos do que à agilidade.",
      },
      {
        id: "E",
        text: "O baixo custo de entrada na computação em nuvem",
        isCorrect: false,
        explanation:
          "O baixo custo de entrada é um benefício econômico, não um aspecto da agilidade.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-01-35",
    text: "Uma empresa precisa bloquear ataques de injeção de SQL. Qual serviço ou recurso da AWS pode atender a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "O AWS WAF pode ser configurado para bloquear ataques de injeção SQL e outras ameaças da web.",
      },
      {
        id: "B",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield protege contra ataques DDoS, não especificamente contra injeção SQL.",
      },
      {
        id: "C",
        text: "Network ACLs (ACLs de Rede)",
        isCorrect: false,
        explanation:
          "As Network ACLs operam na camada de rede e não podem identificar ataques de injeção SQL.",
      },
      {
        id: "D",
        text: "Security Groups (Grupos de Segurança)",
        isCorrect: false,
        explanation:
          "Os Security Groups controlam o tráfego na camada de rede e não podem identificar ataques de injeção SQL.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "CLF-C02-01-36",
    text: "Qual serviço ou recurso da AWS identifica se um bucket do Amazon S3 ou uma função do IAM foi compartilhado com uma entidade externa?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Service Catalog",
        isCorrect: false,
        explanation:
          "O AWS Service Catalog é usado para gerenciar catálogos de serviços de TI aprovados, não para análise de compartilhamento de recursos.",
      },
      {
        id: "B",
        text: "AWS Systems Manager",
        isCorrect: false,
        explanation:
          "O AWS Systems Manager é usado para gerenciamento de operações, não para análise de compartilhamento de recursos.",
      },
      {
        id: "C",
        text: "AWS IAM Access Analyzer",
        isCorrect: true,
        explanation:
          "O IAM Access Analyzer identifica recursos em sua organização e contas que são compartilhados com uma entidade externa.",
      },
      {
        id: "D",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations é usado para gerenciar várias contas AWS, não para análise de compartilhamento de recursos.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/iam/features/analyze-access/"],
  },
  {
    id: "CLF-C02-01-37",
    text: "Um profissional de nuvem precisa obter relatórios de conformidade da AWS antes de migrar um ambiente para a nuvem AWS. Como esses relatórios podem ser gerados?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Entre em contato com a equipe de conformidade da AWS.",
        isCorrect: false,
        explanation:
          "Não é necessário contatar a equipe de conformidade da AWS para obter relatórios de conformidade.",
      },
      {
        id: "B",
        text: "Baixe os relatórios do AWS Artifact.",
        isCorrect: true,
        explanation:
          "O AWS Artifact é o portal central para acessar relatórios de conformidade e acordos da AWS.",
      },
      {
        id: "C",
        text: "Abra um case com o AWS Support.",
        isCorrect: false,
        explanation:
          "Não é necessário abrir um caso de suporte para obter relatórios de conformidade.",
      },
      {
        id: "D",
        text: "Gere os relatórios com o Amazon Macie.",
        isCorrect: false,
        explanation:
          "O Amazon Macie é usado para descoberta e proteção de dados sensíveis, não para relatórios de conformidade.",
      },
    ],
    category: "security-and-compliance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/artifact/"],
  },
  {
    id: "CLF-C02-01-38",
    text: "A elasticidade na Nuvem AWS refere-se a qual das opções a seguir?",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Com que rapidez uma instância do Amazon EC2 pode ser reiniciada.",
        isCorrect: false,
        explanation:
          "A velocidade de reinicialização não está relacionada à elasticidade.",
      },
      {
        id: "B",
        text: "A capacidade de redimensionar os recursos à medida que a procura muda.",
        isCorrect: true,
        explanation:
          "A elasticidade permite aumentar ou diminuir recursos automaticamente conforme a demanda.",
      },
      {
        id: "C",
        text: "A quantidade máxima de RAM que uma instância do Amazon EC2 pode usar.",
        isCorrect: false,
        explanation:
          "A quantidade de RAM é uma característica do tipo de instância, não da elasticidade.",
      },
      {
        id: "D",
        text: "O modelo de faturamento pré-pago.",
        isCorrect: false,
        explanation:
          "O modelo de faturamento não está relacionado à elasticidade.",
      },
      {
        id: "E",
        text: "Quão facilmente os recursos podem ser adquiridos quando são necessários",
        isCorrect: true,
        explanation:
          "A elasticidade inclui a capacidade de adquirir recursos rapidamente quando necessário.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-01-39",
    text: "Uma empresa precisa bloquear ataques de injeção de SQL. Qual serviço ou recurso da AWS pode atender a esse requisito?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "O AWS WAF pode ser configurado para bloquear ataques de injeção SQL e outras ameaças da web.",
      },
      {
        id: "B",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield protege contra ataques DDoS, não especificamente contra injeção SQL.",
      },
      {
        id: "C",
        text: "Network ACLs (ACLs de Rede)",
        isCorrect: false,
        explanation:
          "As Network ACLs operam na camada de rede e não podem identificar ataques de injeção SQL.",
      },
      {
        id: "D",
        text: "Security Groups (Grupos de Segurança)",
        isCorrect: false,
        explanation:
          "Os Security Groups controlam o tráfego na camada de rede e não podem identificar ataques de injeção SQL.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "CLF-C02-01-40",
    text: "Uma empresa deseja proteger suas informações, sistemas e ativos da Nuvem AWS enquanto executa tarefas de avaliação e mitigação de riscos. Qual pilar do AWS Well-Architected Framework é apoiado por essas metas?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "O pilar Confiabilidade foca na capacidade de um sistema se recuperar de falhas e continuar funcionando.",
      },
      {
        id: "B",
        text: "Segurança",
        isCorrect: true,
        explanation:
          "O pilar Segurança foca na proteção de informações e sistemas, incluindo avaliação e mitigação de riscos.",
      },
      {
        id: "C",
        text: "Excelência operacional",
        isCorrect: false,
        explanation:
          "O pilar Excelência Operacional foca em executar e monitorar sistemas para entregar valor comercial.",
      },
      {
        id: "D",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "O pilar Eficiência de Desempenho foca no uso eficiente dos recursos computacionais.",
      },
    ],
    category: "cloud-concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
];

export default questionsClfC0201;
