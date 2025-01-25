import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';
import { questions } from '@/data/questions'; // Importe as questões
import type { Question, ExamCategory } from '@/lib/types/questions'; // Importe os tipos

const ExamSimulator = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [endMessage, setEndMessage] = useState<string | null>(null); // Estado para a mensagem de finalização
  const currentOptions = questions[currentQuestion].options;

  // Encontrando a opção correta
  const correctOption = currentOptions.find(option => option.isCorrect);

  // Filtrando as opções incorretas
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
      setEndMessage('O tempo acabou! Sua prova foi finalizada automaticamente.'); // Mensagem quando o tempo acaba
    }
    return () => clearInterval(interval!);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = (answerId: string) => {
    setSelectedAnswer(answerId);
    const isCorrect = questions[currentQuestion].options.find(option => option.id === answerId)?.isCorrect;
    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
    setShowExplanation(true);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setAnswerStatus(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
      setIsActive(false);
      setEndMessage('Parabéns! Você finalizou a prova.'); // Mensagem quando o usuário finaliza a prova
    }
  };

  const startExam = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimeLeft(90 * 60);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setEndMessage(null);
  };

  const getButtonVariant = (optionId: string) => {
    if (selectedAnswer === null) return 'outline';
    if (optionId === questions[currentQuestion].options.find((option) => option.isCorrect)?.id && showExplanation)
      return 'default'; // Mapeie "success" para "default"
    if (selectedAnswer === optionId) {
      return answerStatus === 'correct' ? 'default' : 'destructive';
    }
    return 'outline';
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
                  {questions[currentQuestion].text}
                </h3>
              </div>

              <div className="space-y-3 mt-4">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.id}
                    variant={getButtonVariant(option.id)}
                    className="w-full justify-start text-left"
                    onClick={() => !showExplanation && handleAnswerSubmit(option.id)}
                    disabled={showExplanation}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
                  <p className="font-medium mb-2">
                    {answerStatus === 'correct' ? '✅ Correto!' : '❌ Incorreto!'}
                  </p>
                  <p className="text-sm text-gray-800 mb-4">
                    <h3 className="text-green-600 font-bold">Resposta Correta:</h3>
                    <div className=" outline-8 divide-y divide-solid divide-gray-800 divide-1">
                      <div>
                        <ul>
                        <li><strong>{correctOption?.text}</strong>: {correctOption?.explanation}</li>

                        </ul>
                      </div>
                      <div>
                        <ul>
                        {incorrectOptions.map(option => (
                          <li key={option.id}>
                            <strong>{option.text}:</strong> {option.explanation}
                          </li>
                        ))}
                        </ul>
                       
                      </div>
                    </div>
                  </p>

                  {/* Adicionar as referências como links */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Referências:</h4>
                    <ul className="space-y-1">
                      {questions[currentQuestion].references.map((reference, index) => (
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
              {/* Exibir a mensagem de finalização */}
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