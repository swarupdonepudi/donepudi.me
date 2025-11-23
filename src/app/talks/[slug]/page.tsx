import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTalks, getTalk, hasPresentationComponent } from '@/lib/talks';
import { formatDate } from '@/lib/content';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { ArrowLeft, Play, Calendar, MapPin, Users, Video, FileText, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import CopyMarkdownButton from './CopyMarkdownButton';

interface TalkPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const talks = await getAllTalks();
  return talks.map((talk) => ({
    slug: talk.slug,
  }));
}

export async function generateMetadata({ params }: TalkPageProps): Promise<Metadata> {
  const talk = await getTalk(params.slug);

  if (!talk) {
    return {
      title: 'Talk Not Found',
    };
  }

  return {
    title: `${talk.frontmatter.title} | Talks`,
    description: talk.frontmatter.excerpt,
    openGraph: {
      title: talk.frontmatter.title,
      description: talk.frontmatter.excerpt,
      type: 'article',
    },
  };
}

export default async function TalkPage({ params }: TalkPageProps) {
  const talk = await getTalk(params.slug);

  if (!talk) {
    notFound();
  }

  const hasPresentation = talk.frontmatter.has_presentation && hasPresentationComponent(params.slug);
  const isUpcoming = new Date(talk.frontmatter.date) > new Date();
  
  // Generate markdown content with frontmatter
  const markdownContent = `---
title: "${talk.frontmatter.title}"
event: "${talk.frontmatter.event}"
date: "${talk.frontmatter.date}"
location: "${talk.frontmatter.location || ''}"
audience_size: "${talk.frontmatter.audience_size || ''}"
excerpt: "${talk.frontmatter.excerpt || ''}"
has_presentation: ${talk.frontmatter.has_presentation || false}
status: "${talk.frontmatter.status || ''}"${talk.frontmatter.video_url ? `\nvideo_url: "${talk.frontmatter.video_url}"` : ''}${talk.frontmatter.slides_url ? `\nslides_url: "${talk.frontmatter.slides_url}"` : ''}
---

${talk.content}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Add padding-top to account for fixed nav */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <Link href="/talks" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Talks
          </Link>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header - always at top */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-12 mb-8 relative">
          {/* Copy Markdown Button - Top Right */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6">
            <CopyMarkdownButton content={markdownContent} />
          </div>

          <header className="mb-0">
            <div className="flex items-center gap-2 mb-4">
              {isUpcoming ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  Upcoming
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                  Completed
                </span>
              )}
              {hasPresentation && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30 text-cyan-400">
                  <Play className="w-3 h-3 mr-1" />
                  Presentation Available
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {talk.frontmatter.title}
            </h1>
            
            <p className="text-xl text-gray-300 font-medium mb-4">
              {talk.frontmatter.event}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <time dateTime={talk.frontmatter.date}>
                  {formatDate(talk.frontmatter.date)}
                </time>
              </div>
              
              {talk.frontmatter.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{talk.frontmatter.location}</span>
                </div>
              )}
              
              {talk.frontmatter.audience_size && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{talk.frontmatter.audience_size} attendees</span>
                </div>
              )}
            </div>
          </header>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content - body only */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-12">
              <MarkdownRenderer content={talk.content} />
            </div>
          </div>

          {/* Sidebar - shows between header and body on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              {/* Talk Info */}
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-white">
                    Talk Information
                  </h3>
                  <Link
                    href={`/talks/${params.slug}/organizer`}
                    className="text-gray-500 hover:text-cyan-400 transition-colors"
                    title="Organizer Notes"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                </div>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500 mb-1">Event</dt>
                    <dd className="text-gray-300 font-medium">
                      {talk.frontmatter.event}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500 mb-1">Date</dt>
                    <dd className="text-gray-300">
                      {formatDate(talk.frontmatter.date)}
                    </dd>
                  </div>
                  {talk.frontmatter.location && (
                    <div>
                      <dt className="text-gray-500 mb-1">Location</dt>
                      <dd className="text-gray-300">
                        {talk.frontmatter.location}
                      </dd>
                    </div>
                  )}
                  {talk.frontmatter.audience_size && (
                    <div>
                      <dt className="text-gray-500 mb-1">Audience</dt>
                      <dd className="text-gray-300">
                        {talk.frontmatter.audience_size}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Presentation Button */}
              {hasPresentation && (
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-cyan-500/30 backdrop-blur-lg rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2 text-white">
                    View Presentation
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Experience the full slide deck with interactive elements
                  </p>
                  <Link
                    href={`/talks/${params.slug}/present`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white rounded-md font-medium transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Presenting
                  </Link>
                </div>
              )}

              {/* Resources */}
              {(talk.frontmatter.video_url || talk.frontmatter.slides_url) && (
                <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4 text-white">
                    Resources
                  </h3>
                  <div className="space-y-3">
                    {talk.frontmatter.video_url && (
                      <a
                        href={talk.frontmatter.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                      >
                        <Video className="w-4 h-4" />
                        <span>Watch Recording</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    )}
                    {talk.frontmatter.slides_url && (
                      <a
                        href={talk.frontmatter.slides_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Download Slides</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back to talks link */}
        <div className="mt-8">
          <Link href="/talks" className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-md text-sm font-medium text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all talks
          </Link>
        </div>
      </article>
    </div>
  );
}

