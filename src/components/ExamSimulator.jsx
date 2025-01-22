import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Book, CheckCircle, XCircle } from 'lucide-react';

const ExamSimulator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

  // Sample questions - você precisará expandir isso com seu próprio banco de questões
  const questions = [
    {
      category: "Cloud Concepts",
      question: "Qual é o benefício do modelo de preço pay-as-you-go da AWS?",
      options: [
        "Você paga um valor fixo mensal",
        "Você paga apenas pelos recursos que utiliza",
        "Você precisa fazer um compromisso de longo prazo",
        "Você recebe todos os serviços gratuitamente"
      ],
      correct: 1,
      explanation: "O modelo pay-as-you-go permite que você pague apenas pelos recursos que utiliza, sem compromissos de longo prazo."
    },
    {
      category: "Billing",
      question: "O que é o AWS Free Tier?",
      options: [
        "Um nível de serviço que é sempre gratuito",
        "Uma oferta que permite testar serviços AWS gratuitamente com certas limitações",
        "Um desconto para startups",
        "Um plano de pagamento mensal"
      ],
      correct: 1,
      explanation: "O AWS Free Tier permite que novos usuários testem serviços AWS gratuitamente dentro de certos limites."
    }
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerStatus(null);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
      setIsActive(false);
    }
  };

  const startExam = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(90 * 60);
    setSelectedAnswer(null);
  };
  const getButtonVariant = (index) => {
    if (selectedAnswer === null) return "outline";
    if (index === questions[currentQuestion].correct && showExplanation) return "success";
    if (selectedAnswer === index) {
      return answerStatus === 'correct' ? "success" : "destructive";
    }
    return "outline";
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>AWS Cloud Practitioner Simulator</span>
            {isActive && (
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isActive && !showScore && (
            <div className="text-center">
              <h2 className="text-xl mb-4">Bem-vindo ao Simulador CLF-C02</h2>
              <Button onClick={startExam}>Iniciar Simulado</Button>
            </div>
          )}

          {isActive && !showScore && (
            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
                <Progress value={(currentQuestion + 1) * 100 / questions.length} className="mt-2" />
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600">
                  {questions[currentQuestion].category}
                </span>
                <h3 className="text-lg font-medium mt-2">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="space-y-3 mt-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={getButtonVariant(index)}
                    className="w-full justify-start text-left"
                    onClick={() => !showExplanation && handleAnswerSubmit(index)}
                    disabled={showExplanation}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                  <p className="font-medium mb-2">
                    {answerStatus === 'correct' ? '✅ Correto!' : '❌ Incorreto!'}
                  </p>
                  <p className="text-sm text-gray-800">
                    {questions[currentQuestion].explanation}
                  </p>
                  {selectedAnswer !== null && (
                <div className="mt-4">
                  <Button onClick={handleNextQuestion}>
                    {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                  </Button>
                </div>
              )}
                </div>
              )}

             
            </div>
          )}

          {showScore && (
            <div className="text-center">
              <h2 className="text-2xl mb-4">Resultado do Simulado</h2>
              <p className="text-xl mb-4">
                Você acertou {score} de {questions.length} questões
                ({Math.round((score / questions.length) * 100)}%)
              </p>
              <Button onClick={startExam}>Tentar Novamente</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamSimulator;