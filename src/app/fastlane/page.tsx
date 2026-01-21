import { Metadata } from 'next';
import { getAllFastlaneEntries } from '@/lib/fastlane';
import Header from '@/components/Header';
import FastlaneTimeline from '@/components/fastlane/FastlaneTimeline';

export const metadata: Metadata = {
  title: 'Fastlane | Swarup Donepudi',
  description: "Life's single-threaded stream - thoughts, moments, and observations captured as they happen",
};

export default async function FastlanePage() {
  const entries = await getAllFastlaneEntries();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Header />

      {/* Header Section */}
      <div className="pt-20 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Fastlane
          </h1>
          <p className="text-xl text-gray-400">
            Life's single-threaded stream
          </p>
        </div>
      </div>

      {/* Timeline Entries */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {entries.length === 0 ? (
          <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">
              No entries yet. The journey begins soon.
            </p>
          </div>
        ) : (
          <FastlaneTimeline entries={entries} />
        )}
      </div>
    </div>
  );
}
