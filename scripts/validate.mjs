import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const errors = [];
const warnings = [];

const genericPublicContentRules = [
  { pattern: /lorem ipsum/i, label: 'texto de relleno' },
  { pattern: /\bUSD\s?[\d.,]+/i, label: 'precio público' },
  { pattern: /\b(?:GHz|MHz|kHz)\b/i, label: 'frecuencia técnica' },
  { pattern: /\b(?:potencia|alcance|autonomía)\s*[:=]\s*\d+/i, label: 'especificación técnica cuantificada' }
];

const configuredRestrictedTerms = (process.env.EAGLE_RESTRICTED_TERMS || '')
  .split('|')
  .map((term) => term.trim())
  .filter(Boolean)
  .map((term) => ({
    pattern: new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    label: 'término restringido configurado'
  }));

const forbidden = [...genericPublicContentRules, ...configuredRestrictedTerms];

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function localRefs(html) {
  const refs = [];
  const pattern = /\b(?:href|src)=["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(html))) refs.push(match[1]);
  return refs;
}

function targetFor(htmlFile, ref) {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(ref)) return null;
  const absolute = path.resolve(path.dirname(htmlFile), clean);
  if (clean.endsWith('/')) return path.join(absolute, 'index.html');
  return absolute;
}

if (!await exists(dist)) {
  console.error('dist/ no existe. Ejecute npm run build antes de validar.');
  process.exit(1);
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const generatedPages = htmlFiles.filter((file) => path.basename(file) === 'index.html');

if (generatedPages.length !== 22) {
  errors.push(`Se esperaban 22 páginas index.html y se encontraron ${generatedPages.length}.`);
}

for (const file of htmlFiles) {
  const relative = path.relative(dist, file);
  const html = await readFile(file, 'utf8');

  if (!/^<!doctype html>/i.test(html.trimStart())) errors.push(`${relative}: falta doctype.`);
  if (!/<html\s+lang="(?:es|en)"/i.test(html)) errors.push(`${relative}: falta lang válido.`);
  if (!/<title>[^<]{10,}<\/title>/i.test(html)) errors.push(`${relative}: título ausente o demasiado corto.`);
  if (!/<meta\s+name="description"\s+content="[^"']{40,}/i.test(html)) errors.push(`${relative}: meta description ausente o demasiado corta.`);
  if (!/<main\s+id="main-content"/i.test(html) && relative !== '404.html') errors.push(`${relative}: falta main#main-content.`);
  if (/href=["']\//i.test(html) || /src=["']\//i.test(html)) errors.push(`${relative}: contiene rutas absolutas al origen; GitHub Pages requiere rutas relativas.`);
  if (/lorem ipsum/i.test(html)) errors.push(`${relative}: contiene texto de relleno.`);

  for (const rule of forbidden) {
    if (rule.pattern.test(html)) errors.push(`${relative}: contiene ${rule.label}.`);
  }

  for (const ref of localRefs(html)) {
    const target = targetFor(file, ref);
    if (!target) continue;
    if (!await exists(target)) errors.push(`${relative}: referencia local inexistente: ${ref}`);
  }
}

for (const required of [
  'assets/css/styles.css',
  'assets/js/main.js',
  'assets/js/site-config.js',
  'assets/icons/sprite.svg',
  'assets/images/eagle-wordmark.svg',
  'assets/images/hero-network.svg',
  'favicon.svg',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  '.nojekyll'
]) {
  const file = path.join(dist, required);
  if (!await exists(file)) errors.push(`Falta archivo requerido: ${required}`);
  else if (required !== '.nojekyll' && (await stat(file)).size === 0) errors.push(`Archivo vacío: ${required}`);
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8').catch(() => '');
const urlCount = (sitemap.match(/<url>/g) || []).length;
if (urlCount !== 20) warnings.push(`El sitemap contiene ${urlCount} URLs; se esperaban 20 (sin áreas autorizadas).`);

if (warnings.length) {
  console.warn('\nAdvertencias:');
  warnings.forEach((item) => console.warn(`- ${item}`));
}

if (errors.length) {
  console.error('\nValidación fallida:');
  errors.forEach((item) => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`Validación correcta: ${htmlFiles.length} archivos HTML, ${generatedPages.length} páginas bilingües y ${files.length} archivos totales.`);
