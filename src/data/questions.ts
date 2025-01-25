// src/data/questions.ts
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
        explanation: "Amazon EC2 is used for compute services, not storage." 
      },
      { 
        id: "b", 
        text: "Amazon S3", 
        isCorrect: true, 
        explanation: "Amazon S3 provides scalable object storage." 
      },
      { 
        id: "c", 
        text: "Amazon RDS", 
        isCorrect: false, 
        explanation: "Amazon RDS is used for relational databases, not object storage." 
      },
      { 
        id: "d", 
        text: "AWS Lambda", 
        isCorrect: false, 
        explanation: "AWS Lambda is used for serverless computing, not storage." 
      }
    ],
    
    // explanation: "Amazon S3 provides scalable object storage.",
    category: "technology",
    dominio: 'Dominion 1',
    difficulty: "easy",
    references: ["https://aws.amazon.com/s3/"],
  },
  {
    id: "q2",
    type:'single_choice',
    text: "What is the main benefit of AWS pay-as-you-go pricing model?",
    options: [
      { id: "a", text: "Fixed monthly costs", isCorrect: false ,explanation: "You only pay for what you use, avoiding upfront investments.", },
      { id: "b", text: "No capacity planning required", isCorrect: true, explanation: "You only pay for what you use, avoiding upfront investments.",},
      { id: "c", text: "Dedicated hardware", isCorrect: false,explanation: "You only pay for what you use, avoiding upfront investments.", },
      { id: "d", text: "Unlimited technical support", isCorrect: false,explanation: "You only pay for what you use, avoiding upfront investments.", },
    ],
    // explanation: "You only pay for what you use, avoiding upfront investments.",
    dominio: 'Dominion 1',
    category: "billing-and-pricing",
    difficulty: "easy",
    references: ["https://aws.amazon.com/pricing/"],
  },
];
