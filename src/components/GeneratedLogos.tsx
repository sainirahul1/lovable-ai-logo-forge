
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, RefreshCw, Sparkles } from "lucide-react";

interface GeneratedLogosProps {
  logos: string[];
  isGenerating: boolean;
  brandName: string;
}

const GeneratedLogos = ({ logos, isGenerating, brandName }: GeneratedLogosProps) => {
  const downloadLogo = (logoUrl: string, index: number) => {
    // In a real app, this would download the actual image
    console.log(`Downloading logo ${index + 1}:`, logoUrl);
  };

  if (isGenerating) {
    return (
      <Card className="p-8 h-full border-2 border-dashed border-primary/30">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Generating Your Logos</h3>
          <p className="text-muted-foreground mb-4">
            AI is crafting 3 unique designs for {brandName}...
          </p>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full bg-primary/30",
                  "animate-pulse"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (logos.length === 0) {
    return (
      <Card className="p-8 h-full border-2 border-dashed border-muted-foreground/30">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
          <p className="text-muted-foreground">
            Configure your brand settings and click "Generate 3 Logos" to create unique designs.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-2 border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Generated Logos</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        {logos.map((logo, index) => (
          <div key={index} className="group">
            <Card className="p-4 hover:shadow-lg transition-all border-2 hover:border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Logo {index + 1}</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadLogo(logo, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {brandName} Logo {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    High-resolution PNG
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/30">
        <h4 className="font-semibold mb-2 text-sm">💡 Pro Tip</h4>
        <p className="text-sm text-muted-foreground">
          Each logo is generated as a high-resolution PNG with transparent background, 
          perfect for use across all your branding materials.
        </p>
      </div>
    </Card>
  );
};

export default GeneratedLogos;
