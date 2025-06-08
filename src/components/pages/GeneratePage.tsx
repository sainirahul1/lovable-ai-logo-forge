
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import GeneratedLogos from "@/components/GeneratedLogos";
import { Eye, Wand2, Sparkles } from "lucide-react";

interface GeneratePageProps {
  brandName: string;
  brandVision: string;
  selectedStyle: string;
  selectedColors: string[];
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  onGeneratePrompt: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  generatedLogos: string[];
  onBack: () => void;
}

const GeneratePage = ({
  brandName,
  brandVision,
  selectedStyle,
  selectedColors,
  customPrompt,
  onCustomPromptChange,
  onGeneratePrompt,
  onGenerate,
  isGenerating,
  generatedLogos,
  onBack
}: GeneratePageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20">
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Generate Logos
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to create stunning logos? Review your settings and generate!
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Configuration Summary */}
          <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-blue-600" />
              Configuration Summary
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className="font-medium text-blue-600">Brand Name</Label>
                <p className="text-lg">{brandName}</p>
              </div>
              
              <div>
                <Label className="font-medium text-blue-600">Brand Vision</Label>
                <p className="text-sm text-muted-foreground line-clamp-3">{brandVision}</p>
              </div>
              
              <div>
                <Label className="font-medium text-blue-600">Style</Label>
                <p>{selectedStyle}</p>
              </div>
              
              <div>
                <Label className="font-medium text-blue-600">Colors</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedColors.map((color) => (
                    <span key={color} className="px-3 py-1 bg-purple-100 rounded-full text-sm border border-purple-200">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Custom Prompt */}
          <Card className="p-6 border-2 hover:border-purple-300 transition-colors bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Custom Prompt (Optional)
              </h3>
              
              <Textarea
                value={customPrompt}
                onChange={(e) => onCustomPromptChange(e.target.value)}
                placeholder="Write your own custom prompt or use our generated one..."
                className="min-h-[150px] text-sm resize-none border-2 focus:border-purple-400"
              />
              
              <Button 
                variant="outline" 
                onClick={onGeneratePrompt}
                className="w-full border-2 border-purple-200 hover:bg-purple-100"
              >
                Generate Default Prompt
              </Button>

              <div className="flex gap-3">
                <Button 
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-200"
                >
                  Back
                </Button>
                <Button 
                  onClick={onGenerate}
                  disabled={isGenerating || !brandName.trim()}
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Generate 2 Logos
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-8">
          <GeneratedLogos 
            logos={generatedLogos}
            isGenerating={isGenerating}
            brandName={brandName}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
