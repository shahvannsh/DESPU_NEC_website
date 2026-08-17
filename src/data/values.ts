import { Lightbulb, Users, BookOpen, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    icon: Lightbulb,
    title: "Think Bold",
    description: "We challenge conventional thinking and question the obvious answer.",
  },
  {
    icon: Users,
    title: "Build Together",
    description: "Great ideas are built through collaboration, not in isolation.",
  },
  {
    icon: BookOpen,
    title: "Learn Relentlessly",
    description: "Every challenge, win or loss, is treated as a lesson worth keeping.",
  },
  {
    icon: Rocket,
    title: "Create Impact",
    description: "We aim to turn ideas into meaningful solutions, not just pitches.",
  },
];
