import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

// app/layout.tsx

export const metadata: Metadata = {
  title: 'AFD | Sitios web modernos que funcionan',
  description: 'Creamos e-commerce, landing pages, sitios corporativos y portfolios. Desarrollo web profesional a medida en Uruguay.',
  keywords: ['desarrollo web', 'e-commerce', 'landing pages', 'sitios corporativos', 'portfolios', 'AFD', 'Uruguay', 'desarrollo web uruguay', 'programación web'],
  authors: [{ name: 'AFD' }],
  openGraph: {
    title: 'AFD | Sitios web modernos que funcionan',
    description: 'Creamos e-commerce, landing pages, sitios corporativos y portfolios. Desarrollo web profesional.',
    url: 'https://afdsoftworks.com',
    siteName: 'AFD Softworks',
    locale: 'es_UY',
    type: 'website',
    images: [
      {
        url: 'https://afdsoftworks.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AFD Softworks - Desarrollo Web Profesional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AFD | Sitios web modernos que funcionan',
    description: 'Desarrollo web profesional - E-commerce, landing pages y más',
    images: ['https://afdsoftworks.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://afdsoftworks.com',
  },
  // Next.js App Router automatically handles icons in src/app/
  // favicon.ico, apple-icon.png, icon0.svg, icon1.png
  verification: {
    google: '', // Agregar tu código de verificación de Google Search Console aquí
  },
}

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#F5F1E8" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
