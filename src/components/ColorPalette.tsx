
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Palette, Plus, X } from "lucide-react";
import { useState } from "react";

interface ColorPaletteProps {
  selectedColors: string[];
  onColorsChange: (colors: string[]) => void;
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
  { name: "Pink", hex: "#EC4899" }
];

const ColorPalette = ({ selectedColors, onColorsChange }: ColorPaletteProps) => {
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
    <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-primary" />
        <Label className="text-2xl font-semibold">Color Palette</Label>
      </div>
      
      <div className="space-y-4">
        {/* Selected Colors */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Selected Colors</Label>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color) => {
              const presetColor = presetColors.find(c => c.name === color);
              return (
                <div
                  key={color}
                  className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1 text-sm"
                >
                  {presetColor && (
                    <div 
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: presetColor.hex }}
                    />
                  )}
                  <span>{color}</span>
                  <button
                    onClick={() => removeColor(color)}
                    className="hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preset Colors */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Preset Colors</Label>
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg border-2 transition-all hover:scale-105",
                  selectedColors.includes(color.name)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div 
                  className="w-6 h-6 rounded-full border border-border mb-1"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-medium">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Add Custom Color</Label>
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
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ColorPalette;
