import type { Question } from "../lib/types/questions";

export const questions: Question[] = [
  {
    id: "q1",
    type: 'single_choice',
    text: "Which AWS service provides scalable cloud storage?",
    options: [
      { 
        id: "a", 
        text: "Amazon EC2", 
        isCorrect: false, 
        explanation: "Amazon EC2 (Elastic Compute Cloud) é um serviço de computação em nuvem, não um serviço de armazenamento. É usado para hospedar máquinas virtuais e aplicações." 
      },
      { 
        id: "b", 
        text: "Amazon S3", 
        isCorrect: true, 
        explanation: "Amazon S3 (Simple Storage Service) é a solução correta, pois é um serviço de armazenamento de objetos altamente escalável, projetado para armazenar e recuperar qualquer quantidade de dados." 
      },
      { 
        id: "c", 
        text: "Amazon RDS", 
        isCorrect: false, 
        explanation: "Amazon RDS (Relational Database Service) é um serviço para bancos de dados relacionais gerenciados, não um serviço de armazenamento de objetos." 
      },
      { 
        id: "d", 
        text: "AWS Lambda", 
        isCorrect: false, 
        explanation: "AWS Lambda é um serviço de computação serverless que executa código em resposta a eventos, não um serviço de armazenamento." 
      }
    ],
    category: "technology",
    dominio: 'Dominion 1',
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "q2",
    type: 'multiple_choice',
    text: "Quais das seguintes opções são benefícios do Amazon RDS (Relational Database Service)? (Selecione DUAS)",
    options: [
      {
        id: "a",
        text: "Backups automatizados",
        isCorrect: true,
        explanation: "O Amazon RDS oferece backups automatizados configuráveis, facilitando a recuperação de dados e reduzindo a carga operacional."
      },
      {
        id: "b",
        text: "Hospedagem de sites estáticos",
        isCorrect: false,
        explanation: "A hospedagem de sites estáticos é um recurso do Amazon S3, não do RDS."
      },
      {
        id: "c",
        text: "Gerenciamento de patches do banco de dados",
        isCorrect: true,
        explanation: "O RDS gerencia automaticamente os patches do banco de dados, mantendo a infraestrutura atualizada e segura."
      },
      {
        id: "d",
        text: "Processamento de big data em tempo real",
        isCorrect: false,
        explanation: "O processamento de big data em tempo real é mais adequado para serviços como Amazon Kinesis, não para o RDS."
      }
    ],
    category: "technology",
    dominio: 'Dominion 2',
    difficulty: "medium",
    references: ["https://aws.amazon.com/rds/features/"],
  },
  {
    id: "q3",
    type: 'multiple_choice',
    text: "Quais são os benefícios do modelo de responsabilidade compartilhada da AWS? (Selecione DUAS opções corretas)",
    options: [
      {
        id: "a",
        text: "A AWS é responsável pela segurança da infraestrutura física",
        isCorrect: true,
        explanation: "A AWS é responsável por proteger a infraestrutura que executa todos os serviços oferecidos na nuvem AWS, incluindo instalações físicas, rede e hardware."
      },
      {
        id: "b",
        text: "O cliente não precisa se preocupar com segurança",
        isCorrect: false,
        explanation: "Isso está incorreto. Os clientes são responsáveis pela segurança na nuvem, incluindo configuração de serviços, gerenciamento de dados e controle de acesso."
      },
      {
        id: "c",
        text: "O cliente mantém controle sobre seus dados e criptografia",
        isCorrect: true,
        explanation: "Os clientes mantêm controle total sobre seus dados e são responsáveis por gerenciar a criptografia e as permissões de acesso."
      },
      {
        id: "d",
        text: "A AWS gerencia todas as atualizações de aplicativos",
        isCorrect: false,
        explanation: "A AWS não gerencia atualizações de aplicativos do cliente. Isso é responsabilidade do cliente como parte do modelo de responsabilidade compartilhada."
      }
    ],
    category: "security-and-compliance",
    dominio: 'Dominion 3',
    difficulty: "medium",
    references: ["https://aws.amazon.com/compliance/shared-responsibility-model/"],
  },
  {
    id: "q4",
    type: 'single_choice',
    text: "Qual serviço da AWS é mais adequado para hospedar um banco de dados NoSQL altamente escalável?",
    options: [
      {
        id: "a",
        text: "Amazon RDS",
        isCorrect: false,
        explanation: "Amazon RDS é otimizado para bancos de dados relacionais (SQL), não para NoSQL."
      },
      {
        id: "b",
        text: "Amazon DynamoDB",
        isCorrect: true,
        explanation: "Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado que oferece desempenho consistente em qualquer escala, sendo a escolha ideal para aplicações que necessitam de banco de dados NoSQL."
      },
      {
        id: "c",
        text: "Amazon Redshift",
        isCorrect: false,
        explanation: "Amazon Redshift é um data warehouse, otimizado para análise de dados em grande escala, não para operações NoSQL."
      },
      {
        id: "d",
        text: "Amazon ElastiCache",
        isCorrect: false,
        explanation: "Amazon ElastiCache é um serviço de cache em memória, não um banco de dados NoSQL primário."
      }
    ],
    category: "technology",
    dominio: 'Dominion 1',
    difficulty: "medium",
    references: ["https://aws.amazon.com/dynamodb/"],
  },
  {
    id: "q5",
    type: 'multiple_choice',
    text: "Quais são as características do Amazon S3 Glacier? (Selecione DUAS opções corretas)",
    options: [
      {
        id: "a",
        text: "Armazenamento de baixo custo para arquivamento de dados",
        isCorrect: true,
        explanation: "O S3 Glacier é projetado especificamente para fornecer armazenamento de baixo custo para arquivamento de dados que são acessados com pouca frequência."
      },
      {
        id: "b",
        text: "Acesso instantâneo aos dados",
        isCorrect: false,
        explanation: "O Glacier não oferece acesso instantâneo aos dados. Os tempos de recuperação podem variar de minutos a horas, dependendo do tier escolhido."
      },
      {
        id: "c",
        text: "Durabilidade de 99,999999999% (11 noves)",
        isCorrect: true,
        explanation: "O S3 Glacier oferece durabilidade extremamente alta de 99,999999999%, garantindo que os dados arquivados permaneçam seguros e intactos."
      },
      {
        id: "d",
        text: "Melhor opção para bancos de dados em produção",
        isCorrect: false,
        explanation: "O Glacier não é adequado para bancos de dados em produção devido aos seus longos tempos de recuperação. É otimizado para arquivamento de dados."
      }
    ],
    category: "technology",
    dominio: 'Dominion 4',
    difficulty: "medium",
    references: ["https://aws.amazon.com/s3/storage-classes/glacier/"],
  }
];