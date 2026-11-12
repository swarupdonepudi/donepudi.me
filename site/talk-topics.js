// @ts-check
// What a note to Swarup can be about: the one list the note flow draws and the Worker checks a send
// against, so a new topic is one edit here. Each topic has the questions shown above the box, about a
// moment or a decision, never about colours or logos. Also how a page address opens the flow: #talk
// opens the topic picker, #talk/<topic> opens that topic's note. A topic may also name an ask (`ask`, its slug),
// a short questions page of its own at /ask/<slug>, which the Worker's list of asks says the topic opens. Plain
// data and pure functions with no page and no side effect, because the Worker imports this file too.

/**
 * @typedef {{
 *   slug: string,
 *   label: string,
 *   hint: string,
 *   questions: readonly string[],
 *   offersCall?: boolean,
 *   ask?: string,
 * }} Topic
 * @typedef {{ open: false } | { open: true, topic: string | null }} HashLink
 */

/** The topics, in the order the picker shows them. A slug is part of a page address and a stored row. */
/** @type {readonly Topic[]} */
export const TOPICS = Object.freeze([
  {
    slug: 'speaking',
    label: 'Speaking invitation',
    hint: 'A meetup, a conference or a podcast',
    questions: [
      'What is the event, and who is in the room?',
      'What would you like me to talk about, and for how long?',
      'When is it, and is it in person or online?',
    ],
    offersCall: true,
  },
  {
    slug: 'platform-engineering',
    label: 'Platform engineering',
    hint: 'Your platform, your pipeline, your cloud',
    questions: [
      'What are you building, and for how many teams?',
      'Where is it hurting today?',
      'What have you already tried?',
    ],
  },
  {
    slug: 'planton',
    label: 'Planton',
    hint: 'The product, the docs or a demo',
    ask: 'planton',
    questions: [
      'Where did you get lost: the site, the docs, the install, or a demo?',
      'Would you run it in your own cloud? What would stop you?',
      "What did you expect to find that wasn't there?",
    ],
  },
  {
    slug: 'shows',
    label: 'The shows',
    hint: 'Off the Pager and Kubernetes for Developers',
    questions: [
      'Which episode, and where did you stop watching?',
      'A take you disagreed with, and why?',
      'A story I should cover?',
    ],
  },
  {
    slug: 'other',
    label: 'Something else',
    hint: 'Anything at all',
    questions: [
      "What's on your mind, and what made you think of it?",
      "Is there something you'd like me to do about it?",
    ],
    offersCall: true,
  },
]);

/**
 * @param {string} slug
 * @returns {boolean}
 */
export function isTopic(slug) {
  return TOPICS.some((topic) => topic.slug === slug);
}

/**
 * Reads a page address's hash: #talk and #talk/<anything unknown> open the picker, #talk/<topic>
 * opens that topic, and every other hash leaves the flow closed.
 * @param {string} hash
 * @returns {HashLink}
 */
export function topicFromHash(hash) {
  if (hash === '#talk') return { open: true, topic: null };
  if (!hash.startsWith('#talk/')) return { open: false };
  const slug = hash.slice('#talk/'.length);
  return { open: true, topic: isTopic(slug) ? slug : null };
}
