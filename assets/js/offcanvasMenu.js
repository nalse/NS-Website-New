document.addEventListener('DOMContentLoaded', () => {
  const serviceToggles = document.querySelectorAll(
    '.nav-item-services > .nav-link'
  );

  if (!serviceToggles.length) return;

  serviceToggles.forEach((toggle) => {
    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const parentItem = toggle.closest('.nav-item-services');
      if (!parentItem) return;

      parentItem.classList.toggle('is-open');
    });
  });
});
