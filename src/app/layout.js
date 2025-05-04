import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";

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
        <AuthProvider>
          <ProfileProvider>
            <Header />
            <main className="min-h-screen pt-16">
              {children}
            </main>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
