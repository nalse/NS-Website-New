document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-stream-src]');

  if (!videos.length) return;

  const setupAudioToggle = (video) => {
    const container = video.closest('.hero-image');
    const toggleButton = container ? container.querySelector('[data-audio-toggle]') : null;

    if (!toggleButton) return;

    const updateToggleState = () => {
      const isMuted = video.muted;
      toggleButton.classList.toggle('is-muted', isMuted);
      toggleButton.setAttribute('aria-pressed', String(!isMuted));
      toggleButton.setAttribute('aria-label', isMuted ? 'Unmute audio' : 'Mute audio');
    };

    toggleButton.addEventListener('click', () => {
      video.muted = !video.muted;
      updateToggleState();
      if (video.paused) {
        video.play().catch(() => {});
      }
    });

    video.addEventListener('playing', () => {
      if (container) {
        container.classList.add('video-started');
      }
      updateToggleState();
    });

    updateToggleState();
  };

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

  videos.forEach(setupAudioToggle);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          loadVideo(video);
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.4 });

    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach(loadVideo);
  }
});
