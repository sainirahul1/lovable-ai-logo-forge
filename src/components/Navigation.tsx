
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Key, Wand2, Palette, Eye, Sparkles } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: "api", label: "API Setup", icon: Key, description: "Configure API key" },
  { id: "brand", label: "Brand", icon: Wand2, description: "Brand details" },
  { id: "style", label: "Style", icon: Palette, description: "Design style" },
  { id: "colors", label: "Colors", icon: Sparkles, description: "Color palette" },
  { id: "generate", label: "Generate", icon: Eye, description: "Create logos" }
];

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  return (
    <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        AI Logo Generator
      </h2>
      
      <div className="space-y-3">
        {navigationItems.map((item, index) => {
          const isActive = currentPage === item.id;
          const isCompleted = navigationItems.findIndex(nav => nav.id === currentPage) > index;
          
          return (
            <Button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-4 transition-all duration-300",
                isActive && "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg",
                !isActive && isCompleted && "bg-green-100 text-green-700 border border-green-200",
                !isActive && !isCompleted && "hover:bg-blue-100 hover:border-blue-200"
              )}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  isActive ? "bg-white/20" : isCompleted ? "bg-green-200" : "bg-blue-200"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{item.label}</div>
                  <div className={cn(
                    "text-xs opacity-80",
                    isActive ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
                {isCompleted && !isActive && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default Navigation;
