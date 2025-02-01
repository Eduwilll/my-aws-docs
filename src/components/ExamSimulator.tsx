import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, Check } from 'lucide-react';
import { questions } from '@/data/questions-clf-c02';

const ExamSimulator = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | 'partial' | null>(null);
  const [endMessage, setEndMessage] = useState<string | null>(null);

  // Get current question data
  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = currentQuestion.options;
  const correctOptions = currentOptions.filter(option => option.isCorrect);
  const incorrectOptions = currentOptions.filter(option => !option.isCorrect);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval!);
      setShowScore(true);
      setEndMessage('O tempo acabou! Sua prova foi finalizada automaticamente.');
    }
    return () => clearInterval(interval!);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerToggle = (answerId: string) => {
    setSelectedAnswers(prev => {
      if (prev.includes(answerId)) {
        return prev.filter(id => id !== answerId);
      } else {
        return [...prev, answerId];
      }
    });
  };

  const handleSubmitAnswers = () => {
    const correctAnswerIds = currentOptions
      .filter(option => option.isCorrect)
      .map(option => option.id);

    // Check if all selected answers are correct and all correct answers are selected
    const isFullyCorrect = selectedAnswers.length === correctAnswerIds.length &&
      selectedAnswers.every(id => correctAnswerIds.includes(id));

    // Check if some answers are correct but not all
    const hasPartialCorrect = selectedAnswers.some(id => correctAnswerIds.includes(id)) &&
      !isFullyCorrect;

    if (isFullyCorrect) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else if (hasPartialCorrect) {
      setScore(score + 0.5);
      setAnswerStatus('partial');
    } else {
      setAnswerStatus('incorrect');
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerStatus(null);
    setSelectedAnswers([]);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
      setIsActive(false);
      setEndMessage('Parabéns! Você finalizou a prova.');
    }
  };

  const getButtonVariant = (optionId: string) => {
    const isSelected = selectedAnswers.includes(optionId);
    const isCorrect = currentOptions.find(option => option.id === optionId)?.isCorrect;

    if (!showExplanation) {
      return isSelected ? "default" : "outline";
    } else {
      if (isCorrect) {
        return "success";
      } else if (isSelected && !isCorrect) {
        return "destructive";
      } else {
        return "outline";
      }
    }
  };

  const startExam = () => {
    setIsActive(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(90 * 60);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setEndMessage(null);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
                  Questão {currentQuestionIndex + 1} de {questions.length}
                </span>
                <CardDescription>
                  Progress: {Math.round(progress)}%
                </CardDescription>
                <Progress value={progress} className="mt-2" />
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600">
                  {currentQuestion.category}, ID: {currentQuestion.id}
                </span>
                <h3 className="text-lg font-medium mt-2">
                  {currentQuestion.text}
                </h3>
                {currentQuestion.type === 'multiple_choice' && (
                  <p className="text-sm text-gray-500 mt-1">
                    (Selecione todas as opções corretas)
                  </p>
                )}
              </div>

              <div className="space-y-3 mt-4">
                {currentOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50"
                  >
                    {currentQuestion.type === 'multiple_choice' ? (
                      <Button
                        variant={getButtonVariant(option.id)}
                        className="w-full justify-start text-left"
                        onClick={() => !showExplanation && handleAnswerToggle(option.id)}
                        disabled={showExplanation}
                      >
                        {option.text}
                      </Button>
                    ) : (
                      <Button
                        variant={getButtonVariant(option.id)}
                        className="w-full justify-start text-left"
                        onClick={() => !showExplanation && setSelectedAnswers([option.id])}
                        disabled={showExplanation}
                      >
                        {option.text}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {!showExplanation && selectedAnswers.length > 0 && (
                <Button
                  className="mt-4"
                  onClick={handleSubmitAnswers}
                >
                  Verificar Resposta
                </Button>
              )}

              {showExplanation && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                  <p className="font-medium mb-2">
                    {answerStatus === 'correct' && '✅ Correto!'}
                    {answerStatus === 'partial' && '⚠️ Parcialmente Correto!'}
                    {answerStatus === 'incorrect' && '❌ Incorreto!'}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-green-600 font-bold mb-2">Respostas Corretas:</h3>
                      <ul className="space-y-2">
                        {correctOptions.map(option => (
                          <li key={option.id} className="flex items-start">
                            <Check className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                            <div>
                              <strong>{option.text}</strong>
                              <p className="text-sm text-gray-700">{option.explanation}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-red-600 font-bold mb-2">Explicação das outras opções:</h3>
                      <ul className="space-y-2">
                        {incorrectOptions.map(option => (
                          <li key={option.id}>
                            <strong>{option.text}:</strong>
                            <p className="text-sm text-gray-700">{option.explanation}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Referências:</h4>
                    <ul className="space-y-1">
                      {currentQuestion.references.map((reference, index) => (
                        <li key={index}>
                          <a
                            href={reference}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {reference}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={handleNextQuestion} className="mt-4">
                    {currentQuestionIndex === questions.length - 1 ? "Finalizar" : "Próxima"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {showScore && (
            <div className="text-center">
              <h2 className="text-2xl mb-4">Resultado do Simulado</h2>
              {endMessage && (
                <p className="text-lg text-gray-700 mb-4">{endMessage}</p>
              )}
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