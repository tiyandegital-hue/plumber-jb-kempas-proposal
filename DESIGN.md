# DESIGN.md — Plumber Service Johor Bahru × Tiyan Digital (proposal demo)

## Overview
SPEED-lane lead (Malaysia), AI Automation pillar. A proposal site whose centerpiece is an INTERACTIVE WhatsApp photo-quote bot mock: the visitor plays the customer (pick problem → send sample photo → area → placeholder quote → slot → booking summary). Audience: the plumber owner (WhatsApp-first, no website, Kempas Baru) AND his customers. Job of the site: make the owner feel the 2 AM quote happening without him.

## Psychology brief
- Visitor: JB homeowner with an urgent leak, on mobile, stressed; or the owner himself evaluating.
- Pain: unanswered messages, hours for a price, forgotten follow-ups.
- One action: run the live demo, then request the scope call.
- Trust gap: no website today; everything over WhatsApp already — the demo must feel like his real channel, not a gimmick.
- Emotion: panic → relief ("quoted and booked in 60 seconds").

## Mood (3 words)
LIVE · DIRECT · RELIEVING

## Signature idea
"Live signal" — the hero is a phone running an auto-playing scripted WhatsApp conversation (ambient loop), and the demo page is the full interactive version. One live thing per page: the chat.

## Tokens
- --bg #060D17 (deep navy) · --bg-2 #0A1626 · --surface #0D1B2E
- --ink #F2F7FB · --muted #9FB0C3 (6.9:1 on bg) · --muted-2 #6E8299 (large/secondary only)
- --green #25D366 (THE one CTA color; WhatsApp-signal green) · --on-green #052015
- Chat: bg #0B141A · in #1F2C34 · out #005C4B · ticks #53BDEB
- Radius 14px (cards), 38px phone. No shadows except phone + hot tier.

## Type
- Display: Space Grotesk 700, clamp(44px,7.2vw,104px), tracking -0.02em, masked line-rise hero.
- Body: Inter 16-20px/1.65. Labels: JetBrains Mono 10-12px, +0.2em.
- Differentiation vs sibling builds: NOT condensed-italic industrial (Nazir), NOT safety-orange (BR trades), NOT warm editorial (salon). Expanded grotesk + signal-green + chat motif = its own family.

## Pages
index (hero + live phone preview + gap cards + pipeline strip + honesty block), demo (interactive chat mock + side explainer), how-it-works (5-node animated graph + guardrails), pricing (3 placeholder tiers + honesty box), contact (demo form w/ consent + WhatsApp CTA), privacy, terms.

## Honesty rules (enforced)
- Every price labeled "*Demo figures — not real prices"; pricing page = "from RM ___" placeholders, final quote after scope call.
- "PROPOSAL DEMO" tag in nav + footer banner on every page; sample photos drawn as SVG, labeled DEMO SAMPLE.
- Real facts only: 4.8★ Google (40 reviews), real address, real WhatsApp. No testimonials, no invented stats.
- Chat demo runs 100% client-side; contact form does not transmit (stated on page).

## Known gaps
- Sample "photos" are drawn SVGs, not real leak photos (no licensed plumbing photos on hand; credited alternatives would improve realism).
- Hero autoplay is ambient (aria-hidden); full interactivity lives on demo.html by design.
- No Malay-language toggle — outreach and site are English per brief (Malaysia urban trades operate in English).
- Screenshots for look-and-fix loop not yet taken (no screenshot pipeline available in this session; verified via code QA + local HTTP 200s).

## QA (2026-11-04)
- node --check: main.js, chat.js, hero-chat.js — all pass, no console errors by inspection (no console.* calls).
- Local HTTP: all 7 pages 200; all internal hrefs resolve to existing files.
- Overflow: body overflow-x hidden; phone max-width 360-420px; grids collapse at 900/760/560px; chips wrap.
- Keyboard: chips are real buttons, free-text input labeled, focus-visible ring, skip link present.
- Reduced motion: full branch disables rises, marquee, pulse, typing anim, dash animation; reveals default visible.
