interface Props {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a0e18" />
          <stop offset="100%" stopColor="#12192c" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#logo-bg)" />
      <rect x="148" y="128" width="62" height="256" rx="14" fill="white" />
      <path
        d="M210 128a128 128 0 0 1 0 256V128Z"
        fill="white"
      />
      <path
        d="M210 168a88 88 0 0 1 0 176V168Z"
        fill="url(#logo-bg)"
      />
      <circle cx="386" cy="136" r="18" fill="#22d3ee" />
    </svg>
  );
}
