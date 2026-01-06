document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach((header) => {
        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            const panel = header.nextElementSibling;

            header.setAttribute('aria-expanded', String(!expanded));
            panel.hidden = expanded;

        });
    });
});
