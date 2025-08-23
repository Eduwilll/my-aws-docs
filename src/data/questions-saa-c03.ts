import type { Question } from "@/lib/types/questions";

export const questionsSaaC03: Question[] = [
  {
    id: "CLF-C02-CC-01",
    text: "Qual princípio de arquitetura em nuvem descreve a capacidade de adquirir recursos de computação conforme necessário e liberá-los quando não são mais necessários?",
    text_en:
      "Which cloud architecture principle describes the ability to acquire computing resources as you need them and release them when you no longer need them?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elasticidade",
        text_en: "Elasticity",
        isCorrect: true,
        explanation:
          "Elasticidade é a capacidade de aumentar ou diminuir os recursos de computação para atender à demanda. Isso se alinha perfeitamente com o conceito de adquirir recursos quando necessário e liberá-los depois.",
        explanation_en:
          "Elasticity is the ability to scale computing resources up or down to meet demand. This aligns perfectly with the concept of acquiring resources when needed and releasing them afterward.",
      },
      {
        id: "B",
        text: "Agilidade",
        text_en: "Agility",
        isCorrect: false,
        explanation:
          "Agilidade refere-se à velocidade com que os recursos podem ser provisionados, permitindo que as empresas inovem e desenvolvam mais rapidamente. Embora relacionado, não descreve especificamente o ato de adquirir e liberar recursos com base na demanda.",
        explanation_en:
          "Agility refers to the speed at which resources can be provisioned, allowing businesses to innovate and develop faster. While related, it doesn't specifically describe the act of acquiring and releasing resources based on demand.",
      },
      {
        id: "C",
        text: "Alta Disponibilidade",
        text_en: "High Availability",
        isCorrect: false,
        explanation:
          "Alta disponibilidade refere-se à capacidade de um sistema de operar continuamente sem falhas por um longo período. Trata-se de resiliência, não de provisionamento dinâmico de recursos.",
        explanation_en:
          "High availability refers to a system's ability to operate continuously without failure for a long time. It is about resilience, not dynamic resource provisioning.",
      },
      {
        id: "D",
        text: "Economias de Escala",
        text_en: "Economies of Scale",
        isCorrect: false,
        explanation:
          "Economias de escala é o benefício de custo que a AWS repassa aos clientes devido à sua enorme escala de operações. Não é um princípio de arquitetura relacionado ao provisionamento de recursos.",
        explanation_en:
          "Economies of scale is the cost benefit that AWS passes on to customers due to its massive scale of operations. It is not an architectural principle related to resource provisioning.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-SC-02",
    text: "De acordo com o Modelo de Responsabilidade Compartilhada da AWS, qual das seguintes opções é uma responsabilidade do cliente?",
    text_en:
      "According to the AWS Shared Responsibility Model, which of the following is a customer's responsibility?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Gerenciar o hardware físico dos servidores.",
        text_en: "Managing the physical hardware of the servers.",
        isCorrect: false,
        explanation:
          "A AWS é responsável pela segurança 'da' nuvem, o que inclui o gerenciamento do hardware físico, redes e instalações que executam os serviços da AWS.",
        explanation_en:
          "AWS is responsible for the security 'of' the cloud, which includes managing the physical hardware, networking, and facilities that run AWS services.",
      },
      {
        id: "B",
        text: "Configurar grupos de segurança e listas de controle de acesso à rede (NACLs).",
        text_en:
          "Configuring security groups and network access control lists (NACLs).",
        isCorrect: true,
        explanation:
          "O cliente é responsável pela segurança 'na' nuvem. Isso inclui a configuração de firewalls como grupos de segurança e NACLs para controlar o tráfego de e para seus recursos, como instâncias EC2.",
        explanation_en:
          "The customer is responsible for security 'in' the cloud. This includes configuring firewalls like security groups and NACLs to control traffic to and from their resources, such as EC2 instances.",
      },
      {
        id: "C",
        text: "Aplicar patches no hipervisor do Amazon EC2.",
        text_en: "Patching the Amazon EC2 hypervisor.",
        isCorrect: false,
        explanation:
          "O hipervisor é parte da infraestrutura de virtualização gerenciada pela AWS. A AWS é responsável por aplicar patches e manter o hipervisor.",
        explanation_en:
          "The hypervisor is part of the virtualization infrastructure managed by AWS. AWS is responsible for patching and maintaining the hypervisor.",
      },
      {
        id: "D",
        text: "Gerenciar a infraestrutura de Borda (Edge) global.",
        text_en: "Managing the global Edge infrastructure.",
        isCorrect: false,
        explanation:
          "A infraestrutura global, incluindo Regiões, Zonas de Disponibilidade e Localizações de Borda, é gerenciada inteiramente pela AWS.",
        explanation_en:
          "The global infrastructure, including Regions, Availability Zones, and Edge Locations, is managed entirely by AWS.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-TS-03",
    text: "Uma empresa precisa de um local centralizado para armazenar e versionar artefatos, como documentos, código-fonte e arquivos de imagem. Qual serviço da AWS é o mais adequado para essa finalidade?",
    text_en:
      "A company needs a centralized place to store and version artifacts like documents, source code, and image files. Which AWS service is best suited for this purpose?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon EBS (Elastic Block Store)",
        text_en: "Amazon EBS (Elastic Block Store)",
        isCorrect: false,
        explanation:
          "O Amazon EBS fornece volumes de armazenamento em nível de bloco para uso com instâncias EC2. Não é um serviço de armazenamento de objetos projetado para versionamento e acesso centralizado de arquivos como o S3.",
        explanation_en:
          "Amazon EBS provides block-level storage volumes for use with EC2 instances. It is not an object storage service designed for versioning and centralized file access like S3.",
      },
      {
        id: "B",
        text: "Amazon S3 (Simple Storage Service)",
        text_en: "Amazon S3 (Simple Storage Service)",
        isCorrect: true,
        explanation:
          "O Amazon S3 é um serviço de armazenamento de objetos que oferece escalabilidade, disponibilidade de dados, segurança e desempenho. É ideal para armazenar qualquer quantidade de dados, como arquivos e artefatos, e suporta nativamente o versionamento de objetos.",
        explanation_en:
          "Amazon S3 is an object storage service offering scalability, data availability, security, and performance. It is ideal for storing any amount of data, like files and artifacts, and natively supports object versioning.",
      },
      {
        id: "C",
        text: "Amazon RDS (Relational Database Service)",
        text_en: "Amazon RDS (Relational Database Service)",
        isCorrect: false,
        explanation:
          "O Amazon RDS é um serviço de banco de dados relacional gerenciado. É usado para dados estruturados, não para armazenar arquivos ou artefatos não estruturados.",
        explanation_en:
          "Amazon RDS is a managed relational database service. It is used for structured data, not for storing unstructured files or artifacts.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway",
        text_en: "AWS Storage Gateway",
        isCorrect: false,
        explanation:
          "O AWS Storage Gateway é um serviço híbrido que conecta um appliance de software local ao armazenamento baseado em nuvem. Não é o serviço de armazenamento principal em si.",
        explanation_en:
          "AWS Storage Gateway is a hybrid service that connects an on-premises software appliance with cloud-based storage. It is not the primary storage service itself.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "CLF-C02-BP-04",
    text: "Qual ferramenta da AWS pode ser usada para visualizar, entender e gerenciar seus custos e uso da AWS ao longo do tempo?",
    text_en:
      "Which AWS tool can be used to visualize, understand, and manage your AWS costs and usage over time?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O AWS Trusted Advisor fornece recomendações para otimização de custos, desempenho, segurança e tolerância a falhas, mas não é a ferramenta principal para visualizar e analisar o histórico de custos.",
        explanation_en:
          "AWS Trusted Advisor provides recommendations for cost optimization, performance, security, and fault tolerance, but it is not the primary tool for visualizing and analyzing cost history.",
      },
      {
        id: "B",
        text: "AWS Budgets",
        text_en: "AWS Budgets",
        isCorrect: false,
        explanation:
          "O AWS Budgets é usado para definir orçamentos personalizados e alertá-lo quando seus custos ou uso excedem (ou estão previstos para exceder) seu orçamento. Ele não fornece as capacidades de visualização detalhada do Cost Explorer.",
        explanation_en:
          "AWS Budgets is used to set custom budgets and alert you when your costs or usage exceed (or are forecasted to exceed) your budget. It does not provide the detailed visualization capabilities of Cost Explorer.",
      },
      {
        id: "C",
        text: "AWS Cost Explorer",
        text_en: "AWS Cost Explorer",
        isCorrect: true,
        explanation:
          "O AWS Cost Explorer possui uma interface fácil de usar que permite visualizar, entender e gerenciar seus custos e uso da AWS ao longo do tempo, usando gráficos e relatórios detalhados.",
        explanation_en:
          "AWS Cost Explorer has an easy-to-use interface that lets you visualize, understand, and manage your AWS costs and usage over time using graphs and detailed reports.",
      },
      {
        id: "D",
        text: "AWS Organizations",
        text_en: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations ajuda a gerenciar e governar centralmente seu ambiente à medida que você cresce e escala seus recursos da AWS. Ele permite o faturamento consolidado, mas a ferramenta de visualização de custos é o Cost Explorer.",
        explanation_en:
          "AWS Organizations helps you centrally govern and manage your environment as you grow and scale your AWS resources. It allows for consolidated billing, but the cost visualization tool is Cost Explorer.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "easy",
    references: [
      "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
    ],
  },
  {
    id: "CLF-C02-TS-05",
    text: "Uma empresa deseja distribuir o tráfego de entrada de seu site por várias instâncias EC2 em diferentes Zonas de Disponibilidade. Qual serviço da AWS deve ser usado para alcançar alta disponibilidade e distribuição de carga?",
    text_en:
      "A company wants to distribute incoming website traffic across multiple EC2 instances in different Availability Zones. Which AWS service should be used to achieve high availability and load distribution?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Route 53",
        text_en: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço de DNS que direciona os usuários para endpoints da Internet. Embora possa ser usado para balanceamento de carga em um nível de DNS, o Elastic Load Balancing é projetado especificamente para distribuir tráfego entre instâncias.",
        explanation_en:
          "Amazon Route 53 is a DNS service that routes users to internet endpoints. While it can be used for load balancing at a DNS level, Elastic Load Balancing is specifically designed for distributing traffic among instances.",
      },
      {
        id: "B",
        text: "Elastic Load Balancing (ELB)",
        text_en: "Elastic Load Balancing (ELB)",
        isCorrect: true,
        explanation:
          "O Elastic Load Balancing distribui automaticamente o tráfego de entrada de aplicativos por vários destinos, como instâncias Amazon EC2, em várias Zonas de Disponibilidade. Isso aumenta a tolerância a falhas de suas aplicações.",
        explanation_en:
          "Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, across multiple Availability Zones. This increases the fault tolerance of your applications.",
      },
      {
        id: "C",
        text: "Amazon CloudFront",
        text_en: "Amazon CloudFront",
        isCorrect: false,
        explanation:
          "O Amazon CloudFront é uma rede de entrega de conteúdo (CDN) que armazena em cache o conteúdo mais perto dos usuários para reduzir a latência. Embora distribua conteúdo, sua principal função não é o balanceamento de carga para instâncias EC2.",
        explanation_en:
          "Amazon CloudFront is a content delivery network (CDN) that caches content closer to users to reduce latency. While it distributes content, its primary function is not load balancing for EC2 instances.",
      },
      {
        id: "D",
        text: "AWS Auto Scaling",
        text_en: "AWS Auto Scaling",
        isCorrect: false,
        explanation:
          "O AWS Auto Scaling monitora suas aplicações e ajusta automaticamente a capacidade para manter um desempenho estável e previsível com o menor custo possível. Ele funciona em conjunto com o ELB, mas não distribui o tráfego por si só.",
        explanation_en:
          "AWS Auto Scaling monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. It works in conjunction with ELB but does not distribute the traffic itself.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/elasticloadbalancing/"],
  },
  {
    id: "CLF-C02-SC-06",
    text: "Qual serviço da AWS ajuda a proteger suas aplicações web ou APIs contra exploits da web comuns e bots que podem afetar a disponibilidade, comprometer a segurança ou consumir recursos em excesso?",
    text_en:
      "Which AWS service helps protect your web applications or APIs against common web exploits and bots that may affect availability, compromise security, or consume excessive resources?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        text_en: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield é um serviço gerenciado de proteção contra DDoS (Negação de Serviço Distribuída). Embora ajude na disponibilidade, ele se concentra em ataques de camada de rede e transporte, não em exploits da web como injeção de SQL.",
        explanation_en:
          "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service. While it helps with availability, it focuses on network and transport layer attacks, not web exploits like SQL injection.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        text_en: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "O Amazon Inspector é um serviço de gerenciamento de vulnerabilidades que varre continuamente suas cargas de trabalho da AWS em busca de vulnerabilidades de software e exposição não intencional da rede.",
        explanation_en:
          "Amazon Inspector is a vulnerability management service that continuously scans your AWS workloads for software vulnerabilities and unintended network exposure.",
      },
      {
        id: "C",
        text: "AWS WAF (Web Application Firewall)",
        text_en: "AWS WAF (Web Application Firewall)",
        isCorrect: true,
        explanation:
          "O AWS WAF é um firewall de aplicação web que ajuda a proteger suas aplicações web ou APIs contra exploits da web comuns, permitindo que você crie regras para bloquear padrões de ataque comuns, como injeção de SQL ou cross-site scripting (XSS).",
        explanation_en:
          "AWS WAF is a web application firewall that helps protect your web applications or APIs against common web exploits by allowing you to create rules to block common attack patterns, such as SQL injection or cross-site scripting (XSS).",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        text_en: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "O Amazon GuardDuty é um serviço de detecção de ameaças que monitora continuamente atividades maliciosas e comportamento não autorizado para proteger suas contas e cargas de trabalho da AWS.",
        explanation_en:
          "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts and workloads.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/waf/"],
  },
  {
    id: "CLF-C02-CC-07",
    text: "Qual pilar do AWS Well-Architected Framework foca na capacidade de um sistema se recuperar de falhas de infraestrutura ou serviço?",
    text_en:
      "Which pillar of the AWS Well-Architected Framework focuses on the ability of a system to recover from infrastructure or service failures?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Excelência Operacional",
        text_en: "Operational Excellence",
        isCorrect: false,
        explanation:
          "O pilar de Excelência Operacional foca na execução e monitoramento de sistemas para entregar valor de negócio e na melhoria contínua de processos e procedimentos de suporte.",
        explanation_en:
          "The Operational Excellence pillar focuses on running and monitoring systems to deliver business value and on continually improving supporting processes and procedures.",
      },
      {
        id: "B",
        text: "Segurança",
        text_en: "Security",
        isCorrect: false,
        explanation:
          "O pilar de Segurança foca na proteção de informações, sistemas e ativos, ao mesmo tempo que entrega valor de negócio por meio de avaliações de risco e estratégias de mitigação.",
        explanation_en:
          "The Security pillar focuses on protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies.",
      },
      {
        id: "C",
        text: "Confiabilidade",
        text_en: "Reliability",
        isCorrect: true,
        explanation:
          "O pilar de Confiabilidade abrange a capacidade de uma carga de trabalho de executar sua função pretendida de forma correta e consistente quando esperado. Isso inclui a capacidade de operar e testar a carga de trabalho ao longo de todo o seu ciclo de vida e se recuperar de falhas.",
        explanation_en:
          "The Reliability pillar encompasses the ability of a workload to perform its intended function correctly and consistently when it’s expected to. This includes the ability to operate and test the workload through its total lifecycle and recover from failures.",
      },
      {
        id: "D",
        text: "Eficiência de Performance",
        text_en: "Performance Efficiency",
        isCorrect: false,
        explanation:
          "O pilar de Eficiência de Performance foca no uso eficiente dos recursos de computação para atender aos requisitos e manter essa eficiência à medida que a demanda muda e as tecnologias evoluem.",
        explanation_en:
          "The Performance Efficiency pillar focuses on the efficient use of computing resources to meet requirements and to maintain that efficiency as demand changes and technologies evolve.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-BP-08",
    text: "Uma empresa deseja um plano de Suporte da AWS que forneça acesso a um Arquiteto de Soluções em Nuvem e um tempo de resposta de 1 hora para casos de sistema de produção afetado. Qual plano de suporte atende a esses requisitos?",
    text_en:
      "A company wants an AWS Support plan that provides access to a Cloud Support Engineer and a 1-hour response time for production system impaired cases. Which support plan meets these requirements?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Basic",
        text_en: "Basic",
        isCorrect: false,
        explanation:
          "O plano Basic não oferece tempos de resposta garantidos nem acesso a Engenheiros de Suporte em Nuvem.",
        explanation_en:
          "The Basic plan does not offer guaranteed response times or access to Cloud Support Engineers.",
      },
      {
        id: "B",
        text: "Developer",
        text_en: "Developer",
        isCorrect: false,
        explanation:
          "O plano Developer oferece acesso a Engenheiros de Suporte em Nuvem, mas o tempo de resposta mais rápido é de 12 horas para casos de sistema afetado.",
        explanation_en:
          "The Developer plan provides access to Cloud Support Engineers, but its fastest response time is 12 hours for system impaired cases.",
      },
      {
        id: "C",
        text: "Business",
        text_en: "Business",
        isCorrect: true,
        explanation:
          "O plano Business oferece acesso 24/7 a Engenheiros de Suporte em Nuvem e tem um tempo de resposta de ≤ 1 hora para casos de sistema de produção afetado, atendendo aos requisitos da empresa.",
        explanation_en:
          "The Business plan provides 24/7 access to Cloud Support Engineers and has a ≤ 1-hour response time for production system impaired cases, meeting the company's requirements.",
      },
      {
        id: "D",
        text: "Enterprise",
        text_en: "Enterprise",
        isCorrect: false,
        explanation:
          "O plano Enterprise também atende a esses requisitos (com um tempo de resposta de ≤ 15 minutos para casos críticos de negócios), mas o plano Business é o plano de nível mais baixo que atende a todos os requisitos declarados, tornando-o a resposta mais adequada.",
        explanation_en:
          "The Enterprise plan also meets these requirements (with a ≤ 15-minute response time for business-critical cases), but the Business plan is the lowest-tier plan that meets all stated requirements, making it the most suitable answer.",
      },
    ],
    category: "support",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/premiumsupport/compare-plans/"],
  },
  {
    id: "CLF-C02-TS-09",
    text: "Qual serviço de computação da AWS permite que os usuários executem código sem provisionar ou gerenciar servidores?",
    text_en:
      "Which AWS compute service allows users to run code without provisioning or managing servers?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon EC2 (Elastic Compute Cloud)",
        text_en: "Amazon EC2 (Elastic Compute Cloud)",
        isCorrect: false,
        explanation:
          "O Amazon EC2 fornece capacidade de computação redimensionável na nuvem, mas exige que os usuários provisionem e gerenciem os servidores virtuais (instâncias).",
        explanation_en:
          "Amazon EC2 provides resizable compute capacity in the cloud, but it requires users to provision and manage the virtual servers (instances).",
      },
      {
        id: "B",
        text: "AWS Lambda",
        text_en: "AWS Lambda",
        isCorrect: true,
        explanation:
          "O AWS Lambda é um serviço de computação sem servidor (serverless) que permite executar código em resposta a eventos. Ele gerencia automaticamente os recursos de computação subjacentes, para que você não precise provisionar ou gerenciar servidores.",
        explanation_en:
          "AWS Lambda is a serverless compute service that lets you run code in response to events. It automatically manages the underlying compute resources, so you don't have to provision or manage servers.",
      },
      {
        id: "C",
        text: "Amazon Lightsail",
        text_en: "Amazon Lightsail",
        isCorrect: false,
        explanation:
          "O Amazon Lightsail foi projetado para ser a maneira mais fácil de lançar e gerenciar um servidor virtual privado com a AWS. Ainda envolve um servidor, embora simplificado.",
        explanation_en:
          "Amazon Lightsail is designed to be the easiest way to launch and manage a virtual private server with AWS. It still involves a server, albeit a simplified one.",
      },
      {
        id: "D",
        text: "AWS Elastic Beanstalk",
        text_en: "AWS Elastic Beanstalk",
        isCorrect: false,
        explanation:
          "O AWS Elastic Beanstalk é um serviço para implantar e dimensionar aplicações e serviços web. Ele provisiona e gerencia a infraestrutura (como instâncias EC2) em seu nome, mas os servidores ainda existem e são gerenciados pelo serviço.",
        explanation_en:
          "AWS Elastic Beanstalk is a service for deploying and scaling web applications and services. It provisions and manages the infrastructure (like EC2 instances) on your behalf, but the servers still exist and are managed by the service.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/lambda/"],
  },
  {
    id: "CLF-C02-SC-10",
    text: "Um administrador de sistemas precisa garantir que apenas tráfego específico da porta 443 (HTTPS) de um endereço IP específico possa alcançar uma instância EC2. Qual é a maneira MAIS segura e comum de configurar isso?",
    text_en:
      "A systems administrator needs to ensure that only specific port 443 (HTTPS) traffic from a specific IP address can reach an EC2 instance. What is the MOST secure and common way to configure this?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Configurar uma regra de entrada em um Grupo de Segurança associado à instância.",
        text_en:
          "Configure an inbound rule in a Security Group associated with the instance.",
        isCorrect: true,
        explanation:
          "Grupos de Segurança atuam como um firewall virtual para instâncias EC2 para controlar o tráfego de entrada e saída. Criar uma regra de entrada para permitir a porta 443 a partir de um CIDR/IP de origem específico é a maneira padrão e correta de alcançar esse requisito.",
        explanation_en:
          "Security Groups act as a virtual firewall for EC2 instances to control inbound and outbound traffic. Creating an inbound rule to allow port 443 from a specific source IP/CIDR is the standard and correct way to achieve this requirement.",
      },
      {
        id: "B",
        text: "Configurar uma regra de entrada em uma Lista de Controle de Acesso à Rede (NACL) na sub-rede.",
        text_en:
          "Configure an inbound rule in a Network Access Control List (NACL) on the subnet.",
        isCorrect: false,
        explanation:
          "NACLs atuam no nível da sub-rede e são sem estado (stateless). Embora possam ser usadas, os Grupos de Segurança são com estado (stateful) e operam no nível da instância, tornando-os mais fáceis de gerenciar e a melhor prática para esse tipo de controle refinado.",
        explanation_en:
          "NACLs act at the subnet level and are stateless. While they can be used, Security Groups are stateful and operate at the instance level, making them easier to manage and the best practice for this type of fine-grained control.",
      },
      {
        id: "C",
        text: "Usar uma política do IAM para restringir o acesso.",
        text_en: "Use an IAM policy to restrict access.",
        isCorrect: false,
        explanation:
          "As políticas do IAM controlam o acesso aos serviços e recursos da AWS (quem pode fazer o quê), mas não controlam o tráfego de rede para instâncias EC2.",
        explanation_en:
          "IAM policies control access to AWS services and resources (who can do what), but they do not control network traffic to EC2 instances.",
      },
      {
        id: "D",
        text: "Configurar o firewall dentro do sistema operacional da instância EC2.",
        text_en:
          "Configure the firewall within the EC2 instance's operating system.",
        isCorrect: false,
        explanation:
          "Configurar um firewall no nível do sistema operacional é possível, mas usar Grupos de Segurança é a maneira nativa da AWS, mais gerenciável e recomendada para controlar o acesso à instância.",
        explanation_en:
          "Configuring a firewall at the OS level is possible, but using Security Groups is the AWS-native, more manageable, and recommended way to control instance access.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html",
    ],
  },
  {
    id: "CLF-C02-TS-11",
    text: "Uma empresa está desenvolvendo uma aplicação que precisa de um banco de dados NoSQL com latência de milissegundos de um dígito em qualquer escala. Qual serviço da AWS é a melhor escolha?",
    text_en:
      "A company is developing an application that needs a NoSQL database with single-digit millisecond latency at any scale. Which AWS service is the best choice?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        text_en: "Amazon RDS",
        isCorrect: false,
        explanation:
          "O Amazon RDS é um serviço de banco de dados relacional (SQL), não um banco de dados NoSQL. Portanto, não atende ao requisito principal.",
        explanation_en:
          "Amazon RDS is a relational (SQL) database service, not a NoSQL database. Therefore, it does not meet the core requirement.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        text_en: "Amazon Redshift",
        isCorrect: false,
        explanation:
          "O Amazon Redshift é um serviço de data warehouse, otimizado para consultas analíticas em grandes conjuntos de dados, não para o desempenho transacional de baixa latência exigido por uma aplicação.",
        explanation_en:
          "Amazon Redshift is a data warehousing service, optimized for analytical queries over large datasets, not for the low-latency transactional performance required by an application.",
      },
      {
        id: "C",
        text: "Amazon DynamoDB",
        text_en: "Amazon DynamoDB",
        isCorrect: true,
        explanation:
          "O Amazon DynamoDB é um serviço de banco de dados NoSQL totalmente gerenciado, chave-valor e de documentos, que oferece desempenho de milissegundos de um dígito em qualquer escala. É a combinação perfeita para este caso de uso.",
        explanation_en:
          "Amazon DynamoDB is a fully managed, key-value and document NoSQL database service that delivers single-digit millisecond performance at any scale. It is a perfect match for this use case.",
      },
      {
        id: "D",
        text: "Amazon ElastiCache",
        text_en: "Amazon ElastiCache",
        isCorrect: false,
        explanation:
          "O Amazon ElastiCache é um serviço de cache na memória. Embora forneça desempenho de baixa latência, ele é usado para armazenar dados em cache, não como um banco de dados primário e persistente.",
        explanation_en:
          "Amazon ElastiCache is an in-memory caching service. While it provides low-latency performance, it is used for caching data, not as a primary, persistent database.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/dynamodb/"],
  },
  {
    id: "CLF-C02-CC-12",
    text: "Qual das seguintes opções é uma vantagem da computação em nuvem da AWS em comparação com a computação local tradicional?",
    text_en:
      "Which of the following is an advantage of AWS cloud computing compared to traditional on-premises computing?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Maior despesa de capital (CapEx) inicial.",
        text_en: "Higher upfront capital expenditure (CapEx).",
        isCorrect: false,
        explanation:
          "A computação em nuvem reduz ou elimina a necessidade de despesas de capital iniciais, permitindo que as empresas troquem CapEx por despesas operacionais variáveis (OpEx).",
        explanation_en:
          "Cloud computing reduces or eliminates the need for upfront capital expenditure, allowing companies to trade CapEx for variable operational expenditure (OpEx).",
      },
      {
        id: "B",
        text: "Tempos de implantação mais longos para novos recursos.",
        text_en: "Longer deployment times for new resources.",
        isCorrect: false,
        explanation:
          "A nuvem AWS permite provisionar recursos em minutos, aumentando a agilidade e reduzindo drasticamente os tempos de implantação em comparação com a aquisição e configuração de hardware local.",
        explanation_en:
          "The AWS cloud allows you to provision resources in minutes, increasing agility and drastically reducing deployment times compared to procuring and setting up on-premises hardware.",
      },
      {
        id: "C",
        text: "Parar de gastar dinheiro na execução e manutenção de datacenters.",
        text_en: "Stop spending money running and maintaining data centers.",
        isCorrect: true,
        explanation:
          "Uma das principais vantagens da nuvem AWS é que ela permite que as empresas parem de gastar dinheiro em datacenters físicos (o 'trabalho pesado indiferenciado') e se concentrem em suas próprias aplicações e clientes.",
        explanation_en:
          "A key advantage of the AWS cloud is that it allows businesses to stop spending money on physical data centers (the 'undifferentiated heavy lifting') and focus on their own applications and customers.",
      },
      {
        id: "D",
        text: "Menos flexibilidade para escolher diferentes tipos de recursos.",
        text_en: "Less flexibility to choose different resource types.",
        isCorrect: false,
        explanation:
          "A AWS oferece uma ampla variedade de tipos de recursos (por exemplo, centenas de tipos de instâncias EC2, diferentes classes de armazenamento S3) proporcionando muito mais flexibilidade do que um datacenter local típico.",
        explanation_en:
          "AWS offers a vast array of resource types (e.g., hundreds of EC2 instance types, different S3 storage classes) providing far more flexibility than a typical on-premises data center.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-TS-13",
    text: "Uma empresa deseja conectar sua rede local à sua VPC da AWS usando uma conexão de rede privada e dedicada com largura de banda consistente. Qual serviço da AWS deve ser usado?",
    text_en:
      "A company wants to connect its on-premises network to its AWS VPC using a private, dedicated network connection with consistent bandwidth. Which AWS service should be used?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS VPN",
        text_en: "AWS VPN",
        isCorrect: false,
        explanation:
          "Uma AWS VPN estabelece uma conexão segura pela internet pública. Não é uma conexão privada e dedicada, e a largura de banda pode ser inconsistente devido à natureza da internet.",
        explanation_en:
          "An AWS VPN establishes a secure connection over the public internet. It is not a private, dedicated connection, and bandwidth can be inconsistent due to the nature of the internet.",
      },
      {
        id: "B",
        text: "Amazon VPC Peering",
        text_en: "Amazon VPC Peering",
        isCorrect: false,
        explanation:
          "O VPC Peering é usado para conectar duas VPCs da AWS. Não é usado para conectar uma rede local a uma VPC.",
        explanation_en:
          "VPC Peering is used to connect two AWS VPCs together. It is not used for connecting an on-premises network to a VPC.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        text_en: "AWS Direct Connect",
        isCorrect: true,
        explanation:
          "O AWS Direct Connect é um serviço de nuvem que estabelece uma conexão de rede privada e dedicada de suas instalações para a AWS. Ele pode reduzir os custos de rede, aumentar a produtividade da largura de banda e fornecer uma experiência de rede mais consistente do que as conexões baseadas na Internet.",
        explanation_en:
          "AWS Direct Connect is a cloud service that establishes a private, dedicated network connection from your premises to AWS. It can reduce network costs, increase bandwidth throughput, and provide a more consistent network experience than Internet-based connections.",
      },
      {
        id: "D",
        text: "AWS Transit Gateway",
        text_en: "AWS Transit Gateway",
        isCorrect: false,
        explanation:
          "O AWS Transit Gateway atua como um hub central para conectar VPCs e redes locais. Embora seja usado em conjunto com Direct Connect ou VPN, ele não é o serviço que fornece a conexão física dedicada em si.",
        explanation_en:
          "AWS Transit Gateway acts as a central hub to connect VPCs and on-premises networks. While it is used in conjunction with Direct Connect or VPN, it is not the service that provides the dedicated physical connection itself.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/directconnect/"],
  },
  {
    id: "CLF-C02-SC-14",
    text: "Qual serviço da AWS deve ser usado para criar e gerenciar usuários e suas permissões de acesso aos serviços e recursos da AWS?",
    text_en:
      "Which AWS service should be used to create and manage users and their access permissions to AWS services and resources?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Organizations",
        text_en: "AWS Organizations",
        isCorrect: false,
        explanation:
          "O AWS Organizations é usado para gerenciar várias contas da AWS centralmente. Embora possa aplicar políticas de serviço (SCPs), o gerenciamento de usuários e permissões individuais dentro de uma conta é feito pelo IAM.",
        explanation_en:
          "AWS Organizations is used to manage multiple AWS accounts centrally. While it can apply service control policies (SCPs), the management of individual users and permissions within an account is done by IAM.",
      },
      {
        id: "B",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config é um serviço que permite avaliar, auditar e examinar as configurações de seus recursos da AWS. Ele não gerencia usuários ou permissões.",
        explanation_en:
          "AWS Config is a service that enables you to assess, audit, and evaluate the configurations of your AWS resources. It does not manage users or permissions.",
      },
      {
        id: "C",
        text: "AWS IAM (Identity and Access Management)",
        text_en: "AWS IAM (Identity and Access Management)",
        isCorrect: true,
        explanation:
          "O AWS IAM é o serviço principal para gerenciar o acesso aos serviços e recursos da AWS com segurança. Com o IAM, você pode criar e gerenciar usuários, grupos e funções da AWS e usar permissões para permitir e negar o acesso a recursos da AWS.",
        explanation_en:
          "AWS IAM is the core service for managing access to AWS services and resources securely. With IAM, you can create and manage AWS users, groups, and roles and use permissions to allow and deny their access to AWS resources.",
      },
      {
        id: "D",
        text: "Amazon Cognito",
        text_en: "Amazon Cognito",
        isCorrect: false,
        explanation:
          "O Amazon Cognito é usado para adicionar inscrição, login e controle de acesso de usuários às suas aplicações web e móveis. Ele gerencia identidades de usuários de aplicativos, não identidades de usuários da AWS para gerenciar recursos.",
        explanation_en:
          "Amazon Cognito is used to add user sign-up, sign-in, and access control to your web and mobile apps. It manages application user identities, not AWS user identities for managing resources.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: ["https://aws.amazon.com/iam/"],
  },
  {
    id: "CLF-C02-BP-15",
    text: "Uma empresa está planejando migrar uma carga de trabalho para a AWS e deseja estimar os custos mensais dos serviços da AWS que usará. Qual ferramenta da AWS deve ser usada para essa finalidade?",
    text_en:
      "A company is planning to migrate a workload to AWS and wants to estimate the monthly costs of the AWS services it will use. Which AWS tool should be used for this purpose?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        text_en: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "O AWS Cost Explorer é usado para analisar os custos e o uso existentes. Não é projetado para estimar custos de cargas de trabalho futuras.",
        explanation_en:
          "AWS Cost Explorer is used to analyze existing costs and usage. It is not designed for estimating costs of future workloads.",
      },
      {
        id: "B",
        text: "Calculadora de TCO (Custo Total de Propriedade)",
        text_en: "TCO (Total Cost of Ownership) Calculator",
        isCorrect: false,
        explanation:
          "A Calculadora de TCO é usada para comparar o custo de executar suas aplicações em um ambiente local ou de colocation com a AWS. Ela se concentra na comparação, não na estimativa detalhada de uma nova carga de trabalho.",
        explanation_en:
          "The TCO Calculator is used to compare the cost of running your applications in an on-premises or colocation environment versus on AWS. It focuses on comparison, not detailed estimation of a new workload.",
      },
      {
        id: "C",
        text: "AWS Budgets",
        text_en: "AWS Budgets",
        isCorrect: false,
        explanation:
          "O AWS Budgets é usado para definir alertas de custo e uso para seus recursos existentes da AWS. Não é uma ferramenta de estimativa.",
        explanation_en:
          "AWS Budgets is used to set cost and usage alerts for your existing AWS resources. It is not an estimation tool.",
      },
      {
        id: "D",
        text: "Calculadora de Preços da AWS",
        text_en: "AWS Pricing Calculator",
        isCorrect: true,
        explanation:
          "A Calculadora de Preços da AWS permite explorar os serviços da AWS e criar uma estimativa de custo para seus casos de uso na AWS. É a ferramenta perfeita para planejar e estimar despesas futuras.",
        explanation_en:
          "The AWS Pricing Calculator lets you explore AWS services and create an estimate of the cost for your use cases on AWS. It is the perfect tool for planning and estimating future expenses.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "easy",
    references: ["https://calculator.aws/"],
  },
  {
    id: "CLF-C02-SC-16",
    text: "Uma empresa precisa manter um log de todas as chamadas de API feitas em sua conta da AWS para fins de auditoria de segurança e conformidade. Qual serviço da AWS registra a atividade do usuário e as chamadas de API?",
    text_en:
      "A company needs to maintain a log of all API calls made within its AWS account for security auditing and compliance purposes. Which AWS service records user activity and API calls?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon CloudWatch",
        text_en: "Amazon CloudWatch",
        isCorrect: false,
        explanation:
          "O Amazon CloudWatch é um serviço de monitoramento que coleta métricas, logs e eventos. Ele monitora o desempenho dos recursos, mas o AWS CloudTrail é o serviço específico para registrar chamadas de API.",
        explanation_en:
          "Amazon CloudWatch is a monitoring service that collects metrics, logs, and events. It monitors resource performance, but AWS CloudTrail is the specific service for logging API calls.",
      },
      {
        id: "B",
        text: "AWS CloudTrail",
        text_en: "AWS CloudTrail",
        isCorrect: true,
        explanation:
          "O AWS CloudTrail monitora e registra a atividade da conta em toda a sua infraestrutura da AWS, fornecendo um histórico de eventos que inclui chamadas de API feitas através do Console de Gerenciamento da AWS, SDKs da AWS, ferramentas de linha de comando e outros serviços da AWS.",
        explanation_en:
          "AWS CloudTrail monitors and records account activity across your AWS infrastructure, providing a history of events that includes API calls made through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O AWS Trusted Advisor inspeciona seu ambiente AWS e faz recomendações, mas não registra chamadas de API.",
        explanation_en:
          "AWS Trusted Advisor inspects your AWS environment and makes recommendations, but it does not record API calls.",
      },
      {
        id: "D",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config registra as alterações de configuração dos recursos, mas não registra a chamada de API que iniciou a alteração. O CloudTrail registra 'quem' fez 'o quê' e 'quando', enquanto o Config registra como o recurso se parecia antes e depois da alteração.",
        explanation_en:
          "AWS Config records resource configuration changes, but it does not record the API call that initiated the change. CloudTrail records 'who' did 'what' and 'when', while Config records what the resource looked like before and after the change.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/cloudtrail/"],
  },
  {
    id: "CLF-C02-TS-17",
    text: "Qual das seguintes opções é um benefício de usar o Amazon CloudFront como uma Rede de Entrega de Conteúdo (CDN)?",
    text_en:
      "Which of the following is a benefit of using Amazon CloudFront as a Content Delivery Network (CDN)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Fornece um banco de dados relacional gerenciado.",
        text_en: "Provides a managed relational database.",
        isCorrect: false,
        explanation:
          "O Amazon CloudFront é uma CDN, não um serviço de banco de dados. O Amazon RDS fornece bancos de dados relacionais gerenciados.",
        explanation_en:
          "Amazon CloudFront is a CDN, not a database service. Amazon RDS provides managed relational databases.",
      },
      {
        id: "B",
        text: "Reduz a latência ao entregar conteúdo aos usuários a partir de uma localização de borda próxima.",
        text_en:
          "Reduces latency by delivering content to users from a nearby edge location.",
        isCorrect: true,
        explanation:
          "O principal benefício de uma CDN como o CloudFront é armazenar em cache cópias de seu conteúdo em locais de borda em todo o mundo. Quando um usuário solicita o conteúdo, ele é entregue a partir do local de borda mais próximo, o que reduz significativamente a latência.",
        explanation_en:
          "The primary benefit of a CDN like CloudFront is to cache copies of your content at edge locations worldwide. When a user requests the content, it is delivered from the nearest edge location, which significantly reduces latency.",
      },
      {
        id: "C",
        text: "Isola recursos de rede dentro de uma nuvem privada virtual.",
        text_en: "Isolates network resources within a virtual private cloud.",
        isCorrect: false,
        explanation:
          "A Amazon VPC (Virtual Private Cloud) é o serviço usado para isolar recursos de rede, não o CloudFront.",
        explanation_en:
          "Amazon VPC (Virtual Private Cloud) is the service used to isolate network resources, not CloudFront.",
      },
      {
        id: "D",
        text: "Fornece uma conexão de rede dedicada do local para a AWS.",
        text_en:
          "Provides a dedicated network connection from on-premises to AWS.",
        isCorrect: false,
        explanation:
          "O AWS Direct Connect fornece uma conexão de rede dedicada, não o CloudFront.",
        explanation_en:
          "AWS Direct Connect provides a dedicated network connection, not CloudFront.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/cloudfront/"],
  },
  {
    id: "CLF-C02-CC-18",
    text: "Qual modelo de implantação em nuvem envolve a execução de algumas partes da infraestrutura em um datacenter local e outras partes na nuvem AWS, com conectividade entre os dois?",
    text_en:
      "Which cloud deployment model involves running some parts of the infrastructure in an on-premises data center and other parts in the AWS cloud, with connectivity between the two?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Nuvem Pública (Public Cloud)",
        text_en: "Public Cloud",
        isCorrect: false,
        explanation:
          "Uma implantação em nuvem pública (ou 'all-in cloud') significa que toda a infraestrutura da aplicação é executada na nuvem.",
        explanation_en:
          "A public cloud (or 'all-in cloud') deployment means that all of the application infrastructure runs in the cloud.",
      },
      {
        id: "B",
        text: "Nuvem Privada (Private Cloud)",
        text_en: "Private Cloud",
        isCorrect: false,
        explanation:
          "Uma nuvem privada normalmente se refere a recursos de computação em nuvem usados exclusivamente por uma única empresa ou organização, geralmente em seu próprio datacenter.",
        explanation_en:
          "A private cloud typically refers to cloud computing resources used exclusively by a single business or organization, often in their own data center.",
      },
      {
        id: "C",
        text: "Híbrida (Hybrid)",
        text_en: "Hybrid",
        isCorrect: true,
        explanation:
          "Uma implantação híbrida conecta infraestrutura e aplicações entre recursos baseados em nuvem e recursos existentes que não estão localizados na nuvem, como um datacenter local. Isso corresponde exatamente à descrição.",
        explanation_en:
          "A hybrid deployment connects infrastructure and applications between cloud-based resources and existing resources that are not located in the cloud, such as an on-premises data center. This exactly matches the description.",
      },
      {
        id: "D",
        text: "Multi-Nuvem (Multi-Cloud)",
        text_en: "Multi-Cloud",
        isCorrect: false,
        explanation:
          "Multi-nuvem refere-se ao uso de serviços de nuvem de mais de um provedor de nuvem (por exemplo, AWS e outro provedor). Não descreve especificamente a combinação de local e nuvem.",
        explanation_en:
          "Multi-cloud refers to using cloud services from more than one cloud provider (e.g., AWS and another provider). It does not specifically describe the mix of on-premises and cloud.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-TS-19",
    text: "Quais dos seguintes serviços podem ser usados para executar aplicações em contêineres na AWS? (Escolha DUAS)",
    text_en:
      "Which of the following services can be used to run containerized applications on AWS? (Choose TWO)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Amazon Elastic Container Service (ECS)",
        text_en: "Amazon Elastic Container Service (ECS)",
        isCorrect: true,
        explanation:
          "O Amazon ECS é um serviço de orquestração de contêineres totalmente gerenciado que facilita a implantação, o gerenciamento e o dimensionamento de aplicações em contêineres.",
        explanation_en:
          "Amazon ECS is a fully managed container orchestration service that makes it easy for you to deploy, manage, and scale containerized applications.",
      },
      {
        id: "B",
        text: "AWS Lambda",
        text_en: "AWS Lambda",
        isCorrect: false,
        explanation:
          "O AWS Lambda executa código sem servidor. Embora agora possa executar imagens de contêiner, seu modelo principal é baseado em funções e eventos, não em orquestração de contêineres como ECS e EKS.",
        explanation_en:
          "AWS Lambda runs serverless code. While it can now run container images, its primary model is function and event-based, not container orchestration like ECS and EKS.",
      },
      {
        id: "C",
        text: "Amazon S3",
        text_en: "Amazon S3",
        isCorrect: false,
        explanation:
          "O Amazon S3 é um serviço de armazenamento de objetos. Ele pode armazenar imagens de contêiner, mas não pode executá-las.",
        explanation_en:
          "Amazon S3 is an object storage service. It can store container images, but it cannot run them.",
      },
      {
        id: "D",
        text: "Amazon Elastic Kubernetes Service (EKS)",
        text_en: "Amazon Elastic Kubernetes Service (EKS)",
        isCorrect: true,
        explanation:
          "O Amazon EKS é um serviço gerenciado que facilita a execução do Kubernetes na AWS sem a necessidade de instalar, operar e manter seu próprio plano de controle ou nós do Kubernetes.",
        explanation_en:
          "Amazon EKS is a managed service that makes it easy to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane or nodes.",
      },
      {
        id: "E",
        text: "Amazon EC2",
        text_en: "Amazon EC2",
        isCorrect: false,
        explanation:
          "O Amazon EC2 fornece os servidores virtuais nos quais os contêineres são executados, mas o ECS e o EKS são os serviços de orquestração que gerenciam a execução dessas aplicações em contêineres.",
        explanation_en:
          "Amazon EC2 provides the virtual servers on which containers run, but ECS and EKS are the orchestration services that manage the running of those containerized applications.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/containers/"],
  },
  {
    id: "CLF-C02-SC-20",
    text: "Uma empresa está preocupada com ataques de Negação de Serviço Distribuída (DDoS) em larga escala que visam sua aplicação web. Qual serviço da AWS oferece proteção gerenciada contra esses tipos de ataques sem custo adicional para todos os clientes da AWS?",
    text_en:
      "A company is concerned about large-scale Distributed Denial of Service (DDoS) attacks targeting its web application. Which AWS service provides managed protection against these types of attacks at no additional charge for all AWS customers?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        text_en: "AWS WAF",
        isCorrect: false,
        explanation:
          "O AWS WAF protege contra ataques na camada de aplicação (camada 7), como injeção de SQL, mas não é o serviço principal para proteção contra ataques DDoS volumétricos. O WAF também tem um custo associado.",
        explanation_en:
          "AWS WAF protects against application-layer (layer 7) attacks like SQL injection, but it is not the primary service for protection against volumetric DDoS attacks. WAF also has an associated cost.",
      },
      {
        id: "B",
        text: "AWS Shield Standard",
        text_en: "AWS Shield Standard",
        isCorrect: true,
        explanation:
          "O AWS Shield Standard é ativado automaticamente para todos os clientes da AWS sem custo adicional. Ele fornece proteção contra os ataques DDoS de camada de rede e transporte mais comuns e frequentes que visam seu site ou aplicações.",
        explanation_en:
          "AWS Shield Standard is automatically enabled for all AWS customers at no additional charge. It provides protection against most common, frequently occurring network and transport layer DDoS attacks that target your website or applications.",
      },
      {
        id: "C",
        text: "AWS Shield Advanced",
        text_en: "AWS Shield Advanced",
        isCorrect: false,
        explanation:
          "O AWS Shield Advanced oferece níveis mais altos de proteção e recursos adicionais, como proteção de custos e acesso à Equipe de Resposta da AWS (DRT), mas é um serviço pago.",
        explanation_en:
          "AWS Shield Advanced provides higher levels of protection and additional features like cost protection and access to the AWS DDoS Response Team (DRT), but it is a paid service.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        text_en: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "O Amazon GuardDuty é um serviço de detecção de ameaças que monitora atividades maliciosas, mas sua função principal não é a mitigação de DDoS.",
        explanation_en:
          "Amazon GuardDuty is a threat detection service that monitors for malicious activity, but its primary function is not DDoS mitigation.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/shield/"],
  },
  {
    id: "CLF-C02-CC-21",
    text: "Uma empresa deseja migrar para a nuvem para poder inovar mais rapidamente e reduzir o tempo de lançamento de novos recursos no mercado. Qual benefício da nuvem AWS isso representa?",
    text_en:
      "A company wants to move to the cloud so it can innovate faster and reduce the time it takes to get new features to market. Which benefit of the AWS cloud does this represent?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Trocar despesas de capital por despesas variáveis.",
        text_en: "Trade capital expense for variable expense.",
        isCorrect: false,
        explanation:
          "Este é um benefício financeiro da nuvem, mas não se relaciona diretamente com a velocidade de inovação.",
        explanation_en:
          "This is a financial benefit of the cloud, but it does not directly relate to the speed of innovation.",
      },
      {
        id: "B",
        text: "Beneficiar-se de economias de escala massivas.",
        text_en: "Benefit from massive economies of scale.",
        isCorrect: false,
        explanation:
          "Este é um benefício de custo da nuvem, não diretamente relacionado à velocidade de desenvolvimento.",
        explanation_en:
          "This is a cost benefit of the cloud, not directly related to development speed.",
      },
      {
        id: "C",
        text: "Aumentar a velocidade e a agilidade.",
        text_en: "Increase speed and agility.",
        isCorrect: true,
        explanation:
          "Na nuvem, novos recursos de TI estão a apenas um clique de distância, o que significa que você reduz o tempo para disponibilizar esses recursos aos seus desenvolvedores de semanas para apenas minutos. Isso resulta em um aumento dramático na agilidade da organização.",
        explanation_en:
          "In the cloud, new IT resources are only a click away, which means you reduce the time to make those resources available to your developers from weeks to just minutes. This results in a dramatic increase in agility for the organization.",
      },
      {
        id: "D",
        text: "Tornar-se global em minutos.",
        text_en: "Go global in minutes.",
        isCorrect: false,
        explanation:
          "A capacidade de implantar em várias regiões do mundo com facilidade é um benefício de agilidade, mas a questão se concentra mais na velocidade do desenvolvimento e inovação em geral.",
        explanation_en:
          "The ability to deploy in multiple regions around the world easily is an agility benefit, but the question focuses more on the speed of development and innovation in general.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-TS-22",
    text: "Um desenvolvedor precisa de uma maneira de armazenar e gerenciar o código-fonte de seu projeto usando um serviço Git gerenciado. Qual serviço da AWS deve ser usado?",
    text_en:
      "A developer needs a way to store and manage their project's source code using a managed Git service. Which AWS service should be used?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS CodeDeploy",
        text_en: "AWS CodeDeploy",
        isCorrect: false,
        explanation:
          "O AWS CodeDeploy é um serviço que automatiza implantações de código em vários serviços de computação, como Amazon EC2, AWS Fargate e AWS Lambda. Ele não hospeda o código-fonte.",
        explanation_en:
          "AWS CodeDeploy is a service that automates code deployments to any of several compute services such as Amazon EC2, AWS Fargate, and AWS Lambda. It does not host the source code.",
      },
      {
        id: "B",
        text: "AWS CodeCommit",
        text_en: "AWS CodeCommit",
        isCorrect: true,
        explanation:
          "O AWS CodeCommit é um serviço de controle de fonte totalmente gerenciado que hospeda repositórios Git privados e seguros. Ele elimina a necessidade de operar seu próprio sistema de controle de fonte ou se preocupar com o dimensionamento de sua infraestrutura.",
        explanation_en:
          "AWS CodeCommit is a fully-managed source control service that hosts secure and private Git repositories. It eliminates the need to operate your own source control system or worry about scaling its infrastructure.",
      },
      {
        id: "C",
        text: "AWS CodePipeline",
        text_en: "AWS CodePipeline",
        isCorrect: false,
        explanation:
          "O AWS CodePipeline é um serviço de entrega contínua totalmente gerenciado que ajuda a automatizar seus pipelines de lançamento para atualizações rápidas e confiáveis de aplicações e infraestrutura.",
        explanation_en:
          "AWS CodePipeline is a fully-managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.",
      },
      {
        id: "D",
        text: "AWS CodeBuild",
        text_en: "AWS CodeBuild",
        isCorrect: false,
        explanation:
          "O AWS CodeBuild é um serviço de integração contínua totalmente gerenciado que compila o código-fonte, executa testes e produz pacotes de software prontos para implantação.",
        explanation_en:
          "AWS CodeBuild is a fully-managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.",
      },
    ],
    category: "developer_tools",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/codecommit/"],
  },
  {
    id: "CLF-C02-SC-23",
    text: "De acordo com o Modelo de Responsabilidade Compartilhada da AWS, para qual das seguintes tarefas a AWS é responsável?",
    text_en:
      "According to the AWS Shared Responsibility Model, which of the following tasks is AWS responsible for?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Criptografar dados do cliente armazenados no Amazon S3.",
        text_en: "Encrypting customer data stored in Amazon S3.",
        isCorrect: false,
        explanation:
          "O cliente é responsável por proteger seus dados na nuvem. Isso inclui decidir se e como criptografar seus dados, por exemplo, usando a criptografia do lado do servidor do S3.",
        explanation_en:
          "The customer is responsible for securing their data in the cloud. This includes deciding whether and how to encrypt their data, for example, by using S3 server-side encryption.",
      },
      {
        id: "B",
        text: "Gerenciar permissões de usuário do IAM.",
        text_en: "Managing IAM user permissions.",
        isCorrect: false,
        explanation:
          "O cliente é responsável por gerenciar o acesso aos seus recursos da AWS, o que inclui a criação e o gerenciamento de usuários, funções e permissões do IAM.",
        explanation_en:
          "The customer is responsible for managing access to their AWS resources, which includes creating and managing IAM users, roles, and permissions.",
      },
      {
        id: "C",
        text: "Aplicar patches no sistema operacional convidado em uma instância EC2.",
        text_en: "Patching the guest operating system on an EC2 instance.",
        isCorrect: false,
        explanation:
          "Para serviços de IaaS como o EC2, o cliente é responsável por gerenciar e aplicar patches no sistema operacional convidado e em qualquer software de aplicação que instalar.",
        explanation_en:
          "For IaaS services like EC2, the customer is responsible for managing and patching the guest operating system and any application software they install.",
      },
      {
        id: "D",
        text: "Manter a segurança física dos datacenters.",
        text_en: "Maintaining the physical security of the data centers.",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela segurança 'da' nuvem, que inclui a proteção da infraestrutura que executa todos os serviços oferecidos na Nuvem AWS. Isso abrange hardware, software, rede e instalações, incluindo segurança física.",
        explanation_en:
          "AWS is responsible for the security 'of' the cloud, which includes protecting the infrastructure that runs all of the services offered in the AWS Cloud. This covers hardware, software, networking, and facilities, including physical security.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-TS-24",
    text: "Uma empresa precisa executar uma carga de trabalho com uso intensivo de computação por um curto período e pode tolerar interrupções. Para minimizar os custos, qual opção de compra do Amazon EC2 é a MAIS econômica?",
    text_en:
      "A company needs to run a compute-intensive workload for a short period and can tolerate interruptions. To minimize costs, which Amazon EC2 purchasing option is the MOST cost-effective?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias Sob Demanda (On-Demand)",
        text_en: "On-Demand Instances",
        isCorrect: false,
        explanation:
          "Instâncias Sob Demanda oferecem flexibilidade, mas não são a opção mais barata. Você paga pela capacidade de computação por hora ou segundo, sem compromissos de longo prazo.",
        explanation_en:
          "On-Demand Instances provide flexibility but are not the cheapest option. You pay for compute capacity by the hour or second with no long-term commitments.",
      },
      {
        id: "B",
        text: "Instâncias Reservadas (Reserved Instances)",
        text_en: "Reserved Instances",
        isCorrect: false,
        explanation:
          "Instâncias Reservadas oferecem um desconto significativo em comparação com os preços Sob Demanda em troca de um compromisso de 1 ou 3 anos. Não são ideais para cargas de trabalho de curto prazo.",
        explanation_en:
          "Reserved Instances provide a significant discount compared to On-Demand pricing in exchange for a 1- or 3-year commitment. They are not ideal for short-term workloads.",
      },
      {
        id: "C",
        text: "Instâncias Spot",
        text_en: "Spot Instances",
        isCorrect: true,
        explanation:
          "As Instâncias Spot permitem que você aproveite a capacidade não utilizada do EC2 na nuvem AWS com um desconto de até 90% em comparação com os preços Sob Demanda. Como a AWS pode recuperar essas instâncias com um aviso de dois minutos, elas são perfeitas para cargas de trabalho flexíveis, tolerantes a falhas ou de curto prazo.",
        explanation_en:
          "Spot Instances let you take advantage of unused EC2 capacity in the AWS cloud at up to a 90% discount compared to On-Demand prices. Because AWS can reclaim these instances with a two-minute warning, they are perfect for flexible, fault-tolerant, or short-term workloads.",
      },
      {
        id: "D",
        text: "Hosts Dedicados (Dedicated Hosts)",
        text_en: "Dedicated Hosts",
        isCorrect: false,
        explanation:
          "Hosts Dedicados fornecem servidores físicos EC2 dedicados para seu uso. Esta é a opção mais cara e é normalmente usada para atender a requisitos de conformidade ou licenciamento de software.",
        explanation_en:
          "Dedicated Hosts provide you with physical EC2 servers dedicated for your use. This is the most expensive option and is typically used to meet compliance or software licensing requirements.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ec2/spot/"],
  },
  {
    id: "CLF-C02-BP-25",
    text: "O que o faturamento consolidado do AWS Organizations permite que uma empresa faça?",
    text_en:
      "What does consolidated billing from AWS Organizations allow a company to do?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Receber uma fatura separada para cada conta da AWS.",
        text_en: "Receive a separate invoice for each AWS account.",
        isCorrect: false,
        explanation:
          "O faturamento consolidado faz o oposto; ele combina o uso de várias contas em uma única fatura.",
        explanation_en:
          "Consolidated billing does the opposite; it combines usage from multiple accounts onto a single bill.",
      },
      {
        id: "B",
        text: "Combinar o uso de várias contas da AWS para receber descontos por volume.",
        text_en:
          "Combine usage from multiple AWS accounts to receive volume pricing discounts.",
        isCorrect: true,
        explanation:
          "Com o faturamento consolidado, a AWS combina o uso de todas as contas na organização para qualificá-lo para descontos de preços por volume. Isso pode resultar em uma fatura geral mais baixa do que seria para contas individuais.",
        explanation_en:
          "With consolidated billing, AWS combines the usage from all accounts in the organization to qualify you for volume pricing discounts. This can result in a lower overall bill than it would be for individual accounts.",
      },
      {
        id: "C",
        text: "Pagar por todos os serviços da AWS com um ano de antecedência.",
        text_en: "Pay for all AWS services one year in advance.",
        isCorrect: false,
        explanation:
          "O faturamento consolidado não exige pagamento antecipado. Instâncias Reservadas e Savings Plans são mecanismos para obter descontos por pagamento antecipado.",
        explanation_en:
          "Consolidated billing does not require upfront payment. Reserved Instances and Savings Plans are mechanisms for getting discounts for paying in advance.",
      },
      {
        id: "D",
        text: "Usar apenas um único método de pagamento para todas as contas.",
        text_en: "Use only a single payment method for all accounts.",
        isCorrect: false,
        explanation:
          "Embora o faturamento consolidado simplifique o pagamento ao ter uma única conta pagadora, seu principal benefício é agregar o uso para descontos por volume.",
        explanation_en:
          "While consolidated billing simplifies payment by having a single payer account, its primary benefit is aggregating usage for volume discounts.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html",
    ],
  },
  {
    id: "CLF-C02-SC-26",
    text: "Uma empresa precisa garantir que as credenciais de seus usuários do IAM não sejam comprometidas. Qual é a MELHOR prática para aumentar a segurança do login de usuário do IAM?",
    text_en:
      "A company needs to ensure its IAM user credentials are not compromised. What is the BEST practice for enhancing the security of IAM user sign-in?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Compartilhar credenciais de usuário do IAM entre os membros da equipe.",
        text_en: "Sharing IAM user credentials among team members.",
        isCorrect: false,
        explanation:
          "Compartilhar credenciais é uma péssima prática de segurança, pois elimina a responsabilidade individual e aumenta o risco de comprometimento.",
        explanation_en:
          "Sharing credentials is a very bad security practice as it removes individual accountability and increases the risk of compromise.",
      },
      {
        id: "B",
        text: "Usar o usuário raiz da conta para tarefas diárias.",
        text_en: "Using the account root user for daily tasks.",
        isCorrect: false,
        explanation:
          "O usuário raiz tem acesso irrestrito. A melhor prática é proteger as credenciais do usuário raiz e não usá-las para tarefas rotineiras. Em vez disso, use usuários do IAM com privilégios mínimos.",
        explanation_en:
          "The root user has unrestricted access. The best practice is to secure the root user credentials and not use them for routine tasks. Instead, use IAM users with least privilege.",
      },
      {
        id: "C",
        text: "Habilitar a Autenticação Multifator (MFA) para todos os usuários.",
        text_en: "Enabling Multi-Factor Authentication (MFA) for all users.",
        isCorrect: true,
        explanation:
          "A MFA adiciona uma camada extra de proteção sobre o nome de usuário e a senha. Com a MFA habilitada, quando um usuário faz login, ele será solicitado a fornecer seu nome de usuário e senha (o primeiro fator – o que eles sabem), bem como um código de autenticação de seu dispositivo MFA (o segundo fator – o que eles têm).",
        explanation_en:
          "MFA adds an extra layer of protection on top of a username and password. With MFA enabled, when a user signs in, they will be prompted for their username and password (the first factor—what they know), as well as for an authentication code from their MFA device (the second factor—what they have).",
      },
      {
        id: "D",
        text: "Armazenar chaves de acesso do IAM no código-fonte.",
        text_en: "Storing IAM access keys in source code.",
        isCorrect: false,
        explanation:
          "Armazenar credenciais como chaves de acesso em código-fonte é extremamente arriscado, pois elas podem ser expostas acidentalmente. A melhor prática é usar funções do IAM para que as aplicações obtenham credenciais temporárias.",
        explanation_en:
          "Storing credentials like access keys in source code is extremely risky as they can be accidentally exposed. The best practice is to use IAM roles for applications to obtain temporary credentials.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: ["https://aws.amazon.com/iam/features/mfa/"],
  },
  {
    id: "CLF-C02-TS-27",
    text: "Qual serviço da AWS pode ser usado para desacoplar componentes de uma aplicação, usando uma fila para armazenar mensagens enquanto aguardam para serem processadas?",
    text_en:
      "Which AWS service can be used to decouple components of an application by using a queue to store messages as they travel between them?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon SNS (Simple Notification Service)",
        text_en: "Amazon SNS (Simple Notification Service)",
        isCorrect: false,
        explanation:
          "O Amazon SNS é um serviço de mensagens pub/sub. Ele envia mensagens para vários assinantes (modelo 'fan-out'), mas não as armazena em uma fila para processamento por um único consumidor.",
        explanation_en:
          "Amazon SNS is a pub/sub messaging service. It pushes messages to multiple subscribers (fan-out model), but does not hold them in a queue for processing by a single consumer.",
      },
      {
        id: "B",
        text: "AWS Lambda",
        text_en: "AWS Lambda",
        isCorrect: false,
        explanation:
          "O AWS Lambda é um serviço de computação que pode processar mensagens, mas não é o serviço de enfileiramento em si.",
        explanation_en:
          "AWS Lambda is a compute service that can process messages, but it is not the queuing service itself.",
      },
      {
        id: "C",
        text: "Amazon SQS (Simple Queue Service)",
        text_en: "Amazon SQS (Simple Queue Service)",
        isCorrect: true,
        explanation:
          "O Amazon SQS é um serviço de enfileiramento de mensagens totalmente gerenciado que permite desacoplar e dimensionar microsserviços, sistemas distribuídos e aplicações sem servidor. Ele armazena mensagens em uma fila até que um componente consumidor as processe e exclua.",
        explanation_en:
          "Amazon SQS is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It stores messages in a queue until a consumer component processes and deletes them.",
      },
      {
        id: "D",
        text: "Amazon Kinesis",
        text_en: "Amazon Kinesis",
        isCorrect: false,
        explanation:
          "O Amazon Kinesis é projetado para coletar, processar e analisar dados de streaming em tempo real. Embora lide com mensagens, seu foco principal é o streaming de dados, não o enfileiramento para desacoplamento de aplicações.",
        explanation_en:
          "Amazon Kinesis is designed for collecting, processing, and analyzing real-time, streaming data. While it deals with messages, its primary focus is on data streaming, not application-decoupling queuing.",
      },
    ],
    category: "application_integration",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/sqs/"],
  },
  {
    id: "CLF-C02-CC-28",
    text: "Qual das alternativas a seguir é responsabilidade do cliente sob o modelo de Responsabilidade Compartilhada da AWS para um serviço gerenciado como o Amazon RDS?",
    text_en:
      "Which of the following is a customer's responsibility under the AWS Shared Responsibility Model for a managed service like Amazon RDS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aplicar patches no sistema operacional do servidor de banco de dados.",
        text_en: "Patching the operating system of the database server.",
        isCorrect: false,
        explanation:
          "Com o Amazon RDS, a AWS gerencia o sistema operacional subjacente, incluindo a aplicação de patches. Esta é uma responsabilidade da AWS.",
        explanation_en:
          "With Amazon RDS, AWS manages the underlying operating system, including patching it. This is an AWS responsibility.",
      },
      {
        id: "B",
        text: "Gerenciar as regras de firewall de rede (grupos de segurança).",
        text_en: "Managing the network firewall rules (security groups).",
        isCorrect: true,
        explanation:
          "Mesmo para um serviço gerenciado, o cliente é sempre responsável por configurar suas próprias regras de segurança de rede, como grupos de segurança, para controlar qual tráfego pode acessar a instância de banco de dados do RDS.",
        explanation_en:
          "Even for a managed service, the customer is always responsible for configuring their own network security rules, such as security groups, to control what traffic can access the RDS database instance.",
      },
      {
        id: "C",
        text: "Fazer o backup do banco de dados.",
        text_en: "Backing up the database.",
        isCorrect: false,
        explanation:
          "O Amazon RDS oferece backups automatizados e snapshots manuais. Embora o cliente configure a política de backup (por exemplo, período de retenção), a execução e o gerenciamento dos backups são uma responsabilidade gerenciada pela AWS.",
        explanation_en:
          "Amazon RDS provides automated backups and manual snapshots. While the customer configures the backup policy (e.g., retention period), the execution and management of the backups is a responsibility managed by AWS.",
      },
      {
        id: "D",
        text: "Instalar e aplicar patches no software do motor de banco de dados (por exemplo, MySQL).",
        text_en:
          "Installing and patching the database engine software (e.g., MySQL).",
        isCorrect: false,
        explanation:
          "A AWS gerencia a instalação, manutenção e aplicação de patches do software do motor de banco de dados (MySQL, PostgreSQL, etc.) em instâncias RDS.",
        explanation_en:
          "AWS manages the installation, maintenance, and patching of the database engine software (MySQL, PostgreSQL, etc.) on RDS instances.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-TS-29",
    text: "Qual serviço da AWS fornece um sistema de arquivos compartilhado, escalável e totalmente gerenciado para uso com instâncias Linux do Amazon EC2?",
    text_en:
      "Which AWS service provides a scalable, fully managed, shared file system for use with Amazon EC2 Linux instances?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon S3",
        text_en: "Amazon S3",
        isCorrect: false,
        explanation:
          "O Amazon S3 é um armazenamento de objetos, não um sistema de arquivos que pode ser montado por várias instâncias EC2 simultaneamente para acesso compartilhado a arquivos.",
        explanation_en:
          "Amazon S3 is object storage, not a file system that can be mounted by multiple EC2 instances concurrently for shared file access.",
      },
      {
        id: "B",
        text: "Amazon EBS (Elastic Block Store)",
        text_en: "Amazon EBS (Elastic Block Store)",
        isCorrect: false,
        explanation:
          "Um volume EBS é um armazenamento em nível de bloco que pode ser anexado a uma única instância EC2 por vez (com exceção dos volumes Multi-Attach, que têm limitações). Não é um sistema de arquivos compartilhado por natureza.",
        explanation_en:
          "An EBS volume is block-level storage that can be attached to a single EC2 instance at a time (with the exception of Multi-Attach volumes, which have limitations). It is not a shared file system by nature.",
      },
      {
        id: "C",
        text: "Amazon EFS (Elastic File System)",
        text_en: "Amazon EFS (Elastic File System)",
        isCorrect: true,
        explanation:
          "O Amazon EFS fornece um sistema de arquivos NFS simples, escalável e elástico para cargas de trabalho baseadas em Linux para uso com serviços de nuvem da AWS e recursos locais. Ele foi projetado para ser montado por muitas instâncias EC2 simultaneamente.",
        explanation_en:
          "Amazon EFS provides a simple, scalable, elastic file system for Linux-based workloads for use with AWS Cloud services and on-premises resources. It is designed to be mounted by many EC2 instances concurrently.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway",
        text_en: "AWS Storage Gateway",
        isCorrect: false,
        explanation:
          "O AWS Storage Gateway é um serviço de armazenamento em nuvem híbrido que fornece acesso local a armazenamento na nuvem virtualmente ilimitado. Não é o sistema de arquivos em si.",
        explanation_en:
          "AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. It is not the file system itself.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/efs/"],
  },
  {
    id: "CLF-C02-SC-30",
    text: "Qual serviço da AWS pode ser usado para obter relatórios de conformidade da AWS, como relatórios SOC 1 e SOC 2?",
    text_en:
      "Which AWS service can be used to obtain AWS compliance reports, such as SOC 1 and SOC 2 reports?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O AWS Trusted Advisor fornece recomendações para otimizar seu ambiente AWS, mas não fornece relatórios de conformidade.",
        explanation_en:
          "AWS Trusted Advisor provides recommendations to optimize your AWS environment but does not provide compliance reports.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        text_en: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "O Amazon Inspector varre suas cargas de trabalho em busca de vulnerabilidades. Não é um repositório para relatórios de conformidade da AWS.",
        explanation_en:
          "Amazon Inspector scans your workloads for vulnerabilities. It is not a repository for AWS's own compliance reports.",
      },
      {
        id: "C",
        text: "AWS Artifact",
        text_en: "AWS Artifact",
        isCorrect: true,
        explanation:
          "O AWS Artifact é o seu portal central de autoatendimento para informações relacionadas à conformidade da AWS. Ele fornece acesso sob demanda aos relatórios de segurança e conformidade da AWS e a acordos online selecionados.",
        explanation_en:
          "AWS Artifact is your go-to, central resource for AWS's compliance-related information. It provides on-demand access to AWS’s security and compliance reports and select online agreements.",
      },
      {
        id: "D",
        text: "AWS Shield",
        text_en: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield é um serviço de proteção contra DDoS. Não tem relação com a obtenção de relatórios de conformidade.",
        explanation_en:
          "AWS Shield is a DDoS protection service. It is unrelated to obtaining compliance reports.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/artifact/"],
  },
  {
    id: "CLF-C02-CC-31",
    text: "O que é uma Zona de Disponibilidade (AZ) na AWS?",
    text_en: "What is an Availability Zone (AZ) in AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Uma localização geográfica distinta no mundo onde a AWS agrupa datacenters.",
        text_en:
          "A distinct geographical location in the world where AWS clusters data centers.",
        isCorrect: false,
        explanation:
          "Esta é a definição de uma Região da AWS, não de uma Zona de Disponibilidade. Uma Região consiste em múltiplas Zonas de Disponibilidade.",
        explanation_en:
          "This is the definition of an AWS Region, not an Availability Zone. A Region consists of multiple Availability Zones.",
      },
      {
        id: "B",
        text: "Um ou mais datacenters distintos com energia, rede e conectividade redundantes dentro de uma Região da AWS.",
        text_en:
          "One or more discrete data centers with redundant power, networking, and connectivity within an AWS Region.",
        isCorrect: true,
        explanation:
          "Uma Zona de Disponibilidade é um ou mais datacenters fisicamente separados e isolados dentro de uma Região. Isso permite alta disponibilidade, pois a falha em uma AZ não deve afetar outras AZs.",
        explanation_en:
          "An Availability Zone is one or more discrete, physically separate and isolated data centers within a Region. This allows for high availability, as failure in one AZ should not affect other AZs.",
      },
      {
        id: "C",
        text: "Um local onde o conteúdo é armazenado em cache para entregar aos clientes com menor latência.",
        text_en:
          "A location where content is cached to deliver to customers with lower latency.",
        isCorrect: false,
        explanation:
          "Esta é a definição de uma Localização de Borda (Edge Location), usada pelo Amazon CloudFront.",
        explanation_en:
          "This is the definition of an Edge Location, used by Amazon CloudFront.",
      },
      {
        id: "D",
        text: "Uma nuvem privada virtual isolada logicamente para lançar recursos da AWS.",
        text_en:
          "A logically isolated virtual private cloud for launching AWS resources.",
        isCorrect: false,
        explanation:
          "Esta é a definição de uma Amazon VPC (Virtual Private Cloud).",
        explanation_en:
          "This is the definition of an Amazon VPC (Virtual Private Cloud).",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/about-aws/global-infrastructure/"],
  },
  {
    id: "CLF-C02-TS-32",
    text: "Qual serviço da AWS permite que uma empresa provisione uma seção logicamente isolada da Nuvem AWS onde pode lançar recursos da AWS em uma rede virtual que ela define?",
    text_en:
      "Which AWS service allows a company to provision a logically isolated section of the AWS Cloud where it can launch AWS resources in a virtual network that it defines?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon EC2",
        text_en: "Amazon EC2",
        isCorrect: false,
        explanation:
          "O Amazon EC2 fornece servidores virtuais (instâncias), mas a rede virtual na qual eles são lançados é a Amazon VPC.",
        explanation_en:
          "Amazon EC2 provides virtual servers (instances), but the virtual network they are launched into is Amazon VPC.",
      },
      {
        id: "B",
        text: "Amazon S3",
        text_en: "Amazon S3",
        isCorrect: false,
        explanation:
          "O Amazon S3 é um serviço de armazenamento de objetos e não está relacionado ao provisionamento de redes virtuais.",
        explanation_en:
          "Amazon S3 is an object storage service and is not related to provisioning virtual networks.",
      },
      {
        id: "C",
        text: "Amazon VPC (Virtual Private Cloud)",
        text_en: "Amazon VPC (Virtual Private Cloud)",
        isCorrect: true,
        explanation:
          "A Amazon VPC permite provisionar uma seção logicamente isolada da Nuvem AWS onde você pode lançar recursos da AWS em uma rede virtual que você define. Você tem controle total sobre seu ambiente de rede virtual.",
        explanation_en:
          "Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment.",
      },
      {
        id: "D",
        text: "Amazon Route 53",
        text_en: "Amazon Route 53",
        isCorrect: false,
        explanation:
          "O Amazon Route 53 é um serviço web de Sistema de Nomes de Domínio (DNS) escalável. Ele traduz nomes de domínio em endereços IP, mas não cria a rede virtual.",
        explanation_en:
          "Amazon Route 53 is a scalable Domain Name System (DNS) web service. It translates domain names to IP addresses but does not create the virtual network.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/vpc/"],
  },
  {
    id: "CLF-C02-BP-33",
    text: "Uma empresa tem uma carga de trabalho estável e previsível que será executada continuamente por 3 anos. Qual modelo de preços da AWS oferecerá o MAIOR desconto?",
    text_en:
      "A company has a stable, predictable workload that will run continuously for 3 years. Which AWS pricing model will offer the MOST significant discount?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instâncias Sob Demanda (On-Demand)",
        text_en: "On-Demand Instances",
        isCorrect: false,
        explanation:
          "Sob Demanda é o modelo mais caro e não oferece descontos por compromisso a longo prazo.",
        explanation_en:
          "On-Demand is the most expensive model and offers no discounts for long-term commitment.",
      },
      {
        id: "B",
        text: "Instâncias Spot",
        text_en: "Spot Instances",
        isCorrect: false,
        explanation:
          "As Instâncias Spot oferecem grandes descontos, mas podem ser interrompidas e não são adequadas para cargas de trabalho que devem ser executadas continuamente sem interrupção.",
        explanation_en:
          "Spot Instances offer deep discounts but can be interrupted and are not suitable for workloads that must run continuously without interruption.",
      },
      {
        id: "C",
        text: "Savings Plans com compromisso de 3 anos e pagamento total adiantado.",
        text_en: "Savings Plans with a 3-year term and All Upfront payment.",
        isCorrect: true,
        explanation:
          "Tanto as Instâncias Reservadas quanto os Savings Plans oferecem os maiores descontos para compromissos de 3 anos com pagamento total adiantado. Eles são projetados especificamente para cargas de trabalho estáveis e de longo prazo, oferecendo economias significativas em relação aos preços Sob Demanda.",
        explanation_en:
          "Both Reserved Instances and Savings Plans offer the highest discounts for 3-year, all-upfront commitments. They are designed specifically for long-term, stable workloads, providing significant savings over On-Demand pricing.",
      },
      {
        id: "D",
        text: "Instâncias Reservadas com compromisso de 1 ano e sem pagamento adiantado.",
        text_en:
          "Reserved Instances with a 1-year term and No Upfront payment.",
        isCorrect: false,
        explanation:
          "Esta opção oferece um desconto, mas é significativamente menor do que um compromisso de 3 anos com pagamento total adiantado.",
        explanation_en:
          "This option offers a discount, but it is significantly less than a 3-year, all-upfront commitment.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/savingsplans/",
      "https://aws.amazon.com/ec2/pricing/reserved-instances/",
    ],
  },
  {
    id: "CLF-C02-SC-34",
    text: "Uma equipe de segurança deseja detectar ameaças de forma inteligente em sua conta AWS, analisando continuamente logs do AWS CloudTrail, logs de fluxo VPC e logs DNS em busca de atividades maliciosas. Qual serviço deve ser usado?",
    text_en:
      "A security team wants to intelligently detect threats within their AWS account by continuously analyzing AWS CloudTrail logs, VPC Flow Logs, and DNS logs for malicious activity. Which service should be used?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Macie",
        text_en: "Amazon Macie",
        isCorrect: false,
        explanation:
          "O Amazon Macie é um serviço de segurança de dados que descobre e protege dados sensíveis (como PII) no Amazon S3. Ele não analisa logs de rede ou CloudTrail para detecção de ameaças.",
        explanation_en:
          "Amazon Macie is a data security service that discovers and protects sensitive data (like PII) in Amazon S3. It does not analyze network or CloudTrail logs for threat detection.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        text_en: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "O Amazon Inspector é um serviço de gerenciamento de vulnerabilidades que varre instâncias EC2 e imagens de contêiner em busca de vulnerabilidades, não um serviço de detecção de ameaças em tempo real.",
        explanation_en:
          "Amazon Inspector is a vulnerability management service that scans EC2 instances and container images for vulnerabilities, not a real-time threat detection service.",
      },
      {
        id: "C",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config avalia e audita as configurações dos recursos. Ele não analisa logs para detectar comportamento malicioso.",
        explanation_en:
          "AWS Config assesses and audits resource configurations. It does not analyze logs to detect malicious behavior.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        text_en: "Amazon GuardDuty",
        isCorrect: true,
        explanation:
          "O Amazon GuardDuty é um serviço de detecção de ameaças que monitora continuamente atividades maliciosas e comportamento não autorizado, analisando fontes de dados como logs do AWS CloudTrail, logs de fluxo VPC e logs DNS.",
        explanation_en:
          "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior by analyzing data sources like AWS CloudTrail logs, VPC Flow Logs, and DNS logs.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/guardduty/"],
  },
  {
    id: "CLF-C02-TS-35",
    text: "Uma empresa de mídia deseja fornecer conteúdo de vídeo sob demanda (VOD) para seus clientes em todo o mundo com baixa latência. Eles armazenam os arquivos de vídeo de origem em um bucket do Amazon S3. Qual serviço da AWS deve ser usado em conjunto com o S3 para atingir esse objetivo?",
    text_en:
      "A media company wants to provide video on-demand (VOD) content to its customers worldwide with low latency. They store the source video files in an Amazon S3 bucket. Which AWS service should be used in conjunction with S3 to achieve this goal?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Elastic Load Balancing (ELB)",
        text_en: "Elastic Load Balancing (ELB)",
        isCorrect: false,
        explanation:
          "O ELB distribui tráfego para servidores de aplicativos (como instâncias EC2), não para conteúdo estático do S3. Não é uma CDN.",
        explanation_en:
          "ELB distributes traffic to application servers (like EC2 instances), not to static content from S3. It is not a CDN.",
      },
      {
        id: "B",
        text: "Amazon CloudFront",
        text_en: "Amazon CloudFront",
        isCorrect: true,
        explanation:
          "O Amazon CloudFront é a rede de entrega de conteúdo (CDN) da AWS. Ele pode ser configurado para usar um bucket S3 como origem. O CloudFront armazena o conteúdo em cache em suas localizações de borda globais, o que reduz drasticamente a latência para os espectadores em todo o mundo.",
        explanation_en:
          "Amazon CloudFront is AWS's content delivery network (CDN). It can be configured to use an S3 bucket as its origin. CloudFront will then cache the content at its global edge locations, which dramatically reduces latency for viewers worldwide.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        text_en: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "O AWS Direct Connect é para estabelecer uma conexão de rede privada do local para a AWS. Não ajuda a distribuir conteúdo para usuários finais na Internet.",
        explanation_en:
          "AWS Direct Connect is for establishing a private network connection from on-premises to AWS. It does not help distribute content to end-users on the internet.",
      },
      {
        id: "D",
        text: "Amazon Kinesis Video Streams",
        text_en: "Amazon Kinesis Video Streams",
        isCorrect: false,
        explanation:
          "O Kinesis Video Streams é para ingerir e processar streaming de vídeo ao vivo. O caso de uso aqui é para vídeo sob demanda (VOD), que são arquivos pré-gravados.",
        explanation_en:
          "Kinesis Video Streams is for ingesting and processing live video streams. The use case here is for video on-demand (VOD), which are pre-recorded files.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/cloudfront/",
      "https://aws.amazon.com/s3/",
    ],
  },
  {
    id: "CLF-C02-CC-36",
    text: "Qual pilar do AWS Well-Architected Framework se concentra na redução de custos e na eliminação de gastos desnecessários?",
    text_en:
      "Which pillar of the AWS Well-Architected Framework focuses on reducing costs and eliminating unneeded spending?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Eficiência de Performance",
        text_en: "Performance Efficiency",
        isCorrect: false,
        explanation:
          "O pilar de Eficiência de Performance se concentra em usar os recursos de TI e computação de forma eficiente. Embora isso possa levar à economia de custos, o pilar principal focado nos custos é a Otimização de Custos.",
        explanation_en:
          "The Performance Efficiency pillar focuses on using IT and computing resources efficiently. While this can lead to cost savings, the primary pillar focused on costs is Cost Optimization.",
      },
      {
        id: "B",
        text: "Confiabilidade",
        text_en: "Reliability",
        isCorrect: false,
        explanation:
          "O pilar de Confiabilidade se concentra em garantir que uma carga de trabalho execute sua função pretendida corretamente e se recupere de falhas.",
        explanation_en:
          "The Reliability pillar focuses on ensuring a workload performs its intended function correctly and can recover from failure.",
      },
      {
        id: "C",
        text: "Otimização de Custos",
        text_en: "Cost Optimization",
        isCorrect: true,
        explanation:
          "O pilar de Otimização de Custos se concentra em evitar custos desnecessários. Os tópicos principais incluem entender e controlar onde o dinheiro está sendo gasto, selecionar o número certo e o tipo certo de recursos e analisar os gastos ao longo do tempo.",
        explanation_en:
          "The Cost Optimization pillar focuses on avoiding unnecessary costs. Key topics include understanding and controlling where money is being spent, selecting the right number and type of resources, and analyzing spending over time.",
      },
      {
        id: "D",
        text: "Excelência Operacional",
        text_en: "Operational Excellence",
        isCorrect: false,
        explanation:
          "O pilar de Excelência Operacional se concentra na execução e monitoramento de sistemas para entregar valor de negócio e na melhoria contínua de processos.",
        explanation_en:
          "The Operational Excellence pillar focuses on running and monitoring systems to deliver business value and on continually improving processes.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-SC-37",
    text: "Um usuário precisa de acesso temporário a um recurso da AWS. Qual mecanismo do IAM deve ser usado para conceder permissões de curto prazo sem criar um usuário permanente?",
    text_en:
      "A user needs temporary access to an AWS resource. Which IAM mechanism should be used to grant short-term permissions without creating a permanent user?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Um Grupo do IAM",
        text_en: "An IAM Group",
        isCorrect: false,
        explanation:
          "Um Grupo do IAM é uma coleção de usuários do IAM. Ele simplifica o gerenciamento de permissões, mas não fornece credenciais temporárias por si só.",
        explanation_en:
          "An IAM Group is a collection of IAM users. It simplifies permission management but does not provide temporary credentials on its own.",
      },
      {
        id: "B",
        text: "Uma Função (Role) do IAM",
        text_en: "An IAM Role",
        isCorrect: true,
        explanation:
          "Uma Função do IAM é uma identidade do IAM que você pode criar em sua conta que tem permissões específicas. Em vez de ser associada exclusivamente a uma pessoa, uma função destina-se a ser assumida por qualquer pessoa que precise dela. Ela fornece credenciais de segurança temporárias para sua sessão de função.",
        explanation_en:
          "An IAM Role is an IAM identity that you can create in your account that has specific permissions. Instead of being uniquely associated with one person, a role is intended to be assumable by anyone who needs it. It provides temporary security credentials for your role session.",
      },
      {
        id: "C",
        text: "Uma Política (Policy) do IAM",
        text_en: "An IAM Policy",
        isCorrect: false,
        explanation:
          "Uma Política do IAM é um objeto que, quando associado a uma identidade ou recurso, define suas permissões. Ela não fornece credenciais.",
        explanation_en:
          "An IAM Policy is an object that, when associated with an identity or resource, defines their permissions. It does not provide credentials.",
      },
      {
        id: "D",
        text: "Um Usuário (User) do IAM",
        text_en: "An IAM User",
        isCorrect: false,
        explanation:
          "Um Usuário do IAM representa uma identidade de longo prazo e tem credenciais permanentes. O cenário pede acesso temporário.",
        explanation_en:
          "An IAM User represents a long-term identity and has permanent credentials. The scenario asks for temporary access.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
    ],
  },
  {
    id: "CLF-C02-TS-38",
    text: "Qual serviço da AWS simplifica a implantação e o dimensionamento de aplicações web desenvolvidas em linguagens como Java, .NET, PHP, Node.js, Python e Ruby?",
    text_en:
      "Which AWS service simplifies deploying and scaling web applications developed with languages like Java, .NET, PHP, Node.js, Python, and Ruby?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        text_en: "AWS Lambda",
        isCorrect: false,
        explanation:
          "O Lambda executa código sem servidor em resposta a eventos, o que é diferente de implantar uma aplicação web completa com seus componentes associados.",
        explanation_en:
          "Lambda runs serverless code in response to events, which is different from deploying a full web application with its associated components.",
      },
      {
        id: "B",
        text: "AWS Elastic Beanstalk",
        text_en: "AWS Elastic Beanstalk",
        isCorrect: true,
        explanation:
          "O AWS Elastic Beanstalk é um serviço fácil de usar para implantar e dimensionar aplicações e serviços web. Você simplesmente faz o upload do seu código e o Elastic Beanstalk lida automaticamente com a implantação, desde o provisionamento de capacidade, balanceamento de carga, auto-scaling até o monitoramento da saúde da aplicação.",
        explanation_en:
          "AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services. You can simply upload your code, and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling, to application health monitoring.",
      },
      {
        id: "C",
        text: "Amazon EC2",
        text_en: "Amazon EC2",
        isCorrect: false,
        explanation:
          "O EC2 fornece os servidores virtuais, mas você teria que configurar manualmente o balanceamento de carga, o auto-scaling e a implantação do código, tarefas que o Elastic Beanstalk automatiza.",
        explanation_en:
          "EC2 provides the virtual servers, but you would have to manually set up load balancing, auto-scaling, and code deployment, which are tasks that Elastic Beanstalk automates.",
      },
      {
        id: "D",
        text: "Amazon Lightsail",
        text_en: "Amazon Lightsail",
        isCorrect: false,
        explanation:
          "O Lightsail é para projetos mais simples, como um único servidor privado virtual. O Elastic Beanstalk é mais adequado para aplicações complexas que exigem balanceamento de carga e auto-scaling.",
        explanation_en:
          "Lightsail is for simpler projects, like a single virtual private server. Elastic Beanstalk is better suited for complex applications requiring load balancing and auto-scaling.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/elasticbeanstalk/"],
  },
  {
    id: "CLF-C02-SC-39",
    text: "Quais das seguintes opções são componentes de uma VPC (Virtual Private Cloud) da Amazon? (Escolha DUAS)",
    text_en:
      "Which of the following are components of an Amazon VPC (Virtual Private Cloud)? (Choose TWO)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Sub-redes",
        text_en: "Subnets",
        isCorrect: true,
        explanation:
          "Uma sub-rede é um intervalo de endereços IP em sua VPC. Você lança recursos da AWS, como instâncias EC2, em suas sub-redes.",
        explanation_en:
          "A subnet is a range of IP addresses in your VPC. You launch AWS resources, such as EC2 instances, into your subnets.",
      },
      {
        id: "B",
        text: "Zonas de Disponibilidade",
        text_en: "Availability Zones",
        isCorrect: false,
        explanation:
          "As Zonas de Disponibilidade são locais físicos dentro de uma Região da AWS. As sub-redes residem dentro das Zonas de Disponibilidade, mas as AZs não são um componente de uma VPC.",
        explanation_en:
          "Availability Zones are physical locations within an AWS Region. Subnets reside within Availability Zones, but AZs are not a component of a VPC.",
      },
      {
        id: "C",
        text: "Grupos do IAM",
        text_en: "IAM Groups",
        isCorrect: false,
        explanation:
          "Os Grupos do IAM são parte do serviço de Identity and Access Management e não têm relação com a infraestrutura de rede da VPC.",
        explanation_en:
          "IAM Groups are part of the Identity and Access Management service and are unrelated to VPC networking infrastructure.",
      },
      {
        id: "D",
        text: "Gateways da Internet",
        text_en: "Internet Gateways",
        isCorrect: true,
        explanation:
          "Um gateway da internet é um componente da VPC horizontalmente escalável, redundante e altamente disponível que permite a comunicação entre sua VPC e a internet.",
        explanation_en:
          "An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.",
      },
      {
        id: "E",
        text: "Volumes EBS",
        text_en: "EBS Volumes",
        isCorrect: false,
        explanation:
          "Volumes EBS são dispositivos de armazenamento em nível de bloco para uso com instâncias EC2. Eles não são um componente de rede da VPC.",
        explanation_en:
          "EBS Volumes are block-level storage devices for use with EC2 instances. They are not a networking component of the VPC.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html",
      "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
    ],
  },
  {
    id: "CLF-C02-BP-40",
    text: "Qual serviço ou recurso da AWS permite que você configure alertas que o notificam quando seus custos ou uso excedem um valor que você define?",
    text_en:
      "Which AWS service or feature allows you to set up alerts that notify you when your costs or usage exceed an amount that you define?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        text_en: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "O Cost Explorer é para visualização e análise de custos, não para criar alertas baseados em limites.",
        explanation_en:
          "Cost Explorer is for visualizing and analyzing costs, not for creating threshold-based alerts.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O Trusted Advisor fornece recomendações de otimização, mas não cria alertas de faturamento.",
        explanation_en:
          "Trusted Advisor provides optimization recommendations but does not create billing alerts.",
      },
      {
        id: "C",
        text: "AWS Budgets",
        text_en: "AWS Budgets",
        isCorrect: true,
        explanation:
          "O AWS Budgets permite que você defina orçamentos personalizados para rastrear seus custos e uso da AWS. Você pode configurar alertas para notificá-lo por e-mail ou SNS quando o custo ou o uso real ou previsto exceder o limite do seu orçamento.",
        explanation_en:
          "AWS Budgets allows you to set custom budgets to track your AWS cost and usage. You can set up alerts to notify you via email or SNS when your actual or forecasted cost or usage exceeds your budget's threshold.",
      },
      {
        id: "D",
        text: "Relatórios de Custo e Uso da AWS",
        text_en: "AWS Cost and Usage Reports",
        isCorrect: false,
        explanation:
          "Os Relatórios de Custo e Uso fornecem dados de custo e uso brutos e detalhados, mas não têm um recurso de alerta integrado. Você usaria o AWS Budgets para isso.",
        explanation_en:
          "Cost and Usage Reports provide raw, detailed cost and usage data but do not have a built-in alerting feature. You would use AWS Budgets for that.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
  },
  {
    id: "CLF-C02-TS-41",
    text: "Uma empresa precisa transferir 50 TB de dados de seu data center para o Amazon S3. A conexão com a internet no local é lenta e não confiável. Qual serviço da AWS é o mais adequado para transferir essa grande quantidade de dados de forma eficiente?",
    text_en:
      "A company needs to transfer 50 TB of data from its data center into Amazon S3. The on-site internet connection is slow and unreliable. Which AWS service is most suitable for transferring this large amount of data efficiently?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS DataSync",
        text_en: "AWS DataSync",
        isCorrect: false,
        explanation:
          "O AWS DataSync acelera as transferências de dados online. Como a conexão com a internet é lenta e não confiável, esta não é a melhor solução para uma transferência única de 50 TB.",
        explanation_en:
          "AWS DataSync accelerates online data transfers. Since the internet connection is slow and unreliable, this is not the best solution for a one-time 50 TB transfer.",
      },
      {
        id: "B",
        text: "AWS Snowball Edge",
        text_en: "AWS Snowball Edge",
        isCorrect: true,
        explanation:
          "A família AWS Snow, incluindo o Snowball Edge, é projetada para transferências de dados em escala de petabytes. A AWS envia um dispositivo físico para o seu local, você copia os dados para ele e o envia de volta para a AWS, que então carrega os dados no S3. Isso ignora a internet, tornando-o ideal para grandes transferências com conectividade ruim.",
        explanation_en:
          "The AWS Snow Family, including Snowball Edge, is designed for petabyte-scale data transfers. AWS ships a physical device to your location, you copy the data to it, and ship it back to AWS, who then uploads the data into S3. This bypasses the internet, making it ideal for large transfers with poor connectivity.",
      },
      {
        id: "C",
        text: "AWS Transfer Family",
        text_en: "AWS Transfer Family",
        isCorrect: false,
        explanation:
          "O AWS Transfer Family fornece transferências de arquivos totalmente gerenciadas por SFTP, FTPS e FTP para o Amazon S3. Ele depende da conexão com a internet, tornando-o inadequado para este cenário.",
        explanation_en:
          "AWS Transfer Family provides fully managed SFTP, FTPS, and FTP file transfers into Amazon S3. It relies on the internet connection, making it unsuitable for this scenario.",
      },
      {
        id: "D",
        text: "Amazon S3 Transfer Acceleration",
        text_en: "Amazon S3 Transfer Acceleration",
        isCorrect: false,
        explanation:
          "O S3 Transfer Acceleration acelera as transferências de arquivos para o S3 pela internet usando as localizações de borda da AWS. Ele ainda depende da internet e não é a melhor escolha para uma transferência de 50 TB com uma conexão ruim.",
        explanation_en:
          "S3 Transfer Acceleration speeds up file transfers to S3 over the internet by using AWS edge locations. It still relies on the internet and is not the best choice for a 50 TB transfer with a bad connection.",
      },
    ],
    category: "migration_transfer",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/snowball/"],
  },
  {
    id: "CLF-C02-CC-42",
    text: "Qual das seguintes opções é um exemplo de troca de despesas de capital (CapEx) por despesas operacionais (OpEx)?",
    text_en:
      "Which of the following is an example of trading capital expense (CapEx) for operational expense (OpEx)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Comprar e possuir servidores físicos em um data center.",
        text_en: "Buying and owning physical servers in a data center.",
        isCorrect: false,
        explanation:
          "A compra de hardware físico é uma despesa de capital clássica (CapEx).",
        explanation_en:
          "Purchasing physical hardware is a classic capital expense (CapEx).",
      },
      {
        id: "B",
        text: "Pagar por servidores virtuais da AWS com base no uso por hora.",
        text_en: "Paying for AWS virtual servers based on hourly usage.",
        isCorrect: true,
        explanation:
          "Em vez de investir pesadamente em datacenters e servidores antes de saber como vai usá-los (CapEx), você pode pagar apenas quando consumir recursos de computação e pagar apenas pela quantidade que consumir (OpEx). Este é um benefício fundamental da nuvem.",
        explanation_en:
          "Instead of investing heavily in data centers and servers before you know how you’re going to use them (CapEx), you can pay only when you consume computing resources, and pay only for how much you consume (OpEx). This is a core benefit of the cloud.",
      },
      {
        id: "C",
        text: "Contratar administradores de sistema para manter o hardware.",
        text_en: "Hiring system administrators to maintain hardware.",
        isCorrect: false,
        explanation:
          "O salário de um administrador de sistema é normalmente considerado uma despesa operacional (OpEx), mas não ilustra a troca de CapEx por OpEx que a nuvem permite.",
        explanation_en:
          "A system administrator's salary is typically considered an operational expense (OpEx), but it does not illustrate the trade of CapEx for OpEx that the cloud enables.",
      },
      {
        id: "D",
        text: "Assinar um contrato de 3 anos para espaço de data center.",
        text_en: "Signing a 3-year contract for data center space.",
        isCorrect: false,
        explanation:
          "Isso representa um compromisso financeiro de longo prazo, que, embora possa ser classificado como OpEx, não demonstra a flexibilidade de pagamento conforme o uso que caracteriza a nuvem.",
        explanation_en:
          "This represents a long-term financial commitment, which, while it might be classified as OpEx, does not demonstrate the pay-as-you-go flexibility that characterizes the cloud.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-SC-43",
    text: "Quais declarações sobre as Listas de Controle de Acesso à Rede (NACLs) em uma VPC da AWS são verdadeiras? (Escolha DUAS)",
    text_en:
      "Which statements about Network Access Control Lists (NACLs) in an AWS VPC are true? (Choose TWO)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Elas são com estado (stateful).",
        text_en: "They are stateful.",
        isCorrect: false,
        explanation:
          "As NACLs são sem estado (stateless), o que significa que as respostas ao tráfego de entrada permitido estão sujeitas às regras para o tráfego de saída (e vice-versa).",
        explanation_en:
          "NACLs are stateless, which means that responses to allowed inbound traffic are subject to the rules for outbound traffic (and vice versa).",
      },
      {
        id: "B",
        text: "Elas operam no nível da instância.",
        text_en: "They operate at the instance level.",
        isCorrect: false,
        explanation:
          "As NACLs operam no nível da sub-rede, atuando como um firewall para controlar o tráfego de e para uma ou mais sub-redes. Os grupos de segurança operam no nível da instância.",
        explanation_en:
          "NACLs operate at the subnet level, acting as a firewall for controlling traffic in and out of one or more subnets. Security groups operate at the instance level.",
      },
      {
        id: "C",
        text: "Elas suportam regras de permissão e negação.",
        text_en: "They support allow and deny rules.",
        isCorrect: true,
        explanation:
          "Ao contrário dos grupos de segurança (que suportam apenas regras de permissão), as NACLs permitem que você configure regras de 'permitir' e 'negar' para o tráfego.",
        explanation_en:
          "Unlike security groups (which only support allow rules), NACLs allow you to configure both 'allow' and 'deny' rules for traffic.",
      },
      {
        id: "D",
        text: "Elas processam as regras em ordem, do número mais baixo para o mais alto.",
        text_en:
          "They process rules in order, from the lowest number to the highest.",
        isCorrect: true,
        explanation:
          "As NACLs têm uma lista numerada de regras que são avaliadas em ordem, começando com a regra de número mais baixo, para determinar se o tráfego pode entrar ou sair da sub-rede.",
        explanation_en:
          "NACLs have a numbered list of rules that are evaluated in order, starting with the lowest-numbered rule, to determine whether traffic is allowed in or out of the subnet.",
      },
      {
        id: "E",
        text: "Por padrão, elas permitem todo o tráfego de entrada e saída.",
        text_en: "By default, they allow all inbound and outbound traffic.",
        isCorrect: false,
        explanation:
          "A NACL padrão permite todo o tráfego de entrada e saída. No entanto, uma NACL personalizada que você cria nega todo o tráfego por padrão até que você adicione regras.",
        explanation_en:
          "The default NACL allows all inbound and outbound traffic. However, a custom NACL that you create denies all traffic by default until you add rules.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
    ],
  },
  {
    id: "CLF-C02-TS-44",
    text: "Qual serviço da AWS fornece monitoramento de desempenho e observabilidade para recursos e aplicações da AWS e locais?",
    text_en:
      "Which AWS service provides performance monitoring and observability for AWS resources and applications, and on-premises?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS CloudTrail",
        text_en: "AWS CloudTrail",
        isCorrect: false,
        explanation:
          "O CloudTrail é para auditoria e governança, registrando chamadas de API. Não é para monitoramento de desempenho (por exemplo, uso de CPU).",
        explanation_en:
          "CloudTrail is for auditing and governance by logging API calls. It is not for performance monitoring (e.g., CPU utilization).",
      },
      {
        id: "B",
        text: "Amazon CloudWatch",
        text_en: "Amazon CloudWatch",
        isCorrect: true,
        explanation:
          "O Amazon CloudWatch é um serviço de monitoramento e observabilidade que fornece dados e insights acionáveis para monitorar suas aplicações, responder a mudanças de desempenho em todo o sistema, otimizar a utilização de recursos e obter uma visão unificada da saúde operacional.",
        explanation_en:
          "Amazon CloudWatch is a monitoring and observability service that provides you with data and actionable insights to monitor your applications, respond to system-wide performance changes, optimize resource utilization, and get a unified view of operational health.",
      },
      {
        id: "C",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config rastreia as alterações na configuração dos recursos. Não monitora métricas de desempenho como utilização de CPU ou latência de rede.",
        explanation_en:
          "AWS Config tracks resource configuration changes. It does not monitor performance metrics like CPU utilization or network latency.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O Trusted Advisor fornece recomendações em várias categorias, incluindo desempenho, mas não é a ferramenta de monitoramento em tempo real. Ele obtém alguns de seus dados do CloudWatch.",
        explanation_en:
          "Trusted Advisor provides recommendations across several categories, including performance, but it is not the real-time monitoring tool itself. It gets some of its data from CloudWatch.",
      },
    ],
    category: "management_governance",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/cloudwatch/"],
  },
  {
    id: "CLF-C02-CC-45",
    text: "Qual o principal benefício da implantação de uma aplicação em múltiplas Zonas de Disponibilidade?",
    text_en:
      "What is the primary benefit of deploying an application across multiple Availability Zones?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Melhorar a segurança.",
        text_en: "To improve security.",
        isCorrect: false,
        explanation:
          "A segurança é implementada por meio de serviços como IAM, WAF e grupos de segurança, não pela implantação em múltiplas AZs.",
        explanation_en:
          "Security is implemented through services like IAM, WAF, and security groups, not by deploying across multiple AZs.",
      },
      {
        id: "B",
        text: "Reduzir o custo da aplicação.",
        text_en: "To reduce application cost.",
        isCorrect: false,
        explanation:
          "A implantação em múltiplas AZs geralmente aumenta o custo devido à redundância de recursos. O benefício é a resiliência, não a economia de custos.",
        explanation_en:
          "Deploying across multiple AZs typically increases cost due to resource redundancy. The benefit is resilience, not cost savings.",
      },
      {
        id: "C",
        text: "Aumentar a disponibilidade e a tolerância a falhas.",
        text_en: "To increase availability and fault tolerance.",
        isCorrect: true,
        explanation:
          "As Zonas de Disponibilidade são locais fisicamente separados. Ao implantar recursos em múltiplas AZs, sua aplicação pode permanecer operacional mesmo que uma AZ inteira falhe, aumentando assim significativamente a disponibilidade e a tolerância a falhas.",
        explanation_en:
          "Availability Zones are physically separate locations. By deploying resources across multiple AZs, your application can remain operational even if an entire AZ fails, thus significantly increasing availability and fault tolerance.",
      },
      {
        id: "D",
        text: "Diminuir a latência para usuários globais.",
        text_en: "To decrease latency for global users.",
        isCorrect: false,
        explanation:
          "Para diminuir a latência para usuários globais, você implantaria a aplicação em múltiplas Regiões da AWS e usaria um serviço como o Amazon CloudFront, não apenas múltiplas AZs dentro de uma única Região.",
        explanation_en:
          "To decrease latency for global users, you would deploy the application across multiple AWS Regions and use a service like Amazon CloudFront, not just multiple AZs within a single Region.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/",
    ],
  },
  {
    id: "CLF-C02-SC-46",
    text: "Qual serviço da AWS fornece um serviço de Sistema de Nomes de Domínio (DNS) altamente disponível e escalável?",
    text_en:
      "Which AWS service provides a highly available and scalable Domain Name System (DNS) service?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon VPC",
        text_en: "Amazon VPC",
        isCorrect: false,
        explanation:
          "A Amazon VPC fornece a infraestrutura de rede virtual, não o serviço de DNS público.",
        explanation_en:
          "Amazon VPC provides the virtual network infrastructure, not the public DNS service.",
      },
      {
        id: "B",
        text: "AWS Direct Connect",
        text_en: "AWS Direct Connect",
        isCorrect: false,
        explanation:
          "O Direct Connect fornece uma conexão de rede dedicada, não um serviço de DNS.",
        explanation_en:
          "Direct Connect provides a dedicated network connection, not a DNS service.",
      },
      {
        id: "C",
        text: "Amazon CloudFront",
        text_en: "Amazon CloudFront",
        isCorrect: false,
        explanation:
          "O CloudFront é uma rede de entrega de conteúdo (CDN) que armazena conteúdo em cache. Embora use DNS, não é o serviço de DNS em si.",
        explanation_en:
          "CloudFront is a content delivery network (CDN) that caches content. While it uses DNS, it is not the DNS service itself.",
      },
      {
        id: "D",
        text: "Amazon Route 53",
        text_en: "Amazon Route 53",
        isCorrect: true,
        explanation:
          "O Amazon Route 53 é um serviço web de Sistema de Nomes de Domínio (DNS) na nuvem, altamente disponível e escalável. Ele foi projetado para dar aos desenvolvedores e empresas uma maneira extremamente confiável e econômica de direcionar os usuários finais para aplicações da Internet.",
        explanation_en:
          "Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost-effective way to route end users to Internet applications.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/route53/"],
  },
  {
    id: "CLF-C02-TS-47",
    text: "Que tipo de armazenamento o Amazon EBS (Elastic Block Store) fornece?",
    text_en:
      "What type of storage does Amazon EBS (Elastic Block Store) provide?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Armazenamento de objetos",
        text_en: "Object storage",
        isCorrect: false,
        explanation:
          "O armazenamento de objetos é fornecido pelo Amazon S3. O EBS fornece armazenamento em bloco.",
        explanation_en:
          "Object storage is provided by Amazon S3. EBS provides block storage.",
      },
      {
        id: "B",
        text: "Armazenamento em nível de bloco",
        text_en: "Block-level storage",
        isCorrect: true,
        explanation:
          "O Amazon EBS fornece volumes de armazenamento em nível de bloco para uso com instâncias EC2. Os volumes EBS se comportam como discos rígidos brutos e não formatados que você pode montar como dispositivos em suas instâncias.",
        explanation_en:
          "Amazon EBS provides block-level storage volumes for use with EC2 instances. EBS volumes behave like raw, unformatted hard drives that you can mount as devices on your instances.",
      },
      {
        id: "C",
        text: "Armazenamento de arquivos",
        text_en: "File storage",
        isCorrect: false,
        explanation:
          "O armazenamento de arquivos é fornecido por serviços como Amazon EFS e Amazon FSx.",
        explanation_en:
          "File storage is provided by services like Amazon EFS and Amazon FSx.",
      },
      {
        id: "D",
        text: "Armazenamento em cache",
        text_en: "Cache storage",
        isCorrect: false,
        explanation:
          "O armazenamento em cache na memória é fornecido pelo Amazon ElastiCache.",
        explanation_en:
          "In-memory cache storage is provided by Amazon ElastiCache.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/ebs/"],
  },
  {
    id: "CLF-C02-BP-48",
    text: "Qual nível do AWS Free Tier permite que novos clientes da AWS experimentem serviços qualificados gratuitamente até limites especificados por 12 meses a partir da data de inscrição da conta?",
    text_en:
      "Which AWS Free Tier level allows new AWS customers to try eligible services for free up to specified limits for 12 months from the account's sign-up date?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Sempre Gratuito (Always Free)",
        text_en: "Always Free",
        isCorrect: false,
        explanation:
          "A oferta 'Sempre Gratuito' inclui serviços que são gratuitos até certos limites para sempre, não apenas por 12 meses.",
        explanation_en:
          "The 'Always Free' offer includes services that are free up to certain limits forever, not just for 12 months.",
      },
      {
        id: "B",
        text: "12 Meses Gratuito (12 Months Free)",
        text_en: "12 Months Free",
        isCorrect: true,
        explanation:
          "A oferta '12 Meses Gratuito' permite que os clientes usem produtos com limites gratuitos por um ano a partir da data em que a conta foi criada. Serviços como EC2 (750 horas/mês), S3 (5 GB) e RDS (750 horas/mês) se enquadram nesta categoria.",
        explanation_en:
          "The '12 Months Free' offer allows customers to use products with free tiers for one year from the date the account was created. Services like EC2 (750 hrs/month), S3 (5 GB), and RDS (750 hrs/month) fall into this category.",
      },
      {
        id: "C",
        text: "Avaliações (Trials)",
        text_en: "Trials",
        isCorrect: false,
        explanation:
          "As avaliações são ofertas de curto prazo para serviços específicos, geralmente de 30, 60 ou 90 dias, e não a oferta geral de 12 meses.",
        explanation_en:
          "Trials are short-term offers for specific services, often for 30, 60, or 90 days, and not the general 12-month offer.",
      },
      {
        id: "D",
        text: "Nível de Crédito (Credit Tier)",
        text_en: "Credit Tier",
        isCorrect: false,
        explanation:
          "Não existe um 'Nível de Crédito' formal como parte do AWS Free Tier. Os créditos da AWS são fornecidos separadamente, muitas vezes por meio de programas como o AWS Activate.",
        explanation_en:
          "There is no formal 'Credit Tier' as part of the AWS Free Tier. AWS Credits are provided separately, often through programs like AWS Activate.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "easy",
    references: ["https://aws.amazon.com/free/"],
  },
  {
    id: "CLF-C02-SC-49",
    text: "Uma empresa deseja descobrir e proteger dados pessoais sensíveis (PII) armazenados em seus buckets do Amazon S3. Qual serviço da AWS pode ajudar a automatizar essa tarefa?",
    text_en:
      "A company wants to discover and protect sensitive personal data (PII) stored in its Amazon S3 buckets. Which AWS service can help automate this task?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        text_en: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "O GuardDuty é um serviço de detecção de ameaças que monitora logs em busca de atividades maliciosas, mas não varre o conteúdo dos objetos do S3 em busca de dados sensíveis.",
        explanation_en:
          "GuardDuty is a threat detection service that monitors logs for malicious activity, but it does not scan the content of S3 objects for sensitive data.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        text_en: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "O Inspector varre instâncias EC2 e contêineres em busca de vulnerabilidades de software, não dados sensíveis em buckets S3.",
        explanation_en:
          "Inspector scans EC2 instances and containers for software vulnerabilities, not sensitive data in S3 buckets.",
      },
      {
        id: "C",
        text: "Amazon Macie",
        text_en: "Amazon Macie",
        isCorrect: true,
        explanation:
          "O Amazon Macie é um serviço de segurança e privacidade de dados que usa aprendizado de máquina e correspondência de padrões para descobrir e proteger seus dados sensíveis na AWS. Ele identifica automaticamente dados sensíveis, como informações de identificação pessoal (PII).",
        explanation_en:
          "Amazon Macie is a data security and data privacy service that uses machine learning and pattern matching to discover and protect your sensitive data in AWS. It automatically identifies sensitive data such as personally identifiable information (PII).",
      },
      {
        id: "D",
        text: "AWS Shield",
        text_en: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield é um serviço de proteção contra DDoS e não está relacionado à descoberta de dados sensíveis.",
        explanation_en:
          "AWS Shield is a DDoS protection service and is unrelated to sensitive data discovery.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/macie/"],
  },
  {
    id: "CLF-C02-TS-50",
    text: "Qual serviço da AWS pode ser usado para consultar dados diretamente no Amazon S3 usando SQL padrão, sem a necessidade de carregar os dados em um banco de dados?",
    text_en:
      "Which AWS service can be used to query data directly in Amazon S3 using standard SQL, without needing to load the data into a database?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Redshift",
        text_en: "Amazon Redshift",
        isCorrect: false,
        explanation:
          "O Amazon Redshift é um data warehouse. Normalmente, você carrega dados de fontes como o S3 para o Redshift para realizar consultas. O Redshift Spectrum permite consultar dados no S3, mas o Athena é o serviço principal projetado para esta finalidade.",
        explanation_en:
          "Amazon Redshift is a data warehouse. You typically load data from sources like S3 into Redshift to perform queries. Redshift Spectrum allows querying data in S3, but Athena is the primary service designed for this purpose.",
      },
      {
        id: "B",
        text: "Amazon RDS",
        text_en: "Amazon RDS",
        isCorrect: false,
        explanation:
          "O Amazon RDS é um serviço de banco de dados relacional. Você precisa carregar os dados no banco de dados para consultá-los; ele não consulta dados diretamente no S3.",
        explanation_en:
          "Amazon RDS is a relational database service. You need to load data into the database to query it; it does not query data directly in S3.",
      },
      {
        id: "C",
        text: "Amazon DynamoDB",
        text_en: "Amazon DynamoDB",
        isCorrect: false,
        explanation:
          "O DynamoDB é um banco de dados NoSQL. Ele não usa SQL padrão e não consulta dados diretamente no S3.",
        explanation_en:
          "DynamoDB is a NoSQL database. It does not use standard SQL and does not query data directly in S3.",
      },
      {
        id: "D",
        text: "Amazon Athena",
        text_en: "Amazon Athena",
        isCorrect: true,
        explanation:
          "O Amazon Athena é um serviço de consulta interativo que facilita a análise de dados no Amazon S3 usando SQL padrão. O Athena é sem servidor, então não há infraestrutura para gerenciar, e você paga apenas pelas consultas que executa.",
        explanation_en:
          "Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.",
      },
    ],
    category: "analytics",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/athena/"],
  },
  {
    id: "CLF-C02-CC-51",
    text: "Quais são dois dos seis pilares do AWS Well-Architected Framework? (Escolha DUAS)",
    text_en:
      "What are two of the six pillars of the AWS Well-Architected Framework? (Choose TWO)",
    type: "multiple_choice",
    options: [
      {
        id: "A",
        text: "Agilidade",
        text_en: "Agility",
        isCorrect: false,
        explanation:
          "Agilidade é um benefício da nuvem, mas não é um dos seis pilares do Well-Architected Framework.",
        explanation_en:
          "Agility is a benefit of the cloud, but it is not one of the six pillars of the Well-Architected Framework.",
      },
      {
        id: "B",
        text: "Segurança",
        text_en: "Security",
        isCorrect: true,
        explanation:
          "O pilar de Segurança se concentra em proteger informações, sistemas e ativos, ao mesmo tempo que entrega valor de negócio por meio de avaliações de risco e estratégias de mitigação.",
        explanation_en:
          "The Security pillar focuses on protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies.",
      },
      {
        id: "C",
        text: "Disponibilidade",
        text_en: "Availability",
        isCorrect: false,
        explanation:
          "Disponibilidade é um conceito chave dentro do pilar de Confiabilidade, mas não é um pilar em si.",
        explanation_en:
          "Availability is a key concept within the Reliability pillar but is not a pillar itself.",
      },
      {
        id: "D",
        text: "Eficiência de Performance",
        text_en: "Performance Efficiency",
        isCorrect: true,
        explanation:
          "O pilar de Eficiência de Performance se concentra no uso eficiente dos recursos de computação para atender aos requisitos e manter essa eficiência à medida que a demanda muda e as tecnologias evoluem.",
        explanation_en:
          "The Performance Efficiency pillar focuses on the efficient use of computing resources to meet requirements and to maintain that efficiency as demand changes and technologies evolve.",
      },
      {
        id: "E",
        text: "Elasticidade",
        text_en: "Elasticity",
        isCorrect: false,
        explanation:
          "Elasticidade é um conceito chave dentro do pilar de Eficiência de Performance, mas não é um pilar em si.",
        explanation_en:
          "Elasticity is a key concept within the Performance Efficiency pillar but is not a pillar itself.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/architecture/well-architected/"],
  },
  {
    id: "CLF-C02-SC-52",
    text: "Qual o propósito principal de uma política de senha do IAM?",
    text_en: "What is the primary purpose of an IAM password policy?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Restringir o acesso a serviços específicos da AWS.",
        text_en: "To restrict access to specific AWS services.",
        isCorrect: false,
        explanation:
          "Restringir o acesso a serviços é feito por meio de políticas do IAM (documentos JSON), não pela política de senha.",
        explanation_en:
          "Restricting service access is done via IAM policies (JSON documents), not the password policy.",
      },
      {
        id: "B",
        text: "Habilitar a autenticação multifator (MFA).",
        text_en: "To enable multi-factor authentication (MFA).",
        isCorrect: false,
        explanation:
          "A habilitação da MFA é uma configuração separada para cada usuário ou para o usuário raiz e não é controlada pela política de senha.",
        explanation_en:
          "Enabling MFA is a separate setting for each user or the root user and is not controlled by the password policy.",
      },
      {
        id: "C",
        text: "Aplicar requisitos de complexidade de senha e rotação obrigatória.",
        text_en:
          "To enforce password complexity requirements and mandatory rotation.",
        isCorrect: true,
        explanation:
          "Uma política de senha do IAM permite que você defina regras para as senhas dos usuários do IAM, como comprimento mínimo, requisitos de caracteres (maiúsculas, minúsculas, números, símbolos) e se as senhas devem expirar e ser rotacionadas.",
        explanation_en:
          "An IAM password policy allows you to set rules for IAM user passwords, such as minimum length, character requirements (uppercase, lowercase, numbers, symbols), and whether passwords must expire and be rotated.",
      },
      {
        id: "D",
        text: "Auditar quem fez login na conta da AWS.",
        text_en: "To audit who has logged into the AWS account.",
        isCorrect: false,
        explanation:
          "A auditoria de logins é uma função do AWS CloudTrail, que registra a atividade da conta.",
        explanation_en:
          "Auditing logins is a function of AWS CloudTrail, which records account activity.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html",
    ],
  },
  {
    id: "CLF-C02-TS-53",
    text: "Qual classe de armazenamento do Amazon S3 é projetada para dados acessados com pouca frequência que ainda requerem acesso rápido quando necessário?",
    text_en:
      "Which Amazon S3 storage class is designed for infrequently accessed data that still requires rapid access when needed?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "S3 Standard",
        text_en: "S3 Standard",
        isCorrect: false,
        explanation:
          "O S3 Standard é para dados acessados com frequência. Ele oferece alta durabilidade, disponibilidade e desempenho com baixa latência.",
        explanation_en:
          "S3 Standard is for frequently accessed data. It offers high durability, availability, and low-latency performance.",
      },
      {
        id: "B",
        text: "S3 Standard-Infrequent Access (S3 Standard-IA)",
        text_en: "S3 Standard-Infrequent Access (S3 Standard-IA)",
        isCorrect: true,
        explanation:
          "O S3 Standard-IA é para dados acessados com menos frequência, mas que requerem acesso rápido quando necessário. Ele oferece a alta durabilidade, taxa de transferência e baixa latência do S3 Standard, com um preço de armazenamento por GB e uma taxa de recuperação de dados mais baixos.",
        explanation_en:
          "S3 Standard-IA is for data that is accessed less frequently but requires rapid access when needed. It offers the high durability, throughput, and low latency of S3 Standard, with a low per-GB storage price and a data retrieval fee.",
      },
      {
        id: "C",
        text: "S3 Glacier Instant Retrieval",
        text_en: "S3 Glacier Instant Retrieval",
        isCorrect: false,
        explanation:
          "Esta classe é para dados de arquivamento raramente acessados (por exemplo, uma vez por trimestre) que requerem recuperação em milissegundos. Embora seja para acesso infrequente, o S3 Standard-IA é a classe 'padrão' para este caso de uso antes de passar para o arquivamento.",
        explanation_en:
          "This class is for archival data that is rarely accessed (e.g., once a quarter) and requires millisecond retrieval. While it's for infrequent access, S3 Standard-IA is the 'standard' class for this use case before moving to archival.",
      },
      {
        id: "D",
        text: "S3 Glacier Deep Archive",
        text_en: "S3 Glacier Deep Archive",
        isCorrect: false,
        explanation:
          "O S3 Glacier Deep Archive é a classe de armazenamento de menor custo da Amazon S3 e suporta retenção de dados a longo prazo e arquivamento digital para dados que podem ser acessados uma ou duas vezes por ano. Os tempos de recuperação são de horas.",
        explanation_en:
          "S3 Glacier Deep Archive is Amazon S3’s lowest-cost storage class and supports long-term retention and digital preservation for data that may be accessed once or twice a year. Retrieval times are in hours.",
      },
    ],
    category: "storage",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/storage-classes/"],
  },
  {
    id: "CLF-C02-CC-54",
    text: "Qual das seguintes opções é uma responsabilidade da AWS de acordo com o Modelo de Responsabilidade Compartilhada?",
    text_en:
      "Which of the following is an AWS responsibility under the Shared Responsibility Model?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Configuração de grupos de segurança.",
        text_en: "Configuration of security groups.",
        isCorrect: false,
        explanation:
          "A configuração de grupos de segurança, que atuam como firewalls de instância, é uma responsabilidade do cliente.",
        explanation_en:
          "Configuring security groups, which act as instance firewalls, is a customer responsibility.",
      },
      {
        id: "B",
        text: "Criptografia de dados do lado do cliente.",
        text_en: "Client-side data encryption.",
        isCorrect: false,
        explanation:
          "A proteção de dados, incluindo a escolha de usar criptografia do lado do cliente ou do lado do servidor, é responsabilidade do cliente.",
        explanation_en:
          "Protecting data, including choosing to use client-side or server-side encryption, is the customer's responsibility.",
      },
      {
        id: "C",
        text: "Gerenciamento do hipervisor.",
        text_en: "Hypervisor management.",
        isCorrect: true,
        explanation:
          "A AWS é responsável pela segurança 'da' nuvem. Isso inclui a infraestrutura de virtualização, como o hipervisor, que executa instâncias EC2. A AWS gerencia e aplica patches neste componente.",
        explanation_en:
          "AWS is responsible for security 'of' the cloud. This includes the virtualization infrastructure, such as the hypervisor, that runs EC2 instances. AWS manages and patches this component.",
      },
      {
        id: "D",
        text: "Aplicação de patches em sistemas operacionais convidados.",
        text_en: "Patching guest operating systems.",
        isCorrect: false,
        explanation:
          "Para serviços de IaaS como o EC2, o cliente é responsável por aplicar patches no sistema operacional convidado que executa em suas instâncias.",
        explanation_en:
          "For IaaS services like EC2, the customer is responsible for patching the guest operating system running on their instances.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "CLF-C02-TS-55",
    text: "Uma empresa precisa de um serviço para gerenciar centralmente várias contas da AWS, automatizar a criação de contas e aplicar políticas de governança. Qual serviço da AWS atende a esses requisitos?",
    text_en:
      "A company needs a service to centrally manage multiple AWS accounts, automate account creation, and apply governance policies. Which AWS service meets these requirements?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS IAM (Identity and Access Management)",
        text_en: "AWS IAM (Identity and Access Management)",
        isCorrect: false,
        explanation:
          "O IAM é para gerenciar usuários, grupos e permissões dentro de uma única conta da AWS, não para gerenciar várias contas.",
        explanation_en:
          "IAM is for managing users, groups, and permissions within a single AWS account, not for managing multiple accounts.",
      },
      {
        id: "B",
        text: "AWS Organizations",
        text_en: "AWS Organizations",
        isCorrect: true,
        explanation:
          "O AWS Organizations ajuda a governar, gerenciar e auditar centralmente seu ambiente à medida que você cresce e escala seus recursos da AWS. Você pode criar novas contas, agrupar contas em unidades organizacionais (OUs) e aplicar políticas (SCPs) a contas ou OUs para controle centralizado.",
        explanation_en:
          "AWS Organizations helps you centrally govern, manage, and audit your environment as you grow and scale your AWS resources. You can create new accounts, group accounts into organizational units (OUs), and apply policies (SCPs) to accounts or OUs for centralized control.",
      },
      {
        id: "C",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config é para avaliar e auditar as configurações dos recursos da AWS, não para gerenciar contas.",
        explanation_en:
          "AWS Config is for assessing and auditing the configurations of AWS resources, not for managing accounts.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        text_en: "AWS Trusted Advisor",
        isCorrect: false,
        explanation:
          "O Trusted Advisor fornece recomendações de otimização para contas, mas não as gerencia.",
        explanation_en:
          "Trusted Advisor provides optimization recommendations for accounts but does not manage them.",
      },
    ],
    category: "management_governance",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/organizations/"],
  },
  {
    id: "CLF-C02-SC-56",
    text: "Qual o propósito de um Gateway NAT (Network Address Translation) em uma VPC da Amazon?",
    text_en:
      "What is the purpose of a Network Address Translation (NAT) Gateway in an Amazon VPC?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Permitir que a internet inicie conexões com instâncias em uma sub-rede privada.",
        text_en:
          "To allow the internet to initiate connections to instances in a private subnet.",
        isCorrect: false,
        explanation:
          "Um Gateway NAT não permite conexões iniciadas pela internet. Para isso, seria necessário um balanceador de carga ou um endereço IP público na instância.",
        explanation_en:
          "A NAT Gateway does not allow internet-initiated connections. For that, a load balancer or a public IP on the instance would be needed.",
      },
      {
        id: "B",
        text: "Permitir que instâncias em uma sub-rede privada iniciem conexões de saída para a internet, mas impedir que a internet inicie conexões com essas instâncias.",
        text_en:
          "To enable instances in a private subnet to initiate outbound connections to the internet but prevent the internet from initiating connections with those instances.",
        isCorrect: true,
        explanation:
          "Um Gateway NAT permite que recursos em uma sub-rede privada (sem endereços IP públicos) se conectem a serviços fora da VPC (como a internet para atualizações de software), mas impede que conexões externas sejam iniciadas para esses recursos, melhorando a segurança.",
        explanation_en:
          "A NAT Gateway allows resources in a private subnet (without public IPs) to connect to services outside the VPC (like the internet for software updates) but prevents external connections from being initiated to those resources, improving security.",
      },
      {
        id: "C",
        text: "Conectar duas VPCs.",
        text_en: "To connect two VPCs together.",
        isCorrect: false,
        explanation:
          "A conexão de VPCs é feita usando o VPC Peering ou o AWS Transit Gateway.",
        explanation_en:
          "Connecting VPCs is done using VPC Peering or AWS Transit Gateway.",
      },
      {
        id: "D",
        text: "Fornecer uma conexão privada e dedicada de um data center local para a AWS.",
        text_en:
          "To provide a private, dedicated connection from an on-premises data center to AWS.",
        isCorrect: false,
        explanation:
          "Uma conexão dedicada é fornecida pelo AWS Direct Connect.",
        explanation_en:
          "A dedicated connection is provided by AWS Direct Connect.",
      },
    ],
    category: "networking",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: [
      "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
    ],
  },
  {
    id: "CLF-C02-CC-57",
    text: "Uma empresa de jogos está lançando um novo jogo e espera um aumento maciço e imprevisível de usuários. Eles precisam ser capazes de adicionar e remover servidores automaticamente com base na demanda. Qual conceito de nuvem isso descreve?",
    text_en:
      "A gaming company is launching a new game and expects a massive, unpredictable surge of users. They need to be able to add and remove servers automatically based on demand. Which cloud concept does this describe?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Alta Disponibilidade",
        text_en: "High Availability",
        isCorrect: false,
        explanation:
          "Alta disponibilidade significa projetar para evitar falhas, geralmente usando redundância. Embora relacionado, o conceito principal aqui é a capacidade de dimensionar.",
        explanation_en:
          "High availability means designing to prevent failure, often using redundancy. While related, the core concept here is the ability to scale.",
      },
      {
        id: "B",
        text: "Elasticidade",
        text_en: "Elasticity",
        isCorrect: true,
        explanation:
          "Elasticidade é a capacidade da nuvem de escalar recursos de computação para cima e para baixo de forma automática e fácil em resposta a picos de tráfego. Isso permite que a empresa lide com o aumento de usuários sem provisionar excessivamente ou ter um desempenho ruim.",
        explanation_en:
          "Elasticity is the cloud's ability to automatically and easily scale computing resources up and down in response to traffic spikes. This allows the company to handle the user surge without over-provisioning or performing poorly.",
      },
      {
        id: "C",
        text: "Economia de Custos",
        text_en: "Cost-Effectiveness",
        isCorrect: false,
        explanation:
          "A elasticidade leva à economia de custos (porque você só paga pelo que usa), mas o conceito técnico que descreve o dimensionamento automático é a elasticidade.",
        explanation_en:
          "Elasticity leads to cost-effectiveness (because you only pay for what you use), but the technical concept describing automatic scaling is elasticity.",
      },
      {
        id: "D",
        text: "Tolerância a Falhas",
        text_en: "Fault Tolerance",
        isCorrect: false,
        explanation:
          "Tolerância a falhas é a capacidade de um sistema continuar funcionando mesmo se um ou mais de seus componentes falharem. É um aspecto da confiabilidade, não do dimensionamento da demanda.",
        explanation_en:
          "Fault tolerance is the ability of a system to continue operating even if one or more of its components fail. It is an aspect of reliability, not demand scaling.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is-cloud-computing/"],
  },
  {
    id: "CLF-C02-TS-58",
    text: "Qual serviço de banco de dados da AWS é mais adequado para casos de uso de data warehousing e análise de big data?",
    text_en:
      "Which AWS database service is most suitable for data warehousing and big data analytics use cases?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        text_en: "Amazon RDS",
        isCorrect: false,
        explanation:
          "O Amazon RDS é projetado para cargas de trabalho de processamento de transações online (OLTP), não para as consultas analíticas complexas (OLAP) típicas de um data warehouse.",
        explanation_en:
          "Amazon RDS is designed for online transaction processing (OLTP) workloads, not the complex analytical queries (OLAP) typical of a data warehouse.",
      },
      {
        id: "B",
        text: "Amazon DynamoDB",
        text_en: "Amazon DynamoDB",
        isCorrect: false,
        explanation:
          "O DynamoDB é um banco de dados NoSQL otimizado para acesso de baixa latência a itens individuais, não para executar consultas analíticas em grandes conjuntos de dados.",
        explanation_en:
          "DynamoDB is a NoSQL database optimized for low-latency access to individual items, not for running analytical queries across large datasets.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        text_en: "Amazon Redshift",
        isCorrect: true,
        explanation:
          "O Amazon Redshift é um serviço de data warehouse em escala de petabytes, rápido e totalmente gerenciado, que torna simples e econômico analisar todos os seus dados usando suas ferramentas de inteligência de negócios existentes. Ele foi projetado especificamente para análise de big data.",
        explanation_en:
          "Amazon Redshift is a fast, fully managed, petabyte-scale data warehouse service that makes it simple and cost-effective to analyze all your data using your existing business intelligence tools. It is specifically designed for big data analytics.",
      },
      {
        id: "D",
        text: "Amazon ElastiCache",
        text_en: "Amazon ElastiCache",
        isCorrect: false,
        explanation:
          "O ElastiCache é um serviço de cache na memória usado para acelerar o desempenho de aplicações, não para análise de dados persistentes.",
        explanation_en:
          "ElastiCache is an in-memory caching service used to speed up application performance, not for persistent data analysis.",
      },
    ],
    category: "database",
    dominio: "DOMAIN_3",
    difficulty: "medium",
    references: ["https://aws.amazon.com/redshift/"],
  },
  {
    id: "CLF-C02-SC-59",
    text: "De acordo com o princípio do privilégio mínimo, quais permissões devem ser concedidas a um usuário do IAM?",
    text_en:
      "According to the principle of least privilege, what permissions should be granted to an IAM user?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Acesso total a todos os serviços da AWS para flexibilidade.",
        text_en: "Full access to all AWS services for flexibility.",
        isCorrect: false,
        explanation:
          "Isso viola diretamente o princípio do privilégio mínimo e cria um risco de segurança significativo.",
        explanation_en:
          "This directly violates the principle of least privilege and creates a significant security risk.",
      },
      {
        id: "B",
        text: "Apenas as permissões mínimas necessárias para realizar suas tarefas.",
        text_en:
          "Only the minimum permissions required to perform their tasks.",
        isCorrect: true,
        explanation:
          "O princípio do privilégio mínimo é uma prática de segurança padrão de ouro que dita que uma identidade de usuário só deve ter as permissões de acesso essenciais para executar seu trabalho ou função e nada mais.",
        explanation_en:
          "The principle of least privilege is a gold-standard security practice that dictates a user identity should only have the access permissions essential to perform their job or function and no more.",
      },
      {
        id: "C",
        text: "As mesmas permissões que os outros membros de sua equipe.",
        text_en: "The same permissions as the other members of their team.",
        isCorrect: false,
        explanation:
          "Embora os grupos do IAM sejam úteis, as permissões ainda devem ser baseadas nas responsabilidades individuais do trabalho, não apenas na associação à equipe. As funções dentro de uma equipe podem variar.",
        explanation_en:
          "While IAM groups are useful, permissions should still be based on individual job responsibilities, not just team membership. Roles within a team can vary.",
      },
      {
        id: "D",
        text: "Acesso somente leitura a todos os serviços da AWS por padrão.",
        text_en: "Read-only access to all AWS services by default.",
        isCorrect: false,
        explanation:
          "Embora o acesso somente leitura seja mais seguro do que o acesso total, ainda pode conceder acesso a informações que o usuário não precisa ver. O privilégio mínimo é mais específico.",
        explanation_en:
          "While read-only access is safer than full access, it may still grant access to information the user does not need to see. Least privilege is more specific.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "easy",
    references: [
      "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege",
    ],
  },
  {
    id: "CLF-C02-BP-60",
    text: "Qual ferramenta da AWS permite que uma empresa compare o custo de executar suas aplicações em um ambiente local com a execução na AWS?",
    text_en:
      "Which AWS tool allows a company to compare the cost of running its applications in an on-premises environment with running them on AWS?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Calculadora de Preços da AWS",
        text_en: "AWS Pricing Calculator",
        isCorrect: false,
        explanation:
          "A Calculadora de Preços da AWS é para estimar o custo de usar os serviços da AWS. Ela não faz uma comparação direta com os custos locais.",
        explanation_en:
          "The AWS Pricing Calculator is for estimating the cost of using AWS services. It does not perform a direct comparison with on-premises costs.",
      },
      {
        id: "B",
        text: "AWS Cost Explorer",
        text_en: "AWS Cost Explorer",
        isCorrect: false,
        explanation:
          "O Cost Explorer é para analisar os custos atuais e históricos na AWS, não para comparar com os custos locais.",
        explanation_en:
          "Cost Explorer is for analyzing current and historical costs on AWS, not for comparing with on-premises costs.",
      },
      {
        id: "C",
        text: "Calculadora de Custo Total de Propriedade (TCO)",
        text_en: "Total Cost of Ownership (TCO) Calculator",
        isCorrect: true,
        explanation:
          "A Calculadora de TCO da AWS ajuda você a comparar o custo de executar suas aplicações em um ambiente local com a AWS. Ela fornece um relatório detalhado que pode ser usado para apoiar decisões de negócios para migrar para a nuvem.",
        explanation_en:
          "The AWS TCO Calculator helps you compare the cost of running your applications in an on-premises environment versus on AWS. It provides a detailed report that can be used to support business decisions to move to the cloud.",
      },
      {
        id: "D",
        text: "AWS Budgets",
        text_en: "AWS Budgets",
        isCorrect: false,
        explanation:
          "O AWS Budgets é para definir alertas de custo e uso para seus gastos na AWS, não para fazer comparações de TCO.",
        explanation_en:
          "AWS Budgets is for setting cost and usage alerts for your AWS spending, not for making TCO comparisons.",
      },
    ],
    category: "billing",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/tco/"],
  },
  {
    id: "CLF-C02-TS-61",
    text: "Qual é a maneira mais fácil de lançar e gerenciar um servidor virtual privado (VPS) na AWS, que inclui tudo o que você precisa para iniciar seu projeto - uma máquina virtual, armazenamento baseado em SSD, transferência de dados, gerenciamento de DNS e um IP estático?",
    text_en:
      "What is the easiest way to launch and manage a virtual private server (VPS) on AWS, which includes everything you need to jumpstart your project – a virtual machine, SSD-based storage, data transfer, DNS management, and a static IP?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon EC2",
        text_en: "Amazon EC2",
        isCorrect: false,
        explanation:
          "O EC2 fornece os servidores virtuais, mas você teria que configurar os outros componentes (armazenamento, DNS, IP estático) separadamente. O Lightsail agrupa tudo isso.",
        explanation_en:
          "EC2 provides the virtual servers, but you would have to configure the other components (storage, DNS, static IP) separately. Lightsail bundles all of this together.",
      },
      {
        id: "B",
        text: "AWS Elastic Beanstalk",
        text_en: "AWS Elastic Beanstalk",
        isCorrect: false,
        explanation:
          "O Elastic Beanstalk é uma plataforma como serviço (PaaS) para implantar aplicações, não para gerenciar um único VPS.",
        explanation_en:
          "Elastic Beanstalk is a Platform as a Service (PaaS) for deploying applications, not for managing a single VPS.",
      },
      {
        id: "C",
        text: "Amazon Lightsail",
        text_en: "Amazon Lightsail",
        isCorrect: true,
        explanation:
          "O Amazon Lightsail foi projetado para ser a maneira mais fácil de lançar e gerenciar um VPS com a AWS. Ele agrupa todos os recursos necessários em um único pacote com um preço mensal simples e previsível.",
        explanation_en:
          "Amazon Lightsail is designed to be the easiest way to launch and manage a VPS with AWS. It bundles all the necessary resources into a single package with a simple, predictable monthly price.",
      },
      {
        id: "D",
        text: "AWS Fargate",
        text_en: "AWS Fargate",
        isCorrect: false,
        explanation:
          "O AWS Fargate é uma tecnologia sem servidor para contêineres. Não é usado para gerenciar um servidor virtual tradicional.",
        explanation_en:
          "AWS Fargate is a serverless technology for containers. It is not used for managing a traditional virtual server.",
      },
    ],
    category: "compute",
    dominio: "DOMAIN_3",
    difficulty: "easy",
    references: ["https://aws.amazon.com/lightsail/"],
  },
  {
    id: "CLF-C02-SC-62",
    text: "Um administrador de segurança deseja aplicar regras de governança em várias contas da AWS em uma organização. Por exemplo, eles querem proibir o lançamento de certos tipos de instância EC2 em todas as contas de desenvolvimento. Qual serviço deve ser usado para aplicar essa política?",
    text_en:
      "A security administrator wants to apply governance rules across multiple AWS accounts in an organization. For example, they want to prohibit the launching of certain EC2 instance types in all development accounts. Which service should be used to enforce this policy?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Políticas do IAM",
        text_en: "IAM policies",
        isCorrect: false,
        explanation:
          "As políticas do IAM são aplicadas dentro de uma única conta. Para aplicar políticas em várias contas, você precisa do AWS Organizations.",
        explanation_en:
          "IAM policies are applied within a single account. To enforce policies across multiple accounts, you need AWS Organizations.",
      },
      {
        id: "B",
        text: "AWS Organizations com Políticas de Controle de Serviço (SCPs)",
        text_en: "AWS Organizations with Service Control Policies (SCPs)",
        isCorrect: true,
        explanation:
          "O AWS Organizations permite o gerenciamento central de várias contas. As Políticas de Controle de Serviço (SCPs) são um tipo de política de organização que você pode usar para gerenciar permissões em sua organização, estabelecendo barreiras de proteção para as ações que os usuários ou funções em uma conta podem realizar.",
        explanation_en:
          "AWS Organizations allows for central management of multiple accounts. Service Control Policies (SCPs) are a type of organization policy that you can use to manage permissions in your organization, establishing guardrails for what actions users or roles in an account can perform.",
      },
      {
        id: "C",
        text: "AWS Config Rules",
        text_en: "AWS Config Rules",
        isCorrect: false,
        explanation:
          "As regras do AWS Config podem detectar recursos não conformes, mas não podem impedir proativamente sua criação. As SCPs podem impedir a ação.",
        explanation_en:
          "AWS Config Rules can detect non-compliant resources, but they cannot proactively prevent their creation. SCPs can prevent the action.",
      },
      {
        id: "D",
        text: "Grupos de Segurança",
        text_en: "Security Groups",
        isCorrect: false,
        explanation:
          "Grupos de segurança são firewalls de nível de instância e não podem ser usados para controlar quais tipos de instância podem ser lançados.",
        explanation_en:
          "Security groups are instance-level firewalls and cannot be used to control which instance types can be launched.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: [
      "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    ],
  },
  {
    id: "CLF-C02-CC-63",
    text: "Qual é a proposta de valor da Nuvem AWS?",
    text_en: "What is the value proposition of the AWS Cloud?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Oferecer uma plataforma que requer gerenciamento extensivo de hardware.",
        text_en:
          "To offer a platform that requires extensive hardware management.",
        isCorrect: false,
        explanation:
          "A proposta de valor da AWS é o oposto: ela elimina a necessidade de os clientes gerenciarem hardware físico.",
        explanation_en:
          "The value proposition of AWS is the opposite: it removes the need for customers to manage physical hardware.",
      },
      {
        id: "B",
        text: "Permitir que as empresas se concentrem em suas próprias atividades de negócio, em vez de gerenciar a infraestrutura.",
        text_en:
          "To allow companies to focus on their own business activities rather than on managing infrastructure.",
        isCorrect: true,
        explanation:
          "A principal proposta de valor da AWS é lidar com o 'trabalho pesado indiferenciado' de executar a infraestrutura de TI, permitindo que as empresas se concentrem em seus produtos, serviços e clientes que as diferenciam no mercado.",
        explanation_en:
          "The core value proposition of AWS is to handle the 'undifferentiated heavy lifting' of running IT infrastructure, allowing businesses to focus on their products, services, and customers that differentiate them in the market.",
      },
      {
        id: "C",
        text: "Fornecer uma solução única para todos os problemas de computação.",
        text_en: "To provide a single solution for all computing problems.",
        isCorrect: false,
        explanation:
          "A AWS oferece uma ampla gama de serviços diferentes, cada um adequado para diferentes casos de uso. Não é uma solução única.",
        explanation_en:
          "AWS offers a wide range of different services, each suited for different use cases. It is not a one-size-fits-all solution.",
      },
      {
        id: "D",
        text: "Exigir compromissos de longo prazo para todos os serviços.",
        text_en: "To require long-term commitments for all services.",
        isCorrect: false,
        explanation:
          "Uma das principais vantagens da AWS é seu modelo de preços de pagamento conforme o uso, que não exige compromissos de longo prazo para a maioria dos serviços.",
        explanation_en:
          "A key advantage of AWS is its pay-as-you-go pricing model, which does not require long-term commitments for most services.",
      },
    ],
    category: "cloud_concepts",
    dominio: "DOMAIN_1",
    difficulty: "easy",
    references: ["https://aws.amazon.com/what-is-aws/"],
  },
  {
    id: "CLF-C02-TS-64",
    text: "Qual serviço da AWS pode ser usado para automatizar tarefas operacionais, como aplicação de patches, em um grande grupo de instâncias do Amazon EC2 e servidores locais?",
    text_en:
      "Which AWS service can be used to automate operational tasks, such as patching, across a large group of Amazon EC2 instances and on-premises servers?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Config",
        text_en: "AWS Config",
        isCorrect: false,
        explanation:
          "O AWS Config rastreia as configurações dos recursos, mas não executa tarefas operacionais como a aplicação de patches.",
        explanation_en:
          "AWS Config tracks resource configurations but does not execute operational tasks like patching.",
      },
      {
        id: "B",
        text: "AWS OpsWorks",
        text_en: "AWS OpsWorks",
        isCorrect: false,
        explanation:
          "O AWS OpsWorks é um serviço de gerenciamento de configuração que usa Chef e Puppet. Embora possa realizar essas tarefas, o Systems Manager é a solução mais ampla e integrada da AWS para gerenciamento operacional.",
        explanation_en:
          "AWS OpsWorks is a configuration management service that uses Chef and Puppet. While it can perform these tasks, Systems Manager is the broader, more integrated AWS solution for operational management.",
      },
      {
        id: "C",
        text: "AWS Systems Manager",
        text_en: "AWS Systems Manager",
        isCorrect: true,
        explanation:
          "O AWS Systems Manager fornece uma interface de usuário unificada para que você possa visualizar dados operacionais de vários serviços da AWS e automatizar tarefas operacionais em seus recursos da AWS e infraestrutura híbrida. O Patch Manager, um recurso do Systems Manager, automatiza o processo de aplicação de patches em frotas de instâncias.",
        explanation_en:
          "AWS Systems Manager provides a unified user interface so you can view operational data from multiple AWS services and automate operational tasks across your AWS resources and hybrid infrastructure. Patch Manager, a capability of Systems Manager, automates the process of patching fleets of instances.",
      },
      {
        id: "D",
        text: "AWS CloudFormation",
        text_en: "AWS CloudFormation",
        isCorrect: false,
        explanation:
          "O CloudFormation é para provisionar infraestrutura como código. Não é usado para o gerenciamento operacional contínuo de instâncias, como a aplicação de patches.",
        explanation_en:
          "CloudFormation is for provisioning infrastructure as code. It is not used for the ongoing operational management of instances, such as patching.",
      },
    ],
    category: "management_governance",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/systems-manager/"],
  },
  {
    id: "CLF-C02-SC-65",
    text: "Qual serviço da AWS fornece uma visão geral do seu estado de conformidade com a AWS e permite que você entenda seu risco de conformidade mapeando controles para seus recursos da AWS?",
    text_en:
      "Which AWS service provides an overview of your AWS compliance status and allows you to understand your compliance risk by mapping controls to your AWS resources?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS Artifact",
        text_en: "AWS Artifact",
        isCorrect: false,
        explanation:
          "O AWS Artifact fornece acesso aos relatórios de conformidade da AWS, não uma visão geral do estado de conformidade dos *seus* recursos.",
        explanation_en:
          "AWS Artifact provides access to AWS's own compliance reports, not an overview of the compliance status of *your* resources.",
      },
      {
        id: "B",
        text: "AWS Security Hub",
        text_en: "AWS Security Hub",
        isCorrect: true,
        explanation:
          "O AWS Security Hub fornece uma visão abrangente do seu estado de segurança na AWS e ajuda você a verificar seu ambiente em relação aos padrões da indústria de segurança e melhores práticas. Ele realiza verificações de conformidade automatizadas contínuas com base nesses padrões.",
        explanation_en:
          "AWS Security Hub gives you a comprehensive view of your security state in AWS and helps you check your environment against security industry standards and best practices. It performs continuous, automated compliance checks based on these standards.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        text_en: "Amazon GuardDuty",
        isCorrect: false,
        explanation:
          "O GuardDuty é um serviço de detecção de ameaças, não um serviço de gerenciamento de postura de conformidade.",
        explanation_en:
          "GuardDuty is a threat detection service, not a compliance posture management service.",
      },
      {
        id: "D",
        text: "AWS Shield",
        text_en: "AWS Shield",
        isCorrect: false,
        explanation:
          "O AWS Shield é um serviço de proteção contra DDoS e não está relacionado ao gerenciamento da conformidade.",
        explanation_en:
          "AWS Shield is a DDoS protection service and is not related to compliance management.",
      },
    ],
    category: "security",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/security-hub/"],
  },
];
