import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getPostsPage } from '@/lib/mdx'
import { ResourcesGrid } from '@/components/resources-grid'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ResourcesPage() {
    const { posts, pagination } = getPostsPage(1, 6)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            {/* Hero Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#800020] mb-4">
                        Insights & Guides
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Practical articles to help you delegate smarter and work calmer.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <ResourcesGrid posts={posts} pagination={pagination} />

            <Footer />
        </div>
    )
}