"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-[#0e0e0e] overflow-hidden"
    >
      {/* Top border */}
      <div className="w-full h-px bg-white/8" />

      {/* Header */}
      <motion.div
        className="px-6 md:px-16 lg:px-28 pt-24 md:pt-32 pb-4"
        style={{ y: headlineY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/30 text-xs tracking-[0.45em] uppercase mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          / Feedback
        </motion.p>

        <h2
          className="text-[2.6rem] sm:text-[3.4rem] md:text-[5rem] lg:text-[6.5rem] leading-[1.0] tracking-tight text-white"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="block"
          >
            WHAT PEOPLE
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18 }}
            className="block"
          >
            ARE{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                background: "linear-gradient(135deg, #f5af72 0%, #e8c99a 50%, #9ecfe8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "0.9em",
              }}
            >
              saying.
            </span>
          </motion.span>
        </h2>
      </motion.div>

      {/* Stagger testimonials carousel */}
      <StaggerTestimonials />

      {/* Bottom border */}
      <div className="w-full h-px bg-white/8" />
    </section>
  );
}
