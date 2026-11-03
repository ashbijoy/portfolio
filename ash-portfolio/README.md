# ash. — portfolio

React + Vite. All content is in `src/data/`.

## Run locally
```
npm install
npm run dev
```

## Edit content
- **Text, experience, ryū co., socials, quote** → `src/data/content.js`
- **Featured designs** → add the image to `public/images/featured/`, then add an entry to `src/data/featured.json`:
  `{ "src": "/images/featured/my-poster.jpg", "title": "My Poster", "w": 800, "h": 1000 }`
  (`w`/`h` are the image's pixel size; keep images ~800px wide as JPG.)
- **ryū co. deck images** → `public/images/ryuco/`
- **Résumé download** → put a public PDF (no phone or references) in `public/files/` and set `resume: '/files/name.pdf'` in `content.js`.

## Folder structure
```
public/
  fonts/            Open Sauce web fonts
  images/featured/  design gallery
  images/ryuco/     ryū co. brand deck pages
  images/profile/   photos of you (not used yet)
  files/            downloadable files (résumé)
src/
  data/content.js   all site copy
  data/featured.json gallery list
  components/Gallery.jsx  masonry + full-screen viewer
  App.jsx           page layout
  styles.css        design system (colours, type, layout)
```

## Deploy (Vercel)
Push this folder to a GitHub repo, then in Vercel: **Add New → Project → Import** the repo → Deploy. Framework preset: Vite (auto-detected). Every push to `main` redeploys.
