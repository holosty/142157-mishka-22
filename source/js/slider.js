const slider = document.querySelector(".slider");
const sliderItems = slider.querySelectorAll(".slider__item");
const sliderBtnLeft = slider.querySelector(".reviews__button-toggle--left");
const sliderBtnRight = slider.querySelector(".reviews__button-toggle--right");
let currentSlide = 0;

function rightMove() {
  slideMove(currentSlide - 1);
}

function leftMove() {
  slideMove(currentSlide + 1);
}

function slideMove (evt) {
  sliderItems[currentSlide].classList.add("reviews-no-js");
  currentSlide = (evt + sliderItems.length) % sliderItems.length;
  sliderItems[currentSlide].classList.remove("reviews-no-js");
}


sliderBtnLeft.onclick = function() {
  rightMove();
};

sliderBtnRight.onclick = function() {
  leftMove();
};
