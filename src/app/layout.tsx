import type { Metadata } from "next";
import { Geist, Hanken_Grotesk, Inter, JetBrains_Mono, Open_Sans, Roboto } from "next/font/google";
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

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-android-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const openSans = Open_Sans({
  variable: "--font-nodejs-open-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-prisma-inter",
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
    // Dark by default (also without JavaScript). suppressHydrationWarning: the inline script
    // below switches data-theme to "light" before React hydrates if the visitor chose light.
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} ${geist.variable} ${roboto.variable} ${openSans.variable} ${inter.variable} h-full antialiased`}
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
