import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, ExternalLink, Shield, Zap, CheckCircle } from "lucide-react";

interface ApiPageProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onNext: () => void;
}

const ApiPage = ({ apiKey, onApiKeyChange, onNext }: ApiPageProps) => {
  const hasApiKey = apiKey.trim().length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20">
            <Key className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            API Configuration
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect to Hugging Face to generate stunning, professional logos for your brand
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 border-2 hover:border-blue-500/30 transition-colors bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-500" />
              <h2 className="text-2xl font-semibold">Secure API Setup</h2>
            </div>
            
            <div>
              <Label htmlFor="apiKey" className="text-lg font-medium">Hugging Face API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your Hugging Face API key"
                className="mt-3 h-12 text-lg border-2 focus:border-blue-500"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Your API key is stored securely and only used for logo generation
              </p>
            </div>

            {hasApiKey && (
              <div className="flex items-center gap-3 p-4 bg-green-100 rounded-lg border border-green-200 animate-in slide-in-from-top-2 duration-300">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">API Added</p>
                  <p className="text-sm text-green-600">Your API key has been successfully configured</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-blue-100 rounded-lg border border-blue-200">
              <ExternalLink className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Need an API key?</p>
                <a 
                  href="https://huggingface.co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Get your free API key from huggingface.co →
                </a>
              </div>
            </div>

            <Button 
              onClick={onNext}
              disabled={!apiKey.trim()}
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Continue to Brand Setup
            </Button>
          </div>
        </Card>

        <Card className="p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Why Hugging Face?
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
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
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
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
