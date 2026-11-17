import { page, icon, card, eyebrow, crumbs, specs, media, typeIcon, esc } from '../layout.mjs';
import { listings, peso, pesoShort, cities } from '../data.mjs';

const regionPage = { 'metro-manila': ['Metro Manila', '/metro-manila/'], cebu: ['Cebu', '/cebu-real-estate-for-sale/'], davao: ['Davao City', '/davao-city/'] };

function index() {
  const types = [...new Set(listings.map((l) => l.type))];
  const cityList = [...new Set(listings.map((l) => l.city))];
  const body = `
<section class="page-hero">
  <div class="container">
    ${crumbs([['Home', '/'], ['Listings']])}
    <div style="margin-top:28px">${eyebrow('Property search')}</div>
    <h1 class="display-1">Find your perfect property</h1>
    <p class="lead">Browse listings across the Philippines — direct from owners and verified professionals.</p>
  </div>
</section>

<form class="filters" data-filters role="search" aria-label="Filter listings">
  <div class="container filters__inner">
    <div class="input-group">${icon('search')}<label class="sr-only" for="f-q">Search location or keyword</label><input id="f-q" class="input" name="q" placeholder="City, area or keyword" autocomplete="off"></div>
    <label class="sr-only" for="f-type">Property type</label>
    <select id="f-type" class="select" name="type"><option value="">All types</option>${types.map((t) => `<option>${esc(t)}</option>`).join('')}</select>
    <label class="sr-only" for="f-city">City</label>
    <select id="f-city" class="select" name="city"><option value="">All cities</option>${cityList.map((c) => `<option>${esc(c)}</option>`).join('')}</select>
    <label class="sr-only" for="f-price">Price</label>
    <select id="f-price" class="select" name="price"><option value="">Any price</option><option value="0-5000000">Under ₱5M</option><option value="5000000-10000000">₱5M – ₱10M</option><option value="10000000-20000000">₱10M – ₱20M</option><option value="20000000-">Above ₱20M</option></select>
    <span class="filters__spacer"></span>
    <label class="sr-only" for="f-sort">Sort</label>
    <select id="f-sort" class="select" name="sort"><option value="featured">Featured first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="area-desc">Largest floor area</option></select>
    <div class="view-toggle" role="group" aria-label="Layout">
      <button type="button" data-view="grid" aria-pressed="true" aria-label="Grid view">${icon('grid')}</button>
      <button type="button" data-view="list" aria-pressed="false" aria-label="List view">${icon('list')}</button>
    </div>
  </div>
</form>

<section class="section section--tight">
  <div class="container">
    <div class="result-bar">
      <h2 aria-live="polite"><b data-count-out>${listings.length}</b> properties found</h2>
      <div class="active-filters" data-chips></div>
    </div>
    <div class="cards" data-results>${listings.map((l) => card(l)).join('')}</div>
    <div class="empty" data-empty hidden>
      <span class="ico ico--cream">${icon('search')}</span>
      <h3>No matches — yet.</h3>
      <p>Try widening your price range or clearing a filter. New owner listings are added every day.</p>
      <button class="btn btn--ink" type="button" data-reset>Clear all filters</button>
    </div>
  </div>
</section>

<section class="section section--ink">
  <div class="container" style="display:grid;grid-template-columns:1fr auto;gap:32px;align-items:end">
    <div class="stack" style="--stack:1rem"><h2 class="display-2">List your property for free</h2><p class="lead">Join thousands of Filipino homeowners who’ve saved on commissions by selling directly on FSBO4u.</p></div>
    <a class="btn btn--gold btn--lg" href="/post-property/">Post your property now ${icon('arrow')}</a>
  </div>
</section>`;
  return page({ path: '/listings/', active: '/listings/', title: 'Browse Property Listings | FSBO4u Philippines', description: 'Browse condos, house & lots, townhouses, beach properties and lots for sale by owner across the Philippines.', body, scripts: ['listings.js'] });
}

function detail(l) {
  const others = listings.filter((x) => x.slug !== l.slug).sort((a, b) => (b.region === l.region) - (a.region === l.region)).slice(0, 3);
  const [rName, rHref] = regionPage[l.region];
  const gallery = [[media(l), '50% 50%', 1], [media(l), '20% 70%', 1.5], [media(l), '85% 25%', 1.7]];
  const sellerName = l.seller === 'owner' ? 'Property owner' : 'Verified agent';
  const facts = [
    ['Type', typeIcon(l.type), l.type],
    l.beds ? ['Bedrooms', 'bed', l.beds] : ['Lot area', 'area', l.area + ' sqm'],
    l.baths ? ['Bathrooms', 'bath', l.baths] : ['Price / sqm', 'tag', pesoShort(Math.round(l.price / l.area))],
    l.beds || l.baths ? ['Floor area', 'area', l.area + ' sqm'] : ['Status', 'info', l.status],
  ];
  const body = `
<section class="section section--tight" style="padding-bottom:0">
  <div class="container">
    ${crumbs([['Home', '/'], ['Listings', '/listings/'], [rName, rHref], [l.title]]).replace('class="crumbs"', 'class="crumbs crumbs--dark"')}
    <div class="gallery reveal" style="margin-top:24px">
      ${gallery.map(([src, pos, z], i) => `<figure><img src="${src}" alt="${i === 0 ? esc(l.title) : ''}" style="object-position:${pos};scale:${z}" ${i ? 'loading="lazy"' : ''}>${i === gallery.length - 1 ? `<span class="gallery__count">${icon('camera')}View all photos</span>` : ''}</figure>`).join('')}
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container detail">
    <article>
      <div class="detail__head">
        <div class="stack" style="--stack:.6rem">
          <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="chip chip--ink">${icon(typeIcon(l.type))}${esc(l.type)}</span>${l.seller === 'owner' ? '<span class="chip chip--gold">Owner-direct · No commission</span>' : '<span class="chip chip--gold">PRC-verified agent</span>'}</div>
          <h1 class="display-3">${esc(l.title)}</h1>
          <p class="card__loc" style="font-size:1rem">${icon('pin')}${esc(l.location)}</p>
        </div>
        <div style="text-align:right" class="stack">
          <p class="detail__price">${peso(l.price)}</p>
          <div class="detail__actions" style="justify-content:flex-end;margin-top:14px">
            <button class="round-btn" type="button" data-fav="${l.slug}" aria-pressed="false" aria-label="Save property">${icon('heart')}</button>
            <button class="round-btn" type="button" data-share aria-label="Share">${icon('share')}</button>
          </div>
        </div>
      </div>

      <div class="keyfacts">${facts.map(([k, ic, v]) => `<div><small>${icon(ic)}${k}</small><b>${esc(v)}</b></div>`).join('')}</div>

      <h2 class="display-3" style="font-size:1.6rem;margin-bottom:14px">About this property</h2>
      <div class="prose"><p>${esc(l.description)}</p></div>

      <h2 class="display-3" style="font-size:1.6rem;margin:40px 0 18px">Highlights</h2>
      <ul class="feature-list">${l.features.map((f) => `<li>${icon('check')}${esc(f)}</li>`).join('')}</ul>

      <h2 class="display-3" style="font-size:1.6rem;margin:40px 0 18px">Location</h2>
      <div class="mapbox"><span class="mapbox__pin"><span></span></span><span class="mapbox__label">${icon('pin')}${esc(l.location)}</span></div>

      ${`
      <div class="panel" style="margin-top:40px" data-mortgage="${l.price}">
        <div class="mortgage">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap">
            <div>${eyebrow('Bank financing estimate')}<h2 style="font-size:1.6rem;margin-top:10px">What would it cost per month?</h2></div>
            <p class="mortgage__out"><b data-m-out>₱0</b><span class="muted">/ month</span></p>
          </div>
          <div class="grid grid-3" style="margin-top:10px">
            <div class="field"><label for="m-dp">Down payment <span class="muted" style="letter-spacing:0;text-transform:none" data-m-dp></span></label><input id="m-dp" class="range" type="range" name="dp" min="10" max="50" step="5" value="20"></div>
            <div class="field"><label for="m-yrs">Term <span class="muted" style="letter-spacing:0;text-transform:none" data-m-yrs></span></label><input id="m-yrs" class="range" type="range" name="yrs" min="5" max="25" step="5" value="20"></div>
            <div class="field"><label for="m-rate">Interest <span class="muted" style="letter-spacing:0;text-transform:none" data-m-rate></span></label><input id="m-rate" class="range" type="range" name="rate" min="5" max="10" step="0.25" value="6.5"></div>
          </div>
          <p class="calc__note">Indicative only — actual rates vary by bank and Pag-IBIG eligibility.</p>
        </div>
      </div>`}
    </article>

    <aside class="contact-card panel panel--ink" data-tabs>
      <div class="contact-card__seller">
        <span class="avatar">${l.seller === 'owner' ? 'O' : 'A'}</span>
        <div><b style="color:#fff;display:block">${sellerName}</b><span style="font-size:.85rem;color:var(--on-ink-3)">Usually replies within a day</span></div>
      </div>
      <div class="tabs-mini" role="tablist">
        <button type="button" role="tab" data-tab="ask" aria-selected="true">Send enquiry</button>
        <button type="button" role="tab" data-tab="visit" aria-selected="false">Book a viewing</button>
      </div>
      <form class="stack" style="--stack:.75rem" data-demo="Enquiry sent — the seller will reply by email" novalidate>
        <div class="field"><label class="sr-only" for="c-name">Full name</label><input id="c-name" class="input" placeholder="Full name" required><span class="field__err">Please enter your name</span></div>
        <div class="field"><label class="sr-only" for="c-email">Email</label><input id="c-email" class="input" type="email" placeholder="Email address" required><span class="field__err">Please enter a valid email</span></div>
        <div class="field"><label class="sr-only" for="c-phone">Mobile</label><input id="c-phone" class="input" type="tel" placeholder="Mobile (+63)"></div>
        <div data-tabpanel="ask"><label class="sr-only" for="c-msg">Message</label><textarea id="c-msg" class="textarea">Hi, I’m interested in “${esc(l.title)}”. Is it still available?</textarea></div>
        <div data-tabpanel="visit" hidden class="grid grid-2" style="gap:10px"><label class="sr-only" for="c-date">Preferred date</label><input id="c-date" class="input" type="date"><label class="sr-only" for="c-time">Preferred time</label><select id="c-time" class="select"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>
        <button class="btn btn--gold btn--block btn--lg" type="submit">Contact ${l.seller === 'owner' ? 'owner' : 'agent'} ${icon('arrow')}</button>
        <p class="secure-note">${icon('lock')}Your details go only to this seller.</p>
      </form>
    </aside>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2">Similar properties</h2></div>
      <a class="btn btn--ink" href="/listings/">Browse all ${icon('arrow')}</a>
    </div>
    <div class="cards">${others.map((o) => card(o)).join('')}</div>
  </div>
</section>`;
  return page({
    path: `/listings/${l.slug}/`, active: '/listings/',
    title: `${l.title} — ${peso(l.price)} | FSBO4u`,
    description: `${l.type} for sale in ${l.location}. ${l.description.slice(0, 120)}…`,
    body,
    jsonld: { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: l.title, url: `https://fsbo4u.com/listings/${l.slug}`, description: l.description, offers: { '@type': 'Offer', price: l.price, priceCurrency: 'PHP' }, address: { '@type': 'PostalAddress', addressLocality: l.location, addressCountry: 'PH' } },
  });
}

export default function () { return [index(), ...listings.map(detail)]; }
