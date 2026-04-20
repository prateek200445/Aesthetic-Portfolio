"use client";

import React from "react";
import Link from "next/link";
import { FullScreenScrollFX } from "@/components/ui/full-screen-scroll-fx";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projectsData";

const sections = projects.map((p, i) => ({
  id: `project-${i}`,
  background: p.image,
  leftLabel: (
    <span style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em", fontSize: "clamp(0.85rem, 1.8vw, 1.4rem)", fontWeight: 400, opacity: 0.9 }}>
      {p.leftLabel}
    </span>
  ),
  title: (
    <div style={{ textAlign: "center" }}>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
        letterSpacing: "0.45em",
        textTransform: "uppercase" as const,
        color: "rgba(245,245,245,0.5)",
        marginBottom: "0.6rem",
        fontWeight: 400,
      }}>
        {p.category}
      </p>
      <span style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        letterSpacing: "0.04em",
        lineHeight: 1,
        display: "block",
        color: "rgba(245,245,245,0.95)",
      }}>
        {p.title}
      </span>
      <Link href={`/projects/${p.slug}`}>
        <button
          style={{
            marginTop: "1.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.55rem 1.4rem",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.75)",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-cormorant)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,1)";
            (e.currentTarget as HTMLButtonElement).style.color = "#000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
          }}
        >
          View Project
          <ArrowUpRight style={{ width: 12, height: 12 }} />
        </button>
      </Link>
    </div>
  ),
  rightLabel: (
    <span style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.2em", fontSize: "clamp(0.85rem, 1.8vw, 1.4rem)", fontWeight: 400, opacity: 0.9 }}>
      {p.rightLabel}
    </span>
  ),
}));

export default function Projects() {
  return (
    <FullScreenScrollFX
      sections={sections}
      header={
        <div style={{ fontFamily: "var(--font-cormorant)", textTransform: "uppercase", letterSpacing: "0.45em", fontSize: "clamp(0.65rem, 1vw, 0.85rem)", color: "rgba(245,245,245,0.4)", fontWeight: 400 }}>
          Selected Works
        </div>
      }
      showProgress
      bgTransition="fade"
      parallaxAmount={4}
      durations={{ change: 0.75, snap: 900 }}
      colors={{
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.42)",
        pageBg: "#0a0a0a",
        stageBg: "#0a0a0a",
      }}
      ariaLabel="Project portfolio showcase"
    />
  );
}
