import React, { useState } from "react";
import { Button } from "../ui/button";
import TermsAcceptanceModal from "../TermsAcceptanceModal";
import { ConsentManager } from "../../lib/terms";
import type { TermsConfig, UserTermsAcceptance } from "../../lib/types/terms";

/**
 * Example component demonstrating how to use the TermsAcceptanceModal
 * This shows the integration with the consent tracking system
 */
export function TermsAcceptanceExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAcceptance, setUserAcceptance] =
    useState<UserTermsAcceptance | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Configuration for terms management
  const termsConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: true,
    gracePeriodDays: 30,
    enableVersionHistory: true,
    maxStoredVersions: 5,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const handleAccept = (acceptance: UserTermsAcceptance) => {
    console.log("User accepted terms:", acceptance);
    setUserAcceptance(acceptance);
    setIsModalOpen(false);
    setError(null);
  };

  const handleDecline = () => {
    console.log("User declined terms");
    setIsModalOpen(false);
    setError("Você deve aceitar os termos para continuar usando o simulador.");
  };

  const checkConsentStatus = async () => {
    try {
      const consentManager = new ConsentManager(termsConfig);
      const status = await consentManager.getConsentStatus();
      console.log("Current consent status:", status);

      if (status.needsUpdate) {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error("Failed to check consent status:", err);
      setError("Erro ao verificar status de consentimento");
    }
  };

  const clearConsent = async () => {
    try {
      const consentManager = new ConsentManager(termsConfig);
      await consentManager.clearConsent();
      setUserAcceptance(null);
      console.log("Consent data cleared");
    } catch (err) {
      console.error("Failed to clear consent:", err);
      setError("Erro ao limpar dados de consentimento");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Exemplo de Modal de Termos de Serviço
        </h2>
        <p className="text-muted-foreground">
          Este exemplo demonstra como usar o componente TermsAcceptanceModal
          integrado com o sistema de rastreamento de consentimento.
        </p>
      </div>

      {/* Current Status */}
      <div className="border rounded-lg p-4 space-y-2">
        <h3 className="font-semibold">Status Atual</h3>
        {userAcceptance ? (
          <div className="space-y-1 text-sm">
            <p>
              <strong>Versão aceita:</strong> {userAcceptance.version}
            </p>
            <p>
              <strong>Data de aceitação:</strong>{" "}
              {userAcceptance.acceptedAt.toLocaleString("pt-BR")}
            </p>
            <p>
              <strong>Tipo de consentimento:</strong>{" "}
              {userAcceptance.consentType}
            </p>
            <p>
              <strong>Status:</strong> {userAcceptance.status}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nenhum consentimento registrado
          </p>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleOpenModal}>Abrir Modal de Termos</Button>

        <Button variant="outline" onClick={checkConsentStatus}>
          Verificar Status
        </Button>

        <Button variant="outline" onClick={clearConsent}>
          Limpar Consentimento
        </Button>
      </div>

      {/* Terms Acceptance Modal */}
      <TermsAcceptanceModal
        isOpen={isModalOpen}
        onAccept={handleAccept}
        onDecline={handleDecline}
        config={termsConfig}
        showChanges={false}
      />

      {/* Usage Instructions */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="font-semibold">Como usar:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>Clique em "Abrir Modal de Termos" para exibir o modal</li>
          <li>Leia os termos de serviço no modal scrollável</li>
          <li>Marque a checkbox para concordar com os termos</li>
          <li>Clique em "Aceitar" para registrar o consentimento</li>
          <li>Use "Verificar Status" para checar o consentimento atual</li>
          <li>Use "Limpar Consentimento" para resetar os dados</li>
        </ol>
      </div>

      {/* Integration Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="font-semibold text-blue-900 mb-2">
          Notas de Integração:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
          <li>
            O modal integra automaticamente com o sistema de consent tracking
          </li>
          <li>
            Os dados são persistidos no localStorage com fallback para memória
          </li>
          <li>
            Suporta diferentes tipos de consentimento (inicial, atualização,
            renovação)
          </li>
          <li>Inclui validação de checkbox obrigatória</li>
          <li>Tratamento de erros integrado</li>
          <li>Suporte a modo de atualização com destaque de mudanças</li>
        </ul>
      </div>
    </div>
  );
}

export default TermsAcceptanceExample;
