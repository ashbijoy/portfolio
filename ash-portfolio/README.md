# ash. — portfolio

React + Vite. All content is in `src/data/`.

## Run locally
```
npm install
npm run dev
```

## Edit content
- **Text, experience, ryū co., socials, quote** → `src/data/content.js`
- **Designs** → add two WebP sizes to `public/images/work/` (480px and 960px wide), then add an entry to `src/data/featured.json`:
  `{ "id": "my-poster", "title": "My Poster", "series": null, "w": 960, "h": 1200, "src": "/images/work/my-poster-960.webp", "srcSmall": "/images/work/my-poster-480.webp", "selected": false }`
  Set `"selected": true` (plus `"selectedOrder": 0, 1, 2…`) to show it in the large Selected Work grid. Everything appears in the archive carousel.
- **Case studies** → the `projects` list in `content.js`. Add `cover: '/images/...'` to give a row a hover-preview image.
- **Your photo** → put a transparent PNG cut-out in `public/images/profile/` and set `photo` in `content.js`.
- **ryū co. deck images** → `public/images/ryuco/`
- **Résumé download** → put a public PDF (no phone or references) in `public/files/` and set `resume: '/files/name.pdf'` in `content.js`.

## Folder structure
```
public/
  fonts/            Open Sauce web fonts
  images/work/      designs (WebP, 480 + 960 wide)
  images/ryuco/     ryū co. brand deck pages
  images/profile/   photos of you (not used yet)
  files/            downloadable files (résumé)
src/
  data/content.js   all site copy
  data/featured.json gallery list
  components/       Gallery, WorkIndex (case studies), DeckViewer, Lightbox
  App.jsx           page layout
  styles.css        design system (colours, type, layout)
```

## Deploy (Vercel)
Push this folder to a GitHub repo, then in Vercel: **Add New → Project → Import** the repo → Deploy. Framework preset: Vite (auto-detected). Every push to `main` redeploys.
