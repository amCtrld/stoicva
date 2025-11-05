"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Shield,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: FileText,
    title: "Executive & Administrative Support",
    subtitle: "Serenity through structure",
    description: "We manage the details so you can master the direction. Precision, discretion, and calm execution define our approach.",
    features: [
      "Inbox and calendar management",
      "Scheduling and appointment coordination", 
      "Travel planning and itinerary management",
      "Executive reporting and meeting summaries",
      "Document preparation and formatting",
      "CRM data entry and upkeep"
    ]
  },
  {
    icon: Users,
    title: "Business Operations & Client Services", 
    subtitle: "Steadfast operations for enduring growth",
    description: "We strengthen the backbone of your business — where reliability meets rhythm. Our focus is on continuity, clarity, and consistency.",
    features: [
      "Client onboarding and offboarding",
      "CRM management and pipeline tracking",
      "Proposal and contract creation", 
      "Payment and invoicing coordination",
      "Customer support (email/live chat)",
      "Product or service fulfillment follow-up"
    ]
  },
  {
    icon: BarChart3,
    title: "Marketing & Digital Presence Management",
    subtitle: "Composed marketing for meaningful impact", 
    description: "Stillness in presence. Strength in message. We shape your brand's voice with intention and consistency, ensuring it reflects both purpose and poise.",
    features: [
      "Social media management",
      "Content repurposing and copy editing",
      "Newsletter setup and distribution",
      "Blog publishing & SEO optimization", 
      "Graphic design (Canva, branded templates)",
      "Video editing for reels/stories"
    ]
  }
]

export function ServicesSection() {
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
    <section id="services" className="py-20 bg-[#FFF8E7] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#800020]" variants={itemVariants}>
            Our Services
          </motion.h2>
          <motion.p className="text-lg text-foreground/60 max-w-3xl mx-auto" variants={itemVariants}>
            We believe discipline is freedom, and calm is strength. At StoicVA, our role is to bring order where there is noise — so you can lead with clarity, focus, and peace of mind.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 md:p-12 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <div className="grid gap-8 items-start">
                    {/* Service Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary/20">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            {service.title}
                          </h3>
                          <p className="text-sm font-medium text-primary italic">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-foreground/70 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <Button asChild size="lg" className="rounded-full bg-[#800020] hover:bg-[#800020]/90">
                        <Link href="/hire-a-va">
                          Get Started <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground mb-6">
                        What We Handle:
                      </h4>
                      <div className="grid gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border border-primary/10"
                            variants={itemVariants}
                            custom={featureIndex}
                          >
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-foreground/80 text-sm">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="p-8 md:p-12 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#800020]">
              Ready to Bring Calm to Your Operations?
            </h3>
            <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
              Let's bring calm, control, and clarity to your operations. StoicVA — Composure meets competence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-[#800020] hover:bg-[#800020]/90">
                <Link href="/hire-a-va">
                  Hire a Virtual Assistant <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-primary">
                <Link href="#contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}