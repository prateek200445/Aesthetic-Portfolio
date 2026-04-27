"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TabcuraScrollVisual from "@/components/TabcuraScrollVisual";
import type { Project } from "@/lib/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VedaScrollVisual({ project }: { project: Project }) {
  // ─── refs for second section (veda book video + text) ───
  const bookSectionRef = useRef<HTMLElement | null>(null);
  const bookVideoRef = useRef<HTMLVideoElement | null>(null);
  const bookVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);
  const text3Ref = useRef<HTMLSpanElement | null>(null);
  const overlayGradientRef = useRef<HTMLDivElement | null>(null);

  // ─── refs for third section (veda bucket video portrait + text) ───
  const bucketSectionRef = useRef<HTMLElement | null>(null);
  const bucketVideoRef = useRef<HTMLVideoElement | null>(null);
  const bucketVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const bucketTextWrapRef = useRef<HTMLDivElement | null>(null);

  // ─── refs for fourth section (locate hospital video + stick figure) ───
  const locateSectionRef = useRef<HTMLElement | null>(null);
  const locatePinRef = useRef<HTMLDivElement | null>(null); // GSAP pins this element
  const locateVideoRef = useRef<HTMLVideoElement | null>(null);
  const runnerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const phrase1Ref = useRef<HTMLSpanElement | null>(null);
  const phrase2Ref = useRef<HTMLSpanElement | null>(null);
  const phrase3Ref = useRef<HTMLSpanElement | null>(null);
  const phrase4Ref = useRef<HTMLSpanElement | null>(null); // "and reach your destination easily"

  // ─── Play / Pause book video via IntersectionObserver ───
  useEffect(() => {
    const video = bookVideoRef.current;
    const section = bookSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // ─── Play / Pause bucket video via IntersectionObserver ───
  useEffect(() => {
    const video = bucketVideoRef.current;
    const section = bucketSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // ─── Play / Pause locate hospital video via IntersectionObserver ───
  useEffect(() => {
    const video = locateVideoRef.current;
    const section = locateSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // ─── GSAP scroll animation for book video (zombie style) ───
  useLayoutEffect(() => {
    const section = bookSectionRef.current;
    const videoWrap = bookVideoWrapRef.current;
    const video = bookVideoRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const text3 = text3Ref.current;
    const overlayGradient = overlayGradientRef.current;

    if (!section || !videoWrap || !video || !text1 || !text2 || !text3 || !overlayGradient) return;

    // Initial states
    gsap.set(videoWrap, {
      clipPath: "inset(12% 8% 12% 8% round 24px)",
      scale: 0.88,
      opacity: 0,
      y: 60,
    });
    gsap.set(video, {
      scale: 1.12,
      filter: "brightness(0.6) saturate(0.6)",
    });
    gsap.set([text1, text2, text3], {
      opacity: 0,
      y: 48,
      skewY: 4,
    });
    gsap.set(overlayGradient, { opacity: 0 });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=10%",
          end: "center center",
          scrub: 1.4,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: video wrapper expands from pill-shape inset to full-bleed
      tl.to(
        videoWrap,
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      )
        // Video itself sharpens / brightens
        .to(
          video,
          {
            scale: 1,
            filter: "brightness(0.85) saturate(1.05)",
            duration: 1,
            ease: "power1.out",
          },
          0
        )
        // Overlay gradient fades in
        .to(
          overlayGradient,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.2
        )
        // Text lines stagger in
        .to(
          text1,
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.5
        )
        .to(
          text2,
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.65
        )
        .to(
          text3,
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.8
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  // ─── GSAP scroll animation for bucket portrait section ───
  useLayoutEffect(() => {
    const section = bucketSectionRef.current;
    const videoWrap = bucketVideoWrapRef.current;
    const textWrap = bucketTextWrapRef.current;

    if (!section || !videoWrap || !textWrap) return;

    gsap.set(videoWrap, { y: 100, opacity: 0, rotateZ: -4 });
    gsap.set(textWrap, { x: 80, opacity: 0 });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=10%",
          end: "center center+=10%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(videoWrap, { y: 0, opacity: 1, rotateZ: 0, duration: 1, ease: "power2.out" }, 0)
        .to(textWrap, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.2);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => { mm.revert(); };
  }, []);

  // ─── GSAP scroll animation for Locate Hospital section ───
  useLayoutEffect(() => {
    const lSection = locateSectionRef.current;
    const runner = runnerRef.current;
    const track = trackRef.current;
    const p1 = phrase1Ref.current;
    const p2 = phrase2Ref.current;
    const p3 = phrase3Ref.current;
    const p4 = phrase4Ref.current;

    if (!lSection || !runner || !track || !p1 || !p2 || !p3) return;

    // Set initial states — everything hidden at start
    gsap.set([p1, p2, p3], { opacity: 0, y: 28 });
    if (p4) gsap.set(p4, { opacity: 0, y: 16 });
    gsap.set(runner, { x: 0 });

    // Proxy to drive the route fill bar via onUpdate
    const routeProxy = { pct: 0 };
    const routeFillEl = document.getElementById("veda-route-fill");
    const hospitalIcon = document.getElementById("veda-hospital-icon");

    /*
     * CSS sticky keeps the inner div pinned visually.
     * GSAP only needs to scrub through the outer section's scroll range:
     *   start = when section-top hits viewport-top
     *   end   = when section-bottom hits viewport-bottom
     * No "pin:" here — CSS handles that.
     */
    const lTl = gsap.timeline({
      scrollTrigger: {
        trigger: lSection,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Phrases stagger in while runner simultaneously starts moving
    // Runner begins at 0 — same moment "LOCATE NEARBY" appears
    lTl
      .to(p1, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0)
      .to(p2, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.6)
      .to(p3, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.2);

    if (p4) {
      lTl.to(p4, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.8);
    }

    // Runner starts moving at 0 (same as first phrase) and travels for 4 units
    lTl.to(
      runner,
      {
        x: () => track.offsetWidth - runner.offsetWidth - 72,
        ease: "none",
        duration: 4,
      },
      0
    );

    // Route fill bar follows the runner in lockstep
    lTl.to(
      routeProxy,
      {
        pct: 88,
        ease: "none",
        duration: 4,
        onUpdate: () => {
          if (routeFillEl) routeFillEl.style.width = `${routeProxy.pct}%`;
        },
      },
      0
    );

    // Hospital icon glows when runner arrives (at end of its journey)
    lTl.to(
      hospitalIcon,
      {
        filter: "drop-shadow(0 0 24px rgba(16,185,129,1)) drop-shadow(0 0 48px rgba(16,185,129,0.6))",
        scale: 1.14,
        duration: 0.5,
        ease: "back.out(2)",
      },
      4.2
    );

    // Force GSAP to remeasure after sticky layout + wave SVG fully settle
    // Double-tick ensures CSS sticky and the new wave element are painted
    const rafId = requestAnimationFrame(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 80);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lTl.scrollTrigger?.kill();
      lTl.kill();
    };
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Primary Vedatec video (TabcuraScrollVisual)
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <TabcuraScrollVisual
          imageSrc={project.image}
          videoSrc="/videos/vedatec.mp4"
          imageAlt={`${project.title} project visual`}
          overlayTitle={project.title}
          overlaySubtitle="Project showcase"
          useContainerScroll={true}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Veda Book Video (Zombie Style Animation)
          ══════════════════════════════════════════════════════ */}
      <section
        ref={bookSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06070a] z-20"
        style={{ minHeight: "100svh" }}
      >
        {/* Ambient dark bg grain */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />

        {/* ── Video wrapper — animates from pill → full-bleed ── */}
        <div
          ref={bookVideoWrapRef}
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ willChange: "clip-path, transform, opacity" }}
        >
          <video
            ref={bookVideoRef}
            src="/projects/veda-book.mp4"
            className="h-full w-full object-cover"
            loop
            playsInline
            preload="auto"
            muted
            style={{ willChange: "transform, filter" }}
          />

          {/* Bottom/Left gradient so text stays legible */}
          <div
            ref={overlayGradientRef}
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(to right, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.4) 40%, transparent 100%), linear-gradient(to top, rgba(6,7,10,0.8) 0%, transparent 30%)",
            }}
          />
        </div>

        {/* ── Text overlay — bottom-left, Zombie style ── */}
        <div
          className="pointer-events-none absolute bottom-[8vh] left-[4vw] z-30 md:bottom-[10vh] md:left-[5vw] lg:left-[6vw]"
        >
          {/* Tag */}
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.38em] text-white/50 md:text-[11px]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Veda AI / The Ancient Manuscript
          </p>

          {/* Main headline — split into three staggered spans */}
          <div className="overflow-hidden">
            <span
              ref={text1Ref}
              className="block text-white"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.2rem, 8.5vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "0.025em",
                willChange: "transform, opacity",
                display: "block",
              }}
            >
              ANCIENT
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={text2Ref}
              className="block text-white"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.2rem, 8.5vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "0.025em",
                willChange: "transform, opacity",
                display: "block",
              }}
            >
              WISDOM,
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={text3Ref}
              className="block"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.2rem, 8.5vw, 9rem)",
                lineHeight: 0.92,
                letterSpacing: "0.025em",
                willChange: "transform, opacity",
                display: "block",
                background: "linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DIGITIZED FOR TODAY
            </span>
          </div>
        </div>

        {/* Curved boundary transition to next section */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px]" preserveAspectRatio="none">
            <path fill="#020405" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Veda Bucket Video (Portrait) + Text
          ══════════════════════════════════════════════════════ */}
      <section
        ref={bucketSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#020405] py-20 md:py-32 z-20"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-12 px-6 md:flex-row lg:gap-24 lg:px-12">
          
          {/* Left: Portrait Video */}
          <div className="relative w-full max-w-[400px] shrink-0 md:w-1/2 flex justify-center perspective-[1200px]">
            <div 
              ref={bucketVideoWrapRef}
              className="relative w-full overflow-hidden shadow-[0_30px_60px_rgba(16,185,129,0.15)] transition-transform duration-700 ease-out"
              style={{ 
                borderRadius: "24px",
                aspectRatio: "9 / 16",
                willChange: "transform, opacity",
                backgroundColor: "#06070a",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
            >
              <video
                ref={bucketVideoRef}
                src="/projects/veda-bucket.mp4"
                className="h-full w-full object-cover"
                loop
                playsInline
                preload="auto"
                muted
                autoPlay
              />
              {/* Subtle inner shadow for depth */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          {/* Right: Text */}
          <div 
            ref={bucketTextWrapRef}
            className="flex w-full flex-col items-start md:w-1/2 relative z-10"
            style={{ willChange: "transform, opacity" }}
          >
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.38em] text-[#10b981]/80"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Ayurvedic Ingredients
            </p>
            <h2 
              className="max-w-[14ch] text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.9] text-white" 
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.02em" }}
            >
              SELECT HERBS FROM THE ANCIENT AYURVEDA ANYTIME
            </h2>
            <p 
              className="mt-8 text-[clamp(1.05rem,1.2vw,1.15rem)] leading-[1.6] text-white/60 max-w-[42ch]" 
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Immerse yourself in a curated library of potent herbs and formulations. Our AI-driven platform helps you pinpoint exact Ayurvedic solutions instantly.
            </p>
            <button 
              className="mt-12 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[0.8rem] uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-black duration-300" 
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Explore Library
            </button>
          </div>

        </div>
        
        {/* Curved boundary — black section flows into mint locate section */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px]" preserveAspectRatio="none">
            <path fill="#f0faf6" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Locate Hospital (Scroll-Driven Storytelling)
          ══════════════════════════════════════════════════════ */}
      <section
        ref={locateSectionRef}
        className="relative w-screen left-1/2 -translate-x-1/2"
        style={{
          height: "300vh",
          background: "linear-gradient(to bottom, #f0faf6 0%, #e8f5f0 15%, #edf6ff 70%, #f5f0ff 100%)",
        }}
      >
        {/* CSS sticky — pins visually while outer section provides scroll space */}
        <div
          ref={locatePinRef}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pb-16 md:pb-24"
          style={{
            background: "linear-gradient(to bottom, #f0faf6 0%, #e8f5f0 30%, #edf6ff 70%, #f5f0ff 100%)",
          }}
        >

          {/* ── Faint map grid background ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* ── Radial soft glow center ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(16,185,129,0.10) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 20%, rgba(59,130,246,0.07) 0%, transparent 60%)",
            }}
          />

          {/* ── Floating decorative map pins ── */}
          {[
            { top: "12%", left: "8%", delay: "0s", color: "#10b981" },
            { top: "25%", left: "85%", delay: "0.4s", color: "#3b82f6" },
            { top: "68%", left: "6%", delay: "0.8s", color: "#8b5cf6" },
            { top: "72%", left: "91%", delay: "0.2s", color: "#10b981" },
            { top: "18%", left: "55%", delay: "1.2s", color: "#f59e0b" },
          ].map((pin, i) => (
            <div
              key={i}
              className="pointer-events-none absolute z-0"
              style={{ top: pin.top, left: pin.left }}
            >
              <svg
                width="22"
                height="30"
                viewBox="0 0 22 30"
                style={{
                  filter: `drop-shadow(0 2px 8px ${pin.color}55)`,
                  animation: `mapPinFloat 3s ${pin.delay} ease-in-out infinite`,
                }}
              >
                <path
                  d="M11 0C4.925 0 0 4.925 0 11c0 7.222 11 19 11 19s11-11.778 11-19c0-6.075-4.925-11-11-11z"
                  fill={pin.color}
                  opacity="0.7"
                />
                <circle cx="11" cy="11" r="4" fill="white" opacity="0.9" />
              </svg>
            </div>
          ))}

          {/* ── Section top label ── */}
          <div className="relative z-10 w-full flex justify-center pt-8 md:pt-10">
            <p
              className="text-[10px] md:text-[11px] uppercase tracking-[0.38em] text-[#10b981]/80"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Veda AI / Locate Hospitals
            </p>
          </div>

          {/* ── Decorative wave curve above video ── */}
          <div className="relative z-10 w-full pointer-events-none" style={{ marginTop: "-4px" }}>
            <svg
              viewBox="0 0 1440 90"
              preserveAspectRatio="none"
              className="w-full"
              style={{ height: "clamp(40px, 6vw, 80px)", display: "block" }}
            >
              <defs>
                <linearGradient id="vedaLocateWaveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8f0e0" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#e8f5f0" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Filled wave body */}
              <path
                d="M0,0 C200,90 400,20 720,60 C1040,100 1240,15 1440,0 L1440,90 L0,90 Z"
                fill="url(#vedaLocateWaveGrad)"
              />
              {/* Crisp wave line on top */}
              <path
                d="M0,0 C200,90 400,20 720,60 C1040,100 1240,15 1440,0"
                fill="none"
                stroke="rgba(16,185,129,0.25)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* ── Hero Video ── */}
          <div className="relative z-10 w-full flex justify-center px-4 mt-0">
            <div
              className="relative w-full overflow-hidden shadow-[0_24px_60px_rgba(16,185,129,0.18),0_8px_24px_rgba(0,0,0,0.10)]"
              style={{
                maxWidth: "min(780px, 90vw)",
                borderRadius: "20px",
                border: "1px solid rgba(16,185,129,0.18)",
                aspectRatio: "16/9",
                background: "#e8f5f0",
              }}
            >
              <video
                ref={locateVideoRef}
                src="/projects/locate%20hospital-veda.mp4"
                className="h-full w-full object-cover"
                loop
                playsInline
                preload="auto"
                muted
                autoPlay
              />
              {/* Subtle inner glow border */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  borderRadius: "20px",
                  boxShadow: "inset 0 0 30px rgba(16,185,129,0.08)",
                }}
              />
              {/* Floating "Google Maps" badge */}
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#10b981"/>
                  <circle cx="12" cy="9" r="2.5" fill="white"/>
                </svg>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: "10px", fontWeight: 600, color: "#1a1a1a", letterSpacing: "0.05em" }}>
                  Google Maps
                </span>
              </div>
            </div>
          </div>

          {/* ── Sequential Text Phrases ── */}
          <div
            className="relative z-10 w-full flex flex-col items-center mt-5 px-6 gap-1"
            style={{ minHeight: "80px" }}
          >
            {[
              { ref: phrase1Ref, text: "Locate nearby", color: "#1a2a1f" },
              { ref: phrase2Ref, text: "general as well as Ayurvedic hospitals", color: "#10b981" },
              { ref: phrase3Ref, text: "with inbuilt Google Maps support —", color: "#1a2a1f" },
            ].map((item, i) => (
              <span
                key={i}
                ref={item.ref}
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "0.04em",
                  color: item.color,
                  willChange: "transform, opacity",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {item.text}
              </span>
            ))}
          </div>

          {/* ── Journey Track ── */}
          <div
            className="relative z-10 w-full px-6 md:px-12 mt-4"
            style={{ maxWidth: "min(860px, 92vw)", margin: "16px auto 0" }}
          >
            {/* Track label row */}
            <div className="flex justify-between mb-2">
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(26,42,31,0.45)",
                }}
              >
                Your Location
              </span>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(16,185,129,0.75)",
                }}
              >
                Hospital
              </span>
            </div>

            {/* Track rail */}
            <div
              ref={trackRef}
              className="relative flex items-center"
              style={{ height: "72px" }}
            >
              {/* Dashed route rail */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: "50%",
                  height: "3px",
                  transform: "translateY(-50%)",
                  background: "linear-gradient(90deg, rgba(16,185,129,0.18) 0%, rgba(59,130,246,0.15) 100%)",
                  borderRadius: "2px",
                }}
              />
              {/* Animated route fill */}
              <div
                id="veda-route-fill"
                className="absolute left-0"
                style={{
                  top: "50%",
                  height: "3px",
                  width: "0%",
                  transform: "translateY(-50%)",
                  background: "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)",
                  borderRadius: "2px",
                  boxShadow: "0 0 8px rgba(16,185,129,0.5)",
                  willChange: "width",
                  transition: "width 0.05s linear",
                }}
              />

              {/* Footstep dots along the path */}
              {[15, 28, 41, 54, 67, 80].map((pct, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${pct}%`,
                    top: "calc(50% + 10px)",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.3)",
                    transform: "translateX(-50%)",
                  }}
                />
              ))}

              {/* Runner (stick figure) */}
              <div
                ref={runnerRef}
                className="absolute left-0 z-20 flex flex-col items-center"
                style={{ willChange: "transform" }}
              >
                {/* Stick figure SVG */}
                <svg
                  width="44"
                  height="64"
                  viewBox="0 0 44 64"
                  style={{ filter: "drop-shadow(0 4px 12px rgba(16,185,129,0.35))" }}
                >
                  {/* Head */}
                  <circle cx="22" cy="8" r="7" fill="#0f172a" />
                  {/* Body */}
                  <line x1="22" y1="15" x2="22" y2="38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Left arm */}
                  <line x1="22" y1="22" x2="10" y2="30" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Right arm */}
                  <line x1="22" y1="22" x2="34" y2="30" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Left leg */}
                  <line x1="22" y1="38" x2="12" y2="54" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Right leg */}
                  <line x1="22" y1="38" x2="32" y2="54" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Motion trail */}
                  <circle cx="18" cy="34" r="2" fill="#10b981" opacity="0.5" />
                  <circle cx="14" cy="38" r="1.5" fill="#10b981" opacity="0.3" />
                </svg>
                {/* Runner shadow */}
                <div
                  style={{
                    width: "28px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.18)",
                    marginTop: "-6px",
                    filter: "blur(3px)",
                  }}
                />
              </div>

              {/* Hospital destination */}
              <div
                id="veda-hospital-icon"
                className="absolute right-0 z-20 flex flex-col items-center"
                style={{ willChange: "transform, filter" }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 8px 24px rgba(16,185,129,0.35)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="18" rx="2" fill="white" opacity="0.2"/>
                    <rect x="2" y="3" width="20" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                    <line x1="12" y1="8" x2="12" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="9" y="16" width="6" height="5" rx="1" stroke="white" strokeWidth="1.5"/>
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#10b981",
                    marginTop: "4px",
                  }}
                >
                  Hospital
                </span>
              </div>
            </div>

            {/* Bottom sub-text */}
            <div className="flex justify-center mt-4">
              <span
                ref={phrase4Ref}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                  color: "rgba(26,42,31,0.5)",
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                and reach your destination easily
              </span>
            </div>
          </div>

          {/* ── Ayurvedic + General tags ── */}
          <div className="relative z-10 flex gap-3 mt-5 flex-wrap justify-center px-4">
            {["Ayurvedic Hospitals", "General Hospitals", "Inbuilt Navigation", "Real-time Maps"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  border: "1px solid rgba(16,185,129,0.30)",
                  background: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(6px)",
                  color: "#0f5132",
                  boxShadow: "0 2px 10px rgba(16,185,129,0.10)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── CSS keyframes for map pin float ── */}
        <style>{`
          @keyframes mapPinFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
        `}</style>
      </section>

      {/* Bottom exit curve — hanging down to avoid covering content */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 leading-none z-30 pointer-events-none -mt-[1px]">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="block w-full h-[60px] sm:h-[100px] md:h-[140px]" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#f5f0ff" 
            fillOpacity="1" 
            d="M0,96L80,112C160,128,320,160,480,160C640,160,800,128,960,112C1120,96,1280,96,1360,96L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Spacer to push next section down if needed */}
      <div className="h-0 w-full relative z-40 mt-[20px] md:mt-[40px] pointer-events-none" />

    </>
  );
}
