import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/resources')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  lastUpdated?: string
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  lastUpdated?: string
}

export function parseFrontMatter(content: string) {
  return matter(content)
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): PostData | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = parseFrontMatter(fileContents)

    // Simple markdown processing - convert basic markdown to HTML
    let processedContent = content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-gray-900 mb-2 mt-4">$1</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-[#7c5835] pl-6 italic text-gray-600 my-6">$1</blockquote>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[#7c5835] hover:text-[#5a3f26] underline transition-colors">$1</a>')
      .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
      .replace(/^(.+)$/gm, (match, p1) => {
        if (p1.startsWith('<')) return p1
        return `<p class="text-gray-700 leading-relaxed mb-4">${p1}</p>`
      })

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      image: data.image || '/resources/images/default-cover.jpg',
      lastUpdated: data.lastUpdated,
      content: processedContent,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null
      
      // Return only metadata, not content
      const { content, ...meta } = post
      return meta
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

export function getPostsPage(page: number, postsPerPage: number = 6) {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  return {
    posts: allPosts.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  }
}

export function getAdjacentPosts(currentSlug: string) {
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug)
  
  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null }
  }
  
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  
  return { prevPost, nextPost }
}