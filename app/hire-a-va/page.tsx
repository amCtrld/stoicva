import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { HireForm } from "@/components/hire-form"
import { HireBenefits } from "@/components/hire-benefits"
import { BookCallButton } from "@/components/book-call-button"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Hire a Virtual Assistant | Professional VA Matching | Fridahva",
  description:
    "Find your perfect virtual assistant with Fridahva. Quick screening, personalized matching, and fast onboarding for entrepreneurs and small businesses. Get a free consultation today.",
  keywords: [
    "hire virtual assistant",
    "VA services",
    "remote assistant hire",
    "business support",
    "virtual assistant matching",
  ],
  openGraph: {
    title: "Hire a Virtual Assistant | Fridahva",
    description: "Find your perfect virtual assistant with personalized matching and fast onboarding.",
    type: "website",
    url: "https://fridahva.vercel.app/hire-a-va",
    images: [
      {
        url: "https://fridahva.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hire a Virtual Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire a Virtual Assistant | Fridahva",
    description: "Find your perfect virtual assistant with personalized matching.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://fridahva.vercel.app/hire-a-va",
  },
}

export default function HireVAPage() {
  return (
    <div className="min-h-screen bg-[#fff8e7]">
      <Navigation />

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-primary/10 to-background px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#800020]">Get your ideal virtual assistant</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto mb-8">
            Let us match you with the ideal VA for your business. Quick screening, personalized recommendations, and
            fast onboarding.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <HireForm />
        </div>
      </section>

      {/* Benefits Section */}
      <HireBenefits />

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#800020]">Ready to grow your business?</h2>
          <p className="text-lg text-foreground/60 mb-8">Schedule a brief call with our team to discuss your needs.</p>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3 items-center justify-center">
            <BookCallButton />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
