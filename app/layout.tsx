import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Analytics } from "@vercel/analytics/react"
import LenisProvider from "@/components/lenis-provider";
import GlobalFeatures from "@/components/global-features";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://persona-t82m.vercel.app"),
  title: "Mirza Baig — Full-Stack Engineer",
  description:
    "Full-stack engineer building polished web products, production backends, payment flows, and data-heavy dashboards with Next.js, TypeScript, and Node.js.",
  openGraph: {
    title: "Mirza Baig — Full-Stack Engineer",
    description:
      "Polished web products, production backends, payment flows, and data-heavy dashboards.",
    url: "https://persona-t82m.vercel.app",
    siteName: "Mirza Baig",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Baig — Full-Stack Engineer",
    description:
      "Polished web products, production backends, payment flows, and data-heavy dashboards.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${GeistMono.variable} ${ibmPlexArabic.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <LenisProvider />
            <Nav />
            {children}
            <Footer />
            <GlobalFeatures />
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 300;
