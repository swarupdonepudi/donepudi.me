import { SlideConfig } from '../../MeetingsDeck';
import { GuestConfig } from '../index';

// Import all slides
import S01Cover from './slides/S01Cover';
import S02Problem from './slides/S02Problem';
import S03Solution from './slides/S03Solution';
import S04Stats from './slides/S04Stats';
import S05ThankYou from './slides/S05ThankYou';

/**
 * Example meeting deck slides
 *
 * This is a reference implementation demonstrating all major primitives
 * and patterns for creating meeting presentations.
 */
export const exampleSlides: SlideConfig[] = [
  {
    id: 'cover',
    name: 'Cover',
    component: S01Cover,
    presenterNotes: [
      '"Good morning, thank you for making time today."',
      'Introduce yourself briefly - name, role, context',
      '<strong>Goal:</strong> Set a collaborative tone from the start',
      'Keep this slide under 30 seconds',
    ],
  },
  {
    id: 'problem',
    name: 'The Challenge',
    component: S02Problem,
    presenterNotes: [
      'Read each pain point with emphasis',
      'Pause after each to let it resonate',
      'Ask: "Does any of this sound familiar?"',
      '<strong>Listen:</strong> Their responses reveal priorities',
    ],
  },
  {
    id: 'solution',
    name: 'The Solution',
    component: S03Solution,
    presenterNotes: [
      'Transition: "Here\'s how we can help..."',
      'Walk through each benefit methodically',
      'Connect benefits back to their specific pain points',
      '<strong>Key message:</strong> This is built for people like you',
    ],
  },
  {
    id: 'stats',
    name: 'By The Numbers',
    component: S04Stats,
    presenterNotes: [
      'Let the numbers speak for themselves',
      'Highlight the most relevant stat for this guest',
      'Be ready to explain the methodology if asked',
      '<strong>Credibility:</strong> Real data builds trust',
    ],
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    component: S05ThankYou,
    presenterNotes: [
      'Summarize the key takeaway in one sentence',
      'Open for questions: "What questions do you have?"',
      'If time permits, discuss next steps',
      '<strong>Close:</strong> "I\'ll follow up with [specific action]"',
    ],
  },
];

/**
 * Example guest configuration
 *
 * This demonstrates the full structure of a GuestConfig object.
 */
export const exampleConfig: GuestConfig = {
  slides: exampleSlides,
  guest: 'example',
  meetingDate: '2026-01-25-1000',
  presenter: 'Swarup Donepudi',
  context: 'Example meeting to demonstrate the meetings framework',
  meetingType: 'individual',
  location: 'Virtual',
};
