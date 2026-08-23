/**
 * Only files intentionally made public — pitch deck, one-pager, etc.
 * Never expose private/internal documents here. Hidden entirely when
 * empty.
 */
export interface Resource {
  id: string;
  label: string;
  description?: string;
  url: string;
}

export const resources: Resource[] = [];
