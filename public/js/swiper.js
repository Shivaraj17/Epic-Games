var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  slidesPerColumn: 2,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

console.log(swiper)