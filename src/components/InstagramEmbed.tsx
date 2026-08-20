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
        style={{ background: "#fff", margin: "0 auto", width: "100%" }}
      />
    </div>
  );
}
