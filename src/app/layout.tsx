import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>

        <meta name="title" content="lluna" />
        <meta name="description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />




        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.lluna.in" />
        <meta property="og:title" content="lluna" />
        <meta property="og:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="og:image" content="./banner.png" />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://app.lluna.in" />
        <meta property="twitter:title" content="lluna" />
        <meta property="twitter:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="twitter:image" content="./banner.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >

        <main className="relative z-10">
          {children}
          <Analytics />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
