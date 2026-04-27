<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Aesthetic Port — Next.js 16 + React 19 Portfolio

A client-side rendering animation-heavy portfolio showcasing projects with complex scroll-driven effects using GSAP, Framer Motion, Three.js, D3, and custom canvas sequencing.

## Build & Development

**Commands:**
```bash
npm run dev      # Start dev server (localhost:3000, allows 192.168.56.1 for mobile testing)
npm run build    # Production build
npm run start    # Run production build
npm lint         # ESLint check (flat config, ESLint 9+ format)
```

**Key config:**
- **React Compiler enabled** — auto-memoization via babel-plugin-react-compiler. Impact: may hide stale closure bugs.
- **Mobile network testing** — `allowedDevOrigins: ["192.168.56.1"]` in [next.config.ts](next.config.ts) for local device access.
- **Tailwind CSS 4** — uses new PostCSS plugin (`@tailwindcss/postcss`), not tailwind.config.js. See [globals.css](src/app/globals.css) for CSS variable setup (OKLch colors, font stacks).

## Architecture

**All components use `"use client"`** — purely client-rendered. No server components, no SSR data fetching.

**Layout structure:**
- [src/app/layout.tsx](src/app/layout.tsx) — imports fonts (Geist, Cormorant, Bebas) and IntroVideoPreloader
- [src/app/page.tsx](src/app/page.tsx) — home page with sections (About, Projects, Testimonials, etc.)
- [src/app/contact/page.tsx](src/app/contact/page.tsx) — contact form page
- [src/app/projects/[slug]/page.tsx](src/app/projects/%5Bslug%5D/page.tsx) — dynamic project detail pages (slug-based routing)

**Component hierarchy:** `/components/*` imports `/components/ui/*` (one-directional).

**Data:** [src/lib/projectsData.ts](src/lib/projectsData.ts) — centralized projects array with `Project` interface.

## Animation & Visualization Patterns

**Four coexisting animation philosophies:**

1. **Scroll-driven (Framer Motion):** `useScroll()` + `useTransform()` for viewport-synced opacity, position, rotate
   - Example: [TabcuraScrollVisual.tsx](src/components/TabcuraScrollVisual.tsx#L37-L80) uses `motionValue.set()` on scroll events
   
2. **Trigger-based (GSAP):** `gsap.to()` with ScrollTrigger for card hovers, media animations
   - **Important:** Register ScrollTrigger only if `typeof window !== "undefined"` (client-side guard)
   
3. **Frame sequencing (Canvas):** [ScrollyCanvas.tsx](src/components/ScrollyCanvas.tsx) loads 120 webp frames from `/sequence/`, renders via canvas on scroll
   
4. **3D models (Three.js):** [TabcuraPhoneModel.tsx](src/components/TabcuraPhoneModel.tsx) uses `@react-three/fiber` + GLTFLoader for model rendering

5. **Data visualization (D3):** [wireframe-dotted-globe.tsx](src/components/ui/wireframe-dotted-globe.tsx) handles geospatial canvas rendering

**Avoid mixing animation libraries in same element** — Framer Motion + GSAP transforms can conflict. Use scoped refs and isolated motion values.

## State Management

**React hooks only** — no Redux/Context/Zustand.

- `useState()` for component state (modal open/close, form inputs, animation phases)
- `useRef()` for DOM/canvas/video element access and RAF/timeout tracking
- `useLayoutEffect()` when GSAP timings require DOM-sync before paint
- Framer Motion's `useScroll()` scoped to container refs (not global)

**Example state pattern:**
- [Navbar.tsx](src/components/Navbar.tsx) — RAF-debounced scroll listener, section detection via offset comparison
- [Footer.tsx](src/components/ui/footer.tsx) — form state: `email`, `isSubmitting`, `status` (idle|success|error)
- [IntroVideoPreloader.tsx](src/components/IntroVideoPreloader.tsx) — explicit state machine: `phase` ∈ {hidden, playing, exiting}

## Styling & Typography

**Tailwind CSS 4 setup:**
- New PostCSS plugin (not `tailwind.config.js`). See [postcss.config.mjs](postcss.config.mjs).
- CSS variables in [globals.css](src/app/globals.css): `--background`, `--foreground`, `--font-*` (OKLch palette, dark theme default)
- Custom font: "Creme Espana" via `@font-face` (woff2 format)

**Typography approach:** 
- **Avoid** Tailwind `text-*` classes for font selection
- **Use** inline `style={{ fontFamily: "var(--font-cormorant)" }}` for fine-grained control
- **Responsive sizing:** `clamp(min, preferred, max)` CSS for fluid typography across screen sizes
- **Helper function:** [src/lib/utils.ts](src/lib/utils.ts) exports `cn()` using `clsx` + `tailwind-merge` for conditional class merging

## API & Backend

**Single endpoint:** [src/app/api/contact/route.ts](src/app/api/contact/route.ts)
- POST only, requires: `name`, `email`, `subject`, `message`
- Uses **Resend** (primary email service via `process.env.RESEND_API_KEY`)
- Nodemailer imported but unused in current visible code
- Sends to `process.env.CONTACT_TO_EMAIL` + optional confirmation to subscriber
- Returns JSON with `status` field (error messages on 400/500)

**No database** — stateless email forwarding only.

## Common Patterns & Pitfalls

| Pattern | Files | Notes |
|---------|-------|-------|
| **Scroll detection** | [Navbar.tsx](src/components/Navbar.tsx) | RAF-debounced listener; compare scroll Y against section offsets for active state |
| **Media preload** | [ScrollyCanvas.tsx](src/components/ScrollyCanvas.tsx#L27-L53) | Image array preload in useEffect; handle load errors gracefully |
| **Device pixel ratio** | [ScrollyCanvas.tsx](src/components/ScrollyCanvas.tsx) | Canvas sizing requires manual DPR scaling (`window.devicePixelRatio`) |
| **Layout shift prevention** | — | No Next.js Image component used; static width/height on containers to avoid CLS |

**Pitfalls:**
- ⚠️ **GSAP + layout.tsx:** Guard plugin registration with `typeof window !== "undefined"`
- ⚠️ **Hydration mismatch:** IntroVideoPreloader imported in server layout — ensure consistent initial state between SSR and client
- ⚠️ **Canvas memory:** [ScrollyCanvas.tsx](src/components/ScrollyCanvas.tsx) preloads 120 images (~50–100 MB if 4K). Monitor performance on low-end devices.
- ⚠️ **Font variable scope:** CSS vars only work in `<style>` attributes or Tailwind classes; not in JS `fontFamily` strings (must use `var(--font-*)`)
- ⚠️ **Three.js bundle size:** 3D models and GLTFLoader add ~300 KB (gzipped). Consider lazy loading components using dynamic imports.

## Key Files Reference

| File | Purpose |
|------|---------|
| [next.config.ts](next.config.ts) | Dev origin whitelist, compiler settings |
| [globals.css](src/app/globals.css) | CSS variables, font imports, Tailwind directives |
| [projectsData.ts](src/lib/projectsData.ts) | Centralized project metadata + interface |
| [Navbar.tsx](src/components/Navbar.tsx) | Scroll detection, section active state |
| [ScrollyCanvas.tsx](src/components/ScrollyCanvas.tsx) | Frame sequencing, canvas rendering |
| [TabcuraScrollVisual.tsx](src/components/TabcuraScrollVisual.tsx) | GSAP + Framer Motion scroll triggers |
| [wireframe-dotted-globe.tsx](src/components/ui/wireframe-dotted-globe.tsx) | D3 geospatial visualization |

## Quick Task Guide

**Add a new project:**
1. Add object to [projectsData.ts](src/lib/projectsData.ts) with `slug`, `title`, `image`, etc.
2. Create [src/app/projects/my-slug/page.tsx](src/app/projects/my-slug/page.tsx) and import [ProjectDetail.tsx](src/components/ProjectDetail.tsx)

**Modify scroll animation:**
1. Check if using Framer Motion ([TabcuraScrollVisual.tsx](src/components/TabcuraScrollVisual.tsx)) or GSAP (other files)
2. For Framer: adjust `useTransform()` range values
3. For GSAP: modify `gsap.to()` config in `ScrollTrigger` callback

**Update contact form backend:**
1. Ensure `process.env.CONTACT_TO_EMAIL` and `process.env.RESEND_API_KEY` set in `.env.local`
2. Modify [src/app/api/contact/route.ts](src/app/api/contact/route.ts) for validation or extra fields
