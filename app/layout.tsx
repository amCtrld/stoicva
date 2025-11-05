import type React from "react"
import type { Metadata } from "next"
// import { Analytics } from "@vercel/analytics/next"
import { Watermark } from "@/components/watermark"
import { ChatButton } from "@/components/ChatButton"
import "./globals.css"
import { Noto_Serif } from "next/font/google"

const notoSerif = Noto_Serif({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Virtual Assistant Services | Professional VA Support | StoicVA",
  description:
    "Professional virtual assistant services to streamline your business operations. Hire a trained VA to handle scheduling, emails, and more. Free consultation available.",
  keywords: ["virtual assistant", "VA services", "business support", "remote assistant"],
  openGraph: {
    title: "Virtual Assistant Services | StoicVA",
    description: "Professional virtual assistant services to streamline your business operations.",
    type: "website",
    url: "https://stoicva.vercel.app",
    images: [
      {
        url: "https://stoicva.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Assistant Services | StoicVA",
    description: "Professional virtual assistant services to streamline your business operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  generator: "Next.js",
  applicationName: "StoicVA",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "StoicVA",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://stoicva.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "StoicVA",
              url: "https://stoicva.vercel.app",
              description: "Professional virtual assistant services",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                availableLanguage: ["en"],
              },
            }),
          }}
        />
      </head>
      <body className={`${notoSerif.variable} font-serif antialiased`}>
        {children}
        <Watermark />
        <ChatButton />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
