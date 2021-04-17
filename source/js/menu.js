const mainNav = document.querySelector(".main-nav");
const mainNavToggle = mainNav.querySelector(".main-nav__toggle");

// Если отключен js показываем меню
mainNav.classList.remove("main-nav--no-js");

mainNavToggle.onclick = function () {
  mainNav.classList.toggle("main-nav--closed");
  mainNav.classList.toggle("main-nav--opened");
};
