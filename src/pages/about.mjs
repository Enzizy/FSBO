import { page, icon, eyebrow, crumbs } from '../layout.mjs';
import { site, team } from '../data.mjs';

export default function about() {
  const values = [
    ['eye', 'Transparency', 'No hidden fees, no surprise charges. What you see is what you pay.'],
    ['tag', 'Empowerment', 'We give sellers the tools professionals use — at a fraction of the cost.'],
    ['users', 'Community', 'Built for Filipinos, by people who understand the local market.'],
    ['shield', 'Trust', 'Verified listings, verified buyers, and verified professionals on every transaction.'],
  ];
  const body = `
<section class="page-hero page-hero--img">
  <div class="page-hero__img"><img src="/assets/img/hero-manila.jpg" alt=""></div>
  <div class="container">
    ${crumbs([['Home', '/'], ['About']])}
    <div style="margin-top:28px">${eyebrow('Our story')}</div>
    <h1 class="display-1">Empowering Filipinos to sell smarter</h1>
    <p class="lead">FSBO4u was built on a simple belief: property owners deserve to keep more of what they earn. No commissions, no middlemen — just direct connections between sellers and buyers.</p>
    <dl class="stats">
      <div class="stat"><dd class="stat__value">2021</dd><dt class="stat__label">Founded in Manila</dt></div>
      <div class="stat"><dd class="stat__value">₱<span data-count="12">0</span>B<sup>+</sup></dd><dt class="stat__label">Property value listed</dt></div>
      <div class="stat"><dd class="stat__value"><span data-count="42">0</span></dd><dt class="stat__label">Cities nationwide</dt></div>
      <div class="stat"><dd class="stat__value"><span data-count="8500">0</span><sup>+</sup></dd><dt class="stat__label">Successful connections</dt></div>
    </dl>
  </div>
</section>

<section class="section">
  <div class="container story">
    <div class="story__visual reveal">
      <div class="arch"><img src="/assets/img/listing-bgc.jpg" alt="A bright condominium living space" loading="lazy"></div>
      <p class="story__quote"><b>3–5%</b>of a property’s value is what Filipino sellers typically lose to commission.</p>
    </div>
    <div class="stack" style="--stack:1.25rem">
      
      <h2 class="display-2 reveal">Real estate, reimagined for the Philippines</h2>
      <p class="lead reveal">The Philippine real estate market is booming — but traditional commission structures mean sellers lose 3–5% of their property’s value on every transaction.</p>
      <p class="reveal" style="color:var(--text-2)">FSBO4u changes that. We built a platform where homeowners, investors, and developers can list directly, connect with verified buyers, and close deals on their own terms — with the option to bring in a licensed professional whenever they want one.</p>
      <a class="link-arrow reveal" href="/post-property/">List your property free ${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--center"><h2 class="display-2 reveal">Our values</h2></div>
    <div class="values">${values.map(([ic, h, p]) => `<div class="tile reveal"><span class="ico ico--ink">${icon(ic)}</span><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--split">
      <div class="stack" style="--stack:1rem"><h2 class="display-2 reveal">People who know Philippine real estate</h2></div>
    </div>
    <div class="team">${team.map((m) => `<article class="member reveal"><div class="member__portrait" role="img" aria-label="${m.name}"><span>${m.initials}</span></div><h3>${m.name}</h3><small>${m.role}</small><p>${m.bio}</p></article>`).join('')}</div>
  </div>
</section>

<section class="section section--ink" id="contact">
  <div class="container contact">
    <div>
      
      <h2 class="display-2" style="color:#fff;margin-top:18px">We’d love to hear from you</h2>
      <p class="lead" style="margin-top:18px">Whether you have a question about listing your property, our subscription plans, or just want to say hello — our team is here to help.</p>
      <ul class="contact__list">
        <li><span class="ico">${icon('mail')}</span><small>Email</small><a href="mailto:${site.email}">${site.email}</a></li>
        <li><span class="ico">${icon('phone')}</span><small>Phone · Viber · WhatsApp</small><a href="tel:${site.phoneHref}">${site.phone}</a></li>
        <li><span class="ico">${icon('pin')}</span><small>Office</small><b>${site.office}</b></li>
        <li><span class="ico">${icon('clock')}</span><small>Hours</small><b>${site.hours}</b></li>
      </ul>
    </div>
    <form class="panel" data-demo="Message sent — we typically respond within 1 business day" novalidate style="color:var(--text)">
      <h3 style="font-size:1.8rem">Send us a message</h3>
      <p class="muted" style="margin:6px 0 24px">We typically respond within 1 business day.</p>
      <div class="form-grid">
        <div class="field"><label for="ct-name">Full name <span class="req">*</span></label><input id="ct-name" class="input" required autocomplete="name"><span class="field__err">Please enter your name</span></div>
        <div class="field"><label for="ct-email">Email address <span class="req">*</span></label><input id="ct-email" class="input" type="email" required autocomplete="email"><span class="field__err">Please enter a valid email</span></div>
        <div class="field span-2"><label for="ct-topic">Topic</label><select id="ct-topic" class="select"><option value="">Select a topic…</option><option>General inquiry</option><option>Listing my property</option><option>Subscription plans</option><option>Technical support</option><option>Partnership</option><option>Press / media</option></select></div>
        <div class="field span-2"><label for="ct-msg">Message <span class="req">*</span></label><textarea id="ct-msg" class="textarea" required></textarea><span class="field__err">Please write a message</span></div>
      </div>
      <button class="btn btn--gold btn--lg" type="submit" style="margin-top:22px">Send message ${icon('arrow')}</button>
    </form>
  </div>
</section>`;
  return page({ path: '/about/', active: '/about/', title: 'About FSBO4u | Philippine Real Estate Without the Commission', description: 'FSBO4u helps Filipino homeowners sell property directly to buyers — no commissions, no middlemen. Meet the team and get in touch.', body });
}
