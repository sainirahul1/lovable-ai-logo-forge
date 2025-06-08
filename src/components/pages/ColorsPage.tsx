
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Palette, Plus, X, Sparkles } from "lucide-react";
import { useState } from "react";

interface ColorsPageProps {
  selectedColors: string[];
  onColorsChange: (colors: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const presetColors = [
  { name: "Blue", hex: "#3B82F6" },
  { name: "Lilac", hex: "#C084FC" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Teal", hex: "#14B8A6" },
  { name: "Rose", hex: "#F43F5E" },
  { name: "Amber", hex: "#F59E0B" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Indigo", hex: "#6366F1" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Orange", hex: "#F97316" },
  { name: "Cyan", hex: "#06B6D4" }
];

const ColorsPage = ({ selectedColors, onColorsChange, onNext, onBack }: ColorsPageProps) => {
  const [customColor, setCustomColor] = useState("");

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      onColorsChange(selectedColors.filter(c => c !== colorName));
    } else {
      onColorsChange([...selectedColors, colorName]);
    }
  };

  const addCustomColor = () => {
    if (customColor.trim() && !selectedColors.includes(customColor.trim())) {
      onColorsChange([...selectedColors, customColor.trim()]);
      setCustomColor("");
    }
  };

  const removeColor = (colorName: string) => {
    onColorsChange(selectedColors.filter(c => c !== colorName));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Color Palette
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose colors that reflect your brand's personality and values
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 border-2 hover:border-primary/30 transition-colors">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="h-6 w-6 text-primary" />
              <Label className="text-2xl font-semibold">Select Colors</Label>
            </div>

            {/* Selected Colors */}
            <div>
              <Label className="text-lg font-medium mb-3 block">Selected Colors ({selectedColors.length})</Label>
              <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-accent/20 rounded-lg">
                {selectedColors.length === 0 ? (
                  <div className="text-muted-foreground text-sm">No colors selected yet</div>
                ) : (
                  selectedColors.map((color) => {
                    const presetColor = presetColors.find(c => c.name === color);
                    return (
                      <div
                        key={color}
                        className="flex items-center gap-2 bg-background rounded-full px-3 py-2 shadow-sm border"
                      >
                        {presetColor && (
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-border"
                            style={{ backgroundColor: presetColor.hex }}
                          />
                        )}
                        <span className="font-medium">{color}</span>
                        <button
                          onClick={() => removeColor(color)}
                          className="hover:bg-destructive/20 rounded-full p-1 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Preset Colors */}
            <div>
              <Label className="text-lg font-medium mb-3 block">Preset Colors</Label>
              <div className="grid grid-cols-4 gap-3">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:scale-105",
                      selectedColors.includes(color.name)
                        ? "border-primary bg-primary/5 shadow-lg"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-border mb-2 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div>
              <Label className="text-lg font-medium mb-3 block">Add Custom Color</Label>
              <div className="flex gap-2">
                <Input
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="Color name (e.g., Gold, Navy)"
                  className="flex-1"
                />
                <Button
                  onClick={addCustomColor}
                  disabled={!customColor.trim() || selectedColors.includes(customColor.trim())}
                  size="default"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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
                disabled={selectedColors.length === 0}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Generate Logos
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-accent/30">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Color Psychology
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="font-medium">Blue</span>
                  </div>
                  <p className="text-muted-foreground">Trust, reliability, professional</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="font-medium">Green</span>
                  </div>
                  <p className="text-muted-foreground">Growth, nature, harmony</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="font-medium">Purple</span>
                  </div>
                  <p className="text-muted-foreground">Creativity, luxury, wisdom</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="font-medium">Red</span>
                  </div>
                  <p className="text-muted-foreground">Energy, passion, urgency</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="font-medium">Orange</span>
                  </div>
                  <p className="text-muted-foreground">Enthusiasm, creativity, warmth</p>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span className="font-medium">Gray</span>
                  </div>
                  <p className="text-muted-foreground">Balance, neutrality, sophistication</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium mb-2">💡 Pro tip:</h4>
              <p className="text-sm text-muted-foreground">
                Choose 2-4 colors that work well together. Consider your industry and target audience when selecting colors.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ColorsPage;
