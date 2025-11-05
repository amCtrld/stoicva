import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { TestimonialsGrid } from "@/components/testimonials-grid"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Client Testimonials & Success Stories | Virtual Assistant Reviews | StoicVA",
  description:
    "Read success stories from hundreds of business owners and entrepreneurs using StoicVA virtual assistants. See real results and transformations in business operations.",
  keywords: [
    "virtual assistant reviews",
    "client testimonials",
    "success stories",
    "VA reviews",
    "business transformation",
  ],
  openGraph: {
    title: "Client Testimonials & Success Stories | StoicVA",
    description: "See success stories from business owners using StoicVA.",
    type: "website",
    url: "https://stoicva.vercel.app/testimonials",
    images: [
      {
        url: "https://stoicva.vercel.app/og-image-2.jpg",
        width: 1200,
        height: 630,
        alt: "Client testimonials and success stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials | StoicVA",
    description: "See success stories from business owners using StoicVA.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://stoicva.vercel.app/testimonials",
  },
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/10 to-background px-4 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">What Our Clients Say</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Join hundreds of business owners who've transformed their operations with our virtual assistants.
          </p>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">More Success Stories</h2>
            <p className="text-foreground/60">See how businesses across industries are thriving with our support</p>
          </div>
          <TestimonialsGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to write your success story?</h2>
          <p className="text-lg text-foreground/60 mb-8">
            Join the community of growing businesses that have found their perfect VA.
          </p>
          <a
            href="/hire-a-va"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
