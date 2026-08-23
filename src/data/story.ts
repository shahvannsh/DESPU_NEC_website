/**
 * "The DESPU Story" — the team's actual journey narrative, told as
 * stages rather than a static description. Empty until the team writes
 * it; the Story section hides itself entirely until this has content.
 * Do not invent any of this — see phase brief for the intended arc
 * (How We Started → Why NEC → Problem Discovered → Idea Evolved →
 * What We're Building → What We Learned → Where We're Going).
 */
export interface StoryStage {
  id: string;
  title: string;
  date?: string;
  description: string;
  image?: string;
}

export const story: StoryStage[] = [];
