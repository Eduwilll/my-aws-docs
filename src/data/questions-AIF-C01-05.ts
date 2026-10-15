import type { Question } from "../lib/types/questions";

export const questionsaAIFc0105: Question[] = [
  {
    id: "AIF-C01-E5-D1-01",
    text: "Um modelo de detecção de fraude é treinado com dados em que apenas 0,2% das transações são fraudulentas. Ele atinge 99,8% de acurácia, mas quase nunca identifica uma fraude. Qual é a melhor explicação e a ação mais adequada?",
    text_en:
      "A fraud detection model is trained on data where only 0.2% of transactions are fraudulent. It reaches 99.8% accuracy but almost never identifies fraud. What is the best explanation and the most appropriate action?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "A acurácia é enganosa com classes desbalanceadas; avaliar com precisão, recall e F1 e tratar o desbalanceamento (ex.: reamostragem ou pesos de classe)",
        text_en:
          "Accuracy is misleading with imbalanced classes; evaluate with precision, recall, and F1 and address the imbalance (e.g., resampling or class weights)",
        isCorrect: true,
        explanation:
          "Prever sempre 'legítima' já rende ~99,8% de acurácia, sem detectar nenhuma fraude.",
        explanation_en:
          "Always predicting 'legitimate' already yields ~99.8% accuracy while catching no fraud.",
      },
      {
        id: "B",
        text: "O modelo está excelente, pois 99,8% de acurácia confirma o bom desempenho",
        text_en:
          "The model is excellent, since 99.8% accuracy confirms good performance",
        isCorrect: false,
        explanation:
          "A métrica esconde a falha na classe minoritária, que é a que importa.",
        explanation_en:
          "The metric hides the failure on the minority class, which is the one that matters.",
      },
      {
        id: "C",
        text: "Trocar a métrica para RMSE, mais adequada à classificação",
        text_en: "Switch the metric to RMSE, which suits classification better",
        isCorrect: false,
        explanation: "RMSE é uma métrica de regressão.",
        explanation_en: "RMSE is a regression metric.",
      },
      {
        id: "D",
        text: "Apenas aumentar o número de épocas, sem mudar a avaliação",
        text_en:
          "Just increase the number of epochs without changing the evaluation",
        isCorrect: false,
        explanation:
          "Mais épocas não corrigem uma métrica enganosa nem o desbalanceamento.",
        explanation_en:
          "More epochs fix neither a misleading metric nor the imbalance.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-02",
    text: "Em qual cenário a precisão (e não o recall) deve ser a métrica priorizada?",
    text_en:
      "In which scenario should precision (rather than recall) be the prioritized metric?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Triagem de câncer em exames de imagem, em que deixar passar um caso é grave",
        text_en:
          "Cancer screening on imaging exams, where missing a case is serious",
        isCorrect: false,
        explanation:
          "Aqui o custo está nos falsos negativos, o que favorece o recall.",
        explanation_en:
          "The cost lies in false negatives, which favors recall.",
      },
      {
        id: "B",
        text: "Suspensão automática de contas por violação de política, sem revisão humana, em que punir um usuário inocente é muito custoso",
        text_en:
          "Automatically suspending accounts for policy violations with no human review, where punishing an innocent user is very costly",
        isCorrect: true,
        explanation:
          "O custo dos falsos positivos é alto, então a precisão deve ser alta.",
        explanation_en:
          "False positives are costly, so precision must be high.",
      },
      {
        id: "C",
        text: "Detecção de intrusão em um sistema crítico, com alertas revisados por analistas",
        text_en:
          "Intrusion detection in a critical system, with alerts reviewed by analysts",
        isCorrect: false,
        explanation:
          "Alertas extras são tolerados; perder uma intrusão é pior, o que favorece o recall.",
        explanation_en:
          "Extra alerts are tolerable; missing an intrusion is worse, favoring recall.",
      },
      {
        id: "D",
        text: "Identificação de peças potencialmente defeituosas que passarão por uma inspeção manual barata",
        text_en:
          "Flagging potentially defective parts that will get a cheap manual inspection",
        isCorrect: false,
        explanation:
          "Falsos positivos custam pouco; o importante é não deixar defeitos passarem (recall).",
        explanation_en:
          "False positives are cheap; the priority is not missing defects (recall).",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-03",
    text: "Um modelo de previsão de cancelamento (churn) atinge 98% de acurácia na validação, mas falha em produção. Descobre-se que uma das features era 'data_de_encerramento_da_conta', preenchida apenas depois que o cliente cancela. Qual é o problema?",
    text_en:
      "A churn prediction model reaches 98% validation accuracy but fails in production. It turns out one feature was 'account_closure_date', filled in only after the customer cancels. What is the problem?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Overfitting por excesso de épocas, corrigível com early stopping",
        text_en:
          "Overfitting from too many epochs, fixable with early stopping",
        isCorrect: false,
        explanation:
          "A causa-raiz é a feature indevida, não o número de épocas.",
        explanation_en:
          "The root cause is the improper feature, not the number of epochs.",
      },
      {
        id: "B",
        text: "Underfitting por falta de complexidade do modelo",
        text_en: "Underfitting from insufficient model complexity",
        isCorrect: false,
        explanation: "Um modelo com 98% na validação não está subajustado.",
        explanation_en: "A model scoring 98% on validation is not underfit.",
      },
      {
        id: "C",
        text: "Vazamento de dados (data leakage); remover features que não estarão disponíveis no momento da previsão",
        text_en:
          "Data leakage; remove features that will not be available at prediction time",
        isCorrect: true,
        explanation:
          "A feature carrega a resposta e infla a validação, mas não existe em produção.",
        explanation_en:
          "The feature carries the answer and inflates validation but does not exist in production.",
      },
      {
        id: "D",
        text: "Concept drift causado por mudança de comportamento dos clientes",
        text_en: "Concept drift caused by changing customer behavior",
        isCorrect: false,
        explanation:
          "O problema já aparece na transição validação-produção por causa da feature, não de mudanças ao longo do tempo.",
        explanation_en:
          "The problem stems from the feature at the validation-to-production transition, not from change over time.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-04",
    text: "Uma equipe ajusta hiperparâmetros repetidamente observando o desempenho no conjunto de teste e reporta 94% de acurácia. Em produção, o modelo obtém 85%. Qual é a causa mais provável?",
    text_en:
      "A team repeatedly tunes hyperparameters while watching performance on the test set and reports 94% accuracy. In production, the model gets 85%. What is the most likely cause?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "O conjunto de treino era pequeno demais para treinar qualquer modelo",
        text_en: "The training set was too small to train any model",
        isCorrect: false,
        explanation: "Isso não explicaria a métrica inflada no teste.",
        explanation_en: "That would not explain the inflated test metric.",
      },
      {
        id: "B",
        text: "O endpoint tem latência alta",
        text_en: "The endpoint has high latency",
        isCorrect: false,
        explanation: "Latência não afeta a acurácia.",
        explanation_en: "Latency does not affect accuracy.",
      },
      {
        id: "C",
        text: "A taxa de aprendizado deveria ser fixa em 1,0",
        text_en: "The learning rate should be fixed at 1.0",
        isCorrect: false,
        explanation: "Sem fundamento; não explica a diferença.",
        explanation_en: "Unfounded; does not explain the gap.",
      },
      {
        id: "D",
        text: "O conjunto de teste foi usado no ajuste e deixou de ser uma estimativa imparcial; o ajuste deveria usar um conjunto de validação separado",
        text_en:
          "The test set was used for tuning and stopped being an unbiased estimate; tuning should use a separate validation set",
        isCorrect: true,
        explanation: "O teste deve ficar intocado até a avaliação final.",
        explanation_en:
          "The test set must stay untouched until final evaluation.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-05",
    text: "Cada requisição de inferência envia um vídeo de ~600 MB e leva cerca de 20 minutos para ser processada. O tráfego é esporádico e os resultados podem ser entregues quando ficarem prontos. Qual opção do SageMaker AI é a mais adequada e econômica?",
    text_en:
      "Each inference request sends a ~600 MB video and takes about 20 minutes to process. Traffic is sporadic and results can be delivered when ready. Which SageMaker AI option is most suitable and cost-effective?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Inferência assíncrona (Asynchronous Inference)",
        text_en: "Asynchronous Inference",
        isCorrect: true,
        explanation:
          "Enfileira requisições, aceita cargas grandes e tempos longos e pode escalar a zero.",
        explanation_en:
          "Queues requests, accepts large payloads and long processing times, and can scale to zero.",
      },
      {
        id: "B",
        text: "Endpoint em tempo real",
        text_en: "Real-time endpoint",
        isCorrect: false,
        explanation:
          "Tem limites de tamanho de carga e de tempo de resposta incompatíveis com 600 MB e 20 min.",
        explanation_en:
          "Has payload size and response time limits incompatible with 600 MB and 20 min.",
      },
      {
        id: "C",
        text: "Inferência serverless",
        text_en: "Serverless Inference",
        isCorrect: false,
        explanation: "Voltada a cargas pequenas e processamento curto.",
        explanation_en: "Aimed at small payloads and short processing.",
      },
      {
        id: "D",
        text: "Batch Transform sobre todo o conjunto, uma vez por mês",
        text_en: "Batch Transform over the whole dataset once a month",
        isCorrect: false,
        explanation:
          "É para processamento offline de conjuntos inteiros, não de requisições sob demanda.",
        explanation_en:
          "It is for offline processing of whole datasets, not on-demand requests.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: [
      "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html",
    ],
  },
  {
    id: "AIF-C01-E5-D1-06",
    text: "Uma empresa quer rotear e-mails de suporte em 12 categorias próprias (ex.: 'sinistro', 'atraso na entrega'), usando exemplos rotulados que já possui, sem construir um modelo do zero. Qual serviço atende melhor?",
    text_en:
      "A company wants to route support emails into 12 of its own categories (e.g., 'claim', 'delivery delay') using labeled examples it already has, without building a model from scratch. Which service fits best?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Comprehend com análise de sentimento pré-treinada",
        text_en: "Amazon Comprehend pre-trained sentiment analysis",
        isCorrect: false,
        explanation: "Só classifica sentimento, não categorias da empresa.",
        explanation_en: "Only classifies sentiment, not company categories.",
      },
      {
        id: "B",
        text: "Amazon Comprehend com classificação personalizada",
        text_en: "Amazon Comprehend custom classification",
        isCorrect: true,
        explanation:
          "Treina um classificador de texto com as categorias e os exemplos da empresa.",
        explanation_en:
          "Trains a text classifier on the company's own categories and examples.",
      },
      {
        id: "C",
        text: "Amazon Lex",
        text_en: "Amazon Lex",
        isCorrect: false,
        explanation:
          "Constrói bots conversacionais, não classifica e-mails em lote.",
        explanation_en:
          "Builds conversational bots; it does not classify emails in bulk.",
      },
      {
        id: "D",
        text: "Amazon Textract",
        text_en: "Amazon Textract",
        isCorrect: false,
        explanation:
          "Extrai texto de documentos digitalizados; não classifica conteúdo.",
        explanation_en:
          "Extracts text from scanned documents; it does not classify content.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/comprehend/"],
  },
  {
    id: "AIF-C01-E5-D1-07",
    text: "Três meses após a implantação, um modelo de recomendação perde qualidade porque os hábitos de compra mudaram: a relação entre as features e o alvo já não é a mesma. Como se chama esse fenômeno e qual é a resposta adequada?",
    text_en:
      "Three months after deployment, a recommendation model loses quality because buying habits changed: the relationship between features and target is no longer the same. What is this phenomenon and what is the appropriate response?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Data drift, em que apenas a distribuição das entradas muda; basta normalizar os dados",
        text_en:
          "Data drift, where only the input distribution changes; simply normalize the data",
        isCorrect: false,
        explanation:
          "Aqui muda a relação com o alvo, não só a distribuição; normalizar não resolve.",
        explanation_en:
          "Here the relationship to the target changes, not just the distribution; normalizing does not fix it.",
      },
      {
        id: "B",
        text: "Overfitting; reduzir o número de épocas",
        text_en: "Overfitting; reduce the number of epochs",
        isCorrect: false,
        explanation:
          "Overfitting é problema de generalização no treinamento, não mudança no mundo real.",
        explanation_en:
          "Overfitting is a training generalization problem, not a real-world change.",
      },
      {
        id: "C",
        text: "Concept drift; monitorar o desempenho e retreinar com dados recentes",
        text_en:
          "Concept drift; monitor performance and retrain with recent data",
        isCorrect: true,
        explanation:
          "A relação entre entradas e saída mudou ao longo do tempo.",
        explanation_en:
          "The relationship between inputs and output changed over time.",
      },
      {
        id: "D",
        text: "Data leakage; remover features futuras",
        text_en: "Data leakage; remove future features",
        isCorrect: false,
        explanation: "Nada indica uso de informação futura.",
        explanation_en: "Nothing suggests use of future information.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-08",
    text: "A curva de aprendizado mostra erro de treino muito baixo e erro de validação alto e estável. Qual ação é a mais apropriada?",
    text_en:
      "The learning curve shows very low training error and high, stable validation error. Which action is most appropriate?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aumentar a complexidade do modelo e adicionar camadas",
        text_en: "Increase model complexity and add layers",
        isCorrect: false,
        explanation: "Agravaria o overfitting.",
        explanation_en: "This would worsen overfitting.",
      },
      {
        id: "B",
        text: "Treinar por muito mais épocas",
        text_en: "Train for many more epochs",
        isCorrect: false,
        explanation: "Tende a piorar o overfitting.",
        explanation_en: "Tends to worsen overfitting.",
      },
      {
        id: "C",
        text: "Reduzir o conjunto de treino para acelerar",
        text_en: "Shrink the training set to speed things up",
        isCorrect: false,
        explanation: "Menos dados pioram a generalização.",
        explanation_en: "Less data worsens generalization.",
      },
      {
        id: "D",
        text: "Aplicar regularização, early stopping ou mais dados de treino, ou simplificar o modelo",
        text_en:
          "Apply regularization, early stopping, more training data, or simplify the model",
        isCorrect: true,
        explanation:
          "Esse padrão indica overfitting; essas medidas melhoram a generalização.",
        explanation_en:
          "This pattern indicates overfitting; these measures improve generalization.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-09",
    text: "Para qual requisito uma solução de ML é a MENOS apropriada?",
    text_en: "For which requirement is an ML solution LEAST appropriate?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Calcular o imposto exato de cada fatura com base em alíquotas publicadas e regras fixas",
        text_en:
          "Computing the exact tax on each invoice from published rates and fixed rules",
        isCorrect: true,
        explanation:
          "Quando o resultado correto é determinístico e definido por regras, código tradicional é mais simples, barato e exato.",
        explanation_en:
          "When the correct result is deterministic and rule-defined, conventional code is simpler, cheaper, and exact.",
      },
      {
        id: "B",
        text: "Recomendar produtos com base no histórico de navegação",
        text_en: "Recommending products based on browsing history",
        isCorrect: false,
        explanation: "Padrões complexos e probabilísticos, adequados a ML.",
        explanation_en: "Complex, probabilistic patterns suited to ML.",
      },
      {
        id: "C",
        text: "Prever quais clientes têm maior probabilidade de cancelar",
        text_en: "Predicting which customers are most likely to churn",
        isCorrect: false,
        explanation: "Previsão baseada em padrões de dados históricos.",
        explanation_en: "Prediction based on historical data patterns.",
      },
      {
        id: "D",
        text: "Detectar transações anômalas entre milhões de registros",
        text_en: "Detecting anomalous transactions among millions of records",
        isCorrect: false,
        explanation: "Difícil de codificar em regras; ML se destaca.",
        explanation_en: "Hard to encode as rules; ML excels.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-10",
    text: "O atributo 'país' possui 20 valores sem ordem natural. Qual pré-processamento é mais apropriado para um modelo linear?",
    text_en:
      "The 'country' feature has 20 values with no natural order. Which preprocessing is most appropriate for a linear model?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Codificar por rótulo numérico (1 a 20) como se fosse ordinal",
        text_en: "Label-encode as numbers 1 to 20 as if ordinal",
        isCorrect: false,
        explanation: "Sugere uma ordem e distâncias que não existem.",
        explanation_en: "Implies an order and distances that do not exist.",
      },
      {
        id: "B",
        text: "Codificação one-hot",
        text_en: "One-hot encoding",
        isCorrect: true,
        explanation:
          "Cria uma coluna binária por categoria, sem impor ordem artificial.",
        explanation_en:
          "Creates one binary column per category without imposing artificial order.",
      },
      {
        id: "C",
        text: "Normalizar o texto do país para min-max",
        text_en: "Min-max normalize the country text",
        isCorrect: false,
        explanation: "Normalização aplica-se a números, não a categorias.",
        explanation_en: "Normalization applies to numbers, not categories.",
      },
      {
        id: "D",
        text: "Remover o atributo sempre",
        text_en: "Always drop the feature",
        isCorrect: false,
        explanation: "Descarta informação potencialmente útil.",
        explanation_en: "Discards potentially useful information.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-11",
    text: "Um classificador binário obtém AUC-ROC de 0,5. O que isso significa?",
    text_en: "A binary classifier gets an AUC-ROC of 0.5. What does this mean?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Acerta 50% e erra 50% das previsões em qualquer limiar, de forma ótima",
        text_en:
          "It is right 50% and wrong 50% of predictions at any threshold, optimally",
        isCorrect: false,
        explanation: "Isso não descreve um bom desempenho.",
        explanation_en: "That does not describe good performance.",
      },
      {
        id: "B",
        text: "Separa perfeitamente as classes",
        text_en: "It separates the classes perfectly",
        isCorrect: false,
        explanation: "A separação perfeita corresponde a AUC 1,0.",
        explanation_en: "Perfect separation corresponds to AUC 1.0.",
      },
      {
        id: "C",
        text: "Não é melhor do que um palpite aleatório em separar as classes",
        text_en:
          "It is no better than random guessing at separating the classes",
        isCorrect: true,
        explanation: "AUC 0,5 corresponde à diagonal da curva ROC.",
        explanation_en: "AUC 0.5 corresponds to the ROC diagonal.",
      },
      {
        id: "D",
        text: "O modelo errou em todos os casos, o que o torna perfeito se invertido",
        text_en:
          "The model was wrong on every case, making it perfect if inverted",
        isCorrect: false,
        explanation: "Isso descreveria AUC próximo de 0, não de 0,5.",
        explanation_en: "That would describe an AUC near 0, not 0.5.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/machine-learning/"],
  },
  {
    id: "AIF-C01-E5-D1-12",
    text: "Um app de turismo precisa ler placas de rua e fachadas em fotos tiradas por usuários, sem treinar modelos. Qual serviço é o mais adequado?",
    text_en:
      "A travel app needs to read street signs and storefronts in user-taken photos, without training models. Which service is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Textract",
        text_en: "Amazon Textract",
        isCorrect: false,
        explanation:
          "É otimizado para documentos como formulários, tabelas e faturas, não para texto em cenas.",
        explanation_en:
          "Optimized for documents such as forms, tables, and invoices, not scene text.",
      },
      {
        id: "B",
        text: "Amazon Comprehend",
        text_en: "Amazon Comprehend",
        isCorrect: false,
        explanation: "Analisa texto já extraído; não lê imagens.",
        explanation_en:
          "Analyzes already-extracted text; it does not read images.",
      },
      {
        id: "C",
        text: "Amazon Transcribe",
        text_en: "Amazon Transcribe",
        isCorrect: false,
        explanation: "Converte áudio em texto.",
        explanation_en: "Converts audio to text.",
      },
      {
        id: "D",
        text: "Amazon Rekognition (detecção de texto em imagens)",
        text_en: "Amazon Rekognition (text detection in images)",
        isCorrect: true,
        explanation: "Detecta texto em cenas naturais, como placas e fachadas.",
        explanation_en:
          "Detects text in natural scenes such as signs and storefronts.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/rekognition/"],
  },
  {
    id: "AIF-C01-E5-D1-13",
    text: "Uma equipe gasta semanas testando manualmente combinações de taxa de aprendizado e tamanho de lote para um modelo no SageMaker AI. Qual recurso automatiza a busca pelos melhores hiperparâmetros?",
    text_en:
      "A team spends weeks manually testing learning-rate and batch-size combinations for a model in SageMaker AI. Which feature automates the search for the best hyperparameters?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "SageMaker Automatic Model Tuning",
        text_en: "SageMaker Automatic Model Tuning",
        isCorrect: true,
        explanation:
          "Executa vários jobs de treinamento e busca a melhor combinação de hiperparâmetros.",
        explanation_en:
          "Runs multiple training jobs and searches for the best hyperparameter combination.",
      },
      {
        id: "B",
        text: "SageMaker Ground Truth",
        text_en: "SageMaker Ground Truth",
        isCorrect: false,
        explanation: "Serve para rotular dados.",
        explanation_en: "Used for labeling data.",
      },
      {
        id: "C",
        text: "SageMaker Model Registry",
        text_en: "SageMaker Model Registry",
        isCorrect: false,
        explanation: "Versiona e aprova modelos; não busca hiperparâmetros.",
        explanation_en:
          "Versions and approves models; it does not search hyperparameters.",
      },
      {
        id: "D",
        text: "SageMaker Feature Store",
        text_en: "SageMaker Feature Store",
        isCorrect: false,
        explanation: "Armazena features; não ajusta hiperparâmetros.",
        explanation_en: "Stores features; it does not tune hyperparameters.",
      },
    ],
    category: "ai_ml_fundamentals",
    dominio: "DOMAIN_1",
    difficulty: "hard",
    references: ["https://aws.amazon.com/sagemaker/"],
  },
  {
    id: "AIF-C01-E5-D2-01",
    text: "Ao pedir 'o artigo mais citado sobre o tema X', um LLM responde com título, autores e DOI de aparência perfeita, mas o artigo não existe. Qual fenômeno ocorreu?",
    text_en:
      "When asked for 'the most-cited paper on topic X', an LLM answers with a perfectly plausible title, authors, and DOI, but the paper does not exist. Which phenomenon occurred?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Data de corte de conhecimento",
        text_en: "Knowledge cutoff",
        isCorrect: false,
        explanation:
          "Seria o caso de não conhecer fatos recentes, não de inventar uma referência.",
        explanation_en:
          "That would be not knowing recent facts, not inventing a citation.",
      },
      {
        id: "B",
        text: "Alucinação (fabricação de conteúdo plausível porém falso)",
        text_en: "Hallucination (fabricating plausible but false content)",
        isCorrect: true,
        explanation: "O modelo gera texto fluente sem base factual.",
        explanation_en:
          "The model generates fluent text without factual basis.",
      },
      {
        id: "C",
        text: "Estouro da janela de contexto",
        text_en: "Context window overflow",
        isCorrect: false,
        explanation: "Isso trunca entradas; não cria referências falsas.",
        explanation_en:
          "That truncates input; it does not create fake references.",
      },
      {
        id: "D",
        text: "Prompt injection",
        text_en: "Prompt injection",
        isCorrect: false,
        explanation: "Exige instruções maliciosas injetadas, ausentes aqui.",
        explanation_en:
          "Requires injected malicious instructions, absent here.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-02",
    text: "Qual ajuste torna as respostas de um LLM mais determinísticas e repetíveis?",
    text_en:
      "Which adjustment makes an LLM's responses more deterministic and repeatable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aumentar o top-k",
        text_en: "Raise top-k",
        isCorrect: false,
        explanation: "Amplia o conjunto de candidatos e, portanto, a variação.",
        explanation_en:
          "Widens the candidate pool and therefore the variation.",
      },
      {
        id: "B",
        text: "Aumentar o top-p",
        text_en: "Raise top-p",
        isCorrect: false,
        explanation: "Inclui mais tokens possíveis, aumentando a variação.",
        explanation_en: "Includes more possible tokens, increasing variation.",
      },
      {
        id: "C",
        text: "Reduzir a temperatura",
        text_en: "Lower the temperature",
        isCorrect: true,
        explanation: "Menos aleatoriedade na amostragem do próximo token.",
        explanation_en: "Less randomness when sampling the next token.",
      },
      {
        id: "D",
        text: "Aumentar o máximo de tokens",
        text_en: "Raise max tokens",
        isCorrect: false,
        explanation: "Só altera o tamanho máximo da resposta.",
        explanation_en: "Only changes maximum response length.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-03",
    text: "Um modelo tem janela de contexto de 8.192 tokens compartilhada entre entrada e saída. O prompt tem 7.000 tokens e a requisição pede até 2.000 tokens de saída. Qual afirmação está correta?",
    text_en:
      "A model has an 8,192-token context window shared between input and output. The prompt is 7,000 tokens and the request asks for up to 2,000 output tokens. Which statement is correct?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Funciona, pois a janela só limita a entrada",
        text_en: "It works, since the window only limits input",
        isCorrect: false,
        explanation: "A janela abrange entrada e saída.",
        explanation_en: "The window covers both input and output.",
      },
      {
        id: "B",
        text: "Funciona se a temperatura for 0",
        text_en: "It works if temperature is 0",
        isCorrect: false,
        explanation: "Temperatura não altera limites de tokens.",
        explanation_en: "Temperature does not change token limits.",
      },
      {
        id: "C",
        text: "Funciona se o modelo for destilado",
        text_en: "It works if the model is distilled",
        isCorrect: false,
        explanation: "Destilação não amplia a janela.",
        explanation_en: "Distillation does not enlarge the window.",
      },
      {
        id: "D",
        text: "A soma de entrada e saída solicitada excede a janela; é preciso encurtar o prompt ou reduzir o máximo de tokens",
        text_en:
          "The sum of input and requested output exceeds the window; the prompt must be shortened or max tokens reduced",
        isCorrect: true,
        explanation: "7.000 + 2.000 = 9.000 > 8.192.",
        explanation_en: "7,000 + 2,000 = 9,000 > 8,192.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-04",
    text: "Um classificador de sentimento com few-shot retorna rótulos inconsistentes ('Positivo', 'pos', 'POSITIVO!'). Os três exemplos do prompt usam formatos de rótulo diferentes. Qual é a melhor correção?",
    text_en:
      "A few-shot sentiment classifier returns inconsistent labels ('Positive', 'pos', 'POSITIVE!'). The prompt's three examples use different label formats. What is the best fix?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Usar exemplos consistentes e representativos, declarando os rótulos permitidos e o formato de saída",
        text_en:
          "Use consistent, representative examples, stating the allowed labels and the output format",
        isCorrect: true,
        explanation:
          "O modelo imita o formato dos exemplos; padronizá-los padroniza a saída.",
        explanation_en:
          "The model imitates the examples' format; standardizing them standardizes the output.",
      },
      {
        id: "B",
        text: "Aumentar a temperatura para variar mais",
        text_en: "Raise the temperature to vary more",
        isCorrect: false,
        explanation: "Aumenta a inconsistência.",
        explanation_en: "Increases the inconsistency.",
      },
      {
        id: "C",
        text: "Trocar para pré-treinamento do zero",
        text_en: "Switch to pre-training from scratch",
        isCorrect: false,
        explanation: "Desproporcional para um problema de formato de prompt.",
        explanation_en: "Disproportionate for a prompt-format problem.",
      },
      {
        id: "D",
        text: "Remover os exemplos e pedir 'seja consistente'",
        text_en: "Remove the examples and say 'be consistent'",
        isCorrect: false,
        explanation:
          "Sem formato definido, a inconsistência tende a continuar.",
        explanation_en:
          "Without a defined format, inconsistency is likely to continue.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-05",
    text: "Qual padrão de prompt intercala etapas de raciocínio com ações (ex.: chamar uma busca ou API) e observações dos resultados antes de responder?",
    text_en:
      "Which prompting pattern interleaves reasoning steps with actions (e.g., calling a search or API) and observations of the results before answering?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Zero-shot prompting",
        text_en: "Zero-shot prompting",
        isCorrect: false,
        explanation: "Apenas descreve a tarefa, sem exemplos nem ferramentas.",
        explanation_en: "Only describes the task, with no examples or tools.",
      },
      {
        id: "B",
        text: "ReAct (Reason + Act)",
        text_en: "ReAct (Reason + Act)",
        isCorrect: true,
        explanation: "Combina raciocínio e uso de ferramentas em ciclos.",
        explanation_en: "Combines reasoning and tool use in loops.",
      },
      {
        id: "C",
        text: "Negative prompting",
        text_en: "Negative prompting",
        isCorrect: false,
        explanation: "Define o que evitar.",
        explanation_en: "Specifies what to avoid.",
      },
      {
        id: "D",
        text: "Prompt caching",
        text_en: "Prompt caching",
        isCorrect: false,
        explanation: "É otimização de custo e latência.",
        explanation_en: "A cost and latency optimization.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-06",
    text: "Um modelo cobra US$ 0,003 por 1.000 tokens de entrada e US$ 0,015 por 1.000 tokens de saída. Cada requisição usa 2.000 tokens de entrada e 500 de saída. Qual é o custo estimado de 10.000 requisições?",
    text_en:
      "A model charges $0.003 per 1,000 input tokens and $0.015 per 1,000 output tokens. Each request uses 2,000 input tokens and 500 output tokens. What is the estimated cost of 10,000 requests?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "US$ 60",
        text_en: "$60",
        isCorrect: false,
        explanation: "Considera apenas os tokens de entrada.",
        explanation_en: "Counts only input tokens.",
      },
      {
        id: "B",
        text: "US$ 75",
        text_en: "$75",
        isCorrect: false,
        explanation: "Considera apenas os tokens de saída.",
        explanation_en: "Counts only output tokens.",
      },
      {
        id: "C",
        text: "US$ 135",
        text_en: "$135",
        isCorrect: true,
        explanation:
          "Por requisição: 2 × 0,003 + 0,5 × 0,015 = 0,0135; × 10.000 = 135.",
        explanation_en:
          "Per request: 2 × 0.003 + 0.5 × 0.015 = 0.0135; × 10,000 = 135.",
      },
      {
        id: "D",
        text: "US$ 1.350",
        text_en: "$1,350",
        isCorrect: false,
        explanation: "Erro de uma ordem de grandeza.",
        explanation_en: "Off by an order of magnitude.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/pricing/"],
  },
  {
    id: "AIF-C01-E5-D2-07",
    text: "Qual requisito NÃO pode ser atendido por um modelo apenas de texto e exige um modelo multimodal?",
    text_en:
      "Which requirement can NOT be met by a text-only model and requires a multimodal model?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Resumir as atas de uma reunião em texto",
        text_en: "Summarizing meeting minutes in text",
        isCorrect: false,
        explanation: "Tarefa puramente textual.",
        explanation_en: "A purely textual task.",
      },
      {
        id: "B",
        text: "Traduzir um e-mail do português para o inglês",
        text_en: "Translating an email from Portuguese to English",
        isCorrect: false,
        explanation: "Tarefa puramente textual.",
        explanation_en: "A purely textual task.",
      },
      {
        id: "C",
        text: "Redigir um rascunho de resposta a um cliente",
        text_en: "Drafting a reply to a customer",
        isCorrect: false,
        explanation: "Tarefa puramente textual.",
        explanation_en: "A purely textual task.",
      },
      {
        id: "D",
        text: "Responder perguntas sobre as tendências de um gráfico enviado como imagem",
        text_en:
          "Answering questions about the trends in a chart uploaded as an image",
        isCorrect: true,
        explanation: "Exige interpretar entrada visual e textual.",
        explanation_en: "Requires interpreting visual and textual input.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-08",
    text: "Um prompt longo mistura instruções, trechos de políticas e a pergunta do usuário, e o modelo frequentemente confunde o que é instrução e o que é dado. Qual boa prática ajuda mais?",
    text_en:
      "A long prompt mixes instructions, policy excerpts, and the user's question, and the model often confuses what is instruction and what is data. Which best practice helps most?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Separar as seções com delimitadores claros (ex.: tags XML) e posicionar instruções e formato de saída de forma explícita",
        text_en:
          "Separate sections with clear delimiters (e.g., XML tags) and state instructions and output format explicitly",
        isCorrect: true,
        explanation:
          "Estrutura clara reduz ambiguidade entre instruções e dados.",
        explanation_en:
          "Clear structure reduces ambiguity between instructions and data.",
      },
      {
        id: "B",
        text: "Escrever tudo em um único parágrafo corrido",
        text_en: "Write everything as one continuous paragraph",
        isCorrect: false,
        explanation: "Aumenta a ambiguidade.",
        explanation_en: "Increases ambiguity.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não resolve a confusão de estrutura.",
        explanation_en: "Does not fix structural confusion.",
      },
      {
        id: "D",
        text: "Remover a pergunta do usuário",
        text_en: "Remove the user's question",
        isCorrect: false,
        explanation: "A tarefa deixaria de existir.",
        explanation_en: "The task would no longer exist.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-09",
    text: "O parser de um sistema falha porque o modelo envolve o JSON em frases explicativas ('Claro! Aqui está...'). Qual combinação de medidas é mais eficaz?",
    text_en:
      "A system's parser fails because the model wraps the JSON in explanatory sentences ('Sure! Here it is...'). Which combination of measures is most effective?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aumentar a temperatura e o top-p",
        text_en: "Raise temperature and top-p",
        isCorrect: false,
        explanation: "Aumentam a variação de formato.",
        explanation_en: "Increase format variation.",
      },
      {
        id: "B",
        text: "Especificar o esquema, instruir a responder somente com JSON, incluir um exemplo e usar temperatura baixa",
        text_en:
          "Specify the schema, instruct it to reply with JSON only, include an example, and use low temperature",
        isCorrect: true,
        explanation: "Define formato e reduz a variação da saída.",
        explanation_en: "Defines format and reduces output variation.",
      },
      {
        id: "C",
        text: "Pedir que o modelo 'seja criativo'",
        text_en: "Ask the model to 'be creative'",
        isCorrect: false,
        explanation: "Contraria o objetivo de saída estruturada.",
        explanation_en: "Contradicts the goal of structured output.",
      },
      {
        id: "D",
        text: "Trocar a região da AWS",
        text_en: "Change the AWS Region",
        isCorrect: false,
        explanation: "Sem relação com o formato.",
        explanation_en: "Unrelated to format.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-10",
    text: "Qual descrição representa melhor uma solução de IA agêntica (agentic AI)?",
    text_en: "Which description best represents an agentic AI solution?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Um modelo que apenas responde a um único prompt por vez, sem agir",
        text_en:
          "A model that only answers one prompt at a time without acting",
        isCorrect: false,
        explanation: "Descreve um uso simples de LLM, não agêntico.",
        explanation_en: "Describes simple LLM use, not agentic.",
      },
      {
        id: "B",
        text: "Um classificador treinado com dados rotulados",
        text_en: "A classifier trained on labeled data",
        isCorrect: false,
        explanation: "Descreve ML supervisionado tradicional.",
        explanation_en: "Describes traditional supervised ML.",
      },
      {
        id: "C",
        text: "Um sistema que planeja, usa ferramentas e executa ações em várias etapas para atingir um objetivo, com supervisão limitada",
        text_en:
          "A system that plans, uses tools, and performs multi-step actions to reach a goal with limited supervision",
        isCorrect: true,
        explanation: "Autonomia orientada a objetivos com uso de ferramentas.",
        explanation_en: "Goal-driven autonomy with tool use.",
      },
      {
        id: "D",
        text: "Um banco de dados vetorial",
        text_en: "A vector database",
        isCorrect: false,
        explanation: "É infraestrutura de armazenamento, não um agente.",
        explanation_en: "Storage infrastructure, not an agent.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-11",
    text: "A empresa guarda o catálogo de produtos em um Aurora PostgreSQL e quer adicionar busca semântica com o mínimo de nova infraestrutura e de sincronização de dados. Qual abordagem é a mais adequada?",
    text_en:
      "A company stores its product catalog in Aurora PostgreSQL and wants to add semantic search with minimal new infrastructure and data synchronization. Which approach is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Replicar os dados para um novo cluster do Amazon OpenSearch Service",
        text_en: "Replicate data to a new Amazon OpenSearch Service cluster",
        isCorrect: false,
        explanation:
          "Funciona, mas adiciona serviço e sincronização, contrariando o requisito.",
        explanation_en:
          "Works, but adds a service and synchronization, contradicting the requirement.",
      },
      {
        id: "B",
        text: "Exportar tudo para o Amazon Athena",
        text_en: "Export everything to Amazon Athena",
        isCorrect: false,
        explanation: "Athena é consulta SQL sobre S3, não busca vetorial.",
        explanation_en: "Athena is SQL over S3, not vector search.",
      },
      {
        id: "C",
        text: "Usar o AWS Glue para busca semântica",
        text_en: "Use AWS Glue for semantic search",
        isCorrect: false,
        explanation: "Glue é ETL.",
        explanation_en: "Glue is ETL.",
      },
      {
        id: "D",
        text: "Usar a extensão pgvector no próprio Aurora PostgreSQL",
        text_en: "Use the pgvector extension in Aurora PostgreSQL itself",
        isCorrect: true,
        explanation:
          "Armazena embeddings junto aos dados relacionais, sem novo serviço.",
        explanation_en:
          "Stores embeddings alongside relational data with no new service.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/rds/aurora/"],
  },
  {
    id: "AIF-C01-E5-D2-12",
    text: "As respostas exigem percorrer relações entre entidades (fornecedores → peças → produtos), algo que a similaridade vetorial pura não captura bem. Qual abordagem é a mais indicada?",
    text_en:
      "Answers require traversing relationships between entities (suppliers → parts → products), something plain vector similarity does not capture well. Which approach is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "GraphRAG com grafo de conhecimento (ex.: Amazon Neptune Analytics)",
        text_en:
          "GraphRAG with a knowledge graph (e.g., Amazon Neptune Analytics)",
        isCorrect: true,
        explanation: "Combina busca vetorial com relações explícitas do grafo.",
        explanation_en:
          "Combines vector search with explicit graph relationships.",
      },
      {
        id: "B",
        text: "RAG apenas com busca vetorial e chunks maiores",
        text_en: "RAG with vector search only and larger chunks",
        isCorrect: false,
        explanation: "Não modela relações entre entidades.",
        explanation_en: "Does not model relationships between entities.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não melhora a recuperação.",
        explanation_en: "Does not improve retrieval.",
      },
      {
        id: "D",
        text: "Quantizar o modelo",
        text_en: "Quantize the model",
        isCorrect: false,
        explanation: "Otimiza custo, não relações.",
        explanation_en: "Optimizes cost, not relationships.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/neptune/"],
  },
  {
    id: "AIF-C01-E5-D2-13",
    text: "Qual objetivo de pré-treinamento é típico de LLMs autorregressivos do tipo decoder (família GPT)?",
    text_en:
      "Which pre-training objective is typical of autoregressive decoder-type LLMs (GPT family)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Prever tokens mascarados no meio da frase como objetivo principal",
        text_en:
          "Predicting masked tokens in the middle of a sentence as the main objective",
        isCorrect: false,
        explanation: "É o objetivo típico de encoders como o BERT.",
        explanation_en: "That is the typical objective of encoders like BERT.",
      },
      {
        id: "B",
        text: "Prever o próximo token a partir dos anteriores",
        text_en: "Predicting the next token from the previous ones",
        isCorrect: true,
        explanation: "Aprendizado auto-supervisionado em grandes corpora.",
        explanation_en: "Self-supervised learning on large corpora.",
      },
      {
        id: "C",
        text: "Classificar imagens em categorias rotuladas",
        text_en: "Classifying images into labeled categories",
        isCorrect: false,
        explanation: "É aprendizado supervisionado de visão.",
        explanation_en: "That is supervised vision learning.",
      },
      {
        id: "D",
        text: "Maximizar a recompensa em um jogo",
        text_en: "Maximizing reward in a game",
        isCorrect: false,
        explanation: "É aprendizado por reforço.",
        explanation_en: "That is reinforcement learning.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-14",
    text: "Qual é a troca (trade-off) ao escolher embeddings de maior dimensionalidade?",
    text_en:
      "What is the trade-off when choosing higher-dimensional embeddings?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Sempre melhoram a qualidade sem nenhum custo adicional",
        text_en: "They always improve quality with no extra cost",
        isCorrect: false,
        explanation: "Há custo de armazenamento e computação.",
        explanation_en: "There is storage and compute cost.",
      },
      {
        id: "B",
        text: "Eliminam a necessidade de chunking",
        text_en: "They remove the need for chunking",
        isCorrect: false,
        explanation: "Chunking continua necessário.",
        explanation_en: "Chunking is still needed.",
      },
      {
        id: "C",
        text: "Podem capturar mais nuances, porém aumentam armazenamento, memória e latência de busca",
        text_en:
          "They can capture more nuance but increase storage, memory, and search latency",
        isCorrect: true,
        explanation: "Mais dimensões, mais custo de vetores e de consulta.",
        explanation_en: "More dimensions mean higher vector and query cost.",
      },
      {
        id: "D",
        text: "Criptografam os vetores",
        text_en: "They encrypt the vectors",
        isCorrect: false,
        explanation: "Dimensionalidade não é criptografia.",
        explanation_en: "Dimensionality is not encryption.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-15",
    text: "No contexto de IA generativa, o que significa 'grounding' (fundamentação)?",
    text_en: "In generative AI, what does 'grounding' mean?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Reduzir o modelo por quantização",
        text_en: "Shrinking the model through quantization",
        isCorrect: false,
        explanation: "É otimização de eficiência.",
        explanation_en: "An efficiency optimization.",
      },
      {
        id: "B",
        text: "Aterrar fisicamente os servidores",
        text_en: "Physically earthing the servers",
        isCorrect: false,
        explanation: "Sem relação.",
        explanation_en: "Unrelated.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raising the temperature",
        isCorrect: false,
        explanation: "Aumenta a variação, não a fundamentação.",
        explanation_en: "Increases variation, not grounding.",
      },
      {
        id: "D",
        text: "Ancorar as respostas do modelo em fontes de dados externas e verificáveis",
        text_en:
          "Anchoring the model's answers in external, verifiable data sources",
        isCorrect: true,
        explanation: "Reduz alucinações ao basear as respostas em evidências.",
        explanation_en: "Reduces hallucinations by basing answers on evidence.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "medium",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D2-16",
    text: "Uma startup de saúde tem poucos registros reais e restrições de privacidade, e quer treinar um classificador. Qual uso de IA generativa é apropriado?",
    text_en:
      "A healthcare startup has few real records and privacy restrictions and wants to train a classifier. Which generative AI use is appropriate?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Gerar dados sintéticos para ampliar o conjunto, validando-os contra dados reais antes do uso",
        text_en:
          "Generate synthetic data to augment the dataset, validating it against real data before use",
        isCorrect: true,
        explanation:
          "Dados sintéticos podem complementar dados escassos, com validação de qualidade.",
        explanation_en:
          "Synthetic data can supplement scarce data, with quality validation.",
      },
      {
        id: "B",
        text: "Copiar os registros reais para o prompt de todos os usuários",
        text_en: "Copy the real records into every user's prompt",
        isCorrect: false,
        explanation: "Expõe dados sensíveis.",
        explanation_en: "Exposes sensitive data.",
      },
      {
        id: "C",
        text: "Usar o conjunto de teste como treino adicional",
        text_en: "Use the test set as additional training",
        isCorrect: false,
        explanation: "Invalida a avaliação.",
        explanation_en: "Invalidates evaluation.",
      },
      {
        id: "D",
        text: "Remover os rótulos dos dados",
        text_en: "Remove the labels from the data",
        isCorrect: false,
        explanation: "Impede o aprendizado supervisionado.",
        explanation_en: "Prevents supervised learning.",
      },
    ],
    category: "generative_ai",
    dominio: "DOMAIN_2",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/generative-ai/"],
  },
  {
    id: "AIF-C01-E5-D3-01",
    text: "Uma seguradora quer um assistente que responda com base em tabelas de preços que mudam todos os dias e retorne sempre JSON em um esquema fixo para um sistema legado. Qual combinação é a mais adequada?",
    text_en:
      "An insurer wants an assistant that answers from price tables that change every day and always returns JSON in a fixed schema for a legacy system. Which combination is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Fine-tuning mensal com os preços",
        text_en: "Monthly fine-tuning with the prices",
        isCorrect: false,
        explanation: "Os preços ficariam desatualizados entre treinamentos.",
        explanation_en: "Prices would be stale between trainings.",
      },
      {
        id: "B",
        text: "RAG sobre os documentos de preços atualizados, com engenharia de prompt (esquema e exemplos do JSON)",
        text_en:
          "RAG over the updated price documents, with prompt engineering (JSON schema and examples)",
        isCorrect: true,
        explanation: "O RAG traz dados atuais; o prompt garante o formato.",
        explanation_en:
          "RAG brings current data; the prompt enforces the format.",
      },
      {
        id: "C",
        text: "Pré-treinamento contínuo diário",
        text_en: "Daily continued pre-training",
        isCorrect: false,
        explanation: "Caro, lento e desproporcional.",
        explanation_en: "Costly, slow, and disproportionate.",
      },
      {
        id: "D",
        text: "Apenas aumentar a temperatura",
        text_en: "Just raise the temperature",
        isCorrect: false,
        explanation: "Não traz dados nem formato.",
        explanation_en: "Brings neither data nor format.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-02",
    text: "Em um sistema RAG, as respostas misturam assuntos diferentes. Cada chunk tem ~5.000 tokens e cobre vários tópicos. Qual ajuste mais provavelmente melhora a precisão?",
    text_en:
      "In a RAG system, answers mix different subjects. Each chunk is ~5,000 tokens and covers several topics. Which adjustment most likely improves precision?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aumentar ainda mais o tamanho dos chunks",
        text_en: "Make the chunks even larger",
        isCorrect: false,
        explanation: "Agravaria a mistura de tópicos.",
        explanation_en: "Would worsen topic mixing.",
      },
      {
        id: "B",
        text: "Aumentar o número de resultados recuperados para 50",
        text_en: "Raise the number of retrieved results to 50",
        isCorrect: false,
        explanation: "Adiciona mais ruído e consome contexto.",
        explanation_en: "Adds more noise and consumes context.",
      },
      {
        id: "C",
        text: "Reduzir o tamanho dos chunks ou usar chunking semântico/hierárquico, para que cada trecho tenha foco único",
        text_en:
          "Reduce chunk size or use semantic/hierarchical chunking so each passage has a single focus",
        isCorrect: true,
        explanation:
          "Trechos focados geram embeddings mais específicos e recuperação mais precisa.",
        explanation_en:
          "Focused passages yield more specific embeddings and more precise retrieval.",
      },
      {
        id: "D",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não afeta a recuperação.",
        explanation_en: "Does not affect retrieval.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-03",
    text: "O assistente de RH cita a política de férias de 2021, embora a de 2025 também esteja indexada. Qual é a melhor correção?",
    text_en:
      "The HR assistant cites the 2021 vacation policy even though the 2025 one is also indexed. What is the best fix?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aumentar o máximo de tokens",
        text_en: "Raise max tokens",
        isCorrect: false,
        explanation: "Não altera quais trechos são recuperados.",
        explanation_en: "Does not change which passages are retrieved.",
      },
      {
        id: "B",
        text: "Fazer fine-tuning com a política nova",
        text_en: "Fine-tune with the new policy",
        isCorrect: false,
        explanation: "Caro e desnecessário; a política voltará a mudar.",
        explanation_en: "Costly and unnecessary; the policy will change again.",
      },
      {
        id: "C",
        text: "Reduzir a temperatura a zero",
        text_en: "Set temperature to zero",
        isCorrect: false,
        explanation: "Não corrige a recuperação de versões antigas.",
        explanation_en: "Does not fix retrieval of old versions.",
      },
      {
        id: "D",
        text: "Arquivar versões obsoletas e usar metadados (ex.: ano de vigência) com filtros na recuperação",
        text_en:
          "Archive obsolete versions and use metadata (e.g., effective year) with retrieval filters",
        isCorrect: true,
        explanation: "Garante que apenas conteúdo vigente seja recuperado.",
        explanation_en: "Ensures only current content is retrieved.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-04",
    text: "Mesmo com os trechos corretos recuperados, o modelo às vezes responde com conhecimento próprio e contradiz os documentos. Qual medida é mais eficaz?",
    text_en:
      "Even with the correct passages retrieved, the model sometimes answers from its own knowledge and contradicts the documents. Which measure is most effective?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Instruir no prompt a responder só com base no contexto (e dizer 'não sei' se faltar) e aplicar verificação de fundamentação contextual",
        text_en:
          "Instruct in the prompt to answer only from the context (and say 'I don't know' if missing) and apply a contextual grounding check",
        isCorrect: true,
        explanation:
          "Reforça o uso do contexto e detecta respostas não sustentadas.",
        explanation_en:
          "Reinforces use of context and detects unsupported answers.",
      },
      {
        id: "B",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Aumenta a chance de desvio.",
        explanation_en: "Increases the chance of deviation.",
      },
      {
        id: "C",
        text: "Remover o contexto do prompt",
        text_en: "Remove the context from the prompt",
        isCorrect: false,
        explanation: "Eliminaria a base factual.",
        explanation_en: "Would remove the factual basis.",
      },
      {
        id: "D",
        text: "Escolher um modelo com janela de contexto menor",
        text_en: "Choose a model with a smaller context window",
        isCorrect: false,
        explanation: "Não resolve a aderência ao contexto.",
        explanation_en: "Does not fix adherence to context.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/guardrails/"],
  },
  {
    id: "AIF-C01-E5-D3-05",
    text: "Qual métrica de avaliação de RAG verifica se a resposta gerada é sustentada pelos trechos recuperados, detectando alucinação em relação ao contexto?",
    text_en:
      "Which RAG evaluation metric checks whether the generated answer is supported by the retrieved passages, detecting hallucination relative to the context?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Relevância do contexto recuperado",
        text_en: "Retrieved context relevance",
        isCorrect: false,
        explanation:
          "Mede se os trechos são pertinentes à pergunta, não se a resposta é sustentada por eles.",
        explanation_en:
          "Measures whether passages are pertinent to the question, not whether the answer is supported by them.",
      },
      {
        id: "B",
        text: "Fidelidade (faithfulness/groundedness)",
        text_en: "Faithfulness (groundedness)",
        isCorrect: true,
        explanation: "Mede se a resposta decorre do contexto recuperado.",
        explanation_en:
          "Measures whether the answer follows from the retrieved context.",
      },
      {
        id: "C",
        text: "Latência p95",
        text_en: "p95 latency",
        isCorrect: false,
        explanation: "Mede desempenho, não veracidade.",
        explanation_en: "Measures performance, not truthfulness.",
      },
      {
        id: "D",
        text: "BLEU contra uma resposta de referência",
        text_en: "BLEU against a reference answer",
        isCorrect: false,
        explanation:
          "Mede sobreposição de n-gramas, não fundamentação no contexto.",
        explanation_en: "Measures n-gram overlap, not grounding in context.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-06",
    text: "Uma aplicação deve (a) consultar o status de pedidos em uma API interna e (b) cancelar pedidos quando o cliente pedir. Qual recurso do Bedrock é essencial?",
    text_en:
      "An application must (a) look up order status in an internal API and (b) cancel orders when the customer asks. Which Bedrock capability is essential?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Knowledge Bases sozinha",
        text_en: "Knowledge Bases alone",
        isCorrect: false,
        explanation:
          "Recupera informação, mas não executa ações como cancelar pedidos.",
        explanation_en:
          "Retrieves information but does not perform actions like cancelling orders.",
      },
      {
        id: "B",
        text: "Bedrock Guardrails",
        text_en: "Bedrock Guardrails",
        isCorrect: false,
        explanation: "Aplica políticas de segurança, não executa ações.",
        explanation_en: "Applies safety policies; it does not perform actions.",
      },
      {
        id: "C",
        text: "Agents for Amazon Bedrock (grupos de ação)",
        text_en: "Agents for Amazon Bedrock (action groups)",
        isCorrect: true,
        explanation: "Planejam e executam ações em APIs.",
        explanation_en: "Plan and execute actions on APIs.",
      },
      {
        id: "D",
        text: "Bedrock Model Evaluation",
        text_en: "Bedrock Model Evaluation",
        isCorrect: false,
        explanation: "Compara modelos; não integra APIs.",
        explanation_en: "Compares models; it does not integrate APIs.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/agents/"],
  },
  {
    id: "AIF-C01-E5-D3-07",
    text: "Antes de um fine-tuning, a equipe nota que o dataset de 20.000 pares contém duplicatas, dados pessoais e respostas contraditórias. O que fazer?",
    text_en:
      "Before fine-tuning, the team notices the 20,000-pair dataset contains duplicates, personal data, and contradictory answers. What should it do?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Treinar assim mesmo, pois o volume compensa os problemas",
        text_en: "Train anyway; volume compensates for the problems",
        isCorrect: false,
        explanation: "O modelo aprenderá as inconsistências.",
        explanation_en: "The model will learn the inconsistencies.",
      },
      {
        id: "B",
        text: "Dobrar o número de épocas",
        text_en: "Double the number of epochs",
        isCorrect: false,
        explanation: "Reforça o aprendizado de dados ruins.",
        explanation_en: "Reinforces learning from bad data.",
      },
      {
        id: "C",
        text: "Adicionar mais cópias dos mesmos exemplos",
        text_en: "Add more copies of the same examples",
        isCorrect: false,
        explanation: "Agrava duplicação e viés.",
        explanation_en: "Worsens duplication and bias.",
      },
      {
        id: "D",
        text: "Limpar, remover duplicatas, anonimizar PII e corrigir inconsistências; a qualidade importa mais que a quantidade",
        text_en:
          "Clean, deduplicate, anonymize PII, and fix inconsistencies; quality matters more than quantity",
        isCorrect: true,
        explanation:
          "Dados ruins ensinam comportamentos ruins e expõem dados pessoais.",
        explanation_en:
          "Bad data teaches bad behavior and exposes personal data.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/"],
  },
  {
    id: "AIF-C01-E5-D3-08",
    text: "A empresa escolheu o FM com a maior pontuação em um ranking público, mas o desempenho em sua tarefa de suporte em português é fraco. Qual abordagem teria evitado isso?",
    text_en:
      "The company picked the FM with the top score on a public leaderboard, but performance on its Portuguese support task is poor. Which approach would have avoided this?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Avaliar os candidatos com um conjunto de avaliação próprio, representativo da tarefa e do idioma (ex.: Bedrock Model Evaluation)",
        text_en:
          "Evaluate candidates with its own evaluation set representative of the task and language (e.g., Bedrock Model Evaluation)",
        isCorrect: true,
        explanation:
          "Benchmarks públicos nem sempre refletem o seu caso de uso.",
        explanation_en:
          "Public benchmarks do not always reflect your use case.",
      },
      {
        id: "B",
        text: "Escolher sempre o modelo mais caro",
        text_en: "Always choose the most expensive model",
        isCorrect: false,
        explanation: "Preço não garante bom desempenho na tarefa.",
        explanation_en: "Price does not guarantee task performance.",
      },
      {
        id: "C",
        text: "Escolher pelo maior número de parâmetros",
        text_en: "Choose by largest parameter count",
        isCorrect: false,
        explanation: "Tamanho não garante qualidade em português.",
        explanation_en: "Size does not guarantee Portuguese quality.",
      },
      {
        id: "D",
        text: "Confiar totalmente no ranking público",
        text_en: "Rely entirely on the public ranking",
        isCorrect: false,
        explanation: "Foi exatamente o que falhou.",
        explanation_en: "That is exactly what failed.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/evaluations/"],
  },
  {
    id: "AIF-C01-E5-D3-09",
    text: "Um assistente de voz precisa começar a responder em menos de 1 segundo. Qual combinação reduz mais a latência percebida?",
    text_en:
      "A voice assistant must start responding in under 1 second. Which combination reduces perceived latency the most?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "O maior modelo disponível com máximo de tokens alto",
        text_en: "The largest available model with a high max tokens",
        isCorrect: false,
        explanation: "Tende a aumentar a latência.",
        explanation_en: "Tends to increase latency.",
      },
      {
        id: "B",
        text: "Modelo menor/otimizado para latência, resposta em streaming e prompts curtos (com cache quando possível)",
        text_en:
          "A smaller/latency-optimized model, streaming responses, and short prompts (with caching when possible)",
        isCorrect: true,
        explanation:
          "Reduz o tempo até o primeiro token e o volume processado.",
        explanation_en: "Reduces time to first token and processed volume.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não reduz latência.",
        explanation_en: "Does not reduce latency.",
      },
      {
        id: "D",
        text: "Usar inferência em lote",
        text_en: "Use batch inference",
        isCorrect: false,
        explanation: "É assíncrona e inadequada para interação em tempo real.",
        explanation_en:
          "It is asynchronous and unsuitable for real-time interaction.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/"],
  },
  {
    id: "AIF-C01-E5-D3-10",
    text: "Durante campanhas, a aplicação recebe erros de throttling no modo sob demanda. O tráfego base é alto e previsível o ano todo, e a latência estável é um requisito. Qual solução é a mais adequada?",
    text_en:
      "During campaigns the application gets throttling errors on on-demand mode. Base traffic is high and predictable year-round, and stable latency is a requirement. Which solution is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Apenas inferência entre regiões",
        text_en: "Cross-Region inference alone",
        isCorrect: false,
        explanation:
          "Ajuda com picos, mas não oferece capacidade dedicada com latência estável garantida.",
        explanation_en:
          "Helps with bursts but does not provide dedicated capacity with guaranteed stable latency.",
      },
      {
        id: "B",
        text: "Retentativas imediatas e ilimitadas, sem backoff",
        text_en: "Immediate, unlimited retries with no backoff",
        isCorrect: false,
        explanation: "Agrava o throttling.",
        explanation_en: "Worsens throttling.",
      },
      {
        id: "C",
        text: "Provisioned Throughput (capacidade reservada)",
        text_en: "Provisioned Throughput (reserved capacity)",
        isCorrect: true,
        explanation: "Garante capacidade dedicada e desempenho previsível.",
        explanation_en:
          "Guarantees dedicated capacity and predictable performance.",
      },
      {
        id: "D",
        text: "Migrar para inferência em lote",
        text_en: "Move to batch inference",
        isCorrect: false,
        explanation: "Inadequada para chamadas interativas.",
        explanation_en: "Unsuitable for interactive calls.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/pricing/"],
  },
  {
    id: "AIF-C01-E5-D3-11",
    text: "A equipe quer hospedar um modelo de pesos abertos específico, com um contêiner de inferência personalizado e controle do tipo de instância e da otimização do serving. Qual serviço atende melhor?",
    text_en:
      "The team wants to host a specific open-weight model with a custom inference container and control over instance type and serving optimization. Which service fits best?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Bedrock sob demanda padrão",
        text_en: "Standard on-demand Amazon Bedrock",
        isCorrect: false,
        explanation:
          "É serverless e gerenciado, sem controle de contêiner e instância.",
        explanation_en:
          "Serverless and managed, with no container or instance control.",
      },
      {
        id: "B",
        text: "Amazon Q Business",
        text_en: "Amazon Q Business",
        isCorrect: false,
        explanation:
          "É um assistente corporativo pronto, não uma plataforma de hospedagem.",
        explanation_en:
          "A ready-made enterprise assistant, not a hosting platform.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        text_en: "Amazon Comprehend",
        isCorrect: false,
        explanation: "É um serviço de NLP gerenciado.",
        explanation_en: "A managed NLP service.",
      },
      {
        id: "D",
        text: "Amazon SageMaker AI (endpoints/JumpStart)",
        text_en: "Amazon SageMaker AI (endpoints/JumpStart)",
        isCorrect: true,
        explanation:
          "Dá controle sobre contêiner, instância e configuração de hospedagem.",
        explanation_en:
          "Gives control over container, instance, and hosting configuration.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/sagemaker/jumpstart/"],
  },
  {
    id: "AIF-C01-E5-D3-12",
    text: "Uma empresa quer embutir respostas baseadas em seus manuais no próprio aplicativo voltado ao cliente, com controle total sobre prompts, modelo e experiência de uso. Qual é a melhor base?",
    text_en:
      "A company wants to embed answers based on its manuals in its own customer-facing app, with full control over prompts, model, and user experience. What is the best foundation?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Bedrock Knowledge Bases com um FM via API",
        text_en: "Amazon Bedrock Knowledge Bases with an FM via API",
        isCorrect: true,
        explanation:
          "Permite construir a experiência própria sobre RAG gerenciado.",
        explanation_en: "Lets you build your own experience on managed RAG.",
      },
      {
        id: "B",
        text: "Amazon Q Business",
        text_en: "Amazon Q Business",
        isCorrect: false,
        explanation:
          "É voltado a assistentes para a força de trabalho, com menos personalização de UX para clientes.",
        explanation_en:
          "Aimed at workforce assistants, with less UX customization for customers.",
      },
      {
        id: "C",
        text: "Amazon Kendra isoladamente",
        text_en: "Amazon Kendra alone",
        isCorrect: false,
        explanation:
          "Retorna resultados de busca; não gera respostas sem um FM.",
        explanation_en:
          "Returns search results; it does not generate answers without an FM.",
      },
      {
        id: "D",
        text: "Amazon Lex isoladamente",
        text_en: "Amazon Lex alone",
        isCorrect: false,
        explanation: "Gerencia diálogo, mas não faz RAG sobre manuais.",
        explanation_en: "Manages dialog but does not do RAG over manuals.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-13",
    text: "A empresa migra para uma versão nova do mesmo FM e nota mudanças sutis no formato das respostas que quebram integrações. Qual prática previne isso?",
    text_en:
      "The company migrates to a new version of the same FM and notices subtle changes in response format that break integrations. Which practice prevents this?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Assumir compatibilidade total entre versões",
        text_en: "Assume full compatibility between versions",
        isCorrect: false,
        explanation: "Versões podem diferir em estilo e formato.",
        explanation_en: "Versions can differ in style and format.",
      },
      {
        id: "B",
        text: "Manter um conjunto de testes de regressão com casos de referência, executá-lo antes de migrar e fixar versões do modelo",
        text_en:
          "Keep a regression test suite of reference cases, run it before migrating, and pin model versions",
        isCorrect: true,
        explanation:
          "Detecta mudanças de comportamento antes de chegarem à produção.",
        explanation_en:
          "Detects behavior changes before they reach production.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Aumenta a variação.",
        explanation_en: "Increases variation.",
      },
      {
        id: "D",
        text: "Desativar a validação do parser",
        text_en: "Disable the parser validation",
        isCorrect: false,
        explanation: "Esconde falhas em vez de preveni-las.",
        explanation_en: "Hides failures instead of preventing them.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/"],
  },
  {
    id: "AIF-C01-E5-D3-14",
    text: "Qual é a troca típica de índices vetoriais aproximados (ANN, como HNSW)?",
    text_en:
      "What is the typical trade-off of approximate vector indexes (ANN, such as HNSW)?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Sempre mais exatidão e mais lentidão",
        text_en: "Always more exactness and more slowness",
        isCorrect: false,
        explanation: "Descreve a busca exata, não ANN.",
        explanation_en: "Describes exact search, not ANN.",
      },
      {
        id: "B",
        text: "Eliminar a necessidade de embeddings",
        text_en: "Eliminating the need for embeddings",
        isCorrect: false,
        explanation: "ANN opera sobre embeddings.",
        explanation_en: "ANN operates on embeddings.",
      },
      {
        id: "C",
        text: "Aceitar uma pequena perda de exatidão do vizinho mais próximo em troca de buscas muito mais rápidas em grande escala",
        text_en:
          "Accepting a small loss in nearest-neighbor exactness in exchange for much faster searches at scale",
        isCorrect: true,
        explanation: "Evita comparar a consulta com todos os vetores.",
        explanation_en: "Avoids comparing the query against every vector.",
      },
      {
        id: "D",
        text: "Criptografar os vetores",
        text_en: "Encrypting the vectors",
        isCorrect: false,
        explanation: "Sem relação.",
        explanation_en: "Unrelated.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/what-is/vector-databases/"],
  },
  {
    id: "AIF-C01-E5-D3-15",
    text: "Em um chatbot RAG multi-turno, a pergunta de acompanhamento 'e qual o preço dele?' recupera trechos irrelevantes. Qual técnica melhora a recuperação?",
    text_en:
      "In a multi-turn RAG chatbot, the follow-up question 'and what is its price?' retrieves irrelevant passages. Which technique improves retrieval?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Buscar usando apenas a última mensagem literal",
        text_en: "Search using only the literal last message",
        isCorrect: false,
        explanation: "Foi o que causou o problema.",
        explanation_en: "That caused the problem.",
      },
      {
        id: "B",
        text: "Aumentar o tamanho dos chunks",
        text_en: "Make chunks larger",
        isCorrect: false,
        explanation: "Não resolve a falta de contexto na consulta.",
        explanation_en: "Does not fix missing context in the query.",
      },
      {
        id: "C",
        text: "Reduzir a temperatura",
        text_en: "Lower the temperature",
        isCorrect: false,
        explanation: "Não afeta a recuperação.",
        explanation_en: "Does not affect retrieval.",
      },
      {
        id: "D",
        text: "Reescrever a pergunta com base no histórico, formando uma consulta autônoma (ex.: 'qual o preço do produto X?')",
        text_en:
          "Rewrite the question using the history to form a standalone query (e.g., 'what is the price of product X?')",
        isCorrect: true,
        explanation: "A consulta passa a conter o contexto necessário.",
        explanation_en: "The query now carries the needed context.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-16",
    text: "Analistas querem fazer perguntas em linguagem natural sobre tabelas em um data warehouse (ex.: Amazon Redshift) sem copiar os dados para um índice vetorial. Que recurso do Bedrock Knowledge Bases ajuda?",
    text_en:
      "Analysts want to ask natural-language questions about tables in a data warehouse (e.g., Amazon Redshift) without copying data into a vector index. Which Bedrock Knowledge Bases capability helps?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Recuperação de dados estruturados (linguagem natural para SQL)",
        text_en: "Structured data retrieval (natural language to SQL)",
        isCorrect: true,
        explanation: "Gera consultas SQL sobre o armazenamento estruturado.",
        explanation_en: "Generates SQL queries over the structured store.",
      },
      {
        id: "B",
        text: "Chunking semântico de PDFs",
        text_en: "Semantic chunking of PDFs",
        isCorrect: false,
        explanation: "É para documentos não estruturados.",
        explanation_en: "For unstructured documents.",
      },
      {
        id: "C",
        text: "Provisioned Throughput",
        text_en: "Provisioned Throughput",
        isCorrect: false,
        explanation: "É capacidade de inferência, não acesso a dados.",
        explanation_en: "Inference capacity, not data access.",
      },
      {
        id: "D",
        text: "Custom Model Import",
        text_en: "Custom Model Import",
        isCorrect: false,
        explanation: "Importa modelos; não consulta tabelas.",
        explanation_en: "Imports models; it does not query tables.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-17",
    text: "Chunks de 12.000 tokens são enviados a um modelo de embeddings com limite de 8.192 tokens de entrada. O que tende a ocorrer?",
    text_en:
      "12,000-token chunks are sent to an embeddings model with an 8,192-token input limit. What is likely to happen?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "O modelo cria automaticamente vetores maiores",
        text_en: "The model automatically creates larger vectors",
        isCorrect: false,
        explanation: "A dimensão do vetor é fixa.",
        explanation_en: "Vector dimension is fixed.",
      },
      {
        id: "B",
        text: "Truncamento ou erro, perdendo parte do conteúdo no vetor; é preciso ajustar o tamanho dos chunks ao limite do modelo",
        text_en:
          "Truncation or an error, losing part of the content in the vector; chunk size must be fitted to the model's limit",
        isCorrect: true,
        explanation: "Conteúdo além do limite não é representado.",
        explanation_en: "Content beyond the limit is not represented.",
      },
      {
        id: "C",
        text: "O limite é ignorado sem efeito algum",
        text_en: "The limit is ignored with no effect",
        isCorrect: false,
        explanation: "Limites de entrada são aplicados.",
        explanation_en: "Input limits are enforced.",
      },
      {
        id: "D",
        text: "O custo cai a zero",
        text_en: "Cost drops to zero",
        isCorrect: false,
        explanation: "Sem relação.",
        explanation_en: "Unrelated.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/knowledge-bases/"],
  },
  {
    id: "AIF-C01-E5-D3-18",
    text: "Por que um agente do Bedrock tende a consumir mais tokens e ter maior latência do que uma única chamada ao FM?",
    text_en:
      "Why does a Bedrock agent tend to consume more tokens and have higher latency than a single FM call?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Porque cobra uma taxa por região",
        text_en: "Because it charges a per-Region fee",
        isCorrect: false,
        explanation: "Não é a causa.",
        explanation_en: "Not the cause.",
      },
      {
        id: "B",
        text: "Porque re-treina o modelo a cada tarefa",
        text_en: "Because it retrains the model on every task",
        isCorrect: false,
        explanation: "Agentes não re-treinam.",
        explanation_en: "Agents do not retrain.",
      },
      {
        id: "C",
        text: "Porque executa várias chamadas ao modelo (planejamento, uso de ferramentas e análise das observações), cada uma consumindo tokens",
        text_en:
          "Because it makes multiple model calls (planning, tool use, and analyzing observations), each consuming tokens",
        isCorrect: true,
        explanation: "O ciclo de raciocínio e ação multiplica as chamadas.",
        explanation_en: "The reason-and-act loop multiplies calls.",
      },
      {
        id: "D",
        text: "Porque desativa o streaming do modelo",
        text_en: "Because it disables model streaming",
        isCorrect: false,
        explanation: "Não é a explicação.",
        explanation_en: "Not the explanation.",
      },
    ],
    category: "foundation_models",
    dominio: "DOMAIN_3",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/agents/"],
  },
  {
    id: "AIF-C01-E5-D4-01",
    text: "Um banco precisa justificar a cada cliente por que o crédito foi negado e demonstrar aos reguladores que o modelo não usa atributos de forma discriminatória. Qual abordagem atende melhor?",
    text_en:
      "A bank must justify to each customer why credit was denied and show regulators the model does not use attributes in a discriminatory way. Which approach fits best?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Apenas aumentar a acurácia, sem documentação",
        text_en: "Just increase accuracy with no documentation",
        isCorrect: false,
        explanation: "Não atende à exigência de explicação e transparência.",
        explanation_en:
          "Does not meet the explanation and transparency requirement.",
      },
      {
        id: "B",
        text: "Ocultar do cliente os atributos usados",
        text_en: "Hide the attributes used from the customer",
        isCorrect: false,
        explanation: "Contraria a transparência.",
        explanation_en: "Contradicts transparency.",
      },
      {
        id: "C",
        text: "Usar apenas filtros de conteúdo tóxico do Guardrails",
        text_en: "Use only Guardrails toxic-content filters",
        isCorrect: false,
        explanation: "Não tratam explicabilidade nem viés em crédito.",
        explanation_en: "Do not address explainability or credit bias.",
      },
      {
        id: "D",
        text: "Explicabilidade por previsão (atribuição de atributos, ex.: SageMaker Clarify/SHAP) e métricas de viés, documentadas em um model card",
        text_en:
          "Per-prediction explainability (feature attribution, e.g., SageMaker Clarify/SHAP) and bias metrics, documented in a model card",
        isCorrect: true,
        explanation: "Explica decisões individuais e evidencia a equidade.",
        explanation_en: "Explains individual decisions and evidences fairness.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/sagemaker/clarify/"],
  },
  {
    id: "AIF-C01-E5-D4-02",
    text: "Uma pesquisa de satisfação usada para treinar um modelo foi coletada apenas por um aplicativo de smartphone. Que tipo de problema isso representa?",
    text_en:
      "A satisfaction survey used to train a model was collected only through a smartphone app. What type of problem does this represent?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Viés de amostragem/seleção: os dados não representam toda a população",
        text_en:
          "Sampling/selection bias: the data does not represent the whole population",
        isCorrect: true,
        explanation: "Quem não usa o app fica sub-representado.",
        explanation_en: "People who do not use the app are underrepresented.",
      },
      {
        id: "B",
        text: "Overfitting",
        text_en: "Overfitting",
        isCorrect: false,
        explanation: "É problema de treinamento, não de coleta.",
        explanation_en: "A training problem, not a collection one.",
      },
      {
        id: "C",
        text: "Vazamento de dados",
        text_en: "Data leakage",
        isCorrect: false,
        explanation: "Não há informação futura envolvida.",
        explanation_en: "No future information is involved.",
      },
      {
        id: "D",
        text: "Concept drift",
        text_en: "Concept drift",
        isCorrect: false,
        explanation: "Refere-se a mudança ao longo do tempo.",
        explanation_en: "Refers to change over time.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ai/responsible-ai/"],
  },
  {
    id: "AIF-C01-E5-D4-03",
    text: "Um modelo de reconhecimento de fala tem 95% de acurácia geral, mas usuários de um sotaque regional relatam muitos erros. Qual análise revela o problema?",
    text_en:
      "A speech recognition model has 95% overall accuracy, but users of a regional accent report many errors. Which analysis reveals the problem?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Olhar apenas a acurácia média",
        text_en: "Look only at average accuracy",
        isCorrect: false,
        explanation: "É o que esconde o problema.",
        explanation_en: "That is what hides the problem.",
      },
      {
        id: "B",
        text: "Avaliação desagregada por subgrupo (sotaque, idioma, região)",
        text_en:
          "Disaggregated evaluation by subgroup (accent, language, region)",
        isCorrect: true,
        explanation: "Médias gerais escondem desempenho ruim em subgrupos.",
        explanation_en: "Overall averages hide poor subgroup performance.",
      },
      {
        id: "C",
        text: "Aumentar a janela de contexto",
        text_en: "Enlarge the context window",
        isCorrect: false,
        explanation: "Não revela disparidades.",
        explanation_en: "Does not reveal disparities.",
      },
      {
        id: "D",
        text: "Medir apenas o tempo de resposta",
        text_en: "Measure only response time",
        isCorrect: false,
        explanation: "Não mede equidade.",
        explanation_en: "Does not measure fairness.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/ai/responsible-ai/"],
  },
  {
    id: "AIF-C01-E5-D4-04",
    text: "Uma empresa lança uma ferramenta de geração de imagens por IA e teme usos enganosos (deepfakes). Qual combinação de medidas é a mais alinhada à IA responsável?",
    text_en:
      "A company launches an AI image generation tool and fears deceptive uses (deepfakes). Which combination of measures best aligns with responsible AI?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Liberar sem restrições para aumentar a adoção",
        text_en: "Release with no restrictions to boost adoption",
        isCorrect: false,
        explanation: "Ignora o risco de mau uso.",
        explanation_en: "Ignores misuse risk.",
      },
      {
        id: "B",
        text: "Remover os registros de auditoria",
        text_en: "Remove audit logs",
        isCorrect: false,
        explanation: "Reduz a responsabilização.",
        explanation_en: "Reduces accountability.",
      },
      {
        id: "C",
        text: "Marcas d'água/credenciais de proveniência, filtros de conteúdo e políticas de uso com monitoramento",
        text_en:
          "Watermarks/provenance credentials, content filters, and usage policies with monitoring",
        isCorrect: true,
        explanation: "Combina rastreabilidade, prevenção e governança.",
        explanation_en: "Combines traceability, prevention, and governance.",
      },
      {
        id: "D",
        text: "Apenas aumentar a resolução das imagens",
        text_en: "Just increase image resolution",
        isCorrect: false,
        explanation: "Não trata o risco.",
        explanation_en: "Does not address the risk.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/"],
  },
  {
    id: "AIF-C01-E5-D4-05",
    text: "Uma equipe precisa (1) documentar o uso pretendido e as limitações de um modelo que ela própria treinou e (2) entender os limites do serviço gerenciado Amazon Rekognition. Quais recursos correspondem a cada necessidade?",
    text_en:
      "A team needs to (1) document the intended use and limitations of a model it trained itself and (2) understand the limits of the managed Amazon Rekognition service. Which resources match each need?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "AWS AI Service Cards para (1) e SageMaker Model Cards para (2)",
        text_en:
          "AWS AI Service Cards for (1) and SageMaker Model Cards for (2)",
        isCorrect: false,
        explanation: "Inverte a finalidade de cada recurso.",
        explanation_en: "Reverses each resource's purpose.",
      },
      {
        id: "B",
        text: "AWS AI Service Cards para ambos",
        text_en: "AWS AI Service Cards for both",
        isCorrect: false,
        explanation: "Não documentam modelos próprios.",
        explanation_en: "They do not document your own models.",
      },
      {
        id: "C",
        text: "SageMaker Model Cards para ambos",
        text_en: "SageMaker Model Cards for both",
        isCorrect: false,
        explanation: "Não descrevem serviços gerenciados da AWS.",
        explanation_en: "They do not describe AWS managed services.",
      },
      {
        id: "D",
        text: "SageMaker Model Cards para (1) e AWS AI Service Cards para (2)",
        text_en:
          "SageMaker Model Cards for (1) and AWS AI Service Cards for (2)",
        isCorrect: true,
        explanation:
          "Model Cards documentam seus modelos; AI Service Cards descrevem serviços da AWS.",
        explanation_en:
          "Model Cards document your own models; AI Service Cards describe AWS services.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/ai/responsible-ai/resources/"],
  },
  {
    id: "AIF-C01-E5-D4-06",
    text: "Clientes podem exigir a exclusão de seus dados pessoais (LGPD/GDPR). Qual decisão de arquitetura facilita atender a isso em uma aplicação generativa?",
    text_en:
      "Customers may demand deletion of their personal data (LGPD/GDPR). Which architectural decision makes this easier in a generative application?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Manter dados pessoais em uma base de conhecimento externa (RAG), de onde registros podem ser removidos, em vez de incorporá-los aos pesos por fine-tuning",
        text_en:
          "Keep personal data in an external knowledge base (RAG), where records can be removed, instead of baking it into weights via fine-tuning",
        isCorrect: true,
        explanation:
          "Dados nos pesos são difíceis de apagar; em uma base externa, basta remover o registro.",
        explanation_en:
          "Data in weights is hard to erase; in an external store you just remove the record.",
      },
      {
        id: "B",
        text: "Fazer fine-tuning com todos os dados pessoais",
        text_en: "Fine-tune with all personal data",
        isCorrect: false,
        explanation: "Torna a exclusão muito difícil.",
        explanation_en: "Makes deletion very hard.",
      },
      {
        id: "C",
        text: "Pré-treinar um novo modelo com os dados dos clientes",
        text_en: "Pre-train a new model on customer data",
        isCorrect: false,
        explanation: "Embute os dados no modelo.",
        explanation_en: "Embeds the data in the model.",
      },
      {
        id: "D",
        text: "Guardar os dados em system prompts permanentes",
        text_en: "Store the data in permanent system prompts",
        isCorrect: false,
        explanation: "Espalha os dados e dificulta o controle.",
        explanation_en: "Spreads data and complicates control.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/ai/responsible-ai/"],
  },
  {
    id: "AIF-C01-E5-D4-07",
    text: "Analistas passaram a aceitar sugestões de um assistente de IA sem verificar, e erros passaram despercebidos. Qual mitigação é a mais adequada?",
    text_en:
      "Analysts began accepting an AI assistant's suggestions without checking, and errors went unnoticed. Which mitigation is most appropriate?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Ocultar as fontes para simplificar a interface",
        text_en: "Hide sources to simplify the interface",
        isCorrect: false,
        explanation: "Dificulta a verificação.",
        explanation_en: "Makes verification harder.",
      },
      {
        id: "B",
        text: "Treinar os usuários, exibir citações/níveis de confiança e exigir revisão humana em decisões críticas",
        text_en:
          "Train users, show citations/confidence levels, and require human review for critical decisions",
        isCorrect: true,
        explanation: "Reduz a dependência excessiva e facilita a verificação.",
        explanation_en: "Reduces overreliance and eases verification.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não reduz a dependência excessiva.",
        explanation_en: "Does not reduce overreliance.",
      },
      {
        id: "D",
        text: "Remover a revisão para ganhar velocidade",
        text_en: "Remove review to gain speed",
        isCorrect: false,
        explanation: "Agrava o problema.",
        explanation_en: "Worsens the problem.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "medium",
    references: ["https://aws.amazon.com/ai/responsible-ai/"],
  },
  {
    id: "AIF-C01-E5-D4-08",
    text: "Um chatbot funciona bem em inglês, mas gera respostas piores e mais tóxicas em um idioma com menos dados de treino. O que melhor aborda esse problema de equidade?",
    text_en:
      "A chatbot works well in English but produces worse and more toxic responses in a language with less training data. What best addresses this fairness problem?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Assumir que o desempenho em inglês se generaliza",
        text_en: "Assume English performance generalizes",
        isCorrect: false,
        explanation: "Não é garantido.",
        explanation_en: "Not guaranteed.",
      },
      {
        id: "B",
        text: "Lançar assim e corrigir só se houver reclamações",
        text_en: "Launch as is and fix only if there are complaints",
        isCorrect: false,
        explanation: "Reativo e injusto com os usuários afetados.",
        explanation_en: "Reactive and unfair to affected users.",
      },
      {
        id: "C",
        text: "Avaliar e testar sistematicamente cada idioma atendido e, se necessário, ajustar a escolha do modelo e dos guardrails para esses idiomas",
        text_en:
          "Systematically evaluate and test each supported language and, if needed, adjust the model choice and guardrails for those languages",
        isCorrect: true,
        explanation: "Equidade exige verificar o desempenho por idioma.",
        explanation_en: "Fairness requires checking performance per language.",
      },
      {
        id: "D",
        text: "Reduzir a janela de contexto",
        text_en: "Reduce the context window",
        isCorrect: false,
        explanation: "Não resolve a disparidade entre idiomas.",
        explanation_en: "Does not solve the language disparity.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/ai/responsible-ai/"],
  },
  {
    id: "AIF-C01-E5-D4-09",
    text: "Após ativar filtros do Bedrock Guardrails com força máxima, o assistente de uma clínica começa a bloquear perguntas legítimas sobre medicamentos. O que fazer?",
    text_en:
      "After enabling Bedrock Guardrails filters at maximum strength, a clinic's assistant starts blocking legitimate questions about medications. What should be done?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Desativar todos os guardrails",
        text_en: "Disable all guardrails",
        isCorrect: false,
        explanation: "Remove proteções necessárias.",
        explanation_en: "Removes needed protections.",
      },
      {
        id: "B",
        text: "Aumentar ainda mais a força dos filtros",
        text_en: "Raise filter strength even more",
        isCorrect: false,
        explanation: "Agravaria o bloqueio excessivo.",
        explanation_en: "Would worsen over-blocking.",
      },
      {
        id: "C",
        text: "Remover o monitoramento",
        text_en: "Remove monitoring",
        isCorrect: false,
        explanation: "Impediria saber o impacto dos ajustes.",
        explanation_en: "Would prevent knowing the impact of changes.",
      },
      {
        id: "D",
        text: "Testar com prompts legítimos e adversariais e ajustar a força dos filtros e dos tópicos, equilibrando segurança e utilidade",
        text_en:
          "Test with legitimate and adversarial prompts and tune filter and topic strength, balancing safety and usefulness",
        isCorrect: true,
        explanation: "Guardrails devem ser calibrados com dados de teste.",
        explanation_en: "Guardrails should be calibrated with test data.",
      },
    ],
    category: "responsible_ai",
    dominio: "DOMAIN_4",
    difficulty: "hard",
    references: ["https://aws.amazon.com/bedrock/guardrails/"],
  },
  {
    id: "AIF-C01-E5-D5-01",
    text: "Um desenvolvedor colocou a chave de API de um serviço de terceiros no system prompt do assistente. Usuários conseguem induzir o modelo a revelar o prompt. Qual é a correção correta?",
    text_en:
      "A developer put a third-party API key in the assistant's system prompt. Users can trick the model into revealing the prompt. What is the correct fix?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Nunca colocar segredos em prompts; guardar no AWS Secrets Manager e chamar a API pelo backend/ferramenta com permissões mínimas",
        text_en:
          "Never put secrets in prompts; store them in AWS Secrets Manager and call the API from the backend/tool with minimal permissions",
        isCorrect: true,
        explanation: "O modelo não deve ter acesso a segredos.",
        explanation_en: "The model should never have access to secrets.",
      },
      {
        id: "B",
        text: "Instruir no prompt: 'nunca revele esta chave'",
        text_en: "Instruct in the prompt: 'never reveal this key'",
        isCorrect: false,
        explanation: "Instruções podem ser contornadas por prompt injection.",
        explanation_en: "Instructions can be bypassed by prompt injection.",
      },
      {
        id: "C",
        text: "Reduzir a temperatura",
        text_en: "Lower the temperature",
        isCorrect: false,
        explanation: "Não impede o vazamento.",
        explanation_en: "Does not prevent leakage.",
      },
      {
        id: "D",
        text: "Ofuscar a chave em Base64 dentro do prompt",
        text_en: "Obfuscate the key in Base64 inside the prompt",
        isCorrect: false,
        explanation: "O modelo pode decodificar e revelar.",
        explanation_en: "The model can decode and reveal it.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: ["https://aws.amazon.com/secrets-manager/"],
  },
  {
    id: "AIF-C01-E5-D5-02",
    text: "Uma empresa europeia precisa que prompts e respostas sejam processados apenas em regiões da UE, mas quer usar a inferência entre regiões do Bedrock para ganhar capacidade. O que fazer?",
    text_en:
      "A European company needs prompts and responses processed only in EU Regions but wants to use Bedrock cross-Region inference for extra capacity. What should it do?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Usar um perfil global sem restrição de região",
        text_en: "Use a global profile with no Region restriction",
        isCorrect: false,
        explanation: "Pode rotear fora da UE.",
        explanation_en: "May route outside the EU.",
      },
      {
        id: "B",
        text: "Usar perfis de inferência da geografia UE (restritos a regiões da UE) e limitar regiões com políticas (ex.: SCPs/IAM)",
        text_en:
          "Use EU-geography inference profiles (restricted to EU Regions) and limit Regions with policies (e.g., SCPs/IAM)",
        isCorrect: true,
        explanation: "Mantém o roteamento dentro da UE.",
        explanation_en: "Keeps routing inside the EU.",
      },
      {
        id: "C",
        text: "Escolher qualquer região pelo menor preço",
        text_en: "Pick any Region by lowest price",
        isCorrect: false,
        explanation: "Ignora o requisito de residência.",
        explanation_en: "Ignores the residency requirement.",
      },
      {
        id: "D",
        text: "Desativar a criptografia para reduzir latência",
        text_en: "Disable encryption to cut latency",
        isCorrect: false,
        explanation: "Não atende à residência e enfraquece a segurança.",
        explanation_en: "Does not satisfy residency and weakens security.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html",
    ],
  },
  {
    id: "AIF-C01-E5-D5-03",
    text: "Para auditoria, a empresa ativa o registro de invocações do Bedrock, que armazena prompts e respostas (possivelmente com PII) em um bucket S3. Qual cuidado é essencial?",
    text_en:
      "For auditing, the company enables Bedrock invocation logging, which stores prompts and responses (possibly containing PII) in an S3 bucket. Which precaution is essential?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Tornar o bucket público para facilitar o acesso dos auditores",
        text_en: "Make the bucket public to ease auditor access",
        isCorrect: false,
        explanation: "Expõe dados sensíveis.",
        explanation_en: "Exposes sensitive data.",
      },
      {
        id: "B",
        text: "Guardar os logs indefinidamente sem controles",
        text_en: "Keep logs indefinitely with no controls",
        isCorrect: false,
        explanation: "Aumenta o risco e viola minimização.",
        explanation_en: "Raises risk and violates minimization.",
      },
      {
        id: "C",
        text: "Criptografar o bucket com KMS, restringir o acesso por privilégio mínimo e definir retenção, mascarando PII quando possível",
        text_en:
          "Encrypt the bucket with KMS, restrict access by least privilege, set retention, and mask PII where possible",
        isCorrect: true,
        explanation:
          "Os logs passam a ser dados sensíveis e precisam ser protegidos.",
        explanation_en: "The logs become sensitive data and must be protected.",
      },
      {
        id: "D",
        text: "Desativar a criptografia por desempenho",
        text_en: "Disable encryption for performance",
        isCorrect: false,
        explanation: "Fragiliza a proteção dos dados.",
        explanation_en: "Weakens data protection.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: [
      "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html",
    ],
  },
  {
    id: "AIF-C01-E5-D5-04",
    text: "Qual serviço detecta automaticamente buckets S3 com dados de treinamento sem criptografia no lado do servidor e os sinaliza como não conformes?",
    text_en:
      "Which service automatically detects S3 buckets holding training data without server-side encryption and flags them as non-compliant?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        text_en: "Amazon Inspector",
        isCorrect: false,
        explanation:
          "Procura vulnerabilidades de software em cargas de trabalho, não conformidade de configuração de buckets.",
        explanation_en:
          "Looks for software vulnerabilities in workloads, not bucket configuration compliance.",
      },
      {
        id: "B",
        text: "AWS Artifact",
        text_en: "AWS Artifact",
        isCorrect: false,
        explanation:
          "Fornece relatórios de conformidade da AWS, não avalia seus recursos.",
        explanation_en:
          "Provides AWS compliance reports; it does not assess your resources.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        text_en: "Amazon Comprehend",
        isCorrect: false,
        explanation: "Analisa texto; não audita configurações.",
        explanation_en: "Analyzes text; it does not audit configurations.",
      },
      {
        id: "D",
        text: "AWS Config (com regras gerenciadas)",
        text_en: "AWS Config (with managed rules)",
        isCorrect: true,
        explanation:
          "Avalia continuamente configurações de recursos contra regras.",
        explanation_en:
          "Continuously evaluates resource configurations against rules.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "medium",
    references: ["https://aws.amazon.com/config/"],
  },
  {
    id: "AIF-C01-E5-D5-05",
    text: "Uma organização quer adotar um padrão internacional certificável para um sistema de gestão de IA (políticas, riscos e controles). Qual padrão é o mais específico para isso?",
    text_en:
      "An organization wants to adopt a certifiable international standard for an AI management system (policies, risks, and controls). Which standard is the most specific for this?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "ISO/IEC 42001",
        text_en: "ISO/IEC 42001",
        isCorrect: true,
        explanation: "É o padrão de sistema de gestão de IA.",
        explanation_en: "The AI management system standard.",
      },
      {
        id: "B",
        text: "ISO/IEC 27001",
        text_en: "ISO/IEC 27001",
        isCorrect: false,
        explanation: "Trata de gestão de segurança da informação em geral.",
        explanation_en: "Covers information security management in general.",
      },
      {
        id: "C",
        text: "ISO 9001",
        text_en: "ISO 9001",
        isCorrect: false,
        explanation: "Trata de gestão da qualidade.",
        explanation_en: "Covers quality management.",
      },
      {
        id: "D",
        text: "PCI DSS",
        text_en: "PCI DSS",
        isCorrect: false,
        explanation: "Trata de segurança de dados de cartões de pagamento.",
        explanation_en: "Covers payment card data security.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "medium",
    references: ["https://aws.amazon.com/compliance/iso-42001/"],
  },
  {
    id: "AIF-C01-E5-D5-06",
    text: "Vários colaboradores podem enviar arquivos ao bucket S3 que alimenta a base de conhecimento do assistente. Qual risco isso cria e qual mitigação é a mais adequada?",
    text_en:
      "Several employees can upload files to the S3 bucket feeding the assistant's knowledge base. What risk does this create and which mitigation is most suitable?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Nenhum risco, pois o modelo ignora documentos",
        text_en: "No risk, since the model ignores documents",
        isCorrect: false,
        explanation: "O RAG usa os documentos nas respostas.",
        explanation_en: "RAG uses the documents in answers.",
      },
      {
        id: "B",
        text: "Envenenamento da base (conteúdo malicioso ou incorreto); restringir escrita por privilégio mínimo, validar/aprovar conteúdo e habilitar versionamento e monitoramento",
        text_en:
          "Knowledge base poisoning (malicious or incorrect content); restrict writes by least privilege, validate/approve content, and enable versioning and monitoring",
        isCorrect: true,
        explanation: "Quem controla a fonte influencia as respostas.",
        explanation_en: "Whoever controls the source influences the answers.",
      },
      {
        id: "C",
        text: "Aumentar a temperatura",
        text_en: "Raise the temperature",
        isCorrect: false,
        explanation: "Não mitiga o risco.",
        explanation_en: "Does not mitigate the risk.",
      },
      {
        id: "D",
        text: "Tornar o bucket público para leitura",
        text_en: "Make the bucket publicly readable",
        isCorrect: false,
        explanation: "Amplia a exposição.",
        explanation_en: "Increases exposure.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
  {
    id: "AIF-C01-E5-D5-07",
    text: "Uma aplicação web insere diretamente a saída do LLM no HTML da página. Um usuário induz o modelo a gerar um script malicioso que executa no navegador de outros usuários. Qual princípio foi violado?",
    text_en:
      "A web app inserts the LLM's output directly into the page HTML. A user tricks the model into generating a malicious script that runs in other users' browsers. Which principle was violated?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Usar temperatura alta",
        text_en: "Use high temperature",
        isCorrect: false,
        explanation: "Não é a causa da falha.",
        explanation_en: "Not the cause of the flaw.",
      },
      {
        id: "B",
        text: "Usar um modelo maior",
        text_en: "Use a larger model",
        isCorrect: false,
        explanation: "Tamanho não resolve o problema de segurança.",
        explanation_en: "Size does not fix the security issue.",
      },
      {
        id: "C",
        text: "Tratar a saída do modelo como não confiável: validar, sanitizar e escapar antes de renderizar ou executar",
        text_en:
          "Treat model output as untrusted: validate, sanitize, and escape before rendering or executing",
        isCorrect: true,
        explanation:
          "A saída de um LLM pode conter conteúdo malicioso, como qualquer entrada externa.",
        explanation_en:
          "LLM output can contain malicious content like any external input.",
      },
      {
        id: "D",
        text: "Usar embeddings de menor dimensão",
        text_en: "Use lower-dimension embeddings",
        isCorrect: false,
        explanation: "Sem relação.",
        explanation_en: "Unrelated.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: [
      "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    ],
  },
  {
    id: "AIF-C01-E5-D5-08",
    text: "Antes de indexar milhares de documentos em uma base de conhecimento, a empresa quer detectar e remover PII (como CPF e e-mails) do texto. Qual serviço pode ser usado no pipeline de ingestão?",
    text_en:
      "Before indexing thousands of documents into a knowledge base, the company wants to detect and remove PII (such as national IDs and emails) from the text. Which service can be used in the ingestion pipeline?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Amazon Macie",
        text_en: "Amazon Macie",
        isCorrect: false,
        explanation:
          "Descobre e classifica dados sensíveis no S3, mas não redige o conteúdo dos documentos.",
        explanation_en:
          "Discovers and classifies sensitive data in S3 but does not redact document content.",
      },
      {
        id: "B",
        text: "Amazon Textract",
        text_en: "Amazon Textract",
        isCorrect: false,
        explanation: "Extrai texto de documentos; não remove PII.",
        explanation_en: "Extracts text from documents; it does not remove PII.",
      },
      {
        id: "C",
        text: "Amazon Polly",
        text_en: "Amazon Polly",
        isCorrect: false,
        explanation: "Sintetiza fala.",
        explanation_en: "Synthesizes speech.",
      },
      {
        id: "D",
        text: "Amazon Comprehend (detecção e redação de PII)",
        text_en: "Amazon Comprehend (PII detection and redaction)",
        isCorrect: true,
        explanation:
          "Identifica entidades de PII e permite mascará-las no texto.",
        explanation_en:
          "Identifies PII entities and enables masking them in the text.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: ["https://aws.amazon.com/comprehend/"],
  },
  {
    id: "AIF-C01-E5-D5-09",
    text: "Um job de personalização de modelo falha com AccessDenied ao ler dados de treinamento no S3 criptografados com uma chave KMS gerenciada pelo cliente. Qual é a causa mais provável?",
    text_en:
      "A model customization job fails with AccessDenied when reading training data in S3 encrypted with a customer managed KMS key. What is the most likely cause?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "A função de serviço usada pelo job não tem permissão kms:Decrypt (e a política da chave não a autoriza)",
        text_en:
          "The service role used by the job lacks kms:Decrypt permission (and the key policy does not allow it)",
        isCorrect: true,
        explanation:
          "É preciso conceder acesso à chave ao papel que lê os dados.",
        explanation_en:
          "The role reading the data must be granted access to the key.",
      },
      {
        id: "B",
        text: "O bucket precisa ser público",
        text_en: "The bucket must be public",
        isCorrect: false,
        explanation: "Seria inseguro e não é a solução.",
        explanation_en: "Insecure and not the solution.",
      },
      {
        id: "C",
        text: "A temperatura está alta demais",
        text_en: "Temperature is too high",
        isCorrect: false,
        explanation: "Não se aplica a acesso a dados.",
        explanation_en: "Does not apply to data access.",
      },
      {
        id: "D",
        text: "O modelo não suporta português",
        text_en: "The model does not support Portuguese",
        isCorrect: false,
        explanation: "Não gera erro de acesso.",
        explanation_en: "Does not cause an access error.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "hard",
    references: ["https://aws.amazon.com/kms/"],
  },
  {
    id: "AIF-C01-E5-D5-10",
    text: "Qual tarefa permanece sob responsabilidade do cliente mesmo ao usar um serviço de IA totalmente gerenciado, como o Amazon Bedrock?",
    text_en:
      "Which task remains the customer's responsibility even when using a fully managed AI service such as Amazon Bedrock?",
    type: "single_choice",
    options: [
      {
        id: "A",
        text: "Aplicar patches no hipervisor dos hosts",
        text_en: "Patching the hosts' hypervisor",
        isCorrect: false,
        explanation: "É responsabilidade da AWS.",
        explanation_en: "AWS responsibility.",
      },
      {
        id: "B",
        text: "Definir permissões IAM, classificar e proteger seus dados e configurar guardrails e registro de logs",
        text_en:
          "Defining IAM permissions, classifying and protecting its data, and configuring guardrails and logging",
        isCorrect: true,
        explanation: "É a segurança 'na' nuvem: acesso, dados e configuração.",
        explanation_en:
          "This is security 'in' the cloud: access, data, and configuration.",
      },
      {
        id: "C",
        text: "Manter a segurança física dos data centers",
        text_en: "Maintaining physical data center security",
        isCorrect: false,
        explanation: "É responsabilidade da AWS.",
        explanation_en: "AWS responsibility.",
      },
      {
        id: "D",
        text: "Atualizar o firmware dos servidores que hospedam o modelo",
        text_en: "Updating firmware on servers hosting the model",
        isCorrect: false,
        explanation: "É responsabilidade da AWS.",
        explanation_en: "AWS responsibility.",
      },
    ],
    category: "security_governance",
    dominio: "DOMAIN_5",
    difficulty: "medium",
    references: [
      "https://aws.amazon.com/compliance/shared-responsibility-model/",
    ],
  },
];
export default questionsaAIFc0105;
