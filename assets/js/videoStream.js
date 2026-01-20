document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-stream-src]');
  if (!videos.length) return;

  const getWrap = (video) => video.closest('.hero-video-div') || video.parentElement;

  const updateAudioIcon = (video) => {
    const wrap = getWrap(video);
    if (!wrap) return;

    const btn = wrap.querySelector('[data-audio-toggle]');
    const icon = wrap.querySelector('[data-icon]');
    if (!btn || !icon) return;

    if (video.muted) {
      btn.classList.add('is-muted');
      icon.src = 'assets/icons/sound-off.svg';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Unmute audio');
    } else {
      btn.classList.remove('is-muted');
      icon.src = 'assets/icons/sound-on.svg';
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Mute audio');
    }
  };

  const setupAudioToggle = (video) => {
    const wrap = getWrap(video);
    if (!wrap) return;

    const btn = wrap.querySelector('[data-audio-toggle]');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      video.muted = !video.muted;
      updateAudioIcon(video);

      // If user unmutes and video isn't playing, try to play.
      if (!video.muted && video.paused) {
        try { await video.play(); } catch (_) {}
      }
    });

    // Keep UI synced if anything changes volume/mute state
    video.addEventListener('volumechange', () => updateAudioIcon(video));
    video.addEventListener('playing', () => updateAudioIcon(video));

    // Initial state
    updateAudioIcon(video);
  };

  const playWhenReady = (video) => {
    const tryPlay = () => video.play().catch(() => {});
    if (video.readyState >= 2) return tryPlay();

    const onCanPlay = () => {
      tryPlay();
      video.removeEventListener('canplay', onCanPlay);
    };
    video.addEventListener('canplay', onCanPlay);
  };

  const attachHls = (video, src) => {
    // Safari & iOS Safari native HLS
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      return;
    }

    // Chrome/Edge/Firefox via hls.js
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      // Store reference in case you want to destroy later
      video._hls = hls;

      // Auto-play after manifest parsed
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (video.autoplay) playWhenReady(video);
      });

      return;
    }

    // No HLS support: do nothing (optional MP4 fallback could be added)
  };

  const loadVideo = (video) => {
    if (video.dataset.loaded === 'true') return;

    const src = video.dataset.streamSrc;
    if (!src) return;

    // Autoplay policy safety
    video.muted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    attachHls(video, src);

    video.dataset.loaded = 'true';
    video.load();

    if (video.autoplay) {
      playWhenReady(video);
    }

    updateAudioIcon(video);
  };

  // Setup toggles immediately (so button works even before stream loads)
  videos.forEach(setupAudioToggle);

  // Lazy-load streams when near viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          loadVideo(video);
          playWhenReady(video);
        } else if (video.dataset.loaded === 'true' && !video.paused) {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0.15 });

    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach(loadVideo);
  }
});
