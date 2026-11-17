// Tiny static server for previewing ./dist with clean URLs: node serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const port = +process.argv[2] || 4173;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };

createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  let file = join(dist, p);
  if (!file.startsWith(dist)) { res.writeHead(403).end(); return; }
  try {
    const s = await stat(file);
    if (s.isDirectory()) file = join(file, 'index.html');
  } catch {
    try { await stat(join(file, 'index.html')); file = join(file, 'index.html'); }
    catch { res.writeHead(404, { 'content-type': types['.html'] }).end(await readFile(join(dist, '404.html')).catch(() => 'Not found')); return; }
  }
  try {
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }).end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
}).listen(port, () => console.log(`FSBO4u preview → http://localhost:${port}`));
