"use client"

import Link from 'next/link'
import Image from 'next/image'
import { CalendarDays, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/date-utils'

const MotionCard = motion(Card)

interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  lastUpdated?: string
}

interface Pagination {
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface ResourcesGridProps {
  posts: PostMeta[]
  pagination: Pagination
}

export function ResourcesGrid({ posts, pagination }: ResourcesGridProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
            <p className="text-gray-600">Check back soon for insights and guides.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <MotionCard 
                  key={post.slug}
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/resources/${post.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.image || '/resources/images/default-cover.jpg'}
                        alt={post.title}
                        fill
                        className="shadow-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-900 text-[#800020] md:text-black md:group-hover:text-[#800020] transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-[#800020] hover:bg-[#800020] group-hover:text-white group-hover:border-[#7c5835] transition-all"
                      >
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Link>
                </MotionCard>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                {pagination.hasPrevPage && (
                  <Button variant="outline" asChild>
                    <Link href="/resources">
                      Previous
                    </Link>
                  </Button>
                )}
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={pageNum === pagination.currentPage ? "default" : "outline"}
                      size="sm"
                      asChild
                    >
                      <Link href={pageNum === 1 ? "/resources" : `/resources/page/${pageNum}`}>
                        {pageNum}
                      </Link>
                    </Button>
                  ))}
                </div>
                
                {pagination.hasNextPage && (
                  <Button variant="outline" asChild>
                    <Link href="/resources/page/2">
                      Next
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}