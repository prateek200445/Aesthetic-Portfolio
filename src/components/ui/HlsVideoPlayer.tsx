"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";

interface HlsVideoPlayerProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  src: string; // URL to the master.m3u8 playlist or mp4 fallback
}

const HlsVideoPlayer = forwardRef<HTMLVideoElement, HlsVideoPlayerProps>(
  ({ src, className, autoPlay, loop, muted = true, poster, style }, ref) => {
    const internalVideoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Expose internal video ref to the forwarded ref
    useImperativeHandle(ref, () => internalVideoRef.current as HTMLVideoElement);

    // Lazy load — only trigger once the player is close to the viewport.
    // rootMargin of 50px (not 200px) prevents pre-fetching for off-screen videos.
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true);
        },
        { rootMargin: "50px" }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible || !internalVideoRef.current) return;

      const video = internalVideoRef.current;
      let hls: Hls | undefined;

      // ── Plain MP4 path ────────────────────────────────────────────────────
      // NEVER use preload="auto" for MP4 — it downloads the entire file.
      // Use preload="metadata" so only the headers/duration are fetched.
      // The browser will buffer normally once play() is called.
      if (!src.endsWith(".m3u8")) {
        video.preload = "metadata";
        video.src = src;
        if (autoPlay) {
          video.play().catch(() => {
            // Autoplay may be blocked on mobile until a user gesture.
          });
        }
        return;
      }

      // ── HLS path (hls.js or native Safari) ───────────────────────────────
      if (Hls.isSupported()) {
        // On mobile viewports, start at the lowest quality level (480p/0)
        // and let capLevelToPlayerSize prevent 4K downloads on small screens.
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        hls = new Hls({
          startLevel: isMobile ? 0 : 1, // 0 = lowest, 1 = 720p
          capLevelToPlayerSize: true,    // Never download higher than the player can display
          autoStartLoad: false,          // Prevent segment downloads until we command it
          maxBufferLength: isMobile ? 15 : 30, // Limit buffer on mobile to save RAM/bandwidth
        });

        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hls!.startLoad();
          if (autoPlay) video.play().catch(() => {});
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari / iOS)
        video.src = src;
        if (autoPlay) video.play().catch(() => {});
      }

      return () => {
        if (hls) hls.destroy();
      };
    }, [src, isVisible, autoPlay]);

    return (
      <div ref={containerRef} className={`relative w-full h-full ${className || ""}`} style={style}>
        <video
          ref={internalVideoRef}
          className="w-full h-full object-cover"
          loop={loop}
          muted={muted}
          playsInline
          poster={poster}
          preload="none"
          style={{ willChange: "transform, filter" }}
        />
      </div>
    );
  }
);

HlsVideoPlayer.displayName = "HlsVideoPlayer";
export default HlsVideoPlayer;
