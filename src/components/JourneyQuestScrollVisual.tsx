"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JourneyQuestScrollVisual() {
  // ─── refs for first video (ContainerScroll) ───
  const firstVideoRef = useRef<HTMLVideoElement | null>(null);
  const firstSectionRef = useRef<HTMLElement | null>(null);

  // ─── refs for second section (zombie video + text) ───
  const secondSectionRef = useRef<HTMLElement | null>(null);
  const zombieVideoRef = useRef<HTMLVideoElement | null>(null);
  const textLineRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);
  const text3Ref = useRef<HTMLSpanElement | null>(null);
  const overlayGradientRef = useRef<HTMLDivElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  // ─── refs for third section (journey.mp4 + gaming text) ───
  const thirdSectionRef = useRef<HTMLElement | null>(null);
  const journeyVideoRef = useRef<HTMLVideoElement | null>(null);
  const journeyVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const gamingTextWrapRef = useRef<HTMLDivElement | null>(null);
  const gamingTagRef = useRef<HTMLParagraphElement | null>(null);
  const gamingHead1Ref = useRef<HTMLDivElement | null>(null);
  const gamingHead2Ref = useRef<HTMLDivElement | null>(null);
  const gamingBodyRef = useRef<HTMLParagraphElement | null>(null);
  const gamingStatsRef = useRef<HTMLDivElement | null>(null);

  // ─── refs for fourth section (waitlist ticket) ───
  const fourthSectionRef = useRef<HTMLElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const waitlistTextRef = useRef<HTMLDivElement | null>(null);

  // ─── Play / Pause first video via IntersectionObserver ───
  useEffect(() => {
    const video = firstVideoRef.current;
    const section = firstSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  // ─── Play / Pause zombie video via IntersectionObserver ───
  useEffect(() => {
    const video = zombieVideoRef.current;
    const section = secondSectionRef.current;
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

  // ─── Play / Pause journey video (third section) via IntersectionObserver ───
  useEffect(() => {
    const video = journeyVideoRef.current;
    const section = thirdSectionRef.current;
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

  // ─── GSAP scroll animation for second section ───
  useLayoutEffect(() => {
    const section = secondSectionRef.current;
    const videoWrap = videoWrapRef.current;
    const zombieVideo = zombieVideoRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const text3 = text3Ref.current;
    const overlayGradient = overlayGradientRef.current;

    if (!section || !videoWrap || !zombieVideo || !text1 || !text2 || !text3 || !overlayGradient) return;

    // Initial states
    gsap.set(videoWrap, {
      clipPath: "inset(12% 8% 12% 8% round 24px)",
      scale: 0.88,
      opacity: 0,
      y: 60,
    });
    gsap.set(zombieVideo, {
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
          zombieVideo,
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

  // ─── GSAP scroll animation for third section ───
  useLayoutEffect(() => {
    const section = thirdSectionRef.current;
    const videoWrap = journeyVideoWrapRef.current;
    const textWrap = gamingTextWrapRef.current;
    const tag = gamingTagRef.current;
    const head1 = gamingHead1Ref.current;
    const head2 = gamingHead2Ref.current;
    const body = gamingBodyRef.current;
    const stats = gamingStatsRef.current;

    if (!section || !videoWrap || !textWrap || !tag || !head1 || !head2 || !body || !stats) return;

    // initial states — video slides from left, text from right
    gsap.set(videoWrap, { x: -80, opacity: 0, scale: 0.95 });
    gsap.set(textWrap, { x: 80, opacity: 0 });
    gsap.set([tag, head1, head2, body, stats], { y: 32, opacity: 0 });

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

      tl.to(videoWrap, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0)
        .to(textWrap, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0)
        .to(tag, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.3)
        .to(head1, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.42)
        .to(head2, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.55)
        .to(body, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, 0.68)
        .to(stats, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, 0.82);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => { mm.revert(); };
  }, []);

  // ─── GSAP scroll animation for fourth section (Ticket) ───
  useLayoutEffect(() => {
    const section = fourthSectionRef.current;
    const ticket = ticketRef.current;
    const text = waitlistTextRef.current;

    if (!section || !ticket || !text) return;

    gsap.set(ticket, { y: 80, opacity: 0, rotateZ: -12, rotateY: 25 });
    gsap.set(text, { y: 50, opacity: 0 });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=10%",
          end: "center center+=10%",
          scrub: 1,
        },
      });

      tl.to(ticket, { y: 0, opacity: 1, rotateZ: -6, rotateY: 10, duration: 1, ease: "power2.out" }, 0)
        .to(text, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 0.2);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => { mm.revert(); };
  }, []);


  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Primary JourneyQuest video (ContainerScroll)
          ══════════════════════════════════════════════════════ */}
      <section
        ref={firstSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 border-t border-black/10 bg-[#08090b] mt-12 md:mt-16"
      >
        <ContainerScroll
          titleComponent={
            <div className="text-center px-4">
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Project Showcase
              </p>
              <h2
                className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
              >
                JourneyQuest
              </h2>
            </div>
          }
        >
          <div className="relative w-full" style={{ aspectRatio: "16/9", minHeight: "400px" }}>
            {/* Glow overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(70% 60% at 55% 48%, rgba(180,100,255,0.22) 0%, rgba(80,40,180,0.08) 40%, transparent 72%)",
              }}
            />
            <video
              ref={firstVideoRef}
              src="/projects/fantasy-journey.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              autoPlay
              muted
            />
          </div>
        </ContainerScroll>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Zombie JourneyQuest video with Star-Atlas-style text
          ══════════════════════════════════════════════════════ */}
      <section
        ref={secondSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06070a]"
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
          ref={videoWrapRef}
          className="absolute inset-0 z-10 overflow-hidden"
          style={{ willChange: "clip-path, transform, opacity" }}
        >
          <video
            ref={zombieVideoRef}
            src="/projects/zomibee_journeyquest.mp4"
            className="h-full w-full object-cover"
            loop
            playsInline
            preload="auto"
            muted
            style={{ willChange: "transform, filter" }}
          />

          {/* Bottom gradient so text stays legible */}
          <div
            ref={overlayGradientRef}
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(to top, rgba(6,7,10,0.92) 0%, rgba(6,7,10,0.55) 30%, rgba(6,7,10,0.18) 55%, rgba(6,7,10,0.04) 100%)",
            }}
          />
        </div>

        {/* ── Text overlay — bottom-left, Star Atlas style ── */}
        <div
          ref={textLineRef}
          className="pointer-events-none absolute bottom-[8vh] left-[4vw] z-30 md:bottom-[10vh] md:left-[5vw] lg:left-[6vw]"
        >
          {/* Tag */}
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.38em] text-white/50 md:text-[11px]"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Journey Quest / Zombie Mode
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
              EXPLORE,
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
              CONQUER,
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
                background: "linear-gradient(90deg, #c084fc, #818cf8, #38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DIFFERENT STORY EVERYTIME
            </span>
          </div>
        </div>

        {/* ── Subtle corner glow ── */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-25 h-[55%] w-[45%] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(120,60,220,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 right-0 z-25 h-[40%] w-[35%] opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(56,189,248,0.35) 0%, transparent 65%)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — journey.mp4 left + gaming community text right
          ══════════════════════════════════════════════════════ */}
      <section
        ref={thirdSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0a0b0f]"
      >
        {/* Top glow divider */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(129,140,248,0.5) 30%, rgba(192,132,252,0.5) 55%, transparent 100%)",
          }}
        />

        <div className="mx-auto grid min-h-[90svh] max-w-[1600px] grid-cols-1 items-center gap-0 lg:grid-cols-2">

          {/* ── Left: journey.mp4 ── */}
          <div
            ref={journeyVideoWrapRef}
            className="relative h-[52svh] w-full overflow-hidden lg:h-full z-0"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Right-edge fade so video bleeds into text area */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to right, transparent 55%, rgba(10,11,15,0.98) 100%), linear-gradient(to top, rgba(10,11,15,0.5) 0%, transparent 25%)",
              }}
            />
            <video
              ref={journeyVideoRef}
              src="/videos/journey.mp4"
              className="h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              muted
              autoPlay
              controls
              style={{ willChange: "transform" }}
            />
          </div>

          {/* ── Right: gaming community text ── */}
          <div
            ref={gamingTextWrapRef}
            className="flex flex-col justify-center px-8 pt-14 pb-32 md:px-12 lg:px-16 lg:pt-20 lg:pb-[280px] relative z-20"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Tag */}
            <p
              ref={gamingTagRef}
              className="mb-5 text-[10px] uppercase tracking-[0.4em] md:text-[11px]"
              style={{
                fontFamily: "var(--font-geist-sans)",
                color: "rgba(192,132,252,0.75)",
                willChange: "transform, opacity",
              }}
            >
              For the community · By the community
            </p>

            {/* Main headline — line 1 */}
            <div ref={gamingHead1Ref} style={{ willChange: "transform, opacity", overflow: "hidden" }}>
              <h2
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  color: "#ffffff",
                  display: "block",
                }}
              >
                EVERY SESSION
              </h2>
            </div>

            {/* Main headline — line 2 gradient */}
            <div
              ref={gamingHead2Ref}
              style={{ willChange: "transform, opacity", overflow: "hidden", marginBottom: "1.5rem" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  display: "block",
                  background: "linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                WRITES ITS OWN LEGEND
              </h2>
            </div>

            {/* Body copy */}
            <p
              ref={gamingBodyRef}
              className="max-w-[38ch] leading-[1.7] text-white/60"
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
                willChange: "transform, opacity",
              }}
            >
              JourneyQuest is built for players who crave stories that breathe. No two runs, no two
              choices, no two endings are ever the same. Your decisions ripple across a living world —
              allies remember, enemies adapt, and every quest rewards curiosity.
            </p>

            {/* Stats row */}
            <div
              ref={gamingStatsRef}
              className="mt-10 grid grid-cols-3 gap-6"
              style={{ willChange: "transform, opacity" }}
            >
              {([
                { value: "∞", label: "Story Paths" },
                { value: "AI", label: "Narrative Engine" },
                { value: "0%", label: "Scripted Endings" },
              ] as const).map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                      background: "linear-gradient(135deg, #c084fc, #818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] text-white/40"
                    style={{ fontFamily: "var(--font-geist-sans)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative quote block */}
            <div className="mt-10 flex items-start gap-3">
              <div
                className="mt-1 shrink-0 w-[2px] rounded-full"
                style={{
                  background: "linear-gradient(180deg, #c084fc, #38bdf8)",
                  minHeight: "52px",
                }}
              />
              <p
                className="italic text-white/35 leading-[1.65]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                }}
              >
                "The best games don't tell you a story — they help you become one."
              </p>
            </div>
          </div>
        </div>

        {/* Curved background transition to next section */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[120px] sm:h-[180px] md:h-[250px] lg:h-[320px]" preserveAspectRatio="none">
            <path fill="#ece9e9" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Waitlist Ticket & Call to Action
          ══════════════════════════════════════════════════════ */}
      <section
        ref={fourthSectionRef}
        className="relative w-screen left-1/2 -translate-x-1/2 bg-[#ece9e9] py-20 md:py-32 overflow-hidden"
      >
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-16 px-6 md:flex-row lg:px-12">
          
          {/* Left: Ticket */}
          <div className="relative w-full max-w-[800px] shrink-0 md:w-[55%] flex justify-center perspective-[1200px]">
            {/* TICKET CONTAINER */}
            <div 
              ref={ticketRef}
              className="group relative flex w-full max-w-[650px] transition-all duration-500 hover:scale-[1.03] cursor-pointer"
              style={{ 
                transform: "rotate(-6deg) rotateY(10deg)",
                color: "white",
                aspectRatio: "2 / 1",
                willChange: "transform, opacity"
              }}
            >
              {/* LEFT STUB */}
              <div className="relative flex w-[35%] flex-col justify-between border-r-[2px] border-dashed border-white/40 p-5 sm:p-6 lg:p-8 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-x-4 group-hover:-translate-y-1 group-hover:-rotate-[4deg] shadow-[0_30px_60px_rgba(156,34,38,0.3)] group-hover:shadow-[0_20px_40px_rgba(156,34,38,0.25)] z-10 origin-bottom-right"
                   style={{ backgroundColor: "#9c2226", borderRadius: "16px 0 0 16px" }}>
                
                {/* Inner white outline (Left border) */}
                <div className="pointer-events-none absolute inset-[8px] right-0 rounded-l-[12px] border border-white/25 border-r-0" />
                
                <div className="flex justify-between text-[9px] sm:text-[10px] lg:text-[12px] uppercase tracking-[0.15em] opacity-85" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  <span>'26</span>
                  <div className="text-right">
                    <p>MARCH</p>
                    <p>#318-B123</p>
                  </div>
                </div>
                
                <div className="relative mt-auto flex-1 overflow-hidden">
                  {/* Rotated text */}
                  <div className="absolute bottom-2 right-1 lg:bottom-4 lg:right-2 origin-bottom-right -rotate-90 whitespace-nowrap text-[1.2rem] sm:text-[1.5rem] lg:text-[2rem] opacity-95 tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Referrals <span className="font-bold italic">R—K</span>
                  </div>
                  {/* Graphic Silhouette (Large JQ monogram) */}
                  <div className="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-4 opacity-[0.15] select-none pointer-events-none">
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(100px, 12vw, 160px)", lineHeight: 0.8, letterSpacing: "-0.05em" }}>JQ</span>
                  </div>
                </div>
                
                {/* Top/Bottom Cutouts for tear line */}
                <div className="absolute -top-[16px] -right-[16px] lg:-top-[20px] lg:-right-[20px] h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-[#ece9e9] shadow-inner transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute -bottom-[16px] -right-[16px] lg:-bottom-[20px] lg:-right-[20px] h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-[#ece9e9] shadow-inner transition-opacity duration-300 group-hover:opacity-0" />
              </div>

              {/* RIGHT MAIN BODY */}
              <div className="relative flex w-[65%] flex-col p-5 sm:p-6 lg:p-8 sm:pl-8 lg:pl-10 pl-6 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-5 group-hover:translate-y-2 group-hover:rotate-[3deg] shadow-[0_30px_60px_rgba(156,34,38,0.3)] group-hover:shadow-[0_20px_40px_rgba(156,34,38,0.25)] z-10 origin-bottom-left"
                   style={{ backgroundColor: "#9c2226", borderRadius: "0 16px 16px 0" }}>
                
                {/* Inner white outline (Right border) */}
                <div className="pointer-events-none absolute inset-[8px] left-0 rounded-r-[12px] border border-white/25 border-l-0" />
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[0.85] tracking-tight" style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}>20%</span>
                    <span className="mt-2 text-[1.3rem] sm:text-[1.8rem] lg:text-[2.2rem] leading-[1.05]" style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}>
                      For<br/>Each<br/>Referral
                    </span>
                  </div>
                  <div className="text-right text-[9px] sm:text-[10px] lg:text-[12px] uppercase tracking-[0.15em] opacity-85" style={{ fontFamily: "var(--font-geist-sans)" }}>
                    <p>COUPON</p>
                    <p>TYPE #232-A-REFER</p>
                  </div>
                </div>
                
                <div className="mt-auto flex items-end justify-between relative">
                  {/* RIP HERE */}
                  <div className="absolute bottom-2 lg:bottom-4 -left-[1.5rem] lg:-left-[2rem] origin-left -rotate-90 text-[9px] sm:text-[10px] lg:text-[12px] tracking-[0.2em] opacity-70 whitespace-nowrap" style={{ fontFamily: "var(--font-geist-sans)" }}>
                    RIP HERE
                  </div>
                  
                  {/* Barcode */}
                  <div className="ml-auto mt-6 lg:mt-10 flex flex-col items-end opacity-95">
                    <div className="flex h-12 sm:h-16 lg:h-20 items-end gap-[2px] lg:gap-[3px]">
                      {[3, 1, 2, 4, 1, 2, 3, 1, 5, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 5].map((w, i) => (
                        <div key={i} className="bg-white" style={{ width: w * 1.8, height: i % 4 === 0 ? '100%' : '80%' }} />
                      ))}
                    </div>
                    <div className="mt-2 flex w-full justify-between text-[8px] sm:text-[9px] lg:text-[11px] tracking-[0.2em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      <span>2 3 6 8</span>
                      <span>2 3 7 8 4 5</span>
                      <span>1 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div 
            ref={waitlistTextRef}
            className="flex w-full flex-col items-start md:w-1/2 md:pl-8 lg:pl-12 relative z-10"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="max-w-[14ch] text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] text-[#2b1f1f]" style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}>
              Join the waitlist now for the real adventure that never ends.
            </h2>
            <p className="mt-6 text-[clamp(1.05rem,1.2vw,1.15rem)] leading-[1.6] text-[#2b1f1f]/75 max-w-[42ch]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Your journey is just beginning. Secure your spot and you can just go along with the evolving world of JourneyQuest.
            </p>
            <button className="mt-10 rounded-full bg-[#111] px-8 py-4 text-[0.8rem] uppercase tracking-[0.15em] text-white transition-all hover:scale-105 hover:bg-[#9c2226] hover:shadow-[0_10px_20px_rgba(156,34,38,0.25)] duration-300" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Join Waitlist
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
