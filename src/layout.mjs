import { site, peso, pesoShort } from './data.mjs';

/* ---------- Icons (24px stroke set) ---------- */
const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  bed: '<path d="M3 18V6M3 13h18v5M21 13a3 3 0 0 0-3-3h-7v3"/><circle cx="7" cy="10" r="1.6"/>',
  bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  upRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  building: '<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3"/>',
  home: '<path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6"/>',
  townhouse: '<path d="M3 21V10l4.5-3.5L12 10v11M12 21V10l4.5-3.5L21 10v11M2 21h20M6 14h3M15 14h3"/>',
  lot: '<path d="M4 7.5 11 4l9 3-1.5 12.5L11 21l-7-4z"/><path d="M11 4v17" stroke-dasharray="2 3"/>',
  waves: '<circle cx="12" cy="7" r="3"/><path d="M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 19.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  chart: '<path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/>',
  bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M22 20a7 7 0 0 0-4-6.3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  message: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  filter: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  layout: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/>',
  car: '<path d="M3 17v-4l2-6h14l2 6v4zM3 17v2M21 17v2"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
  sparkle: '<path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7z"/>',
  wallet: '<path d="M3 7a2 2 0 0 1 2-2h13v4M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><circle cx="16" cy="14.5" r="1.2"/>',
  file: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  hammer: '<path d="m14 7 3-3 3 3-3 3M15.5 8.5 5 19l-2-2L13.5 6.5"/>',
};
export const icon = (name, cls = '') =>
  `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;


/* ---------- Helpers ---------- */
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const typeIcon = (t) => ({ 'Condominium': 'building', 'House & Lot': 'home', 'Townhouse': 'townhouse', 'Beach Property': 'waves', 'Lot Only': 'lot', 'Commercial': 'building', 'Warehouse': 'building' }[t] || 'home');
export const media = (l) => l.img ? `/assets/img/${l.img}` : `/assets/img/art-${l.art}.svg`;

export function specs(l) {
  const out = [];
  if (l.beds) out.push(`<li>${icon('bed')}<b>${l.beds}</b> Beds</li>`);
  else if (l.type === 'Condominium') out.push(`<li>${icon('bed')}<b>Studio</b></li>`);
  if (l.baths) out.push(`<li>${icon('bath')}<b>${l.baths}</b> Baths</li>`);
  out.push(`<li>${icon('area')}<b>${l.area}</b> sqm</li>`);
  return `<ul class="specs">${out.join('')}</ul>`;
}

export function card(l, opts = {}) {
  const saved = Math.round(l.price * 0.05);
  return `<article class="card ${opts.reveal === false ? '' : 'reveal'}" data-slug="${l.slug}" data-type="${esc(l.type)}" data-city="${esc(l.city)}" data-region="${l.region}" data-price="${l.price}" data-area="${l.area}" ${opts.hidden ? 'hidden' : ''}>
  <a class="card__media ${l.img ? '' : 'card__media--art'}" href="/listings/${l.slug}/" tabindex="-1" aria-hidden="true">
    <img src="${media(l)}" alt="" loading="lazy" decoding="async">
    <span class="chip chip--glass">${icon(typeIcon(l.type))}${esc(l.type)}</span>
    ${l.seller === 'owner' ? `<span class="seal" title="Listed directly by the owner">Owner-direct</span>` : `<span class="seal seal--agent" title="Listed by a PRC-verified agent">Verified agent</span>`}
  </a>
  <button class="fav" type="button" data-fav="${l.slug}" aria-pressed="false" aria-label="Save ${esc(l.title)}">${icon('heart')}</button>
  <div class="card__body">
    <div class="card__row"><p class="card__price">${peso(l.price)}</p><p class="card__ppsqm">${pesoShort(Math.round(l.price / l.area))}/sqm</p></div>
    <h3 class="card__title"><a href="/listings/${l.slug}/">${esc(l.title)}</a></h3>
    <p class="card__loc">${icon('pin')}${esc(l.location)}</p>
    ${specs(l)}
    ${l.seller === 'owner' ? `<p class="card__save">${icon('tag')}<span>Commission-free · save up to <b>${pesoShort(saved)}</b></span></p>` : `<p class="card__save card__save--agent">${icon('shield')}<span>Listed by a PRC-verified agent</span></p>`}
  </div>
</article>`;
}

export const eyebrow = (t, cls = '') => `<p class="eyebrow ${cls}"><span></span>${t}</p>`;

export const faqList = (items, open = 0) => `<div class="faq">${items.map(([q, a], i) => `
  <details class="faq__item reveal" ${i === open ? 'open' : ''}>
    <summary><span>${esc(q)}</span><i class="faq__plus" aria-hidden="true"></i></summary>
    <div class="faq__a"><p>${esc(a)}</p></div>
  </details>`).join('')}</div>`;

export const crumbs = (items) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) => i === items.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${href}">${esc(label)}</a>${icon('chevronRight')}</li>`).join('')}</ol></nav>`;

/* ---------- Chrome ---------- */
const nav = [
  ['Browse Listings', '/listings/'],
  ['Locations', null, [
    ['Metro Manila', '/metro-manila/', 'NCR · 16 cities'],
    ['Cebu City', '/cebu-city/', 'Queen City of the South'],
    ['Davao City', '/davao-city/', 'Mindanao’s capital'],
    ['All of Cebu', '/cebu-real-estate-for-sale/', 'Mactan, Mandaue, Talisay & more'],
  ]],
  ['Post Property', '/post-property/'],
  ['For Agents', '/subscription-plans/'],
  ['Blog', '/blog/'],
  ['About', '/about/'],
];

function header(active, variant) {
  const links = nav.map(([label, href, sub]) => {
    if (sub) return `<li class="nav__item nav__item--menu">
      <button class="nav__link" type="button" aria-expanded="false">${label}${icon('chevron')}</button>
      <div class="nav__menu">${sub.map(([l, h, d]) => `<a href="${h}"><b>${l}</b><span>${d}</span></a>`).join('')}</div></li>`;
    return `<li class="nav__item"><a class="nav__link ${active === href ? 'is-active' : ''}" href="${href}">${label}</a></li>`;
  }).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header ${variant === 'overlay' ? 'site-header--overlay' : ''}" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/" aria-label="FSBO4u home">${logo()}</a>
    <nav class="nav" aria-label="Primary"><ul>${links}</ul></nav>
    <div class="site-header__actions">
      ${V.themes ? themeBtn() : ''}
      <a class="icon-btn" href="/favorites/" aria-label="Saved properties">${icon('heart')}<span class="badge" data-fav-count hidden>0</span></a>
      <a class="btn btn--ghost btn--sm hide-sm" href="/sign-in/">Sign in</a>
      <a class="btn btn--gold btn--sm" href="/post-property/">List free</a>
      <button class="icon-btn nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>${icon('menu')}</button>
    </div>
  </div>
  <div class="drawer" data-drawer hidden>
    <ul>${nav.flatMap(([l, h, sub]) => sub ? sub.map(([sl, sh]) => `<li><a href="${sh}">${sl}</a></li>`) : [`<li><a href="${h}">${l}</a></li>`]).join('')}</ul>
    <div class="drawer__cta"><a class="btn btn--ghost" href="/sign-in/">Sign in</a><a class="btn btn--gold" href="/post-property/">List your property free</a></div>
  </div>
</header>`;
}

function footer() {
  const cols = [
    ['Buy', [['Browse listings', '/listings/'], ['Search by location', '/metro-manila/'], ['Saved properties', '/favorites/'], ['Cebu real estate', '/cebu-real-estate-for-sale/']]],
    ['Sell', [['Post your property', '/post-property/'], ['How it works', '/#how'], ['Commission calculator', '/#calculator'], ['Seller tips', '/blog/']]],
    ['Professionals', [['Realtor plans', '/subscription-plans/'], ['Broker plans', '/subscription-plans/#compare'], ['Seller dashboard', '/seller/'], ['Partner with us', '/about/#contact']]],
    ['Company', [['About FSBO4u', '/about/'], ['Contact us', '/about/#contact'], ['Privacy policy', '/privacy/'], ['Terms of service', '/terms/']]],
  ];
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-cta reveal">
      <div>
        
        <h2 class="display-2">Ready to sell your property?</h2>
      </div>
      <div class="footer-cta__actions">
        <a class="btn btn--gold btn--lg" href="/post-property/">List your property free ${icon('arrow')}</a>
        <a class="btn btn--line btn--lg" href="/listings/">Browse listings</a>
      </div>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/img/logo.png" alt="FSBO4u.com" width="1425" height="428" loading="lazy">
        <p>The Philippines’ premier For Sale By Owner platform — empowering homeowners and connecting real estate professionals.</p>
        <ul class="footer-contact">
          <li>${icon('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
          <li>${icon('phone')}<a href="tel:${site.phoneHref}">${site.phone}</a> <span>Viber · WhatsApp</span></li>
          <li>${icon('pin')}<span>${site.office}</span></li>
        </ul>
      </div>
      ${cols.map(([h, ls]) => `<div class="footer-col"><h3>${h}</h3><ul>${ls.map(([l, href]) => `<li><a href="${href}">${l}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="footer-base">
      <p>© 2026 FSBO4u.com — ${site.partner}. Cebu City, Philippines. All rights reserved.</p>
      <p class="footer-base__tag">Empowering Filipino homeowners to sell smarter.</p>
    </div>
  </div>
</footer>`;
}

const cookie = `<div class="cookie" data-cookie hidden role="dialog" aria-label="Cookie preferences">
  <p><b>We value your privacy.</b> We use essential cookies to run FSBO4u, and optional ones for analytics only with your consent. <a href="/privacy/">Privacy policy</a></p>
  <div><button class="btn btn--line btn--sm" data-cookie-choice="essential">Essential only</button><button class="btn btn--gold btn--sm" data-cookie-choice="all">Accept all</button></div>
</div>`;

/* ---------- Design versions ---------- */
export const VERSIONS = {
  v1: { id: 'v1', label: 'Classic', fonts: 'family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700', css: [], themes: false, themeColor: '#1A1A2E' },
  v2: { id: 'v2', label: 'Modern', fonts: 'family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700', css: ['v2.css'], themes: true, defaultTheme: 'system', themeColor: '#173A33' },
  v3: { id: 'v3', label: 'Immersive', fonts: 'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..700&family=Inter:wght@400;500;600;700', css: ['v3.css'], themes: true, defaultTheme: 'dark', themeColor: '#0B0B0E',
    vendor: ['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'],
    scripts: ['v3.js'] },
};
export let V = VERSIONS.v1;
export const setVersion = (id) => { V = VERSIONS[id]; };

export const logo = (cls = '') => `<img class="logo logo--light ${cls}" src="/assets/img/logo.png" alt="FSBO4u.com" width="1425" height="428"><img class="logo logo--dark ${cls}" src="/assets/img/logo-dark.png" alt="" aria-hidden="true" width="1425" height="428">`;
const themeBtn = () => `<button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="Switch light or dark mode">${icon('sun', 'i-sun')}${icon('moon', 'i-moon')}</button>`;

const switcher = () => `<div class="vswitch" data-vswitch role="navigation" aria-label="Design versions">
  <span class="vswitch__label">${icon('layers')}Design</span>
  ${Object.values(VERSIONS).map((v) => `<a href="#" data-vlink="${v.id}" class="${v.id === V.id ? 'is-current' : ''}" ${v.id === V.id ? 'aria-current="true"' : ''} title="Version ${v.id.slice(1)} · ${v.label}"><b>${v.id.toUpperCase()}</b><span>${v.label}</span></a>`).join('')}
  ${V.themes ? themeBtn() : ''}
</div>`;

const themeInit = (v) => `<script>(function(){var k='fsbo4u:theme:${v.id}',t;try{t=localStorage.getItem(k)}catch(e){}if(!t)t=${v.defaultTheme === 'dark' ? "'dark'" : "matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'"};document.documentElement.dataset.theme=t;document.documentElement.dataset.themeKey=k})()</script>`;

export function page({ path, title, description, body, active, header: hv, bodyClass = '', scripts = [], chrome = true, jsonld, noindex }) {
  return { path, noindex: noindex || V.id !== 'v1', html: render({ path, title, description, body, active, hv, bodyClass, scripts, chrome, jsonld, noindex }) };
}

function render({ path, title, description, body, active, hv, bodyClass, scripts, chrome, jsonld, noindex }) {
  const canonical = site.url + (path === '/' ? '/' : path.replace(/\/$/, ''));
  return `<!doctype html>
<html lang="en-PH" data-version="${V.id}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">${noindex || V.id !== 'v1' ? '<meta name="robots" content="noindex">' : ''}
<meta name="theme-color" content="${V.themeColor}">
<script>document.documentElement.classList.add('js')</script>
${V.themes ? themeInit(V) : ''}
<meta property="og:site_name" content="FSBO4u">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${V.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
${V.css.map((c) => `<link rel="stylesheet" href="/assets/css/${c}">`).join('\n')}
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>
<body class="${bodyClass} v-${V.id}">
${V.id === 'v3' ? '<div class="curtain" data-curtain aria-hidden="true"><img src="/assets/img/favicon.svg" alt=""></div>' : ''}
${chrome ? header(active, hv) : ''}
<main id="main">
${body}
</main>
${chrome ? footer() : ''}
${cookie}
${switcher()}
<div class="toast" data-toast role="status" aria-live="polite"></div>
${(V.vendor || []).map((u) => `<script src="${u}" defer></script>`).join('\n')}
<script src="/assets/js/main.js" defer></script>
${[...scripts, ...(V.scripts || [])].map((s) => `<script src="/assets/js/${s}" defer></script>`).join('\n')}
</body>
</html>`;
}
