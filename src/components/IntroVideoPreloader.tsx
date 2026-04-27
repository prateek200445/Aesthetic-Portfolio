"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_MAX_SECONDS = 4;
const EXIT_DURATION_MS = 800;

type IntroPhase = "hidden" | "playing" | "exiting";

export default function IntroVideoPreloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<IntroPhase>("hidden");

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("introPlayed");
    if (!hasPlayed) {
      setPhase("playing");
      sessionStorage.setItem("introPlayed", "true");
    }
  }, []);

  useEffect(() => {
    if (phase === "hidden") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "playing") {
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const finishIntro = () => {
      setPhase((current) => {
        if (current !== "playing") {
          return current;
        }

        return "exiting";
      });
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= INTRO_MAX_SECONDS) {
        finishIntro();
      }
    };

    const handleEnded = () => {
      finishIntro();
    };

    const handleCanPlay = () => {
      if (video.currentTime > INTRO_MAX_SECONDS) {
        video.currentTime = 0;
      }

      void video.play().catch(() => {
        // If autoplay is blocked, show controls fallback.
        video.controls = true;
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", handleCanPlay);

    if (video.readyState >= 2) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase("hidden");
    }, EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phase]);

  if (phase === "hidden") {
    return null;
  }

  const isExiting = phase === "exiting";

  return (
    <>
      {/* Mobile viewport fix for html/body */}
      <style>{`
        html, body { height: 100%; overflow: hidden; }
      `}</style>
      <div
        aria-hidden
        className="fixed inset-0 z-9999 bg-black transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(0.92)" : "scale(1)",
          pointerEvents: isExiting ? "none" : "auto",
          width: "100vw",
          height: "100svh",
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-contain md:object-cover"
          style={{
            display: "block",
          }}
          src="/videos/intro-video.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
}