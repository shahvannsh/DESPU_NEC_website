/**
 * Small branded loading indicator — a dual-ring spinner using the site's
 * accent gradient instead of a single flat color, so it reads as
 * "on-brand" rather than a generic default. Used for route transitions and
 * async data loading (blog, etc).
 */
export default function Loader({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent-cyan border-r-accent-blue" />
      <div
        className="absolute inset-[3px] animate-spin rounded-full border-2 border-transparent border-b-accent-violet"
        style={{ animationDirection: "reverse", animationDuration: "1.1s" }}
      />
    </div>
  );
}
