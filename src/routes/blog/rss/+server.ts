import { markdownText, type BlogPost } from "$lib/blogTypes";
import { getBlogPosts } from "$lib/server/blog";


export function GET() {
	let posts: BlogPost[] = getBlogPosts()

	const feedTitle = 'Illuminant Blog';
	const feedDescription = 'Yeah';
	const feedLink = 'http://localhost:5173/blog/rss';

	const rssXml = (posts: BlogPost[]) => `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>${feedTitle}</title>
    <link>${feedLink}</link>
    <description>${feedDescription}</description>
    <language>en-US</language>
    <pubDate>${new Date(Date.now()).toISOString()}</pubDate>
${posts.map((p) => `    <item>
          <title>${p.title}</title>
          <description>${markdownText(p.content)}</description>
          <pubDate>${p.publishDate.toISOString()}</pubDate>
        </item>`).join("\n")}
  </channel>
</rss>`;

	return new Response(rssXml(posts), {
		status: 200,
		headers: {
			"Content-Type": "application/xml"
		}
	});
}
