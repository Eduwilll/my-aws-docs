import React, { useEffect, useState, useCallback } from "react";
import { TermsAcceptanceModal } from "./TermsAcceptanceModal";
import {
  ConsentManager,
  ConsentValidator,
  TermsVersionManager as VersionUtils,
  TermsContentManager,
} from "../lib/terms";
import type {
  TermsConfig,
  UserTermsAcceptance,
  TermsContent,
} from "../lib/types/terms";
import { ConsentType } from "../lib/types/terms";

interface TermsVersionManagerProps {
  config: TermsConfig;
  onVersionChange?: (newVersion: string) => void;
  onAcceptanceRequired?: (version: string) => void;
  onAcceptanceComplete?: (acceptance: UserTermsAcceptance) => void;
  onError?: (error: string) => void;
  children?: React.ReactNode;
}

interface VersionCheckResult {
  needsAcceptance: boolean;
  isUpdate: boolean;
  previousVersion?: string;
  gracePeriodRemaining?: number;
}

export function TermsVersionManager({
  config,
  onVersionChange,
  onAcceptanceRequired,
  onAcceptanceComplete,
  onError,
  children,
}: TermsVersionManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [versionCheckResult, setVersionCheckResult] =
    useState<VersionCheckResult | null>(null);
  const [consentManager, setConsentManager] = useState<ConsentManager | null>(
    null,
  );
  const [termsContent, setTermsContent] = useState<TermsContent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [hasRecoveredFromError, setHasRecoveredFromError] = useState(false);

  // Initialize consent manager with error recovery
  useEffect(() => {
    const initializeManager = async () => {
      try {
        const manager = new ConsentManager(config);
        setConsentManager(manager);

        const content = TermsContentManager.getCurrentContent();
        setTermsContent(content);

        // Clear any previous errors on successful initialization
        if (error) {
          setError(null);
          setHasRecoveredFromError(true);
        }
      } catch (err) {
        const errorMessage =
          "Erro ao inicializar sistema de termos. Algumas funcionalidades podem estar limitadas.";
        setError(errorMessage);
        onError?.(errorMessage);
        console.error("TermsVersionManager initialization error:", err);

        // Attempt recovery after a delay
        if (retryCount < 3) {
          setTimeout(
            () => {
              setRetryCount((prev) => prev + 1);
            },
            2000 * Math.pow(2, retryCount),
          ); // Exponential backoff
        }
      }
    };

    initializeManager();
  }, [config, onError, retryCount]);

  // Version checking logic
  const checkVersionStatus =
    useCallback(async (): Promise<VersionCheckResult> => {
      if (!consentManager) {
        throw new Error("Consent manager not initialized");
      }

      const needsAcceptanceResult = await consentManager.needsAcceptance();

      if (!needsAcceptanceResult.needsAcceptance) {
        return {
          needsAcceptance: false,
          isUpdate: false,
        };
      }

      const consentStatus = await consentManager.getConsentStatus();
      const isUpdate = consentStatus.hasConsent && consentStatus.needsUpdate;

      return {
        needsAcceptance: true,
        isUpdate,
        previousVersion: consentStatus.acceptedVersion,
        gracePeriodRemaining: consentStatus.gracePeriodRemaining,
      };
    }, [consentManager]);

  // Handle grace period logic
  const isInGracePeriod = useCallback(
    (result: VersionCheckResult): boolean => {
      if (!result.isUpdate || !config.gracePeriodDays) {
        return false;
      }

      return (result.gracePeriodRemaining ?? 0) > 0;
    },
    [config.gracePeriodDays],
  );

  // Determine if modal should be shown immediately or can be delayed
  const shouldShowModalImmediately = useCallback(
    (result: VersionCheckResult): boolean => {
      if (!result.needsAcceptance) {
        return false;
      }

      // Show immediately for new users
      if (!result.isUpdate) {
        return true;
      }

      // For updates, check grace period
      if (config.gracePeriodDays && isInGracePeriod(result)) {
        // During grace period, show modal but allow dismissal
        return false;
      }

      // After grace period, force modal
      return true;
    },
    [config.gracePeriodDays, isInGracePeriod],
  );

  // Main version check effect
  useEffect(() => {
    let isMounted = true;

    const performVersionCheck = async () => {
      if (!consentManager) return;

      try {
        setIsLoading(true);
        setError(null);

        const result = await checkVersionStatus();

        if (!isMounted) return;

        setVersionCheckResult(result);

        if (result.needsAcceptance) {
          onAcceptanceRequired?.(config.currentVersion);

          if (shouldShowModalImmediately(result)) {
            setShowModal(true);
          }
        }

        // Notify about version changes
        if (result.isUpdate && result.previousVersion) {
          onVersionChange?.(config.currentVersion);
        }

        // Clear error on successful check
        if (error) {
          setError(null);
        }
      } catch (err) {
        if (!isMounted) return;

        // Provide graceful degradation - don't block the app
        console.error("Version check error:", err);

        // Only show error to user if it's critical
        if (config.requireAcceptance) {
          const errorMessage =
            "Não foi possível verificar o status dos termos. Continuando com funcionalidade limitada.";
          setError(errorMessage);
          onError?.(errorMessage);
        }

        // Set a fallback result that allows the app to continue
        setVersionCheckResult({
          needsAcceptance: config.requireAcceptance,
          isUpdate: false,
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    performVersionCheck();

    return () => {
      isMounted = false;
    };
  }, [
    consentManager,
    config.currentVersion,
    checkVersionStatus,
    shouldShowModalImmediately,
    onVersionChange,
    onAcceptanceRequired,
    onError,
  ]);

  // Handle user acceptance
  const handleAcceptance = useCallback(
    async (acceptance: UserTermsAcceptance) => {
      try {
        setShowModal(false);

        // Re-check version status after acceptance
        if (consentManager) {
          const newResult = await checkVersionStatus();
          setVersionCheckResult(newResult);
        }

        // Call the completion callback after updating state
        onAcceptanceComplete?.(acceptance);
      } catch (err) {
        const errorMessage = "Failed to process terms acceptance";
        setError(errorMessage);
        onError?.(errorMessage);
        console.error("Acceptance processing error:", err);
      }
    },
    [consentManager, checkVersionStatus, onAcceptanceComplete, onError],
  );

  // Handle user decline
  const handleDecline = useCallback(() => {
    if (!versionCheckResult) return;

    // For updates in grace period, allow dismissal
    if (versionCheckResult.isUpdate && isInGracePeriod(versionCheckResult)) {
      setShowModal(false);
      return;
    }

    // For new users or expired grace period, redirect to home
    // Instead of showing error, provide graceful exit
    console.log("User declined terms, triggering redirect");
    const errorMessage = "Terms acceptance is required to use this service";
    setShowModal(false);
    onError?.(errorMessage);
  }, [versionCheckResult, isInGracePeriod, onError]);

  // Public method to manually trigger version check
  const recheckVersion = useCallback(async () => {
    if (!consentManager) return;

    try {
      const result = await checkVersionStatus();
      setVersionCheckResult(result);

      if (result.needsAcceptance && shouldShowModalImmediately(result)) {
        setShowModal(true);
      }
    } catch (err) {
      const errorMessage = "Failed to recheck terms version";
      setError(errorMessage);
      onError?.(errorMessage);
      console.error("Version recheck error:", err);
    }
  }, [consentManager, checkVersionStatus, shouldShowModalImmediately, onError]);

  // Public method to manually show modal (for grace period scenarios)
  const showTermsModal = useCallback(() => {
    if (versionCheckResult?.needsAcceptance) {
      setShowModal(true);
    }
  }, [versionCheckResult]);

  // Note: useImperativeHandle removed as it's not needed for this component
  // If ref access is needed, it should be implemented with forwardRef properly

  // Loading state
  if (isLoading) {
    return <>{children}</>;
  }

  // Error state - still render children but log error
  if (error) {
    console.error("TermsVersionManager error:", error);
    // Continue rendering children even with errors for graceful degradation
  }

  return (
    <>
      {children}

      {/* Terms Acceptance Modal */}
      {showModal && versionCheckResult && termsContent && (
        <TermsAcceptanceModal
          isOpen={showModal}
          onAccept={handleAcceptance}
          onDecline={handleDecline}
          config={config}
          showChanges={versionCheckResult.isUpdate}
          previousVersion={versionCheckResult.previousVersion}
        />
      )}

      {/* Grace Period Notification (optional) */}
      {versionCheckResult?.needsAcceptance &&
        versionCheckResult.isUpdate &&
        isInGracePeriod(versionCheckResult) &&
        !showModal && (
          <div
            className="fixed bottom-4 right-4 left-4 sm:left-auto bg-blue-50 dark:bg-blue-950/90 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 shadow-lg max-w-xs sm:max-w-sm lg:max-w-md z-40 backdrop-blur-sm"
            role="alert"
            aria-live="polite"
            aria-labelledby="grace-period-title"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400 dark:text-blue-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  id="grace-period-title"
                  className="text-sm font-medium text-blue-800 dark:text-blue-200"
                >
                  Termos Atualizados
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Os termos foram atualizados. Você tem{" "}
                  {versionCheckResult.gracePeriodRemaining} dias para revisar.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={showTermsModal}
                    className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white px-3 py-2 sm:py-2.5 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-950 min-h-[40px] flex items-center justify-center"
                    aria-label="Revisar termos atualizados agora"
                  >
                    Revisar Agora
                  </button>
                  <button
                    onClick={() =>
                      setVersionCheckResult((prev) =>
                        prev ? { ...prev, needsAcceptance: false } : null,
                      )
                    }
                    className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition-colors px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-950 min-h-[40px] flex items-center justify-center"
                    aria-label="Lembrar de revisar os termos mais tarde"
                  >
                    Lembrar Depois
                  </button>
                </div>
              </div>
              <button
                onClick={() =>
                  setVersionCheckResult((prev) =>
                    prev ? { ...prev, needsAcceptance: false } : null,
                  )
                }
                className="flex-shrink-0 text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-100 transition-colors p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-950 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Fechar notificação"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
    </>
  );
}

export default TermsVersionManager;
