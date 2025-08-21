import React from "react";
import { FileText, Shield } from "lucide-react";

interface TermsNavigationLinksProps {
  variant?: "footer" | "inline" | "contextual";
  className?: string;
  showIcons?: boolean;
}

/**
 * TermsNavigationLinks component provides consistent site-wide access to Terms of Service
 * and Privacy Policy links with proper accessibility compliance.
 *
 * @param variant - Display style: 'footer' for footer links, 'inline' for inline text, 'contextual' for contextual placement
 * @param className - Additional CSS classes
 * @param showIcons - Whether to display icons alongside links
 */
export const TermsNavigationLinks: React.FC<TermsNavigationLinksProps> = ({
  variant = "footer",
  className = "",
  showIcons = false,
}) => {
  const baseClasses =
    "hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1 min-h-[44px] flex items-center justify-center";

  const getVariantClasses = () => {
    switch (variant) {
      case "footer":
        return "text-muted-foreground text-sm sm:text-base";
      case "inline":
        return "text-foreground underline underline-offset-4 text-sm sm:text-base";
      case "contextual":
        return "text-xs sm:text-sm text-muted-foreground";
      default:
        return "text-muted-foreground text-sm sm:text-base";
    }
  };

  const linkClasses = `${baseClasses} ${getVariantClasses()} ${className}`;

  const renderLink = (
    href: string,
    text: string,
    icon?: React.ReactNode,
    ariaLabel?: string,
  ) => (
    <a
      href={href}
      className={linkClasses}
      aria-label={ariaLabel || text}
      role="link"
      tabIndex={0}
    >
      <span className="flex items-center gap-1 sm:gap-2 text-center">
        {showIcons && icon && (
          <span aria-hidden="true" className="flex-shrink-0">
            {icon}
          </span>
        )}
        <span className="break-words leading-tight">{text}</span>
      </span>
    </a>
  );

  if (variant === "footer") {
    return (
      <nav
        className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 ${className}`}
        aria-label="Links legais do rodapé"
        role="navigation"
      >
        {renderLink(
          "/terms",
          "Termos de Serviço",
          <FileText className="w-3 h-3 sm:w-4 sm:h-4" />,
          "Acessar Termos de Serviço",
        )}
        <span
          className="text-muted-foreground mx-1 sm:mx-2 select-none hidden sm:inline"
          aria-hidden="true"
          role="separator"
        >
          |
        </span>
        {renderLink(
          "/privacy",
          "Política de Privacidade",
          <Shield className="w-3 h-3 sm:w-4 sm:h-4" />,
          "Acessar Política de Privacidade",
        )}
      </nav>
    );
  }

  if (variant === "inline") {
    return (
      <span
        className={`inline-flex flex-wrap items-center gap-1 sm:gap-2 ${className}`}
        role="navigation"
        aria-label="Links para documentos legais"
      >
        {renderLink(
          "/terms",
          "Termos de Serviço",
          showIcons ? (
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : undefined,
          "Acessar Termos de Serviço",
        )}
        <span
          className="text-muted-foreground mx-1 select-none"
          aria-hidden="true"
          role="separator"
        >
          e
        </span>
        {renderLink(
          "/privacy",
          "Política de Privacidade",
          showIcons ? <Shield className="w-3 h-3 sm:w-4 sm:h-4" /> : undefined,
          "Acessar Política de Privacidade",
        )}
      </span>
    );
  }

  if (variant === "contextual") {
    return (
      <nav
        className={`space-y-1 sm:space-y-2 ${className}`}
        aria-label="Links contextuais para documentos legais"
        role="navigation"
      >
        <div>
          {renderLink(
            "/terms",
            "Termos de Serviço",
            showIcons ? <FileText className="w-3 h-3" /> : undefined,
            "Acessar Termos de Serviço",
          )}
        </div>
        <div>
          {renderLink(
            "/privacy",
            "Política de Privacidade",
            showIcons ? <Shield className="w-3 h-3" /> : undefined,
            "Acessar Política de Privacidade",
          )}
        </div>
      </nav>
    );
  }

  return null;
};

export default TermsNavigationLinks;
