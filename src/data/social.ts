/**
 * Single source of truth for DESPU's social/contact links.
 * Update once here — every component (Footer, Contact, Connect) reads
 * from this file rather than hardcoding the URLs themselves.
 *
 * Leave a value as an empty string if it isn't ready yet; components
 * check for a non-empty value before rendering that link/button.
 */
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/ecell_despu",
  linkedin: "https://www.linkedin.com/in/despu-ecell-22703b42a",
  email: "ecell.despu@gmail.com",
  /**
   * PLACEHOLDER — this is not a real WhatsApp community invite link yet.
   * Replace with the real one from https://web.whatsapp.com > Community >
   * Invite via link, then it'll show up everywhere automatically.
   */
  whatsapp: "https://chat.whatsapp.com/despu-ecell-community",
};
