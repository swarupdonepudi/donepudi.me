import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/content';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.featured_image ? [post.frontmatter.featured_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Add padding-top to account for fixed nav */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      {post.frontmatter.featured_image && (
        <div className="w-full max-h-[500px] overflow-hidden bg-gray-900 flex items-center justify-center">
          <img
            src={post.frontmatter.featured_image}
            alt={post.frontmatter.title}
            className="w-full h-auto max-h-[500px] object-contain"
          />
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-12">
          {/* Title and metadata */}
          <header className="mb-8 pb-8 border-b border-cyan-500/20">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <time dateTime={post.frontmatter.date} className="text-sm">
                {formatDate(post.frontmatter.date)}
              </time>
              
              {post.frontmatter.author && (
                <>
                  <span className="text-cyan-500/50">·</span>
                  <span className="text-sm">By {post.frontmatter.author}</span>
                </>
              )}
              
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <>
                  <span className="text-cyan-500/50">·</span>
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Markdown content */}
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Back to blog link */}
        <div className="mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-md text-sm font-medium text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </article>
    </div>
  );
}

