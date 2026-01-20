document.addEventListener('DOMContentLoaded', () => {
  const offcanvas = document.getElementById('offcanvas');
  if (!offcanvas) return;

  const servicesItem = offcanvas.querySelector('.nav-item-services');
  if (!servicesItem) return;

  const servicesLink = servicesItem.querySelector(':scope > a.nav-link');
  if (!servicesLink) return;

  const isMobileNav = () => window.matchMedia('(max-width: 1024px)').matches;

  servicesLink.addEventListener('click', (e) => {
    // Only in mobile/offcanvas viewport. Desktop header not affected.
    if (!isMobileNav()) return;

    e.preventDefault(); // stop navigating to ourServices.html
    servicesItem.classList.toggle('is-open');

    // optional: aria state (nice for accessibility)
    const expanded = servicesItem.classList.contains('is-open');
    servicesLink.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // Reset when offcanvas closes (nice UX)
  offcanvas.addEventListener('hidden.bs.offcanvas', () => {
    servicesItem.classList.remove('is-open');
    servicesLink.setAttribute('aria-expanded', 'false');
  });

  // Initial aria
  servicesLink.setAttribute('aria-expanded', servicesItem.classList.contains('is-open') ? 'true' : 'false');
});
