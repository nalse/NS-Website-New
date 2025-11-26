document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach((header) => {
        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            const panel = header.nextElementSibling;

            // Hazırda çoxlu panel eyni anda açıq qala bilər
            header.setAttribute('aria-expanded', String(!expanded));
            panel.hidden = expanded;

            // Tək panel açıq qalsın istəyirsənsə, aşağıdakı bloku aç:
            /*
            if (!expanded) {
              headers.forEach((h) => {
                if (h !== header) {
                  h.setAttribute('aria-expanded', 'false');
                  const p = h.nextElementSibling;
                  if (p) p.hidden = true;
                }
              });
            }
            */
        });
    });
});
