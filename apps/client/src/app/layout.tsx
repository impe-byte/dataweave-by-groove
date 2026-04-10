import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataWeave - Portale Clienti",
  description:
    "Portale clienti DataWeave by Groove per il caricamento documenti DDT, verifica interattiva e export XML.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
