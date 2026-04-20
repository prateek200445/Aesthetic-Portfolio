"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Prateek built our entire AI pipeline in weeks. The LangChain + RAG setup he architected handles 10k queries a day without breaking a sweat.",
    by: "Arjun M., CTO at MedStartup",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    tempId: 1,
    testimonial: "Best DevOps hire we've had. He set up our entire CI/CD on Azure DevOps, cut deployment time by 60%, and documented everything perfectly.",
    by: "Sarah K., Engineering Lead at CloudCo",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 2,
    testimonial: "Prateek doesn't just write code — he thinks in systems. Our Kubernetes cluster went from chaos to 99.9% uptime under his watch.",
    by: "Rohan S., VP of Engineering",
    imgSrc: "https://i.pravatar.cc/150?img=15",
  },
  {
    tempId: 3,
    testimonial: "The AI document intelligence pipeline he built for us was insane. 90% accuracy on Hindi newspaper OCR using fine-tuned GPT — I didn't think it was possible.",
    by: "Meera P., Head of Data at Infotech",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    tempId: 4,
    testimonial: "He shipped a full-stack MERN app with Docker + AKS in under 3 weeks. Would hire again without a second thought.",
    by: "James T., Product Manager",
    imgSrc: "https://i.pravatar.cc/150?img=3",
  },
  {
    tempId: 5,
    testimonial: "Prateek is the rare engineer who can go from LLM orchestration to infrastructure. He's the definition of full-stack AI engineering.",
    by: "Pooja R., Co-Founder at HealthTech",
    imgSrc: "https://i.pravatar.cc/150?img=16",
  },
  {
    tempId: 6,
    testimonial: "Our test coverage jumped from 40% to 80% after Prateek set up our Playwright + Selenium suite. Solid, reliable, and actually clean code.",
    by: "Alex D., QA Lead at SaaS Company",
    imgSrc: "https://i.pravatar.cc/150?img=7",
  },
  {
    tempId: 7,
    testimonial: "He onboarded faster than anyone I've worked with and immediately started delivering. A true self-starter who knows AI infrastructure inside out.",
    by: "Vikram N., CTO at Fintech Startup",
    imgSrc: "https://i.pravatar.cc/150?img=20",
  },
  {
    tempId: 8,
    testimonial: "Tabcura's architecture under the hood is genuinely impressive. Prateek designed it from scratch and it scales beautifully.",
    by: "Nina C., Healthcare Investor",
    imgSrc: "https://i.pravatar.cc/150?img=19",
  },
  {
    tempId: 9,
    testimonial: "The MCP orchestrator he built handles multi-agent LLM workflows better than tools 10x the cost. Pure genius execution.",
    by: "Siddharth A., AI Researcher",
    imgSrc: "https://i.pravatar.cc/150?img=13",
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out p-8",
        isCenter ? "z-10" : "z-0"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(48px 0%, calc(100% - 48px) 0%, 100% 48px, 100% 100%, calc(100% - 48px) 100%, 48px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        background: isCenter
          ? "linear-gradient(135deg, rgba(245,175,114,0.18) 0%, rgba(158,207,232,0.12) 100%)"
          : "rgba(255,255,255,0.03)",
        border: isCenter
          ? "1px solid rgba(245,175,114,0.45)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isCenter
          ? "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,175,114,0.2)"
          : "none",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Corner accent line */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 1,
          background: isCenter
            ? "rgba(245,175,114,0.4)"
            : "rgba(255,255,255,0.08)",
        }}
      />

      {/* Avatar */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]}
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{
          boxShadow: isCenter
            ? "3px 3px 0px rgba(0,0,0,0.4)"
            : "3px 3px 0px rgba(0,0,0,0.2)",
          filter: isCenter ? "none" : "grayscale(40%)",
        }}
      />

      {/* Quote */}
      <h3
        className="text-sm sm:text-base leading-relaxed"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(0.85rem, 1.3vw, 1.05rem)",
          color: isCenter ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
          lineHeight: 1.65,
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>

      {/* Attribution */}
      <p
        className="absolute bottom-8 left-8 right-8 mt-2 text-xs italic"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: isCenter ? "rgba(245,175,114,0.85)" : "rgba(255,255,255,0.25)",
          letterSpacing: "0.05em",
        }}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: 620,
        background: "transparent",
      }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Nav buttons */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,175,114,0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,175,114,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "#f5af72";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
          }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,175,114,0.15)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,175,114,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "#f5af72";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
          }}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
