"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, Tech Startup",
    content: "Transformed my business. Now I have actual work-life balance instead of 60+ hour weeks.",
    rating: 5,
    avatar: "/sarah-johnson.jpg",
  },
  {
    name: "Michael Chen",
    role: "Founder, E-commerce",
    content: "Our customer support improved 300%. VA handles everything seamlessly and proactively.",
    rating: 5,
    avatar: "/michael-chen.jpg",
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director",
    content: "Professional, quick to adapt, and takes initiative. Exactly what we needed.",
    rating: 5,
    avatar: "/emma-rodriguez.jpg",
  },
  {
    name: "David Kumar",
    role: "Consultant",
    content: "Skeptical at first, but the onboarding was effortless. Quality exceeded expectations.",
    rating: 5,
    avatar: "/david-kumar.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Small Business Owner",
    content: "Affordable and reliable. My VA is now an integral part of the team.",
    rating: 5,
    avatar: "/lisa-thompson.jpg",
  },
  {
    name: "James Wilson",
    role: "Agency Owner",
    content: "Best decision for scaling operations. Support quality is outstanding.",
    rating: 5,
    avatar: "/james-wilson.jpg",
  },
]

export function TestimonialsGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {testimonials.map((testimonial, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="p-6 h-full border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <p className="text-foreground/70 mb-6 leading-relaxed">{testimonial.content}</p>

            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
