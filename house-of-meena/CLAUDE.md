# CLAUDE.md — House of Meena Storefront

> Luxury handwoven saree brand. Custom front-end (this repo) + Shopify backend.
> Visual source of truth: `../house-of-meena.html` (hand-coded, pixel-perfect).

---

## Architecture

```
Custom front-end (this repo)          Shopify
  Vite + vanilla TS/JS           ←──── Shopify JS Buy SDK (Storefront API)
  Static deploy → Vercel               Product catalog · Cart · Checkout
  index.html = landing page            Hosted checkout (we never touch this)
```

The bridge is the **Shopify JS Buy SDK** running entirely client-side:
- Fetch products/collections via Storefront API
- Manage cart (add, remove, line counts)
- Checkout: redirect to `checkout.webUrl` — Shopify owns everything after that click

**Do NOT build a custom checkout.** Never touch payment or order logic.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Build | Vite (vanilla-ts template) | Fast, minimal, close to hand-coded original |
| Language | TypeScript (strict) | Type safety without framework overhead |
| Styles | Plain CSS + CSS variables | Preserve existing token names; no Tailwind, no CSS-in-JS |
| Shopify | `shopify-buy` SDK | Official client-side Storefront SDK |
| Deploy | Vercel (static) | Zero-config static hosting |
| Dev tools | magic-mcp | AI component generator — dev only, zero runtime cost |

**Ask before adding any new runtime dependency.**

---

## Design System

> Lifted verbatim from `house-of-meena.html`. Do not change token names or values.

### CSS Variables (tokens.css)

```css
:root {
  /* Surfaces */
  --cream:        #f7f0e4;   /* primary warm ivory canvas */
  --cream-deep:   #efe4d1;   /* secondary panel */
  --cream-warm:   #f1e7d6;
  --paper:        #fbf6ec;   /* lightest, card surfaces */

  /* Brand */
  --maroon:       #5d1f2d;   /* deep oxblood — primary brand */
  --maroon-deep:  #3c1019;   /* footer / hero overlays */
  --maroon-soft:  #7a2a3a;

  /* Gold zari — THE ONLY ACCENT — use sparingly */
  --gold:         #b08642;
  --gold-bright:  #c79a4f;
  --gold-pale:    #e3cfa0;
  --gold-line:    rgba(176,134,66,.55);

  /* Ink */
  --ink:          #2a201b;   /* warm near-black text */
  --charcoal:     #4b3e36;
  --mute:         #8a7c6f;   /* secondary metadata */
  --line:         rgba(42,32,27,.14);
  --line-gold:    rgba(176,134,66,.28);

  /* Type stacks */
  --display:      "Playfair Display", Georgia, serif;
  --editorial:    "Cormorant Garamond", Georgia, serif;
  --sans:         "Jost", "Helvetica Neue", Arial, sans-serif;

  /* Layout */
  --maxw:  1380px;
  --gut:   clamp(20px, 5vw, 80px);
  --ease:  cubic-bezier(.22,.61,.36,1);
}
```

### Aesthetic Rules ("quiet wealth")

- **Cream is the canvas.** Maroon is the brand. Gold is the accent — use it only for eyebrows, rule lines, hover underlines, and zari details.
- **Never use gold as a fill** on buttons or large areas.
- **Generous space** — sections breathe. Resist the urge to pack content.
- **Typography hierarchy:** Playfair Display for display/headings, Cormorant Garamond for editorial/body prose, Jost for UI labels, nav, meta.
- **No decorative gradients** beyond the paper-grain body background and fabric placeholders.
- Grain overlay (`body::after`) stays. It's intentional texture, not noise.

### Google Fonts (preload Playfair Display only)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500;600&display=swap">
<link href="..." rel="stylesheet">
```

### Shared Components (lift from source-of-truth HTML)

| Class | Role |
|-------|------|
| `.wrap` | Max-width container with inline gutters |
| `.eyebrow` | Gold small-caps label with leading rule |
| `.section-title` | Playfair Display fluid heading |
| `.btn` `.btn-solid` `.btn-line` `.btn-ghost-light` | Button variants |
| `.link-gold` | Maroon text + gold underline reveal on hover |
| `.fabric` `.f-*` | Saree colour-way gradient placeholders |
| `.r` `.r.in` | Scroll-reveal: opacity 0 → 1 + translateY |

---

## Folder Structure

```
house-of-meena/
├── index.html               # Single entry point
├── public/
│   └── favicon.svg
├── src/
│   ├── main.ts              # Orchestrates mount() calls + shared behaviours
│   ├── styles/
│   │   ├── tokens.css       # All CSS variables (above)
│   │   ├── reset.css        # Box-sizing reset + base body styles
│   │   ├── shared.css       # .wrap .eyebrow .btn .link-gold .fabric .r etc.
│   │   └── responsive.css   # All @media breakpoints
│   ├── components/
│   │   ├── announce.ts
│   │   ├── nav.ts
│   │   ├── hero.ts
│   │   ├── trust.ts         # Marquee strip
│   │   ├── intro.ts
│   │   ├── collections.ts   # Category editorial grid
│   │   ├── product-grid.ts  # Shopify products (Phase 2) / placeholder (Phase 1)
│   │   ├── story.ts
│   │   ├── craft.ts
│   │   ├── newsletter.ts
│   │   ├── footer.ts
│   │   └── cart-drawer.ts   # Shopify cart (Phase 2) / shell (Phase 1)
│   ├── shopify/             # Phase 2 only
│   │   ├── client.ts        # Storefront client init
│   │   ├── products.ts      # Fetch collection → product cards
│   │   └── cart.ts          # Create / add / remove / totals
│   └── utils/
│       ├── scroll-reveal.ts # IntersectionObserver for .r elements
│       ├── sticky-nav.ts    # Scroll → .solid class
│       ├── drawer.ts        # Mobile nav drawer open/close
│       └── paisley.ts       # SVG paisley background generator
├── .env.example             # Template for Shopify env vars
├── vercel.json
└── README.md
```

---

## Environment Variables

```bash
# .env.local (never commit)
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
VITE_SHOPIFY_COLLECTION_HANDLE=frontpage   # or your featured collection handle
```

`.env.example` (committed) holds these keys with blank values.

---

## Responsive Breakpoints

| Name | px | Behaviour |
|------|----|-----------|
| Mobile | ≤ 420px | Single-column product grid, stacked footer |
| Phablet | ≤ 640px | 2-col product grid, hero content shifts down |
| Tablet | ≤ 900px | Burger menu, story stacked, craft 1-col |
| Wide tablet | ≤ 1080px | 3-col product grid, 2-col footer |
| Desktop | > 1080px | Full layout |

All defined in `src/styles/responsive.css`. Never put breakpoints inline.

---

## Accessibility Checklist (Phase 4)

- [ ] `<a class="skip-link" href="#main-content">Skip to content</a>` as first child of `<body>`
- [ ] ARIA landmarks: `<header>` `<main>` `<footer>` `<nav aria-label="Primary">`
- [ ] All `<button>` elements have `aria-label` when icon-only
- [ ] Cart drawer: `role="dialog"` `aria-modal="true"` `aria-label="Shopping cart"`, focus trapped while open
- [ ] Visible focus rings — never `outline: none` without a visible replacement
- [ ] `prefers-reduced-motion` respected (already in source HTML)
- [ ] `alt` text on every product image (use product title as fallback)
- [ ] Contrast: cream `#f7f0e4` on maroon `#5d1f2d` = 7.3:1 ✓; gold `#b08642` on cream = 3.2:1 (large text only)

---

## Phase Map

| Phase | Status | Deliverable |
|-------|--------|-------------|
| 1 | TODO | Vite scaffold; pixel-identical port of house-of-meena.html |
| 2 | TODO | Shopify Buy SDK: live product grid + cart drawer + checkout redirect |
| 3 | TODO | magic-mcp component refinements (dev tool only) |
| 4 | TODO | a11y · performance · SEO · README |

**Stop and wait for review after each phase.**

---

## Working Rules

- **Plan before coding.** If unsure, ask.
- **Never touch checkout or payment logic.** Shopify owns the checkout URL.
- Commits must be small and descriptive: `feat(nav): sticky solid state on scroll`
- New runtime dependencies require explicit approval before installation.
- Do not rename or change CSS variable names — the source HTML is the contract.
- Image slots use `.fabric` placeholders until real photography is provided. To swap in a photo: `<div class="fabric f-maroon"><img src="photo.jpg" alt="..."></div>`
- Fabric placeholder classes available: `f-maroon` `f-plum` `f-emerald` `f-teal` `f-indigo` `f-mustard` `f-rose` `f-saffron`
