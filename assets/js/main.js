/* FSBO4u — shared site behaviour (no dependencies) */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
  };
  const peso = (n) => '₱' + Math.round(n).toLocaleString('en-PH');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toast ---------- */
  const toastEl = $('[data-toast]');
  let toastT;
  window.toast = (msg) => {
    if (!toastEl) return;
    toastEl.innerHTML = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>' + msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  };

  /* ---------- Header ---------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 24);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    const toggle = $('[data-nav-toggle]', header);
    const drawer = $('[data-drawer]', header);
    toggle?.addEventListener('click', () => {
      const open = drawer.hidden;
      drawer.hidden = !open;
      toggle.setAttribute('aria-expanded', open);
      header.classList.toggle('is-scrolled', open || scrollY > 24);
    });
    $$('.nav__item--menu > button', header).forEach((b) => b.addEventListener('click', () => {
      const menu = b.nextElementSibling;
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', open);
    }));
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav__item--menu')) $$('.nav__menu.is-open').forEach((m) => { m.classList.remove('is-open'); m.previousElementSibling.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window && !reduced ? new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 }) : null;
  const groups = new Map();
  $$('.reveal, .steps').forEach((el) => {
    // stagger siblings inside the same parent
    const p = el.parentElement; const i = groups.get(p) || 0; groups.set(p, i + 1);
    if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', Math.min(i, 5) * 0.08 + 's');
    io ? io.observe(el) : el.classList.add('is-in');
  });
  window.__reveal = (el) => { el.classList.add('is-in'); };

  /* ---------- Counters ---------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const to = +el.dataset.count; const dur = 1600; const t0 = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString('en-PH');
    if (reduced) { el.textContent = fmt(to); return; }
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); el.textContent = fmt(to * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const cio = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } }), { threshold: .4 }) : null;
    counters.forEach((c) => cio ? cio.observe(c) : runCount(c));
  }

  /* ---------- Favourites ---------- */
  const FKEY = 'fsbo4u:favorites';
  const favs = new Set(store.get(FKEY, []));
  const syncFavs = () => {
    $$('[data-fav]').forEach((b) => b.setAttribute('aria-pressed', favs.has(b.dataset.fav)));
    $$('[data-fav-count]').forEach((c) => { c.textContent = favs.size; c.hidden = favs.size === 0; });
    document.dispatchEvent(new CustomEvent('favs:change', { detail: favs }));
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-fav]');
    if (!b) return;
    e.preventDefault();
    const s = b.dataset.fav;
    if (favs.has(s)) { favs.delete(s); toast('Removed from saved properties'); } else { favs.add(s); toast('Saved to your shortlist'); }
    store.set(FKEY, [...favs]);
    syncFavs();
  });
  window.__favs = favs;
  syncFavs();

  /* Favourites page */
  const favGrid = $('[data-fav-grid]');
  if (favGrid) {
    const render = () => {
      let n = 0;
      $$('.card', favGrid).forEach((c) => { const on = favs.has(c.dataset.slug); c.hidden = !on; if (on) { n++; c.classList.add('is-in'); } });
      $('[data-fav-empty]').hidden = n > 0;
      $('[data-fav-total]').textContent = n;
      const sum = $$('.card', favGrid).filter((c) => !c.hidden).reduce((a, c) => a + +c.dataset.price, 0);
      $('[data-fav-sum]').textContent = n ? peso(sum) : '—';
      $('[data-fav-clear]').hidden = n === 0;
    };
    document.addEventListener('favs:change', render);
    $('[data-fav-clear]')?.addEventListener('click', () => { favs.clear(); store.set(FKEY, []); syncFavs(); toast('Shortlist cleared'); });
    render();
  }

  /* ---------- Search console (home) ---------- */
  $$('[data-console]').forEach((c) => {
    const tabs = $$('[role="tab"]', c);
    tabs.forEach((t) => t.addEventListener('click', () => {
      tabs.forEach((x) => x.setAttribute('aria-selected', x === t));
      $$('[data-panel]', c).forEach((p) => p.hidden = p.dataset.panel !== (t.dataset.tab === 'sell' ? 'sell' : 'buy'));
      const st = $('[name="status"]', c); if (st) st.value = t.dataset.tab === 'rent' ? 'rent' : 'sale';
    }));
    $('[data-sell-go]', c)?.addEventListener('click', () => {
      const v = +String($('[name="value"]', c).value).replace(/[^\d]/g, '');
      const calc = $('[data-calc]');
      if (calc && v) { const r = $('[data-calc-range]', calc); r.value = Math.min(+r.max, Math.max(+r.min, v)); r.dispatchEvent(new Event('input')); }
      $('#calculator')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });
  $$('[data-money]').forEach((inp) => inp.addEventListener('input', () => {
    const n = inp.value.replace(/[^\d]/g, '');
    inp.value = n ? (+n).toLocaleString('en-PH') : '';
  }));

  /* ---------- Commission calculator ---------- */
  $$('[data-calc]').forEach((c) => {
    const range = $('[data-calc-range]', c);
    const rateBtns = $$('[data-rate]', c);
    let rate = 0.05;
    const out = (k) => $(`[data-out="${k}"]`, c);
    const update = () => {
      const price = +range.value;
      const pct = ((price - range.min) / (range.max - range.min)) * 100;
      range.style.setProperty('--p', pct + '%');
      const commission = price * rate;
      const vat = commission * 0.12;
      const total = commission + vat;
      out('price').textContent = peso(price);
      out('agent').textContent = '− ' + peso(total);
      out('fsbo').textContent = '₱0';
      out('save').textContent = peso(total);
      out('rate').textContent = (rate * 100).toFixed(0) + '%';
      $('[data-bar="agent"]', c).style.width = Math.max(6, (total / (price * 0.056)) * 100) + '%';
      $('[data-bar="fsbo"]', c).style.width = '2%';
      const net = out('net'); if (net) net.textContent = peso(price);
    };
    range.addEventListener('input', update);
    rateBtns.forEach((b) => b.addEventListener('click', () => {
      rate = +b.dataset.rate; rateBtns.forEach((x) => x.setAttribute('aria-pressed', x === b)); update();
    }));
    update();
  });

  /* ---------- Mortgage estimate (listing detail) ---------- */
  $$('[data-mortgage]').forEach((m) => {
    const price = +m.dataset.mortgage;
    const dp = $('[name="dp"]', m); const yrs = $('[name="yrs"]', m); const rate = $('[name="rate"]', m);
    const calc = () => {
      const loan = price * (1 - dp.value / 100); const r = rate.value / 100 / 12; const n = yrs.value * 12;
      const pay = r ? loan * r / (1 - Math.pow(1 + r, -n)) : loan / n;
      $('[data-m-out]', m).textContent = peso(pay);
      $('[data-m-dp]', m).textContent = dp.value + '% · ' + peso(price * dp.value / 100);
      $('[data-m-yrs]', m).textContent = yrs.value + ' years';
      $('[data-m-rate]', m).textContent = (+rate.value).toFixed(2) + '%';
      [dp, yrs, rate].forEach((r) => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min)) * 100 + '%'));
    };
    [dp, yrs, rate].forEach((x) => x.addEventListener('input', calc));
    calc();
  });

  /* ---------- Mini tabs (contact card) ---------- */
  $$('[data-tabs]').forEach((w) => {
    const tabs = $$('[role="tab"]', w);
    tabs.forEach((t) => t.addEventListener('click', () => {
      tabs.forEach((x) => x.setAttribute('aria-selected', x === t));
      $$('[data-tabpanel]', w).forEach((p) => p.hidden = p.dataset.tabpanel !== t.dataset.tab);
    }));
  });

  /* ---------- Demo forms ---------- */
  $$('form[data-demo]').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('[required]', f).forEach((inp) => {
      const field = inp.closest('.field');
      const bad = !inp.value.trim() || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(inp.value));
      field?.classList.toggle('has-error', bad);
      if (bad && ok) { inp.focus(); ok = false; }
    });
    if (!ok) return;
    toast(f.dataset.demo || 'Sent — we’ll be in touch shortly');
    f.reset();
  }));

  /* ---------- Share ---------- */
  $$('[data-share]').forEach((b) => b.addEventListener('click', async () => {
    try {
      if (navigator.share) await navigator.share({ title: document.title, url: location.href });
      else { await navigator.clipboard.writeText(location.href); toast('Link copied to clipboard'); }
    } catch { /* cancelled */ }
  }));

  /* ---------- Legal TOC ---------- */
  const toc = $('[data-toc]');
  if (toc && 'IntersectionObserver' in window) {
    const links = $$('a', toc);
    const tio = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-20% 0px -70% 0px' });
    $$('.prose h2[id]').forEach((h) => tio.observe(h));
  }

  /* ---------- Quick type filter (V2 home) ---------- */
  $$('[data-quickfilter]').forEach((bar) => {
    const grid = $('[data-qf-grid]');
    $$('button', bar).forEach((b) => b.addEventListener('click', () => {
      $$('button', bar).forEach((x) => x.setAttribute('aria-selected', x === b));
      $$('.card', grid).forEach((c) => { c.hidden = !!b.dataset.qf && c.dataset.type !== b.dataset.qf; c.classList.add('is-in'); });
    }));
  });

  /* ---------- Design version switcher ---------- */
  const basePath = location.pathname.replace(/^\/v[23](?=\/|$)/, '') || '/';
  $$('[data-vlink]').forEach((a) => {
    const v = a.dataset.vlink;
    a.href = (v === 'v1' ? '' : '/' + v) + basePath + location.search + location.hash;
  });

  /* ---------- Light / dark theme (V2, V3) ---------- */
  const root = document.documentElement;
  $$('[data-theme-toggle]').forEach((b) => {
    const sync = () => b.setAttribute('aria-pressed', root.dataset.theme === 'dark');
    sync();
    b.addEventListener('click', () => {
      root.classList.add('theme-anim');
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(root.dataset.themeKey, root.dataset.theme); } catch { /* ignore */ }
      $$('[data-theme-toggle]').forEach((x) => x.setAttribute('aria-pressed', root.dataset.theme === 'dark'));
      document.dispatchEvent(new CustomEvent('theme:change', { detail: root.dataset.theme }));
      setTimeout(() => root.classList.remove('theme-anim'), 500);
    });
  });

  /* ---------- Cookie banner (privacy-first) ---------- */
  const cookie = $('[data-cookie]');
  if (cookie && !store.get('fsbo4u:cookies', null)) {
    setTimeout(() => { cookie.hidden = false; }, 1200);
    $$('[data-cookie-choice]', cookie).forEach((b) => b.addEventListener('click', () => { store.set('fsbo4u:cookies', b.dataset.cookieChoice); cookie.hidden = true; }));
  }
})();
