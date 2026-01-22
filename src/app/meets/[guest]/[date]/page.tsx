import { notFound } from 'next/navigation';
import { getGuestConfig, listGuests } from '@/components/meetings/guests';
import MeetingsDeckClient from './MeetingsDeckClient';

interface DatedMeetingPageProps {
  params: Promise<{ guest: string; date: string }>;
}

/**
 * Generate static params for all registered guest/date combinations
 */
export function generateStaticParams() {
  const guests = listGuests();
  return guests.map((key) => {
    const [guest, date] = key.split('/');
    return { guest, date };
  });
}

/**
 * Dated meeting page - shows a specific meeting by date
 * 
 * URL: /meets/[guest]/[date]
 * Example: /meets/acme/2026-01-25-1400
 */
export default async function DatedMeetingPage({ params }: DatedMeetingPageProps) {
  const { guest, date } = await params;
  const config = getGuestConfig(guest, date);

  if (!config) {
    notFound();
  }

  return (
    <MeetingsDeckClient
      slides={config.slides}
      guest={config.guest}
      meetingDate={config.meetingDate}
      presenter={config.presenter}
      context={config.context}
      location={config.location}
    />
  );
}
