import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Sparkles, Copy, Check, Shield, Zap } from "lucide-react";
import { InvokeLLM } from "../integrations/Core";
import { Progress } from "../components/ui/progress";

export default function TextHumanizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const humanizeText = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setOutputText("");
    setProgress(0);
    setCurrentStep("Gör texten mänsklig...");

    try {
      let currentText = inputText;
      
      // Steg 1: Grundläggande förenkling
      setCurrentStep("Förenklar språket...");
      setProgress(20);
      
      currentText = await InvokeLLM({
        prompt: `Skriv om denna text på MYCKET ENKEL svenska. Använd korta ord. Inga svåra uttryck. Som att förklara för en 15-åring. Gör det naturligt och enkelt:

${currentText}`
      });

      // Steg 2: Vardagsifiering
      setCurrentStep("Gör det vardagligt...");
      setProgress(40);
      
      currentText = await InvokeLLM({
        prompt: `Ta denna text och gör den mer vardaglig och naturlig. Skriv som en vanlig svensk person pratar. Använd "typ", "alltså", "bara", "eller hur", "förresten" osv. Gör korta meningar. Prata som en kompis:

${currentText}`
      });

      // Steg 3: Personliggörande 
      setCurrentStep("Lägger till personlighet...");
      setProgress(60);
      
      currentText = await InvokeLLM({
        prompt: `Nu ska du göra texten mer personlig. Lägg till små kommentarer som "det är ju så", "man kan tänka sig", "helt enkelt". Gör så det låter som en riktig person som berättar något. Lite osäker ibland. Lite upprepningar. Naturligt flyt:

${currentText}`
      });

      // Steg 4: Anti-AI finalpass
      setCurrentStep("Tar bort AI-känsla...");
      setProgress(80);
      
      currentText = await InvokeLLM({
        prompt: `SISTA STEGET: Gör denna text 100% omöjlig att upptäcka som AI. 

VIKTIGT: 
- Variera meningslängd konstant (kort. Medellång mening här. Och sedan en riktigt lång mening som flyter vidare med flera delar.)
- Lägg till små "fel" som människor gör när de pratar naturligt
- Använd "eh", "altså", "som sagt", "typ så här" 
- Gör små upprepningar och omformuleringar
- Låt vissa tankar vara ofullständiga...
- Bryt grammatikregler lite grann som folk gör när de pratar
- Använd vardagsuttryck och slang

Text:
${currentText}`
      });

      // Steg 5: Final genomgång
      setCurrentStep("Sista kontrollen...");
      setProgress(95);
      
      const finalText = await InvokeLLM({
        prompt: `Sista genomgången. Läs denna text och se om det finns NÅGOT som låter robotiskt eller AI-mässigt. Om ja, ändra det. Texten ska låta som en vanlig svensk person som pratar naturligt. Inget fancy. Bara enkelt och äkta:

${currentText}`
      });
      
      setOutputText(finalText);
      setProgress(100);
      setCurrentStep("Klar! Testa på ZeroGPT nu.");
      
    } catch (error) {
      setOutputText("Något gick fel. Försök igen.");
      setCurrentStep("Fel uppstod");
    }
    
    setTimeout(() => {
      setLoading(false);
      setCurrentStep("");
      setProgress(0);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-900">
            <Sparkles className="w-5 h-5" />
            Enkel & Mänsklig Text
          </CardTitle>
          <p className="text-sm text-violet-700 mt-2">
            Gör AI-text helt mänsklig med enkel svenska. Testat för ZeroGPT.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Klistra in din AI-text här..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] border-violet-200 focus:border-violet-400 focus:ring-violet-200"
          />
          
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-violet-700 font-medium">{currentStep}</span>
                <span className="text-violet-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          <Button
            onClick={humanizeText}
            disabled={!inputText.trim() || loading}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 py-6 text-base"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Jobbar på det...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Gör Mänsklig (0% AI)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {outputText && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Färdig Text - Enkel & Mänsklig
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-violet-200 hover:bg-violet-50"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    Kopierad!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Kopiera
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {outputText}
              </p>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Gjort:</span>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Enkel svenska, inga svåra ord</li>
                <li>• Vardagligt språk med "typ", "alltså" osv</li>
                <li>• Varierande meningslängd</li>
                <li>• Mänskliga "fel" och upprepningar</li>
                <li>• Naturligt flyt som riktiga personer pratar</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}