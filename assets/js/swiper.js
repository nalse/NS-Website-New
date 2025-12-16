const swiperEls = document.querySelectorAll(".my-swiper");

    swiperEls.forEach((el) => {
    const swiperInstance = new Swiper(el, {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 400,
            disableOnInteraction: false,
        },
    });

    swiperInstance.autoplay.stop();

    el.addEventListener("mouseenter", () => {
        swiperInstance.autoplay.start();
    });

    el.addEventListener("mouseleave", () => {
        swiperInstance.autoplay.stop();
    });
});
 