"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video } from "lucide-react"
import Image from "next/image"
import { BookCallButton } from "./book-call-button"

export function HeroSection() {
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
    <section className="min-h-screen flex items-center justify-center bg-[#FFF8E7] px-8 py-20">
      <motion.div
        className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tip Column - Text */}
        <motion.div className="space-y-6 " variants={itemVariants}>
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-sm font-semibold text-primary">Virtual Assistant Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Your Business Deserves Calm, Focused Support
            </h1>
            <p className="text-lg text-foreground/70 text-balance leading-relaxed">
              At StoicVA, we help you create order amidst the chaos.
              Free your time, clear your mind, and focus on what truly matters; growth, strategy, and balance.
              Our professional virtual assistants handle your operations with quiet precision and unwavering reliability.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
            <Button asChild size="lg" className="rounded-full bg-[#800020]">
              <Link href="/hire-a-va">
                Hire a VA <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <div className="hidden md:flex gap-3 items-center justify-center">
              <BookCallButton />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Column - Image */}
        <motion.div variants={itemVariants} className="flex justify-center items-center">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <motion.div
              className="relative grid md:grid-cols-2 bg-gradient-to-br from-primary/10 to-[#7c5835]/10 rounded-3xl border-2 border-primary/20 p-8 flex items-center justify-center aspect-square gap-4 shadow-lg"
            >
              <img
                src="/calm-in-chaos.jpg"
                alt="Virtual Assistant"
                className="rounded-2xl w-full h-full object-cover"
              />
              <img
                src="/calm-in-chaos-2.jpg"
                alt="Virtual Assistant"
                className="rounded-2xl w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
