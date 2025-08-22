import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Keyboard, Navigation, MousePointer, HelpCircle } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  key: string;
  description: string;
  category: "navigation" | "answers" | "actions";
}

const shortcuts: ShortcutItem[] = [
  // Navigation shortcuts
  { key: "←", description: "Previous question", category: "navigation" },
  { key: "→", description: "Next question", category: "navigation" },

  // Answer selection shortcuts
  { key: "1", description: "Select answer A", category: "answers" },
  { key: "2", description: "Select answer B", category: "answers" },
  { key: "3", description: "Select answer C", category: "answers" },
  { key: "4", description: "Select answer D", category: "answers" },

  // Action shortcuts
  { key: "Enter", description: "Submit answer", category: "actions" },
  { key: "Space", description: "Skip question", category: "actions" },
  { key: "?", description: "Show this help", category: "actions" },
  { key: "Esc", description: "Close modal", category: "actions" },
];

const categoryConfig = {
  navigation: {
    title: "Navigation",
    icon: Navigation,
    color: "bg-blue-100 text-blue-800",
  },
  answers: {
    title: "Answer Selection",
    icon: MousePointer,
    color: "bg-green-100 text-green-800",
  },
  actions: {
    title: "Actions",
    icon: HelpCircle,
    color: "bg-purple-100 text-purple-800",
  },
};

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    },
    {} as Record<string, ShortcutItem[]>,
  );

  // Focus management and accessibility
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal content when it opens
      setTimeout(() => {
        const modalContent = modalRef.current;
        if (modalContent) {
          modalContent.focus();
        }
      }, 100);

      // Announce modal opening to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent =
        "Keyboard shortcuts help dialog opened. Press Escape to close.";
      document.body.appendChild(announcement);

      // Clean up announcement after screen reader has time to read it
      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    } else {
      // Restore focus to the previously focused element when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  // Handle keyboard navigation within modal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        ref={modalRef}
        className="max-w-2xl max-h-[90vh] overflow-y-auto focus:outline-none"
        aria-labelledby="shortcuts-modal-title"
        aria-describedby="shortcuts-modal-description"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle
            id="shortcuts-modal-title"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription id="shortcuts-modal-description">
            Use these keyboard shortcuts to navigate and interact with the exam
            more efficiently.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {Object.entries(groupedShortcuts).map(
            ([category, categoryShortcuts]) => {
              const config =
                categoryConfig[category as keyof typeof categoryConfig];
              const IconComponent = config.icon;

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <h3 className="font-semibold text-lg">{config.title}</h3>
                  </div>

                  <div
                    className="grid gap-2"
                    role="list"
                    aria-label={`${config.title} shortcuts`}
                  >
                    {categoryShortcuts.map((shortcut) => (
                      <div
                        key={`${category}-${shortcut.key}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        role="listitem"
                      >
                        <span className="text-sm text-gray-700">
                          {shortcut.description}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`font-mono text-xs px-2 py-1 ${config.color}`}
                          aria-label={`Keyboard shortcut: ${shortcut.key}`}
                        >
                          {shortcut.key}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>

        <div
          className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
          role="complementary"
          aria-labelledby="tips-heading"
        >
          <div className="flex items-start gap-2">
            <HelpCircle
              className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <div className="text-sm text-blue-800">
              <p id="tips-heading" className="font-medium mb-1">
                Tips:
              </p>
              <ul className="space-y-1 text-xs" role="list">
                <li role="listitem">
                  • Shortcuts are disabled when typing in input fields
                </li>
                <li role="listitem">
                  • Navigation shortcuts respect question boundaries
                </li>
                <li role="listitem">
                  • Press{" "}
                  <kbd
                    className="px-1 py-0.5 bg-white rounded border"
                    aria-label="question mark key"
                  >
                    ?
                  </kbd>{" "}
                  anytime to show this help
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
