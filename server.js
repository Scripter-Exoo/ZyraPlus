import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };

createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? '/index.html' : normalize(pathname);
  if (file.includes('..')) return send(res, 400, 'Bad request');
  try {
    const body = await readFile(join(root, file));
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(body);
  } catch {
    send(res, 404, 'Not found');
  }
}).listen(process.env.PORT || 3000, () => console.log('ZyraPlus running on http://localhost:3000'));

function send(res, status, body) { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(body); }
