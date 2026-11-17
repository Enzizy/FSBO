/* Post-property wizard: step navigation, validation, live preview, photo thumbnails. */
(() => {
  const form = document.querySelector('[data-wizard]');
  if (!form) return;
  const steps = [...form.querySelectorAll('[data-step]')];
  const dots = [...form.querySelectorAll('[data-stepper]')];
  const prev = form.querySelector('[data-prev]');
  const next = form.querySelector('[data-next]');
  const nav = form.querySelector('[data-wizard-nav]');
  const last = steps.length - 2; // final index before success
  let cur = 0;
  const art = { 'Condominium': 'house', 'House & Lot': 'house', 'Townhouse': 'townhouse', 'Beach Property': 'house', 'Lot Only': 'lot', 'Commercial': 'townhouse', 'Warehouse': 'townhouse' };
  const $ = (s) => form.ownerDocument.querySelector(s);

  const show = (i) => {
    cur = i;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    dots.forEach((d, k) => { d.classList.toggle('is-done', k < i); d.classList.toggle('is-current', k === i); });
    prev.disabled = i === 0;
    next.innerHTML = i === last ? 'Publish listing <svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' : 'Continue <svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    next.classList.toggle('btn--gold', i === last);
    next.classList.toggle('btn--ink', i !== last);
    nav.hidden = i > last;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const valid = () => {
    let ok = true;
    steps[cur].querySelectorAll('[required]').forEach((inp) => {
      const bad = !inp.value.trim() || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(inp.value));
      inp.closest('.field')?.classList.toggle('has-error', bad);
      if (bad && ok) { inp.focus(); ok = false; }
    });
    return ok;
  };

  next.addEventListener('click', () => { if (valid()) show(Math.min(cur + 1, steps.length - 1)); });
  prev.addEventListener('click', () => show(Math.max(cur - 1, 0)));
  form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('has-error'));

  // Character counters
  form.querySelectorAll('[data-counter]').forEach((c) => {
    const inp = form.elements[c.dataset.counter];
    inp.addEventListener('input', () => { c.textContent = `${inp.value.length}/${inp.maxLength}`; });
  });

  // Live preview
  const peso = (n) => '₱' + n.toLocaleString('en-PH');
  const update = () => {
    const v = (n) => form.elements[n]?.value?.trim();
    $('[data-pv-title]').textContent = v('title') || 'Your listing title';
    const type = form.querySelector('[name="type"]:checked')?.value || 'Condominium';
    $('[data-pv-type]').textContent = type;
    $('[data-pv-img]').dataset.uploaded || ($('[data-pv-img]').src = `/assets/img/art-${art[type]}.svg`);
    const price = +String(v('price') || '').replace(/[^\d]/g, '');
    $('[data-pv-price]').textContent = price ? peso(price) : '₱ —';
    $('[data-pv-loc]').textContent = [v('brgy'), v('city')].filter(Boolean).join(', ') || 'City, Philippines';
    $('[data-pv-beds]').textContent = v('beds') === '0' ? 'Studio' : v('beds');
    $('[data-pv-baths]').textContent = v('baths');
    $('[data-pv-area]').textContent = v('area') || '—';
    const note = $('[data-save-note]');
    if (price) { note.hidden = false; $('[data-save-amt]').textContent = peso(Math.round(price * 0.05 * 1.12)); } else note.hidden = true;
  };
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();

  // Photos (local preview only)
  const dz = form.querySelector('[data-dropzone]');
  const input = form.querySelector('[data-files]');
  const thumbs = form.querySelector('[data-thumbs]');
  const addFiles = (files) => {
    [...files].filter((f) => f.type.startsWith('image/')).slice(0, 20).forEach((f, i) => {
      const url = URL.createObjectURL(f);
      thumbs.insertAdjacentHTML('beforeend', `<figure><img src="${url}" alt=""></figure>`);
      if (thumbs.children.length === 1) { const img = $('[data-pv-img]'); img.src = url; img.dataset.uploaded = '1'; }
    });
  };
  input.addEventListener('change', () => addFiles(input.files));
  ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('is-over'); }));
  ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('is-over'); }));
  dz.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
})();
