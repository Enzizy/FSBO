// Reusable homepage building blocks for the V2 / V3 design versions.
import { icon } from './layout.mjs';

export const searchConsole = (cls = '') => `
<form class="console ${cls}" action="/listings/" method="get" data-console>
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
</form>`;

export const calcPanel = () => `
<div class="calc__panel reveal" data-calc>
  <div class="calc__label"><label for="calc-price">Your property’s selling price</label><span>Commission <b data-out="rate">5%</b></span></div>
  <p class="calc__price" data-out="price" aria-live="polite">₱8,500,000</p>
  <input id="calc-price" class="range" type="range" min="1000000" max="50000000" step="100000" value="8500000" data-calc-range>
  <div class="range-ends"><span>₱1M</span><span>₱50M</span></div>
  <div class="calc__rates">
    <span class="muted">Typical agent rate</span>
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
</div>`;

export const steps = [
  ['camera', 'Post your property', 'Create your free listing in minutes. Add photos, set your price, and describe your property — no agent needed.'],
  ['users', 'Get discovered', 'Your listing reaches thousands of qualified buyers across the Philippines. Realtors and brokers can also connect with you.'],
  ['wallet', 'Close the deal', 'Negotiate directly with buyers, save on commissions, and close on your terms. We guide you every step of the way.'],
];

export const compareRows = [
  ['Listing fee', 'Free', 'Free'],
  ['Commission on sale', '3–5% + VAT', '₱0'],
  ['Who sets the price', 'Agent advises', 'You decide'],
  ['Talk to buyers directly', 'Through the agent', 'Always'],
  ['Exclusivity contract', 'Usually 3–6 months', 'None'],
  ['Listing goes live', 'Days', 'Minutes'],
];

export const compareTable = () => `
<div class="compare reveal" role="table" aria-label="FSBO4u compared with a traditional agent">
  <div class="compare__row compare__head" role="row"><span role="columnheader"></span><span role="columnheader" class="is-them">Traditional agent</span><span role="columnheader" class="is-us">FSBO4u</span></div>
  ${compareRows.map(([a, b, c]) => `<div class="compare__row" role="row"><span role="cell">${a}</span><span role="cell" class="is-them">${b}</span><span role="cell" class="is-us">${icon('check')}${c}</span></div>`).join('')}
</div>`;

export const proItems = [
  ['shield', 'Verified seller leads', 'Access motivated FSBO sellers actively looking for professional guidance.'],
  ['trend', 'Premium listing placement', 'Your listings appear at the top of search results across all Philippine cities.'],
  ['star', 'Agent profile & branding', 'Build your professional profile and showcase your track record to buyers and sellers.'],
];

export const regions = [
  ['metro-manila', 'Metro Manila', 'BGC, Makati, Quezon City, Alabang & beyond', '/metro-manila/', '/assets/img/hero-manila.jpg', 'NCR · 16 cities'],
  ['cebu', 'Cebu', 'City condos to Mactan beachfront', '/cebu-city/', '/assets/img/listing-mactan.jpg', 'Visayas'],
  ['davao', 'Davao City', 'Safe, green and fast-growing', '/davao-city/', '/assets/img/art-davao.svg', 'Mindanao'],
];
