"use client";

import React, { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home",         href: "#top" },
  { label: "Projects",     href: "#projects" },
  { label: "About",        href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("Home");
  const [menuOpen, setMenuOpen]   = useState(false);
  const rafRef = useRef<number>(0);

  /* ── frosted glass on scroll ───────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);

        // Active section detection
        const offsets = NAV_LINKS.map(({ href, label }) => {
          if (href === "#top") return { label, top: 0 };
          const el = document.querySelector(href);
          return { label, top: el ? (el as HTMLElement).offsetTop - 100 : Infinity };
        });

        const current = offsets
          .filter(({ top }) => window.scrollY >= top)
          .at(-1);
        if (current) setActive(current.label);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── smooth scroll ─────────────────────────────────── */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setActive(label);

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          transition: "background 0.4s ease, box-shadow 0.4s ease, padding 0.3s ease",
          background: scrolled ? "rgba(10,10,10,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          padding: scrolled ? "0.75rem 0" : "1.4rem 0",
        }}
      >
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* Logo / Name */}
          <a
            href="#top"
            onClick={(e) => handleClick(e, "#top", "Home")}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.92)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Prateek Lachwani
          </a>

          {/* Desktop Links */}
          <div className="nav-desktop-links" style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}>
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === label;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleClick(e, href, label)}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    position: "relative",
                    transition: "color 0.3s ease",
                    paddingBottom: "2px",
                  }}
                >
                  {label}
                  {/* Active indicator dot */}
                  <span style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isActive ? "4px" : "0px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.7)",
                    transition: "width 0.3s ease",
                  }} />
                </a>
              );
            })}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block",
                width: i === 1 ? (menuOpen ? "20px" : "14px") : "20px",
                height: "1.5px",
                background: "rgba(255,255,255,0.7)",
                transition: "all 0.3s ease",
                transformOrigin: "center",
                transform: menuOpen
                  ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
              }} />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleClick(e, href, label)}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: active === label ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
