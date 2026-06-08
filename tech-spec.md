# Tech Spec — Program Studi Kriya Tekstil dan Fashion

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| gsap | ^3.12 | Scroll-triggered fade-in animations, staggered reveals, hero page-load sequence |
| lucide-react | ^0.400 | Hamburger/close icons for mobile nav |

No shadcn/ui components — the neo-brutalist design avoids pre-built component styling entirely.

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Floating transparent bar; scroll-triggered bg/blur transition; mobile hamburger overlay |
| Footer | Custom | Two-column navy footer with accent line |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Split-screen layout (55/45 macro photo + navy panel); page-load stagger animation |
| StatsRibbon | Custom | 4-stat flex row with vertical dividers; 2x2 grid on mobile |
| StudentArchive | Custom | Asymmetric 4-col CSS Grid (4 size variants); 8 portfolio cards |
| PhilosophySplit | Custom | 55/45 split (navy text + editorial photo); pull quote with left border |
| AcademicSpecs | Custom | Data table with navy header + footer row; hover row highlight |
| IndustryPartners | Custom | CSS marquee + 8-cell partner grid |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionHeading | Custom | StudentArchive, AcademicSpecs, IndustryPartners |
| PortfolioCard | Custom | StudentArchive (x8) |
| FadeIn | Custom | Wrapper for all scroll-triggered reveals; uses GSAP ScrollTrigger |

## Animation Implementation

| Animation | Library | Implementation | Complexity |
|-----------|---------|---------------|------------|
| Fade-in scroll reveal (global) | GSAP + ScrollTrigger | `FadeIn` wrapper component: `opacity:0, y:24` → revealed on 15% intersection, 0.6s ease, stagger 0.12s between siblings, one-shot | Medium |
| Hero page-load sequence | GSAP timeline | 5-step staggered timeline on mount: label → title → yellow line (width tween) → subtitle/desc/CTA, auto-plays once | Medium |
| Nav scroll response | CSS transition + JS listener | Scroll listener toggles class at 80px threshold; CSS handles bg/blur/border transitions | Low |
| Marquee scroll | CSS @keyframes | `translateX(0 → -50%)`, linear, 30s, infinite; content duplicated for seamless loop | Low |
| Portfolio card image zoom | CSS transition | `transform: scale(1.03)` on hover, `overflow: hidden` on container, 0.5s ease | Low |
| Portfolio card info overlay | CSS transition | Opacity 0→1 on hover, 0.3s ease | Low |
| Table row hover | CSS transition | `background-color` shift to pale yellow, 0.2s ease | Low |
| Smooth anchor scroll | Native CSS | `scroll-behavior: smooth` on html; `scroll-padding-top: 80px` for nav offset | Low |

## Other Key Decisions

- **Font loading**: Cormorant Garamond, Inter, and JetBrains Mono loaded via Google Fonts `<link>` in `index.html`. No npm font packages.
- **No Splitting.js**: The design's large headings are single-line or manually broken; no character-level animation requires it.
- **No Lenis**: Native `scroll-behavior: smooth` is sufficient; the design has no scroll-scrubbed or parallax effects.
- **No Tailwind Typography plugin**: All type styles are explicitly specified in the design; the plugin would add unused defaults.
