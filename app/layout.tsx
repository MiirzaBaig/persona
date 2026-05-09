import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"
import LenisProvider from "@/components/lenis-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
    images: [
      {
        url: "/opengraph-image-v2.png",
        width: 1681,
        height: 936,
        alt: "Mirza Baig Open Graph image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirza Baig — Full-Stack Engineer",
    description:
      "Polished web products, production backends, payment flows, and data-heavy dashboards.",
    images: ["/opengraph-image-v2.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LenisProvider />
          <Nav />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 300;
