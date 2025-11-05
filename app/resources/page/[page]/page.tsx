import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getPostsPage } from '@/lib/mdx'
import { ResourcesGrid } from '@/components/resources-grid'

interface PageProps {
  params: Promise<{
    page: string
  }>
}

export default async function ResourcesPagePaginated({ params }: PageProps) {
  const { page } = await params
  const pageNum = parseInt(page)
  
  if (isNaN(pageNum) || pageNum < 1) {
    notFound()
  }
  
  const { posts, pagination } = getPostsPage(pageNum, 6)
  
  if (pageNum > pagination.totalPages && pagination.totalPages > 0) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insights & Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practical articles to help you delegate smarter and work calmer.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <ResourcesGrid posts={posts} pagination={pagination} />
    </div>
  )
}