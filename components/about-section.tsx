"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Target, Users, Award } from "lucide-react"

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 bg-secondary/50 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top Side - Text */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div>
              <p className="text-sm font-semibold text-primary mb-2">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold">Meet Your Business Partner</h2>
            </div>

            <p className="text-lg text-foreground/70 leading-relaxed">
              StoicVA was founded on a simple principle; that focus and composure create excellence.
              We help ambitious entrepreneurs and teams reclaim their time and mental space, so they can lead with intention.
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Our VAs are more than task managers; they&apos;re steady hands trained to anticipate needs, simplify workflows, and uphold consistency.
              We believe success is a byproduct of stillness in motion; and we embody that in every partnership.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card className="p-4 border-2 bg-background">
                <p className="text-3xl font-bold text-primary mb-1">300+</p>
                <p className="text-sm text-foreground/60">Happy Clients</p>
              </Card>
              <Card className="p-4 border-2 bg-background">
                <p className="text-3xl font-bold text-primary mb-1">1K+</p>
                <p className="text-sm text-foreground/60">Hours Freed</p>
              </Card>
            </div>
          </motion.div>

          {/* Bottom Side - Values */}
          <motion.div className="space-y-6 max-w-2xl mx-auto" variants={containerVariants}>
            {[
              {
                icon: Target,
                title: "Stoic Focus",
                description: "We remain calm and centered, no matter how complex the task.",
              },
              {
                icon: Users,
                title: "Purposeful Partnership",
                description: "We work alongside you, not behind you — aligned with your mission.",
              },
              {
                icon: Award,
                title: "Excellence Without Noise",
                description: "Quiet confidence. Flawless execution. Always.",
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-6 border-2 hover:border-primary/50 transition-colors">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{value.title}</h3>
                        <p className="text-sm text-foreground/60">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
