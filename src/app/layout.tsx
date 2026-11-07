import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090b",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AstraCV — Otimizador de Currículos Tech para ATS e Gupy",
  description:
    "Aumente suas chances de entrevista. Analise a aderência do seu currículo tech à vaga, identifique palavras-chave faltantes e gere um currículo calibrado para triagem automatizada com AstraCV.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden selection:bg-blue-500/25 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
