'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { listGuests, getLatestGuestConfig } from '@/components/meetings/guests';

/**
 * Meetings index page
 * 
 * If there are guests registered, redirects to the first guest's latest meeting.
 * Otherwise, shows a placeholder message.
 */
export default function MeetsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const guests = listGuests();
    if (guests.length > 0) {
      // Get the first guest slug from the first registered meeting
      const firstGuestSlug = guests[0].split('/')[0];
      const latestConfig = getLatestGuestConfig(firstGuestSlug);
      if (latestConfig) {
        router.replace(`/meets/${firstGuestSlug}`);
        return;
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#110D1F] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Meetings</h1>
        <p className="text-lg text-white/60 mb-8">
          Presentation decks for meetings with guests, companies, and partners.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
          <p className="text-white/50">
            No meetings scheduled yet. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}
