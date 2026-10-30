import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Background from "@/components/ui/Background";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Two variable fonts, so one file each covers every weight we use.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Will Padilla — Portfolio",
  description:
    "Software Engineer and Computer Science student at FEU Tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds data-theme before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body id="top" className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {/* Faint dot grid and drifting shapes under everything; see Background.tsx. */}
        <Background />
        {children}
      </body>
    </html>
  );
}
