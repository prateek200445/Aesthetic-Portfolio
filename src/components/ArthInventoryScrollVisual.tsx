"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TabcuraScrollVisual from "@/components/TabcuraScrollVisual";
import type { Project } from "@/lib/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArthInventoryScrollVisual({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const blockRef = useRef<HTMLDivElement | null>(null);
  
  // Refs for the scattered typography
  const word1Ref = useRef<HTMLDivElement | null>(null);
  const word2Ref = useRef<HTMLDivElement | null>(null);
  const word3Ref = useRef<HTMLDivElement | null>(null);
  const word4Ref = useRef<HTMLDivElement | null>(null);
  const word5Ref = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // Refs for Shopkar Section
  const shopkarSectionRef = useRef<HTMLElement | null>(null);
  const shopkarVideoRef = useRef<HTMLDivElement | null>(null);
  const shopkarTextRef = useRef<HTMLDivElement | null>(null);

  // Refs for Wholesale Section
  const wholesaleSectionRef = useRef<HTMLElement | null>(null);
  const wholesaleVideoWrapRef = useRef<HTMLDivElement | null>(null);
  const wholesaleVideoRef = useRef<HTMLVideoElement | null>(null);
  const wholesaleOverlayRef = useRef<HTMLDivElement | null>(null);
  const wholesaleText1Ref = useRef<HTMLParagraphElement | null>(null);
  const wholesaleText2Ref = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const block = blockRef.current;
    const w1 = word1Ref.current;
    const w2 = word2Ref.current;
    const w3 = word3Ref.current;
    const w4 = word4Ref.current;
    const w5 = word5Ref.current;
    const path = pathRef.current;
    const sSection = shopkarSectionRef.current;
    const sVideo = shopkarVideoRef.current;
    const sText = shopkarTextRef.current;
    const wSection = wholesaleSectionRef.current;
    const wVideoWrap = wholesaleVideoWrapRef.current;
    const wVideo = wholesaleVideoRef.current;
    const wOverlay = wholesaleOverlayRef.current;
    const wText1 = wholesaleText1Ref.current;
    const wText2 = wholesaleText2Ref.current;

    if (!section || !block || !w1 || !w2 || !w3 || !w4 || !w5 || !path) return;

    // Initial state
    gsap.set(block, { y: 100, opacity: 0 });
    gsap.set([w1, w2, w3, w4, w5], { y: 30, opacity: 0, rotateZ: -2 });
    gsap.set(path, { strokeDasharray: "1000", strokeDashoffset: "1000" });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center+=20%",
          end: "center center",
          scrub: false,
          toggleActions: "play none none reverse",
        },
      });

      // Animate block entrance
      tl.to(block, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
      // Animate dotted connecting line
      .to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      }, "-=0.5")
      // Stagger words
      .to([w1, w2, w3, w4, w5], {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
      }, "-=1.8");

      let sTl: gsap.core.Timeline | undefined;
      let wTl: gsap.core.Timeline | undefined;

      // Shopkar Section Animation
      if (sSection && sVideo && sText) {
        gsap.set(sVideo, { scale: 0.85, opacity: 0, rotateY: -15, transformPerspective: 1000 });
        gsap.set(sText, { x: 50, opacity: 0 });

        sTl = gsap.timeline({
          scrollTrigger: {
            trigger: sSection,
            start: "top bottom-=10%",
            end: "center center",
            scrub: 1,
          },
        });

        sTl.to(sVideo, {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          ease: "power2.out",
        })
        .to(sText, {
          x: 0,
          opacity: 1,
          ease: "power2.out",
        }, 0);
      }

      // Wholesale Section Animation
      if (wSection && wVideoWrap && wVideo && wOverlay && wText1 && wText2) {
        gsap.set(wVideoWrap, {
          clipPath: "inset(12% 8% 12% 8% round 24px)",
          scale: 0.88,
          opacity: 0,
          y: 60,
        });
        gsap.set(wVideo, {
          scale: 1.12,
          filter: "brightness(0.6) saturate(0.6)",
        });
        gsap.set([wText1, wText2], {
          opacity: 0,
          y: 48,
          skewY: 4,
        });
        gsap.set(wOverlay, { opacity: 0 });

        wTl = gsap.timeline({
          scrollTrigger: {
            trigger: wSection,
            start: "top bottom-=10%",
            end: "center center",
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        });

        wTl.to(
          wVideoWrap,
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
        .to(
          wVideo,
          {
            scale: 1,
            filter: "brightness(0.85) saturate(1.05)",
            duration: 1,
            ease: "power1.out",
          },
          0
        )
        .to(
          wOverlay,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.2
        )
        .to(
          wText1,
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
          wText2,
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          0.65
        );
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        if (sTl) {
          sTl.scrollTrigger?.kill();
          sTl.kill();
        }
        if (wTl) {
          wTl.scrollTrigger?.kill();
          wTl.kill();
        }
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Primary Inventory Video
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-10">
        <TabcuraScrollVisual
          imageSrc={project.image}
          videoSrc="/videos/ai-inventory.mp4"
          imageAlt={`${project.title} project visual`}
          overlayTitle={project.title}
          overlaySubtitle="Project showcase"
          useContainerScroll={true}
        />
      </div>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Chatbot Block Transition
          ══════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#06070a] py-20 lg:py-32 z-20"
      >
        {/* Wavy curve transitioning FROM the dark Tabcura video section */}
        <div className="absolute top-[-1px] left-0 w-full leading-none z-30 pointer-events-none rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
            <path fill="#0b0f13" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8">
          {/* 
            The Block 
            Using a slight off-white paper color to match the premium editorial feel
          */}
          <div 
            ref={blockRef}
            className="relative flex min-h-[800px] w-full flex-col overflow-hidden bg-[#fdfbf7] shadow-[0_40px_100px_rgba(0,0,0,0.5)] lg:flex-row"
            style={{ borderRadius: "48px" }}
          >

            {/* Left Side: Scattered Typography & Connecting Lines */}
            <div className="relative flex w-full flex-col items-center justify-center border-b border-black/5 py-16 lg:w-1/2 lg:border-b-0 lg:border-r lg:py-0">
              
              {/* Subtle background grain/texture for the block */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

              <div className="relative h-[600px] w-full max-w-[500px]">
                {/* SVG Dotted Connecting Path */}
                <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    ref={pathRef}
                    d="M 120 180 C 250 150, 300 220, 380 250 C 450 280, 400 350, 320 380 C 200 420, 150 350, 180 480" 
                    stroke="#1f2b31" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    strokeDasharray="4 8"
                    opacity="0.3"
                  />
                </svg>

                {/* Scattered Words */}
                <div ref={word1Ref} className="absolute left-[8%] top-[25%] text-[#2b2428]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <span className="text-[3rem] tracking-tight md:text-[3.8rem]">Inventory</span>
                </div>
                
                <div ref={word2Ref} className="absolute right-[8%] top-[35%] text-[#1f2b31]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <span className="text-[2.6rem] font-light italic tracking-wide md:text-[3.2rem]">Suppliers</span>
                </div>

                <div ref={word3Ref} className="absolute left-[20%] top-[50%] text-[#3f383c]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <span className="text-[3.4rem] tracking-tighter md:text-[4.2rem]">Procurement</span>
                </div>

                <div ref={word4Ref} className="absolute right-[15%] top-[65%] text-[#4a4348]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <span className="text-[2.2rem] font-medium tracking-widest uppercase md:text-[2.6rem]">Analytics</span>
                </div>

                <div ref={word5Ref} className="absolute left-[25%] top-[75%] text-[#2b2428]" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <span className="text-[3.2rem] italic md:text-[3.6rem]">Automation.</span>
                </div>

                {/* Corner Label */}
                <div className="absolute bottom-[4%] left-[6%]">
                  <p className="max-w-[140px] text-[0.65rem] uppercase tracking-[0.2em] text-[#1f2b31]/50 leading-loose" style={{ fontFamily: "var(--font-geist-sans)" }}>
                    Operating Across Locations
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Chatbot Interface */}
            <div className="relative flex w-full items-center justify-center bg-[#fdfbf7] py-16 lg:w-1/2 lg:py-0">
              <div className="flex w-full max-w-[500px] flex-col rounded-[2.25rem] border border-black/5 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-6 lg:h-[680px]">
                
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.3em] text-black/35" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Inventory Assistant
                    </p>
                    <h3 className="mt-1 text-[1.15rem] font-semibold text-[#1f2b31]" style={{ fontFamily: "var(--font-cormorant)" }}>
                      Smart procurement chat
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dbece3] shadow-inner">
                    <span className="text-base">💬</span>
                  </div>
                </div>

                <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c7e7d0] text-[0.72rem] font-semibold text-[#32503a]">
                      PL
                    </div>
                    <div className="max-w-[82%] rounded-3xl rounded-tl-md bg-[#dce9d8] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#2f3a30] shadow-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Namaste, how can I optimize my next flour bulk purchase for Mumbai?
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b9d9d2] text-[0.72rem] font-semibold text-[#2a5b58]">
                      AI
                    </div>
                    <div className="relative max-w-[86%] rounded-3xl rounded-tl-md bg-[#fdfbf7] px-4 py-3 text-[0.98rem] leading-[1.55] text-[#2f3941] shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-black/5" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Suggested price point is ₹XX per kg. Considering regional demand and new tariffs. See details.
                      <span className="absolute -bottom-2 left-5 h-3 w-3 rotate-45 bg-[#fdfbf7] border-b border-r border-black/5" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ece7] text-[0.72rem] font-semibold text-[#315f58] shadow-inner">
                      🤖
                    </div>
                    <div className="max-w-[86%] rounded-3xl rounded-tl-md bg-[#eef6f3] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#304046] shadow-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      For Mumbai, increase buffer stock for monsoon-sensitive months and compare supplier rates across western regions.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c7e7d0] text-[0.72rem] font-semibold text-[#32503a]">
                      PL
                    </div>
                    <div className="max-w-[82%] rounded-3xl rounded-tl-md bg-[#dce9d8] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#2f3a30] shadow-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Can you also suggest reorder quantity if my current stock is 3.2 tons?
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b9d9d2] text-[0.72rem] font-semibold text-[#2a5b58]">
                      AI
                    </div>
                    <div className="max-w-[86%] rounded-3xl rounded-tl-md bg-[#fdfbf7] px-4 py-3 text-[0.98rem] leading-[1.55] text-[#2f3941] shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-black/5" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Recommended reorder: 1.1 to 1.4 tons this week, with staggered deliveries across two suppliers to reduce risk.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c7e7d0] text-[0.72rem] font-semibold text-[#32503a]">
                      PL
                    </div>
                    <div className="max-w-[82%] rounded-3xl rounded-tl-md bg-[#dce9d8] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#2f3a30] shadow-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Great. Show a quick split by supplier and expected landed cost.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d7ece7] text-[0.72rem] font-semibold text-[#315f58] shadow-inner">
                      🤖
                    </div>
                    <div className="max-w-[86%] rounded-3xl rounded-tl-md bg-[#eef6f3] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#304046] shadow-sm" style={{ fontFamily: "var(--font-geist-sans)" }}>
                      Supplier A: 0.8 tons at ₹XX/kg. Supplier B: 0.5 tons at ₹XX+2/kg. Estimated landed blended cost: ₹XX+0.8/kg.
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-full border border-black/5 bg-[#fdfbf7] px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-black/35">Ask about stock, pricing, or demand...</span>
                    <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2b31] text-white">↗</span>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>

        {/* Custom elegant sweeping curve to next section (Shopkar section bg is #0a0d10) */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
            <path fill="#0a0d10" d="M0,320 L0,160 C 480,320 960,320 1440,160 L1440,320 Z"></path>
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Shopkar AI Inventory Video
          ══════════════════════════════════════════════════════ */}
      <section
        ref={shopkarSectionRef}
        className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden bg-[#0a0d10] py-20 lg:py-32 z-20"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-12 px-4 md:flex-row md:px-8">
          {/* Left Side: Landscape Video */}
          <div 
            ref={shopkarVideoRef}
            className="relative w-full max-w-[640px] aspect-video overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:w-1/2 bg-[#020405]"
            style={{ willChange: "transform, opacity" }}
          >
            <video
              src="/projects/shopkar-ai-inventory.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              autoPlay
              muted
            />
            {/* Subtle Inner Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/10 mix-blend-overlay" />
          </div>

          {/* Right Side: Typography */}
          <div 
            ref={shopkarTextRef}
            className="flex w-full flex-col justify-center text-center md:w-1/2 md:text-left lg:pl-10"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-[#ece9e9]" style={{ fontFamily: "var(--font-cormorant)" }}>
              No need of manual <span className="italic text-white/70">carting</span> or managing stocks manually.
            </h2>
            <p className="mt-8 max-w-md text-[clamp(1.1rem,1.5vw,1.35rem)] text-white/50 leading-relaxed mx-auto md:mx-0" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Experience automated inventory pipelines that handle the logistics, ensuring seamless scalability and operational excellence without the overhead.
            </p>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — Wholesale Marketplace Video (Full Screen)
          ══════════════════════════════════════════════════════ */}
      <section
        ref={wholesaleSectionRef}
        className="relative left-1/2 w-screen -translate-x-1/2 h-[250vh] bg-[#fcfbf9] z-20"
      >
        {/* Elegant sweeping curve transitioning FROM the dark Shopkar section */}
        <div className="absolute top-[-1px] left-0 w-full leading-none z-30 pointer-events-none rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
            <path fill="#0a0d10" d="M0,320 L0,160 C 480,320 960,320 1440,160 L1440,320 Z"></path>
          </svg>
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <div
            ref={wholesaleVideoWrapRef}
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ willChange: "transform, clip-path, opacity" }}
          >
            <video
              ref={wholesaleVideoRef}
              src="/projects/whole%20sale%20marketplace.mp4"
              className="absolute inset-0 h-full w-full object-cover"
              loop
              playsInline
              preload="auto"
              autoPlay
              muted
            />
            {/* Overlay Gradient to make text readable */}
            <div
              ref={wholesaleOverlayRef}
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#051214]/90 via-[#051214]/50 to-transparent"
            />
          </div>

          {/* Text floating on the left */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 z-10 pointer-events-none">
            <div className="max-w-3xl">
              <p
                ref={wholesaleText1Ref}
                className="mb-4 text-[clamp(0.8rem,1.2vw,1rem)] font-bold tracking-[0.3em] text-[#d7fff6] uppercase drop-shadow-md"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Bid. Buy. Sell. Repeat.
              </p>
              <h2
                ref={wholesaleText2Ref}
                className="text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.95] text-white uppercase tracking-tight drop-shadow-2xl"
                style={{ fontFamily: "var(--font-bebas)", textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
              >
                Get the access of India's biggest wholesale marketplace
              </h2>
            </div>
          </div>
        </div>

        {/* Wavy curved boundary transitioning to Project Highlights (bg is #ece9e9) */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-30 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="block w-full h-[60px] md:h-[100px] lg:h-[140px]" preserveAspectRatio="none">
            <path fill="#ece9e9" fillOpacity="1" d="M0,224L80,234.7C160,245,320,267,480,245.3C640,224,800,160,960,101.3C1120,43,1280,32,1360,16L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </>
  );
}
