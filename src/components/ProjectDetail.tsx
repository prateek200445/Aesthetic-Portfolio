"use client";

import Link from "next/link";
import type { Project } from "@/lib/projectsData";
import TabcuraScrollVisual from "@/components/TabcuraScrollVisual";
import HealthcareScrollStory from "@/components/HealthcareScrollStory";
import ButtonWithIconDemo from "@/components/ui/button-witn-icon";
import AiMcpScrollVisual from "@/components/AiMcpScrollVisual";
import JourneyQuestScrollVisual from "@/components/JourneyQuestScrollVisual";
import VedaScrollVisual from "@/components/VedaScrollVisual";
import ArthInventoryScrollVisual from "@/components/ArthInventoryScrollVisual";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-[#ece9e9] text-[#2b1f1f]">
      <div className="w-full px-4 py-6 md:px-6 md:py-8 lg:px-8">
        <header className="mb-8 flex items-center justify-between text-[12px] uppercase tracking-[0.14em] md:mb-10">
          <Link
            href="/"
            className="opacity-80 transition-opacity hover:opacity-100"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            PL / {project.title}
          </Link>
          <nav className="flex items-center gap-6" style={{ fontFamily: "var(--font-geist-sans)" }}>
            <Link href="/#projects" className="opacity-80 transition-opacity hover:opacity-100">
              Index
            </Link>
            <Link href="/#about" className="opacity-80 transition-opacity hover:opacity-100">
              About
            </Link>
          </nav>
        </header>

        <section className="mb-8 md:mb-10 flex flex-col items-center">
          <p
            className="mb-4 text-[11px] uppercase tracking-[0.2em] opacity-65 text-center"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            {project.category}
          </p>
          <h1
            className="text-[clamp(3rem,8vw,7.4rem)] leading-[0.95] text-center"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
          >
            {project.title.toUpperCase()}
          </h1>
        </section>

        <section className="mx-auto grid w-full grid-cols-1 gap-10 border-t border-black/10 pt-6 md:max-w-[1180px] md:grid-cols-12 md:gap-8 md:pt-8">
          <div className="md:col-span-5">
            <p className="max-w-[34ch] text-[clamp(1.1rem,1.7vw,2rem)] leading-[1.35]" style={{ fontFamily: "var(--font-cormorant)" }}>
              {project.fullDescription}
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-2 text-sm uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Roles
            </h2>
            <ul className="space-y-1.5 text-[1.05rem] leading-[1.45]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {project.roles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="mb-2 text-sm uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Date
            </h2>
            <p className="text-[1.05rem]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {project.date}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="mb-2 text-sm uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Links
            </h2>
            <ul className="space-y-1.5 text-[1.05rem]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {(project.links && project.links.length > 0 ? project.links : [{ label: "Project details", url: "#" }]).map((link, idx) => (
                <li key={idx}>
                  {link.url === "#" ? (
                    <span className="opacity-70">. {link.label}</span>
                  ) : (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-black/25 underline-offset-4 hover:decoration-black"
                    >
                      . {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* videoSrc lookup — add new slugs here when new project videos are added */}
        {project.slug === "journey-quest" ? (
          <JourneyQuestScrollVisual />
        ) : project.slug === "veda-ai" ? (
          <VedaScrollVisual project={project} />
        ) : project.slug === "ai-mcp-orchestrator" ? (
          <AiMcpScrollVisual project={project} />
        ) : project.slug === "arth-inventory" ? (
          <ArthInventoryScrollVisual project={project} />
        ) : (
          (() => {
            const videoMap: Record<string, string> = {
              "tabcura": "/videos/tabcura-video.mp4",
            };
            const videoSrc = videoMap[project.slug];

            return (
              <TabcuraScrollVisual
                imageSrc={project.image}
                videoSrc={videoSrc}
                imageAlt={`${project.title} project visual`}
                overlayTitle={project.slug === "tabcura" ? "AI Prescription Intelligence" : project.title}
                overlaySubtitle={project.slug === "tabcura" ? "Reckon 6.0 Showcase" : "Project showcase"}
                useContainerScroll={!!videoSrc}
              />
            );
          })()
        )}

        {project.slug === "tabcura" && <HealthcareScrollStory />}
      </div>

      <div className="w-full px-4 py-10 md:px-6 md:py-12 lg:px-8">
        <section className="mx-auto grid w-full grid-cols-1 gap-10 border-t border-black/10 pt-10 md:mt-16 md:max-w-[1180px] md:grid-cols-12 md:gap-8 md:pt-12">
          <div className="md:col-span-7">
            <h2 className="mb-4 text-sm uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Project Highlights
            </h2>
            <ul className="space-y-4" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {project.achievements.map((achievement, idx) => (
                <li key={idx} className="text-[1.02rem] leading-[1.6]">
                  . {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h2 className="mb-4 text-sm uppercase tracking-[0.1em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Stack
            </h2>
            <p className="text-[1.05rem] leading-[1.8] mb-6" style={{ fontFamily: "var(--font-geist-sans)" }}>
              {project.technologies.join(" • ")}
            </p>
            {/* Add button below stack details for every project */}
            <div className="mt-2">
              <ButtonWithIconDemo href={project.collaborateUrl} />
            </div>
          </div>
        </section>

        <div className="mt-20 border-t border-black/10 pt-8">
          <Link
            href="/#projects"
            className="text-xs uppercase tracking-[0.12em] opacity-75 transition-opacity hover:opacity-100"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Back to projects
          </Link>
        </div>
      </div>
    </main>
  );
}
