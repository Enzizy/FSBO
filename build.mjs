// Zero-dependency static build: node build.mjs  →  ./dist
// Renders every page once per design version: V1 at /, V2 at /v2/, V3 at /v3/.
import { mkdir, writeFile, rm, cp, readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setVersion, VERSIONS } from './src/layout.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const load = async (p) => (await import(pathToFileURL(join(root, p)).href)).default;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });

// Cache-busting: append a short content hash to every CSS/JS URL so deploys never serve stale files.
const assetHash = {};
for (const dir of ['css', 'js']) {
  for (const f of await readdir(join(root, 'assets', dir))) {
    assetHash[`/assets/${dir}/${f}`] = createHash('sha1').update(await readFile(join(root, 'assets', dir, f))).digest('hex').slice(0, 10);
  }
}
const bust = (html) => html.replace(/"(\/assets\/(?:css|js)\/[^"?]+)"/g, (m, p) => assetHash[p] ? `"${p}?v=${assetHash[p]}"` : m);

const shared = [];
for (const f of (await readdir(join(root, 'src/pages'))).filter((f) => f.endsWith('.mjs'))) shared.push(await load(`src/pages/${f}`));

let total = 0;
let canonical = [];
for (const id of Object.keys(VERSIONS)) {
  setVersion(id);
  const prefix = id === 'v1' ? '' : '/' + id;
  const homeOverride = existsSync(join(root, `src/versions/${id}-home.mjs`)) ? await load(`src/versions/${id}-home.mjs`) : null;

  const pages = [];
  for (const render of shared) for (const p of [render()].flat()) pages.push(p);
  if (homeOverride) {
    const i = pages.findIndex((p) => p.path === '/');
    pages[i] = homeOverride();
  }

  for (const { path, html } of pages) {
    // Keep navigation inside the current design version; shared assets stay at /assets.
    const doc = bust(prefix ? html.replace(/(href|action|data-go)="\/(?!assets\/)/g, `$1="${prefix}/`) : html);
    const file = path === '/404' ? join(out, prefix, '404.html') : join(out, prefix, path, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, doc);
  }
  if (id === 'v1') canonical = pages;
  total += pages.length;
  console.log(`${id.toUpperCase()} (${VERSIONS[id].label}): ${pages.length} pages → dist${prefix || '/'}`);
}

// Only V1 is indexable; V2/V3 are design proposals (noindex).
const urls = canonical.filter((p) => p.path !== '/404' && !p.noindex).map((p) => `  <url><loc>https://fsbo4u.com${p.path === '/' ? '/' : p.path.replace(/\/$/, '')}</loc></url>`);
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
// Proposal deployments stay out of search engines unless ALLOW_INDEXING=true is set (e.g. at the real fsbo4u.com go-live).
const indexable = process.env.ALLOW_INDEXING === 'true';
await writeFile(join(out, 'robots.txt'), indexable
  ? 'User-agent: *\nDisallow: /admin\nDisallow: /seller\nDisallow: /v2/\nDisallow: /v3/\nSitemap: https://fsbo4u.com/sitemap.xml\n'
  : '# Design proposal: not for indexing. Set ALLOW_INDEXING=true to publish.\nUser-agent: *\nDisallow: /\n');
console.log(`Built ${total} pages in total. Indexing: ${indexable ? 'allowed' : 'blocked (proposal mode)'}.`);
