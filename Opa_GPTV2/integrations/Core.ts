// Mock implementations for development and GitHub Pages deployment

export async function InvokeLLM({ prompt, add_context_from_internet = false }: { 
  prompt: string; 
  add_context_from_internet?: boolean 
}): Promise<string> {
  // Mock response for development
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock responses based on prompt content
      if (prompt.includes('humanize') || prompt.includes('mänsklig')) {
        resolve("Det här är en mänsklig version av texten. Den låter naturlig och vardaglig, typ som en vanlig person skulle prata. Alltså, det är ju så här man faktiskt skriver när man inte använder AI, eller hur?");
      } else if (prompt.includes('rewrite') || prompt.includes('omskriv')) {
        resolve("Här är en omskriven version av din text. Den har förbättrats med bättre struktur och tydligare språk.");
      } else if (prompt.includes('summarize') || prompt.includes('sammanfatta')) {
        resolve("Sammanfattning: Detta är en kort version av din text som behåller de viktigaste punkterna.");
      } else if (prompt.includes('translate') || prompt.includes('översätt')) {
        resolve("This is the translated text in English. It maintains the original meaning while being natural in the target language.");
      } else {
        resolve("Detta är en mock-respons från AI-systemet. I en riktig implementation skulle detta vara en faktisk AI-svar.");
      }
    }, 2000);
  });
}

export async function UploadFile({ file }: { file: File }): Promise<{ file_url: string }> {
  // Mock file upload
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ file_url: `https://mock-storage.com/files/${file.name}` });
    }, 1000);
  });
}

export async function ExtractDataFromUploadedFile({ 
  file_url, 
  json_schema 
}: { 
  file_url: string; 
  json_schema: any 
}): Promise<{ status: string; output?: any }> {
  // Mock PDF extraction
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        output: {
          text: "Detta är en mock-extraherad text från PDF-filen. I en riktig implementation skulle detta vara den faktiska texten från PDF:en."
        }
      });
    }, 2000);
  });
}