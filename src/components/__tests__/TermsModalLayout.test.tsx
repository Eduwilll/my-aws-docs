import React from "react";
import { render, screen } from "@testing-library/react";
import { TermsAcceptanceModal } from "../TermsAcceptanceModal";
import type { TermsConfig } from "../../lib/types/terms";

// Mock the UI components
jest.mock("../ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => (
    <h2 data-testid="dialog-title" id={id}>
      {children}
    </h2>
  ),
  DialogDescription: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => (
    <p data-testid="dialog-description" id={id}>
      {children}
    </p>
  ),
  DialogFooter: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="dialog-footer" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("../ui/button", () => ({
  Button: ({ children, onClick, disabled, className }: any) => (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  ),
}));

jest.mock("../ui/checkbox", () => ({
  Checkbox: ({ id, checked, onCheckedChange, className }: any) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={className}
    />
  ),
}));

jest.mock("../ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr className={className} />
  ),
}));

jest.mock("../ui/scroll-area", () => ({
  ScrollArea: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

// Mock the terms content manager
jest.mock("../../lib/terms", () => ({
  TermsContentManager: {
    getCurrentContent: () => ({
      version: "1.0.0",
      lastUpdated: new Date("2025-01-01"),
      sections: [
        {
          id: "intro",
          title: "Introdução",
          content: "Bem-vindo ao simulador AWS.",
          order: 1,
        },
      ],
      metadata: {
        jurisdiction: "Brasil",
      },
    }),
  },
  ConsentManager: jest.fn().mockImplementation(() => ({
    recordAcceptance: jest.fn().mockResolvedValue({
      success: true,
      acceptance: {
        version: "1.0.0",
        acceptedAt: new Date(),
        status: "ACCEPTED",
        consentType: "INITIAL",
      },
    }),
  })),
}));

describe("TermsAcceptanceModal Layout", () => {
  const mockConfig: TermsConfig = {
    currentVersion: "1.0.0",
    requireAcceptance: true,
    showChangesHighlight: false,
    gracePeriodDays: 7,
    enableVersionHistory: true,
    maxStoredVersions: 5,
  };

  const defaultProps = {
    isOpen: true,
    onAccept: jest.fn(),
    onDecline: jest.fn(),
    config: mockConfig,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with proper structure", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-header")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-title")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-description")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-footer")).toBeInTheDocument();
  });

  it("has proper layout classes to prevent overlap", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    const dialogContent = screen.getByTestId("dialog-content");
    expect(dialogContent).toHaveClass("flex", "flex-col", "gap-4");
  });

  it("renders checkbox with proper spacing", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("flex-shrink-0");
  });

  it("renders accept and decline buttons", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    expect(screen.getByText("Aceitar")).toBeInTheDocument();
    expect(screen.getByText("Recusar")).toBeInTheDocument();
  });

  it("shows terms content in scrollable area", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    expect(screen.getByText("Introdução")).toBeInTheDocument();
    expect(screen.getByText("Bem-vindo ao simulador AWS.")).toBeInTheDocument();
  });

  it("shows version information", () => {
    render(<TermsAcceptanceModal {...defaultProps} />);

    expect(screen.getByText(/Versão:/)).toBeInTheDocument();
    expect(screen.getByText(/1\.0\.0/)).toBeInTheDocument();
  });
});
