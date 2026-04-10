import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataWeave Admin — Groove",
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
      <body className="bg-slate-50 font-sans text-slate-900 antialiased">
        {/* ── Shell Layout: Sidebar + Content ── */}
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-64 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-7xl px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
