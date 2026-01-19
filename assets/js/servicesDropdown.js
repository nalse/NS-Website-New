document.addEventListener('DOMContentLoaded', () => {
  const servicesLink = document.querySelector('#services');
  const dropdown = document.querySelector('.services-dropdown');

  let hideTimeout = null;

  if (servicesLink && dropdown) {
    const openDropdown = () => {
      clearTimeout(hideTimeout);
      dropdown.classList.add('is-open');
    };

    const closeDropdown = () => {
      hideTimeout = setTimeout(() => {
        dropdown.classList.remove('is-open');
      }, 150);
    };

    servicesLink.addEventListener('mouseenter', openDropdown);
    servicesLink.addEventListener('mouseleave', closeDropdown);

    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
      dropdown.classList.add('is-open');
    });

    dropdown.addEventListener('mouseleave', closeDropdown);
  }

  const dropdownLinks = document.querySelectorAll('.services-dropdown .dropdown-link');
  const previewImg = document.querySelector('.dropdown-img-preview img');

  if (dropdownLinks.length && previewImg) {
    dropdownLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        const imgSrc = link.getAttribute('data-img');
        if (!imgSrc) return;

        previewImg.style.opacity = 0;

        setTimeout(() => {
          previewImg.src = imgSrc;
          previewImg.style.opacity = 1;
        }, 100);
      });
    });
  }
});
