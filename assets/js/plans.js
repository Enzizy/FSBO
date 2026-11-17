/* Plans page: monthly / annual billing toggle (annual = 23% off). */
(() => {
  const group = document.querySelector('[data-billing]');
  if (!group) return;
  const btns = [...group.querySelectorAll('button')];
  const set = (period) => {
    btns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.period === period));
    document.querySelectorAll('.plan').forEach((plan) => {
      const el = plan.querySelector('[data-price]');
      const m = +el.dataset.monthly;
      const v = period === 'annual' ? Math.round(m * 0.77) : m;
      el.textContent = v.toLocaleString('en-PH');
      plan.querySelector('[data-bill]').textContent = period === 'annual'
        ? `Billed ₱${(v * 12).toLocaleString('en-PH')} yearly · save ₱${((m - v) * 12).toLocaleString('en-PH')}`
        : 'Billed monthly · cancel anytime';
    });
  };
  btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.period)));
})();
