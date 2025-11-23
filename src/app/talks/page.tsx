import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTalks, getUpcomingTalks, getPastTalks } from '@/lib/talks';
import { formatDate } from '@/lib/content';
import { Calendar, MapPin, Users, Video, FileText } from 'lucide-react';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Talks | Swarup Donepudi',
  description: 'Speaking engagements on platform engineering, DevOps, and cloud infrastructure',
};

export default async function TalksPage() {
  const upcomingTalks = await getUpcomingTalks();
  const pastTalks = await getPastTalks();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />
      
      {/* Header - add padding-top to account for fixed nav */}
      <div className="pt-20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Talks & Presentations
          </h1>
          <p className="text-xl text-gray-400">
            Speaking engagements on platform engineering, DevOps, and cloud infrastructure
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Upcoming Talks */}
        {upcomingTalks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-white">Upcoming Talks</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                {upcomingTalks.length}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingTalks.map((talk) => (
                <Link
                  key={talk.slug}
                  href={`/talks/${talk.slug}`}
                  className="block group"
                >
                  <div className="h-full bg-black/40 backdrop-blur-lg border-l-4 border-l-green-500 border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Upcoming
                        </span>
                        {talk.frontmatter.has_presentation && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border border-cyan-500/30 text-cyan-400">
                            Has Presentation
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {talk.frontmatter.title}
                      </h3>
                      <p className="text-base font-medium text-gray-300 mb-4">
                        {talk.frontmatter.event}
                      </p>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>{formatDate(talk.frontmatter.date)}</span>
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
                      {talk.frontmatter.excerpt && (
                        <p className="text-gray-400 line-clamp-3">
                          {talk.frontmatter.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Past Talks */}
        {pastTalks.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-white">Past Talks</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                {pastTalks.length}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {pastTalks.map((talk) => (
                <Link
                  key={talk.slug}
                  href={`/talks/${talk.slug}`}
                  className="block group"
                >
                  <div className="h-full bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {talk.frontmatter.video_url && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border border-cyan-500/30 text-cyan-400">
                            <Video className="w-3 h-3 mr-1" />
                            Video Available
                          </span>
                        )}
                        {talk.frontmatter.slides_url && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border border-cyan-500/30 text-cyan-400">
                            <FileText className="w-3 h-3 mr-1" />
                            Slides
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {talk.frontmatter.title}
                      </h3>
                      <p className="text-base font-medium text-gray-300 mb-4">
                        {talk.frontmatter.event}
                      </p>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>{formatDate(talk.frontmatter.date)}</span>
                        </div>
                        {talk.frontmatter.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <span>{talk.frontmatter.location}</span>
                          </div>
                        )}
                      </div>
                      {talk.frontmatter.excerpt && (
                        <p className="text-gray-400 line-clamp-3">
                          {talk.frontmatter.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {upcomingTalks.length === 0 && pastTalks.length === 0 && (
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">
              No talks yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
