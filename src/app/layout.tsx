import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// app/layout.tsx

export const metadata: Metadata = {
  title: 'AFDSoftworks | Portafolio y Soluciones Digitales',
  description: 'Desarrollo web a medida: Next.js, Tailwind y Node.js. Conocé nuestros proyectos y servicios.',
  keywords: ['desarrollo web', 'Next.js', 'Tailwind', 'Node.js', 'AFDSoftworks', 'Uruguay'],
  authors: [{ name: 'AFDSoftworks' }],
  openGraph: {
    title: 'AFDSoftworks | Portafolio',
    description: 'Conocé nuestros proyectos y servicios.',
    url: 'https://tudominio.com',
    siteName: 'AFDSoftworks',
    locale: 'es_UY',
    type: 'website',
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
    icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
