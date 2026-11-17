/* Login (email OTP) + dashboard interactions. Demo only — no backend calls. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* OTP flow */
  const otp = $('[data-otp]');
  if (otp) {
    const emailForm = $('[data-otp-email]', otp);
    const codeForm = $('[data-otp-code]', otp);
    const boxes = $$('.otp input', otp);
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = $('input', emailForm);
      const bad = !/^\S+@\S+\.\S+$/.test(inp.value);
      inp.closest('.field').classList.toggle('has-error', bad);
      if (bad) return inp.focus();
      $('[data-otp-to]', otp).textContent = inp.value;
      $('[data-otp-step="email"]', otp).hidden = true;
      $('[data-otp-step="code"]', otp).hidden = false;
      boxes[0].focus();
      window.toast?.('Code sent — check your inbox');
    });
    boxes.forEach((b, i) => {
      b.addEventListener('input', () => { b.value = b.value.replace(/\D/g, '').slice(-1); if (b.value && boxes[i + 1]) boxes[i + 1].focus(); });
      b.addEventListener('keydown', (e) => { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus(); });
      b.addEventListener('paste', (e) => {
        const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
        if (!d) return; e.preventDefault();
        boxes.forEach((x, k) => { x.value = d[k] || ''; });
        boxes[Math.min(d.length, 5)].focus();
      });
    });
    codeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (boxes.some((b) => !b.value)) { window.toast?.('Enter all 6 digits'); return; }
      location.href = codeForm.dataset.go;
    });
    $('[data-otp-resend]', otp)?.addEventListener('click', () => window.toast?.('A new code is on its way'));
  }

  /* Dashboard */
  const dash = $('[data-dash]');
  if (dash) {
    $('[data-dash-toggle]')?.addEventListener('click', (e) => { e.stopPropagation(); dash.classList.toggle('is-open'); });
    document.addEventListener('click', (e) => { if (dash.classList.contains('is-open') && !e.target.closest('.dash__side')) dash.classList.remove('is-open'); });
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-demo-click]');
    if (b) window.toast?.(b.dataset.demoClick);
  });
  $$('[data-dtabs]').forEach((g) => $$('button', g).forEach((b) => b.addEventListener('click', () => $$('button', g).forEach((x) => x.setAttribute('aria-selected', x === b)))));

  /* Inbox */
  const inbox = $('[data-inbox]');
  if (inbox) {
    const msgs = $('[data-th-msgs]', inbox);
    $$('.inbox__list button', inbox).forEach((b) => b.addEventListener('click', () => {
      $$('.inbox__list button', inbox).forEach((x) => x.setAttribute('aria-selected', x === b));
      b.classList.remove('unread');
      $('[data-th-name]', inbox).textContent = b.dataset.name;
      $('[data-th-prop]', inbox).textContent = b.dataset.prop;
      msgs.innerHTML = '';
      const bub = document.createElement('div'); bub.className = 'bubble';
      bub.textContent = b.dataset.msg;
      const t = document.createElement('small'); t.textContent = $('time', b).textContent; bub.appendChild(t);
      msgs.appendChild(bub);
    }));
    $('[data-reply]', inbox).addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = $('input', e.target);
      if (!inp.value.trim()) return;
      const bub = document.createElement('div'); bub.className = 'bubble bubble--me';
      bub.textContent = inp.value;
      const t = document.createElement('small'); t.textContent = 'Just now'; bub.appendChild(t);
      msgs.appendChild(bub);
      inp.value = '';
    });
  }
})();
