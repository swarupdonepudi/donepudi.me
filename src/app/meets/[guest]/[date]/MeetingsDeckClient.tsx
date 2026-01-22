'use client';

import MeetingsDeck, { MeetingsDeckProps } from '@/components/meetings/MeetingsDeck';

/**
 * Client wrapper for MeetingsDeck
 * 
 * This separates the client-side interactivity from server-side static generation.
 * The parent page.tsx handles data fetching and static params generation,
 * while this component handles all the interactive presentation logic.
 */
export default function MeetingsDeckClient(props: MeetingsDeckProps) {
  return <MeetingsDeck {...props} />;
}
