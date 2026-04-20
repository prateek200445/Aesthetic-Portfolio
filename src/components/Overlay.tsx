"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% to 15% (fade out fully by 15%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  // Section 2: 25% to 45% 
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [100, -100]);

  // Section 3: 55% to 75%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [100, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 w-full h-[500vh]" style={{ position: "absolute" }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Section 1 */}
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
            Prateek Lachwani.
          </h1>
          <p className="text-xl md:text-3xl mt-4 text-white/80 font-light tracking-wide">
            AI & DevOps Engineer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute left-6 md:left-32 text-left px-4">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-xl leading-tight">
            I build AI-driven <br className="hidden md:block" /> digital ecosystems.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute right-6 md:right-32 text-right px-4">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-xl leading-tight">
            Bridging AI, DevOps & <br className="hidden md:block" /> Full Stack.
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
