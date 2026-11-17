import { page, icon, eyebrow, crumbs, typeIcon } from '../layout.mjs';
import { propertyTypes } from '../data.mjs';

export default function post() {
  const steps = ['Property', 'Location', 'Pricing', 'Features', 'Photos', 'Contact'];
  const amenities = ['Swimming pool', 'Gym', '24/7 security', 'Parking', 'Garden', 'Balcony', 'Furnished', 'Pet-friendly', 'Near school', 'Near mall', 'Flood-free', 'Sea view'];
  const body = `
<section class="page-hero">
  <div class="container">
    ${crumbs([['Home', '/'], ['Post property']])}
    <div style="margin-top:28px">${eyebrow('Free listing')}</div>
    <h1 class="display-1">Post your property</h1>
    <p class="lead">Reach thousands of buyers across the Philippines — no agent, no commission. Most owners finish in under 10 minutes.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container wizard">
    <form class="panel" data-wizard novalidate>
      <ol class="stepper" aria-label="Progress">${steps.map((s, i) => `<li class="${i === 0 ? 'is-current' : ''}" data-stepper="${i}">${s}</li>`).join('')}</ol>

      <fieldset class="wizard__step is-active" data-step="0" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>Tell us about your property</h2><span>Step 1 of 6</span></div>
        <div class="field"><label for="p-title">Listing title <span class="req">*</span></label><input id="p-title" class="input" name="title" maxlength="100" placeholder="e.g. Sunny 2BR corner unit near Ayala" required data-preview="title"><span class="field__hint"><span>A clear, specific title gets more views.</span><span data-counter="title">0/100</span></span><span class="field__err">Please add a title</span></div>
        <div class="field"><span class="field__label">Property type <span class="req">*</span></span>
          <div class="choice-grid">${propertyTypes.map((t, i) => `<label class="choice"><input type="radio" name="type" value="${t}" ${i === 0 ? 'checked' : ''} data-preview="type"><span>${icon(typeIcon(t))}${t.replace('&', '&amp;')}</span></label>`).join('')}</div>
        </div>
        <div class="field"><span class="field__label">Listing status <span class="req">*</span></span>
          <div class="choice-grid">${['For Sale', 'For Rent', 'For Lease'].map((t, i) => `<label class="choice choice--inline"><input type="radio" name="status" value="${t}" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>
        </div>
        <div class="field"><label for="p-desc">Property description <span class="req">*</span></label><textarea id="p-desc" class="textarea" name="desc" maxlength="1500" placeholder="What makes your property special? Mention the view, the neighbourhood, recent renovations…" required></textarea><span class="field__hint"><span>Tip: buyers love details about light, layout and the commute.</span><span data-counter="desc">0/1500</span></span><span class="field__err">Please describe your property</span></div>
      </fieldset>

      <fieldset class="wizard__step" data-step="1" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>Where is it?</h2><span>Step 2 of 6</span></div>
        <div class="form-grid">
          <div class="field"><label for="p-region">Region <span class="req">*</span></label><select id="p-region" class="select" name="region" required><option value="">Select region…</option><option>Metro Manila (NCR)</option><option>Central Visayas (Cebu)</option><option>Davao Region</option><option>CALABARZON</option><option>Central Luzon</option><option>Western Visayas</option><option>Other</option></select><span class="field__err">Please choose a region</span></div>
          <div class="field"><label for="p-city">City / municipality <span class="req">*</span></label><input id="p-city" class="input" name="city" placeholder="e.g. Makati" required data-preview="city"><span class="field__err">Please enter a city</span></div>
          <div class="field"><label for="p-brgy">Barangay / village</label><input id="p-brgy" class="input" name="brgy" placeholder="e.g. Bel-Air" data-preview="brgy"></div>
          <div class="field"><label for="p-zip">ZIP code</label><input id="p-zip" class="input" name="zip" inputmode="numeric" maxlength="4" placeholder="1209"></div>
          <div class="field span-2"><label for="p-addr">Street address <span class="muted" style="text-transform:none;letter-spacing:0">(only shared with buyers you approve)</span></label><input id="p-addr" class="input" name="addr" placeholder="Building, street, unit no."></div>
        </div>
      </fieldset>

      <fieldset class="wizard__step" data-step="2" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>Set your price</h2><span>Step 3 of 6</span></div>
        <div class="field"><label for="p-price">Asking price <span class="req">*</span></label><div class="input-group"><span class="prefix">₱</span><input id="p-price" class="input" name="price" inputmode="numeric" placeholder="8,500,000" required data-money data-preview="price" style="font-family:var(--serif);font-size:1.4rem"></div><span class="field__err">Please enter an asking price</span></div>
        <div class="note" data-save-note hidden>${icon('info')}<span>Selling through an agent at 5% + VAT would cost you about <b data-save-amt></b>. On FSBO4u, you keep it.</span></div>
        <div class="checks">
          <label class="check"><input type="checkbox" name="negotiable" checked><span>Price negotiable</span></label>
          <label class="check"><input type="checkbox" name="bank"><span>Bank financing OK</span></label>
          <label class="check"><input type="checkbox" name="pagibig"><span>Pag-IBIG accepted</span></label>
          <label class="check"><input type="checkbox" name="installment"><span>In-house installment</span></label>
        </div>
      </fieldset>

      <fieldset class="wizard__step" data-step="3" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>Features &amp; size</h2><span>Step 4 of 6</span></div>
        <div class="form-grid">
          <div class="field"><label for="p-beds">Bedrooms</label><select id="p-beds" class="select" name="beds" data-preview="beds"><option value="0">Studio / none</option>${[1, 2, 3, 4, 5, 6].map((n) => `<option ${n === 2 ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
          <div class="field"><label for="p-baths">Bathrooms</label><select id="p-baths" class="select" name="baths" data-preview="baths"><option value="0">None</option>${[1, 2, 3, 4, 5].map((n) => `<option ${n === 1 ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
          <div class="field"><label for="p-area">Floor / lot area (sqm) <span class="req">*</span></label><input id="p-area" class="input" name="area" inputmode="numeric" placeholder="65" required data-preview="area"><span class="field__err">Please enter the area</span></div>
          <div class="field"><label for="p-park">Parking slots</label><select id="p-park" class="select" name="parking"><option>0</option><option selected>1</option><option>2</option><option>3+</option></select></div>
        </div>
        <div class="field"><span class="field__label">Amenities &amp; highlights</span><div class="checks">${amenities.map((a) => `<label class="check"><input type="checkbox" name="amenity" value="${a}"><span>${a}</span></label>`).join('')}</div></div>
      </fieldset>

      <fieldset class="wizard__step" data-step="4" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>Add photos</h2><span>Step 5 of 6</span></div>
        <label class="dropzone" data-dropzone>
          <span class="ico ico--cream">${icon('upload')}</span>
          <b>Drag photos here or <span style="color:var(--gold-ink);text-decoration:underline">browse</span></b>
          <span class="muted" style="font-size:.88rem">JPG or PNG, up to 20 photos. The first photo becomes your cover.</span>
          <input type="file" accept="image/*" multiple hidden data-files>
        </label>
        <div class="thumbs" data-thumbs></div>
        <div class="note">${icon('info')}<span>Listings with 8+ bright, landscape photos get up to 3× more enquiries.</span></div>
      </fieldset>

      <fieldset class="wizard__step" data-step="5" style="border:0;padding:0;margin:0">
        <div class="wizard__title"><h2>How should buyers reach you?</h2><span>Step 6 of 6</span></div>
        <div class="form-grid">
          <div class="field"><label for="p-name">Full name <span class="req">*</span></label><input id="p-name" class="input" name="name" required autocomplete="name"><span class="field__err">Please enter your name</span></div>
          <div class="field"><label for="p-email">Email <span class="req">*</span></label><input id="p-email" class="input" type="email" name="email" required autocomplete="email"><span class="field__err">Please enter a valid email</span></div>
          <div class="field"><label for="p-phone">Mobile number</label><input id="p-phone" class="input" type="tel" name="phone" placeholder="+63 9XX XXX XXXX" autocomplete="tel"></div>
          <div class="field"><label for="p-pref">Preferred contact</label><select id="p-pref" class="select" name="pref"><option>Email</option><option>Phone call</option><option>Viber</option><option>WhatsApp</option></select></div>
        </div>
        <label class="check" style="display:block"><input type="checkbox" name="agents" checked><span>Allow verified agents to contact me with buyer referrals</span></label>
        <p class="muted" style="font-size:.85rem">By publishing you agree to our <a href="/terms/" style="text-decoration:underline">Terms</a> and <a href="/privacy/" style="text-decoration:underline">Privacy Policy</a>. We’ll email you a one-time code to manage your listing — no password needed.</p>
      </fieldset>

      <div class="success wizard__step" data-step="6">
        <span class="ico">${icon('check')}</span>
        <h2 class="display-3">Check your email to publish your listing</h2>
        <p class="lead" style="margin:14px auto 26px">We’ve sent a verification code to your email. Confirm it and your property goes live to thousands of buyers.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn btn--gold" href="/seller/login/">Verify &amp; open dashboard ${icon('arrow')}</a><a class="btn btn--line" href="/listings/">Browse listings</a></div>
      </div>

      <div class="wizard__nav" data-wizard-nav>
        <button class="btn btn--line" type="button" data-prev disabled>${icon('arrowLeft')} Back</button>
        <button class="btn btn--ink" type="button" data-next>Continue ${icon('arrow')}</button>
      </div>
    </form>

    <aside class="preview">
      <p class="preview__label">Live preview</p>
      <article class="card" style="pointer-events:none">
        <div class="card__media card__media--art"><img src="/assets/img/art-house.svg" alt="" data-pv-img><span class="chip chip--glass" data-pv-type>Condominium</span><span class="seal">Owner-direct</span></div>
        <div class="card__body">
          <div class="card__row"><p class="card__price" data-pv-price>₱ —</p></div>
          <h3 class="card__title" data-pv-title>Your listing title</h3>
          <p class="card__loc">${icon('pin')}<span data-pv-loc>City, Philippines</span></p>
          <ul class="specs"><li>${icon('bed')}<b data-pv-beds>2</b> Beds</li><li>${icon('bath')}<b data-pv-baths>1</b> Baths</li><li>${icon('area')}<b data-pv-area>—</b> sqm</li></ul>
        </div>
      </article>
      <ul class="perks">
        <li><span class="ico ico--ink">${icon('tag')}</span><div><b>Free to list</b><span>No hidden fees, ever</span></div></li>
        <li><span class="ico ico--ink">${icon('shield')}</span><div><b>Verified buyers</b><span>Serious enquiries only</span></div></li>
        <li><span class="ico ico--ink">${icon('wallet')}</span><div><b>No commission</b><span>Keep 100% of your sale</span></div></li>
      </ul>
    </aside>
  </div>
</section>`;
  return page({ path: '/post-property/', active: '/post-property/', title: 'Post Your Property for Free | FSBO4u Philippines', description: 'List your Philippine property for free in minutes. Reach thousands of buyers — no agent, no commission.', body, scripts: ['post.js'] });
}
