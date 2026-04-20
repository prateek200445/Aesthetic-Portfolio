"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

/** Compute a responsive font size in px based on viewport width */
function useResponsiveFontSize(vwFraction: number, min: number, max: number) {
  const [size, setSize] = useState(Math.min(Math.max(1280 * vwFraction, min), max));

  useEffect(() => {
    const update = () =>
      setSize(Math.min(Math.max(window.innerWidth * vwFraction, min), max));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [vwFraction, min, max]);

  return `${Math.round(size)}px`;
}

export default function ProjectsIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  // Responsive sizes that canvas parseInt() can handle
  const sizeL  = useResponsiveFontSize(0.09, 48,  152);
  const sizeM  = useResponsiveFontSize(0.085, 44, 140);
  const sizeS  = useResponsiveFontSize(0.08,  40, 130);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-start justify-end overflow-hidden bg-[#0a0a0a]"
      style={{ minHeight: "60vh", paddingBottom: "8vh" }}
    >
      {/* Top separator */}
      <div className="w-full h-px bg-white/8 absolute top-0 left-0" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(245,175,114,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div className="w-full px-6 md:px-16 lg:px-28" style={{ opacity }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-white/30 text-xs tracking-[0.45em] uppercase mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          / Selected Works
        </motion.p>

        {/* ── Line 1 ── */}
        <div className="w-full" style={{ height: sizeL }}>
          <VaporizeTextCycle
            texts={["WHERE IDEAS", "BUILT TO LAST", "PURE OBSESSION"]}
            font={{ fontFamily: "Bebas Neue, sans-serif", fontSize: sizeL, fontWeight: 400 }}
            color="rgb(255, 255, 255)"
            spread={6}
            density={7}
            animation={{ vaporizeDuration: 2.2, fadeInDuration: 1, waitDuration: 1.5 }}
            direction="left-to-right"
            alignment="left"
            tag={Tag.H2}
          />
        </div>

        {/* ── Line 2 ── */}
        <div className="w-full" style={{ height: sizeM }}>
          <VaporizeTextCycle
            texts={["BECOME REALITY.", "SHIPPED LIVE.", "MADE REAL."]}
            font={{ fontFamily: "Cormorant Garamond, serif", fontSize: sizeM, fontWeight: 300 }}
            color="rgb(245, 175, 114)"
            spread={6}
            density={7}
            animation={{ vaporizeDuration: 2.2, fadeInDuration: 1, waitDuration: 1.5 }}
            direction="left-to-right"
            alignment="left"
            tag={Tag.H2}
          />
        </div>

        {/* ── Line 3 (ghost) ── */}
        <div className="w-full opacity-25" style={{ height: sizeS }}>
          <VaporizeTextCycle
            texts={["SCROLL TO WITNESS.", "SEE FOR YOURSELF.", "SCROLL DEEPER."]}
            font={{ fontFamily: "Bebas Neue, sans-serif", fontSize: sizeS, fontWeight: 400 }}
            color="rgb(255, 255, 255)"
            spread={5}
            density={6}
            animation={{ vaporizeDuration: 2.2, fadeInDuration: 1, waitDuration: 1.5 }}
            direction="left-to-right"
            alignment="left"
            tag={Tag.H2}
          />
        </div>

        {/* Accent line + sub-copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex items-center gap-6"
        >
          <div className="w-12 h-px bg-white/20" />
          <p
            className="text-white/35 text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Each project, a proof of obsession
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
