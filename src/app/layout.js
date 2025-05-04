import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerLens | Portfolio Adaptatif",
  description: "Un portfolio intelligent qui s'adapte aux recruteurs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 dark:text-white`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
