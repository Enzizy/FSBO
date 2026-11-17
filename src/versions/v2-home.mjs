// V2 · Modern — light-first, emerald & brass, sans-serif, proptech-style homepage.
import { page, icon, card, esc } from '../layout.mjs';
import { listings, stats, site, pesoShort } from '../data.mjs';
import { searchConsole, calcPanel, steps, compareTable, proItems, regions } from '../partials.mjs';

export default function v2Home() {
  const types = ['All', ...new Set(listings.map((l) => l.type))];
  const body = `
<section class="v2-hero">
  <div class="container v2-hero__grid">
    <div class="v2-hero__copy">
      <p class="v2-badge"><span class="v2-badge__dot"></span>Philippines’ #1 For Sale By Owner platform</p>
      <h1 class="display-1">Sell your home.<br><span class="accent">Keep more money.</span></h1>
      <p class="lead">List your property for free and deal directly with buyers. No agent commission, no exclusivity contract.</p>
      <div class="v2-hero__cta">
        <a class="btn btn--ink btn--lg" href="/post-property/">List your property free ${icon('arrow')}</a>
        <a class="btn btn--line btn--lg" href="/listings/">Browse listings</a>
      </div>
      <ul class="v2-hero__proof">
        <li><b>₱0</b><span>commission</span></li>
        <li><b>10 min</b><span>to go live</span></li>
        <li><b>50+</b><span>cities</span></li>
      </ul>
    </div>
    <div class="v2-hero__media">
      <figure class="v2-hero__main"><img src="/assets/img/listing-mactan.jpg" alt="Aerial view of beachfront homes in Mactan, Cebu" fetchpriority="high"></figure>
      <figure class="v2-hero__side"><img src="/assets/img/listing-bgc.jpg" alt="Bright condominium interior in BGC"></figure>
      <div class="v2-hero__tag">
        <span class="ico">${icon('wallet')}</span>
        <div><small>Seller saves vs. 5% + VAT</small><b>₱1,400,000</b><span>Beachfront Villa · ₱25M</span></div>
      </div>
    </div>
  </div>
  <div class="container">${searchConsole('v2-console')}</div>
</section>

<section class="v2-stats">
  <div class="container">
    <dl class="v2-stats__row">
      ${stats.map((s) => `<div><dt>${s.label}</dt><dd>${s.text ? s.text : `<span data-count="${s.value}">0</span>${s.suffix}`}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:.75rem"><p class="v2-kicker">Featured properties</p><h2 class="display-2">Discover premium listings</h2></div>
      <a class="link-arrow" href="/listings/">View all listings ${icon('arrow')}</a>
    </div>
    <div class="v2-filter" role="tablist" aria-label="Filter by property type" data-quickfilter>
      ${types.map((t, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-qf="${i === 0 ? '' : esc(t)}">${esc(t)}</button>`).join('')}
    </div>
    <div class="cards" data-qf-grid>${listings.map((l) => card(l)).join('')}</div>
  </div>
</section>

<section class="section section--cream" id="how">
  <div class="container">
    <div class="section-head section-head--center"><p class="v2-kicker">How it works</p><h2 class="display-2">Sell smarter in three steps</h2></div>
    <ol class="v2-steps">
      ${steps.map(([ic, h, p], i) => `<li class="reveal"><span class="v2-steps__n">0${i + 1}</span><span class="ico ico--ink">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" id="calculator">
  <div class="container calc">
    <div class="stack" style="--stack:1.1rem">
      <p class="v2-kicker">Commission calculator</p>
      <h2 class="display-2">What an agent would cost you</h2>
      <p class="lead">Brokers in the Philippines typically charge 3–5% of the selling price, plus VAT. Listing on FSBO4u is free, so that amount stays with you.</p>
      <ul class="v2-checks">
        <li>${icon('check')}No listing fee for owners</li>
        <li>${icon('check')}No exclusivity contract</li>
        <li>${icon('check')}Optional help from verified agents</li>
      </ul>
    </div>
    ${calcPanel()}
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:.75rem"><p class="v2-kicker">Explore by location</p><h2 class="display-2">Browse by location</h2></div>
      <a class="link-arrow" href="/cebu-real-estate-for-sale/">All of Cebu ${icon('arrow')}</a>
    </div>
    <div class="v2-places">
      ${regions.map(([r, name, desc, href, img, tag]) => `<a class="v2-place reveal" href="${href}"><figure><img src="${img}" alt="" loading="lazy"></figure><div><span class="v2-place__tag">${tag} · ${listings.filter((l) => l.region === r).length} featured</span><h3>${name}</h3><p>${desc}</p></div><span class="v2-place__go">${icon('arrow')}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container v2-split">
    <div class="stack" style="--stack:1rem">
      <p class="v2-kicker">Why sell by owner</p>
      <h2 class="display-2">FSBO4u vs. a traditional agent</h2>
      <p class="lead">Same reach, none of the commission. Bring in a verified professional only if and when you want one.</p>
      <a class="btn btn--ink" href="/post-property/">Start listing ${icon('arrow')}</a>
    </div>
    ${compareTable()}
  </div>
</section>

<section class="section section--ink">
  <div class="container pro">
    <div class="stack" style="--stack:1.1rem">
      <p class="v2-kicker v2-kicker--on-ink">For professionals</p>
      <h2 class="display-2">Grow your business with FSBO4u</h2>
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
      <div><p class="v2-kicker">Official network partner</p><h3>${site.partner}</h3><p class="muted">Connecting buyers, sellers, and brokers across the Philippines and beyond.</p></div>
      <a class="btn btn--line" href="/about/">About the partnership ${icon('arrow')}</a>
    </div>
  </div>
</section>`;

  return page({
    path: '/',
    title: 'FSBO4u — Sell Your Home, Keep More Money | Philippines',
    description: 'List your property for free on FSBO4u, the Philippines’ #1 For Sale By Owner platform. Connect directly with buyers and save on agent commissions.',
    body,
  });
}
