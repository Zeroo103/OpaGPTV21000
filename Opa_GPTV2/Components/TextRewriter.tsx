import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { RefreshCw, Copy, Check } from "lucide-react";
import { InvokeLLM } from "../integrations/Core";

export default function TextRewriter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [rewriteType, setRewriteType] = useState("improve");
  const [copied, setCopied] = useState(false);

  const rewriteTypes = {
    improve: "Förbättra kvaliteten",
    simplify: "Förenkla språket",
    expand: "Utöka innehållet",
    shorten: "Förkorta texten",
    professional: "Gör mer professionell",
    creative: "Gör mer kreativ"
  };

  const rewriteText = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    try {
      const prompts = {
        improve: `Förbättra följande text genom att göra den mer engagerande, tydlig och välskriven. Behåll det ursprungliga budskapet men förbättra kvaliteten:`,
        simplify: `Skriv om följande text för att göra den enklare att förstå. Använd enkla ord och kortare meningar:`,
        expand: `Utöka följande text med mer detaljer, exempel och förklaringar. Gör den mer omfattande och informativ:`,
        shorten: `Förkorta följande text till dess viktigaste punkter. Behåll kärnbudskapet men gör det mer koncist:`,
        professional: `Skriv om följande text i en mer professionell och formell ton:`,
        creative: `Skriv om följande text på ett mer kreativt och engagerande sätt:`
      };

      const response = await InvokeLLM({
        prompt: `${prompts[rewriteType]}

Text att skriva om:
${inputText}

Skriv den omskrivna versionen på svenska:`,
        add_context_from_internet: false
      });
      
      setOutputText(response);
    } catch (error) {
      setOutputText("Ett fel uppstod vid omskrivning av texten. Försök igen.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <RefreshCw className="w-5 h-5" />
            Text Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Klistra in texten du vill skriva om här..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] border-blue-200 focus:border-blue-400 focus:ring-blue-200"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={rewriteType} onValueChange={setRewriteType}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Välj typ av omskrivning" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(rewriteTypes).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              onClick={rewriteText}
              disabled={!inputText.trim() || loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Skriver om...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Skriv om Text
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {outputText && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                Omskriven Text
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-blue-200 hover:bg-blue-50"
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}