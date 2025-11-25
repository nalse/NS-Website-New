document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.scramble-text');
  if (!elements.length) return;

  elements.forEach((el) => {
    const finalText = el.textContent.trim();
    scrambleText(el, finalText, 1200);
  });
});

function scrambleText(element, text, duration = 1200) {
  const chars = '471047235829876';
  const frameDuration = 40;
  const totalFrames = Math.round(duration / frameDuration);

  const queue = [];
  const length = text.length;

  for (let i = 0; i < length; i++) {
    const to = text[i];
    const start = Math.floor(Math.random() * totalFrames * 0.4);
    const end = start + Math.floor(totalFrames * 0.4 + 5);
    queue.push({ to, start, end, char: null });
  }

  let frame = 0;
  const timer = setInterval(() => {
    let output = '';
    let complete = 0;

    for (let i = 0; i < queue.length; i++) {
      const { to, start, end } = queue[i];
      let { char } = queue[i];

      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = chars[Math.floor(Math.random() * chars.length)];
          queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += ' ';
      }
    }

    element.innerHTML = output;

    if (complete === queue.length) {
      clearInterval(timer);
    }

    frame++;
  }, frameDuration);
}
