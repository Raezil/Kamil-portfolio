# Kamil Mościszko — Portfolio

A 3D portfolio built around a "signal lattice" — a live network of nodes and traveling
light pulses, standing in for the protocols and event buses Kamil builds.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. For a production build:

```bash
npm run build
npm run preview
```

## Stack

- React 19 + Vite
- `@react-three/fiber` + `three` for the 3D lattice hero and connecting threads
- `framer-motion` for scroll-based hero fade
- No external UI kit — hand-built design system in `src/App.css`

## Editing content

All copy (projects, experience, stack) lives in typed arrays at the top of
`src/App.jsx` — `PROJECTS`, `EXPERIENCE`, `STACK_GROUPS`. Colors and type live as
CSS custom properties at the top of `src/App.css`.
# Kamil-portfolio
