// const swiper = new Swiper(".my-swiper", {
//     loop: true,
//     slidesPerView: 1,
//     spaceBetween: 0,
//     autoplay: {
//         delay: 1000,
//         disableOnInteraction: false,
//     },
//     speed: 500,
// });


const swiper = new Swiper(".my-swiper", {
    loop: true,
    speed: 600,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
});

// Səhifə açılan kimi autoplay-i dayandırırıq
swiper.autoplay.stop();

const swiperEl = document.querySelectorAll(".my-swiper");

// Hover olanda autoplay başlasın
swiperEl.addEventListener("mouseenter", () => {
    swiper.autoplay.start();
});

// Mouse çəkiləndə yenə dayansın
swiperEl.addEventListener("mouseleave", () => {
    swiper.autoplay.stop();
});