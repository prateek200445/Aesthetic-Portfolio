"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const stack = [
  { label: "AI / ML", items: ["LangChain", "LlamaIndex", "OpenAI", "Claude", "RAG Pipelines"] },
  { label: "Backend", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
  { label: "DevOps", items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS"] },
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Framer Motion"] },
];

const experience = [
  {
    year: "May 2025 – Aug 2025",
    role: "AI/Data Intern — Azure OpenAI & Infra",
    place: "Blessed Infotech",
    location: "Jodhpur, Rajasthan",
    highlights: [
      "Built an ETL pipeline using Azure Document Intelligence & OpenAI to scrape Hindi newspaper archives.",
      "Transformed data via fine-tuned GPT models, exporting structured JSON with 90% accuracy.",
    ],
  },
  {
    year: "May 2025 – July 2025",
    role: "DevOps Intern",
    place: "Celebal Technologies",
    location: "Rajasthan",
    highlights: [
      "Deployed Dockerized insurance app on Azure VMs — 70% faster deployments, 99.9% uptime.",
      "Built CI/CD pipelines via Azure DevOps; cut deployment errors 50%, release cycles 40% faster.",
      "Orchestrated containers with Docker & Kubernetes (AKS), reducing provisioning time by 60%.",
    ],
  },
  {
    year: "2024 – Now",
    role: "AI Engineer & Co-Founder",
    place: "Tabcura",
    location: "AI Health Tech",
    highlights: [
      "Building a medical-grade AI platform that turns health chaos into high-precision intelligence.",
      "Architecting LLM pipelines, RAG systems, and cloud-native infrastructure end-to-end.",
    ],
  },
  {
    year: "May 2024 – July 2024",
    role: "Software Engineer Intern",
    place: "AlgoShack Technologies",
    location: "Bengaluru, Karnataka",
    highlights: [
      "Validated AlgoQA (v4) on Playwright TypeScript, increasing verified actions by 30%.",
      "Boosted test coverage 40% using Java Selenium, Appium & Gherkin for SaaS automation.",
      "Identified 116+ non-functional actions on GitHub, improving product stability.",
    ],
  },
];

// Staggered fade-up animation for children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on the big headline
  const headlineY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#0e0e0e] overflow-hidden"
    >
      {/* Thin top border */}
      <div className="w-full h-px bg-white/8" />

      {/* ── HERO HEADLINE ─────────────────────────────────────────── */}
      <motion.div
        className="px-6 md:px-16 lg:px-28 pt-28 md:pt-40 pb-20 md:pb-28"
        style={{ y: headlineY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/30 text-xs md:text-sm tracking-[0.45em] uppercase mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          / About
        </motion.p>

        {/* Editorial mixed-type headline */}
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
            AI &amp; DEVOPS ENGINEER
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18 }}
            className="block"
          >
            BUILDING{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                background: "linear-gradient(135deg, #f5af72 0%, #e8c99a 50%, #9ecfe8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "0.9em",
                letterSpacing: "-0.01em",
              }}
            >
              intelligent
            </span>{" "}
            SYSTEMS
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="block text-white/20"
          >
            THAT{" "}
            <span
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.9em",
              }}
            >
              scale.
            </span>
          </motion.span>
        </h2>
      </motion.div>

      {/* Divider */}
      <div className="mx-6 md:mx-16 lg:mx-28 h-px bg-white/8" />

      {/* ── BIO + STACK ───────────────────────────────────────────── */}
      <div className="px-6 md:px-16 lg:px-28 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 md:gap-24">
        {/* Left — bio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Who I am
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
          >
            Passionate about blending{" "}
            <span style={{ color: "#f5af72" }}>AI &amp; infrastructure</span>, I craft systems
            that push the boundaries of what software can do — from self-healing DevOps pipelines
            to medical-grade AI platforms.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-white/50 leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}
          >
            My work ranges from LLM orchestration and RAG pipelines to cloud-native Kubernetes
            deployments, always aiming to create reliable, scalable, and beautifully engineered
            digital ecosystems for ambitious products.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-stretch divide-x divide-white/10"
          >
            {[
              { n: "4+", label: "Years\nGrinding" },
              { n: "10+", label: "Projects\nDelivered" },
              { n: "2×", label: "Stage\nFinishes" },
            ].map(({ n, label }) => (
              <div key={n} className="flex-1 flex flex-col items-center text-center px-4 md:px-6 first:pl-0 last:pr-0">
                <span
                  className="text-4xl md:text-5xl"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    background: "linear-gradient(135deg, #f5c18a 0%, #fff 55%, #9ecfe8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "0.02em",
                  }}
                >
                  {n}
                </span>
                <span
                  className="text-[10px] uppercase text-white/35 mt-2 leading-loose whitespace-pre-line"
                  style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={itemVariants}
            className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Stack &amp; Skills
          </motion.p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {stack.map(({ label, items }) => (
              <motion.div key={label} variants={itemVariants}>
                <p
                  className="text-white/40 text-[10px] tracking-[0.35em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {label}
                </p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-white/70 text-sm"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="mx-6 md:mx-16 lg:mx-28 h-px bg-white/8" />

      {/* ── EXPERIENCE ────────────────────────────────────────────── */}
      <div className="px-6 md:px-16 lg:px-28 py-20 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/30 text-xs tracking-[0.4em] uppercase mb-12"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Experience
        </motion.p>

        <div className="space-y-0 divide-y divide-white/6">
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto] items-start gap-3 md:gap-12 py-8 hover:bg-white/[0.02] transition-colors duration-300 rounded-lg px-2 -mx-2"
            >
              {/* Year */}
              <span
                className="text-white/25 text-xs tracking-[0.3em] uppercase md:mt-1 md:pt-0.5"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {exp.year}
              </span>

              {/* Role + bullets */}
              <div>
                <p
                  className="text-white text-xl md:text-2xl leading-tight mb-1"
                  style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.04em" }}
                >
                  {exp.role}
                </p>
                <p
                  className="text-white/30 text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {exp.location}
                </p>
                <ul className="space-y-1.5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-white/45"
                      style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.6 }}
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0 mt-2" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <span
                className="text-white/30 text-xs tracking-[0.3em] uppercase md:text-right md:mt-1 md:pt-0.5 group-hover:text-white/60 transition-colors duration-300"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {exp.place}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="w-full h-px bg-white/8" />
    </section>
  );
}
