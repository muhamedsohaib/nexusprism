# Nexus Prism 2026 Website Redesign Blueprint

Status: Blueprint only. No implementation approved yet.
Branch: redesign-2026-luxury-command-center

## Locked direction

The redesign direction is a premium consulting-firm website with dark cinematic luxury, futuristic restraint, and service-led conversion. The site should feel premium and mysterious, not like a generic AI agency and not like a cheap SaaS template.

Working brand name: Nexus Prism.
Final brand name: Not decided yet.
Primary tagline: The AI operating layer for UAE sellers.
Initial target: Amazon.ae sellers.
Market posture: UAE-first, globally capable.
Commercial positioning: Commerce operations first.

## Visitor emotion target

The first five seconds must create one reaction: Wow.

The visitor should feel that the company is expensive, precise, mysterious, and capable of fixing real e-commerce execution problems.

## Creative system

### Visual mood

- Dark cinematic luxury.
- Futuristic, but not neon cyberpunk.
- Premium consulting-firm seriousness.
- Cleaner cinematic backgrounds, not heavy visual clutter.
- Black + deep red + pearl white as the main palette.
- Subtle prism language through logo mark, light beam, scanner motion, dashboard glow, and transitions.

### Color system draft

- Obsidian Black: #050505
- Cinematic Black: #0A0A0D
- Deep Red: #8B0E16
- Signal Red: #D01824
- Pearl White: #F4EFE7
- Soft Pearl: #D8D0C4
- Dim Pearl Text: rgba(244,239,231,0.68)
- Glass Surface: rgba(244,239,231,0.06)
- Glass Border: rgba(244,239,231,0.14)

### Glass usage

Glassmorphism must be used only for:

- Navigation.
- Scanner card.
- Dashboard preview cards.
- Pricing cards.
- FAQ accordion surfaces.
- Floating CTA panels.

Avoid using glass everywhere.

### Motion level

Requested motion level: Extreme.

Implementation rule: It must still be mobile-performance friendly.

Motion should include:

- Entry screen reveal.
- Cinematic dashboard animation.
- Prism orb hero object.
- Scanner sequence.
- Scroll-triggered section reveals.
- Page transitions.
- Reduced-motion support.

Motion should not include:

- Random floating blobs everywhere.
- Cheap AI purple gradients.
- Distracting effects that hide the business offer.
- Heavy 3D that breaks mobile performance.

## Locked homepage flow

1. Entry screen.
2. Hero.
3. AI Commerce Score Scanner.
4. Live Dashboard Preview.
5. Before/After Lab.
6. Services / Fix Sprints.
7. Proof.
8. Pricing Starter Offers.
9. FAQ.
10. WhatsApp CTA.

## Entry screen concept

The website opens with a full-screen no-scroll entry screen.

Visual:

- Mostly black.
- Very subtle red light movement.
- Pearl-white wordmark or logo.
- Prism orb faintly visible in the center or behind the logo.
- One mysterious line: The AI operating layer for UAE sellers.
- CTA: Enter the Command Center.

Behavior:

- No scrolling at first.
- User clicks entry CTA.
- Cinematic fade / prism-wipe transition into the hero.
- Reduced-motion users get a clean fade.

## Hero concept

The hero should be full-screen and not reveal the next section immediately.

Primary headline direction:

- The AI operating layer for UAE sellers.

Supporting copy direction:

- Nexus Prism helps Amazon.ae sellers diagnose catalog, content, conversion, automation, and trust gaps before turning the highest-impact fixes into focused execution sprints.

Primary CTA:

- Get My Free Commerce Score.

Secondary CTA:

- WhatsApp the Founder.

Hero visual:

- Cinematic dashboard animation.
- Prism orb as the central premium object.
- Dark control-room background.
- Subtle red scanning line.
- Pearl-white interface cards.
- No cheap revenue claims.

## AI Commerce Score scanner

The scanner should feel like the core product, not a normal form.

User input fields should collect enough information for a real human + AI-assisted audit:

- Business name.
- Contact name.
- WhatsApp number.
- Email.
- Store/listing URL.
- Main sales channel.
- Marketplace/store category.
- Top 3 ASINs/SKUs/products if available.
- Approximate monthly online revenue range.
- Main problem.
- Current tools/platforms used.
- Whether they sell through FBA/FBN/own fulfillment.
- Whether they have brand registry/trademark if relevant.
- Permission checkbox for manual review.

Output expectation:

- Do not show a fake score instantly.
- Show: We will manually review your store and send your AI Commerce Score.
- Keep WhatsApp handoff.
- Store leads in Supabase.

Score categories:

- Catalog quality.
- Product images.
- Keyword/search readiness.
- Store trust.
- Conversion rate.
- Automation gaps.
- Revenue leakage.
- Compliance readiness.

## Live Dashboard Preview

This should preview the future service experience without pretending the full app already exists.

Dashboard modules:

- Commerce Health.
- Catalog Quality.
- Image Quality.
- Search Readiness.
- Store Trust.
- Conversion Risk.
- Automation Gaps.
- Compliance Readiness.
- Active Sprint.
- Pending Approvals.

Tone:

- Premium consulting dashboard.
- Serious and useful.
- Not gamer-style.

## Before/After Lab

No fake testimonials.

Proof should come from:

- Founder’s own Amazon/e-commerce experience.
- Demonstrated improvements.
- Listing structure examples.
- Product image quality examples.
- Website UX before/after.
- Automation workflow before/after.

Important:

- Avoid fake financial claims.
- Avoid fake client names.
- Label examples clearly as demonstrations or founder work unless they are real client cases.

## Services / Fix Sprints

Locked offers:

1. AI Commerce Score Audit.
2. Marketplace Rescue Sprint.
3. Store Launch Sprint.
4. Automation Setup.
5. Growth Retainer.

Hardest-pushed offer:

- Free first review / Free Commerce Score.

Pricing posture:

- Show pricing publicly.
- Lead with free audit, then paid sprint.
- Dedicated pricing page required.

## Pricing model draft

Homepage pricing should show starter direction without overcomplicating.

Recommended structure:

- Free Commerce Score: AED 0.
- Marketplace Rescue Sprint: Starting from AED 1,500.
- Store Launch Sprint: Starting from AED 3,500.
- Automation Setup: Starting from AED 4,000.
- Growth Retainer: Starting from AED 1,500/month.

Pricing page can explain scope, timelines, and what changes the final quote.

## Required pages

Version one should include all requested pages, but homepage must be the strongest page.

Required pages:

- Home.
- AI Commerce Score.
- Services.
- Proof / Before-After Lab.
- Pricing.
- About.
- Contact.
- FAQ.
- Blog / Resources.
- Client Portal Preview.
- Case Studies.

## About section

Include founder-led credibility.

Tone:

- Premium and mysterious, but human enough to build trust.
- Show Amazon/e-commerce operational experience.
- Avoid sounding like a generic agency founder.

## Bilingual structure

Languages:

- English.
- Arabic.

Behavior:

- Real language switcher.
- Arabic should be first-class, not decorative.
- Use RTL layout for Arabic pages.
- Keep numbers and formatting locale-aware.

## WhatsApp

WhatsApp remains the main conversion path for now.

Every major section should eventually have either:

- Get Free Commerce Score.
- WhatsApp the Founder.

But the primary CTA should remain the free score, not generic contact.

## Technical implementation direction

Branch:

- redesign-2026-luxury-command-center.

Stack additions requested:

- shadcn/ui.
- Radix.
- Formal component system.
- Supabase for lead storage.

Current stack already includes:

- Next.js.
- React.
- TypeScript.
- Tailwind.
- Motion.

Deployment:

- Vercel only if it brings meaningful value.
- No analytics for now.

## Approval process

Implementation must not start until the blueprint is approved.

Recommended approval stages:

1. Approve this blueprint.
2. Approve wireframe and section copy.
3. Approve design-system tokens.
4. Approve component architecture.
5. Approve homepage implementation.
6. Approve remaining pages.
7. Approve Supabase integration.
8. Approve bilingual/RTL pass.
9. Approve QA/performance/mobile pass.

## Non-negotiables

- No fake testimonials.
- No fake client results.
- No fake revenue claims.
- No cheap AI template visuals.
- No cluttered agency service grid.
- No full app build before lead generation proves demand.
- Motion must be extreme in feeling, but responsible in performance.
- Accessibility and reduced-motion support are required.
- The website must sell services first, not pretend to be a finished SaaS.

## One-line creative summary

A dark cinematic premium consulting website for UAE commerce operators, built around a mysterious prism-led entry experience, a powerful AI Commerce Score scanner, proof-led before/after labs, and WhatsApp-first conversion.
