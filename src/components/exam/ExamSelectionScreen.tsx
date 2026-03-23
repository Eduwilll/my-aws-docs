import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Check, Target, Timer } from "lucide-react";
import type { StudyMode, ExamCategory } from "@/lib/types/questions";
import type { ExamDomainKey } from "@/lib/types/exam-domains";
import {
  getExamSourceInfo,
  getSourceLabel,
  getSourceColor,
} from "@/lib/utils/examSources";
import { questionBankEstimates } from "@/lib/utils/questionLoader";
import { Badge as UBadge } from "@/components/ui/badge";
import TermsNavigationLinks from "@/components/TermsNavigationLinks";
import { hasValidConsent } from "@/lib/terms";

interface CertificationOption {
  id: string;
  title: string;
  img: string;
}

interface ExamSelectionScreenProps {
  certifications: CertificationOption[];
  certificationBanks: Record<string, string[]>;
  selectedCertification: string;
  selectedExamId: string;
  studyMode: StudyMode;
  selectedDomains: ExamDomainKey[];
  selectedCategories: ExamCategory[];
  checkingTerms: boolean;
  termsAccepted: boolean;
  isLoadingQuestions: boolean;
  onSelectCertification: (certId: string) => void;
  onSelectStudyMode: (mode: StudyMode) => void;
  onSelectBank: (bankId: string) => void;
  onAddDomain: (domain: ExamDomainKey) => void;
  onRemoveDomain: (domain: ExamDomainKey) => void;
  onAddCategory: (category: ExamCategory) => void;
  onRemoveCategory: (category: ExamCategory) => void;
  onStartExam: () => void;
  onRecheckTerms: () => void;
  getDomainName: (examId: string, domain: string) => string;
}

export function ExamSelectionScreen({
  certifications,
  certificationBanks,
  selectedCertification,
  selectedExamId,
  studyMode,
  selectedDomains,
  selectedCategories,
  checkingTerms,
  termsAccepted,
  isLoadingQuestions,
  onSelectCertification,
  onSelectStudyMode,
  onSelectBank,
  onAddDomain,
  onRemoveDomain,
  onAddCategory,
  onRemoveCategory,
  onStartExam,
  onRecheckTerms,
  getDomainName,
}: ExamSelectionScreenProps) {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          Bem-vindo ao Simulador de Exame da AWS
        </h2>
        <p className="text-gray-500">
          Escolha seu modo de estudo e comece a praticar
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Step 1: Certification Selection */}
        <div className="space-y-4">
          <label className="text-xl font-semibold flex items-center gap-2">
            <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            Selecione a Certificação
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const availableBanks = certificationBanks[cert.id] || [];
              const totalQuestions =
                questionBankEstimates[`${cert.id}-FULL`] || 0;
              const isAvailable = availableBanks.length > 0;
              const isSelected = selectedCertification === cert.id;

              return (
                <div
                  key={cert.id}
                  onClick={() => isAvailable && onSelectCertification(cert.id)}
                  className={`relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center gap-4 ${
                    !isAvailable
                      ? "opacity-60 cursor-not-allowed bg-muted border-border grayscale-[0.5]"
                      : isSelected
                        ? "border-primary bg-primary/5 dark:bg-primary/20 shadow-xl shadow-primary/10 scale-105"
                        : "border-border hover:border-primary/40 hover:shadow-lg cursor-pointer bg-card"
                  }`}
                >
                  {!isAvailable && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      Em Breve
                    </span>
                  )}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="h-32 flex items-center justify-center">
                    <img
                      src={cert.img}
                      alt={cert.title}
                      className="max-w-full max-h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      {isAvailable
                        ? `${totalQuestions} questões disponíveis`
                        : "Sem questões ainda"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Study Mode */}
        {selectedCertification && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <label className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              Modo de Estudo
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "practice" as StudyMode,
                  icon: BookOpen,
                  title: "Prática",
                  desc: "Feedback detalhado, explicações e respostas logo após cada questão.",
                },
                {
                  id: "exam" as StudyMode,
                  icon: Timer,
                  title: "Exame Simulado",
                  desc: "Ambiente realista. Tempo cronometrado e nota final apenas no encerramento.",
                },
                {
                  id: "domain_focus" as StudyMode,
                  icon: Target,
                  title: "Foco Direcionado",
                  desc: "Foque nos seus pontos fracos escolhendo domínios ou categorias específicas.",
                },
              ].map(({ id, icon: Icon, title, desc }) => (
                <div
                  key={id}
                  onClick={() => onSelectStudyMode(id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    studyMode === id
                      ? "border-primary bg-primary/5 dark:bg-primary/20 shadow-md scale-[1.02]"
                      : "border-border hover:border-primary/40 bg-card hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg ${studyMode === id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-foreground">{title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Bank Selection (practice/exam modes only) */}
        {studyMode && studyMode !== "domain_focus" && selectedCertification && (
          <div className="space-y-4 animate-in fade-in duration-500 delay-150">
            <label className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              Escolha o Banco de Questões
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificationBanks[selectedCertification]
                .filter((bankId) => {
                  if (studyMode === "exam") {
                    return (questionBankEstimates[bankId] || 0) <= 100;
                  }
                  return true;
                })
                .map((bankId) => {
                  const sourceInfo = getExamSourceInfo(bankId);
                  const isSelected = selectedExamId === bankId;
                  return (
                    <div
                      key={bankId}
                      onClick={() => onSelectBank(bankId)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 dark:bg-primary/20 shadow-md scale-[1.01]"
                          : "border-border hover:border-primary/40 bg-card hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-foreground text-sm pr-4">
                          {sourceInfo.name}
                        </h4>
                        {isSelected && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
                        {sourceInfo.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">
                          {questionBankEstimates[bankId] || 0} questões
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${getSourceColor(sourceInfo.primarySource)}`}
                        >
                          {getSourceLabel(sourceInfo.primarySource)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Step 3 (domain_focus): Domain/Category filters */}
        {studyMode === "domain_focus" && selectedCertification && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <label className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              Filtros de Domínio e Categoria
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Domain filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Domínios</label>
                <Select
                  onValueChange={(value: ExamDomainKey) =>
                    !selectedDomains.includes(value) && onAddDomain(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Adicionar domínio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOMAIN_1">Conceitos de Nuvem</SelectItem>
                    <SelectItem value="DOMAIN_2">
                      Segurança e Conformidade
                    </SelectItem>
                    <SelectItem value="DOMAIN_3">Tecnologia</SelectItem>
                    <SelectItem value="DOMAIN_4">
                      Faturamento e Preços
                    </SelectItem>
                  </SelectContent>
                </Select>
                {selectedDomains.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedDomains.map((domain) => (
                      <Badge
                        key={domain}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => onRemoveDomain(domain)}
                      >
                        {getDomainName(
                          selectedCertification || "CLF-C02",
                          domain,
                        )}{" "}
                        ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Category filter */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Categorias</label>
                <Select
                  onValueChange={(value: ExamCategory) =>
                    !selectedCategories.includes(value) && onAddCategory(value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Adicionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud_concepts">
                      Conceitos de Nuvem
                    </SelectItem>
                    <SelectItem value="security">Segurança</SelectItem>
                    <SelectItem value="technology">Tecnologia</SelectItem>
                    <SelectItem value="billing">Faturamento</SelectItem>
                    <SelectItem value="compute">Computação</SelectItem>
                    <SelectItem value="storage">Armazenamento</SelectItem>
                    <SelectItem value="networking">Redes</SelectItem>
                    <SelectItem value="database">Banco de Dados</SelectItem>
                  </SelectContent>
                </Select>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => onRemoveCategory(category)}
                      >
                        {category} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Terms warning */}
        {!checkingTerms && !termsAccepted && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <svg
                className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">
                  Termos de Serviço Requeridos
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Você deve aceitar nossos Termos de Serviço antes de iniciar o
                  exame.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <TermsNavigationLinks
                    variant="inline"
                    className="text-sm text-yellow-800 hover:text-yellow-900"
                  />
                  <button
                    onClick={onRecheckTerms}
                    className="text-xs text-yellow-800 hover:text-yellow-900 underline text-left"
                    disabled={checkingTerms}
                  >
                    {checkingTerms ? "Verificando..." : "Verificar novamente"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Start button */}
        <Button
          onClick={onStartExam}
          disabled={
            !selectedCertification ||
            checkingTerms ||
            !termsAccepted ||
            (studyMode !== "domain_focus" && !selectedExamId) ||
            isLoadingQuestions
          }
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          {isLoadingQuestions && "Carregando questões..."}
          {!isLoadingQuestions && checkingTerms && "Verificando Termos..."}
          {!isLoadingQuestions &&
            !checkingTerms &&
            !termsAccepted &&
            "Aceite os Termos para Continuar"}
          {!isLoadingQuestions &&
            !checkingTerms &&
            termsAccepted &&
            studyMode === "practice" &&
            "Iniciar Modo de Prática"}
          {!isLoadingQuestions &&
            !checkingTerms &&
            termsAccepted &&
            studyMode === "exam" &&
            "Iniciar Exame Simulado"}
          {!isLoadingQuestions &&
            !checkingTerms &&
            termsAccepted &&
            studyMode === "domain_focus" &&
            "Iniciar Estudo Focado"}
        </Button>
      </div>
    </div>
  );
}
