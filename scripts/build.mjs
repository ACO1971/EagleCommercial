import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  capabilities,
  copy,
  differentiators,
  groupCompanies,
  institutionalClients,
  processSteps,
  routes,
  sectors,
  showcaseSolutions,
  site,
  strategicRelationships,
  supportPillars
} from '../src/site-data.mjs';
import { pages } from '../src/page-copy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');
const year = new Date().getUTCFullYear();
const spriteSource = await readFile(path.join(publicDir, 'assets/icons/sprite.svg'), 'utf8');
const iconMap = new Map([...spriteSource.matchAll(/<symbol id=\"icon-([^\"]+)\" viewBox=\"([^\"]+)\">([\s\S]*?)<\/symbol>/g)]
  .map((match) => [match[1], { viewBox: match[2], markup: match[3] }]));

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function routeDepth(routePath) {
  return routePath.split('/').filter(Boolean).length;
}

function createContext(lang, routeKey) {
  const routePath = routes[lang][routeKey].path;
  const depth = routeDepth(routePath);
  return {
    lang,
    routeKey,
    routePath,
    prefix: depth === 0 ? './' : '../'.repeat(depth),
    t: copy[lang],
    p: pages[lang],
    locale: lang === 'es' ? 'es_CO' : 'en_US'
  };
}

function href(ctx, routeKey, lang = ctx.lang) {
  const target = routes[lang][routeKey].path;
  return `${ctx.prefix}${target}${target ? '/' : ''}`;
}

function asset(ctx, relativePath) {
  return `${ctx.prefix}${relativePath}`;
}

function canonicalPath(lang, routeKey) {
  const target = routes[lang][routeKey].path;
  return `${site.productionUrl}${target ? `/${target}/` : '/'}`;
}

function icon(ctx, name, className = 'icon') {
  const definition = iconMap.get(name);
  if (!definition) return '';
  return `<svg class="${esc(className)}" viewBox="${esc(definition.viewBox)}" aria-hidden="true" focusable="false">${definition.markup}</svg>`;
}

function renderHeader(ctx) {
  const navKeys = ['company', 'capabilities', 'sectors', 'engineering', 'support', 'group'];
  const companyAnchor = ctx.lang === 'es' ? 'compania' : 'company';
  const navHref = (key) => key === 'company' ? `${href(ctx, 'home')}#${companyAnchor}` : href(ctx, key);
  const navLinks = navKeys.map((key) => {
    const current = key === 'company'
      ? (ctx.routeKey === 'home' ? ' aria-current="location"' : '')
      : (ctx.routeKey === key ? ' aria-current="page"' : '');
    return `<a class="nav-link" href="${navHref(key)}"${current}>${esc(routes[ctx.lang][key].label)}</a>`;
  }).join('');

  const mobileLinks = [...navKeys, 'contact'].map((key) => {
    const current = key === 'company'
      ? (ctx.routeKey === 'home' ? ' aria-current="location"' : '')
      : (ctx.routeKey === key ? ' aria-current="page"' : '');
    return `<a class="mobile-nav-link" href="${navHref(key)}"${current}>${esc(routes[ctx.lang][key].label)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>`;
  }).join('');

  const alternate = ctx.lang === 'es' ? 'en' : 'es';
  const alternateHref = href(ctx, ctx.routeKey, alternate);

  return `
    <header class="site-header" data-site-header>
      <div class="nav-shell glass-panel">
        <a class="brand-link" href="${href(ctx, 'home')}" aria-label="${esc(site.name)}">
          <img src="${asset(ctx, 'assets/images/eagle-wordmark.svg')}" width="284" height="54" alt="${esc(site.name)}">
        </a>
        <nav class="desktop-nav" aria-label="${ctx.lang === 'es' ? 'Navegación principal' : 'Primary navigation'}">
          ${navLinks}
        </nav>
        <div class="nav-actions">
          <a class="language-link" href="${alternateHref}" lang="${alternate}" hreflang="${alternate}" aria-label="${ctx.lang === 'es' ? 'Ver versión en inglés' : 'View Spanish version'}">${esc(ctx.t.alternateLanguage)}</a>
          <a class="access-link" href="${href(ctx, 'access')}">${icon(ctx, 'lock', 'icon icon--xs')}<span>${esc(ctx.t.access)}</span></a>
          <a class="button button--small button--gold nav-contact" href="${href(ctx, 'contact')}">${esc(ctx.t.navCta)}</a>
          <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="${ctx.lang === 'es' ? 'Abrir menú' : 'Open menu'}">
            ${icon(ctx, 'menu', 'menu-icon menu-icon--open')}
            ${icon(ctx, 'close', 'menu-icon menu-icon--close')}
          </button>
        </div>
      </div>
      <div class="mobile-menu glass-panel" id="mobile-menu" data-mobile-menu hidden>
        <nav aria-label="${ctx.lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}">
          ${mobileLinks}
        </nav>
        <div class="mobile-menu-actions">
          <a class="button button--outline" href="${href(ctx, 'access')}">${esc(ctx.t.access)}</a>
          <a class="button button--gold" href="${href(ctx, 'contact')}">${esc(ctx.t.navCta)}</a>
        </div>
      </div>
    </header>`;
}

function renderFooter(ctx) {
  const capabilityLinks = capabilities.slice(0, 5).map((item) => `<li><a href="${href(ctx, 'capabilities')}#${item.id}">${esc(item[ctx.lang].title)}</a></li>`).join('');
  return `
    <footer class="site-footer">
      <div class="footer-grid shell">
        <div class="footer-brand">
          <img src="${asset(ctx, 'assets/images/eagle-wordmark.svg')}" width="284" height="54" alt="${esc(site.name)}">
          <p>${esc(ctx.t.footerStatement)}</p>
          <a class="footer-email" href="mailto:${esc(site.email)}">${icon(ctx, 'mail', 'icon icon--sm')}${esc(site.email)}</a>
        </div>
        <div>
          <h2>${ctx.lang === 'es' ? 'Navegación' : 'Navigation'}</h2>
          <ul class="footer-links">
            <li><a href="${href(ctx, 'home')}#${ctx.lang === 'es' ? 'compania' : 'company'}">${esc(routes[ctx.lang].company.label)}</a></li>
            <li><a href="${href(ctx, 'engineering')}">${esc(routes[ctx.lang].engineering.label)}</a></li>
            <li><a href="${href(ctx, 'support')}">${esc(routes[ctx.lang].support.label)}</a></li>
            <li><a href="${href(ctx, 'group')}">${esc(routes[ctx.lang].group.label)}</a></li>
            <li><a href="${href(ctx, 'contact')}">${esc(routes[ctx.lang].contact.label)}</a></li>
          </ul>
        </div>
        <div>
          <h2>${ctx.lang === 'es' ? 'Capacidades' : 'Capabilities'}</h2>
          <ul class="footer-links">${capabilityLinks}</ul>
        </div>
        <div>
          <h2>${ctx.lang === 'es' ? 'Contacto' : 'Contact'}</h2>
          <address class="footer-address">
            <span>${esc(site.city)}</span>
            <span>${esc(site.address)}</span>
            <a href="tel:+576171933">${esc(site.phone)}</a>
            <span>${esc(site.hours)}</span>
          </address>
        </div>
      </div>
      <div class="footer-bottom shell">
        <p>© ${year} ${esc(site.name)} ${esc(ctx.t.copyright)}</p>
        <div class="footer-legal">
          <a href="${href(ctx, 'privacy')}">${esc(routes[ctx.lang].privacy.label)}</a>
          <a href="${href(ctx, 'data')}">${esc(routes[ctx.lang].data.label)}</a>
          <a href="${href(ctx, 'access')}">${esc(routes[ctx.lang].access.label)}</a>
        </div>
      </div>
    </footer>`;
}

function renderSectionHeading(eyebrow, title, lead = '', align = 'left') {
  return `<div class="section-heading section-heading--${align}" data-reveal>
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h2>${esc(title)}</h2>
    ${lead ? `<p class="section-lead">${esc(lead)}</p>` : ''}
  </div>`;
}

function renderCapabilityCard(ctx, item, detailed = false) {
  const content = item[ctx.lang];
  return `<article class="capability-card" id="${esc(item.id)}" data-reveal>
    <div class="capability-card__top">
      <span class="icon-orb">${icon(ctx, item.icon)}</span>
      <span class="capability-index">${String(capabilities.indexOf(item) + 1).padStart(2, '0')}</span>
    </div>
    <h3>${esc(content.title)}</h3>
    <p>${esc(content.description)}</p>
    ${detailed ? `<div class="capability-detail"><strong>${ctx.lang === 'es' ? 'Valor general' : 'General value'}</strong><p>${esc(content.problem)}</p></div>
    <ul class="tag-list">${content.applications.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>` : ''}
    <a class="text-link" href="${href(ctx, 'contact')}?capability=${encodeURIComponent(item.id)}">${esc(ctx.t.explore)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>
  </article>`;
}

function renderShowcaseCard(ctx, item, featured = false) {
  const content = item[ctx.lang];
  return `<article class="showcase-card${featured ? ' showcase-card--featured' : ''}" data-reveal>
    <div class="showcase-card__media">
      <img src="${asset(ctx, `assets/images/${item.image}`)}" alt="${esc(content.title)}" width="960" height="720" loading="lazy" decoding="async">
      <div class="showcase-card__eyebrow">${esc(content.eyebrow)}</div>
    </div>
    <div class="showcase-card__body">
      <h3>${esc(content.title)}</h3>
      <p>${esc(content.description)}</p>
      <ul class="showcase-highlights">${content.highlights.map((tag) => `<li>${esc(tag)}</li>`).join('')}</ul>
      <a class="text-link" href="${href(ctx, 'capabilities')}#${esc(item.capability)}">${esc(ctx.t.learnMore)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>
    </div>
  </article>`;
}

function renderPartnerCard(ctx, item) {
  const content = item[ctx.lang];
  return `<article class="partner-card" data-reveal>
    <div class="partner-card__head">
      <span class="partner-card__dot"></span>
      <h3>${esc(content.title)}</h3>
    </div>
    <p>${esc(content.description)}</p>
  </article>`;
}

function renderClientLogo(ctx, item) {
  return `<div class="client-logo-card">
    <img src="${asset(ctx, `assets/images/${item.logo}`)}" alt="${esc(item.name)}" width="420" height="260" loading="lazy" decoding="async">
  </div>`;
}

function renderSectorCard(ctx, item, compact = false) {
  const content = item[ctx.lang];
  return `<article class="sector-card${compact ? ' sector-card--compact' : ''}" data-reveal>
    <img src="${asset(ctx, `assets/images/${item.visual}`)}" alt="" width="720" height="480" loading="lazy" decoding="async">
    <div class="sector-card__overlay"></div>
    <div class="sector-card__content">
      <span class="icon-orb icon-orb--dark">${icon(ctx, item.icon)}</span>
      <h3>${esc(content.title)}</h3>
      <p>${esc(content.description)}</p>
    </div>
  </article>`;
}

function renderProcess(ctx, numbered = true) {
  return `<ol class="process-grid${numbered ? '' : ' process-grid--plain'}">
    ${processSteps.map((step, index) => `<li class="process-card" data-reveal>
      <div class="process-card__head">
        <span class="icon-orb">${icon(ctx, step.icon)}</span>
        ${numbered ? `<span class="process-number">${String(index + 1).padStart(2, '0')}</span>` : ''}
      </div>
      <h3>${esc(step[ctx.lang].title)}</h3>
      <p>${esc(step[ctx.lang].description)}</p>
    </li>`).join('')}
  </ol>`;
}

function renderCta(ctx, title, text, primaryLabel = ctx.t.navCta, secondary = true) {
  return `<section class="final-cta section section--dark">
    <div class="shell final-cta__inner" data-reveal>
      <div>
        <p class="eyebrow">Eagle Commercial</p>
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
      </div>
      <div class="button-row">
        <a class="button button--gold" href="${href(ctx, 'contact')}">${esc(primaryLabel)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>
        ${secondary ? `<a class="button button--ghost" href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}
      </div>
    </div>
  </section>`;
}

function renderPageHero(ctx, eyebrow, title, lead, visual = 'visual-command.svg', options = {}) {
  const { compact = false, note = '' } = options;
  return `<section class="page-hero${compact ? ' page-hero--compact' : ''}">
    <div class="page-hero__glow" aria-hidden="true"></div>
    <div class="shell page-hero__grid">
      <div class="page-hero__copy" data-reveal>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p class="page-hero__lead">${esc(lead)}</p>
        ${note ? `<div class="notice notice--inline">${icon(ctx, 'shield', 'icon icon--sm')}<p>${esc(note)}</p></div>` : ''}
      </div>
      <div class="page-hero__visual" data-reveal>
        <div class="visual-frame glass-panel">
          <img src="${asset(ctx, `assets/images/${visual}`)}" alt="" width="900" height="650" decoding="async">
          <div class="visual-frame__label"><span></span>${ctx.lang === 'es' ? 'Arquitectura conceptual' : 'Conceptual architecture'}</div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderHome(ctx) {
  const p = ctx.p.home;
  const featured = ['situational-awareness', 'critical-communications', 'signal-analysis', 'uncrewed-protection', 'autonomous-platforms', 'custom-engineering']
    .map((id) => capabilities.find((item) => item.id === id));
  return `
    <main id="main-content">
      <section class="hero">
        <div class="hero__noise" aria-hidden="true"></div>
        <div class="hero__glow hero__glow--one" aria-hidden="true"></div>
        <div class="hero__glow hero__glow--two" aria-hidden="true"></div>
        <div class="shell hero__grid">
          <div class="hero__copy" data-reveal>
            <div class="status-pill"><span class="status-dot"></span>${esc(p.eyebrow)}</div>
            <h1>${esc(p.title)}</h1>
            <p class="hero__lead">${esc(p.lead)}</p>
            <div class="button-row">
              <a class="button button--gold" href="${href(ctx, 'capabilities')}">${esc(p.primary)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>
              <a class="button button--glass" href="${href(ctx, 'contact')}">${esc(p.secondary)}</a>
            </div>
            <ul class="hero-notes">
              ${p.heroNotes.map((note) => `<li>${icon(ctx, 'check', 'icon icon--xs')}${esc(note)}</li>`).join('')}
            </ul>
          </div>
          <div class="hero__visual" data-hero-visual data-reveal>
            <img src="${asset(ctx, 'assets/images/hero-network.svg')}" alt="" width="1000" height="820" decoding="async">
            <div class="hero-data hero-data--one glass-panel"><span>01</span>${ctx.lang === 'es' ? 'Detección' : 'Detection'}</div>
            <div class="hero-data hero-data--two glass-panel"><span>02</span>${ctx.lang === 'es' ? 'Conectividad' : 'Connectivity'}</div>
            <div class="hero-data hero-data--three glass-panel"><span>03</span>${ctx.lang === 'es' ? 'Decisión' : 'Decision'}</div>
          </div>
        </div>
        <div class="hero-scroll" aria-hidden="true"><span></span>${ctx.lang === 'es' ? 'Explorar' : 'Explore'}</div>
      </section>

      <section class="mission-strip">
        <div class="shell mission-strip__inner" data-reveal>
          <p>${esc(p.principle)}</p>
          <ul>${p.principleItems.map((item) => `<li><span></span>${esc(item)}</li>`).join('')}</ul>
        </div>
      </section>

      <section id="${ctx.lang === 'es' ? 'compania' : 'company'}" class="section section--light company-intro-section">
        <div class="shell intro-grid">
          <div>${renderSectionHeading(p.introEyebrow, p.introTitle)}</div>
          <div class="intro-copy" data-reveal><p>${esc(p.introText)}</p><p>${esc(p.introText2)}</p><a class="text-link text-link--dark" href="${href(ctx, 'capabilities')}">${ctx.lang === 'es' ? 'Explorar capacidades' : 'Explore capabilities'}${icon(ctx, 'arrow', 'icon icon--xs')}</a></div>
        </div>
      </section>

      <section class="section section--dark showcase-section">
        <div class="shell">
          ${renderSectionHeading(p.showcaseEyebrow, p.showcaseTitle, p.showcaseLead)}
          <div class="showcase-grid">
            ${showcaseSolutions.map((item, index) => renderShowcaseCard(ctx, item, index < 2)).join('')}
          </div>
          <div class="partner-panel">
            <div class="partner-panel__copy">
              <p class="eyebrow">${esc(p.partnerEyebrow)}</p>
              <h2>${esc(p.partnerTitle)}</h2>
              <p>${esc(p.partnerLead)}</p>
            </div>
            <div class="partner-grid">
              ${strategicRelationships.map((item) => renderPartnerCard(ctx, item)).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section section--light client-marquee-section">
        <div class="shell">
          ${renderSectionHeading(p.clientsEyebrow, p.clientsTitle, p.clientsLead)}
          <div class="client-marquee" data-reveal>
            <div class="client-marquee__track">
              ${institutionalClients.map((item) => renderClientLogo(ctx, item)).join('')}
              ${institutionalClients.map((item) => renderClientLogo(ctx, item)).join('')}
            </div>
          </div>
          <p class="section-note" data-reveal>${esc(p.clientsNote)}</p>
        </div>
      </section>

      <section class="section section--soft">
        <div class="shell">
          ${renderSectionHeading(p.capabilityEyebrow, p.capabilityTitle, p.capabilityLead)}
          <div class="capability-grid capability-grid--featured">
            ${featured.map((item) => renderCapabilityCard(ctx, item)).join('')}
          </div>
          <div class="section-action" data-reveal><a class="button button--outline-dark" href="${href(ctx, 'capabilities')}">${esc(ctx.t.viewAll)}${icon(ctx, 'arrow', 'icon icon--xs')}</a></div>
        </div>
      </section>

      <section class="section section--dark sectors-section">
        <div class="shell">
          ${renderSectionHeading(p.sectorsEyebrow, p.sectorsTitle, p.sectorsLead)}
          <div class="sector-grid">
            ${sectors.slice(0, 4).map((item) => renderSectorCard(ctx, item, true)).join('')}
          </div>
          <div class="section-action" data-reveal><a class="button button--ghost" href="${href(ctx, 'sectors')}">${ctx.lang === 'es' ? 'Ver todos los sectores' : 'View all sectors'}${icon(ctx, 'arrow', 'icon icon--xs')}</a></div>
        </div>
      </section>

      <section class="section section--light">
        <div class="shell">
          ${renderSectionHeading(p.processEyebrow, p.processTitle, p.processLead)}
          ${renderProcess(ctx)}
        </div>
      </section>

      <section class="section section--soft">
        <div class="shell">
          ${renderSectionHeading(p.diffEyebrow, p.diffTitle)}
          <div class="differentiator-grid">
            ${differentiators.map((item) => `<article class="differentiator" data-reveal><span class="icon-orb">${icon(ctx, item.icon)}</span><h3>${esc(item[ctx.lang].title)}</h3><p>${esc(item[ctx.lang].description)}</p></article>`).join('')}
          </div>
        </div>
      </section>

      <section class="section confidentiality-section">
        <div class="shell confidentiality-grid">
          <div class="confidentiality-visual" data-reveal><img src="${asset(ctx, 'assets/images/visual-signals.svg')}" alt="" width="900" height="650" loading="lazy"><div class="security-badge glass-panel">${icon(ctx, 'lock')}<span>${ctx.lang === 'es' ? 'Acceso por autorización' : 'Authorized access only'}</span></div></div>
          <div class="confidentiality-copy" data-reveal><p class="eyebrow">${esc(p.confidentialityEyebrow)}</p><h2>${esc(p.confidentialityTitle)}</h2><p>${esc(p.confidentialityText)}</p><div class="button-row"><a class="button button--gold" href="${href(ctx, 'access')}">${esc(ctx.t.requestInfo)}</a><a class="button button--ghost" href="${href(ctx, 'contact')}">${esc(ctx.t.contactSpecialist)}</a></div></div>
        </div>
      </section>

      <section class="section section--light">
        <div class="shell group-preview">
          <div class="group-preview__copy">${renderSectionHeading(p.groupEyebrow, p.groupTitle, p.groupText)}<a class="text-link text-link--dark" href="${href(ctx, 'group')}">${esc(ctx.t.learnMore)}${icon(ctx, 'arrow', 'icon icon--xs')}</a></div>
          <div class="group-stack" data-reveal>
            ${groupCompanies.map((company, index) => `<div class="group-stack__item"><span class="group-stack__number">0${index + 1}</span><span class="icon-orb">${icon(ctx, company.icon)}</span><div><strong>${esc(company[ctx.lang].title)}</strong><span>${esc(company[ctx.lang].eyebrow)}</span></div></div>`).join('')}
          </div>
        </div>
      </section>

      ${renderCta(ctx, p.finalTitle, p.finalText)}
    </main>`;
}

function renderCompany(ctx) {
  const p = ctx.p.company;
  const anchor = ctx.lang === 'es' ? 'compania' : 'company';
  const target = `${href(ctx, 'home')}#${anchor}`;
  const message = ctx.lang === 'es'
    ? 'La información corporativa ahora está integrada en la página de Inicio.'
    : 'Company information is now integrated into the Home page.';
  const button = ctx.lang === 'es' ? 'Ver información de la compañía' : 'View company information';
  return `<main id="main-content">
    <section class="page-hero page-hero--compact company-redirect">
      <div class="page-hero__glow" aria-hidden="true"></div>
      <div class="shell centered-copy" data-reveal>
        <p class="eyebrow">${esc(p.eyebrow)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="page-hero__lead">${esc(message)}</p>
        <a class="button button--gold" href="${target}">${esc(button)}${icon(ctx, 'arrow', 'icon icon--xs')}</a>
      </div>
    </section>
    <script>window.location.replace(${JSON.stringify(target)});</script>
    <noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
  </main>`;
}

function renderCapabilities(ctx) {
  const p = ctx.p.capabilities;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-signals.svg', { note: ctx.t.sensitiveWarning })}
    <section class="section section--soft"><div class="shell"><div class="capability-grid capability-grid--all">${capabilities.map((item) => renderCapabilityCard(ctx, item, true)).join('')}</div></div></section>
    <section class="section section--dark"><div class="shell info-banner" data-reveal><span class="icon-orb">${icon(ctx, 'lock')}</span><div><p class="eyebrow">${ctx.lang === 'es' ? 'Alcance público' : 'Public scope'}</p><h2>${esc(p.noteTitle)}</h2><p>${esc(p.noteText)}</p></div><a class="button button--gold" href="${href(ctx, 'access')}">${ctx.lang === 'es' ? 'Solicitar acceso' : 'Request access'}</a></div></section>
    <section class="section section--light"><div class="shell"><div class="split-layout"><div>${renderSectionHeading(ctx.lang === 'es' ? 'Consulta' : 'Enquiry', p.processTitle)}</div><ol class="simple-steps">${p.process.map((step, index) => `<li data-reveal><span>0${index + 1}</span><p>${esc(step)}</p></li>`).join('')}</ol></div></div></section>
    ${renderCta(ctx, p.finalTitle, p.finalText)}
  </main>`;
}

function renderSectors(ctx) {
  const p = ctx.p.sectors;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-infrastructure.svg')}
    <section class="section section--dark"><div class="shell"><div class="sector-grid sector-grid--all">${sectors.map((item) => renderSectorCard(ctx, item)).join('')}</div></div></section>
    <section class="section section--light"><div class="shell split-layout"><div class="image-panel" data-reveal><img src="${asset(ctx, 'assets/images/visual-autonomy.svg')}" alt="" width="900" height="650" loading="lazy"></div><div data-reveal><p class="eyebrow">${ctx.lang === 'es' ? 'Adaptación' : 'Adaptation'}</p><h2>${esc(p.crossTitle)}</h2><p class="large-copy">${esc(p.crossText)}</p><a class="text-link text-link--dark" href="${href(ctx, 'engineering')}">${ctx.lang === 'es' ? 'Conocer la metodología' : 'See the methodology'}${icon(ctx, 'arrow', 'icon icon--xs')}</a></div></div></section>
    ${renderCta(ctx, p.finalTitle, p.finalText)}
  </main>`;
}

function renderEngineering(ctx) {
  const p = ctx.p.engineering;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-command.svg')}
    <section class="section section--light"><div class="shell">${renderSectionHeading(ctx.lang === 'es' ? 'Proceso' : 'Process', ctx.lang === 'es' ? 'Seis etapas, una sola lógica de proyecto.' : 'Six stages, one project logic.')} ${renderProcess(ctx)}</div></section>
    <section class="section section--dark"><div class="shell"><div class="split-layout"><div data-reveal><p class="eyebrow">${ctx.lang === 'es' ? 'Arquitectura' : 'Architecture'}</p><h2>${esc(p.architectureTitle)}</h2><img class="inline-visual" src="${asset(ctx, 'assets/images/visual-signals.svg')}" alt="" width="900" height="650" loading="lazy"></div><div class="architecture-grid">${p.architectureItems.map((item, index) => `<article data-reveal><span>0${index + 1}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div></div></div></section>
    <section class="section section--soft"><div class="shell split-layout"><div>${renderSectionHeading(ctx.lang === 'es' ? 'Trazabilidad' : 'Traceability', p.evidenceTitle)}</div><ul class="check-list">${p.evidenceItems.map((item) => `<li data-reveal>${icon(ctx, 'check', 'icon icon--sm')}<span>${esc(item)}</span></li>`).join('')}</ul></div></section>
    ${renderCta(ctx, p.finalTitle, p.finalText)}
  </main>`;
}

function renderSupport(ctx) {
  const p = ctx.p.support;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-logistics.svg')}
    <section class="section section--soft"><div class="shell"><div class="support-grid">${supportPillars.map((item) => `<article class="support-card" data-reveal><span class="icon-orb">${icon(ctx, item.icon)}</span><h3>${esc(item[ctx.lang].title)}</h3><p>${esc(item[ctx.lang].description)}</p></article>`).join('')}</div></div></section>
    <section class="section section--dark"><div class="shell split-layout"><div data-reveal><p class="eyebrow">${ctx.lang === 'es' ? 'Modelo de soporte' : 'Support model'}</p><h2>${esc(p.modelTitle)}</h2><p class="large-copy">${esc(p.modelText)}</p></div><div class="continuity-panel glass-panel" data-reveal><h3>${esc(p.continuityTitle)}</h3><ul>${p.continuityItems.map((item) => `<li>${icon(ctx, 'check', 'icon icon--sm')}<span>${esc(item)}</span></li>`).join('')}</ul></div></div></section>
    ${renderCta(ctx, p.finalTitle, p.finalText)}
  </main>`;
}

function renderGroup(ctx) {
  const p = ctx.p.group;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-logistics.svg')}
    <section class="section section--light"><div class="shell"><div class="group-company-grid">${groupCompanies.map((company, index) => `<article class="group-company-card" data-reveal><div class="group-company-card__head"><span class="icon-orb">${icon(ctx, company.icon)}</span><span>0${index + 1}</span></div><p class="eyebrow">${esc(company[ctx.lang].eyebrow)}</p><h2>${esc(company[ctx.lang].title)}</h2><p>${esc(company[ctx.lang].description)}</p></article>`).join('')}</div></div></section>
    <section class="section section--dark"><div class="shell"><div class="split-layout"><div>${renderSectionHeading(ctx.lang === 'es' ? 'Flujo' : 'Flow', p.flowTitle)}</div><ol class="flow-list">${p.flowSteps.map((step, index) => `<li data-reveal><span>0${index + 1}</span><p>${esc(step)}</p>${index < p.flowSteps.length - 1 ? icon(ctx, 'chevron', 'icon icon--sm') : ''}</li>`).join('')}</ol></div></div></section>
    <section class="section section--soft"><div class="shell centered-copy" data-reveal><p class="eyebrow">${ctx.lang === 'es' ? 'Gobierno corporativo' : 'Corporate governance'}</p><h2>${esc(p.governanceTitle)}</h2><p>${esc(p.governanceText)}</p></div></section>
    ${renderCta(ctx, p.finalTitle, p.finalText)}
  </main>`;
}

function inputField({ id, label, type = 'text', required = false, autocomplete = '', placeholder = '' }) {
  return `<div class="field"><label for="${esc(id)}">${esc(label)}${required ? ' <span aria-hidden="true">*</span>' : ''}</label><input id="${esc(id)}" name="${esc(id)}" type="${esc(type)}"${required ? ' required' : ''}${autocomplete ? ` autocomplete="${esc(autocomplete)}"` : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}></div>`;
}

function renderContact(ctx) {
  const p = ctx.p.contact;
  const sectorOptions = sectors.map((item) => `<option value="${esc(item.id)}">${esc(item[ctx.lang].title)}</option>`).join('');
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-signals.svg', { compact: true, note: ctx.t.sensitiveWarning })}
    <section class="section section--light"><div class="shell contact-layout">
      <aside class="contact-details" data-reveal><p class="eyebrow">Eagle Commercial S.A.</p><h2>${esc(p.detailsTitle)}</h2><div class="contact-detail">${icon(ctx, 'mail')}<div><span>Email</span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></div></div><div class="contact-detail">${icon(ctx, 'phone')}<div><span>PBX</span><a href="tel:+576171933">${esc(site.phone)}</a></div></div><div class="contact-detail">${icon(ctx, 'map')}<div><span>${ctx.lang === 'es' ? 'Sede' : 'Office'}</span><p>${esc(site.address)}<br>${esc(site.city)}</p></div></div><div class="contact-detail">${icon(ctx, 'clock')}<div><span>${ctx.lang === 'es' ? 'Horario' : 'Hours'}</span><p>${esc(site.hours)}</p></div></div><div class="notice notice--warning">${icon(ctx, 'shield', 'icon icon--sm')}<p>${esc(ctx.t.sensitiveWarning)}</p></div></aside>
      <div class="form-panel" data-reveal><p class="eyebrow">${ctx.lang === 'es' ? 'Formulario' : 'Form'}</p><h2>${esc(p.formTitle)}</h2><p>${esc(p.formIntro)}</p><form class="contact-form" data-contact-form novalidate>
        <div class="form-grid">${inputField({ id: 'name', label: ctx.lang === 'es' ? 'Nombre completo' : 'Full name', required: true, autocomplete: 'name' })}${inputField({ id: 'position', label: ctx.lang === 'es' ? 'Cargo' : 'Position', required: true, autocomplete: 'organization-title' })}${inputField({ id: 'organization', label: ctx.lang === 'es' ? 'Organización' : 'Organization', required: true, autocomplete: 'organization' })}<div class="field"><label for="sector">${ctx.lang === 'es' ? 'Sector' : 'Sector'} <span aria-hidden="true">*</span></label><select id="sector" name="sector" required><option value="">${ctx.lang === 'es' ? 'Seleccione' : 'Select'}</option>${sectorOptions}</select></div>${inputField({ id: 'email', label: ctx.lang === 'es' ? 'Correo corporativo' : 'Business email', type: 'email', required: true, autocomplete: 'email' })}${inputField({ id: 'phone', label: ctx.lang === 'es' ? 'Teléfono' : 'Phone', type: 'tel', autocomplete: 'tel' })}${inputField({ id: 'city', label: ctx.lang === 'es' ? 'Ciudad y país' : 'City and country', required: true, autocomplete: 'address-level2' })}<div class="field"><label for="requestType">${ctx.lang === 'es' ? 'Tipo de requerimiento' : 'Request type'} <span aria-hidden="true">*</span></label><select id="requestType" name="requestType" required><option value="">${ctx.lang === 'es' ? 'Seleccione' : 'Select'}</option>${p.types.map((item) => `<option>${esc(item)}</option>`).join('')}</select></div><div class="field field--full"><label for="urgency">${ctx.lang === 'es' ? 'Horizonte de tiempo' : 'Time horizon'} <span aria-hidden="true">*</span></label><select id="urgency" name="urgency" required><option value="">${ctx.lang === 'es' ? 'Seleccione' : 'Select'}</option>${p.urgency.map((item) => `<option>${esc(item)}</option>`).join('')}</select></div><div class="field field--full"><label for="message">${ctx.lang === 'es' ? 'Descripción general' : 'General description'} <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="6" maxlength="1800" required placeholder="${ctx.lang === 'es' ? 'Describa el resultado esperado sin incluir datos sensibles.' : 'Describe the expected outcome without sensitive information.'}"></textarea><small><span data-char-count>0</span>/1800</small></div><div class="field honeypot" aria-hidden="true"><label for="website">Website</label><input id="website" name="website" tabindex="-1" autocomplete="off"></div></div>
        <label class="checkbox"><input type="checkbox" name="privacyConsent" required><span>${esc(p.privacyText)}</span></label>
        <button class="button button--gold" type="submit">${esc(p.submit)}${icon(ctx, 'arrow', 'icon icon--xs')}</button><div class="form-status" role="status" aria-live="polite" data-form-status></div>
      </form></div>
    </div></section>
  </main>`;
}

function renderAccess(ctx) {
  const p = ctx.p.access;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-command.svg', { compact: true, note: ctx.t.demoNotice })}
    <section class="section section--dark"><div class="shell access-layout">
      <div class="access-card glass-panel" data-reveal><div class="access-card__icon">${icon(ctx, 'key')}</div><h2>${esc(p.loginTitle)}</h2><form data-demo-form><div class="field field--dark"><label for="login-email">Email</label><input id="login-email" name="email" type="email" autocomplete="username" required></div><div class="field field--dark"><label for="login-password">${ctx.lang === 'es' ? 'Contraseña' : 'Password'}</label><input id="login-password" name="password" type="password" autocomplete="current-password" required></div><button class="button button--gold" type="submit">${esc(p.loginButton)}</button><p class="form-status" role="status" data-form-status></p></form></div>
      <div class="access-card glass-panel" data-reveal><div class="access-card__icon">${icon(ctx, 'user')}</div><h2>${esc(p.requestTitle)}</h2><form data-demo-form><div class="form-grid">${inputField({ id: 'access-name', label: ctx.lang === 'es' ? 'Nombre' : 'Name', required: true })}${inputField({ id: 'access-role', label: ctx.lang === 'es' ? 'Cargo' : 'Position', required: true })}${inputField({ id: 'access-organization', label: ctx.lang === 'es' ? 'Entidad u organización' : 'Organization', required: true })}${inputField({ id: 'access-email', label: ctx.lang === 'es' ? 'Correo corporativo' : 'Business email', type: 'email', required: true })}<div class="field field--full"><label for="access-reason">${ctx.lang === 'es' ? 'Motivo de solicitud' : 'Reason for request'}</label><textarea id="access-reason" rows="4" required></textarea></div></div><button class="button button--outline" type="submit">${esc(p.requestButton)}</button><p class="form-status" role="status" data-form-status></p></form></div>
    </div></section>
    <section class="section section--light"><div class="shell split-layout"><div>${renderSectionHeading(ctx.lang === 'es' ? 'Seguridad' : 'Security', p.rulesTitle)}</div><ul class="check-list">${p.rules.map((item) => `<li data-reveal>${icon(ctx, 'check', 'icon icon--sm')}<span>${esc(item)}</span></li>`).join('')}</ul></div></section>
  </main>`;
}

function renderPrivacy(ctx) {
  const p = ctx.p.privacy;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-signals.svg', { compact: true })}
    <section class="legal-banner"><div class="shell">${icon(ctx, 'document', 'icon icon--sm')}<strong>${esc(ctx.t.legalDraft)}</strong></div></section>
    <section class="section section--light"><div class="shell legal-content">${p.sections.map((section) => `<section data-reveal><h2>${esc(section.title)}</h2><p>${esc(section.text)}</p></section>`).join('')}</div></section>
  </main>`;
}

function renderData(ctx) {
  const p = ctx.p.data;
  return `<main id="main-content">
    ${renderPageHero(ctx, p.eyebrow, p.title, p.lead, 'visual-command.svg', { compact: true })}
    <section class="legal-banner"><div class="shell">${icon(ctx, 'document', 'icon icon--sm')}<strong>${esc(ctx.t.legalDraft)}</strong></div></section>
    <section class="section section--light"><article class="shell legal-content"><section data-reveal><h2>${ctx.lang === 'es' ? 'Responsable' : 'Controller'}</h2><p>${esc(p.intro)}</p></section><section data-reveal><h2>${esc(p.purposesTitle)}</h2><ul>${p.purposes.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section data-reveal><h2>${esc(p.rightsTitle)}</h2><ul>${p.rights.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></section><section data-reveal><h2>${esc(p.channelTitle)}</h2><p>${esc(p.channelText)}</p><a class="text-link text-link--dark" href="mailto:${esc(site.email)}">${esc(site.email)}${icon(ctx, 'arrow', 'icon icon--xs')}</a></section></article></section>
  </main>`;
}

function renderBody(ctx) {
  const renderers = {
    home: renderHome,
    company: renderCompany,
    capabilities: renderCapabilities,
    sectors: renderSectors,
    engineering: renderEngineering,
    support: renderSupport,
    group: renderGroup,
    contact: renderContact,
    access: renderAccess,
    privacy: renderPrivacy,
    data: renderData
  };
  return renderers[ctx.routeKey](ctx);
}

function renderLayout(ctx, body) {
  const meta = ctx.t.seo[ctx.routeKey];
  const currentUrl = canonicalPath(ctx.lang, ctx.routeKey);
  const alternateLang = ctx.lang === 'es' ? 'en' : 'es';
  const alternateUrl = canonicalPath(alternateLang, ctx.routeKey);
  const robots = ctx.routeKey === 'access' ? 'noindex, nofollow' : ctx.routeKey === 'company' ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.productionUrl,
    email: site.email,
    areaServed: 'Colombia',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bogotá D.C.',
      addressCountry: 'CO'
    }
  };
  return `<!doctype html>
<html lang="${ctx.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="${esc(site.themeColor)}">
  <meta name="color-scheme" content="dark light">
  <link rel="canonical" href="${currentUrl}">
  <link rel="alternate" hreflang="${ctx.lang}" href="${currentUrl}">
  <link rel="alternate" hreflang="${alternateLang}" href="${alternateUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalPath('es', ctx.routeKey)}">
  <link rel="icon" href="${asset(ctx, 'favicon.svg')}" type="image/svg+xml">
  <link rel="manifest" href="${asset(ctx, 'manifest.webmanifest')}">
  <link rel="stylesheet" href="${asset(ctx, 'assets/css/styles.css')}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${ctx.locale}">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${currentUrl}">
  <meta property="og:image" content="${site.productionUrl}/assets/images/og-image.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.title)}">
  <meta name="twitter:description" content="${esc(meta.description)}">
  <meta name="twitter:image" content="${site.productionUrl}/assets/images/og-image.svg">
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body data-language="${ctx.lang}" data-route="${ctx.routeKey}">
  <a class="skip-link" href="#main-content">${esc(ctx.t.skip)}</a>
  ${renderHeader(ctx)}
  ${body}
  ${renderFooter(ctx)}
  <div class="cookie-banner glass-panel" data-cookie-banner hidden>
    <p>${esc(ctx.t.cookieText)}</p>
    <div><button class="button button--small button--gold" type="button" data-cookie-accept>${esc(ctx.t.cookieAccept)}</button><button class="button button--small button--ghost" type="button" data-cookie-reject>${esc(ctx.t.cookieReject)}</button></div>
  </div>
  <button class="back-to-top glass-panel" type="button" data-back-to-top aria-label="${ctx.lang === 'es' ? 'Volver arriba' : 'Back to top'}">${icon(ctx, 'chevron')}</button>
  <script src="${asset(ctx, 'assets/js/site-config.js')}" defer></script>
  <script src="${asset(ctx, 'assets/js/main.js')}" defer></script>
</body>
</html>`;
}

function render404() {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta name="description" content="La página solicitada no existe o cambió de ubicación en el sitio de Eagle Commercial."><title>Página no encontrada | Eagle Commercial</title><style>html{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080d15;color:#f7f8fa;font-family:Inter,system-ui,sans-serif;padding:2rem}.card{width:min(680px,100%);padding:clamp(2rem,7vw,5rem);border:1px solid rgba(255,255,255,.12);border-radius:32px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.02));box-shadow:0 30px 90px rgba(0,0,0,.35)}span{color:#c7a56a;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase}h1{font-size:clamp(2.6rem,8vw,5.5rem);line-height:.95;margin:1rem 0}p{color:#aeb7c4;font-size:1.1rem;line-height:1.7}a{display:inline-flex;margin-top:1.5rem;color:#0b1018;background:#d0ae70;padding:.9rem 1.2rem;border-radius:999px;text-decoration:none;font-weight:700}</style></head><body><main class="card"><span>Error 404</span><h1>Página no encontrada.</h1><p>El contenido solicitado no existe o cambió de ubicación.</p><a href="./">Volver al inicio</a></main></body></html>`;
}

function renderSitemap() {
  const excluded = new Set(['access', 'company']);
  const urls = [];
  for (const lang of ['es', 'en']) {
    for (const routeKey of Object.keys(routes[lang])) {
      if (excluded.has(routeKey)) continue;
      urls.push(`  <url><loc>${canonicalPath(lang, routeKey)}</loc><changefreq>monthly</changefreq><priority>${routeKey === 'home' ? '1.0' : '0.7'}</priority></url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

async function writeRoute(ctx, html) {
  const targetDir = ctx.routePath ? path.join(outDir, ...ctx.routePath.split('/')) : outDir;
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
}

async function build() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(publicDir, outDir, { recursive: true });

  for (const lang of ['es', 'en']) {
    for (const routeKey of Object.keys(routes[lang])) {
      const ctx = createContext(lang, routeKey);
      const body = renderBody(ctx);
      await writeRoute(ctx, renderLayout(ctx, body));
    }
  }

  await writeFile(path.join(outDir, '404.html'), render404(), 'utf8');
  await writeFile(path.join(outDir, 'sitemap.xml'), renderSitemap(), 'utf8');
  await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /acceso/\nDisallow: /en/authorized-access/\nSitemap: ${site.productionUrl}/sitemap.xml\n`, 'utf8');
  await writeFile(path.join(outDir, '.nojekyll'), '', 'utf8');

  console.log(`Built ${Object.keys(routes.es).length + Object.keys(routes.en).length} pages in ${outDir}`);
}

await build();
