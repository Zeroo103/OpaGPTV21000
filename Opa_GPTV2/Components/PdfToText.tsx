import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileImage, Upload, Copy, Check, FileText } from "lucide-react";
import { UploadFile, ExtractDataFromUploadedFile } from "../integrations/Core";

export default function PdfToText() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setExtractedText("");
    } else {
      alert("Vänligen välj en PDF-fil");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const convertPdfToText = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      // Upload the file first
      const { file_url } = await UploadFile({ file });
      
      // Extract text from the uploaded PDF
      const result = await ExtractDataFromUploadedFile({
        file_url,
        json_schema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Full text content from the PDF"
            }
          }
        }
      });

      if (result.status === "success" && result.output) {
        setExtractedText(result.output.text);
      } else {
        setExtractedText("Kunde inte extrahera text från PDF-filen. Försök med en annan fil.");
      }
    } catch (error) {
      setExtractedText("Ett fel uppstod vid konvertering av PDF:en. Försök igen.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            <FileImage className="w-5 h-5" />
            PDF Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? "border-emerald-400 bg-emerald-50" 
                : "border-emerald-200 hover:border-emerald-300"
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
              id="pdf-upload"
            />
            
            {!file ? (
              <div>
                <FileText className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dra och släpp din PDF här
                </h3>
                <p className="text-gray-600 mb-4">
                  eller klicka för att välja fil
                </p>
                <label htmlFor="pdf-upload">
                  <Button asChild className="bg-gradient-to-r from-emerald-500 to-teal-600">
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Välj PDF-fil
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div>
                <FileText className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {file.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={convertPdfToText}
                    disabled={loading}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Konverterar...
                      </>
                    ) : (
                      <>
                        <FileImage className="w-4 h-4 mr-2" />
                        Konvertera till Text
                      </>
                    )}
                  </Button>
                  <label htmlFor="pdf-upload">
                    <Button variant="outline" asChild className="border-emerald-200">
                      <span>Välj annan fil</span>
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {extractedText && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Extraherad Text
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-emerald-200 hover:bg-emerald-50"
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
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-96 overflow-y-auto">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                {extractedText}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}