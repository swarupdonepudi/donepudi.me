import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllFastlaneEntries, getFastlaneEntry } from '@/lib/fastlane';
import { formatDate } from '@/lib/content';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import Header from '@/components/Header';

interface FastlaneEntryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const entries = await getAllFastlaneEntries();
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: FastlaneEntryPageProps): Promise<Metadata> {
  const entry = await getFastlaneEntry(params.slug);

  if (!entry) {
    return {
      title: 'Entry Not Found',
    };
  }

  return {
    title: `${entry.frontmatter.title} | Fastlane`,
    description: entry.excerpt,
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.excerpt,
      type: 'article',
      publishedTime: entry.frontmatter.date,
    },
  };
}

export default async function FastlaneEntryPage({ params }: FastlaneEntryPageProps) {
  const entry = await getFastlaneEntry(params.slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Content */}
      <article className="container mx-auto px-4 pt-28 pb-8 max-w-3xl">
        <div>
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-cyan-500/20">
            {/* Date */}
            <time
              dateTime={entry.frontmatter.date}
              className="block text-sm font-medium text-cyan-400 mb-4"
            >
              {formatDate(entry.frontmatter.date)}
            </time>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {entry.frontmatter.title}
            </h1>

            {/* Tags */}
            {entry.frontmatter.tags && entry.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Markdown content */}
          <MarkdownRenderer content={entry.content} />
        </div>

      </article>
    </div>
  );
}
