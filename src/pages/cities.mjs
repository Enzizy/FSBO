import { page, icon, eyebrow, crumbs, card, faqList, esc } from '../layout.mjs';
import { cities, listings } from '../data.mjs';

function cityPage(slug, c) {
  const local = listings.filter((l) => l.region === c.region);
  const body = `
<section class="page-hero ${c.img ? 'page-hero--img' : ''}">
  ${c.img ? `<div class="page-hero__img"><img src="/assets/img/${c.img}" alt=""></div>` : ''}
  <div class="container">
    ${crumbs([['Home', '/'], ['Listings', '/listings/'], [c.name]])}
    <div style="margin-top:28px">${eyebrow(c.subtitle)}</div>
    <h1 class="display-1">${c.title}</h1>
    <p class="lead">${c.intro}</p>
    <div class="page-hero__actions">
      <a class="btn btn--gold btn--lg" href="/listings/?q=${encodeURIComponent(c.name.split(' ')[0])}">Browse ${c.name} listings ${icon('arrow')}</a>
      <a class="btn btn--ghost btn--lg" href="/post-property/">Sell in ${c.name}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Property types in ${c.name}</h2></div>
      <p class="lead reveal" style="max-width:40ch">Browse by property type — every listing direct from owners or PRC-verified professionals.</p>
    </div>
    <div class="grid grid-4">${c.types.map(([h, p, ic]) => `<a class="tile reveal" href="/listings/?q=${encodeURIComponent(c.name.split(' ')[0])}"><span class="ico ico--ink">${icon(ic)}</span><h3>${h}</h3><p>${p}</p><span class="tile__go">Explore ${icon('arrow')}</span></a>`).join('')}</div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head"><h2 class="display-2 reveal">${c.areasTitle} in ${c.name}</h2><p class="lead reveal">${c.areasIntro}</p></div>
    <div class="pills reveal">${c.areas.map((a) => `<a class="pill" href="/listings/?q=${encodeURIComponent(a.replace(/ \(.*\)/, ''))}">${icon('pin')}${esc(a)}</a>`).join('')}</div>
  </div>
</section>

<section class="section section--ink">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">${c.name} market overview</h2></div>
    </div>
    <div class="market reveal">${c.market.map(([k, v, s]) => `<div class="market__cell"><small>${k}</small><b>${v}</b><span>${s}</span></div>`).join('')}</div>
    <p class="lead reveal" style="margin-top:36px;max-width:72ch">${c.overview}</p>
  </div>
</section>

${local.length ? `<section class="section">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Listings in ${c.name}</h2></div>
      <a class="btn btn--ink" href="/listings/">All listings ${icon('arrow')}</a>
    </div>
    <div class="cards">${local.slice(0, 3).map((l) => card(l)).join('')}</div>
  </div>
</section>` : ''}

<section class="section ${local.length ? 'section--cream' : ''}">
  <div class="container container--narrow">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Frequently asked questions</h2></div>
    ${faqList(c.faq)}
  </div>
</section>`;
  return page({
    path: `/${slug}/`, title: `${c.title} For Sale | FSBO4u Philippines`, description: c.intro, body,
    jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  });
}

function cebu() {
  const areas = [
    ['Cebu City', 'Philippines’ second-largest city', '/cebu-city/'],
    ['Mactan Island', 'Beachfront and resort properties', '/listings/?q=Mactan'],
    ['Lapu-Lapu City', 'Gateway to Mactan Island', '/listings/?q=Lapu-Lapu'],
    ['Mandaue City', 'Industrial and residential hub', '/listings/?q=Mandaue'],
    ['Talisay City', 'South Cebu residential corridor', '/listings/?q=Talisay'],
    ['Liloan', 'North Cebu suburban living', '/listings/?q=Liloan'],
  ];
  const types = [['building', 'Condominiums', 'High-rise and mid-rise condo units across Cebu'], ['home', 'House & Lot', 'Residential houses in Cebu subdivisions'], ['waves', 'Beach Properties', 'Beachfront villas and resort properties in Cebu'], ['lot', 'Lot Only', 'Vacant lots and land for sale in Cebu']];
  const why = [['trend', 'Strong investment returns', 'Cebu’s real estate market has shown consistent appreciation, driven by tourism, BPO growth, and infrastructure development.'], ['globe', 'Strategic location', 'Cebu is the Philippines’ central hub with Mactan-Cebu International Airport connecting to major Asian cities.'], ['waves', 'World-class beaches', 'Mactan Island and surrounding areas offer beachfront properties with access to some of Asia’s best diving spots.'], ['building', 'Growing economy', 'Cebu’s IT-BPM sector, tourism industry, and manufacturing base drive strong demand for residential and commercial property.']];
  const local = listings.filter((l) => l.region === 'cebu');
  const body = `
<section class="page-hero page-hero--img">
  <div class="page-hero__img"><img src="/assets/img/listing-mactan.jpg" alt=""></div>
  <div class="container">
    ${crumbs([['Home', '/'], ['Listings', '/listings/'], ['Cebu real estate for sale']])}
    <div style="margin-top:28px">${eyebrow('Houses, condos, beach properties & lots')}</div>
    <h1 class="display-1">Cebu real estate for sale</h1>
    <p class="lead">Browse For Sale By Owner properties across all of Cebu — from Cebu City’s urban condominiums to Mactan’s beachfront villas and Cebu’s mountain retreats. Deal directly with sellers and save on commissions.</p>
    <div class="page-hero__actions"><a class="btn btn--gold btn--lg" href="/listings/?q=Cebu">Browse all Cebu listings ${icon('arrow')}</a><a class="btn btn--ghost btn--lg" href="/post-property/">List your Cebu property</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--split"><div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Browse by area in Cebu</h2></div><p class="lead reveal" style="max-width:40ch">Explore properties across Cebu’s cities and municipalities.</p></div>
    <div class="grid grid-3">${areas.map(([h, p, href], i) => `<a class="tile reveal" href="${href}"><span class="eyebrow" style="font-family:var(--serif);font-size:1.6rem;letter-spacing:0;color:var(--gold);font-style:italic">0${i + 1}</span><h3>${h}</h3><p>${p}</p><span class="tile__go">View properties ${icon('arrow')}</span></a>`).join('')}</div>
  </div>
</section>

<section class="section section--ink">
  <div class="container">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Property types in Cebu</h2></div>
    <div class="grid grid-4">${types.map(([ic, h, p]) => `<a class="tile reveal" href="/listings/?q=Cebu"><span class="ico">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></a>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container story">
    <div class="stack" style="--stack:1.25rem">
      
      <h2 class="display-2 reveal">Why invest in Cebu real estate?</h2>
      <div class="pro__list" style="margin-top:12px">${why.map(([ic, h, p]) => `<div class="tile reveal" style="grid-template-columns:auto 1fr;gap:6px 18px;padding:22px"><span class="ico ico--cream" style="grid-row:span 2">${icon(ic)}</span><h3 style="font-family:var(--sans);font-size:1.02rem;font-weight:600">${h}</h3><p>${p}</p></div>`).join('')}</div>
    </div>
    <div class="story__visual reveal"><div class="arch"><img src="/assets/img/listing-mactan.jpg" alt="Aerial view of a Cebu coastline" loading="lazy" style="object-position:30% 50%"></div><p class="story__quote"><b>2nd</b>largest urban centre in the Philippines.</p></div>
  </div>
</section>

${local.length ? `<section class="section section--cream"><div class="container"><div class="section-head section-head--split"><div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">Cebu listings</h2></div><a class="btn btn--ink" href="/listings/?q=Cebu">See all ${icon('arrow')}</a></div><div class="cards">${local.map((l) => card(l)).join('')}</div></div></section>` : ''}`;
  return page({ path: '/cebu-real-estate-for-sale/', title: 'Cebu Real Estate For Sale | Houses, Condos & Lots | FSBO4u', description: 'Browse For Sale By Owner houses, condos, beach properties and lots across Cebu — Cebu City, Mactan, Lapu-Lapu, Mandaue, Talisay and Liloan.', body });
}

export default function () {
  return [...Object.entries(cities).map(([s, c]) => cityPage(s, c)), cebu()];
}
