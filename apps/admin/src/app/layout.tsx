import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataWeave Admin - Groove",
  description:
    "Dashboard amministrativa DataWeave by Groove per la gestione dei tenant e monitoraggio del sistema SaaS.",
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
