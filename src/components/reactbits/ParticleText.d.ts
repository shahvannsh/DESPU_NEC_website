import type { CSSProperties } from 'react';

export interface ParticleTextProps {
  text?: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: 'mount' | 'hover' | 'click';
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  glow?: boolean;
  className?: string;
  style?: CSSProperties;
}

declare const ParticleText: (props: ParticleTextProps) => JSX.Element;
export default ParticleText;
