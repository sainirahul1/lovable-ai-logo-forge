
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Palette, ArrowRight } from "lucide-react";

interface StylePageProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const styles = [
  {
    name: "Minimalist",
    description: "Clean, simple, and timeless design",
    gradient: "from-slate-400 to-slate-600",
    features: ["Simple lines", "Plenty of white space", "Classic typography"]
  },
  {
    name: "Futuristic", 
    description: "High-tech and cutting-edge aesthetics",
    gradient: "from-cyan-400 to-blue-600",
    features: ["Digital elements", "Modern shapes", "Tech-inspired"]
  },
  {
    name: "Geometric",
    description: "Bold shapes and mathematical precision",
    gradient: "from-orange-400 to-red-600",
    features: ["Sharp angles", "Structured forms", "Bold contrasts"]
  },
  {
    name: "Playful",
    description: "Fun, creative, and approachable",
    gradient: "from-pink-400 to-purple-600",
    features: ["Rounded shapes", "Vibrant colors", "Friendly appeal"]
  },
  {
    name: "Elegant",
    description: "Sophisticated and refined luxury",
    gradient: "from-purple-400 to-indigo-600",
    features: ["Graceful curves", "Premium feel", "Refined details"]
  },
  {
    name: "Tech-inspired",
    description: "Circuit patterns and digital innovation",
    gradient: "from-green-400 to-emerald-600",
    features: ["Circuit motifs", "Digital patterns", "Innovation-focused"]
  }
];

const StylePage = ({ selectedStyle, onStyleSelect, onNext, onBack }: StylePageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Design Style
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose a design style that best represents your brand's personality
        </p>
      </div>

      <Card className="p-8 border-2 hover:border-primary/30 transition-colors">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-primary" />
            <Label className="text-2xl font-semibold">Select Your Style</Label>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {styles.map((style) => (
              <button
                key={style.name}
                onClick={() => onStyleSelect(style.name)}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all text-left group hover:scale-105 hover:shadow-lg",
                  selectedStyle === style.name
                    ? "border-primary bg-primary/5 shadow-xl ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-full h-3 rounded-full mb-4 bg-gradient-to-r transition-opacity",
                  style.gradient,
                  selectedStyle === style.name ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                )} />
                
                <h3 className="font-bold text-lg mb-2">{style.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{style.description}</p>
                
                <div className="space-y-1">
                  {style.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {selectedStyle === style.name && (
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm">
                    <ArrowRight className="h-4 w-4" />
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-6">
            <Button 
              onClick={onBack}
              variant="outline"
              className="flex-1 h-12"
            >
              Back
            </Button>
            <Button 
              onClick={onNext}
              disabled={!selectedStyle}
              className="flex-1 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              Continue to Colors
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StylePage;
