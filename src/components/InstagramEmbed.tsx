import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

let scriptLoadPromise: Promise<void> | null = null;

function loadInstagramScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve) => {
    if (window.instgrm) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
  return scriptLoadPromise;
}

interface Props {
  url: string;
}

export default function InstagramEmbed({ url }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  // Defer loading Instagram's embed script (a sizeable third-party bundle)
  // until this specific embed is actually about to scroll into view,
  // instead of every embed on the page firing it off immediately on mount.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport) return;
    let cancelled = false;
    loadInstagramScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url, nearViewport]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[360px] overflow-hidden rounded-xl">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#0d1220", margin: "0 auto", width: "100%", minHeight: 200 }}
      >
        {/* Fallback shown until (or unless) the Instagram script processes this
            embed — e.g. slow connection, blocked script, ad blocker. Without
            this, a failed/slow load renders as a blank box. Styled to match
            the site's dark theme instead of Instagram's default white card,
            so a failed load doesn't look like a broken flash of white. */}
        <div
          style={{
            padding: "32px 20px",
            textAlign: "center",
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            Loading reel…
          </span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#22d3ee",
              textDecoration: "none",
            }}
          >
            View this reel on Instagram →
          </a>
        </div>
      </blockquote>
    </div>
  );
}
