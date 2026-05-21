import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

     <head>

        <meta name="title" content="Access Grid" />
        <meta name="description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />


        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.access-grid.in" />
        <meta property="og:title" content="Access Grid" />
        <meta property="og:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="og:image" content="./banner.png" />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://app.access-grid.in" />
        <meta property="twitter:title" content="Access Grid" />
        <meta property="twitter:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="twitter:image" content="./banner.png" />
      </head>

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
           <head>

        <meta name="title" content="Access Grid" />
        <meta name="description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />


        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://access-grid.in" />
        <meta property="og:title" content="Access Grid" />
        <meta property="og:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="og:image" content="./banner.png" />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://access-grid.in" />
        <meta property="twitter:title" content="Access Grid" />
        <meta property="twitter:description" content="This platform provides a centralized digital ecosystem to automate participant lifecycle management. From check-in to final judging" />
        <meta property="twitter:image" content="./banner.png" />
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
