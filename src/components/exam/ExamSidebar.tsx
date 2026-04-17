import React from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  BarChart3,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";

interface ExamSidebarProps {
  currentView: "exam" | "progress" | "favorites";
  onViewChange: (view: "exam" | "progress" | "favorites") => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  favoriteCount: number;
}

export const ExamSidebar: React.FC<ExamSidebarProps> = ({
  currentView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
  favoriteCount,
}) => {
  const menuItems = [
    {
      id: "exam",
      label: "Simulador",
      icon: BookOpen,
      view: "exam" as const,
    },
    {
      id: "progress",
      label: "Meu Progresso",
      icon: BarChart3,
      view: "progress" as const,
    },
    {
      id: "favorites",
      label: "Favoritas",
      icon: Star,
      view: "favorites" as const,
      badge: favoriteCount > 0 ? favoriteCount : undefined,
    },
  ];

  return (
    <div
      className={`flex flex-col border-r bg-card transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-80"
      } h-full rounded-[2rem] shadow-xl overflow-hidden glass-card border-none`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-in fade-in duration-300">
            <div className="bg-primary p-1.5 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gradient">
              Dashboard
            </span>
          </div>
        )}
        {isCollapsed && (
          <div className="bg-primary p-1.5 rounded-lg mx-auto">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.view ? "default" : "ghost"}
            className={`w-full justify-start gap-4 h-12 rounded-xl transition-all ${
              currentView === item.view
                ? "shadow-md scale-[1.02]"
                : "hover:bg-muted"
            } ${isCollapsed ? "px-0 justify-center" : "px-4"}`}
            onClick={() => onViewChange(item.view)}
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 ${
                currentView === item.view ? "text-primary-foreground" : ""
              }`}
            />
            {!isCollapsed && (
              <span className="font-medium flex-1 text-left">{item.label}</span>
            )}
            {!isCollapsed && item.badge !== undefined && (
              <span className="bg-primary-foreground text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {item.badge}
              </span>
            )}
            {isCollapsed && item.badge !== undefined && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            )}
          </Button>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-border/50">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-4 h-12 rounded-xl text-muted-foreground ${
            isCollapsed ? "px-0 justify-center" : "px-4"
          }`}
          title="Configurações (Em breve)"
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Ajustes</span>}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 justify-center text-muted-foreground hover:text-foreground"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Recolher</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
