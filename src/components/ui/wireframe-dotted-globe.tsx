"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

interface GeoFeature {
  geometry: {
    type: "Polygon" | "MultiPolygon" | string;
    coordinates: number[][][] | number[][][][];
  };
  properties?: {
    featurecla?: string;
  };
}

interface LandFeatureCollection {
  features: GeoFeature[];
}

interface DotData {
  lng: number;
  lat: number;
}

// ── Country connection config ──────────────────────────────────────────────
interface CountryNode {
  name: string;
  /** geographic origin on the globe [lng, lat] */
  origin: [number, number];
  /** final screen position of the label (fraction of canvas W / H) */
  labelFrac: [number, number];
  color: string; // hsl string
}

const COUNTRIES: CountryNode[] = [
  { name: "United Kingdom", origin: [-1.5,  51.5], labelFrac: [0.05, 0.15], color: "hsl(180,100%,60%)" },
  { name: "Germany",        origin: [10.5,  51.2], labelFrac: [0.55, 0.06], color: "hsl(160,90%,55%)"  },
  { name: "Brazil",         origin: [-47.9, -15.8],labelFrac: [0.10, 0.78], color: "hsl(140,85%,55%)"  },
  { name: "Japan",          origin: [139.7, 35.7], labelFrac: [0.92, 0.22], color: "hsl(195,100%,58%)" },
  { name: "India",          origin: [78.9,  20.6], labelFrac: [0.85, 0.60], color: "hsl(170,90%,55%)"  },
  { name: "Canada",         origin: [-96.8, 56.1], labelFrac: [0.14, 0.30], color: "hsl(185,95%,58%)"  },
  { name: "Nigeria",        origin: [8.0,    9.1], labelFrac: [0.50, 0.88], color: "hsl(155,80%,55%)"  },
  { name: "South Africa",   origin: [25.0, -29.0], labelFrac: [0.72, 0.86], color: "hsl(175,88%,55%)"  },
];

// ── Easing helpers ─────────────────────────────────────────────────────────
const easeInOutQuad = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Canvas sizing ──────────────────────────────────────────────────────
    const W = width;
    const H = height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const CX = W / 2;
    const CY = H / 2;
    const radius = Math.min(W, H) / 2.5;

    // ── D3 projection ──────────────────────────────────────────────────────
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([CX, CY])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(ctx);

    // ── Point-in-polygon helpers ───────────────────────────────────────────
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
          inside = !inside;
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: GeoFeature): boolean => {
      const geo = feature.geometry;
      if (geo.type === "Polygon") {
        const coords = geo.coordinates as number[][][];
        if (!pointInPolygon(point, coords[0])) return false;
        for (let i = 1; i < coords.length; i++)
          if (pointInPolygon(point, coords[i])) return false;
        return true;
      }
      if (geo.type === "MultiPolygon") {
        const multi = geo.coordinates as number[][][][];
        for (const poly of multi) {
          if (pointInPolygon(point, poly[0])) {
            let inHole = false;
            for (let i = 1; i < poly.length; i++)
              if (pointInPolygon(point, poly[i])) { inHole = true; break; }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    const generateDotsInPolygon = (feature: GeoFeature, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as never);
      const step = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += step)
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const pt: [number, number] = [lng, lat];
          if (pointInFeature(pt, feature)) dots.push(pt);
        }
      return dots;
    };

    // ── State ──────────────────────────────────────────────────────────────
    const allDots: DotData[] = [];
    let landFeatures: LandFeatureCollection | null = null;
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.3;

    // Per-country animation progress [0..1]
    const arcProgress = COUNTRIES.map(() => 0);
    // Stagger start offsets (seconds)
    const arcStartTime = COUNTRIES.map((_, i) => 0.4 + i * 0.35);
    const arcDuration  = 1.6; // seconds each
    let startTimestamp: number | null = null;

    // Pulse phase per country
    const pulsePhase = COUNTRIES.map((_, i) => (i * Math.PI * 2) / COUNTRIES.length);

    // ── Draw helpers ───────────────────────────────────────────────────────

    /** Quadratic bezier point */
    const bezierPoint = (t: number, p0: [number,number], p1: [number,number], p2: [number,number]): [number,number] => {
      const x = (1-t)**2 * p0[0] + 2*(1-t)*t * p1[0] + t**2 * p2[0];
      const y = (1-t)**2 * p0[1] + 2*(1-t)*t * p1[1] + t**2 * p2[1];
      return [x, y];
    };

    /** Build control point so the arc bows outward away from globe centre */
    const controlPoint = (
      start: [number,number],
      end: [number,number],
    ): [number,number] => {
      const mx = (start[0] + end[0]) / 2;
      const my = (start[1] + end[1]) / 2;
      // Push control point away from globe centre
      const dx = mx - CX;
      const dy = my - CY;
      const len = Math.sqrt(dx*dx + dy*dy) || 1;
      const bow = Math.min(160, Math.sqrt((end[0]-start[0])**2 + (end[1]-start[1])**2) * 0.55);
      return [mx + (dx / len) * bow, my + (dy / len) * bow];
    };

    const drawArcLine = (
      start: [number,number],
      end: [number,number],
      progress: number,
      color: string,
      t: number, // global elapsed seconds for animation
      pulseOff: number,
    ) => {
      if (progress <= 0) return;

      const cp = controlPoint(start, end);
      const segments = 80;
      const drawUpTo = Math.max(1, Math.floor(progress * segments));

      // ── Pass 1: wide soft glow ──────────────────────────────────────────
      for (let i = 0; i < drawUpTo; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;
        const p0 = bezierPoint(t0, start, cp, end);
        const p1 = bezierPoint(t1, start, cp, end);
        const fade = i / drawUpTo;
        const pulse = 0.3 + 0.7 * Math.max(0, Math.sin(pulseOff + t * 2.5 - fade * Math.PI * 2.5));

        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(p1[0], p1[1]);
        ctx.strokeStyle = color;
        ctx.globalAlpha = fade * pulse * 0.35;
        ctx.lineWidth = 6 + fade * 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }

      // ── Pass 2: bright thin core ────────────────────────────────────────
      ctx.shadowBlur = 0;
      for (let i = 0; i < drawUpTo; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;
        const p0 = bezierPoint(t0, start, cp, end);
        const p1 = bezierPoint(t1, start, cp, end);
        const fade = i / drawUpTo;
        const pulse = 0.45 + 0.55 * Math.max(0, Math.sin(pulseOff + t * 3 - fade * Math.PI * 3));

        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(p1[0], p1[1]);
        ctx.strokeStyle = color;
        ctx.globalAlpha = fade * pulse * 0.95;
        ctx.lineWidth = 1.8 + fade * 0.7;
        ctx.stroke();
      }

      // ── Head orb ────────────────────────────────────────────────────────
      if (drawUpTo > 0) {
        const headT = drawUpTo / segments;
        const hp = bezierPoint(headT, start, cp, end);

        // Outer halo
        const grd = ctx.createRadialGradient(hp[0], hp[1], 0, hp[0], hp[1], 14);
        grd.addColorStop(0, color.replace("hsl(", "hsla(").replace(")", ", 0.8)"));
        grd.addColorStop(1, color.replace("hsl(", "hsla(").replace(")", ", 0.0)"));
        ctx.beginPath();
        ctx.arc(hp[0], hp[1], 14, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = 1;
        ctx.fill();

        // Bright dot
        ctx.beginPath();
        ctx.arc(hp[0], hp[1], 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.95;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
    };

    const drawLabel = (
      x: number, y: number,
      name: string,
      color: string,
      progress: number,
      t: number,
      pulseOff: number,
    ) => {
      if (progress < 0.98) return; // only show after arc fully arrives

      const pulse = 0.75 + 0.25 * Math.sin(pulseOff + t * 1.8);

      ctx.save();

      // Measure text with explicit font
      ctx.font = "bold 11px Inter, Arial, sans-serif";
      ctx.letterSpacing = "0.5px";
      const textW = ctx.measureText(name).width + 4; // +4 for letter-spacing
      const padX = 12, padY = 6;
      const bx = x - textW / 2 - padX;
      const by = y - 9 - padY;
      const bw = textW + padX * 2;
      const bh = 18 + padY * 2;
      const br = 4;

      // Outer halo shadow
      ctx.shadowColor = color;
      ctx.shadowBlur = 18 * pulse;

      // Pill background
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, br);
      ctx.fillStyle = "rgba(0, 4, 10, 0.82)";
      ctx.fill();

      // Pill border — two strokes: glow + crisp
      ctx.shadowBlur = 10 * pulse;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.85 * pulse;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Text
      ctx.shadowBlur = 6;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(name, x + 2, y + 1); // +2 offset for letter-spacing drift

      // Connector dot
      ctx.beginPath();
      ctx.arc(x + 2, by + bh / 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = color;
      ctx.shadowBlur = 14 * pulse;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      ctx.restore();
    };

    // ── Main render ────────────────────────────────────────────────────────
    const render = (elapsedSec: number) => {
      ctx.clearRect(0, 0, W, H);

      const scaleFactor = projection.scale() / radius;

      // Globe sphere
      ctx.beginPath();
      ctx.arc(CX, CY, projection.scale(), 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2 * scaleFactor;
      ctx.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule();
        ctx.beginPath();
        path(graticule());
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1 * scaleFactor;
        ctx.globalAlpha = 0.15;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Land outlines
        ctx.beginPath();
        landFeatures.features.forEach((f) => path(f as never));
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1 * scaleFactor;
        ctx.stroke();

        // Dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 && projected[0] <= W &&
            projected[1] >= 0 && projected[1] <= H
          ) {
            ctx.beginPath();
            ctx.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
            ctx.fillStyle = "#999999";
            ctx.fill();
          }
        });
      }

      // ── Arcing data lines ────────────────────────────────────────────────
      COUNTRIES.forEach((country, idx) => {
        const elapsed = elapsedSec - arcStartTime[idx];
        if (elapsed <= 0) return;

        // Progress [0..1] with easing
        const raw = Math.min(1, elapsed / arcDuration);
        const progress = easeInOutQuad(raw);
        arcProgress[idx] = progress;

        // Globe surface origin
        const surfaceXY = projection(country.origin);
        if (!surfaceXY) return;
        const originPt: [number, number] = [surfaceXY[0], surfaceXY[1]];

        // Fixed label screen position
        const labelX = country.labelFrac[0] * W;
        const labelY = country.labelFrac[1] * H;
        const labelPt: [number, number] = [labelX, labelY];

        drawArcLine(originPt, labelPt, progress, country.color, elapsedSec, pulsePhase[idx]);
        drawLabel(labelX, labelY, country.name, country.color, progress, elapsedSec, pulsePhase[idx]);
      });
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    let rafId: number;
    const tick = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const elapsed = (timestamp - startTimestamp) / 1000; // seconds

      if (autoRotate) {
        rotation[0] += rotationSpeed * (16 / 1000) * 60; // ~constant speed
        projection.rotate(rotation as [number, number, number]);
      }

      render(elapsed);
      rafId = requestAnimationFrame(tick);
    };


    // ── Mouse & Touch drag ────────────────────────────────────────────────
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      autoRotate = false;
      const isTouch = (event as TouchEvent).touches !== undefined;
      const startX = isTouch ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
      const startY = isTouch ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY;
      const startRot = [...rotation];

      const onMove = (e: MouseEvent | TouchEvent) => {
        const moveX = isTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        const moveY = isTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
        const sensitivity = 0.5;
        rotation[0] = startRot[0] + (moveX - startX) * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, startRot[1] - (moveY - startY) * sensitivity));
        projection.rotate(rotation as [number, number, number]);
      };

      const onUp = () => {
        if (isTouch) {
          document.removeEventListener("touchmove", onMove);
          document.removeEventListener("touchend", onUp);
        } else {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        }
        setTimeout(() => { autoRotate = true; }, 10);
      };

      if (isTouch) {
        document.addEventListener("touchmove", onMove);
        document.addEventListener("touchend", onUp);
      } else {
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      }
    };

    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("touchstart", handlePointerDown);

    // ── Load GeoJSON ───────────────────────────────────────────────────────
    const loadWorldData = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!res.ok) throw new Error("Failed to load land data");
        landFeatures = (await res.json()) as LandFeatureCollection;

        landFeatures.features.forEach((feature) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) =>
            allDots.push({ lng, lat })
          );
        });
      } catch {
        setError("Failed to load land map data");
      }
    };

    loadWorldData();
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousedown", handlePointerDown);
      canvas.removeEventListener("touchstart", handlePointerDown);
    };
  }, [width, height]);

  if (error) {
    return (
      <div className={`dark flex items-center justify-center rounded-2xl bg-card p-8 ${className}`}>
        <div className="text-center">
          <p className="mb-2 font-semibold text-destructive">Error loading Earth visualization</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}