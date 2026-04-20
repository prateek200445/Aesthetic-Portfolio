"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TabcuraScrollVisualProps = {
  imageSrc: string;
  videoSrc?: string;
  imageAlt: string;
  overlayTitle?: string;
  overlaySubtitle?: string;
  disableMotion?: boolean;
  useContainerScroll?: boolean;
  fixedImageSize?: {
    width: number | string;
    height: number | string;
  };
};

type MotionConfig = {
  startScale: number;
  focusScale: number;
  exitScale: number;
  startY: number;
  midY: number;
  exitY: number;
  startBlur: number;
};

type VideoMotionConfig = {
  startScale: number;
  focusScale: number;
  startX: number;
  focusX: number;
  startY: number;
  midY: number;
  startBlur: number;
  startRotate: number;
  focusRotate: number;
  startClip: string;
  midClip: string;
};

type HoverTargets = {
  card: HTMLElement;
  media: HTMLImageElement | HTMLVideoElement;
  glow: HTMLElement;
  sheen: HTMLElement;
  overlay: HTMLElement;
};

function bindHoverEnhancement({ card, media, glow, sheen, overlay }: HoverTargets) {
  const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (!hoverMedia.matches) {
    return () => undefined;
  }

  const handlePointerEnter = () => {
    gsap.killTweensOf([card, media, glow, sheen, overlay]);
    gsap.to(card, {
      scale: 1.03,
      y: -18,
      xPercent: 0,
      rotateZ: 0,
      boxShadow: "0 42px 140px rgba(0, 0, 0, 0.52)",
      filter: "saturate(1.04)",
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(media, {
      scale: 1.04,
      yPercent: -8,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(glow, {
      opacity: 0.86,
      scale: 1.04,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(sheen, {
      opacity: 0.58,
      xPercent: 52,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(overlay, {
      y: -2,
      opacity: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handlePointerLeave = () => {
    gsap.killTweensOf([card, media, glow, sheen, overlay]);
    gsap.to(card, {
      scale: 1,
      y: 0,
      xPercent: 0,
      rotateZ: 0,
      boxShadow: "0 30px 120px rgba(0, 0, 0, 0.45)",
      filter: "none",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(media, {
      scale: 1,
      yPercent: 0,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(glow, {
      opacity: 0.68,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(sheen, {
      opacity: 0.18,
      xPercent: 18,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(overlay, {
      y: 0,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  card.addEventListener("pointerenter", handlePointerEnter);
  card.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    card.removeEventListener("pointerenter", handlePointerEnter);
    card.removeEventListener("pointerleave", handlePointerLeave);
  };
}

function createTimeline(
  section: HTMLElement,
  card: HTMLElement,
  media: HTMLElement,
  glow: HTMLElement,
  overlay: HTMLElement,
  config: MotionConfig
) {
  gsap.set(card, {
    scale: config.startScale,
    y: config.startY,
    opacity: 0.72,
  });
  gsap.set(media, {
    filter: `blur(${config.startBlur}px)`,
    yPercent: 4,
  });
  gsap.set(glow, {
    opacity: 0.35,
    scale: 0.96,
  });
  gsap.set(overlay, {
    opacity: 0.55,
    y: 18,
  });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top bottom-=5%",
      end: "bottom top+=10%",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(
    card,
    {
      scale: 1,
      y: config.midY,
      opacity: 1,
      duration: 1,
    },
    0
  )
    .to(
      media,
      {
        filter: "blur(0px)",
        yPercent: 0,
        duration: 1,
        ease: "power1.out",
      },
      0
    )
    .to(
      overlay,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
      },
      0.15
    )
    .to(
      glow,
      {
        opacity: 0.72,
        scale: 1,
        duration: 1,
      },
      0.2
    )
    .to(
      card,
      {
        scale: config.focusScale,
        y: -16,
        duration: 1.05,
      },
      1
    )
    .to(
      media,
      {
        yPercent: -5,
        duration: 1.05,
        ease: "none",
      },
      1
    )
    .to(
      glow,
      {
        y: -18,
        duration: 1.05,
        ease: "none",
      },
      1
    )
    .to(
      card,
      {
        scale: config.exitScale,
        y: config.exitY,
        opacity: 0.94,
        duration: 1.15,
      },
      2.05
    )
    .to(
      media,
      {
        yPercent: -13,
        duration: 1.15,
        ease: "none",
      },
      2.05
    )
    .to(
      overlay,
      {
        opacity: 0.86,
        duration: 1.15,
      },
      2.05
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

function createVideoTimeline(
  section: HTMLElement,
  card: HTMLElement,
  video: HTMLVideoElement,
  glow: HTMLElement,
  overlay: HTMLElement,
  sheen: HTMLElement,
  config: VideoMotionConfig
) {
  gsap.set(card, {
    scale: config.startScale,
    xPercent: config.startX,
    y: config.startY,
    rotateZ: config.startRotate,
    transformPerspective: 1400,
    opacity: 0,
    clipPath: config.startClip,
  });
  gsap.set(video, {
    filter: `blur(${config.startBlur}px)`,
    scale: 1.03,
    yPercent: 8,
  });
  gsap.set(glow, {
    opacity: 0.3,
    scale: 0.95,
  });
  gsap.set(overlay, {
    opacity: 0.5,
    y: 18,
  });
  gsap.set(sheen, {
    opacity: 0,
    xPercent: -40,
  });

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: section,
      start: "top bottom-=5%",
      end: "bottom center",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(
    card,
    {
      scale: 1,
      xPercent: 0,
      y: config.midY,
      rotateZ: 0,
      opacity: 1,
      clipPath: config.midClip,
      duration: 1,
    },
    0
  )
    .to(
      video,
      {
        filter: "blur(0px) brightness(1.02) saturate(1.08)",
        scale: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.out",
      },
      0
    )
    .to(
      overlay,
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
      },
      0.15
    )
    .to(
      sheen,
      {
        opacity: 0.45,
        xPercent: 40,
        duration: 0.95,
        ease: "power3.out",
      },
      0.05
    )
    .to(
      glow,
      {
        opacity: 0.68,
        scale: 1,
        duration: 1,
      },
      0.2
    )
    .to(
      card,
      {
        y: -12,
        scale: config.focusScale,
        xPercent: config.focusX,
        rotateZ: config.focusRotate,
        duration: 1.1,
      },
      1
    )
    .to(
      video,
      {
        yPercent: -6,
        duration: 1.1,
        ease: "none",
      },
      1
    )
    .to(
      glow,
      {
        y: -14,
        duration: 1.1,
        ease: "none",
      },
      1
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}

export default function TabcuraScrollVisual({
  imageSrc,
  videoSrc,
  imageAlt,
  overlayTitle = "AI Prescription Intelligence",
  overlaySubtitle = "Scroll to explore",
  disableMotion = false,
  useContainerScroll = false,
  fixedImageSize,
}: TabcuraScrollVisualProps) {
  const fixedWidth =
    typeof fixedImageSize?.width === "number" ? `${fixedImageSize.width}px` : fixedImageSize?.width;
  const fixedHeight =
    typeof fixedImageSize?.height === "number" ? `${fixedImageSize.height}px` : fixedImageSize?.height;

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const media = mediaRef.current;
    const video = videoRef.current;
    const glow = glowRef.current;
    const overlay = overlayRef.current;
    const sheen = sheenRef.current;

    if (!section || !card || !glow || !overlay || !sheen) return;

    if (disableMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([card, media, video, glow, overlay, sheen], { clearProps: "all" });
      return;
    }

    if (videoSrc) {
      if (!video) return;

      const mm = gsap.matchMedia();
      const cleanups: Array<() => void> = [];
      const removeHoverHandlers = bindHoverEnhancement({
        card,
        media: video,
        glow,
        sheen,
        overlay,
      });

      mm.add("(max-width: 767px)", () => {
        cleanups.push(
          createVideoTimeline(section, card, video, glow, overlay, sheen, {
            startScale: 0.96,
            focusScale: 1.02,
            startX: 12,
            focusX: 0,
            startY: 32,
            midY: 0,
            startBlur: 2,
            startRotate: -5,
            focusRotate: -1,
            startClip: "inset(0 100% 0 0 round 20px)",
            midClip: "inset(0 0% 0 0 round 20px)",
          })
        );
      });

      mm.add("(min-width: 768px) and (max-width: 1199px)", () => {
        cleanups.push(
          createVideoTimeline(section, card, video, glow, overlay, sheen, {
            startScale: 0.94,
            focusScale: 1.04,
            startX: 18,
            focusX: 0,
            startY: 42,
            midY: 0,
            startBlur: 3,
            startRotate: -6,
            focusRotate: -1,
            startClip: "inset(0 100% 0 0 round 20px)",
            midClip: "inset(0 0% 0 0 round 20px)",
          })
        );
      });

      mm.add("(min-width: 1200px)", () => {
        cleanups.push(
          createVideoTimeline(section, card, video, glow, overlay, sheen, {
            startScale: 0.92,
            focusScale: 1.06,
            startX: 22,
            focusX: 0,
            startY: 54,
            midY: 0,
            startBlur: 4,
            startRotate: -7,
            focusRotate: -1,
            startClip: "inset(0 100% 0 0 round 20px)",
            midClip: "inset(0 0% 0 0 round 20px)",
          })
        );
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        mm.revert();
        removeHoverHandlers();
      };
    }

    if (!media) return;

    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];
    const removeHoverHandlers = bindHoverEnhancement({
      card,
      media,
      glow,
      sheen,
      overlay,
    });

    mm.add("(max-width: 767px)", () => {
      cleanups.push(
        createTimeline(section, card, media, glow, overlay, {
          startScale: 0.95,
          focusScale: 1.03,
          exitScale: 1.05,
          startY: 45,
          midY: 0,
          exitY: -65,
          startBlur: 2,
        })
      );
    });

    mm.add("(min-width: 768px) and (max-width: 1199px)", () => {
      cleanups.push(
        createTimeline(section, card, media, glow, overlay, {
          startScale: 0.91,
          focusScale: 1.08,
          exitScale: 1.12,
          startY: 70,
          midY: 0,
          exitY: -120,
          startBlur: 3,
        })
      );
    });

    mm.add("(min-width: 1200px)", () => {
      cleanups.push(
        createTimeline(section, card, media, glow, overlay, {
          startScale: 0.88,
          focusScale: 1.1,
          exitScale: 1.16,
          startY: 92,
          midY: 0,
          exitY: -170,
          startBlur: 4,
        })
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      mm.revert();
      removeHoverHandlers();
    };
  }, [disableMotion, videoSrc]);

  useEffect(() => {
    if (!videoSrc || !videoRef.current || !sectionRef.current) return;

    const video = videoRef.current;
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Playback can be blocked by browser policies if state changes unexpectedly.
          });
          return;
        }
        video.pause();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [videoSrc]);

  // ──────────────────────────────────────────────────────────────
  // ContainerScroll variant (Tabcura video 3-D tilt effect)
  // ──────────────────────────────────────────────────────────────
  if (useContainerScroll && videoSrc) {
    return (
      <section
        ref={sectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 border-t border-black/10 bg-[#0b0f13] mt-12 md:mt-16"
      >
        <ContainerScroll
          titleComponent={
            <div className="text-center px-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-2" style={{ fontFamily: "var(--font-geist-sans)" }}>
                {overlaySubtitle}
              </p>
              <h2
                className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
              >
                {overlayTitle}
              </h2>
            </div>
          }
        >
          {/* inner card content — video + glows */}
          <div className="relative w-full" style={{ aspectRatio: "16/9", minHeight: "400px" }}>
            {/* Glow */}
            <div
              ref={glowRef}
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(80% 70% at 62% 45%, rgba(0, 234, 255, 0.18) 0%, rgba(0, 234, 255, 0.06) 18%, rgba(0, 234, 255, 0) 72%)",
              }}
            />
            {/* Sheen */}
            <div
              ref={sheenRef}
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0) 68%)",
                mixBlendMode: "screen",
              }}
            />
            <video
              ref={videoRef}
              src={videoSrc}
              className="absolute inset-0 h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              controls
              autoPlay
            />
            {/* Overlay badge */}
            <div
              ref={overlayRef}
              className="pointer-events-none absolute bottom-4 left-4 z-30 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-white backdrop-blur-sm md:bottom-6 md:left-6"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] md:text-[11px]">{overlaySubtitle}</p>
              <p className="text-xs md:text-sm">{overlayTitle}</p>
            </div>
          </div>
        </ContainerScroll>
      </section>
    );
  }

  // ──────────────────────────────────────────────────────────────
  // Default GSAP variant (all other projects)
  // ──────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 mt-12 w-screen -translate-x-1/2 border-t border-black/10 pt-8 md:mt-16 md:pt-10"
    >
      <div
        className={
          videoSrc && fixedImageSize
            ? "relative flex h-screen items-center justify-center overflow-hidden bg-[#0b0f13]"
            : fixedImageSize
              ? "relative flex items-center justify-center overflow-hidden bg-[#0b0f13] py-10"
              : "relative flex h-screen items-center justify-center overflow-hidden bg-[#0b0f13]"
        }
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[20px] border border-white/15 shadow-[0_30px_120px_rgba(0,0,0,0.45)] transition-[box-shadow,filter] duration-300"
          style={{
            willChange: "transform, opacity",
            width: fixedImageSize ? fixedWidth : "100%",
            height: fixedImageSize ? fixedHeight : "100%",
          }}
        >
          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(80% 70% at 62% 45%, rgba(0, 234, 255, 0.18) 0%, rgba(0, 234, 255, 0.06) 18%, rgba(0, 234, 255, 0) 72%)",
              willChange: "transform, opacity",
            }}
          />
          <div
            ref={sheenRef}
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(110deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.24) 38%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 68%)",
              mixBlendMode: "screen",
              willChange: "transform, opacity",
            }}
          />
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              className="h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              controls
              autoPlay
            />
          ) : (
            <img
              ref={mediaRef}
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              style={{ willChange: "transform, opacity, filter" }}
            />
          )}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-white backdrop-blur-[2px] md:bottom-6 md:left-6"
            style={{ willChange: "transform, opacity" }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] md:text-[11px]">{overlaySubtitle}</p>
            <p className="text-xs md:text-sm">{overlayTitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
