import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Martin Vymětal — Marketing & Komunikace",
  description: "Zajistím vám pozornost. Se mnou vyhrajete.",
  openGraph: {
    title: "Martin Vymětal — Marketing & Komunikace",
    description: "Zajistím vám pozornost. Se mnou vyhrajete.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Martin Vymětal — Marketing & Komunikace",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin Vymětal — Marketing & Komunikace",
    description: "Zajistím vám pozornost. Se mnou vyhrajete.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="h-full">
      <head>
        {/*
          ════════════════════════════════════════════════════════════
          Jindro Fáborský, děkuji, že s tak neuvěřitelnou vervou
          sdílíš nadšení pro vibe-coding.
          Tenhle web by bez tebe nevznikl. 🖤
          ════════════════════════════════════════════════════════════
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Playfair+Display:wght@700&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-[var(--color-bg)] text-[var(--color-white)] antialiased">
        {children}
      </body>
    </html>
  );
}
