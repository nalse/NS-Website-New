document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-stream-src]');

  if (!videos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded === 'true') return;
    const streamSrc = video.dataset.streamSrc;
    if (!streamSrc) return;

    video.src = streamSrc;
    video.dataset.loaded = 'true';
    video.load();

    if (video.autoplay) {
      video.play().catch(() => {});
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px' });

    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach(loadVideo);
  }
});
