"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

export function HireForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    tasks: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit request")
      }

      setSubmitted(true)
      // No automatic reset - success card stays until page refresh
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-8 md:p-12 border border-border shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-[#800020]">Tell Us About Your Needs</h3>
            <p className="text-foreground/60">
              Fill out this form and we'll match you with the perfect VA for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">What tasks do you need help with?</label>
            <Textarea
              name="tasks"
              value={formData.tasks}
              onChange={handleChange}
              placeholder="E.g., Email management, scheduling, social media, customer support..."
              rows={4}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
            {loading ? "Submitting..." : "Find My VA"}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 text-sm">{error}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setError("")}
              >
                Try Again
              </Button>
            </div>
          )}

          <p className="text-xs text-foreground/50 text-center">
            We'll get back to you within 24 hours with personalized recommendations.
          </p>
        </form>
      ) : (
        <motion.div
          className="text-center py-12 space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-teal-500" />
          </div>
          <div className="space-y-4">
            <h4 className="text-3xl font-bold text-gray-800">We've Received Your Request!</h4>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-teal-800 font-medium mb-2">
                Thank you, {formData.firstName}!
              </p>
              <p className="text-teal-700 text-sm leading-relaxed">
                Your VA requirements have been submitted successfully. Our team will review your needs and send personalized recommendations to <strong>{formData.email}</strong> within 24 hours.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-gray-600 text-sm">
                <strong>What's next?</strong><br/>
                • We'll match you with qualified VAs<br/>
                • Receive profiles within 24 hours<br/>
                • Schedule interviews with top candidates
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-6">
              Refresh the page if you need to submit another request.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
