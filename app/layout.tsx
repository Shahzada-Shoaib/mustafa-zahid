import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
// import {metadata} from './metadata.ts';




// export const Metadata = metadata;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Mustafa Zahid - Official Website | Pakistani Singer & Lead Vocalist of Roxen",
  description: "Official website of Mustafa Zahid - Pakistani singer, songwriter, and lead vocalist of Roxen. Book for events, concerts, and performances. Listen to popular songs like Tu Phir Aao, Tera Mera Rishta Purana, and more.",
  keywords: "Mustafa Zahid, Roxen, Pakistani singer, music, Tu Phir Aao, Tera Mera Rishta Purana, Bhula Dena Mje, Zarorat, Hum Jee Lenge, Kaisey Jiyen, book Mustafa Zahid, Pakistani music",
  authors: [{ name: "Mustafa Zahid" }],
  openGraph: {
    title: "Mustafa Zahid - Official Website",
    description: "Pakistani singer, songwriter, and lead vocalist of Roxen. Book for events, concerts, and performances.",
    url: "https://mustafazahid.com",
    siteName: "Mustafa Zahid Official",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Mustafa Zahid",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Zahid - Official Website",
    description: "Pakistani singer, songwriter, and lead vocalist of Roxen",
    images: ["/mz-logo.png"],
    creator: "@Mustafology",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/mz-logo.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur">
      <head>
        <meta name="google-site-verification" content="oW0clPdrm9yaRdckWdVlmCtY9EQQ0UFI6PtZUpbu9eU" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
