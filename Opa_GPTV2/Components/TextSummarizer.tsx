import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Zap, Copy, Check } from "lucide-react";
import { InvokeLLM } from "../integrations/Core";

export default function TextSummarizer() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState("medium");
  const [copied, setCopied] = useState(false);

  const summaryLengths = {
    short: "Kort (1-2 stycken)",
    medium: "Medium (3-4 stycken)",
    long: "Lång (5-6 stycken)"
  };

  const summarizeText = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    try {
      const lengthInstructions = {
        short: "Gör en mycket kort sammanfattning i 1-2 stycken.",
        medium: "Gör en sammanfattning i 3-4 stycken.",
        long: "Gör en detaljerad sammanfattning i 5-6 stycken."
      };

      const response = await InvokeLLM({
        prompt: `Du är expert på att skapa tydliga och informativa sammanfattningar. Din uppgift är att sammanfatta följande text.

Instruktioner:
- ${lengthInstructions[summaryLength]}
- Behåll alla viktiga punkter och huvudbudskap
- Använd tydligt och lättläst språk
- Skriv på svenska
- Gör sammanfattningen engagerande och informativ
- Strukturera texten med tydliga stycken

Text att sammanfatta:
${inputText}

Skriv sammanfattningen:`,
        add_context_from_internet: false
      });
      
      setOutputText(response);
    } catch (error) {
      setOutputText("Ett fel uppstod vid sammanfattning av texten. Försök igen.");
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
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Zap className="w-5 h-5" />
            Text Input
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Klistra in den långa text du vill sammanfatta här..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] border-orange-200 focus:border-orange-400 focus:ring-orange-200"
          />
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={summaryLength} onValueChange={setSummaryLength}>
              <SelectTrigger className="border-orange-200">
                <SelectValue placeholder="Välj längd på sammanfattning" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(summaryLengths).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              onClick={summarizeText}
              disabled={!inputText.trim() || loading}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sammanfattar...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Sammanfatta Text
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
                <Zap className="w-5 h-5 text-orange-600" />
                Sammanfattning
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-orange-200 hover:bg-orange-50"
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