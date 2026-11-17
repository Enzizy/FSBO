import { page, icon, eyebrow, faqList, esc } from '../layout.mjs';
import { plans, planFaq } from '../data.mjs';

export default function plansPage() {
  const rows = [
    ['Active listings', 'Up to 5', 'Up to 25', 'Unlimited'],
    ['Listing page', 'Basic', 'Premium', 'Premium + video'],
    ['Photo uploads per listing', '8', '20', 'Unlimited'],
    ['Inquiry notifications', 'Email', 'Email & SMS', 'Email, SMS & push'],
    ['Contact form on listings', true, true, true],
    ['FSBO4u badge', 'Agent', 'Verified agent', 'Verified broker'],
    ['Featured listing placement', false, true, true],
    ['Search ranking', 'Standard', 'Priority', 'Top'],
    ['Analytics', false, 'Dashboard', 'Advanced + reports'],
    ['Dedicated account manager', false, false, true],
    ['Social media promotion', false, false, true],
    ['Verified broker seal', false, false, true],
  ];
  const cell = (v) => v === true ? icon('check') : v === false ? `<span class="no" aria-label="Not included">—</span>` : esc(v);
  const why = [
    ['camera', 'High-quality listing pages', 'Showcase properties with rich photo galleries, floor plans, and virtual tour links that convert browsers into buyers.'],
    ['bell', 'Instant lead alerts', 'Get notified the moment a buyer inquires — via email, SMS, or push notification — so you never miss a hot lead.'],
    ['chart', 'Performance analytics', 'Track listing views, inquiry rates, and buyer demographics to optimize your listings and close deals faster.'],
    ['shield', 'Verified professional badge', 'Build trust with buyers through your PRC-verified agent or broker badge displayed prominently on all your listings.'],
    ['trend', 'Priority search placement', 'Your listings appear at the top of relevant searches, giving you a competitive edge over unsubscribed listings.'],
    ['users', 'Dedicated support', 'Our Philippine-based support team understands the local market and is ready to help you succeed.'],
  ];

  const body = `
<section class="page-hero" style="padding-bottom:clamp(140px,14vw,200px);text-align:center">
  <div class="container" style="display:grid;justify-items:center">
    ${eyebrow('For licensed real estate professionals')}
    <h1 class="display-1" style="max-width:16ch">Grow your business without the commission cut</h1>
    <p class="lead" style="margin-inline:auto">Connect directly with motivated buyers and sellers across the Philippines. No middlemen, no split commissions — just more deals.</p>
    <div class="billing" role="group" aria-label="Billing period" data-billing>
      <button type="button" data-period="monthly" aria-pressed="true">Monthly</button>
      <button type="button" data-period="annual" aria-pressed="false">Annual <span class="save">Save 23%</span></button>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="plans">
      ${plans.map((p) => `
      <article class="plan ${p.id === 'pro' ? 'plan--featured' : ''} reveal">
        ${p.badge ? `<span class="plan__badge">${p.badge}</span>` : ''}
        <h3>${p.name}</h3>
        <p class="plan__blurb">${p.blurb}</p>
        <p class="plan__price"><small>₱</small><b data-price data-monthly="${p.monthly}">${p.monthly.toLocaleString('en-PH')}</b><span>/mo</span></p>
        <p class="plan__bill" data-bill>Billed monthly · cancel anytime</p>
        <a class="btn ${p.id === 'pro' ? 'btn--gold' : 'btn--ink'} btn--block" href="/seller/login/">${p.cta} ${icon('arrow')}</a>
        <p class="plan__pay"><span>GCash</span><span>Maya</span><span>Visa / Mastercard</span></p>
        <ul>${p.features.map((f) => `<li>${icon('check')}${f}</li>`).join('')}${p.excluded.map((f) => `<li class="is-off">${icon('x')}${f}</li>`).join('')}</ul>
      </article>`).join('')}
    </div>
    <p class="center muted" style="margin-top:28px;font-size:.9rem">No credit card required for Starter trial · Cancel anytime · PRC license required for Professional &amp; Broker Elite</p>
  </div>
</section>

<section class="section section--ink section--tight">
  <div class="container">
    <dl class="stats" style="margin-top:0;border-top:0">
      <div class="stat reveal"><dd class="stat__value"><span data-count="12000">0</span><sup>+</sup></dd><dt class="stat__label">Registered buyers</dt></div>
      <div class="stat reveal"><dd class="stat__value"><span data-count="3500">0</span><sup>+</sup></dd><dt class="stat__label">Active listings</dt></div>
      <div class="stat reveal"><dd class="stat__value"><span data-count="42">0</span></dd><dt class="stat__label">Cities covered</dt></div>
      <div class="stat reveal"><dd class="stat__value">4.8<sup>/5</sup></dd><dt class="stat__label">Agent satisfaction</dt></div>
    </dl>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Built for the Philippine market</h2></div>
    <div class="grid grid-3">${why.map(([ic, h, p]) => `<div class="tile reveal"><span class="ico ico--ink">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section section--cream" id="compare">
  <div class="container">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Full feature comparison</h2></div>
    <div class="table-wrap reveal">
      <table class="ctable">
        <thead><tr><th scope="col">Feature</th>${plans.map((p) => `<th scope="col" class="${p.id === 'pro' ? 'is-pro' : ''}">${p.name}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(([f, ...v]) => `<tr><th scope="row" style="font-weight:500">${f}</th>${v.map((x, i) => `<td class="${i === 1 ? 'is-pro' : ''}">${cell(x)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container container--narrow">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Common questions</h2></div>
    ${faqList(planFaq)}
  </div>
</section>`;
  return page({ path: '/subscription-plans/', active: '/subscription-plans/', title: 'Plans for Agents & Brokers | FSBO4u Philippines', description: 'Subscription plans for licensed Philippine real estate agents and brokers. Featured placement, verified badges, lead alerts and analytics from ₱499/month.', body, scripts: ['plans.js'] });
}
