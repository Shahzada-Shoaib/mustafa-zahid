import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://mustafazahid.com'),
  title: "Music Classes | Professional Singing, Guitar & Piano Lessons",
  description: "Join professional music classes. Learn guitar, singing, and piano. Available at studio or at home. Expert music education for all levels in Pakistan.",
  keywords: "music classes, singing lessons, guitar classes, piano classes, vocal training, music education, learn music online, music classes in Pakistan, singing classes Karachi, guitar lessons Lahore, piano classes Islamabad",
  
  openGraph: {
    title: "Music Classes - Professional Singing, Guitar & Piano Lessons",
    description: "Learn music with professional classes - Guitar, Singing, Piano. Available at studio or at home.",
    url: "https://mustafazahid.com/music-classes",
    siteName: "Music Classes",
    images: [
      {
        url: "/mz-logo.png",
        width: 1200,
        height: 630,
        alt: "Music Classes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Music Classes - Professional Lessons",
    description: "Learn music with professional classes",
    images: ["/mz-logo.png"],
  },
  
  alternates: {
    canonical: "https://mustafazahid.com/music-classes",
  },
};

export default function MusicClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

