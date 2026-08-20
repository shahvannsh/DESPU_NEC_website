import { useEffect, useRef } from "react";

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

  useEffect(() => {
    let cancelled = false;
    loadInstagramScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[360px] overflow-hidden rounded-xl">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#fff", margin: "0 auto", width: "100%", minHeight: 200 }}
      >
        {/* Fallback shown until (or unless) the Instagram script processes this
            embed — e.g. slow connection, blocked script, ad blocker. Without
            this, a failed/slow load renders as a blank box. */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#0e7490",
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
