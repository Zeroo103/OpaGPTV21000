import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  FileText, 
  RefreshCw, 
  FileImage, 
  Zap, 
  Languages,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

import TextHumanizer from "../Components/TextHumanizer";
import TextRewriter from "../Components/TextRewriter";
import PdfToText from "../Components/PdfToText";
import TextSummarizer from "../Components/TextSummarizer";
import TextTranslator from "../Components/TextTranlator";

const tools = [
  {
    id: "humanizer",
    title: "Text Humanizer",
    description: "Gör AI-genererad text mer mänsklig och naturlig",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    component: TextHumanizer
  },
  {
    id: "rewriter",
    title: "Text Rewriter",
    description: "Omskriv text på olika sätt och stilar",
    icon: RefreshCw,
    color: "from-blue-500 to-cyan-600",
    component: TextRewriter
  },
  {
    id: "pdf",
    title: "PDF to Text",
    description: "Konvertera PDF-filer till redigerbar text",
    icon: FileImage,
    color: "from-emerald-500 to-teal-600",
    component: PdfToText
  },
  {
    id: "summarizer",
    title: "Text Summarizer",
    description: "Sammanfatta långa texter till kortare versioner",
    icon: Zap,
    color: "from-orange-500 to-red-600",
    component: TextSummarizer
  },
  {
    id: "translator",
    title: "Text Translator",
    description: "Översätt text mellan olika språk",
    icon: Languages,
    color: "from-pink-500 to-rose-600",
    component: TextTranslator
  }
];

export default function Home() {
  const [activeTool, setActiveTool] = useState(null);

  const ActiveComponent = activeTool?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Text<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Tools</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Kraftfulla AI-verktyg för att transformera, förbättra och arbeta med dina texter. 
              Allt på ett ställe, enkelt och effektivt.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        {!activeTool ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => setActiveTool(tool)}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Klicka för att börja
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => setActiveTool(null)}
                className="mb-4 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Tillbaka till verktyg
              </Button>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {activeTool.title}
              </h2>
              <p className="text-gray-600">
                {activeTool.description}
              </p>
            </div>
            <ActiveComponent />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 TextTools. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}