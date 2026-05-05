import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react"

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Nav />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const revalidate = 300;
