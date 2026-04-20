"use client";

import React, { useState, type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Phone } from "lucide-react";

// Inline social icons (lucide-react v1 removed Github/Linkedin/Twitter)
const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.9 1.65a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3zm-4.65 1.1a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5z"/>
  </svg>
);


interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  companyName?: string;
  description?: string;
  usefulLinks?: { label: string; href: string }[];
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  newsletterTitle?: string;
  onSubscribe?: (email: string) => Promise<boolean>;
}

export const Footer: FC<FooterProps> = ({
  companyName = "Prateek Lachwani",
  description = "AI & ML Engineer building intelligent systems that drive real impact — from LLM agents to health tech.",
  usefulLinks = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "/contact" },
    { label: "Resume", href: "#" },
  ],
  socialLinks = [
    { label: "GitHub", href: "https://github.com/prateek200445", icon: <GithubIcon /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prateek-lachwani-a96a39269/", icon: <LinkedinIcon /> },
    { label: "Instagram", href: "https://www.instagram.com/prateek._.lachwani/", icon: <InstagramIcon /> },
    { label: "Email", href: "mailto:prateeklachwani24@gmail.com", icon: <Mail className="h-4 w-4" /> },
  ],
  newsletterTitle = "Stay in the loop",
  onSubscribe,
  className,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);

    if (onSubscribe) {
      const ok = await onSubscribe(email);
      setStatus(ok ? "success" : "error");
    } else {
      // Default: just show success
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
    }

    setIsSubmitting(false);
    if (status !== "error") setEmail("");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <footer
      className={cn("w-full bg-[#0a0a0a] border-t border-white/5 text-white/70", className)}
      {...props}
    >
      {/* Top gradient line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div>
              <h2
                className="text-white text-2xl font-semibold tracking-tight mb-2"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                {companyName}
              </h2>
              <p
                className="text-white/40 text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                AI · ML · Full Stack
              </p>
            </div>
            <p
              className="text-white/50 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
            >
              {description}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3
              className="text-white/80 text-xs tracking-[0.35em] uppercase mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-white transition-all duration-300 overflow-hidden" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h3
              className="text-white/80 text-xs tracking-[0.35em] uppercase mb-6"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Get in Touch
            </h3>
            <div className="space-y-3">
              <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}>
                Open to collaborations, full-time roles, and interesting side projects.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300 group"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
              >
                <Mail className="w-5 h-5" />
                Send a Message
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
              <a
                href="mailto:prateeklachwani24@gmail.com"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300 group"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
              >
                <Mail className="w-5 h-5" />
                prateeklachwani24@gmail.com
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
              <a
                href="tel:+918003518222"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors duration-300 group"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem" }}
              >
                <Phone className="w-5 h-5" />
                +91 8003518222
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3
              className="text-white/80 text-xs tracking-[0.35em] uppercase mb-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {newsletterTitle}
            </h3>
            <p className="text-white/35 text-sm mb-5" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
              Get notified when I ship new projects or write something new.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative flex">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || status !== "idle"}
                  required
                  aria-label="Email for newsletter"
                  className="pr-24 bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-white/20 focus-visible:border-white/30 rounded-lg h-10 text-sm"
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || status !== "idle"}
                  className="absolute right-0 top-0 h-full px-4 text-xs tracking-widest rounded-l-none bg-white text-black hover:bg-white/90 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.15em" }}
                >
                  {isSubmitting ? "…" : "Send"}
                </Button>
              </div>

              {status !== "idle" && (
                <p
                  className={`mt-2 text-xs ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem" }}
                >
                  {status === "success" ? "You're in. Thanks! 🎉" : "Something went wrong. Try again."}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-[0.25em]" style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-white/15 text-xs tracking-[0.2em]" style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9rem" }}>
            Crafted with precision · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
