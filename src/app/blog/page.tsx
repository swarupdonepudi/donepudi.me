import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/content';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Blog | Swarup Donepudi',
  description: 'Thoughts on platform engineering, DevOps, and building infrastructure at scale',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Header - add padding-top to account for fixed nav */}
      <div className="pt-20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-400">
            Thoughts on platform engineering, DevOps, and building infrastructure at scale
          </p>
        </div>
      </div>

      {/* Blog posts */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {posts.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10">
                  {post.frontmatter.featured_image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={post.frontmatter.featured_image}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <time dateTime={post.frontmatter.date} className="text-gray-400">
                        {formatDate(post.frontmatter.date)}
                      </time>
                      {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                        <>
                          <span className="text-cyan-500/50">·</span>
                          <div className="flex gap-2">
                            {post.frontmatter.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-gray-400 text-base">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

