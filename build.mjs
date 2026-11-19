// Zero-dependency static site generator: content.mjs -> dist/
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { site, home, research, writing, cv } from "./content.mjs";

const OUT = "dist";
const hasCvPdf = process.argv.includes("--with-cv-pdf");

const nav = [
  ["/", "Home"],
  ["/research/", "Research"],
  ["/cv/", "CV"],
  ["/writing/", "Public"],
];

const page = (path, title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${site.description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${site.description}">
<meta property="og:url" content="${site.url}${path}">
<link rel="canonical" href="${site.url}${path}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap">
<a class="brand" href="/"><img src="/assets/logo.svg" alt="" width="93" height="48">${site.name}</a>
<nav aria-label="Main">${nav.map(([h, l]) => `<a href="${h}"${h === path ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</nav>
</div></header>
<main id="main"><div class="wrap">
${body}
</div></main>
<footer class="foot"><div class="wrap small">
<span>${site.name} · ${site.place}</span>
<span><a href="mailto:${site.email}">${site.email}</a> · <a href="${site.github}">GitHub</a></span>
</div></footer>
</body>
</html>
`;

const row = (label, html) => `<section class="row"><div class="label">${label}</div><div>${html}</div></section>`;

const paper = (p) => `<article class="entry">
<h3>${p.title}</h3>
<div class="meta small"><span>${p.meta}</span>${p.year ? `<span>${p.year}</span>` : ""}</div>
${p.abstract ? `<details><summary>Abstract</summary><p>${p.abstract}</p></details>` : ""}
${p.pdf ? `<div class="links"><a href="/assets/files/${p.pdf}">PDF</a></div>` : ""}
</article>`;

const portrait = existsSync("assets/portrait.jpg") ? `<img src="/assets/portrait.jpg" alt="Portrait of ${site.name}" width="400">` : "";

const homeBody = `<section class="hero">
<div><h1>${home.lede}</h1><p class="small">${site.name} · ${site.role} · ${site.place}</p></div>
${portrait}
</section>
${row("About", `<div class="prose">${home.bio.map((p) => `<p>${p}</p>`).join("")}</div>`)}
${row("Interests", `<ul class="tags">${home.interests.map((t) => `<li>${t}</li>`).join("")}</ul>`)}
`;

const researchBody = `<div class="page-head"><h1>Research</h1></div>
${research.map((g) => row(g.group, g.items.map(paper).join(""))).join("\n")}`;

// HTML CV: shown on /cv/ without a PDF, otherwise only the source that scripts/cv-pdf.mjs prints.
const cvHtml = `<div class="page-head"><h1><span class="screen-only">Curriculum vitae</span><span class="print-only">${site.name}</span></h1>
<div class="cv-contact">${site.name} · ${site.place} · ${site.email} · ${site.github.replace("https://", "")}</div></div>
${cv.map((s) => row(s.section, s.entries.map((e) => `<div class="cv-entry">
<div class="what">${e.what}</div>${e.when ? `<div class="when">${e.when}</div>` : ""}
${e.where ? `<div class="where">${e.where}</div>` : ""}
${e.notes ? `<ul>${e.notes.map((n) => `<li>${n}</li>`).join("")}</ul>` : ""}
</div>`).join(""))).join("\n")}`;

const cvPdf = "/assets/files/vykoukal-cv.pdf";
const cvBody = hasCvPdf
  ? `<div class="page-head"><h1>Curriculum vitae</h1><a class="more" href="${cvPdf}">Download PDF</a></div>
<iframe class="cv-pdf" src="${cvPdf}" title="CV of ${site.name} (PDF)"></iframe>`
  : cvHtml;

const writingBody = `<div class="page-head"><h1>Commentaries</h1><p>${writing.intro}</p></div>
${row("Commentary", writing.items.map((w) => `<article class="entry">
<h3>${w.title}</h3>
<p class="dek">${w.dek}</p>
<div class="meta small"><span>${w.meta}</span><span>${w.date}</span></div>
${w.links?.length ? `<div class="links">${w.links.map((l) => `<a href="${l.href}">${l.label}</a>`).join("")}</div>` : ""}
</article>`).join(""))}`;

const notFound = `<div class="page-head"><h1>Page not found</h1><p>The page may have moved. <a href="/">Back to the home page</a>.</p></div>`;

const pages = {
  "index.html": page("/", site.name, homeBody),
  "research/index.html": page("/research/", `Research · ${site.name}`, researchBody),
  "cv/index.html": page("/cv/", `CV · ${site.name}`, cvBody),
  ...(hasCvPdf && { "cv/print/index.html": page("/cv/print/", `CV · ${site.name}`, cvHtml) }),
  "writing/index.html": page("/writing/", `Commentaries · ${site.name}`, writingBody),
  "404.html": page("/404.html", `Not found · ${site.name}`, notFound),
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
cpSync("assets", join(OUT, "assets"), { recursive: true });
for (const [file, html] of Object.entries(pages)) {
  mkdirSync(join(OUT, dirname(file)), { recursive: true });
  writeFileSync(join(OUT, file), html);
}
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nav.map(([h]) => `<url><loc>${site.url}${h}</loc></url>`).join("\n")}\n</urlset>\n`
);
console.log(`Built ${Object.keys(pages).length} pages to ${OUT}/`);
