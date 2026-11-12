import React, { type ComponentProps } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ExamSelectionScreen } from "./ExamSelectionScreen";
import {
  AIF_C01_DomainMap,
  CLF_C02_DomainMap,
  SAA_C03_DomainMap,
  getExamDomainMap,
  getExamDomainName,
} from "@/lib/types/exam-domains";

afterEach(cleanup);
beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();
});

const props: ComponentProps<typeof ExamSelectionScreen> = {
  certifications: [],
  certificationBanks: {},
  selectedCertification: "CLF-C02",
  selectedExamId: "",
  studyMode: "domain_focus",
  focusOptions: {
    showImmediateFeedback: true,
    timerEnabled: false,
    timeLimitMinutes: 90,
  },
  onFocusOptionsChange: vi.fn(),
  selectedDomains: [],
  selectedCategories: [],
  checkingTerms: false,
  termsAccepted: true,
  isLoadingQuestions: false,
  onSelectCertification: vi.fn(),
  onSelectStudyMode: vi.fn(),
  onSelectBank: vi.fn(),
  onAddDomain: vi.fn(),
  onRemoveDomain: vi.fn(),
  onAddCategory: vi.fn(),
  onRemoveCategory: vi.fn(),
  onStartExam: vi.fn(),
  onRecheckTerms: vi.fn(),
  getDomainName: getExamDomainName,
};

describe("focused study certification domains", () => {
  it.each([
    ["CLF-C02", CLF_C02_DomainMap],
    ["SAA-C03", SAA_C03_DomainMap],
    ["AIF-C01", AIF_C01_DomainMap],
  ])("shows the domains for %s", (selectedCertification, domainMap) => {
    render(
      <ExamSelectionScreen
        {...props}
        selectedCertification={selectedCertification}
      />,
    );
    fireEvent.keyDown(screen.getAllByRole("combobox")[0], { key: "Enter" });
    expect(
      screen.getAllByRole("option").map((option) => option.textContent),
    ).toEqual(Object.values(domainMap));
  });

  it("offers AI's fifth domain and passes its key to the filter", () => {
    const onAddDomain = vi.fn();
    render(
      <ExamSelectionScreen
        {...props}
        selectedCertification="AIF-C01"
        onAddDomain={onAddDomain}
      />,
    );
    fireEvent.keyDown(screen.getAllByRole("combobox")[0], { key: "Enter" });
    fireEvent.click(
      screen.getByRole("option", { name: AIF_C01_DomainMap.DOMAIN_5 }),
    );
    expect(onAddDomain).toHaveBeenCalledWith("DOMAIN_5");
  });
  it("resets the dropdown when switching certifications", () => {
    const { rerender } = render(
      <ExamSelectionScreen {...props} selectedCertification="SAA-C03" />,
    );
    fireEvent.keyDown(screen.getAllByRole("combobox")[0], { key: "Enter" });
    fireEvent.click(
      screen.getByRole("option", { name: SAA_C03_DomainMap.DOMAIN_1 }),
    );
    rerender(
      <ExamSelectionScreen {...props} selectedCertification="AIF-C01" />,
    );
    expect(screen.getAllByRole("combobox")[0].textContent).toBe(
      "Adicionar domínio",
    );
    fireEvent.keyDown(screen.getAllByRole("combobox")[0], { key: "Enter" });
    expect(
      screen.getAllByRole("option").map((option) => option.textContent),
    ).toEqual(Object.values(AIF_C01_DomainMap));
  });

  it("labels selected AI domains using the certification map", () => {
    render(
      <ExamSelectionScreen
        {...props}
        selectedCertification="AIF-C01"
        selectedDomains={["DOMAIN_5"]}
      />,
    );
    expect(screen.getByText(`${AIF_C01_DomainMap.DOMAIN_5} ×`)).toBeTruthy();
  });
});

describe("shared exam domain lookup", () => {
  it.each([
    ["CLF-C02-01", CLF_C02_DomainMap],
    ["SAA-C03-FULL", SAA_C03_DomainMap],
    ["AIF-C01-05", AIF_C01_DomainMap],
  ])("resolves question bank %s", (examId, expected) => {
    expect(getExamDomainMap(examId)).toEqual(expected);
    expect(getExamDomainName(examId, "DOMAIN_1")).toBe(expected.DOMAIN_1);
  });

  it("does not fall back to Cloud Practitioner for an unsupported certification", () => {
    expect(getExamDomainMap("DVA-C02")).toEqual({});
    expect(getExamDomainName("DVA-C02", "DOMAIN_1")).toBe("Unknown Domain");
    expect(getExamDomainName("AIF-C01-05", "DOMAIN_6")).toBe("Unknown Domain");
  });
});
