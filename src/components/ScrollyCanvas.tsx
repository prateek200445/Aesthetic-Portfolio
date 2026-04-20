"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 120; // Exact count of frames in sequence

function pad(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track window scroll — NOT element scroll (element has no scrollbar)
  const { scrollY } = useScroll();

  // Derived MotionValues — computed dynamically based on element's actual position
  const scrollYProgress = useTransform(scrollY, (v) => {
    const el = containerRef.current;
    if (!el) return 0;
    const elTop = el.offsetTop;
    const elScrollable = el.offsetHeight - window.innerHeight;
    return Math.min(1, Math.max(0, (v - elTop) / elScrollable));
  });

  // Map 0 -> 1 to 0 -> FRAME_COUNT - 1
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Section 1: visible at 0%, fully gone by 10%
  const opacity1 = useTransform(scrollYProgress, [0, 0.03, 0.10], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.10], [0, -80]);

  // Section 2: 25% -> 45%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.30, 0.40, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [80, -80]);

  // Section 3: 55% -> 75%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.60, 0.70, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [80, -80]);

  // Section 4 — Stats: 78% -> 98%
  const opacity4 = useTransform(scrollYProgress, [0.78, 0.84, 0.95, 0.99], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.78, 0.99], [60, -60]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const paddedIndex = pad(i, 3);
        // Correct path for actual frame files
        img.src = `/sequence/frame_${paddedIndex}_delay-0.05s.webp`;

        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
              setIsLoaded(true);
            }
            resolve(null);
          };
          img.onerror = () => resolve(null); // Continue even if one fails
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  // Render logic
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      // Get current frame matching scroll progress
      const currentIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(frameIndex.get()))
      );

      const img = images[currentIndex];
      if (img && img.complete) {
        // Handle object-fit: cover logic via canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          // Canvas is wider than image
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          // Image is wider than canvas
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      // Sync canvas internal resolution with its display size
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // We don't scale the context to dpr here since our draw math handles 
      // the absolute canvas width/height.
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init size
    render(); // Start loop

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]" style={{ position: "relative" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full block"
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Section 1 — Prateek Lachwani: elegant serif italic with warm gradient */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center"
        >
          <h1
            style={{ fontFamily: "var(--font-cormorant)" }}
            className="text-6xl md:text-[7.5rem] font-light italic tracking-tight leading-none"
          >
            <span style={{
              background: "linear-gradient(135deg, #f5af72 0%, #e8c99a 45%, #9ecfe8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Prateek Lachwani.
            </span>
          </h1>
          <p
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.25em" }}
            className="text-base md:text-xl mt-5 text-white/50 font-light uppercase"
          >
            AI &amp; DevOps Engineer
          </p>
        </motion.div>

        {/* Section 2 — Bebas Neue: bold all-caps impactful display */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center pointer-events-none px-6 md:px-24"
        >
          <div>
            <p
              style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.3em" }}
              className="text-xs md:text-sm uppercase text-white/40 mb-2 font-light"
            >
              What I do
            </p>
            <h2
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.06em", lineHeight: 0.9 }}
              className="text-[4rem] md:text-[9rem] text-white drop-shadow-2xl"
            >
              I build<br />AI-driven<br />ecosystems.
            </h2>
          </div>
        </motion.div>

        {/* Section 3 — mixed: serif label + Bebas display right-aligned */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end pointer-events-none px-6 md:px-24"
        >
          <div className="text-right">
            <p
              style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.3em" }}
              className="text-xs md:text-sm uppercase text-white/40 mb-2 font-light"
            >
              My stack
            </p>
            <h2
              style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.06em", lineHeight: 0.9 }}
              className="text-[4rem] md:text-[9rem] drop-shadow-2xl"
            >
              <span style={{
                background: "linear-gradient(135deg, #ffffff 0%, #9ecfe8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                AI · DevOps<br />&amp; Full Stack.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* Section 4 — Stats */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Label */}
          <p
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.4em" }}
            className="text-sm md:text-base uppercase text-white/40 mb-12 font-light"
          >
            By the numbers
          </p>

          {/* Stats row */}
          <div className="w-full flex items-stretch justify-center divide-x divide-white/10 px-6 md:px-16">
            {[
              { number: "4+", label: "Years of\nGrinding" },
              { number: "10+", label: "Projects\nDelivered" },
              { number: "2×", label: "Stage\nFinishes" },
              { number: "1+", label: "Year On-Field\nExperience" },
            ].map(({ number, label }) => (
              <div key={number} className="flex-1 flex flex-col items-center text-center px-4 md:px-8">
                <span
                  style={{
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "0.02em",
                    background: "linear-gradient(170deg, #f5c18a 0%, #ffffff 55%, #9ecfe8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}
                  className="text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem]"
                >
                  {number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    letterSpacing: "0.2em",
                    whiteSpace: "pre-line",
                  }}
                  className="text-[10px] md:text-sm uppercase text-white/50 mt-3 font-light leading-loose"
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>


      </div>
    </div>
  );
}
