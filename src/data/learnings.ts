/**
 * Real lessons learned from actual events/milestones. Hidden entirely
 * when empty — never invent a lesson that wasn't actually learned.
 */
export interface LearningEntry {
  id: string;
  title: string;
  lesson: string;
  date: string;
  event?: string;
  category: "product" | "business" | "teamwork" | "research" | "pitching";
}

export const learnings: LearningEntry[] = [];
