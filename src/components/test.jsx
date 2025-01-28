import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';

const ExamSimulator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);

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
    setSelectedAnswer(null);
    setAnswerStatus(null);
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      setIsActive(false);
    }
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
            <Button 
              className="w-full" 
              onClick={() => setIsActive(true)}
            >
              Começar Simulado
            </Button>
          )}
          
          {isActive && !showScore && (
            <div>
              <h3 className="text-lg font-medium mt-2">
                {questions[currentQuestion].question}
              </h3>
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
                  <Button 
                    className="mt-4"
                    onClick={handleNextQuestion}
                  >
                    Próxima Questão
                  </Button>
                </div>
              )}
            </div>
          )}

          {showScore && (
            <div className="text-center">
              <h3 className="text-xl font-medium">Simulado Finalizado!</h3>
              <p className="mt-2">
                Sua pontuação: {score} de {questions.length}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamSimulator;