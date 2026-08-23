/**
 * Real sponsors/partners only. NEVER add placeholder or example logos —
 * the Sponsors section hides itself entirely when this array is empty.
 */
export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category: "sponsor" | "partner" | "ecosystem";
}

export const sponsors: Sponsor[] = [];
