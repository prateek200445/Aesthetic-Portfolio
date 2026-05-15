"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TabcuraScrollVisual from "@/components/TabcuraScrollVisual";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import HlsVideoPlayer from "@/components/ui/HlsVideoPlayer";
import type { Project } from "@/lib/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AiMcpScrollVisual({ project }: { project: Project }) {
  // ─── refs for brain portrait section ───
  const brainSectionRef = useRef<HTMLElement | null>(null);
  const brainVideoRef = useRef<HTMLVideoElement | null>(null);
  const brainVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const brainTextWrapRef = useRef<HTMLDivElement | null>(null);

  // ─── Play / Pause brain video via IntersectionObserver ───
  useEffect(() => {
    const video = brainVideoRef.current;
    const section = brainSectionRef.current;
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

  // ─── GSAP scroll animation for brain portrait section ───
  useLayoutEffect(() => {
    const section = brainSectionRef.current;
    const videoWrap = brainVideoWrapRef.current;
    const textWrap = brainTextWrapRef.current;

    if (!section || !videoWrap || !textWrap) return;

    // Initial states for portrait video (slides up, rotates in) and text (slides in from right)
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

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Primary AI MCP video (TabcuraScrollVisual)
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <TabcuraScrollVisual
          imageSrc={project.image}
          videoSrc="/projects/AI-mcp%20project%20showcase.mp4"
          imageAlt={`${project.title} project visual`}
          overlayTitle={project.title}
          overlaySubtitle="Project showcase"
          useContainerScroll={true}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Globe Section
          ══════════════════════════════════════════════════════ */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden bg-[#020405] pt-14 pb-20 md:pt-18 md:pb-32 lg:pb-40 mt-0 z-20">
        
        {/* Curved boundary transitioning from the video section */}
        <div className="absolute top-[-1px] left-0 w-full leading-none z-10 pointer-events-none rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px]" preserveAspectRatio="none">
            <path fill="#0b0f13" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(45,229,240,0.18),transparent_30%),radial-gradient(circle_at_70%_36%,rgba(45,229,240,0.08),transparent_28%),linear-gradient(180deg,rgba(0,255,255,0.05),transparent_35%,rgba(0,0,0,0.26))]" />
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
          <div className="relative z-10 max-w-xl pt-2 text-neutral-100">
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.34em] text-neutral-300/80"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              AI-MCP / GLOBAL REACH
            </p>
            <h2
              className="max-w-[14ch] text-[clamp(3.5rem,7vw,7rem)] leading-[0.88] text-neutral-100"
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.018em" }}
            >
              GLOBAL REACH & COMPLIANCE
            </h2>
            <p
              className="mt-6 max-w-lg text-[clamp(1.25rem,1.6vw,1.7rem)] leading-[1.5] text-neutral-200/85"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              A comprehensive platform for orchestrating and managing multiple LLM agents, enabling complex multi-agent workflows and coordinated AI interactions.
            </p>
            <div className="mt-8 grid max-w-[24rem] grid-cols-2 gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-neutral-200/85">
              <div
                className="rounded-full border border-neutral-400/35 bg-neutral-900/30 px-4 py-3 text-center"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.18em" }}
              >
                LLM
              </div>
              <div
                className="rounded-full border border-neutral-400/35 bg-neutral-900/30 px-4 py-3 text-center"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.18em" }}
              >
                Agents
              </div>
            </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:justify-end">
            <RotatingEarth width={1240} height={740} />
          </div>
        </div>
        
        {/* Curved boundary transitioning to next section (Brain video) */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px]" preserveAspectRatio="none">
            <path fill="#06070a" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — AI MCP Brain Video (Portrait) + Text
          ══════════════════════════════════════════════════════ */}
      <section
        ref={brainSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06070a] py-20 md:py-32 z-20"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-12 px-6 md:flex-row lg:gap-24 lg:px-12">
          
          {/* Left: Portrait Video */}
          <div className="relative w-full max-w-[400px] shrink-0 md:w-1/2 flex justify-center perspective-[1200px]">
            <div 
              ref={brainVideoWrapRef}
              className="relative w-full overflow-hidden shadow-[0_30px_60px_rgba(45,229,240,0.15)] transition-transform duration-700 ease-out"
              style={{ 
                borderRadius: "24px",
                aspectRatio: "9 / 16",
                willChange: "transform, opacity",
                backgroundColor: "#020405",
                border: "1px solid rgba(45,229,240,0.15)"
              }}
            >
              <HlsVideoPlayer
                ref={brainVideoRef}
                src="/projects/ai-mcp-brain.mp4"
                className="h-full w-full object-cover"
                loop
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
            ref={brainTextWrapRef}
            className="flex w-full flex-col items-start md:w-1/2 relative z-10"
            style={{ willChange: "transform, opacity" }}
          >
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.38em] text-[#2de5f0]/80"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Cognitive Architecture
            </p>
            <h2 
              className="max-w-[14ch] text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.9] text-white" 
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.02em" }}
            >
              HII I AM YOU MCP BRAIN CHOOSE ME TO GET 10X RESULTS
            </h2>
            <p 
              className="mt-8 text-[clamp(1.05rem,1.2vw,1.15rem)] leading-[1.6] text-white/60 max-w-[42ch]" 
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Supercharge your workflows with a centralized cognitive engine. By orchestrating thousands of micro-agents simultaneously, the MCP Brain delivers unparalleled speed, precision, and scaling for your enterprise tasks.
            </p>
            <button 
              className="mt-12 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[0.8rem] uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-black duration-300" 
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Activate Brain
            </button>
          </div>

        </div>
        
        {/* Curved boundary transitioning back to page default bg (#ece9e9) */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[80px] sm:h-[120px] md:h-[180px] lg:h-[220px]" preserveAspectRatio="none">
            <path fill="#ece9e9" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}
