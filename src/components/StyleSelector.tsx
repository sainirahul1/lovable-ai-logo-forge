
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const styles = [
  {
    name: "Minimalist",
    description: "Clean, simple, and modern",
    gradient: "from-slate-400 to-slate-600"
  },
  {
    name: "Futuristic", 
    description: "High-tech and innovative",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    name: "Geometric",
    description: "Sharp lines and shapes",
    gradient: "from-orange-400 to-red-600"
  },
  {
    name: "Playful",
    description: "Fun and creative",
    gradient: "from-pink-400 to-purple-600"
  },
  {
    name: "Elegant",
    description: "Sophisticated and refined",
    gradient: "from-purple-400 to-indigo-600"
  },
  {
    name: "Tech-inspired",
    description: "Circuit-like and digital",
    gradient: "from-green-400 to-emerald-600"
  }
];

const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  return (
    <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-primary" />
        <Label className="text-2xl font-semibold">Design Style</Label>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onStyleSelect(style.name)}
            className={cn(
              "p-4 rounded-lg border-2 transition-all text-left group hover:scale-105",
              selectedStyle === style.name
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            )}
          >
            <div className={cn(
              "w-full h-2 rounded-full mb-3 bg-gradient-to-r transition-opacity",
              style.gradient,
              selectedStyle === style.name ? "opacity-100" : "opacity-60 group-hover:opacity-80"
            )} />
            <h3 className="font-semibold text-sm">{style.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default StyleSelector;
