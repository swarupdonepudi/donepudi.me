'use client';

import {
  Slide,
  SlideHeader,
  StatsGrid,
  Comparison,
  Metric,
  Callout,
} from '../../../shared/primitives';

/**
 * Stats slide - Demonstrates metrics and data visualization
 *
 * Pattern: Use for credibility-building through data
 * Shows: StatsGrid, Comparison, Metric, Callout components
 */
export default function S04Stats() {
  return (
    <Slide variant="gradient">
      <SlideHeader
        sectionTag="By The Numbers"
        title="Real Impact"
        subtitle="Measurable improvements from structured approaches"
      />

      {/* Stats grid */}
      <StatsGrid
        stats={[
          { icon: '⚡', value: '80%', label: 'Faster Setup' },
          { icon: '🎯', value: '95%', label: 'Error Reduction' },
          { icon: '📚', value: '50%', label: 'Faster Onboarding' },
          { icon: '💰', value: '3x', label: 'ROI in Year 1' },
          { icon: '😊', value: '4.8/5', label: 'Team Satisfaction' },
        ]}
        className="mb-8"
      />

      {/* Before/After comparison */}
      <Comparison
        before={{
          label: 'Before',
          value: '2 weeks',
          subtext: 'Time to production',
        }}
        after={{
          label: 'After',
          value: '2 hours',
          subtext: 'Time to production',
        }}
        className="mb-8"
      />

      {/* Highlighted metric */}
      <Callout variant="highlight">
        <div className="text-center">
          <Metric
            value="$250K+"
            label="Annual savings per team"
            sublabel="Based on reduced engineering hours"
            highlight
          />
        </div>
      </Callout>
    </Slide>
  );
}
