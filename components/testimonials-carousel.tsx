"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Tech Startup",
    content:
      "Hiring a VA through StoicVA completely transformed how I manage my business. I went from working 60+ hour weeks to actually having work-life balance. The matching process was incredibly smooth.",
    rating: 5,
    avatar: "/sarah-johnson.jpg",
  },
  {
    name: "Michael Chen",
    role: "Founder, E-commerce Brand",
    content:
      "The VA team has been instrumental in scaling our customer support. They handle emails, chat inquiries, and social media seamlessly. I couldn't imagine running our business without them now.",
    rating: 5,
    avatar: "/michael-chen.jpg",
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director",
    content:
      "What impressed me most was the professionalism and quick adaptation. Our VA understood our brand voice immediately and took initiative without micromanagement. Highly recommend!",
    rating: 5,
    avatar: "/emma-rodriguez.jpg",
  },
  {
    name: "David Kumar",
    role: "Consultant",
    content:
      "I was skeptical about hiring a remote VA, but StoicVA made it effortless. The onboarding was quick, communication is clear, and the quality of work exceeded expectations.",
    rating: 5,
    avatar: "/david-kumar.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Small Business Owner",
    content:
      "Affordable, reliable, and professional. My VA has become an integral part of my team. I appreciate how StoicVA handles all the administrative details so I can focus on growth.",
    rating: 5,
    avatar: "/lisa-thompson.jpg",
  },
]

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  return (
    <div className="space-y-8">
      <div className="relative h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Card className="h-full p-8 md:p-10 border-2 border-primary/20 bg-gradient-to-br from-background to-secondary">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-6 italic">{`"${testimonials[current].content}"`}</p>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonials[current].name}</p>
                    <p className="text-sm text-foreground/60">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                setAutoPlay(false)
              }}
              className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-primary" : "w-2 bg-border"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
