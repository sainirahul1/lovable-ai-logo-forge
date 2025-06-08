
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
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = logoUrl;
    link.download = `${brandName.replace(/\s+/g, '_')}_logo_${index + 1}.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isGenerating) {
    return (
      <Card className="p-8 h-full border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Generating Your Logos</h3>
          <p className="text-muted-foreground mb-4">
            AI is crafting 2 unique designs for {brandName}...
          </p>
          <div className="flex space-x-1">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full bg-blue-400",
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
      <Card className="p-8 h-full border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
          <p className="text-muted-foreground">
            Configure your brand settings and API key, then click "Generate 2 Logos" to create unique designs.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Generated Logos</h3>
        <Button variant="outline" size="sm" className="border-2 border-blue-200 hover:bg-blue-100">
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        {logos.map((logoUrl, index) => (
          <div key={index} className="group">
            <Card className="p-4 hover:shadow-lg transition-all border-2 hover:border-purple-300 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Logo {index + 1}</h4>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadLogo(logoUrl, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity border-2 border-green-200 hover:bg-green-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300 overflow-hidden">
                <img 
                  src={logoUrl} 
                  alt={`${brandName} Logo ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div className="text-center hidden">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {brandName} Logo {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    High-resolution WEBP
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-200">
        <h4 className="font-semibold mb-2 text-sm">💡 Pro Tip</h4>
        <p className="text-sm text-muted-foreground">
          Each logo is generated as a high-resolution WEBP with transparent background, 
          perfect for use across all your branding materials.
        </p>
      </div>
    </Card>
  );
};

export default GeneratedLogos;
