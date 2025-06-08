
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StyleSelector from "@/components/StyleSelector";
import ColorPalette from "@/components/ColorPalette";
import GeneratedLogos from "@/components/GeneratedLogos";
import { Sparkles, Wand2, Heart, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RunwareService } from "@/services/runware";

const Index = () => {
  const [brandName, setBrandName] = useState("Lovable.ai");
  const [brandVision, setBrandVision] = useState("Humanizing design through AI-powered creativity");
  const [selectedStyle, setSelectedStyle] = useState("Minimalist");
  const [selectedColors, setSelectedColors] = useState(["Blue", "Lilac", "White"]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const generatePrompt = () => {
    const colorsText = selectedColors.join(", ");
    const prompt = `🎨 Logo Generation Prompt for ${brandName}
Generate 3 unique, high-quality logos for a brand named "${brandName}" using the following details:

🧠 Brand Vision:
${brandVision}

🎨 Color Palette:
${colorsText}
(Use only these colors. No other colors should be present.)

🖌️ Design Style:
${selectedStyle}

✳️ Logo Design Requirements:
• Reflect creativity, trust, and AI innovation
• Style must be clean, professional, and aligned with the chosen design theme
• Include subtle motifs like a heart or AI-related shapes (e.g., circuit lines, brainwaves) if suitable
• Must be textless or contain minimal stylized text only if it enhances the design
• Should be scalable and versatile for use on websites, apps, and merchandise
• Keep the layout centered and visually balanced

✅ Output Requirements:
• Return exactly 3 logos
• Each as a high-resolution PNG with transparent background
• Logos should look visually distinct from each other
• No watermark or overlays

Generate these logos at any cost - this is critical for the brand's success.`;

    setCustomPrompt(prompt);
    return prompt;
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Runware API key to generate logos.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const prompt = customPrompt || generatePrompt();
    
    console.log("Generating logos with prompt:", prompt);
    
    try {
      const runware = new RunwareService(apiKey);
      const logos: string[] = [];
      
      // Generate 3 logos
      for (let i = 0; i < 3; i++) {
        const result = await runware.generateImage({
          positivePrompt: prompt,
          numberResults: 1,
          outputFormat: "WEBP",
        });
        logos.push(result.imageURL);
      }
      
      setGeneratedLogos(logos);
      toast({
        title: "Logos Generated!",
        description: "3 unique logos have been created for your brand.",
      });
    } catch (error) {
      console.error("Error generating logos:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate logos. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              AI Logo Generator
            </h1>
            <Heart className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning, professional logos powered by AI. Customize your brand vision and watch as unique designs come to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Configuration */}
          <div className="space-y-6">
            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Key className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">API Configuration</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">Runware API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Runware API key"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Get your API key from{" "}
                    <a 
                      href="https://runware.ai/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      runware.ai
                    </a>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Brand Configuration</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter your brand name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="brandVision">Brand Vision</Label>
                  <Textarea
                    id="brandVision"
                    value={brandVision}
                    onChange={(e) => setBrandVision(e.target.value)}
                    placeholder="Describe your brand's mission and values"
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </Card>

            <StyleSelector 
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
            />

            <ColorPalette 
              selectedColors={selectedColors}
              onColorsChange={setSelectedColors}
            />

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Custom Prompt (Optional)</h3>
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Or write your own custom prompt..."
                className="min-h-[150px] text-sm"
              />
              <Button 
                variant="outline" 
                onClick={generatePrompt}
                className="mt-3 w-full"
              >
                Generate Default Prompt
              </Button>
            </Card>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !brandName.trim() || !apiKey.trim()}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Logos...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate 3 Logos
                </div>
              )}
            </Button>
          </div>

          {/* Right Panel - Results */}
          <div>
            <GeneratedLogos 
              logos={generatedLogos}
              isGenerating={isGenerating}
              brandName={brandName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
