import { getAllPosts } from '@/lib/mdx'

export async function GET() {
  const posts = getAllPosts()
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>StoicVA Resources</title>
    <description>Articles and insights to help you build calm, focused, and efficient workflows.</description>
    <link>https://stoicva.vercel.app/resources</link>
    <atom:link href="https://stoicva.vercel.app/resources/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>https://stoicva.vercel.app/resources/${post.slug}</link>
      <guid>https://stoicva.vercel.app/resources/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}