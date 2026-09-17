# Bangladesh Technology Hub

A modern, responsive, dependency-free website providing detailed information on
Bangladesh's technology business operations — current and upcoming tech trends,
key sectors, the startup ecosystem, and how to get involved.

## Features

- **5 pages**: Home, Sectors, Trends, Startups, Contact
- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript (no build step)
- **Responsive** — mobile-first, works on phones, tablets, and desktops
- **Accessible** — semantic HTML, skip links, focus states, `prefers-reduced-motion`
- **Interactive** — data-driven rendering, mobile nav, scroll-reveal animations, working form UX
- **Fast** — lightweight, no frameworks, loads instantly

## Structure

```
testmodel/
├── index.html        # Home — hero, key stats, sector/trend/startup previews
├── sectors.html      # Key technology sectors + how they connect
├── trends.html       # Current & upcoming trends + deep dives
├── startups.html     # Startup ecosystem, support, how to get involved
├── contact.html      # Contact form + info
├── css/
│   └── styles.css    # All styling + responsive breakpoints
└── js/
    ├── data.js       # All content (edit here to update text/figures)
    └── main.js       # Rendering, nav, forms, scroll animations
```

## Run it

No build required. Just open `index.html` in a browser, or serve locally:

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node (if available)
npx serve .
```

Then visit `http://localhost:8000`.

## Customizing content

All text and figures live in `js/data.js`. Edit that file to update:
- Key stats (`heroStats`, `glanceStats`)
- Sectors (`sectors`, `sectorFlow`)
- Trends (`currentTrends`, `upcomingTrends`, `deepDives`, `whyNow`)
- Startups (`startups`, `support`, `involve`)

> **Note:** Figures are approximate / illustrative for educational purposes.
> Replace with live, sourced data before publishing.

## Tech notes

- Fonts: Inter + Noto Sans Bengali (via Google Fonts)
- Color palette inspired by the Bangladesh flag (green, red, gold)
- CSS custom properties for easy theming
