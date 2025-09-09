# TextTools - AI Text Processing Tools

En samling kraftfulla AI-verktyg för att transformera, förbättra och arbeta med dina texter. Allt på ett ställe, enkelt och effektivt.

## 🚀 Funktioner

- **Text Humanizer** - Gör AI-genererad text mer mänsklig och naturlig
- **Text Rewriter** - Omskriv text på olika sätt och stilar
- **PDF to Text** - Konvertera PDF-filer till redigerbar text
- **Text Summarizer** - Sammanfatta långa texter till kortare versioner
- **Text Translator** - Översätt text mellan olika språk

## 🛠️ Teknisk Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animationer
- **Lucide React** - Ikoner
- **Radix UI** - UI komponenter

## 📦 Installation

1. Klona repositoryt:
```bash
git clone https://github.com/ditt-användarnamn/Opa_GPTV2.git
cd Opa_GPTV2
```

2. Installera dependencies:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## 🚀 Deployment till GitHub Pages

Denna applikation är konfigurerad för automatisk deployment till GitHub Pages:

1. Pusha koden till `main` branch
2. GitHub Actions kommer automatiskt att bygga och deploya applikationen
3. Din webbplats kommer att vara tillgänglig på: `https://ditt-användarnamn.github.io/Opa_GPTV2/`

### Manuell deployment

```bash
npm run build
npm run export
```

## 📁 Projektstruktur

```
Opa_GPTV2/
├── app/                    # Next.js app directory
│   ├── globals.css        # Globala stilar
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Huvudsida
├── Components/            # React komponenter
│   ├── PdfToText.tsx
│   ├── TextHumanizer.tsx
│   ├── TextRewriter.tsx
│   ├── TextSummarizer.tsx
│   └── TextTranlator.tsx
├── components/ui/         # UI komponenter
├── integrations/          # Mock integrations
├── lib/                   # Utility functions
├── Pages/                 # Sidor
└── .github/workflows/     # GitHub Actions
```

## 🔧 Konfiguration

### Environment Variables

För produktionsanvändning, skapa en `.env.local` fil med:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Mock Integrations

Applikationen använder för närvarande mock integrations för utveckling. För att använda riktiga AI-tjänster, ersätt funktionerna i `integrations/Core.ts`.

## 📝 Skript

- `npm run dev` - Starta utvecklingsservern
- `npm run build` - Bygg för produktion
- `npm run start` - Starta produktionsservern
- `npm run lint` - Kör ESLint
- `npm run export` - Exportera statiska filer för GitHub Pages

## 🤝 Bidrag

1. Forka projektet
2. Skapa en feature branch (`git checkout -b feature/AmazingFeature`)
3. Commita dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Pusha till branchen (`git push origin feature/AmazingFeature`)
5. Öppna en Pull Request

## 📄 Licens

Distribuerat under MIT-licensen. Se `LICENSE` för mer information.

## 📞 Kontakt

Ditt namn - [@ditt-twitter](https://twitter.com/ditt-twitter) - email@example.com

Projektlänk: [https://github.com/ditt-användarnamn/Opa_GPTV2](https://github.com/ditt-användarnamn/Opa_GPTV2)