
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, ExternalLink, Shield, Zap } from "lucide-react";

interface ApiPageProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onNext: () => void;
}

const ApiPage = ({ apiKey, onApiKeyChange, onNext }: ApiPageProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            API Configuration
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect to Runware AI to generate stunning, professional logos for your brand
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 border-2 hover:border-primary/30 transition-colors">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Secure API Setup</h2>
            </div>
            
            <div>
              <Label htmlFor="apiKey" className="text-lg font-medium">Runware API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your Runware API key"
                className="mt-3 h-12 text-lg"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Your API key is stored securely and only used for logo generation
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
              <ExternalLink className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Need an API key?</p>
                <a 
                  href="https://runware.ai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Get your free API key from runware.ai →
                </a>
              </div>
            </div>

            <Button 
              onClick={onNext}
              disabled={!apiKey.trim()}
              className="w-full h-12 text-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              Continue to Brand Setup
            </Button>
          </div>
        </Card>

        <Card className="p-8 border-2 border-accent/30">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Why Runware AI?
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <h4 className="font-medium">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">Generate logos in seconds with advanced AI</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <h4 className="font-medium">High Quality</h4>
                <p className="text-sm text-muted-foreground">Professional-grade logos ready for any use</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div>
                <h4 className="font-medium">Customizable</h4>
                <p className="text-sm text-muted-foreground">Perfect control over style, colors, and design</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <h4 className="font-medium">Commercial Ready</h4>
                <p className="text-sm text-muted-foreground">Full rights to use generated logos commercially</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiPage;
