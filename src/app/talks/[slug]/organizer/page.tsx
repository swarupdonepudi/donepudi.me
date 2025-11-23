import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTalks, getTalkOrganizerNotes } from '@/lib/talks';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { ArrowLeft, Lock } from 'lucide-react';
import Header from '@/components/Header';
import CopyMarkdownButton from './CopyMarkdownButton';

interface OrganizerPageProps {
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

export async function generateMetadata({ params }: OrganizerPageProps): Promise<Metadata> {
  return {
    title: `Organizer Notes | ${params.slug}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrganizerPage({ params }: OrganizerPageProps) {
  const notes = await getTalkOrganizerNotes(params.slug);

  if (!notes) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Add padding-top to account for fixed nav */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <Link href={`/talks/${params.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Talk
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Privacy Alert */}
        <div className="mb-8 p-4 border border-amber-500/30 bg-amber-500/10 backdrop-blur-lg rounded-lg flex gap-3">
          <Lock className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-400 mb-1">Organizer Notes</h3>
            <p className="text-sm text-amber-300/80">
              This page contains internal notes for event organizers. It is not linked publicly
              and should be accessed only via direct URL.
            </p>
          </div>
        </div>

        {/* Notes Content */}
        <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-sm p-8 md:p-12">
          <div className="flex items-start justify-between mb-8">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Lock className="w-8 h-8 text-cyan-400" />
              Organizer Notes
            </h1>
            <CopyMarkdownButton content={notes.content} />
          </div>
          
          <MarkdownRenderer content={notes.content} />
        </div>

        {/* Back to talk link */}
        <div className="mt-8">
          <Link href={`/talks/${params.slug}`} className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-md text-sm font-medium text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to talk
          </Link>
        </div>
      </div>
    </div>
  );
}

