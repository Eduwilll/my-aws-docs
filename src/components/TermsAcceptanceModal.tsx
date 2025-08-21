import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import "../styles/terms-accessibility.css";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  TermsContentManager,
  ConsentValidator,
  ConsentManager,
} from "../lib/terms";
import type {
  UserTermsAcceptance,
  TermsConfig,
  TermsContent,
} from "../lib/types/terms";
import { ConsentType, AcceptanceStatus } from "../lib/types/terms";

interface TermsAcceptanceModalProps {
  isOpen: boolean;
  onAccept: (acceptance: UserTermsAcceptance) => void;
  onDecline: () => void;
  config: TermsConfig;
  showChanges?: boolean;
  previousVersion?: string;
}

export function TermsAcceptanceModal({
  isOpen,
  onAccept,
  onDecline,
  config,
  showChanges = false,
  previousVersion,
}: TermsAcceptanceModalProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsContent, setTermsContent] = useState<TermsContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);

  // Load terms content on mount
  useEffect(() => {
    try {
      const content = TermsContentManager.getCurrentContent();
      setTermsContent(content);
    } catch (err) {
      setError("Erro ao carregar os termos de serviço");
      console.error("Failed to load terms content:", err);
    }
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setHasAccepted(false);
      setError(null);
    }
  }, [isOpen]);

  const handleAccept = async () => {
    if (!hasAccepted || !termsContent) return;

    setIsLoading(true);
    setError(null);
    setShowRetryButton(false);

    try {
      const consentManager = new ConsentManager(config);
      const consentType = previousVersion
        ? ConsentType.UPDATE
        : ConsentType.INITIAL;

      const result = await consentManager.recordAcceptance(
        config.currentVersion,
        consentType,
        {
          userAgent: navigator.userAgent,
        },
      );

      if (result.success && result.acceptance) {
        const acceptance = result.acceptance;
        setRetryCount(0);
        // Add a small delay to ensure UI updates properly
        setTimeout(() => {
          onAccept(acceptance);
        }, 100);
      } else {
        const errorMessage = result.error?.userFriendly
          ? result.error.message
          : "Erro ao registrar aceitação dos termos";

        setError(errorMessage);
        setShowRetryButton(result.error?.retryable !== false); // Default to retryable

        // Log technical details for debugging
        if (result.error?.technicalMessage) {
          console.error(
            "Terms acceptance error:",
            result.error.technicalMessage,
            result.error.details,
          );
        }
      }
    } catch (err) {
      setError("Erro inesperado ao processar aceitação. Tente novamente.");
      setShowRetryButton(true);
      console.error("Failed to record acceptance:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setError(null);
    setShowRetryButton(false);

    // Add a small delay before retrying
    setTimeout(() => {
      handleAccept();
    }, 500);
  };

  const handleDecline = () => {
    setHasAccepted(false);
    // Show a brief message before redirecting
    console.log("User declined terms, will redirect to home page");
    onDecline();
  };

  if (!termsContent) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleDecline();
        }}
      >
        <DialogContent
          className="max-w-2xl max-h-[80vh]"
          aria-labelledby="loading-title"
          aria-describedby="loading-description"
        >
          <DialogHeader>
            <DialogTitle id="loading-title">Carregando...</DialogTitle>
            <DialogDescription id="loading-description">
              Carregando os termos de serviço...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  const isUpdate = Boolean(previousVersion);
  const modalTitle = isUpdate
    ? "Termos de Serviço Atualizados"
    : "Termos de Serviço";

  const modalDescription = isUpdate
    ? `Os termos foram atualizados da versão ${previousVersion} para ${config.currentVersion}. Por favor, revise as alterações.`
    : "Por favor, leia e aceite os termos de serviço para continuar usando o simulador.";

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleDecline();
      }}
    >
      <DialogContent
        className="max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col mx-2 sm:mx-4 lg:mx-auto w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] lg:w-full gap-3"
        onOpenAutoFocus={(e) => {
          // Focus the modal title instead of the close button for better UX
          e.preventDefault();
          const title = document.getElementById("terms-modal-title");
          if (title) title.focus();
        }}
      >
        <DialogTitle
          className="text-lg sm:text-xl font-bold text-left"
          id="terms-modal-title"
        >
          {modalTitle}
        </DialogTitle>

        <DialogDescription
          className="text-sm text-muted-foreground text-left"
          id="terms-modal-description"
        >
          {modalDescription}
        </DialogDescription>

        {isUpdate && showChanges && (
          <div
            className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-md p-3"
            role="alert"
            aria-live="polite"
          >
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Principais alterações:</strong> Esta versão inclui
              atualizações importantes sobre privacidade de dados e novos
              recursos do simulador.
            </p>
          </div>
        )}

        {/* Scrollable Terms Content */}
        <div
          className="flex-1 min-h-0 mb-4"
          role="region"
          aria-label="Conteúdo dos Termos de Serviço"
        >
          <ScrollArea
            className="h-[30vh] sm:h-[35vh] lg:h-[40vh] border border-border rounded-md bg-muted/20"
            aria-label="Área de rolagem dos termos"
          >
            <div className="p-4 space-y-4">
              {termsContent.sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <div key={section.id} className="space-y-2">
                    <h3
                      className="font-semibold text-sm text-foreground"
                      id={`section-${section.id}-title`}
                    >
                      {section.title}
                    </h3>
                    <div
                      className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line"
                      aria-labelledby={`section-${section.id}-title`}
                    >
                      {section.content}
                    </div>
                    {index !== termsContent.sections.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>

        {/* Terms Metadata outside scroll area
        <div
          className="terms-metadata-section text-xs text-muted-foreground bg-muted/30 p-3 rounded-md flex flex-wrap gap-4"
          role="contentinfo"
          aria-label="Informações sobre os termos"
        >
          <span><span className="font-medium">Versão:</span> {termsContent.version}</span>
          <span><span className="font-medium">Atualização:</span> {termsContent.lastUpdated.toLocaleDateString('pt-BR')}</span>
          <span><span className="font-medium">Jurisdição:</span> {termsContent.metadata.jurisdiction}</span>
        </div> */}

        {/* Acceptance Checkbox */}
        <div className="terms-checkbox-section">
          <div className="flex items-start space-x-3 p-4 border border-border rounded-md bg-background focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
            <Checkbox
              id="terms-acceptance"
              checked={hasAccepted}
              onCheckedChange={(checked) => setHasAccepted(checked === true)}
              className="mt-1 h-5 w-5 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-describedby="terms-acceptance-description"
              aria-required="true"
            />
            <div className="flex-1 min-w-0 space-y-2">
              <label
                htmlFor="terms-acceptance"
                className="text-sm font-medium leading-relaxed cursor-pointer block"
              >
                Li e concordo com os termos de serviço apresentados acima.
                Entendo que ao aceitar, estou concordando em cumprir todas as
                condições estabelecidas.
              </label>
              <p
                id="terms-acceptance-description"
                className="text-xs text-muted-foreground"
              >
                Esta confirmação é obrigatória para continuar usando o serviço.
              </p>
            </div>
          </div>

          {error && (
            <div
              className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-md p-3 mt-4"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start space-x-2">
                <svg
                  className="h-5 w-5 text-red-400 dark:text-red-300 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                  {retryCount > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                      Tentativa {retryCount} de 3
                    </p>
                  )}
                  {showRetryButton && retryCount < 3 && (
                    <button
                      onClick={handleRetry}
                      className="mt-2 text-xs bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      disabled={isLoading}
                      aria-label="Tentar novamente o registro de aceitação"
                    >
                      Tentar Novamente
                    </button>
                  )}
                  {retryCount >= 3 && (
                    <div className="mt-2 text-xs text-red-600 dark:text-red-300">
                      <p className="font-medium">
                        Múltiplas tentativas falharam. Sugestões:
                      </p>
                      <ul
                        className="list-disc list-inside mt-1 space-y-1"
                        role="list"
                      >
                        <li>Recarregue a página</li>
                        <li>Verifique sua conexão com a internet</li>
                        <li>Tente usar um navegador diferente</li>
                      </ul>
                      <button
                        onClick={() => {
                          console.warn(
                            "Force accepting terms due to persistent errors",
                          );
                          // Create a fallback acceptance record
                          const fallbackAcceptance = {
                            version: config.currentVersion,
                            acceptedAt: new Date(),
                            status: "ACCEPTED" as any,
                            consentType: "INITIAL" as any,
                            fallback: true,
                          };
                          onAccept(fallbackAcceptance);
                        }}
                        className="mt-2 text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors"
                      >
                        Continuar Mesmo Assim (Modo Emergência)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <DialogFooter className="terms-action-buttons flex-col sm:flex-row gap-3 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            disabled={isLoading}
            className="w-full sm:w-auto order-2 sm:order-1 min-h-[44px] text-sm sm:text-base"
            aria-label="Recusar os termos de serviço e voltar à página inicial"
          >
            Recusar e Voltar ao Início
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!hasAccepted || isLoading}
            className="min-w-[120px] w-full sm:w-auto order-1 sm:order-2 min-h-[44px] text-sm sm:text-base"
            aria-label={
              hasAccepted
                ? "Aceitar os termos de serviço"
                : "Marque a caixa de confirmação para aceitar"
            }
            aria-describedby={
              !hasAccepted ? "terms-acceptance-description" : undefined
            }
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="hidden sm:inline">Processando...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              "Aceitar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TermsAcceptanceModal;
