/* V3 · Immersive — motion layer (GSAP + ScrollTrigger, native scrolling).
   Everything here is progressive enhancement: with reduced motion, or if the
   CDN scripts fail, the site still works as normal pages. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDash = document.body.classList.contains('is-dash');

  /* ---------- Page transitions (curtain) ---------- */
  const curtain = $('[data-curtain]');
  if (curtain) {
    addEventListener('pageshow', () => curtain.classList.remove('is-leaving'));
    if (!reduced) document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target === '_blank' || a.hasAttribute('download') || a.closest('[data-vswitch]')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      if (url.href === location.href) return;
      e.preventDefault();
      curtain.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 320);
    });
  }

  if (reduced || !window.gsap) return;
  const { gsap } = window;
  const ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  /* ---------- Header: hide on scroll down, show on scroll up ---------- */
  const header = $('[data-header]');
  if (header) {
    let last = 0;
    ST.create({ start: 0, end: 'max', onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle('is-hidden', y > 240 && y > last && !header.querySelector('[data-drawer]:not([hidden])'));
      last = y;
    } });
  }

  /* ---------- Split headings into words and reveal ---------- */
  const split = (el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el);
    return $$('.wi', el);
  };
  const splitTargets = [...$$('[data-split]'), ...$$('.page-hero h1, main .display-2:not([data-split]), .dash__title h1, .auth__card h1')];
  [...new Set(splitTargets)].forEach((el) => {
    el.classList.remove('reveal');
    const words = split(el);
    const inHero = el.closest('[data-v3-hero], .page-hero');
    gsap.from(words, {
      yPercent: 115, rotate: 4, duration: 1.1, ease: 'expo.out', stagger: 0.045,
      delay: inHero ? 0.55 : 0,
      scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 88%' },
    });
  });
  $$('[data-fade]').forEach((el, i) => gsap.from(el, { y: 24, opacity: 0, duration: 1, delay: 0.9 + i * 0.15, ease: 'power3.out' }));

  /* ---------- Words that light up as you scroll ---------- */
  $$('[data-words]').forEach((el) => {
    const words = split(el);
    gsap.set(words, { opacity: 0.14 });
    gsap.to(words, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true } });
  });

  /* ---------- Hero exit ---------- */
  const hero = $('[data-v3-hero]');
  if (hero) {
    gsap.to('.v3-hero__inner', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- Pinned horizontal "how it works" ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    $$('[data-hscroll]').forEach((sec) => {
      const track = $('[data-hscroll-track]', sec);
      const dist = () => track.scrollWidth - innerWidth;
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: true, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    });
  });

  /* ---------- Parallax images ---------- */
  $$('.page-hero__img img, .v3-place img').forEach((img) => {
    const box = img.parentElement;
    gsap.set(img, { scale: 1.12, force3D: true });
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Stacking location panels ---------- */
  const places = $$('.v3-place');
  places.forEach((p, i) => {
    if (i === places.length - 1) return;
    gsap.to(p, { scale: 0.92, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: places[i + 1], start: 'top bottom', end: 'top 20%', scrub: true } });
  });

  /* ---------- Section reveals (upgrade the CSS ones) ---------- */
  ST.batch('.reveal', { start: 'top 90%', onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }) });

  /* ---------- Velocity marquee ---------- */
  $$('[data-marquee]').forEach((m) => {
    const track = $('.v3-marquee__track', m);
    let x = 0, boost = 0, on = false;
    ST.create({ trigger: m, start: 'top bottom', end: 'bottom top', onToggle: (s) => { on = s.isActive; }, onUpdate: (s) => { boost = Math.min(12, Math.abs(s.getVelocity()) / 150); } });
    gsap.ticker.add(() => {
      if (!on) return;
      x -= 0.6 + boost; boost *= 0.92;
      const w = track.scrollWidth / 3;
      if (-x > w) x += w;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });

  /* ---------- 3D tilt on cards ---------- */
  if (finePointer) {
    $$('.card, .plan, .portal, .v2-place, .tile').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(c, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 900, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        c.style.setProperty('--mx', (px + 0.5) * 100 + '%'); c.style.setProperty('--my', (py + 0.5) * 100 + '%');
      });
      c.addEventListener('pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, .5)' }));
    });
  }

  /* ---------- Custom cursor ---------- */
  if (finePointer) {
    const dot = document.createElement('div'); dot.className = 'v3-cursor'; dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); dot.classList.add('is-on'); }, { passive: true });
    document.addEventListener('pointerover', (e) => dot.classList.toggle('is-link', !!e.target.closest('a, button, [role="tab"], label, input, select, textarea')));
    document.addEventListener('pointerleave', () => dot.classList.remove('is-on'));
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer) {
    $$('.btn--gold, .btn--lg').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.18, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power3.out' });
      });
      b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, .4)' }));
    });
  }

  addEventListener('load', () => ST.refresh());
})();
