
import { useState } from "react";
import Navigation from "@/components/Navigation";
import ApiPage from "@/components/pages/ApiPage";
import BrandPage from "@/components/pages/BrandPage";
import StylePage from "@/components/pages/StylePage";
import ColorsPage from "@/components/pages/ColorsPage";
import GeneratePage from "@/components/pages/GeneratePage";
import { useToast } from "@/hooks/use-toast";
import { RunwareService } from "@/services/runware";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("api");
  const [brandName, setBrandName] = useState("enter brand name");
  const [brandVision, setBrandVision] = useState("Enter your Brand vision");
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
Generate 2 unique, high-quality logos for a brand named "${brandName}" using the following details:

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
• Return exactly 2 logos
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
        description: "Please enter your Hugging Face API key to generate logos.",
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
      
      // Generate 2 logos
      for (let i = 0; i < 2; i++) {
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
        description: "2 unique logos have been created for your brand.",
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

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "api":
        return (
          <ApiPage
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            onNext={() => setCurrentPage("brand")}
          />
        );
      case "brand":
        return (
          <BrandPage
            brandName={brandName}
            brandVision={brandVision}
            onBrandNameChange={setBrandName}
            onBrandVisionChange={setBrandVision}
            onNext={() => setCurrentPage("style")}
            onBack={() => setCurrentPage("api")}
          />
        );
      case "style":
        return (
          <StylePage
            selectedStyle={selectedStyle}
            onStyleSelect={setSelectedStyle}
            onNext={() => setCurrentPage("colors")}
            onBack={() => setCurrentPage("brand")}
          />
        );
      case "colors":
        return (
          <ColorsPage
            selectedColors={selectedColors}
            onColorsChange={setSelectedColors}
            onNext={() => setCurrentPage("generate")}
            onBack={() => setCurrentPage("style")}
          />
        );
      case "generate":
        return (
          <GeneratePage
            brandName={brandName}
            brandVision={brandVision}
            selectedStyle={selectedStyle}
            selectedColors={selectedColors}
            customPrompt={customPrompt}
            onCustomPromptChange={setCustomPrompt}
            onGeneratePrompt={generatePrompt}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generatedLogos={generatedLogos}
            onBack={() => setCurrentPage("colors")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Navigation */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <Navigation 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:col-span-3">
            {renderCurrentPage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
