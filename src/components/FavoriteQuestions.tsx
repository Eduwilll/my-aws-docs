import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Star,
  Trash2,
  Edit3,
  Save,
  X,
  BookOpen,
  Calendar,
  Eye,
} from "lucide-react";
import type { FavoriteQuestion, Question } from "@/lib/types/questions";

interface FavoriteQuestionsProps {
  favoriteQuestions: FavoriteQuestion[];
  questions: Question[];
  onRemoveFavorite: (questionId: string) => void;
  onUpdateFavorite: (questionId: string, notes?: string) => void;
  onViewQuestion: (question: Question) => void;
}

export const FavoriteQuestions: React.FC<FavoriteQuestionsProps> = ({
  favoriteQuestions,
  questions,
  onRemoveFavorite,
  onUpdateFavorite,
  onViewQuestion,
}) => {
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const getQuestionById = (questionId: string): Question | undefined => {
    return questions.find((q) => q.id === questionId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const handleEditNotes = (favorite: FavoriteQuestion) => {
    setEditingNotes(favorite.questionId);
    setNoteText(favorite.notes || "");
  };

  const handleSaveNotes = (questionId: string) => {
    onUpdateFavorite(questionId, noteText);
    setEditingNotes(null);
    setNoteText("");
  };

  const handleCancelEdit = () => {
    setEditingNotes(null);
    setNoteText("");
  };

  if (favoriteQuestions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Questões Favoritas
          </CardTitle>
          <CardDescription>Suas questões marcadas para revisão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Nenhuma questão favorita ainda</p>
            <p className="text-sm text-gray-400">
              Marque questões durante os exames para revisá-las depois
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Questões Favoritas ({favoriteQuestions.length})
        </CardTitle>
        <CardDescription>Suas questões marcadas para revisão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favoriteQuestions
            .sort((a, b) => b.markedAt.getTime() - a.markedAt.getTime())
            .map((favorite) => {
              const question = getQuestionById(favorite.questionId);
              if (!question) return null;

              const isEditing = editingNotes === favorite.questionId;

              return (
                <div
                  key={favorite.questionId}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{question.id}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {question.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {favorite.examId}
                        </Badge>
                      </div>

                      <p className="text-sm font-medium line-clamp-2">
                        {question.text}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Marcada em {formatDate(favorite.markedAt)}
                        </span>
                        {favorite.reviewCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Revisada {favorite.reviewCount}x
                          </span>
                        )}
                        {favorite.lastReviewed && (
                          <span>
                            Última revisão: {formatDate(favorite.lastReviewed)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewQuestion(question)}
                        title="Ver questão completa"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFavorite(favorite.questionId)}
                        title="Remover dos favoritos"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Notas:</span>
                      {!isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditNotes(favorite)}
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          {favorite.notes ? "Editar" : "Adicionar"}
                        </Button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2">
                        <Textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Adicione suas notas sobre esta questão..."
                          className="min-h-[80px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveNotes(favorite.questionId)}
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Salvar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                        {favorite.notes || "Nenhuma nota adicionada"}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
