import { notFound } from 'next/navigation';
import { getLatestGuestConfig, listGuests } from '@/components/meetings/guests';
import MeetingsDeck from '@/components/meetings/MeetingsDeck';

interface GuestPageProps {
  params: Promise<{ guest: string }>;
}

/**
 * Generate static params for all registered guests
 */
export function generateStaticParams() {
  const guests = listGuests();
  const uniqueGuests = Array.from(new Set(guests.map((key) => key.split('/')[0])));
  return uniqueGuests.map((guest) => ({ guest }));
}

/**
 * Guest page - shows the latest/upcoming meeting for a guest
 * 
 * URL: /meets/[guest]
 * Example: /meets/acme shows the latest meeting with Acme
 */
export default async function GuestPage({ params }: GuestPageProps) {
  const { guest } = await params;
  const config = getLatestGuestConfig(guest);

  if (!config) {
    notFound();
  }

  return (
    <MeetingsDeck
      slides={config.slides}
      guest={config.guest}
      meetingDate={config.meetingDate}
      presenter={config.presenter}
      context={config.context}
      location={config.location}
    />
  );
}
