import { page, icon, eyebrow, crumbs, card } from '../layout.mjs';
import { listings, site } from '../data.mjs';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function legal({ path, title, h1, intro, updated, sections, metaTitle, description }) {
  const body = `
<section class="page-hero">
  <div class="container">
    ${crumbs([['Home', '/'], [title]])}
    <div style="margin-top:28px">${eyebrow('Legal · Last updated ' + updated)}</div>
    <h1 class="display-1">${h1}</h1>
    <p class="lead">${intro}</p>
  </div>
</section>
<section class="section">
  <div class="container legal">
    <nav class="toc" aria-label="On this page" data-toc>
      <h2>On this page</h2>
      <ol>${sections.map(([h]) => `<li><a href="#${slugify(h)}">${h}</a></li>`).join('')}</ol>
    </nav>
    <article class="prose">
      ${sections.map(([h, html]) => `<h2 id="${slugify(h)}">${h}</h2>${html}`).join('\n')}
      <div class="note" style="margin-top:48px">${icon('info')}<span>Questions about this policy? Email <a href="mailto:${site.email}">${site.email}</a> or write to us at ${site.office}.</span></div>
    </article>
  </div>
</section>`;
  return page({ path, title: metaTitle, description, body });
}

function privacy() {
  return legal({
    path: '/privacy/', title: 'Privacy policy', metaTitle: 'Privacy Policy | FSBO4u', updated: 'July 2026',
    h1: 'Privacy notice.',
    description: 'How FSBO4u collects, uses, shares and protects your personal information.',
    intro: 'We value the privacy of everyone who uses FSBO4u. This notice explains what personal information we collect, how we use and share it, and the choices you have.',
    sections: [
      ['Scope of this notice', '<p>This Privacy Notice applies to fsbo4u.com and related services (our “Services”). By using our Services, you agree to the collection, use, disclosure, and processing of your information as described here. Personal information is information that identifies, or could be used to identify, a specific person. It does not include de-identified or aggregated information.</p>'],
      ['Information you provide', '<h3>Registration information</h3><p>When you create an account or sign up for updates, we may ask for basic contact details such as your name, email address, phone number and mailing address.</p><h3>Communications</h3><p>If you contact us, we keep your contact details and the contents of your message so we can respond and verify your identity.</p><h3>Listings and user content</h3><p>Property details, photos and descriptions you publish are shared publicly on the Services. Your exact street address is only shared with buyers you approve.</p><h3>Payment information</h3><p>Subscription payments are processed by third-party payment providers (such as GCash, Maya and card networks) acting on our behalf.</p>'],
      ['Information collected automatically', '<h3>Device information</h3><p>IP address, browser type, operating system version and device identifiers.</p><h3>Usage information</h3><p>Pages and listings you view, searches you run, session length and crash reports — used to understand and improve the Services.</p><h3>Cookies</h3><p>We use essential cookies to run the site. Analytics and advertising cookies are only set with your consent, which you can change at any time.</p>'],
      ['How we use information', '<ul><li>To provide, maintain and improve the Services</li><li>To connect buyers with sellers and verified professionals</li><li>To process subscriptions and payments</li><li>To communicate with you and provide support</li><li>To detect and prevent fraud, spam and abuse</li><li>For marketing, where permitted and with your consent</li></ul>'],
      ['How we share information', '<p>We share information with the sellers or agents you choose to contact, with service providers who help us operate the Services, with our network partner ' + site.partner + ' where you request it, and where required by law. We do not sell your personal information.</p>'],
      ['Your rights & choices', '<p>Under the Philippine Data Privacy Act of 2012 (RA 10173), you have the right to be informed, to access, to correct, to object, to erasure or blocking, and to data portability. You can unsubscribe from marketing emails at any time using the link in each message.</p>'],
      ['Data security & retention', '<p>We use administrative, technical and physical safeguards to protect your information, and keep it only as long as needed for the purposes described in this notice or as required by law.</p>'],
      ['Changes to this notice', '<p>We may update this notice from time to time. Material changes will be announced by email or a notice on the site before they take effect.</p>'],
    ],
  });
}

function terms() {
  return legal({
    path: '/terms/', title: 'Terms of service', metaTitle: 'Terms of Use | FSBO4u', updated: 'July 2026',
    h1: 'Terms of use.',
    description: 'The terms that govern your use of fsbo4u.com and FSBO4u services.',
    intro: 'These terms are an agreement between FSBO4u and the people who use our sites and services. Please read them carefully — by using FSBO4u, you agree to them.',
    sections: [
      ['General terms', '<p>FSBO4u owns and operates fsbo4u.com and related sites (the “Sites”) and provides offerings, information and resources related to property listings (the “Services”). Subject to your ongoing compliance with these Terms, we grant you a limited, revocable right to access and use the Sites for their intended purposes. If you use the Sites on behalf of a business, you confirm you have authority to bind it.</p><p><strong>If you are under 18</strong>, a parent or legal guardian must read and consent to these Terms before you use the Sites.</p>'],
      ['Changes to the terms', '<p>We may update these Terms at any time. Changes take effect the first time you use the Sites with notice of the change, or 30 days after they are posted — whichever comes first. For material changes we will make reasonable efforts to notify you, for example by email or an on-site notice.</p>'],
      ['Accounts & security', '<p>Some features require an account. You are responsible for keeping your account and one-time sign-in codes confidential, for activity under your account, and for telling us immediately about any unauthorised use.</p>'],
      ['Listings & your content', '<p>You are responsible for the accuracy of the listings and content you post, and you confirm you have the right to sell, rent or lease the property listed. You grant FSBO4u a licence to display and promote your listing on the Sites and partner channels.</p>'],
      ['Prohibited conduct', '<ul><li>Posting false, misleading or duplicate listings</li><li>Listing property you do not own or are not authorised to market</li><li>Harvesting user data, spamming or harassing other users</li><li>Circumventing account access controls or security features</li></ul>'],
      ['Fees & subscriptions', '<p>Listing a property as an owner is free. Professional subscription plans are billed monthly or annually in advance and may be cancelled at any time; cancellations take effect at the end of the current billing period.</p>'],
      ['Disclaimers', '<p>FSBO4u is a listing platform and is not a party to any transaction between buyers and sellers. We do not verify every listing detail and recommend independent title verification and legal advice before any purchase. The Sites are provided “as is”.</p>'],
      ['Limitation of liability', '<p>To the fullest extent permitted by law, FSBO4u is not liable for indirect, incidental or consequential damages arising from your use of the Sites or any transaction you enter into through them.</p>'],
      ['Governing law', '<p>These Terms are governed by the laws of the Republic of the Philippines.</p>'],
    ],
  });
}

function blog() {
  const posts = [
    ['Selling', 'The FSBO seller’s checklist: from title to Deed of Absolute Sale', 'Every document you need — and the order to get them in — to sell your Philippine property without an agent.', 'listing-bgc.jpg', '8 min'],
    ['Pricing', 'How to price your property in Metro Manila, Cebu and Davao', 'Use comparable listings, zonal values and price-per-sqm to land on an asking price that sells.', 'hero-manila.jpg', '6 min'],
    ['Taxes', 'Capital gains tax, DST and transfer fees, explained simply', 'Who pays what when a Philippine property changes hands — with a worked example.', 'art-lot.svg', '5 min'],
    ['Photography', 'Phone photos that sell: a 10-minute shoot plan', 'Light, angles and order — the photos that get 3× more enquiries.', 'listing-mactan.jpg', '4 min'],
    ['Buyers', 'Can foreigners buy property in the Philippines?', 'Condo ownership, the 40% rule, long-term leases and what OFW families should know.', 'art-house.svg', '7 min'],
  ];
  const [f, ...rest] = posts;
  const body = `
<section class="page-hero">
  <div class="container">
    ${crumbs([['Home', '/'], ['Blog']])}
    <div style="margin-top:28px">${eyebrow('The FSBO4u Journal')}</div>
    <h1 class="display-1">FSBO4u Blog</h1>
    <p class="lead">Practical guides and tips for Filipino homeowners selling property on their own terms — no agent required.</p>
    <form class="newsletter" data-demo="You’re on the list — first guide lands soon" novalidate>
      <div class="field" style="flex:1"><label class="sr-only" for="nl">Email</label><input id="nl" class="input" type="email" placeholder="Your email address" required></div>
      <button class="btn btn--gold" type="submit">Get new guides</button>
    </form>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="note" style="margin-bottom:32px">${icon('info')}<span>The blog launches soon. The articles below are the planned launch topics, shown here to preview the editorial layout.</span></div>
    <a class="post-feature reveal" href="#" aria-disabled="true">
      <div class="post-feature__img"><img src="/assets/img/${f[3]}" alt="" loading="lazy"><span class="soon">Coming soon</span></div>
      <div class="post-feature__body">${eyebrow(f[0])}<h2>${f[1]}</h2><p style="color:var(--on-ink-2)">${f[2]}</p><span class="post__meta" style="color:var(--on-ink-3)">${icon('clock')} ${f[4]} read</span></div>
    </a>
    <div class="grid grid-4" style="margin-top:40px">${rest.map(([cat, h, p, img, t]) => `<article class="post reveal"><div class="post__img"><img src="/assets/img/${img}" alt="" loading="lazy"><span class="soon">Coming soon</span></div><p class="post__meta"><span class="chip chip--gold">${cat}</span>${t} read</p><h3>${h}</h3><p>${p}</p></article>`).join('')}</div>
  </div>
</section>`;
  return page({ path: '/blog/', active: '/blog/', title: 'Real Estate Tips & FSBO Guides | FSBO4u Blog', description: 'Practical guides and tips for Filipino homeowners selling property on their own terms — no agent required.', body });
}

function favorites() {
  const body = `
<section class="page-hero">
  <div class="container">
    ${crumbs([['Home', '/'], ['Saved properties']])}
    <div style="margin-top:28px">${eyebrow('Your shortlist')}</div>
    <h1 class="display-1">Saved properties</h1>
    <dl class="stats" style="max-width:560px;grid-template-columns:repeat(2,1fr)">
      <div class="stat"><dd class="stat__value" data-fav-total>0</dd><dt class="stat__label">Properties saved</dt></div>
      <div class="stat"><dd class="stat__value" data-fav-sum>—</dd><dt class="stat__label">Combined value</dt></div>
    </dl>
  </div>
</section>
<section class="section section--tight">
  <div class="container">
    <div class="result-bar"><h2>Compare your favourites</h2><button class="btn btn--line btn--sm" type="button" data-fav-clear hidden>${icon('trash')} Clear all</button></div>
    <div class="cards" data-fav-grid>${listings.map((l) => card(l, { hidden: true, reveal: false })).join('')}</div>
    <div class="empty" data-fav-empty>
      <span class="ico ico--cream">${icon('heart')}</span>
      <h3>No saved properties yet</h3>
      <p>Tap the heart on any listing to save it here for easy comparison later. Your shortlist is stored on this device.</p>
      <a class="btn btn--ink" href="/listings/">Browse listings ${icon('arrow')}</a>
    </div>
  </div>
</section>`;
  return page({ path: '/favorites/', title: 'Saved Properties | FSBO4u Philippines', description: 'Your shortlist of saved FSBO4u properties.', body, noindex: true });
}

function notFound() {
  const body = `
<section class="page-hero" style="min-height:70vh;display:grid;align-items:center;text-align:center">
  <div class="container" style="display:grid;justify-items:center">
    ${eyebrow('Error 404')}
    <h1 class="display-1" style="max-width:none">Page not found</h1>
    <p class="lead" style="margin-inline:auto">The page you’re looking for has moved or no longer exists. Let’s get you back home.</p>
    <div class="page-hero__actions"><a class="btn btn--gold btn--lg" href="/">Back to home ${icon('arrow')}</a><a class="btn btn--ghost btn--lg" href="/listings/">Browse listings</a></div>
  </div>
</section>`;
  return page({ path: '/404', title: 'Page not found | FSBO4u', description: 'Page not found.', body, noindex: true });
}

export default function () { return [privacy(), terms(), blog(), favorites(), notFound()]; }
