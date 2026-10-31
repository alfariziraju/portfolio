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

export const metadata = {
  title: "Radju Alfarizi — Full Stack JavaScript Developer",
  description:
    "Portofolio profesional Radju Alfarizi, Full Stack Developer yang berfokus pada ekosistem JavaScript modern (React, Next.js, Node.js, Express, SQLite).",
  keywords: [
    "Radju Alfarizi",
    "Full Stack Developer",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Portfolio Web",
  ],
  authors: [{ name: "Radju Alfarizi" }],
  openGraph: {
    title: "Radju Alfarizi — Full Stack JavaScript Developer",
    description:
      "Portofolio profesional Full Stack Developer dengan proyek nyata dan REST API modern.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
