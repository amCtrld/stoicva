"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Clock, Users, Zap, Shield, TrendingUp, HeartHandshake } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save 20+ Hours Weekly",
    description: "Free up your schedule from administrative tasks and focus on strategy.",
  },
  {
    icon: Users,
    title: "Expert Match",
    description: "We carefully vet and match VAs to your specific business needs.",
  },
  {
    icon: Zap,
    title: "Quick Onboarding",
    description: "Get started within days, not weeks. Seamless integration with your team.",
  },
  {
    icon: Shield,
    title: "Fully Trained",
    description: "All our VAs are screened, trained, and ready to help immediately.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Support",
    description: "Grow your team as your business scales, without hiring overhead.",
  },
  {
    icon: HeartHandshake,
    title: "24/7 Availability",
    description: "Round-the-clock support when you need it most.",
  },
]

export function HireBenefits() {
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
    <section className="py-20 bg-background px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#800020]" variants={itemVariants}>
            Why Choose us?
          </motion.h2>
          <motion.p className="text-lg text-foreground/60 max-w-2xl mx-auto" variants={itemVariants}>
            Everything you need to succeed with your virtual assistant
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-1 gap-6 items-center justify-center w-[50vw] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full border-2 border-[#D4AF37]/50 hover:border-primary/50 transition-all hover:shadow-lg">
                  <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
