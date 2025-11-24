const buttons = document.querySelectorAll('.hover-button');

buttons.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    if (btn.classList.contains('is-animating')) return;

    btn.classList.add('is-animating');

    setTimeout(() => {
      btn.classList.remove('is-animating');
    }, 500);
  });
});