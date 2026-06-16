# Lumea Studio — Agentur-Webseite

Eine moderne, responsive Single-Page-Webseite für eine fiktive Design- &
Entwicklungsagentur. Erstellt mit dem **UI/UX Pro Max** Design-Intelligence-Toolkit.

## Design-System

| Aspekt | Wahl |
|--------|------|
| **Stil** | Swiss Modernism / Clean Minimal (Light) |
| **Farben** | Navy `#0F172A` · Blau-Akzent `#0369A1` · Hintergrund `#F8FAFC` |
| **Typografie** | Space Grotesk (Headings) + Inter (Body) |
| **Tech** | HTML + Tailwind CSS (CDN), Vanilla JS |

## Abschnitte

Navigation · Hero mit Stats · Logo-Marquee · Leistungen · Arbeiten/Portfolio ·
Prozess · Über uns + Testimonial · Kontakt-CTA · Footer

## Features

- Vollständig responsive (375 / 768 / 1024 / 1440 px)
- Barrierefrei: Skip-Link, Fokus-States, ARIA-Labels, semantisches HTML, WCAG-AA-Kontraste
- Scroll-Reveal-Animationen mit `IntersectionObserver`
- Respektiert `prefers-reduced-motion`
- Mobiles Menü, Scroll-Effekte, Demo-Kontaktformular

## Lokal ansehen

```bash
# Einfach die Datei im Browser öffnen …
open website/index.html

# … oder via lokalem Server:
python3 -m http.server 8000 --directory website
# → http://localhost:8000
```
