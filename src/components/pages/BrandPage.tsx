
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Lightbulb, Target, Users } from "lucide-react";

interface BrandPageProps {
  brandName: string;
  brandVision: string;
  onBrandNameChange: (name: string) => void;
  onBrandVisionChange: (vision: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const BrandPage = ({ 
  brandName, 
  brandVision, 
  onBrandNameChange, 
  onBrandVisionChange, 
  onNext, 
  onBack 
}: BrandPageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20">
            <Wand2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Brand Identity
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tell us about your brand so we can create logos that perfectly represent your vision
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 border-2 hover:border-primary/30 transition-colors">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Brand Details</h2>
            </div>
            
            <div>
              <Label htmlFor="brandName" className="text-lg font-medium">Brand Name</Label>
              <Input
                id="brandName"
                value={brandName}
                onChange={(e) => onBrandNameChange(e.target.value)}
                placeholder="Enter your brand name"
                className="mt-3 h-12 text-lg"
              />
              <p className="text-sm text-muted-foreground mt-2">
                The name that will represent your brand
              </p>
            </div>

            <div>
              <Label htmlFor="brandVision" className="text-lg font-medium">Brand Vision</Label>
              <Textarea
                id="brandVision"
                value={brandVision}
                onChange={(e) => onBrandVisionChange(e.target.value)}
                placeholder="Describe your brand's mission, values, and what makes it unique..."
                className="mt-3 min-h-[120px] text-base resize-none"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Help us understand what your brand represents
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button 
                onClick={onNext}
                disabled={!brandName.trim() || !brandVision.trim()}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Continue to Style
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-accent/30">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Brand Vision Tips
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-primary mb-2">What to include:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Your company's mission and values</li>
                <li>• Target audience and market</li>
                <li>• What makes you unique</li>
                <li>• The feeling you want to convey</li>
              </ul>
            </div>
            
            <div className="p-4 bg-accent/20 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Example:
              </h4>
              <p className="text-sm text-muted-foreground italic">
                "We create sustainable tech solutions that empower small businesses to grow while protecting the environment. We value innovation, reliability, and making technology accessible to everyone."
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">💡 Pro tip:</p>
              <p>The more specific you are, the better we can tailor your logo to match your brand personality.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BrandPage;
