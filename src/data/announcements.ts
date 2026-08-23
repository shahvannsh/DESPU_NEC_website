/**
 * Site-wide announcement bar content. Add one entry when there's
 * something time-sensitive to surface (registration deadlines, a new
 * event, a result). Leave the array empty otherwise — the bar hides
 * itself entirely rather than showing a stale or empty banner.
 *
 * Only the first *active*, non-expired entry is shown at a time.
 */
export interface Announcement {
  id: string;
  message: string;
  linkLabel?: string;
  linkHref?: string;
  /** "info" (default) | "urgent" — urgent gets a warmer accent color */
  type?: "info" | "urgent";
  /** ISO date — once past, this announcement stops showing automatically */
  expiresAt?: string;
  active: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "eureka-2026-event",
    message: "EUREKA! Pitching Competition — 27 August 2026 at DES Pune University.",
    linkLabel: "Event Details",
    linkHref: "/#event-eureka-2026",
    type: "urgent",
    expiresAt: "2026-08-27",
    active: true,
  },
];
