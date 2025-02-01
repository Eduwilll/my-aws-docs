import type { Question } from "../lib/types/questions";

export const questions: Question[] = [
  {
    id: "q1",
    type: "single_choice",
    text: "Um desenvolvedor deseja implantar um aplicativo rapidamente na AWS sem criar manualmente os recursos necessários. Qual serviço da AWS atenderá a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Amazon EC2",
        isCorrect: false,
        explanation:
          "O Amazon EC2 é um serviço de computação que requer configuração manual dos recursos.",
      },
      {
        id: "b",
        text: "AWS Elastic Beanstalk",
        isCorrect: true,
        explanation:
          "O AWS Elastic Beanstalk é um serviço que facilita a implantação rápida de aplicativos, gerenciando automaticamente os detalhes de capacidade, balanceamento de carga, escalonamento e monitoramento.",
      },
      {
        id: "c",
        text: "AWS CodeBuild",
        isCorrect: false,
        explanation:
          "AWS CodeBuild é um serviço de compilação que compila código fonte, executa testes e produz pacotes de software, mas não implanta aplicativos automaticamente.",
      },
      {
        id: "d",
        text: "Amazon Personalize",
        isCorrect: false,
        explanation:
          "Amazon Personalize é um serviço de machine learning para criar recomendações personalizadas, não relacionado à implantação de aplicativos.",
      },
    ],
    category: "deployment",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "easy",
    references: ["https://aws.amazon.com/elasticbeanstalk/"],
  },
  {
    id: "q2",
    type: "single_choice",
    text: "Uma empresa precisa de uma rede de entrega de conteúdo que forneça entrega segura de dados, vídeos, aplicativos e APIs para usuários em todo o mundo, com baixa latência e altas velocidades de transferência. Qual serviço da AWS atende a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Elastic Load Balancing",
        isCorrect: false,
        explanation:
          "ELB é usado para distribuir tráfego entre múltiplas instâncias, não é uma CDN global.",
      },
      {
        id: "b",
        text: "Amazon S3",
        isCorrect: false,
        explanation:
          "Embora o S3 seja um serviço de armazenamento, não é uma CDN otimizada para entrega global de conteúdo.",
      },
      {
        id: "c",
        text: "Amazon Elastic Transcoder",
        isCorrect: false,
        explanation:
          "Este serviço é usado para converter arquivos de mídia, não para distribuição de conteúdo.",
      },
      {
        id: "d",
        text: "Amazon CloudFront",
        isCorrect: true,
        explanation:
          "Amazon CloudFront é uma CDN rápida que distribui dados, vídeos, aplicativos e APIs de forma segura, com baixa latência e altas velocidades de transferência.",
      },
    ],
    category: "networking",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudfront/"],
  },
  {
    id: "q3",
    type: "single_choice",
    text: "Uma empresa que possui diversas unidades de negócios deseja gerenciar e governar centralmente seus ambientes da Nuvem AWS. A empresa deseja automatizar a criação de contas AWS, aplicar políticas de controle de serviço (SCPs) e simplificar os processos de faturamento. Qual serviço ou ferramenta da AWS a empresa deve usar para atender a esses requisitos?",
    options: [
      {
        id: "a",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "AWS Trusted Advisor fornece recomendações de melhores práticas, mas não gerencia contas ou aplica políticas.",
      },
      {
        id: "b",
        text: "AWS Budgets",
        isCorrect: false,
        explanation:
          "AWS Budgets é usado para monitorar custos e uso, não para gerenciamento centralizado de contas.",
      },
      {
        id: "c",
        text: "Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é uma ferramenta para visualizar e analisar custos, não para gerenciamento de contas.",
      },
      {
        id: "d",
        text: "AWS Organizations",
        isCorrect: true,
        explanation:
          "AWS Organizations permite gerenciamento centralizado de múltiplas contas AWS, aplicação de políticas de controle de serviço e consolidação de faturamento.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/"],
  },
  {
    id: "q4",
    type: "single_choice",
    text: "De acordo com as práticas recomendadas de segurança, como uma instância do Amazon EC2 deve receber acesso a um bucket do Amazon S3?",
    options: [
      {
        id: "a",
        text: "Codifique a chave secreta e a chave de acesso de um usuário IAM diretamente no aplicativo e faça upload do arquivo.",
        isCorrect: false,
        explanation:
          "Nunca é seguro codificar credenciais diretamente no código do aplicativo.",
      },
      {
        id: "b",
        text: "Armazene a chave secreta e a chave de acesso do usuário IAM em um arquivo de texto na instância EC2, leia as chaves e faça upload do arquivo.",
        isCorrect: false,
        explanation:
          "Armazenar credenciais em arquivos de texto não é uma prática segura.",
      },
      {
        id: "c",
        text: "Faça com que a instância do EC2 assuma uma função(role) para obter os privilégios para fazer upload do arquivo.",
        isCorrect: true,
        explanation:
          "Usar funções IAM (roles) é a maneira mais segura e recomendada para conceder permissões a instâncias EC2.",
      },
      {
        id: "d",
        text: "Modifique a política do bucket S3 para que qualquer serviço possa fazer upload para ela a qualquer momento.",
        isCorrect: false,
        explanation:
          "Permitir acesso irrestrito ao bucket S3 é uma prática insegura que viola o princípio do privilégio mínimo.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/iam/features/manage-roles/"],
  },
  {
    id: "q5",
    type: "single_choice",
    text: "Uma empresa tem o interesse de acompanhar o percentual de processamento em seus servidores durante um período específico do dia. Qual serviço da AWS seria adequado para atender a essa necessidade?",
    options: [
      {
        id: "a",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "CloudTrail registra atividades de API, não métricas de processamento.",
      },
      {
        id: "b",
        text: "AWS CloudWatch",
        isCorrect: true,
        explanation:
          "Amazon CloudWatch é o serviço ideal para monitorar métricas de recursos AWS, incluindo utilização de CPU.",
      },
      {
        id: "c",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "DataSync é usado para transferência de dados, não para monitoramento.",
      },
      {
        id: "d",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é usado para análise de custos, não para monitoramento de recursos.",
      },
    ],
    category: "monitoring",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/cloudwatch/"],
  },
  {
    id: "q6",
    type: "multiple_choice",
    text: "Quais das alternativas a seguir são as melhores práticas ao usar o AWS Organizations? (Selecione DUAS)",
    options: [
      {
        id: "a",
        text: "Restringir privilégios de conta usando políticas de controle de serviço (Service Control Policies – SCP)",
        isCorrect: true,
        explanation:
          "Usar SCPs é uma prática recomendada para controlar permissões em todas as contas da organização.",
      },
      {
        id: "b",
        text: "Desabilitar o CloudTrail em várias contas",
        isCorrect: false,
        explanation:
          "Desabilitar o CloudTrail reduz a visibilidade e auditoria, o que não é uma boa prática.",
      },
      {
        id: "c",
        text: "Criar contas por departamento",
        isCorrect: true,
        explanation:
          "Organizar contas por departamento ajuda na governança e no controle de custos.",
      },
      {
        id: "d",
        text: "Nunca usar tags para faturamento",
        isCorrect: false,
        explanation:
          "Tags são importantes para rastreamento de custos e devem ser usadas.",
      },
      {
        id: "e",
        text: "Não usar AWS Organizations para automatizar a criação de contas AWS",
        isCorrect: false,
        explanation:
          "A automação da criação de contas é um benefício importante do AWS Organizations.",
      },
    ],
    category: "management",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/organizations/getting-started/best-practices/",
    ],
  },
  {
    id: "q7",
    type: "single_choice",
    text: "O S3 é um armazenamento virtualmente ilimitado?",
    options: [
      {
        id: "a",
        text: "Verdadeiro",
        isCorrect: true,
        explanation:
          "O Amazon S3 oferece armazenamento virtualmente ilimitado, permitindo armazenar e recuperar qualquer quantidade de dados.",
      },
      {
        id: "b",
        text: "Falso",
        isCorrect: false,
        explanation:
          "Esta afirmação está incorreta. O S3 é projetado para ser virtualmente ilimitado em termos de capacidade de armazenamento.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/features/"],
  },
  {
    id: "q8",
    type: "single_choice",
    text: "Um usuário precisa implantar rapidamente um banco de dados não relacional na AWS. O usuário não deseja gerenciar o hardware subjacente ou o software de banco de dados. Qual serviço AWS pode ser usado para fazer isso?",
    options: [
      {
        id: "a",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um serviço de banco de dados relacional, não não-relacional.",
      },
      {
        id: "b",
        text: "Amazon DynamoDB",
        isCorrect: true,
        explanation:
          "Amazon DynamoDB é um banco de dados não relacional totalmente gerenciado que oferece desempenho consistente em qualquer escala.",
      },
      {
        id: "c",
        text: "Amazon Aurora",
        isCorrect: false,
        explanation:
          "Amazon Aurora é um banco de dados relacional compatível com MySQL e PostgreSQL.",
      },
      {
        id: "d",
        text: "Amazon Redshift",
        isCorrect: false,
        explanation:
          "Amazon Redshift é um data warehouse relacional, não um banco de dados não relacional.",
      },
    ],
    category: "database",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/dynamodb/"],
  },
  {
    id: "q9",
    type: "single_choice",
    text: "Uma empresa de jogos online precisa escolher uma opção de compra para executar suas instâncias do Amazon EC2 por 1 ano. O tráfego da web é consistente e qualquer aumento no tráfego é previsível. As instâncias EC2 devem estar online e disponíveis sem qualquer interrupção. Qual opção de compra de instância do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
    options: [
      {
        id: "a",
        text: "Instâncias sob demanda",
        isCorrect: false,
        explanation:
          "Instâncias sob demanda são mais caras e melhor utilizadas para cargas de trabalho de curto prazo ou imprevisíveis.",
      },
      {
        id: "b",
        text: "Instâncias Reservadas",
        isCorrect: true,
        explanation:
          "Instâncias Reservadas são a opção mais econômica para cargas de trabalho previsíveis e de longo prazo, oferecendo descontos significativos em comparação com instâncias sob demanda.",
      },
      {
        id: "c",
        text: "Instâncias spot",
        isCorrect: false,
        explanation:
          "Instâncias spot podem ser interrompidas e não são adequadas para aplicações que precisam estar sempre disponíveis.",
      },
      {
        id: "d",
        text: "Frota Spot (Spot Fleet)",
        isCorrect: false,
        explanation:
          "Spot Fleet também usa instâncias spot e não é adequado para aplicações que precisam de disponibilidade constante.",
      },
    ],
    category: "compute",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/pricing/"],
  },
  {
    id: "q10",
    type: "single_choice",
    text: "Qual serviço da AWS oferece a capacidade de gerenciar infraestrutura como código?",
    options: [
      {
        id: "a",
        text: "AWS CodePipeline",
        isCorrect: false,
        explanation:
          "AWS CodePipeline é um serviço de entrega contínua, não um serviço de infraestrutura como código.",
      },
      {
        id: "b",
        text: "AWS CodeDeploy",
        isCorrect: false,
        explanation:
          "AWS CodeDeploy é um serviço de implantação de aplicativos, não um serviço de infraestrutura como código.",
      },
      {
        id: "c",
        text: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "AWS Direct Connect é um serviço de conectividade dedicada, não relacionado à infraestrutura como código.",
      },
      {
        id: "d",
        text: "AWS CloudFormation",
        isCorrect: true,
        explanation:
          "AWS CloudFormation permite criar e gerenciar recursos da AWS usando templates de infraestrutura como código.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudformation/"],
  },
  {
    id: "q11",
    type: "single_choice",
    text: "Qual política de roteamento AWS Route 53 você usaria para rotear o tráfego para vários recursos e também escolher quanto tráfego é roteado para cada recurso?",
    options: [
      {
        id: "a",
        text: "Política de roteamento simplificada",
        isCorrect: false,
        explanation:
          "A política de roteamento simplificada não permite distribuir o tráfego em proporções específicas.",
      },
      {
        id: "b",
        text: "Política de roteamento ponderado (peso)",
        isCorrect: true,
        explanation:
          "A política de roteamento ponderado permite especificar quanto tráfego é enviado para diferentes recursos usando pesos.",
      },
      {
        id: "c",
        text: "Política de roteamento para falhas (failover)",
        isCorrect: false,
        explanation:
          "A política de failover é usada para configurar backup, não para distribuir tráfego em proporções específicas.",
      },
      {
        id: "d",
        text: "Política de roteamento de latência",
        isCorrect: false,
        explanation:
          "A política de roteamento de latência roteia com base no menor tempo de resposta, não em proporções específicas.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/route53/features/"],
  },
  {
    id: "q12",
    type: "single_choice",
    text: "Qual dos seguintes atua como um firewall em nível de instância para controlar o acesso de entrada e saída?",
    options: [
      {
        id: "a",
        text: "Lista de controle de acesso à rede (Nacls)",
        isCorrect: false,
        explanation:
          "NACLs são firewalls em nível de sub-rede, não em nível de instância.",
      },
      {
        id: "b",
        text: "Grupos de segurança",
        isCorrect: true,
        explanation:
          "Grupos de segurança atuam como firewall virtual em nível de instância, controlando o tráfego de entrada e saída.",
      },
      {
        id: "c",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "AWS Trusted Advisor é um serviço de recomendações de melhores práticas, não um firewall.",
      },
      {
        id: "d",
        text: "Virtual private gateways",
        isCorrect: false,
        explanation:
          "Virtual private gateways são usados para conexões VPN, não como firewall.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html",
    ],
  },
  {
    id: "q13",
    type: "single_choice",
    text: "Qual opção é uma perspectiva que inclui recursos básicos do AWS Cloud Adoption Framework (AWS CAF)?",
    options: [
      {
        id: "a",
        text: "Sustentabilidade",
        isCorrect: false,
        explanation:
          "Sustentabilidade não é uma das perspectivas principais do AWS CAF.",
      },
      {
        id: "b",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "Eficiência de desempenho é um pilar do Well-Architected Framework, não uma perspectiva do CAF.",
      },
      {
        id: "c",
        text: "Governança",
        isCorrect: true,
        explanation:
          "Governança é uma das perspectivas principais do AWS CAF, focando em orquestração e controle de recursos AWS.",
      },
      {
        id: "d",
        text: "Confiabilidade",
        isCorrect: false,
        explanation:
          "Confiabilidade é um pilar do Well-Architected Framework, não uma perspectiva do CAF.",
      },
    ],
    category: "cloud-concepts",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "medium",
    references: ["https://aws.amazon.com/professional-services/CAF/"],
  },
  {
    id: "q14",
    type: "single_choice",
    text: "Quais das alternativas a seguir é um serviço de computação sem servidor oferecido pela AWS?",
    options: [
      {
        id: "a",
        text: "AWS Elastic Beanstalk",
        isCorrect: false,
        explanation:
          "Elastic Beanstalk é uma plataforma como serviço (PaaS), não um serviço sem servidor.",
      },
      {
        id: "b",
        text: "Amazon Lightsail",
        isCorrect: false,
        explanation:
          "Lightsail é um serviço de hospedagem virtual privada (VPS), não um serviço sem servidor.",
      },
      {
        id: "c",
        text: "Amazon Elastic Compute Cloud (EC2)",
        isCorrect: false,
        explanation:
          "EC2 é um serviço de computação que requer gerenciamento de servidor.",
      },
      {
        id: "d",
        text: "AWS Lambda",
        isCorrect: true,
        explanation:
          "AWS Lambda é um serviço de computação sem servidor que executa código em resposta a eventos.",
      },
    ],
    category: "compute",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/lambda/"],
  },
  {
    id: "q15",
    type: "single_choice",
    text: "Qual opção é uma localização física da infraestrutura global da AWS?",
    options: [
      {
        id: "a",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "AWS DataSync é um serviço de transferência de dados, não uma localização física.",
      },
      {
        id: "b",
        text: "Região AWS",
        isCorrect: true,
        explanation:
          "Uma Região AWS é uma localização física onde a AWS mantém múltiplos data centers agrupados em Zonas de Disponibilidade.",
      },
      {
        id: "c",
        text: "Amazon Connect",
        isCorrect: false,
        explanation:
          "Amazon Connect é um serviço de contact center, não uma localização física.",
      },
      {
        id: "d",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "AWS Organizations é um serviço de gerenciamento de contas, não uma localização física.",
      },
    ],
    category: "infrastructure",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "easy",
    references: ["https://aws.amazon.com/about-aws/global-infrastructure/"],
  },
  {
    id: "q16",
    type: "single_choice",
    text: "Uma empresa tem o interesse de acompanhar o percentual de processamento em seus servidores durante um período específico do dia. Qual serviço da AWS seria adequado para atender a essa necessidade?",
    options: [
      {
        id: "a",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "CloudTrail registra atividades de API, não métricas de processamento.",
      },
      {
        id: "b",
        text: "AWS CloudWatch",
        isCorrect: true,
        explanation:
          "Amazon CloudWatch é o serviço ideal para monitorar métricas de recursos AWS, incluindo utilização de CPU.",
      },
      {
        id: "c",
        text: "AWS DataSync",
        isCorrect: false,
        explanation:
          "DataSync é usado para transferência de dados, não para monitoramento.",
      },
      {
        id: "d",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é usado para análise de custos, não para monitoramento de recursos.",
      },
    ],
    category: "monitoring",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/cloudwatch/"],
  },
  {
    id: "q17",
    type: "single_choice",
    text: "Qual tarefa é de responsabilidade da AWS ao usar os serviços da AWS?",
    options: [
      {
        id: "a",
        text: "Gerenciamento de permissões de usuário IAM",
        isCorrect: false,
        explanation:
          "O gerenciamento de permissões IAM é responsabilidade do cliente.",
      },
      {
        id: "b",
        text: "Configurar firewalls e redes.",
        isCorrect: false,
        explanation:
          "A configuração de firewalls e redes é responsabilidade do cliente.",
      },
      {
        id: "c",
        text: "Manutenção de controles físicos e ambientais",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela segurança física e ambiental dos data centers que hospedam os serviços AWS.",
      },
      {
        id: "d",
        text: "Implementar controles físicos e ambientais",
        isCorrect: false,
        explanation:
          "A AWS é responsável pelos controles físicos e ambientais dos data centers.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "q18",
    type: "single_choice",
    text: "Uma empresa de mídia social deseja proteger seu aplicativo Web contra explorações comuns da Web, como injeções de SQL e scripts entre sites. Qual serviço da AWS atenderá a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é usado para avaliação de vulnerabilidades em instâncias EC2, não para proteção de aplicativos web.",
      },
      {
        id: "b",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "AWS WAF (Web Application Firewall) protege aplicativos web contra explorações comuns como injeção SQL e XSS.",
      },
      {
        id: "c",
        text: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "Amazon GuardDuty é um serviço de detecção de ameaças, não um firewall de aplicativo web.",
      },
      {
        id: "d",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é um serviço de monitoramento, não um serviço de segurança para aplicativos web.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "q19",
    type: "single_choice",
    text: "Qual serviço da AWS oferece armazenamento de objetos altamente durável?",
    options: [
      {
        id: "a",
        text: "Amazon S3",
        isCorrect: true,
        explanation:
          "Amazon S3 oferece armazenamento de objetos altamente durável, com 99,999999999% (11 noves) de durabilidade.",
      },
      {
        id: "b",
        text: "Amazon Elastic File System (Amazon EFS)",
        isCorrect: false,
        explanation:
          "Amazon EFS é um sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
      },
      {
        id: "c",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é um serviço de armazenamento em bloco, não um serviço de armazenamento de objetos.",
      },
      {
        id: "d",
        text: "Amazon FSx",
        isCorrect: false,
        explanation:
          "Amazon FSx é um serviço de sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "q20",
    type: "single_choice",
    text: "Uma empresa está executando uma carga de trabalho crítica em uma instância de banco de dados do Amazon RDS. A empresa precisa que a instância de banco de dados esteja altamente disponível com um tempo de recuperação inferior a 5 minutos. Qual solução atenderá a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Crie uma réplica de leitura da instância de banco de dados.",
        isCorrect: false,
        explanation:
          "Réplicas de leitura são usadas para escalabilidade de leitura e não fornecem failover automático.",
      },
      {
        id: "b",
        text: "Crie um modelo da instância de banco de dados usando AWS CloudFormation.",
        isCorrect: false,
        explanation:
          "CloudFormation é usado para automação de infraestrutura, não para alta disponibilidade.",
      },
      {
        id: "c",
        text: "Tire snapshots frequentes da instância de banco de dados. Armazene os snapshots no Amazon S3.",
        isCorrect: false,
        explanation:
          "Snapshots são para backup e não fornecem failover automático rápido.",
      },
      {
        id: "d",
        text: "Modifique a instância de banco de dados para ser uma implantação Multi-AZ.",
        isCorrect: true,
        explanation:
          "A implantação Multi-AZ do RDS fornece alta disponibilidade com failover automático em menos de 5 minutos.",
      },
    ],
    category: "database",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/rds/features/multi-az/"],
  },
  {
    id: "q21",
    type: "single_choice",
    text: "Qual tarefa é de responsabilidade do cliente, de acordo com o modelo de responsabilidade compartilhada da AWS?",
    options: [
      {
        id: "a",
        text: "Mantenha a segurança da Nuvem AWS.",
        isCorrect: false,
        explanation:
          "A AWS é responsável pela segurança da nuvem, incluindo infraestrutura física e rede.",
      },
      {
        id: "b",
        text: "Configurar firewalls e redes.",
        isCorrect: true,
        explanation:
          "O cliente é responsável pela configuração de firewalls, redes e outros controles de segurança na nuvem.",
      },
      {
        id: "c",
        text: "Aplicar patch no sistema operacional das instâncias do Amazon RDS.",
        isCorrect: false,
        explanation:
          "A AWS é responsável pela aplicação de patches no sistema operacional do RDS.",
      },
      {
        id: "d",
        text: "Implementar controles físicos e ambientais.",
        isCorrect: false,
        explanation:
          "A AWS é responsável pelos controles físicos e ambientais dos data centers.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "q22",
    type: "single_choice",
    text: "Qual princípio de design do AWS Well-Architected Framework que se concentra na proteção de informações e sistemas?",
    options: [
      {
        id: "a",
        text: "Segurança",
        isCorrect: true,
        explanation:
          "O pilar de Segurança do Well-Architected Framework foca na proteção de informações e sistemas.",
      },
      {
        id: "b",
        text: "Otimização de custos",
        isCorrect: false,
        explanation:
          "Otimização de custos foca em evitar custos desnecessários, não em segurança.",
      },
      {
        id: "c",
        text: "Sustentabilidade",
        isCorrect: false,
        explanation:
          "Sustentabilidade foca em minimizar impactos ambientais, não em segurança.",
      },
      {
        id: "d",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "Eficiência de desempenho foca em usar recursos de computação de forma eficiente, não em segurança.",
      },
    ],
    category: "cloud-concepts",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "q23",
    type: "single_choice",
    text: "Uma empresa planeja migrar para a AWS e deseja criar estimativas de custos para seus casos de uso da AWS. Qual serviço ou ferramenta da AWS a empresa pode usar para atender a esses requisitos?",
    options: [
      {
        id: "a",
        text: "AWS Pricing Calculator",
        isCorrect: true,
        explanation:
          "AWS Pricing Calculator permite estimar custos de serviços AWS antes da implementação.",
      },
      {
        id: "b",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "CloudWatch é usado para monitoramento, não para estimativas de custos.",
      },
      {
        id: "c",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer analisa custos históricos, não faz estimativas para casos de uso futuros.",
      },
      {
        id: "d",
        text: "AWS Budgets",
        isCorrect: false,
        explanation:
          "AWS Budgets é usado para definir alertas de orçamento, não para estimativas de custos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "Domínio 4: Faturamento e Preços",
    difficulty: "easy",
    references: ["https://calculator.aws/"],
  },
  {
    id: "q24",
    type: "single_choice",
    text: "Uma empresa de serviços financeiros deseja garantir a auditoria das atividades em sua conta AWS. Como Cloud Practitioner, qual serviço da AWS você recomendaria nesse caso?",
    options: [
      {
        id: "a",
        text: "Config",
        isCorrect: false,
        explanation:
          "AWS Config é usado para avaliar configurações de recursos, não para auditoria de atividades.",
      },
      {
        id: "b",
        text: "CloudTrail",
        isCorrect: true,
        explanation:
          "AWS CloudTrail é o serviço ideal para auditoria, pois registra todas as atividades da conta AWS.",
      },
      {
        id: "c",
        text: "Trusted Advisor",
        isCorrect: false,
        explanation:
          "Trusted Advisor fornece recomendações de melhores práticas, não auditoria.",
      },
      {
        id: "d",
        text: "CloudWatch",
        isCorrect: false,
        explanation:
          "CloudWatch é usado para monitoramento de recursos, não para auditoria de atividades.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudtrail/"],
  },
  {
    id: "q25",
    type: "single_choice",
    text: "Uma empresa deseja automatizar a implantação de infraestrutura usando infraestrutura como código (IaC). A empresa deseja dimensionar as pilhas de produção para que possam ser implantadas em várias regiões da AWS. Qual serviço da AWS atenderá a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "CloudWatch é um serviço de monitoramento, não de implantação de infraestrutura.",
      },
      {
        id: "b",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "AWS Config é usado para avaliar conformidade de recursos, não para implantação.",
      },
      {
        id: "c",
        text: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "Trusted Advisor fornece recomendações de melhores práticas, não implantação de infraestrutura.",
      },
      {
        id: "d",
        text: "AWS CloudFormation",
        isCorrect: true,
        explanation:
          "AWS CloudFormation permite automatizar a implantação de infraestrutura como código em várias regiões.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudformation/"],
  },
  {
    id: "q26",
    type: "multiple_choice",
    text: "Quais ações são práticas recomendadas para um usuário root de conta da AWS? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Compartilhe credenciais de usuário root com membros da equipe.",
        isCorrect: false,
        explanation:
          "Nunca compartilhe credenciais do usuário root, isso compromete a segurança da conta.",
      },
      {
        id: "b",
        text: "Crie vários usuários root para a conta, separados por ambiente.",
        isCorrect: false,
        explanation:
          "Não é possível criar múltiplos usuários root, e isso não seria uma prática segura.",
      },
      {
        id: "c",
        text: "Habilite a autenticação multifator (MFA) no usuário root.",
        isCorrect: true,
        explanation:
          "Habilitar MFA no usuário root é uma prática de segurança essencial.",
      },
      {
        id: "d",
        text: "Crie um usuário IAM com privilégios de administrador para tarefas administrativas diárias, em vez de usar o usuário root.",
        isCorrect: true,
        explanation:
          "Use usuários IAM com privilégios apropriados para tarefas diárias, não o usuário root.",
      },
      {
        id: "e",
        text: "Use acesso programático em vez do usuário root e senha.",
        isCorrect: false,
        explanation:
          "O acesso programático deve ser configurado para usuários IAM, não para o usuário root.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    ],
  },
  {
    id: "q27",
    type: "multiple_choice",
    text: "Quais das opções a seguir são benefícios de usar o AWS Trusted Advisor? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Fornecimento de orquestração de contêineres de alto desempenho.",
        isCorrect: false,
        explanation:
          "Orquestração de contêineres não é uma função do Trusted Advisor.",
      },
      {
        id: "b",
        text: "Criação e rotação de chaves de criptografia.",
        isCorrect: false,
        explanation:
          "Gerenciamento de chaves não é uma função do Trusted Advisor.",
      },
      {
        id: "c",
        text: "Detectando recursos subutilizados para economizar custos.",
        isCorrect: true,
        explanation:
          "Trusted Advisor ajuda a identificar recursos subutilizados para otimização de custos.",
      },
      {
        id: "d",
        text: "Melhorar a segurança monitorando proativamente o ambiente AWS.",
        isCorrect: true,
        explanation:
          "Trusted Advisor fornece recomendações de segurança proativas.",
      },
      {
        id: "e",
        text: "Implementação de marcação forçada em recursos da AWS",
        isCorrect: false,
        explanation: "Marcação forçada não é uma função do Trusted Advisor.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/",
    ],
  },
  {
    id: "q28",
    type: "single_choice",
    text: "Qual serviço ou recurso da AWS oferece aos usuários a capacidade de capturar informações sobre o tráfego de rede em uma VPC?",
    options: [
      {
        id: "a",
        text: "VPC Flow Logs",
        isCorrect: true,
        explanation:
          "VPC Flow Logs permite capturar informações sobre o tráfego IP que flui para e a partir das interfaces de rede em sua VPC.",
      },
      {
        id: "b",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector avalia a segurança de aplicações, não captura tráfego de rede.",
      },
      {
        id: "c",
        text: "Tabelas de rotas da VPC",
        isCorrect: false,
        explanation:
          "Tabelas de rotas definem rotas de tráfego, mas não capturam informações sobre o tráfego.",
      },
      {
        id: "d",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "CloudTrail registra atividades de API, não tráfego de rede em uma VPC.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
    ],
  },
  {
    id: "q29",
    type: "single_choice",
    text: "Qual serviço ou ferramenta da AWS ajuda os usuários a visualizar, compreender e gerenciar gastos e uso ao longo do tempo?",
    options: [
      {
        id: "a",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "AWS Organizations é usado para gerenciar várias contas AWS, não para análise de custos.",
      },
      {
        id: "b",
        text: "AWS Pricing Calculator",
        isCorrect: false,
        explanation:
          "AWS Pricing Calculator é usado para estimar custos futuros, não para analisar gastos atuais.",
      },
      {
        id: "c",
        text: "AWS Cost Explorer",
        isCorrect: true,
        explanation:
          "AWS Cost Explorer fornece visualização e análise de custos atuais e históricos da AWS.",
      },
      {
        id: "d",
        text: "AWS Service Catalog",
        isCorrect: false,
        explanation:
          "AWS Service Catalog é usado para gerenciar catálogos de serviços aprovados, não para análise de custos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "Domínio 4: Faturamento e Preços",
    difficulty: "easy",
    references: [
      "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
    ],
  },
  {
    id: "q30",
    type: "single_choice",
    text: "Qual é o melhor recurso para um usuário encontrar informações e relatórios relacionados à conformidade sobre a AWS?",
    options: [
      {
        id: "a",
        text: "AWS Artifact",
        isCorrect: true,
        explanation:
          "AWS Artifact é o recurso central para acessar relatórios de conformidade e acordos da AWS.",
      },
      {
        id: "b",
        text: "AWS Marketplace",
        isCorrect: false,
        explanation:
          "AWS Marketplace é uma loja digital para software de terceiros, não um recurso de conformidade.",
      },
      {
        id: "c",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector avalia a segurança de aplicações, não fornece relatórios de conformidade.",
      },
      {
        id: "d",
        text: "AWS Support",
        isCorrect: false,
        explanation:
          "AWS Support fornece ajuda técnica, não é o recurso principal para documentos de conformidade.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/artifact/"],
  },
  {
    id: "q31",
    type: "single_choice",
    text: "Usar o AWS Identity and Access Management (IAM) para conceder acesso apenas aos recursos necessários para executar uma tarefa é um conceito conhecido como:",
    options: [
      {
        id: "a",
        text: "Acesso restrito",
        isCorrect: false,
        explanation:
          "Acesso restrito não é o termo técnico correto para este conceito de segurança.",
      },
      {
        id: "b",
        text: "Acesso conforme necessário",
        isCorrect: false,
        explanation:
          "Acesso conforme necessário não é o termo técnico correto para este princípio de segurança.",
      },
      {
        id: "c",
        text: "Acesso simbólico",
        isCorrect: false,
        explanation:
          "Acesso simbólico não é um termo usado em práticas de segurança da AWS.",
      },
      {
        id: "d",
        text: "Acesso com privilégios mínimos",
        isCorrect: true,
        explanation:
          "O princípio do privilégio mínimo significa conceder apenas os direitos de acesso necessários para realizar uma tarefa específica.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    ],
  },
  {
    id: "q32",
    type: "single_choice",
    text: "Qual serviço da Nuvem AWS pode enviar alertas aos clientes se os limites de gastos personalizados forem excedidos?",
    options: [
      {
        id: "a",
        text: "AWS Budgets",
        isCorrect: true,
        explanation:
          "AWS Budgets permite definir limites de gastos personalizados e receber alertas quando esses limites são excedidos.",
      },
      {
        id: "b",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é usado para análise de custos, não para alertas de gastos.",
      },
      {
        id: "c",
        text: "AWS Cost Allocation Tags",
        isCorrect: false,
        explanation:
          "Cost Allocation Tags são usadas para organizar recursos e custos, não para alertas.",
      },
      {
        id: "d",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "AWS Organizations é usado para gerenciar múltiplas contas AWS, não para alertas de gastos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "Domínio 4: Faturamento e Preços",
    difficulty: "easy",
    references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
  },
  {
    id: "q33",
    type: "single_choice",
    text: "Qual das alternativas a seguir descreve algumas das principais funcionalidades do Amazon S3?",
    options: [
      {
        id: "a",
        text: "O Amazon S3 é um serviço de armazenamento em blocos de alto desempenho projetado para uso com o Amazon EC2.",
        isCorrect: false,
        explanation: "Esta descrição se aplica ao Amazon EBS, não ao S3.",
      },
      {
        id: "b",
        text: "Amazon S3 é um serviço de armazenamento de objetos que oferece desempenho, segurança, escalabilidade e disponibilidade de dados de alto nível.",
        isCorrect: true,
        explanation:
          "Esta é a descrição correta do Amazon S3, um serviço de armazenamento de objetos altamente escalável.",
      },
      {
        id: "c",
        text: "O Amazon S3 é um sistema de armazenamento de arquivos totalmente gerenciado, altamente confiável e escalável, acessível por meio do protocolo SMB padrão do setor.",
        isCorrect: false,
        explanation:
          "Esta descrição se aplica ao Amazon FSx for Windows File Server, não ao S3.",
      },
      {
        id: "d",
        text: "O Amazon S3 é um NFS elástico escalável e totalmente gerenciado para uso com serviços da Nuvem AWS e recursos locais.",
        isCorrect: false,
        explanation: "Esta descrição se aplica ao Amazon EFS, não ao S3.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/features/"],
  },
  {
    id: "q34",
    type: "multiple_choice",
    text: "Quais ações são práticas recomendadas para um usuário root de conta da AWS? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Compartilhe credenciais de usuário root com membros da equipe.",
        isCorrect: false,
        explanation:
          "Nunca compartilhe credenciais do usuário root, isso compromete a segurança da conta.",
      },
      {
        id: "b",
        text: "Crie vários usuários root para a conta, separados por ambiente.",
        isCorrect: false,
        explanation:
          "Não é possível criar múltiplos usuários root, e isso não seria uma prática segura.",
      },
      {
        id: "c",
        text: "Habilite a autenticação multifator (MFA) no usuário root.",
        isCorrect: true,
        explanation:
          "Habilitar MFA no usuário root é uma prática de segurança essencial.",
      },
      {
        id: "d",
        text: "Crie um usuário IAM com privilégios de administrador para tarefas administrativas diárias, em vez de usar o usuário root.",
        isCorrect: true,
        explanation:
          "Use usuários IAM com privilégios apropriados para tarefas diárias, não o usuário root.",
      },
      {
        id: "e",
        text: "Use acesso programático em vez do usuário root e senha.",
        isCorrect: false,
        explanation:
          "O acesso programático deve ser configurado para usuários IAM, não para o usuário root.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    ],
  },
  {
    id: "q35",
    type: "multiple_choice",
    text: "A implantação Multi-AZ significa que o ambiente é/possui: (Selecione DUAS)",
    options: [
      {
        id: "a",
        text: "Dimensionamento Vertical",
        isCorrect: false,
        explanation:
          "Multi-AZ não está relacionado ao dimensionamento vertical.",
      },
      {
        id: "b",
        text: "Alta disponibilidade",
        isCorrect: true,
        explanation:
          "Multi-AZ fornece alta disponibilidade através de redundância em diferentes zonas de disponibilidade.",
      },
      {
        id: "c",
        text: "Projetado para falhas (failover)",
        isCorrect: true,
        explanation:
          "Multi-AZ oferece failover automático para manter a disponibilidade em caso de falhas.",
      },
      {
        id: "d",
        text: "Eficiência de desempenho",
        isCorrect: false,
        explanation:
          "Multi-AZ é focado em disponibilidade, não em eficiência de desempenho.",
      },
      {
        id: "e",
        text: "Elasticidade",
        isCorrect: false,
        explanation:
          "Multi-AZ não está diretamente relacionado à elasticidade, que é a capacidade de escalar automaticamente.",
      },
    ],
    category: "architecture-design",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/rds/features/multi-az/"],
  },
  {
    id: "q36",
    type: "single_choice",
    text: "Uma empresa está armazenando dados confidenciais de clientes em um bucket do Amazon S3. A empresa deseja proteger os dados contra exclusão ou substituição acidental. Qual recurso do S3 a empresa deve usar para atender a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Regras do ciclo de vida",
        isCorrect: false,
        explanation:
          "Regras do ciclo de vida são usadas para gerenciar a transição e expiração de objetos, não para proteção contra exclusão.",
      },
      {
        id: "b",
        text: "Versionamento",
        isCorrect: true,
        explanation:
          "O versionamento do S3 mantém múltiplas variantes de um objeto, protegendo contra exclusões e substituições acidentais.",
      },
      {
        id: "c",
        text: "Políticas de bucket",
        isCorrect: false,
        explanation:
          "Políticas de bucket controlam acesso, mas não protegem contra exclusão acidental por usuários autorizados.",
      },
      {
        id: "d",
        text: "Criptografia do lado do servidor",
        isCorrect: false,
        explanation:
          "Criptografia protege a confidencialidade dos dados, não contra exclusão acidental.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html",
    ],
  },
  {
    id: "q37",
    type: "single_choice",
    text: "Qual das seguintes classes de armazenamento S3 leva mais tempo para recuperar dados (também conhecido como latência do primeiro byte)?",
    options: [
      {
        id: "a",
        text: "S3 Glacier Deep Archive",
        isCorrect: true,
        explanation:
          "S3 Glacier Deep Archive tem o maior tempo de recuperação (até 48 horas), mas é a opção mais econômica para arquivamento de longo prazo.",
      },
      {
        id: "b",
        text: "S3 Intelligent-Tiering",
        isCorrect: false,
        explanation:
          "S3 Intelligent-Tiering oferece acesso em milissegundos e move automaticamente objetos entre níveis de acesso.",
      },
      {
        id: "c",
        text: "S3 Glacier",
        isCorrect: false,
        explanation:
          "S3 Glacier tem tempos de recuperação mais longos que o Standard, mas mais curtos que o Deep Archive.",
      },
      {
        id: "d",
        text: "S3 Standard",
        isCorrect: false,
        explanation:
          "S3 Standard oferece latência muito baixa e alta disponibilidade para acesso frequente.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/storage-classes/"],
  },
  {
    id: "q38",
    type: "multiple_choice",
    text: "Qual a finalidade dos pontos de presença da AWS? (Escolha duas.)",
    options: [
      {
        id: "a",
        text: "Hospedagem de aplicativos",
        isCorrect: false,
        explanation:
          "Pontos de presença não são usados para hospedagem de aplicativos.",
      },
      {
        id: "b",
        text: "Oferecer conteúdo mais próximo dos usuários",
        isCorrect: true,
        explanation:
          "Pontos de presença ajudam a entregar conteúdo com menor latência aos usuários finais.",
      },
      {
        id: "c",
        text: "Redução de tráfego no servidor, armazenando respostas em cache",
        isCorrect: true,
        explanation:
          "Pontos de presença armazenam conteúdo em cache para melhorar o desempenho e reduzir a carga nos servidores de origem.",
      },
      {
        id: "d",
        text: "Execução de serviços de armazenamento em cache do banco de dados NoSQL",
        isCorrect: false,
        explanation:
          "Pontos de presença não são usados para cache de banco de dados NoSQL.",
      },
      {
        id: "e",
        text: "Envio de mensagens de notificação para usuários finais",
        isCorrect: false,
        explanation:
          "Pontos de presença não são usados para envio de notificações.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudfront/features/"],
  },
  {
    id: "q39",
    type: "single_choice",
    text: "Uma plataforma de e-learning precisa executar um aplicativo durante 2 meses por ano. O aplicativo será implantado em instâncias do Amazon EC2. Qualquer tempo de inatividade do aplicativo durante esses 2 meses deve ser evitado. Qual opção de compra do EC2 atenderá a esses requisitos de maneira MAIS econômica?",
    options: [
      {
        id: "a",
        text: "Instâncias Reservadas",
        isCorrect: false,
        explanation:
          "Instâncias Reservadas são mais econômicas para uso contínuo de 1 ou 3 anos, não para uso sazonal.",
      },
      {
        id: "b",
        text: "Hosts Dedicados",
        isCorrect: false,
        explanation:
          "Hosts Dedicados são mais caros e usados quando você precisa de hardware dedicado.",
      },
      {
        id: "c",
        text: "Instâncias Spot",
        isCorrect: false,
        explanation:
          "Instâncias Spot podem ser interrompidas e não são adequadas quando o tempo de inatividade deve ser evitado.",
      },
      {
        id: "d",
        text: "Instâncias Sob Demanda",
        isCorrect: true,
        explanation:
          "Instâncias Sob Demanda são a melhor opção para cargas de trabalho de curto prazo que precisam de disponibilidade garantida.",
      },
    ],
    category: "compute",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/pricing/"],
  },
  {
    id: "q40",
    type: "single_choice",
    text: "Uma empresa está executando uma aplicação web no Amazon EC2 e deseja monitorar a utilização da CPU. Qual serviço da AWS deve ser usado?",
    options: [
      {
        id: "a",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "CloudTrail é usado para registrar atividades de API, não para monitorar métricas de recursos.",
      },
      {
        id: "b",
        text: "Amazon CloudWatch",
        isCorrect: true,
        explanation:
          "Amazon CloudWatch é o serviço de monitoramento que coleta e rastreia métricas, incluindo utilização de CPU.",
      },
      {
        id: "c",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "AWS Config é usado para avaliar e auditar configurações de recursos, não para monitoramento de métricas.",
      },
      {
        id: "d",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é usado para análise de segurança automatizada, não para monitoramento de recursos.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/cloudwatch/features/"],
  },
  {
    id: "q41",
    type: "single_choice",
    text: "Uma empresa precisa de uma solução de banco de dados que ofereça alta disponibilidade e failover automático. Qual configuração do Amazon RDS atende a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Implantação Multi-AZ",
        isCorrect: true,
        explanation:
          "A implantação Multi-AZ do RDS fornece alta disponibilidade e failover automático para o banco de dados standby em outra zona de disponibilidade.",
      },
      {
        id: "b",
        text: "Réplicas de leitura",
        isCorrect: false,
        explanation:
          "Réplicas de leitura são usadas para melhorar o desempenho de leitura, não para alta disponibilidade automática.",
      },
      {
        id: "c",
        text: "Snapshots de banco de dados",
        isCorrect: false,
        explanation:
          "Snapshots são usados para backup e recuperação, não para alta disponibilidade.",
      },
      {
        id: "d",
        text: "Grupos de segurança",
        isCorrect: false,
        explanation:
          "Grupos de segurança controlam o acesso ao banco de dados, não fornecem alta disponibilidade.",
      },
    ],
    category: "database",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/rds/features/multi-az/"],
  },
  {
    id: "q42",
    type: "multiple_choice",
    text: "Quais são os benefícios do AWS Organizations? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Gerenciamento centralizado de todas as suas contas AWS",
        isCorrect: true,
        explanation:
          "AWS Organizations permite gerenciar centralmente múltiplas contas AWS.",
      },
      {
        id: "b",
        text: "Configuração automática de Multi-AZ para todos os recursos",
        isCorrect: false,
        explanation:
          "AWS Organizations não configura automaticamente Multi-AZ.",
      },
      {
        id: "c",
        text: "Faturamento consolidado para todas as contas AWS",
        isCorrect: true,
        explanation:
          "AWS Organizations permite consolidar o faturamento de todas as contas AWS membro.",
      },
      {
        id: "d",
        text: "Backup automático de todos os dados em todas as contas",
        isCorrect: false,
        explanation: "AWS Organizations não gerencia backups automaticamente.",
      },
      {
        id: "e",
        text: "Monitoramento de performance em tempo real",
        isCorrect: false,
        explanation:
          "AWS Organizations não fornece monitoramento de performance.",
      },
    ],
    category: "management",
    dominio: "Domínio 1: Conceitos de Nuvem",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/features/"],
  },
  {
    id: "q43",
    type: "single_choice",
    text: "Uma empresa precisa de uma solução de armazenamento para arquivos que são acessados com pouca frequência, mas precisam estar disponíveis imediatamente quando necessário. Qual classe de armazenamento do Amazon S3 é a MAIS adequada?",
    options: [
      {
        id: "a",
        text: "S3 Standard",
        isCorrect: false,
        explanation:
          "S3 Standard é otimizado para dados acessados frequentemente, sendo mais caro para dados raramente acessados.",
      },
      {
        id: "b",
        text: "S3 Glacier",
        isCorrect: false,
        explanation:
          "S3 Glacier tem tempos de recuperação longos e é mais adequado para arquivamento.",
      },
      {
        id: "c",
        text: "S3 Standard-IA",
        isCorrect: true,
        explanation:
          "S3 Standard-IA (Infrequent Access) é ideal para dados acessados com menos frequência, mas que precisam estar disponíveis imediatamente quando necessário.",
      },
      {
        id: "d",
        text: "S3 Glacier Deep Archive",
        isCorrect: false,
        explanation:
          "S3 Glacier Deep Archive tem o maior tempo de recuperação e é usado para arquivamento de longo prazo.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/storage-classes/"],
  },
  {
    id: "q44",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon CloudFront? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Redução da latência para entrega de conteúdo",
        isCorrect: true,
        explanation:
          "CloudFront usa uma rede global de pontos de presença para reduzir a latência na entrega de conteúdo.",
      },
      {
        id: "b",
        text: "Backup automático de dados",
        isCorrect: false,
        explanation: "CloudFront não fornece backup automático de dados.",
      },
      {
        id: "c",
        text: "Proteção contra ataques DDoS",
        isCorrect: true,
        explanation:
          "CloudFront, integrado com AWS Shield, fornece proteção contra ataques DDoS.",
      },
      {
        id: "d",
        text: "Gerenciamento de banco de dados",
        isCorrect: false,
        explanation: "CloudFront não gerencia bancos de dados.",
      },
      {
        id: "e",
        text: "Hospedagem de aplicativos serverless",
        isCorrect: false,
        explanation:
          "CloudFront não hospeda aplicativos serverless, isso é função do AWS Lambda.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudfront/features/"],
  },
  {
    id: "q45",
    type: "single_choice",
    text: "Qual serviço da AWS pode ser usado para criar uma conexão privada dedicada de um data center local para a AWS?",
    options: [
      {
        id: "a",
        text: "Amazon VPC",
        isCorrect: false,
        explanation:
          "Amazon VPC é usado para criar redes virtuais isoladas na AWS, não para conexões dedicadas com data centers locais.",
      },
      {
        id: "b",
        text: "AWS Direct Connect",
        isCorrect: true,
        explanation:
          "AWS Direct Connect estabelece uma conexão de rede dedicada entre seu data center e a AWS.",
      },
      {
        id: "c",
        text: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "Amazon Route 53 é um serviço de DNS, não para conexões dedicadas.",
      },
      {
        id: "d",
        text: "AWS VPN",
        isCorrect: false,
        explanation:
          "AWS VPN cria uma conexão criptografada através da internet, não uma conexão dedicada.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/directconnect/features/"],
  },
  {
    id: "q46",
    type: "single_choice",
    text: "Qual serviço da Nuvem AWS pode enviar alertas aos clientes se os limites de gastos personalizados forem excedidos?",
    options: [
      {
        id: "a",
        text: "AWS Budgets",
        isCorrect: true,
        explanation:
          "AWS Budgets permite definir limites de gastos personalizados e receber alertas quando esses limites são excedidos.",
      },
      {
        id: "b",
        text: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "Cost Explorer é usado para análise de custos, não para alertas de gastos.",
      },
      {
        id: "c",
        text: "AWS Cost Allocation Tags",
        isCorrect: false,
        explanation:
          "Cost Allocation Tags são usadas para organizar recursos e custos, não para alertas.",
      },
      {
        id: "d",
        text: "AWS Organizations",
        isCorrect: false,
        explanation:
          "AWS Organizations é usado para gerenciar múltiplas contas AWS, não para alertas de gastos.",
      },
    ],
    category: "billing-and-pricing",
    dominio: "Domínio 4: Faturamento e Preços",
    difficulty: "easy",
    references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
  },
  {
    id: "q47",
    type: "single_choice",
    text: "Qual serviço da AWS fornece recomendações para otimizar custos e melhorar a segurança?",
    options: [
      {
        id: "a",
        text: "AWS Trusted Advisor",
        isCorrect: true,
        explanation:
          "AWS Trusted Advisor fornece recomendações em tempo real para otimizar seu ambiente AWS em termos de custo, segurança, desempenho e tolerância a falhas.",
      },
      {
        id: "b",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é focado apenas em avaliações de segurança automatizadas.",
      },
      {
        id: "c",
        text: "AWS Config",
        isCorrect: false,
        explanation:
          "AWS Config é usado para avaliar e auditar configurações de recursos, não para fornecer recomendações de otimização.",
      },
      {
        id: "d",
        text: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "AWS CloudTrail é usado para registro e monitoramento de atividades de API, não para recomendações.",
      },
    ],
    category: "management",
    dominio: "Domínio 4: Faturamento e Preços",
    difficulty: "easy",
    references: [
      "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/",
    ],
  },
  {
    id: "q48",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon DynamoDB? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Escalabilidade automática",
        isCorrect: true,
        explanation:
          "DynamoDB escala automaticamente para lidar com aumentos de tráfego sem necessidade de intervenção.",
      },
      {
        id: "b",
        text: "Suporte a SQL complexo",
        isCorrect: false,
        explanation:
          "DynamoDB é um banco de dados NoSQL e não suporta SQL complexo.",
      },
      {
        id: "c",
        text: "Latência consistente de milissegundos",
        isCorrect: true,
        explanation:
          "DynamoDB oferece consistentemente latência de milissegundos para operações de leitura e gravação.",
      },
      {
        id: "d",
        text: "Armazenamento ilimitado de arquivos",
        isCorrect: false,
        explanation:
          "DynamoDB é um banco de dados NoSQL, não um serviço de armazenamento de arquivos.",
      },
      {
        id: "e",
        text: "Hospedagem de aplicativos web",
        isCorrect: false,
        explanation:
          "DynamoDB é um banco de dados, não um serviço de hospedagem de aplicativos.",
      },
    ],
    category: "database",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/dynamodb/features/"],
  },
  {
    id: "q49",
    type: "single_choice",
    text: "Uma empresa de mídia social deseja proteger seu aplicativo Web contra explorações comuns da Web, como injeções de SQL e scripts entre sites. Qual serviço da AWS atenderá a esses requisitos?",
    options: [
      {
        id: "a",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é usado para avaliação de vulnerabilidades em instâncias EC2, não para proteção de aplicativos web.",
      },
      {
        id: "b",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "AWS WAF (Web Application Firewall) protege aplicativos web contra explorações comuns como injeção SQL e XSS.",
      },
      {
        id: "c",
        text: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "Amazon GuardDuty é um serviço de detecção de ameaças, não um firewall de aplicativo web.",
      },
      {
        id: "d",
        text: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "Amazon CloudWatch é um serviço de monitoramento, não um serviço de segurança para aplicativos web.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "q50",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon RDS? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Backups automatizados",
        isCorrect: true,
        explanation:
          "Amazon RDS oferece backups automatizados configuráveis do seu banco de dados.",
      },
      {
        id: "b",
        text: "Hospedagem de sites estáticos",
        isCorrect: false,
        explanation:
          "RDS é um serviço de banco de dados, não para hospedagem de sites.",
      },
      {
        id: "c",
        text: "Gerenciamento automatizado de patches",
        isCorrect: true,
        explanation:
          "RDS gerencia automaticamente patches do sistema operacional e do banco de dados.",
      },
      {
        id: "d",
        text: "Processamento de big data",
        isCorrect: false,
        explanation:
          "RDS é um serviço de banco de dados relacional, não otimizado para processamento de big data.",
      },
      {
        id: "e",
        text: "Armazenamento de arquivos em grande escala",
        isCorrect: false,
        explanation:
          "RDS é para bancos de dados relacionais, não para armazenamento de arquivos em grande escala.",
      },
    ],
    category: "database",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/rds/features/"],
  },
  {
    id: "q51",
    type: "single_choice",
    text: "Qual serviço da AWS deve ser usado para criar uma VPN site-to-site entre um data center on-premises e a AWS?",
    options: [
      {
        id: "a",
        text: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "AWS Direct Connect é para conexões de rede dedicadas, não para VPN.",
      },
      {
        id: "b",
        text: "Amazon VPC",
        isCorrect: false,
        explanation:
          "Amazon VPC é usado para criar redes virtuais isoladas, não para criar VPNs.",
      },
      {
        id: "c",
        text: "AWS Site-to-Site VPN",
        isCorrect: true,
        explanation:
          "AWS Site-to-Site VPN cria uma conexão VPN segura e criptografada entre sua rede on-premises e a VPC.",
      },
      {
        id: "d",
        text: "AWS Transit Gateway",
        isCorrect: false,
        explanation:
          "AWS Transit Gateway é um hub de rede que conecta VPCs e redes on-premises, mas não cria a VPN em si.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/vpn/features/"],
  },
  {
    id: "q52",
    type: "single_choice",
    text: "Qual serviço da AWS oferece armazenamento de objetos altamente durável?",
    options: [
      {
        id: "a",
        text: "Amazon S3",
        isCorrect: true,
        explanation:
          "Amazon S3 oferece armazenamento de objetos altamente durável, com 99,999999999% (11 noves) de durabilidade.",
      },
      {
        id: "b",
        text: "Amazon Elastic File System (Amazon EFS)",
        isCorrect: false,
        explanation:
          "Amazon EFS é um sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
      },
      {
        id: "c",
        text: "Amazon Elastic Block Store (Amazon EBS)",
        isCorrect: false,
        explanation:
          "Amazon EBS é um serviço de armazenamento em bloco, não um serviço de armazenamento de objetos.",
      },
      {
        id: "d",
        text: "Amazon FSx",
        isCorrect: false,
        explanation:
          "Amazon FSx é um serviço de sistema de arquivos gerenciado, não um serviço de armazenamento de objetos.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "q53",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon CloudWatch? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Monitoramento de recursos em tempo real",
        isCorrect: true,
        explanation:
          "CloudWatch fornece monitoramento em tempo real dos recursos da AWS.",
      },
      {
        id: "b",
        text: "Gerenciamento de banco de dados",
        isCorrect: false,
        explanation:
          "CloudWatch é para monitoramento, não para gerenciamento de banco de dados.",
      },
      {
        id: "c",
        text: "Configuração de alarmes automatizados",
        isCorrect: true,
        explanation:
          "CloudWatch permite configurar alarmes que notificam e tomam ações automaticamente.",
      },
      {
        id: "d",
        text: "Hospedagem de aplicativos",
        isCorrect: false,
        explanation:
          "CloudWatch é para monitoramento, não para hospedagem de aplicativos.",
      },
      {
        id: "e",
        text: "Backup de dados",
        isCorrect: false,
        explanation:
          "CloudWatch é para monitoramento, não para backup de dados.",
      },
    ],
    category: "management",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudwatch/features/"],
  },
  {
    id: "q54",
    type: "single_choice",
    text: "Qual serviço da AWS deve ser usado para criar um pipeline de integração e entrega contínua (CI/CD)?",
    options: [
      {
        id: "a",
        text: "AWS CodePipeline",
        isCorrect: true,
        explanation:
          "AWS CodePipeline é um serviço de entrega contínua que automatiza as fases de lançamento para entrega rápida e confiável de aplicativos e atualizações.",
      },
      {
        id: "b",
        text: "Amazon EC2",
        isCorrect: false,
        explanation:
          "Amazon EC2 é um serviço de computação, não um serviço de CI/CD.",
      },
      {
        id: "c",
        text: "Amazon S3",
        isCorrect: false,
        explanation:
          "Amazon S3 é um serviço de armazenamento, não um serviço de CI/CD.",
      },
      {
        id: "d",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço de computação serverless, não um serviço de CI/CD.",
      },
    ],
    category: "developer_tools",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/codepipeline/features/"],
  },
  {
    id: "q55",
    type: "single_choice",
    text: "Uma empresa precisa de uma solução para executar análises complexas em grandes conjuntos de dados. Qual serviço da AWS é MAIS adequado para essa necessidade?",
    options: [
      {
        id: "a",
        text: "Amazon Redshift",
        isCorrect: true,
        explanation:
          "Amazon Redshift é um data warehouse totalmente gerenciado que permite analisar grandes volumes de dados usando SQL padrão.",
      },
      {
        id: "b",
        text: "Amazon RDS",
        isCorrect: false,
        explanation:
          "Amazon RDS é um banco de dados relacional para aplicações, não otimizado para análise de grandes conjuntos de dados.",
      },
      {
        id: "c",
        text: "Amazon DynamoDB",
        isCorrect: false,
        explanation:
          "Amazon DynamoDB é um banco de dados NoSQL, não projetado para análises complexas em grandes conjuntos de dados.",
      },
      {
        id: "d",
        text: "Amazon ElastiCache",
        isCorrect: false,
        explanation:
          "Amazon ElastiCache é um serviço de cache em memória, não para análise de dados.",
      },
    ],
    category: "analytics",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/redshift/features/"],
  },
  {
    id: "q56",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon Route 53? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Roteamento baseado em latência",
        isCorrect: true,
        explanation:
          "Route 53 pode rotear o tráfego para o endpoint com menor latência para o usuário.",
      },
      {
        id: "b",
        text: "Armazenamento de arquivos",
        isCorrect: false,
        explanation:
          "Route 53 é um serviço de DNS, não para armazenamento de arquivos.",
      },
      {
        id: "c",
        text: "Alta disponibilidade e failover automático",
        isCorrect: true,
        explanation:
          "Route 53 oferece verificações de integridade e failover automático para alta disponibilidade.",
      },
      {
        id: "d",
        text: "Processamento de imagens",
        isCorrect: false,
        explanation: "Route 53 é um serviço de DNS, não processa imagens.",
      },
      {
        id: "e",
        text: "Hospedagem de banco de dados",
        isCorrect: false,
        explanation:
          "Route 53 é um serviço de DNS, não hospeda bancos de dados.",
      },
    ],
    category: "networking",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/route53/features/"],
  },
  {
    id: "q57",
    type: "single_choice",
    text: "Qual serviço da AWS deve ser usado para enviar notificações por e-mail ou SMS para usuários?",
    options: [
      {
        id: "a",
        text: "Amazon SNS",
        isCorrect: true,
        explanation:
          "Amazon Simple Notification Service (SNS) é um serviço de mensagens pub/sub totalmente gerenciado para envio de notificações.",
      },
      {
        id: "b",
        text: "Amazon SQS",
        isCorrect: false,
        explanation:
          "Amazon SQS é um serviço de filas de mensagens, não otimizado para envio de notificações para usuários finais.",
      },
      {
        id: "c",
        text: "Amazon SES",
        isCorrect: false,
        explanation:
          "Amazon SES é para envio de e-mails em massa, mas não suporta SMS e não é otimizado para notificações em tempo real.",
      },
      {
        id: "d",
        text: "AWS Lambda",
        isCorrect: false,
        explanation:
          "AWS Lambda é um serviço de computação serverless, não um serviço de notificação.",
      },
    ],
    category: "application_integration",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/sns/features/"],
  },
  {
    id: "q58",
    type: "single_choice",
    text: "Uma empresa precisa de uma solução para armazenar e recuperar qualquer quantidade de dados de qualquer lugar. Qual serviço da AWS é MAIS adequado para essa necessidade?",
    options: [
      {
        id: "a",
        text: "Amazon S3",
        isCorrect: true,
        explanation:
          "Amazon S3 é um serviço de armazenamento de objetos projetado para armazenar e recuperar qualquer quantidade de dados de qualquer lugar.",
      },
      {
        id: "b",
        text: "Amazon EBS",
        isCorrect: false,
        explanation:
          "Amazon EBS é um armazenamento em bloco anexado a instâncias EC2, não é acessível globalmente.",
      },
      {
        id: "c",
        text: "Amazon EFS",
        isCorrect: false,
        explanation:
          "Amazon EFS é um sistema de arquivos compartilhado para EC2, não é otimizado para acesso global.",
      },
      {
        id: "d",
        text: "AWS Storage Gateway",
        isCorrect: false,
        explanation:
          "AWS Storage Gateway é para integrar armazenamento on-premises com a nuvem, não é a melhor opção para armazenamento direto na nuvem.",
      },
    ],
    category: "storage",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/features/"],
  },
  {
    id: "q59",
    type: "multiple_choice",
    text: "Quais são os benefícios do Amazon EC2 Auto Scaling? (Escolha dois.)",
    options: [
      {
        id: "a",
        text: "Escalabilidade automática baseada em demanda",
        isCorrect: true,
        explanation:
          "EC2 Auto Scaling ajusta automaticamente o número de instâncias EC2 com base na demanda.",
      },
      {
        id: "b",
        text: "Backup automático de dados",
        isCorrect: false,
        explanation:
          "EC2 Auto Scaling não faz backup de dados, isso é função de outros serviços.",
      },
      {
        id: "c",
        text: "Melhor disponibilidade da aplicação",
        isCorrect: true,
        explanation:
          "EC2 Auto Scaling mantém a disponibilidade da aplicação substituindo instâncias não saudáveis.",
      },
      {
        id: "d",
        text: "Criptografia de dados em repouso",
        isCorrect: false,
        explanation: "EC2 Auto Scaling não lida com criptografia de dados.",
      },
      {
        id: "e",
        text: "Gerenciamento de banco de dados",
        isCorrect: false,
        explanation: "EC2 Auto Scaling não gerencia bancos de dados.",
      },
    ],
    category: "compute",
    dominio: "Domínio 3: Tecnologia",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/autoscaling/features/"],
  },
  {
    id: "q60",
    type: "single_choice",
    text: "Qual serviço da AWS ajuda a proteger aplicativos web contra ataques comuns na web?",
    options: [
      {
        id: "a",
        text: "AWS WAF",
        isCorrect: true,
        explanation:
          "AWS WAF é um firewall de aplicativo web que ajuda a proteger seus aplicativos web contra exploits comuns.",
      },
      {
        id: "b",
        text: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Amazon Inspector é para avaliação de segurança automatizada de aplicações, não para proteção ativa contra ataques.",
      },
      {
        id: "c",
        text: "AWS Shield",
        isCorrect: false,
        explanation:
          "AWS Shield é focado em proteção contra DDoS, não contra outros tipos de ataques web.",
      },
      {
        id: "d",
        text: "Security Groups",
        isCorrect: false,
        explanation:
          "Security Groups são firewalls de nível de instância, não específicos para proteção de aplicativos web.",
      },
    ],
    category: "security",
    dominio: "Domínio 2: Segurança e Conformidade",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/features/"],
  },
];

export default questions;
