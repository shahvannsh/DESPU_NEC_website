import siteConfig from "../../site.config.json";

/**
 * Single source of truth for the production domain, importable from
 * anywhere inside the app (e.g. building an absolute share URL). The
 * actual value lives in /site.config.json at the repo root — update it
 * there, not here.
 */
export const SITE_URL = siteConfig.siteUrl.replace(/\/$/, "");

export const SITE_NAME = "DESPU";
export const SITE_DESCRIPTION =
  "DESPU — a team of young entrepreneurs from DES Pune University participating in the National Entrepreneurship Challenge, building ideas, solving problems and creating impact.";
