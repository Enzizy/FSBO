// V3 · Immersive — dark-first, champagne gold, Bodoni display type,
// real-time 3D hero (Three.js), GSAP scroll choreography and page transitions.
import { page, icon, card } from '../layout.mjs';
import { listings, stats, site } from '../data.mjs';
import { searchConsole, calcPanel, steps, proItems, regions } from '../partials.mjs';

export default function v3Home() {
  const featured = ['beachfront-villa-mactan-cebu', 'modern-2br-unit-bgc-taguig', 'studio-unit-makati-cbd'].map((s) => listings.find((l) => l.slug === s));
  const body = `
<section class="v3-hero" data-v3-hero>
  <canvas class="v3-hero__canvas" data-three aria-hidden="true"></canvas>
  <div class="v3-hero__veil" aria-hidden="true"></div>
  <div class="container v3-hero__inner">
    <p class="v3-label" data-fade>Philippines’ #1 For Sale By Owner platform</p>
    <h1 class="v3-title" data-split>Sell your home.<br><em>Keep more money.</em></h1>
    <div class="v3-hero__foot" data-fade>
      <p class="lead">List your property for free and deal directly with buyers. No agent commission, no exclusivity contract.</p>
      <div class="v3-hero__cta">
        <a class="btn btn--gold btn--lg" href="/post-property/">List your property free ${icon('arrow')}</a>
        <a class="btn btn--line btn--lg" href="/listings/">Browse listings</a>
      </div>
    </div>
  </div>
  <a class="v3-scrollcue" href="#search" aria-label="Scroll to search"><span></span>Scroll</a>
</section>

<section class="v3-search" id="search">
  <div class="container">${searchConsole('v3-console')}</div>
</section>

<section class="v3-manifesto">
  <div class="container">
    <p class="v3-label">Why FSBO4u</p>
    <p class="v3-manifesto__text" data-words>Every year, Filipino homeowners hand 3–5% of their sale to commission. On a ₱10 million home, that’s up to ₱560,000. With FSBO4u you list for free, talk to buyers directly, and keep all of it.</p>
  </div>
</section>

<div class="v3-marquee" data-marquee aria-hidden="true">
  <div class="v3-marquee__track">${Array(3).fill(['Metro Manila', 'Cebu', 'Davao', 'Makati', 'BGC', 'Mactan', 'Alabang', 'Quezon City'].map((c) => `<span>${c}</span><i>✕</i>`).join('')).join('')}</div>
</div>

<section class="v3-how" id="how" data-hscroll>
  <div class="v3-how__pin">
    <div class="v3-how__track" data-hscroll-track>
      <div class="v3-how__intro">
        <p class="v3-label">How it works</p>
        <h2 class="display-2" data-split>Sell smarter in three steps</h2>
        <p class="lead">From listing to closing, without handing a percentage to anyone.</p>
      </div>
      ${steps.map(([ic, h, p], i) => `
      <article class="v3-how__panel">
        <span class="v3-how__n">0${i + 1}</span>
        <div>
          <span class="ico">${icon(ic)}</span>
          <h3>${h}</h3>
          <p>${p}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<section class="section v3-featured">
  <div class="container">
    <div class="section-head section-head--split">
      <div><p class="v3-label">Featured properties</p><h2 class="display-2" data-split>Discover premium listings</h2></div>
      <a class="btn btn--line" href="/listings/">View all listings ${icon('arrow')}</a>
    </div>
    <div class="cards v3-cards">${featured.map((l) => card(l)).join('')}</div>
  </div>
</section>

<section class="section v3-calc-wrap" id="calculator">
  <div class="container calc">
    <div class="stack" style="--stack:1.2rem">
      <p class="v3-label">Commission calculator</p>
      <h2 class="display-2" data-split>What an agent would cost you</h2>
      <p class="lead">Brokers in the Philippines typically charge 3–5% of the selling price, plus VAT. Slide to your price and see what stays with you.</p>
    </div>
    ${calcPanel()}
  </div>
</section>

<section class="v3-places">
  <div class="container">
    <div class="section-head"><p class="v3-label">Explore by location</p><h2 class="display-2" data-split>Browse by location</h2></div>
    <div class="v3-places__stack">
      ${regions.map(([r, name, desc, href, img, tag], i) => `
      <a class="v3-place" href="${href}" style="--i:${i}">
        <img src="${img}" alt="" loading="lazy">
        <div class="v3-place__body">
          <span class="v3-label">${tag} · ${listings.filter((l) => l.region === r).length} featured</span>
          <h3>${name}</h3>
          <p>${desc}</p>
          <span class="btn btn--gold">Explore ${name} ${icon('arrow')}</span>
        </div>
        <span class="v3-place__n">0${i + 1}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="v3-stats">
  <div class="container">
    <dl class="v3-stats__grid">
      ${stats.map((s) => `<div><dd>${s.text ? s.text : `<span data-count="${s.value}">0</span><sup>${s.suffix}</sup>`}</dd><dt>${s.label}</dt></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section section--ink v3-pro">
  <div class="container pro">
    <div class="stack" style="--stack:1.2rem">
      <p class="v3-label">For professionals</p>
      <h2 class="display-2" data-split>Grow your business with FSBO4u</h2>
      <p class="lead">Join hundreds of licensed Realtors and Brokers who use FSBO4u to expand their reach and close more deals.</p>
      <div class="price-tag">Plans from <b>₱499</b>/month</div>
      <div><a class="btn btn--gold" href="/subscription-plans/">View subscription plans ${icon('arrow')}</a></div>
    </div>
    <div class="pro__list">${proItems.map(([ic, h, p]) => `<div class="pro__item reveal"><span class="ico">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="partner reveal">
      <span class="partner__mark">LA</span>
      <div><p class="v3-label">Official network partner</p><h3>${site.partner}</h3><p class="muted">Connecting buyers, sellers, and brokers across the Philippines and beyond.</p></div>
      <a class="btn btn--line" href="/about/">About the partnership ${icon('arrow')}</a>
    </div>
  </div>
</section>

<script type="module" src="/assets/js/v3-hero.js"></script>`;

  return page({
    path: '/',
    title: 'FSBO4u — Sell Your Home, Keep More Money | Philippines',
    description: 'List your property for free on FSBO4u, the Philippines’ #1 For Sale By Owner platform. Connect directly with buyers and save on agent commissions.',
    body, header: 'overlay',
  });
}
