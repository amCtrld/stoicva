"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookCallButton } from "@/components/book-call-button"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#800020] shadow-lg" : "bg-[#800020]/80"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Image src="/goldLogo.png" alt="StoicVA Logo" width={40} height={40} className="hover:animate-ping" />
            <Link href="/" className="text-2xl font-thin text-[#D4AF37] ml-2">
              StoicVAs
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/#how-it-works" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="/#about" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/#services" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/testimonials" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/resources" className="text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              Resources
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <Button variant="outline" className="border-[#d4af37] bg-transparent hover:bg-[#d4af37] text-[#d4af37]" asChild>
              <Link href="/hire-a-va">Hire a VA</Link>
            </Button>
            <BookCallButton />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="/#how-it-works" className="block text-sm text-[#FFF8E7] hover:text-foreground">
              How It Works
            </Link>
            <Link href="/services" className="block text-sm text-[#FFF8E7] hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/#about" className="block text-sm text-[#FFF8E7] hover:text-foreground">
              About
            </Link>
            <Link href="/testimonials" className="block text-sm text-[#FFF8E7] hover:text-foreground">
              Testimonials
            </Link>
            <Link href="/#contact" className="block text-sm text-[#FFF8E7] hover:text-foreground">
              Contact
            </Link>
            <Link href="/resources" className="block text-sm text-[#FFF8E7] hover:text-foreground">
              Resources
            </Link>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/hire-a-va">Hire a VA</Link>
            </Button>
            <BookCallButton />
          </div>
        )}
      </div>
    </nav>
  )
}
