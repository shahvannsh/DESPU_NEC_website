/**
 * Real competition results/outcomes only — rankings, awards, milestones.
 * NEVER invent results. This section hides itself entirely when empty.
 */
export interface Outcome {
  id: string;
  title: string;
  metric: string;
  description: string;
}

export const outcomes: Outcome[] = [];
