# Nexus Prism — AI Commerce Operations Website MVP

This repository now contains the first Nexus Prism website MVP: a premium UAE-first AI commerce operations landing website built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and a dark luxury-tech command-center design system.

## Positioning

Nexus Prism is the AI operating layer for UAE sellers. It scores Amazon.ae, noon, Shopify, and e-commerce operations, then turns the biggest revenue leaks into done-for-you fix sprints and retainers.

## Funnel

```txt
Traffic -> AI Commerce Score -> WhatsApp audit -> Paid fix sprint -> Monthly growth retainer
```

## What is built

- Command-center homepage
- AI Commerce Score intake form
- WhatsApp lead-capture flow
- Before / after proof lab
- Capability constellation
- Dashboard preview
- Service / fix sprint pricing
- Contact page
- Design-system handoff

## Routes

```txt
/
/score
/services
/proof
/contact
```

## Tech stack

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS v4
- CSS variables design tokens
- Next font optimization
- WhatsApp click-to-chat lead handoff

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run start
```

## Deployment

Vercel is recommended.

```txt
Build command: npm run build
Output directory: .next
```

## WhatsApp setup

The WhatsApp number is stored in:

```txt
src/lib/constants.ts
```

Update this value before launch:

```ts
export const WHATSAPP_NUMBER = '971586244790'
```

## Next product step

Do not build the full app yet. First collect 50 score submissions, complete 20-30 audits, close 5-8 paid sprints, and convert at least 3 customers into retainers. Then add Supabase/Airtable lead storage and a client portal.
