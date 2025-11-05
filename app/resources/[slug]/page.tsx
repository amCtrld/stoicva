import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPostBySlug, getPostSlugs, getAdjacentPosts } from '@/lib/mdx'
import { formatDate } from '@/lib/date-utils'
import { Footer } from "@/components/footer"
import { ArticleContent } from '@/components/article-content'
import { Navigation } from "@/components/navigation"

interface PageParams {
    slug: string
}

export async function generateStaticParams(): Promise<PageParams[]> {
    const slugs = getPostSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Article Not Found — StoicVA',
        }
    }

    return {
        title: `${post.title} — StoicVA`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.lastUpdated || post.date,
            images: [
                {
                    url: post.image || '/resources/images/default-cover.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image || '/resources/images/default-cover.jpg'],
        },
    }
}

export default async function ArticlePage({ params }: { params: Promise<PageParams> }) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const { prevPost, nextPost } = getAdjacentPosts(slug)

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            {/* Back to Resources */}
            <div className="py-8 px-6">
                <div className="max-w-3xl mx-auto">
                    <Button variant="outline" className='border-[#800020] hover:bg-[#800020] text-[#800020] hover:text-white' asChild>
                        <Link href="/resources">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Resources
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Article Header */}
            <article className="pb-16">
                <header className="mb-12">
                    <div className="max-w-3xl mx-auto px-6">
                        {/* Featured Image */}
                        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src={post.image || '/resources/images/default-cover.jpg'}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Title and Meta */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#800020] mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center text-gray-500 mb-6">
                                <CalendarDays className="w-5 h-5 mr-2" />
                                <time dateTime={post.date}>
                                    {formatDate(post.date)}
                                </time>
                                {post.lastUpdated && post.lastUpdated !== post.date && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>Updated {formatDate(post.lastUpdated)}</span>
                                    </>
                                )}
                            </div>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                {post.excerpt}
                            </p>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                <ArticleContent content={post.content} />
            </article>

            {/* Navigation */}
            {(prevPost || nextPost) && (
                <section className="border-t py-16 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
                            Continue Reading
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {prevPost && (
                                <Card className="group hover:shadow-lg transition-all duration-300">
                                    <Link href={`/resources/${prevPost.slug}`}>
                                        <CardHeader>
                                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                                <ChevronLeft className="w-4 h-4 mr-1" />
                                                Previous Article
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-[#7c5835] transition-colors line-clamp-2">
                                                {prevPost.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {prevPost.excerpt}
                                            </p>
                                        </CardContent>
                                    </Link>
                                </Card>
                            )}

                            {nextPost && (
                                <Card className="group hover:shadow-lg transition-all duration-300">
                                    <Link href={`/resources/${nextPost.slug}`}>
                                        <CardHeader>
                                            <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                                                Next Article
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </div>
                                            <CardTitle className="text-lg group-hover:text-[#7c5835] transition-colors line-clamp-2 text-right">
                                                {nextPost.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm line-clamp-2 text-right">
                                                {nextPost.excerpt}
                                            </p>
                                        </CardContent>
                                    </Link>
                                </Card>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    )
}