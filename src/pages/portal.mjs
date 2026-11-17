import { page, icon, eyebrow, media, esc } from '../layout.mjs';
import { listings, peso, pesoShort } from '../data.mjs';

/* ---------- Auth ---------- */
function signIn() {
  const body = `
<section class="page-hero" style="text-align:center;padding-bottom:clamp(120px,12vw,170px)">
  <div class="container" style="display:grid;justify-items:center">
    ${eyebrow('Welcome back')}
    <h1 class="display-1" style="max-width:none">Sign in</h1>
    <p class="lead" style="margin-inline:auto">Choose how you’d like to sign in to your account.</p>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container container--narrow">
    <div class="portal-grid" style="margin-top:clamp(-110px,-9vw,-80px);position:relative">
      <a class="portal reveal" href="/seller/login/">
        <span class="ico ico--ink">${icon('home')}</span>
        <h2>Seller portal</h2>
        <p>Manage your property listings, view enquiries, and track viewings. Sign in with a one-time code sent to your email.</p>
        <span class="chip chip--gold" style="justify-self:start">${icon('mail')}Email code — no password needed</span>
        <span class="tile__go">Continue as seller ${icon('arrow')}</span>
      </a>
      <a class="portal portal--ink reveal" href="/admin/login/">
        <span class="ico">${icon('lock')}</span>
        <h2>Admin portal</h2>
        <p>Platform administration — manage listings, review enquiries, and access analytics.</p>
        <span class="chip" style="justify-self:start;border:1px solid var(--ink-line);color:var(--on-ink-2)">${icon('shield')}Admin access only</span>
        <span class="tile__go" style="color:var(--gold)">Continue as admin ${icon('arrow')}</span>
      </a>
    </div>
    <p class="center muted" style="margin-top:32px">Don’t have an account? <a class="link-arrow" href="/post-property/">List your property free — your first 30 days are on us ${icon('arrow')}</a></p>
  </div>
</section>`;
  return page({ path: '/sign-in/', title: 'Sign In | FSBO4u', description: 'Sign in to the FSBO4u seller or admin portal.', body, noindex: true });
}

function login(role) {
  const seller = role === 'seller';
  const body = `
<div class="auth">
  <div class="auth__art">
    <img class="auth__bg" src="/assets/img/${seller ? 'listing-mactan.jpg' : 'hero-manila.jpg'}" alt="">
    <a class="brand" href="/" aria-label="FSBO4u home"><img src="/assets/img/logo.png" alt="FSBO4u.com"></a>
    <div>
      <blockquote>${seller ? 'Manage your listings, enquiries and viewings in one place.' : 'FSBO4u administration'}</blockquote>
      <p style="color:var(--on-ink-2);margin-top:16px;max-width:40ch">${seller ? 'Manage listings, reply to buyers and schedule viewings — all in one place.' : 'Moderate listings, review enquiries and monitor platform health.'}</p>
    </div>
  </div>
  <div class="auth__form">
    <div class="auth__card" data-otp>
      <a href="/sign-in/" class="link-arrow" style="justify-self:start">${icon('arrowLeft')} All sign-in options</a>
      <div data-otp-step="email" class="stack" style="--stack:1.25rem">
        ${eyebrow(seller ? 'Seller dashboard' : 'Admin portal')}
        <h1>${seller ? 'Sign in to manage your listings' : 'Administrator sign in'}</h1>
        <p class="muted">${seller ? 'Enter the email address you used when posting your property. We’ll send you a 6-digit verification code.' : 'Enter your administrator email. A 6-digit code will be sent to verify it’s you.'}</p>
        <form class="stack" style="--stack:1rem" novalidate data-otp-email>
          <div class="field"><label for="email">Email address</label><div class="input-group">${icon('mail')}<input id="email" class="input" type="email" required autocomplete="email" placeholder="you@email.com"></div><span class="field__err">Please enter a valid email</span></div>
          <button class="btn btn--ink btn--lg btn--block" type="submit">Send verification code ${icon('arrow')}</button>
        </form>
      </div>
      <div data-otp-step="code" class="stack" style="--stack:1.25rem" hidden>
        ${eyebrow('Check your inbox')}
        <h1>Enter your 6-digit code</h1>
        <p class="muted">We sent a code to <b data-otp-to style="color:var(--text)"></b>. It expires in 10 minutes.</p>
        <form class="stack" style="--stack:1rem" data-otp-code data-go="/${role}/">
          <div class="otp" role="group" aria-label="Verification code">${Array.from({ length: 6 }, (_, i) => `<input inputmode="numeric" maxlength="1" aria-label="Digit ${i + 1}" autocomplete="${i === 0 ? 'one-time-code' : 'off'}">`).join('')}</div>
          <button class="btn btn--gold btn--lg btn--block" type="submit">Verify &amp; sign in ${icon('arrow')}</button>
          <p class="muted center" style="font-size:.88rem">Didn’t get it? <button type="button" class="link-arrow" data-otp-resend>Resend code</button></p>
        </form>
      </div>
      ${seller ? `<p class="muted" style="font-size:.9rem;border-top:1px solid var(--line);padding-top:20px">New to FSBO4u? <a class="link-arrow" href="/post-property/">Post a property ${icon('arrow')}</a></p>` : ''}
    </div>
  </div>
</div>`;
  return page({ path: `/${role}/login/`, title: `${seller ? 'Seller' : 'Admin'} Login — FSBO4u`, description: 'Sign in with a one-time email code.', body, chrome: false, scripts: ['portal.js'], noindex: true });
}

/* ---------- Dashboard shell ---------- */
const navs = {
  seller: [['Overview', '/seller/', 'layout'], ['My listings', '/seller/listings/', 'home', 3], ['Enquiries', '/seller/enquiries/', 'message', 4], ['Viewings', '/seller/viewings/', 'calendar', 2], ['Account', '/seller/account/', 'settings']],
  admin: [['Overview', '/admin/', 'layout'], ['Listings', '/admin/listings/', 'home', 5], ['Enquiries', '/admin/enquiries/', 'message', 12], ['Analytics', '/admin/analytics/', 'chart']],
};
function shell(role, path, title, sub, content, actions = '') {
  const isSeller = role === 'seller';
  const body = `
<div class="dash" data-dash>
  <aside class="dash__side" aria-label="Dashboard navigation">
    <a class="brand" href="/" aria-label="FSBO4u home"><img src="/assets/img/logo.png" alt="FSBO4u.com"></a>
    <div class="dash__role"><span class="avatar">${isSeller ? 'MD' : 'AD'}</span><div><b>${isSeller ? 'Maria Dela Cruz' : 'Admin team'}</b><span>${isSeller ? 'Seller · since 2025' : 'Administrator'}</span></div></div>
    <nav class="dash__nav"><small>${isSeller ? 'Seller' : 'Admin'}</small>${navs[role].map(([l, h, ic, c]) => `<a href="${h}" class="${h === path ? 'is-active' : ''}" ${h === path ? 'aria-current="page"' : ''}>${icon(ic)}${l}${c ? `<span class="count">${c}</span>` : ''}</a>`).join('')}</nav>
    <nav class="dash__nav dash__foot">${isSeller ? `<a href="/post-property/">${icon('plus')}New listing</a>` : ''}<a href="/">${icon('globe')}View website</a><a href="/sign-in/">${icon('logout')}Sign out</a></nav>
  </aside>
  <div class="dash__main">
    <header class="dash__top">
      <button class="icon-btn dash__menu" type="button" aria-label="Open navigation" data-dash-toggle>${icon('menu')}</button>
      <div class="input-group">${icon('search')}<label class="sr-only" for="dsearch">Search</label><input id="dsearch" class="input" placeholder="Search listings, buyers, messages…"></div>
      <span style="flex:1"></span>
      <button class="icon-btn" type="button" aria-label="Notifications" data-demo-click="You’re all caught up">${icon('bell')}<span class="badge">3</span></button>
      ${isSeller ? `<a class="btn btn--gold btn--sm hide-sm" href="/post-property/">${icon('plus')} New listing</a>` : ''}
    </header>
    <div class="dash__body">
      <div class="dash__title"><div><h1>${title}</h1><p>${sub}</p></div>${actions}</div>
      ${content}
    </div>
  </div>
</div>`;
  return page({ path, title: `${title} — FSBO4u ${isSeller ? 'Seller' : 'Admin'}`, description: 'FSBO4u dashboard', body, chrome: false, bodyClass: 'is-dash', scripts: ['portal.js'], noindex: true });
}

/* ---------- Charts (static SVG) ---------- */
function lineChart(series, labels, colors = ['#C9A84C', '#1A1A2E']) {
  const W = 640, H = 220, pad = { l: 36, r: 12, t: 12, b: 28 };
  const max = Math.ceil(Math.max(...series.flat()) / 50) * 50;
  const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / (labels.length - 1);
  const y = (v) => H - pad.b - (v / max) * (H - pad.t - pad.b);
  const grid = [0, .5, 1].map((f) => `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(max * f)}" y2="${y(max * f)}" stroke="#E8E0D0"/><text x="${pad.l - 8}" y="${y(max * f) + 4}" text-anchor="end">${Math.round(max * f)}</text>`).join('');
  const paths = series.map((s, k) => {
    const d = s.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    const area = k === 0 ? `<path d="${d} L${x(s.length - 1)} ${H - pad.b} L${x(0)} ${H - pad.b} Z" fill="url(#ga)" opacity=".5"/>` : '';
    return `${area}<path d="${d}" fill="none" stroke="${colors[k]}" stroke-width="${k ? 1.6 : 2.4}" ${k ? 'stroke-dasharray="4 4"' : ''} stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  const xl = labels.map((l, i) => i % 2 === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${l}</text>` : '').join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Chart"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A84C" stop-opacity=".45"/><stop offset="1" stop-color="#C9A84C" stop-opacity="0"/></linearGradient></defs>${grid}${paths}${xl}</svg>`;
}
const days = ['Nov 4', 'Nov 5', 'Nov 6', 'Nov 7', 'Nov 8', 'Nov 9', 'Nov 10', 'Nov 11', 'Nov 12', 'Nov 13', 'Nov 14', 'Nov 15', 'Nov 16', 'Nov 17'];
const kpi = (label, ic, value, delta, ink) => `<div class="kpi ${ink ? 'kpi--ink' : ''}"><div class="kpi__top">${label}${icon(ic)}</div><b>${value}</b><span class="kpi__delta">${icon('trend')}${delta}</span></div>`;
const thumb = (l) => `<div class="thumb"><img src="${media(l)}" alt=""><div><b>${esc(l.title)}</b><span>${esc(l.location)}</span></div></div>`;
const rowActs = `<div class="row-actions"><button type="button" aria-label="Edit" data-demo-click="Editor opens here">${icon('edit')}</button><button type="button" aria-label="More" data-demo-click="More actions">${icon('dots')}</button></div>`;

const buyers = [
  ['JR', 'Jose Ramos', 'modern-2br-unit-bgc-taguig', 'Hi! Is the unit still available? Can I view this Saturday?', '12 min ago', true],
  ['LT', 'Liza Tan', 'beachfront-villa-mactan-cebu', 'We’re an OFW family relocating to Cebu next year — is the price negotiable?', '2 h ago', true],
  ['KB', 'Kevin Bautista', 'modern-2br-unit-bgc-taguig', 'Does the sale include the furniture and the parking slot?', 'Yesterday', false],
  ['AG', 'Andrea Garcia', 'studio-unit-makati-cbd', 'Interested as a rental investment. What are the monthly dues?', 'Nov 14', false],
  ['RM', 'Rafael Mendoza', 'beachfront-villa-mactan-cebu', 'Can my lawyer review the title documents before the viewing?', 'Nov 12', false],
];
const L = (s) => listings.find((l) => l.slug === s);
const sellerListings = ['modern-2br-unit-bgc-taguig', 'beachfront-villa-mactan-cebu', 'studio-unit-makati-cbd'].map(L);

function sellerOverview() {
  const content = `
<div class="kpis">${kpi('Listing views', 'eye', '4,812', '+18% this week', true)}${kpi('Enquiries', 'message', '27', '+6 new')}${kpi('Saved by buyers', 'heart', '142', '+21%')}${kpi('Commission saved', 'wallet', pesoShort(Math.round((8500000 + 25000000 + 4200000) * 0.056)), 'vs 5% + VAT')}</div>
<div class="dgrid">
  <section class="dcard"><div class="dcard__head"><h2>Views — last 14 days</h2><div class="legend"><span><i style="background:var(--gold)"></i>This period</span><span><i style="background:var(--ink)"></i>Previous</span></div></div><div class="dcard__body">${lineChart([[180, 220, 210, 260, 300, 280, 340, 360, 330, 390, 420, 410, 470, 520], [160, 170, 190, 180, 210, 230, 220, 240, 250, 260, 255, 270, 280, 290]], days)}</div></section>
  <section class="dcard"><div class="dcard__head"><h2>Latest enquiries</h2><a class="link-arrow" href="/seller/enquiries/">All ${icon('arrow')}</a></div><ul class="feed">${buyers.slice(0, 4).map(([ini, n, s, m, t]) => `<li><span class="avatar">${ini}</span><div><b>${n}</b><span>${esc(L(s).title)}</span></div><time>${t}</time></li>`).join('')}</ul></section>
</div>
<section class="dcard"><div class="dcard__head"><h2>Your listings</h2><a class="link-arrow" href="/seller/listings/">Manage ${icon('arrow')}</a></div>
  <table class="dtable"><thead><tr><th>Property</th><th>Price</th><th>Status</th><th>Views</th><th>Enquiries</th><th></th></tr></thead><tbody>
  ${sellerListings.map((l, i) => `<tr><td>${thumb(l)}</td><td>${peso(l.price)}</td><td><span class="status ${i === 2 ? 'status--pending' : 'status--live'}">${i === 2 ? 'In review' : 'Live'}</span></td><td>${[2310, 1984, 518][i].toLocaleString()}</td><td>${[14, 11, 2][i]}</td><td>${rowActs}</td></tr>`).join('')}
  </tbody></table></section>`;
  return shell('seller', '/seller/', 'Magandang araw, Maria', 'Here’s how your listings are performing this week.', content, `<a class="btn btn--ink" href="/listings/modern-2br-unit-bgc-taguig/">${icon('eye')} View public listing</a>`);
}

function sellerListingsPage() {
  const content = `
<div class="dtabs" role="tablist" data-dtabs><button role="tab" aria-selected="true">All (3)</button><button role="tab" aria-selected="false">Live (2)</button><button role="tab" aria-selected="false">In review (1)</button><button role="tab" aria-selected="false">Drafts (0)</button></div>
<section class="dcard"><table class="dtable"><thead><tr><th>Property</th><th>Price</th><th>Status</th><th>Listed</th><th>Listing health</th><th></th></tr></thead><tbody>
${sellerListings.map((l, i) => `<tr><td>${thumb(l)}</td><td><b>${peso(l.price)}</b></td><td><span class="status ${i === 2 ? 'status--pending' : 'status--live'}">${i === 2 ? 'In review' : 'Live'}</span></td><td>${['Oct 02', 'Sep 18', 'Nov 15'][i]}</td><td style="min-width:160px"><div class="progress"><i style="width:${[92, 78, 54][i]}%"></i></div><span class="muted" style="font-size:.78rem">${[92, 78, 54][i]}% · ${['Great', 'Add 3 more photos', 'Add a floor plan'][i]}</span></td><td>${rowActs}</td></tr>`).join('')}
</tbody></table></section>`;
  return shell('seller', '/seller/listings/', 'My listings', 'Edit details, refresh photos and track listing health.', content, `<a class="btn btn--gold" href="/post-property/">${icon('plus')} New listing</a>`);
}

function inbox(role) {
  const sel = buyers[0];
  const content = `
<section class="dcard inbox" data-inbox>
  <div class="inbox__list" role="tablist" aria-label="Conversations">${buyers.map(([ini, n, s, m, t, unread], i) => `<button type="button" role="tab" aria-selected="${i === 0}" class="${unread ? 'unread' : ''}" data-msg="${esc(m)}" data-name="${n}" data-prop="${esc(L(s).title)}"><span class="row"><b>${n}</b><time>${t}</time></span><span>${esc(L(s).title)}</span><span>${esc(m)}</span></button>`).join('')}</div>
  <div class="inbox__thread">
    <div class="dcard__head"><div><h2 data-th-name>${sel[1]}</h2><span class="muted" style="font-size:.85rem" data-th-prop>${esc(L(sel[2]).title)}</span></div><div style="display:flex;gap:8px"><a class="btn btn--line btn--sm" href="/${role}/viewings/">${icon('calendar')} Schedule</a></div></div>
    <div class="inbox__msgs" data-th-msgs><div class="bubble"><span data-th-msg>${esc(sel[3])}</span><small>${sel[4]}</small></div></div>
    <form class="inbox__reply" data-reply><label class="sr-only" for="reply">Reply</label><input id="reply" class="input" placeholder="Write a reply…" autocomplete="off"><button class="btn btn--ink" type="submit">Send</button></form>
  </div>
</section>`;
  return content;
}

function sellerEnquiries() {
  return shell('seller', '/seller/enquiries/', 'Enquiries', 'Reply to buyers directly — no middleman.', inbox('seller'));
}

function sellerViewings() {
  const slots = [['Nov', 22, 'Jose Ramos', 'Modern 2BR Unit at BGC', 'Saturday · 10:00 AM', 'Confirmed'], ['Nov', 23, 'Liza Tan', 'Beachfront Villa in Mactan, Cebu', 'Sunday · 2:30 PM', 'Pending'], ['Nov', 29, 'Kevin Bautista', 'Modern 2BR Unit at BGC', 'Saturday · 4:00 PM', 'Requested']];
  const content = `
<div class="dgrid">
  <section class="slots">${slots.map(([m, d, n, p, t, s]) => `<div class="slot"><div class="slot__date"><small>${m}</small><b>${d}</b></div><div><b>${n}</b><br><span>${p} · ${t}</span></div><div style="display:flex;gap:8px;align-items:center"><span class="status ${s === 'Confirmed' ? 'status--live' : s === 'Pending' ? 'status--pending' : 'status--new'}">${s}</span>${s !== 'Confirmed' ? `<button class="btn btn--ink btn--sm" type="button" data-demo-click="Viewing confirmed — ${n} has been notified">Confirm</button>` : ''}</div></div>`).join('')}</section>
  <section class="dcard"><div class="dcard__head"><h2>Availability</h2></div><div class="dcard__body stack" style="--stack:1rem"><p class="muted">Buyers can request viewings during these windows.</p>
    <div class="checks">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => `<label class="check"><input type="checkbox" ${i > 4 ? 'checked' : ''}><span>${d}</span></label>`).join('')}</div>
    <div class="form-grid"><div class="field"><label for="from">From</label><input id="from" class="input" type="time" value="09:00"></div><div class="field"><label for="to">To</label><input id="to" class="input" type="time" value="17:00"></div></div>
    <button class="btn btn--gold" type="button" data-demo-click="Availability saved">Save availability</button></div></section>
</div>`;
  return shell('seller', '/seller/viewings/', 'Viewings', 'Upcoming property visits and your availability.', content);
}

function sellerAccount() {
  const content = `
<div class="dgrid">
  <form class="dcard" data-demo="Profile saved" novalidate><div class="dcard__head"><h2>Profile</h2></div><div class="dcard__body"><div class="form-grid">
    <div class="field"><label for="a-name">Full name</label><input id="a-name" class="input" value="Maria Dela Cruz" required></div>
    <div class="field"><label for="a-email">Email</label><input id="a-email" class="input" type="email" value="maria@example.com" required></div>
    <div class="field"><label for="a-phone">Mobile</label><input id="a-phone" class="input" value="+63 917 000 0000"></div>
    <div class="field"><label for="a-pref">Preferred contact</label><select id="a-pref" class="select"><option>Email</option><option>Viber</option><option>WhatsApp</option></select></div>
  </div><button class="btn btn--ink" type="submit" style="margin-top:20px">Save changes</button></div></form>
  <section class="dcard"><div class="dcard__head"><h2>Notifications</h2></div><div class="dcard__body stack" style="--stack:.75rem">
    ${['New enquiry', 'Viewing requests', 'Weekly performance report', 'Agent referral offers'].map((n, i) => `<label class="check" style="display:block"><input type="checkbox" ${i < 3 ? 'checked' : ''}><span>${n}</span></label>`).join('')}
  </div></section>
</div>`;
  return shell('seller', '/seller/account/', 'Account', 'Your profile and notification preferences.', content);
}

/* ---------- Admin ---------- */
function adminOverview() {
  const content = `
<div class="kpis">${kpi('Active listings', 'home', '10,214', '+312 this week', true)}${kpi('New enquiries', 'message', '1,486', '+9.4%')}${kpi('Registered buyers', 'users', '12,408', '+2.1%')}${kpi('Agent subscriptions', 'star', '538', '+14 this month')}</div>
<div class="dgrid">
  <section class="dcard"><div class="dcard__head"><h2>Traffic — last 14 days</h2><div class="legend"><span><i style="background:var(--gold)"></i>Sessions (×100)</span><span><i style="background:var(--ink)"></i>Enquiries</span></div></div><div class="dcard__body">${lineChart([[210, 240, 230, 280, 310, 300, 350, 380, 360, 400, 430, 420, 470, 500], [90, 110, 100, 120, 140, 130, 150, 160, 150, 170, 180, 175, 190, 205]], days)}</div></section>
  <section class="dcard"><div class="dcard__head"><h2>Moderation queue</h2><a class="link-arrow" href="/admin/listings/">Review ${icon('arrow')}</a></div><ul class="feed">${[['studio-unit-makati-cbd', 'New listing'], ['3br-townhouse-quezon-city', 'Agent verification'], ['residential-lot-davao-city', 'Photo report']].map(([s, w]) => `<li><img src="${media(L(s))}" alt="" style="width:40px;height:40px;border-radius:10px;object-fit:cover"><div><b>${esc(L(s).title)}</b><span>${w}</span></div><span class="status status--pending">Pending</span></li>`).join('')}</ul></section>
</div>
<section class="dcard"><div class="dcard__head"><h2>Top cities by enquiries</h2></div><div class="dcard__body"><ul class="hbar">${[['Metro Manila', 612], ['Cebu', 398], ['Davao City', 204], ['Laguna', 131], ['Pampanga', 88]].map(([c, v]) => `<li><span class="row"><span>${c}</span><b>${v}</b></span><span class="progress"><i style="width:${(v / 612) * 100}%"></i></span></li>`).join('')}</ul></div></section>`;
  return shell('admin', '/admin/', 'Platform overview', 'Monday, 17 November 2026', content, `<button class="btn btn--ink" type="button" data-demo-click="Report exported">${icon('upload')} Export report</button>`);
}

function adminListings() {
  const st = ['status--live', 'status--live', 'status--live', 'status--pending', 'status--pending', 'status--live'];
  const content = `
<div class="dtabs" role="tablist" data-dtabs><button role="tab" aria-selected="true">All</button><button role="tab" aria-selected="false">Pending review</button><button role="tab" aria-selected="false">Reported</button><button role="tab" aria-selected="false">Owner-direct</button><button role="tab" aria-selected="false">Agent</button></div>
<section class="dcard"><table class="dtable"><thead><tr><th>Property</th><th>Type</th><th>Price</th><th>Seller</th><th>Status</th><th></th></tr></thead><tbody>
${listings.map((l, i) => `<tr><td>${thumb(l)}</td><td>${esc(l.type)}</td><td>${peso(l.price)}</td><td>${l.seller === 'owner' ? 'Owner' : 'Agent'}</td><td><span class="status ${st[i]}">${st[i] === 'status--live' ? 'Live' : 'Pending'}</span></td><td><div class="row-actions">${st[i] === 'status--pending' ? `<button type="button" aria-label="Approve" data-demo-click="Listing approved">${icon('check')}</button><button type="button" aria-label="Reject" data-demo-click="Listing returned to seller">${icon('x')}</button>` : ''}<a href="/listings/${l.slug}/" aria-label="View">${icon('eye')}</a></div></td></tr>`).join('')}
</tbody></table></section>`;
  return shell('admin', '/admin/listings/', 'Listings', 'Review, approve and moderate every listing on the platform.', content);
}

function adminEnquiries() {
  return shell('admin', '/admin/enquiries/', 'Enquiries', 'Monitor buyer–seller conversations flagged for review.', inbox('admin'));
}

function adminAnalytics() {
  const content = `
<div class="kpis">${kpi('Sessions', 'eye', '48.2K', '+12%', true)}${kpi('Enquiry rate', 'percent', '3.1%', '+0.4 pts')}${kpi('Avg. time on listing', 'clock', '2m 48s', '+9s')}${kpi('New listings', 'plus', '1,204', '+7%')}</div>
<section class="dcard"><div class="dcard__head"><h2>Sessions vs enquiries</h2></div><div class="dcard__body">${lineChart([[210, 240, 230, 280, 310, 300, 350, 380, 360, 400, 430, 420, 470, 500], [90, 110, 100, 120, 140, 130, 150, 160, 150, 170, 180, 175, 190, 205]], days)}</div></section>
<div class="dgrid">
  <section class="dcard"><div class="dcard__head"><h2>Listings by type</h2></div><div class="dcard__body"><ul class="hbar">${[['Condominium', 41], ['House & Lot', 27], ['Lot Only', 14], ['Townhouse', 10], ['Beach Property', 5], ['Commercial', 3]].map(([c, v]) => `<li><span class="row"><span>${c}</span><b>${v}%</b></span><span class="progress"><i style="width:${(v / 41) * 100}%"></i></span></li>`).join('')}</ul></div></section>
  <section class="dcard"><div class="dcard__head"><h2>Traffic sources</h2></div><div class="dcard__body"><ul class="hbar">${[['Organic search', 46], ['Facebook', 24], ['Direct', 17], ['Partner network', 9], ['Email', 4]].map(([c, v]) => `<li><span class="row"><span>${c}</span><b>${v}%</b></span><span class="progress"><i style="width:${(v / 46) * 100}%"></i></span></li>`).join('')}</ul></div></section>
</div>`;
  return shell('admin', '/admin/analytics/', 'Analytics', 'Last 30 days · all regions', content, `<select class="select" style="width:auto;min-height:44px;border-radius:999px" aria-label="Date range"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select>`);
}

export default function () {
  return [signIn(), login('seller'), login('admin'), sellerOverview(), sellerListingsPage(), sellerEnquiries(), sellerViewings(), sellerAccount(), adminOverview(), adminListings(), adminEnquiries(), adminAnalytics()];
}
