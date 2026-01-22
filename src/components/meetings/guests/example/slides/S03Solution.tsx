'use client';

import {
  Slide,
  SlideHeader,
  Checklist,
  IconList,
  Card,
  TwoCol,
} from '../../../shared/primitives';

/**
 * Solution slide - Demonstrates solution framing with Checklist and IconList
 *
 * Pattern: Use "solution" variant for slides presenting answers
 * Shows: Checklist, IconList, TwoCol layout, Card highlight variant
 */
export default function S03Solution() {
  return (
    <Slide variant="solution">
      <SlideHeader
        sectionTag="The Solution"
        title="A Better Approach"
        subtitle="Structured frameworks that scale with your team"
      />

      <TwoCol>
        {/* Left: Benefits checklist */}
        <Card variant="success">
          <h3 className="text-lg font-semibold text-white mb-4">Key Benefits</h3>
          <Checklist
            items={[
              'Automation reduces manual toil by 80%',
              'Documentation lives alongside code',
              'Consistent patterns across all projects',
              'Fast feedback through instant validation',
              'Easy onboarding with clear examples',
            ]}
          />
        </Card>

        {/* Right: How it works */}
        <Card variant="highlight">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <IconList
            items={[
              {
                icon: '🎯',
                title: 'Define Once',
                description: 'Create reusable templates and patterns',
              },
              {
                icon: '🔄',
                title: 'Use Everywhere',
                description: 'Apply consistently across all contexts',
              },
              {
                icon: '📈',
                title: 'Improve Continuously',
                description: 'Refine based on real-world feedback',
              },
            ]}
          />
        </Card>
      </TwoCol>
    </Slide>
  );
}
