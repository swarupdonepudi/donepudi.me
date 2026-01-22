import { SlideConfig } from '../MeetingsDeck';

// ============================================================================
// GUEST CONFIGURATION TYPES
// ============================================================================

export interface GuestConfig {
  slides: SlideConfig[];
  guest: string;
  meetingDate: string;
  presenter?: string;
  context?: string;
  meetingType?: 'company' | 'investor' | 'partner' | 'advisor' | 'individual';
  location?: string;
}

// ============================================================================
// GUEST REGISTRY
// ============================================================================

// Import guest configurations
import { exampleConfig } from './example/config';

/**
 * Registry of all guest meeting configurations
 *
 * Key format: "guest/date" (e.g., "acme/2026-01-25-1400")
 *
 * The date format is yyyy-mm-dd-hhmm where:
 * - yyyy: 4-digit year
 * - mm: 2-digit month
 * - dd: 2-digit day
 * - hhmm: hours and minutes in 24-hour format
 *
 * Example: "acme/2026-01-25-1400" for January 25, 2026 at 2:00 PM
 */
const guestRegistry: Record<string, GuestConfig> = {
  'example/2026-01-25-1000': exampleConfig,
};

// ============================================================================
// LOOKUP FUNCTIONS
// ============================================================================

/**
 * Get guest configuration by guest ID and date
 *
 * @param guest - Guest identifier (e.g., "acme")
 * @param date - Meeting date (e.g., "2026-01-25-1400")
 * @returns GuestConfig if found, null otherwise
 */
export function getGuestConfig(
  guest: string,
  date: string
): GuestConfig | null {
  const key = `${guest}/${date}`;
  return guestRegistry[key] || null;
}

/**
 * Get the latest (upcoming) guest configuration for a given guest
 *
 * This function returns the most recent meeting by sorting dates in descending order.
 * The URL /meets/[guest] always shows the upcoming/latest meeting.
 *
 * @param guest - Guest identifier (e.g., "acme")
 * @returns GuestConfig if found, null otherwise
 */
export function getLatestGuestConfig(guest: string): GuestConfig | null {
  const guestDates = Object.keys(guestRegistry)
    .filter((key) => key.startsWith(`${guest}/`))
    .map((key) => key.split('/')[1])
    .sort()
    .reverse();

  if (guestDates.length === 0) {
    return null;
  }

  return guestRegistry[`${guest}/${guestDates[0]}`] || null;
}

/**
 * List all available guest presentations
 *
 * @returns Array of guest/date keys
 */
export function listGuests(): string[] {
  return Object.keys(guestRegistry);
}

/**
 * Get all unique guest slugs
 *
 * @returns Array of unique guest identifiers
 */
export function listUniqueGuests(): string[] {
  const guests = Object.keys(guestRegistry).map((key) => key.split('/')[0]);
  return Array.from(new Set(guests));
}

/**
 * Get all meetings for a specific guest
 *
 * @param guest - Guest identifier
 * @returns Array of meeting dates for the guest
 */
export function listGuestMeetings(guest: string): string[] {
  return Object.keys(guestRegistry)
    .filter((key) => key.startsWith(`${guest}/`))
    .map((key) => key.split('/')[1])
    .sort()
    .reverse();
}
