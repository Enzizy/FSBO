import { page, icon, card, eyebrow } from '../layout.mjs';
import { listings, stats, site } from '../data.mjs';

export default function home() {
  const featured = ['modern-2br-unit-bgc-taguig', 'beachfront-villa-mactan-cebu', 'spacious-family-home-alabang'].map((s) => listings.find((l) => l.slug === s));
  const countIn = (r) => listings.filter((l) => l.region === r).length;

  const body = `
<section class="hero">
  <div class="hero__bg"><img src="/assets/img/hero-manila.jpg" alt="" fetchpriority="high"></div>
  <div class="container">
    <div class="hero__grid">
      <div class="hero__copy">
        ${eyebrow('Philippines’ #1 FSBO platform', 'on-ink')}
        <h1 class="display-1"><span style="white-space:nowrap">Sell your home.</span> <span class="accent">Keep more money.</span></h1>
        <p class="lead">The Philippines’ #1 For Sale By Owner platform. List your property for free and deal directly with buyers, with no agent commission.</p>

        <form class="console" action="/listings/" method="get" data-console>
          <div class="console__tabs" role="tablist" aria-label="What would you like to do?">
            <button type="button" role="tab" class="console__tab" data-tab="buy" aria-selected="true">Buy</button>
            <button type="button" role="tab" class="console__tab" data-tab="rent" aria-selected="false">Rent</button>
            <button type="button" role="tab" class="console__tab" data-tab="sell" aria-selected="false">Sell</button>
          </div>
          <input type="hidden" name="status" value="sale">
          <div class="console__row" data-panel="buy">
            <div class="console__field"><label for="q">Location</label><input id="q" name="q" placeholder="Makati, BGC, Cebu…" autocomplete="off"></div>
            <div class="console__field"><label for="type">Type</label>
              <select id="type" name="type"><option value="">Any type</option><option>Condominium</option><option>House &amp; Lot</option><option>Townhouse</option><option>Beach Property</option><option>Lot Only</option><option>Commercial</option></select></div>
            <div class="console__field"><label for="price">Budget</label>
              <select id="price" name="price"><option value="">Any price</option><option value="0-5000000">Under ₱5M</option><option value="5000000-10000000">₱5M – ₱10M</option><option value="10000000-20000000">₱10M – ₱20M</option><option value="20000000-">Above ₱20M</option></select></div>
            <button class="btn btn--gold console__go" type="submit">${icon('search')}<span>Search</span></button>
          </div>
          <div class="console__sell" data-panel="sell" hidden>
            <div class="console__field"><label for="value">Your property’s estimated value</label><input id="value" name="value" inputmode="numeric" placeholder="₱ 8,500,000" data-money></div>
            <button class="btn btn--gold console__go" type="button" data-sell-go>See what I keep ${icon('arrow')}</button>
          </div>
        </form>

        <ul class="hero__proof">
          <li>${icon('check')}Free to list</li>
          <li>${icon('check')}Keep 100% of your sale</li>
          <li>${icon('check')}Verified buyers & agents</li>
        </ul>
      </div>

      <div class="hero__visual">
        <div class="arch"><img src="/assets/img/listing-mactan.jpg" alt=""></div>
        <p class="hero__caption"><span>Beachfront Villa · Mactan, Cebu</span><b>₱25,000,000</b></p>
      </div>
    </div>

    <dl class="stats">
      ${stats.map((s) => `<div class="stat reveal"><dt class="sr-only">${s.label}</dt><dd class="stat__value">${s.text ? s.text : `<span data-count="${s.value}">0</span><sup>${s.suffix}</sup>`}</dd><dd class="stat__label">${s.label}</dd></div>`).join('')}
    </dl>
  </div>
</section>


<section class="section section--cream" id="calculator">
  <div class="container calc">
    <div class="stack" style="--stack:1.25rem">
      
      <h2 class="display-2 reveal">What an agent would cost you</h2>
      <p class="lead reveal">Brokers in the Philippines typically charge 3–5% of the selling price, plus VAT. Listing on FSBO4u is free, so that amount stays with you.</p>
      <a class="link-arrow reveal" href="/post-property/">Start your free listing ${icon('arrow')}</a>
    </div>
    <div class="calc__panel reveal" data-calc>
      <div class="calc__label"><label for="calc-price">Your property’s selling price</label><span>Commission <b data-out="rate">5%</b></span></div>
      <p class="calc__price" data-out="price" aria-live="polite">₱8,500,000</p>
      <input id="calc-price" class="range" type="range" min="1000000" max="50000000" step="100000" value="8500000" data-calc-range>
      <div class="range-ends"><span>₱1M</span><span>₱50M</span></div>
      <div style="margin-top:22px;display:flex;gap:14px;align-items:center;flex-wrap:wrap">
        <span class="muted" style="font-size:.88rem;font-weight:600">Typical agent rate</span>
        <div class="seg" role="group" aria-label="Agent commission rate">
          <button type="button" data-rate="0.03" aria-pressed="false">3%</button>
          <button type="button" data-rate="0.04" aria-pressed="false">4%</button>
          <button type="button" data-rate="0.05" aria-pressed="true">5%</button>
        </div>
      </div>
      <div class="calc__compare">
        <div class="bar"><div class="bar__meta"><span>Traditional agent <span class="muted">(commission + 12% VAT)</span></span><b data-out="agent">−₱476,000</b></div><div class="bar__track"><div class="bar__fill" data-bar="agent"></div></div></div>
        <div class="bar bar--fsbo"><div class="bar__meta"><span>FSBO4u listing</span><b data-out="fsbo">₱0</b></div><div class="bar__track"><div class="bar__fill" data-bar="fsbo"></div></div></div>
      </div>
      <div class="calc__result"><div><small>You keep</small><b data-out="save" aria-live="polite">₱476,000</b></div><a class="btn btn--gold" href="/post-property/">List free ${icon('arrow')}</a></div>
      <p class="calc__note">Estimate only. Excludes capital gains tax, documentary stamp tax and transfer fees, which apply to all sales.</p>
    </div>
  </div>
</section>

<section class="section" id="how">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Sell smarter in three steps</h2></div>
      <p class="lead reveal" style="max-width:44ch">There’s no exclusivity contract and no commission. You stay in control of the price and the negotiation.</p>
    </div>
    <ol class="steps">
      <li class="step reveal"><span class="step__num">01</span><span class="step__icon">${icon('camera')}</span><h3>Post your property</h3><p>Create your free listing in minutes. Add photos, set your price, and describe your property — no agent needed.</p></li>
      <li class="step reveal"><span class="step__num">02</span><span class="step__icon">${icon('users')}</span><h3>Get discovered</h3><p>Your listing reaches thousands of qualified buyers across the Philippines. Realtors and brokers can also connect with you.</p></li>
      <li class="step reveal"><span class="step__num">03</span><span class="step__icon">${icon('wallet')}</span><h3>Close the deal</h3><p>Negotiate directly with buyers, save on commissions, and close on your terms. We guide you every step of the way.</p></li>
    </ol>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Discover premium listings</h2><p class="lead reveal">Hand-picked properties across the Philippines’ most sought-after locations.</p></div>
      <a class="btn btn--ink reveal" href="/listings/">View all listings ${icon('arrow')}</a>
    </div>
    <div class="cards">${featured.map((l) => card(l)).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      
      <h2 class="display-2 reveal">Browse by location</h2>
    </div>
    <div class="regions">
      <a class="region region--wide reveal" href="/metro-manila/"><img src="/assets/img/hero-manila.jpg" alt="" loading="lazy"><span class="region__go">${icon('arrow')}</span><span class="region__count">${countIn('metro-manila')} featured · 16 cities</span><h3>Metro Manila</h3><p>BGC, Makati, Quezon City, Alabang &amp; beyond</p></a>
      <a class="region reveal" href="/cebu-city/"><img src="/assets/img/listing-mactan.jpg" alt="" loading="lazy"><span class="region__go">${icon('arrow')}</span><span class="region__count">${countIn('cebu')} featured · Visayas</span><h3>Cebu</h3><p>City condos to Mactan beachfront</p></a>
      <a class="region reveal" href="/davao-city/"><img src="/assets/img/art-davao.svg" alt="" loading="lazy"><span class="region__go">${icon('arrow')}</span><span class="region__count">${countIn('davao')} featured · Mindanao</span><h3>Davao City</h3><p>Safe, green and fast-growing</p></a>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container container--narrow">
    <div class="section-head section-head--center">
      
      <h2 class="display-2 reveal">FSBO4u vs. a traditional agent</h2>
    </div>
    <div class="compare reveal" role="table" aria-label="FSBO4u compared with a traditional agent">
      <div class="compare__row compare__head" role="row"><span role="columnheader"></span><span role="columnheader" class="is-them">Traditional agent</span><span role="columnheader" class="is-us">FSBO4u</span></div>
      ${[
        ['Listing fee', 'Free', 'Free'],
        ['Commission on sale', '3–5% + VAT', '₱0'],
        ['Who sets the price', 'Agent advises', 'You decide'],
        ['Talk to buyers directly', 'Through the agent', 'Always'],
        ['Exclusivity contract', 'Usually 3–6 months', 'None'],
        ['Listing goes live', 'Days', 'Minutes'],
      ].map(([a, b, c]) => `<div class="compare__row" role="row"><span role="cell">${a}</span><span role="cell" class="is-them">${b}</span><span role="cell" class="is-us">${icon('check')}${c}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--ink">
  <div class="container pro">
    <div class="stack" style="--stack:1.25rem">
      
      <h2 class="display-2 reveal">Grow your business with FSBO4u</h2>
      <p class="lead reveal">Join hundreds of licensed Realtors and Brokers who use FSBO4u to expand their reach and close more deals.</p>
      <div class="price-tag reveal">Plans from <b>₱499</b>/month</div>
      <div class="reveal" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><a class="btn btn--gold" href="/subscription-plans/">View subscription plans ${icon('arrow')}</a></div>
    </div>
    <div class="pro__list">
      <div class="pro__item reveal"><span class="ico">${icon('shield')}</span><h3>Verified seller leads</h3><p>Access motivated FSBO sellers actively looking for professional guidance.</p></div>
      <div class="pro__item reveal"><span class="ico">${icon('trend')}</span><h3>Premium listing placement</h3><p>Your listings appear at the top of search results across all Philippine cities.</p></div>
      <div class="pro__item reveal"><span class="ico">${icon('star')}</span><h3>Agent profile &amp; branding</h3><p>Build your professional profile and showcase your track record to buyers and sellers.</p></div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="partner reveal">
      <span class="partner__mark">LA</span>
      <div>${eyebrow('Official network partner')}<h3>${site.partner}</h3><p class="muted">Connecting buyers, sellers, and brokers across the Philippines and beyond.</p></div>
      <a class="btn btn--line" href="/about/">About the partnership ${icon('arrow')}</a>
    </div>
  </div>
</section>`;

  return page({
    path: '/',
    title: 'FSBO4u — Sell Your Home, Keep More Money | Philippines',
    description: 'List your property for free on FSBO4u, the Philippines’ #1 For Sale By Owner platform. Connect directly with buyers and save on agent commissions.',
    body, header: 'overlay',
    jsonld: { '@context': 'https://schema.org', '@type': 'WebSite', name: 'FSBO4u', url: 'https://fsbo4u.com/', potentialAction: { '@type': 'SearchAction', target: 'https://fsbo4u.com/listings?q={q}', 'query-input': 'required name=q' } },
  });
}
