/**
 * Real mentor/judge testimonials only. NEVER add placeholder or invented
 * quotes here — the Testimonials section automatically hides itself
 * entirely when this array is empty, rather than showing fake-looking
 * "coming soon" cards.
 */
export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  organization: string;
  quote: string;
  image?: string;
  linkedin?: string;
}

export const testimonials: Testimonial[] = [];
