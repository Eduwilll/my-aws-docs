import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Navigation, MousePointer, HelpCircle } from "lucide-react";

interface KeyboardShortcutsDisplayProps {
  isCompact?: boolean;
  className?: string;
}

interface ShortcutItem {
  key: string;
  description: string;
  category: "navigation" | "answers" | "actions";
}

const shortcuts: ShortcutItem[] = [
  // Navigation shortcuts
  { key: "←", description: "Questão anterior", category: "navigation" },
  { key: "→", description: "Próxima questão", category: "navigation" },

  // Answer selection shortcuts
  { key: "1", description: "Selecionar opção A", category: "answers" },
  { key: "2", description: "Selecionar opção B", category: "answers" },
  { key: "3", description: "Selecionar opção C", category: "answers" },
  { key: "4", description: "Selecionar opção D", category: "answers" },

  // Action shortcuts
  { key: "Enter", description: "Confirmar resposta", category: "actions" },
  { key: "Space", description: "Pular questão", category: "actions" },
  { key: "?", description: "Mostrar ajuda", category: "actions" },
];

const categoryConfig = {
  navigation: {
    title: "Navegação",
    icon: Navigation,
    color: "bg-blue-100 text-blue-800",
  },
  answers: {
    title: "Respostas",
    icon: MousePointer,
    color: "bg-green-100 text-green-800",
  },
  actions: {
    title: "Ações",
    icon: HelpCircle,
    color: "bg-purple-100 text-purple-800",
  },
};

export const KeyboardShortcutsDisplay: React.FC<
  KeyboardShortcutsDisplayProps
> = ({ isCompact = false, className = "" }) => {
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

  if (isCompact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {shortcuts.slice(0, 6).map((shortcut) => (
          <div
            key={shortcut.key}
            className="flex items-center gap-1 text-xs text-gray-600"
          >
            <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs font-mono">
              {shortcut.key}
            </kbd>
            <span className="hidden sm:inline">{shortcut.description}</span>
          </div>
        ))}
        <div className="text-xs text-gray-500">
          Pressione{" "}
          <kbd className="px-1 py-0.5 bg-gray-100 border rounded">?</kbd> para
          ver todos
        </div>
      </div>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Keyboard className="w-5 h-5" />
          Atalhos do Teclado
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {Object.entries(groupedShortcuts).map(
          ([category, categoryShortcuts]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            const IconComponent = config.icon;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <h4 className="font-medium text-sm">{config.title}</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categoryShortcuts.map((shortcut) => (
                    <div
                      key={`${category}-${shortcut.key}`}
                      className="flex items-center justify-between p-2 rounded bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">
                        {shortcut.description}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`font-mono text-xs px-2 py-1 ${config.color}`}
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

        <div className="pt-2 border-t text-xs text-gray-500">
          💡 Os atalhos são desabilitados quando você está digitando em campos
          de texto
        </div>
      </CardContent>
    </Card>
  );
};
