# Daniel Vykoukal: personal site

Static site with no dependencies. Pushing to `main` rebuilds the pages and the CV PDF and deploys to GitHub Pages.

- Change text, papers or the CV: edit `content.mjs`.
- Add a paper PDF: put it in `assets/files/` and set `pdf: "name.pdf"` on the entry.
- Add a portrait: save it as `assets/portrait.jpg`. It appears on the home page automatically.
- Preview locally: `npm run dev`, then open http://localhost:8123.
