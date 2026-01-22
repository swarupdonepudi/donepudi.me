'use client';

import {
  Slide,
  SlideHeader,
  Card,
  CardTitle,
  CardText,
  Grid,
} from '../../../shared/primitives';

/**
 * Problem slide - Demonstrates problem framing with Card variants
 *
 * Pattern: Use "problem" variant for slides addressing challenges
 * Shows: Card component with danger variant, Grid layout
 */
export default function S02Problem() {
  return (
    <Slide variant="problem">
      <SlideHeader
        sectionTag="The Challenge"
        title="Common Pain Points"
        subtitle="Issues that slow teams down and increase costs"
      />

      <Grid cols={2} gap="md">
        <Card variant="danger">
          <CardTitle>Manual Processes</CardTitle>
          <CardText>
            Repetitive tasks that consume valuable engineering time and 
            introduce human error into critical workflows.
          </CardText>
        </Card>

        <Card variant="danger">
          <CardTitle>Siloed Knowledge</CardTitle>
          <CardText>
            Critical information trapped in individual minds, making 
            onboarding slow and creating single points of failure.
          </CardText>
        </Card>

        <Card variant="danger">
          <CardTitle>Inconsistent Standards</CardTitle>
          <CardText>
            Different approaches across teams leading to maintenance 
            nightmares and integration challenges.
          </CardText>
        </Card>

        <Card variant="danger">
          <CardTitle>Slow Feedback Loops</CardTitle>
          <CardText>
            Long wait times between changes and validation, 
            reducing iteration speed and team morale.
          </CardText>
        </Card>
      </Grid>

      {/* Question prompt */}
      <p className="text-center text-lg sm:text-xl text-white/60 mt-8">
        💭 Does any of this sound familiar?
      </p>
    </Slide>
  );
}
