import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { Watermark } from "@/components/watermark"
import "./globals.css"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Virtual Assistant Services | Professional VA Support | FridahVA",
  description:
    "Professional virtual assistant services to streamline your business operations. Hire a trained VA to handle scheduling, emails, and more. Free consultation available.",
  keywords: ["virtual assistant", "VA services", "business support", "remote assistant"],
  openGraph: {
    title: "Virtual Assistant Services | FridahVA",
    description: "Professional virtual assistant services to streamline your business operations.",
    type: "website",
    url: "https://fridahva.vercel.app",
    images: [
      {
        url: "https://fridahva.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Assistant Services | Fridahva",
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
  applicationName: "Fridahva",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fridahva",
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
        <link rel="canonical" href="https://fridahva.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fridahva",
              url: "https://fridahva.vercel.app",
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
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Watermark />
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
