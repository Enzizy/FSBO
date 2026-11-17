/* Listings page: client-side filtering, sorting and layout toggle. */
(() => {
  const form = document.querySelector('[data-filters]');
  if (!form) return;
  const grid = document.querySelector('[data-results]');
  const cards = [...grid.children];
  const countEl = document.querySelector('[data-count-out]');
  const empty = document.querySelector('[data-empty]');
  const chips = document.querySelector('[data-chips]');
  const order = new Map(cards.map((c, i) => [c, i]));

  // Prefill from URL (home page search console posts here)
  const params = new URLSearchParams(location.search);
  ['q', 'type', 'city', 'price', 'sort'].forEach((k) => { if (params.get(k) && form.elements[k]) form.elements[k].value = params.get(k); });

  const labels = { type: (v) => v, city: (v) => v, price: (v) => form.elements.price.selectedOptions[0]?.textContent, q: (v) => '“' + v + '”' };

  const apply = () => {
    const f = Object.fromEntries(new FormData(form));
    const q = (f.q || '').trim().toLowerCase();
    const [min, max] = (f.price || '').split('-').map((n) => (n ? +n : null));
    let n = 0;
    cards.forEach((c) => {
      const text = c.textContent.toLowerCase();
      const price = +c.dataset.price;
      const ok = (!q || text.includes(q))
        && (!f.type || c.dataset.type === f.type)
        && (!f.city || c.dataset.city === f.city)
        && (min == null || price >= min) && (max == null || price < max);
      c.hidden = !ok;
      if (ok) { n++; c.classList.add('is-in'); }
    });
    const sorted = [...cards].sort((a, b) => {
      if (f.sort === 'price-asc') return a.dataset.price - b.dataset.price;
      if (f.sort === 'price-desc') return b.dataset.price - a.dataset.price;
      if (f.sort === 'area-desc') return b.dataset.area - a.dataset.area;
      return order.get(a) - order.get(b);
    });
    sorted.forEach((c) => grid.appendChild(c));
    countEl.textContent = n;
    empty.hidden = n > 0;
    chips.innerHTML = ['q', 'type', 'city', 'price'].filter((k) => f[k]).map((k) =>
      `<button type="button" data-clear="${k}" aria-label="Remove filter">${labels[k](f[k])}<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`).join('');
    const qs = new URLSearchParams(Object.entries(f).filter(([k, v]) => v && !(k === 'sort' && v === 'featured'))).toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  };

  form.addEventListener('input', apply);
  form.addEventListener('submit', (e) => { e.preventDefault(); apply(); });
  chips.addEventListener('click', (e) => { const b = e.target.closest('[data-clear]'); if (b) { form.elements[b.dataset.clear].value = ''; apply(); } });
  document.querySelector('[data-reset]')?.addEventListener('click', () => { form.reset(); apply(); });

  document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-view]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    grid.classList.toggle('cards--list', b.dataset.view === 'list');
  }));

  apply();
})();
