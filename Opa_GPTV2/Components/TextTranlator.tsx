import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Languages, Copy, Check, ArrowRight } from "lucide-react";
import { InvokeLLM } from "../integrations/Core";

export default function TextTranslator() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fromLanguage, setFromLanguage] = useState("auto");
  const [toLanguage, setToLanguage] = useState("english");
  const [copied, setCopied] = useState(false);

  const languages = {
    auto: "Auto-detektera",
    swedish: "Svenska",
    english: "Engelska",
    spanish: "Spanska", 
    french: "Franska",
    german: "Tyska",
    italian: "Italienska",
    portuguese: "Portugisiska",
    dutch: "Holländska",
    russian: "Ryska",
    chinese: "Kinesiska",
    japanese: "Japanska",
    korean: "Koreanska",
    arabic: "Arabiska"
  };

  const translateText = async () => {
    if (!inputText.trim() || toLanguage === fromLanguage) return;
    
    setLoading(true);
    try {
      const fromLang = fromLanguage === "auto" ? "auto-detected language" : languages[fromLanguage];
      const toLang = languages[toLanguage];

      const response = await InvokeLLM({
        prompt: `Du är en professionell översättare. Din uppgift är att översätta följande text på ett naturligt och korrekt sätt.

${fromLanguage === "auto" ? 
  `Detektera automatiskt vilket språk texten är skriven på och översätt den till ${toLang}.` : 
  `Översätt från ${fromLang} till ${toLang}.`}

Instruktioner:
- Översätt texten så naturligt och korrekt som möjligt
- Behåll tonläget och stilen från originaltexten
- Anpassa översättningen till målspråkets kultur och kontext
- Om det finns idiom eller uttryck, översätt till motsvarande uttryck på målspråket

Text att översätta:
${inputText}

Översatt text:`,
        add_context_from_internet: false
      });
      
      setOutputText(response);
    } catch (error) {
      setOutputText("Ett fel uppstod vid översättning av texten. Försök igen.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapLanguages = () => {
    if (fromLanguage !== "auto") {
      const temp = fromLanguage;
      setFromLanguage(toLanguage);
      setToLanguage(temp);
      setInputText(outputText);
      setOutputText(inputText);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-rose-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-900">
            <Languages className="w-5 h-5" />
            Språkinställningar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Select value={fromLanguage} onValueChange={setFromLanguage}>
              <SelectTrigger className="border-pink-200">
                <SelectValue placeholder="Från språk" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="icon"
              onClick={swapLanguages}
              disabled={fromLanguage === "auto"}
              className="border-pink-200 hover:bg-pink-50"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Select value={toLanguage} onValueChange={setToLanguage}>
              <SelectTrigger className="border-pink-200">
                <SelectValue placeholder="Till språk" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages)
                  .filter(([key]) => key !== "auto")
                  .map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          
          <Textarea
            placeholder="Klistra in texten du vill översätta här..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] border-pink-200 focus:border-pink-400 focus:ring-pink-200"
          />
          
          <Button
            onClick={translateText}
            disabled={!inputText.trim() || toLanguage === fromLanguage || loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Översätter...
              </>
            ) : (
              <>
                <Languages className="w-4 h-4 mr-2" />
                Översätt Text
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
                <Languages className="w-5 h-5 text-pink-600" />
                Översatt Text
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-pink-200 hover:bg-pink-50"
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