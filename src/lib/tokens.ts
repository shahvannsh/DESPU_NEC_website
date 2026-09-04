/**
 * Design Tokens — Single Source of Truth for DESPU NEC Website
 * Exported constants and theme values for colors, typography, spacing, radii, and z-indices.
 */

export const COLORS = {
  accent: '#3054ff',
  accentHover: '#2040e0',
  accentCyan: '#22d3ee',
  gradientEnd: '#b4c0ff',
  base: {
    950: '#05070d',
    900: '#0a0e17',
    850: '#0d1220',
    800: '#111827',
  },
  text: {
    primary: { dark: 'rgba(255, 255, 255, 1)', light: '#0a0e18' },
    secondary: { dark: 'rgba(255, 255, 255, 0.8)', light: 'rgba(10, 14, 24, 0.8)' },
    tertiary: { dark: 'rgba(255, 255, 255, 0.6)', light: 'rgba(10, 14, 24, 0.62)' },
    muted: { dark: 'rgba(255, 255, 255, 0.4)', light: 'rgba(10, 14, 24, 0.45)' },
  },
  border: {
    subtle: { dark: 'rgba(255, 255, 255, 0.1)', light: 'rgba(10, 14, 24, 0.1)' },
    medium: { dark: 'rgba(255, 255, 255, 0.2)', light: 'rgba(10, 14, 24, 0.18)' },
    glow: 'rgba(34, 211, 238, 0.35)',
  },
} as const;

export const SPACING = {
  sectionPaddingY: 'py-20 sm:py-28 lg:py-32',
  containerMax: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;

export const RADII = {
  card: 'rounded-2xl',
  button: 'rounded-full',
  badge: 'rounded-full',
} as const;

export const Z_INDEX = {
  background: 'z-0',
  content: 'z-10',
  sticky: 'z-40',
  navbar: 'z-50',
  modal: 'z-[100]',
  consentBanner: 'z-[90]',
  cursor: 'z-[9999]',
} as const;
