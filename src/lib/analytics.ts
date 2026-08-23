/**
 * Minimal analytics integration point. No provider is wired in yet — this
 * just gives every interactive spot in the app one place to report events
 * from, so plugging in Plausible/GA/PostHog/etc. later is a one-line change
 * in this file instead of touching every component.
 *
 * Currently a no-op in production (safe to ship as-is); logs to console
 * only in dev so you can see events firing correctly.
 */
export type AnalyticsEvent =
  | "page_view"
  | "team_member_open"
  | "event_open"
  | "social_click"
  | "whatsapp_click"
  | "contact_submit";

export function trackEvent(event: AnalyticsEvent, payload?: Record<string, string>) {
  if (import.meta.env.DEV) {
    console.info("[analytics]", event, payload ?? {});
  }
  // Wire a real provider here when ready, e.g.:
  // window.plausible?.(event, { props: payload });
}
