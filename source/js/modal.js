const modal = document.querySelector(".modal");
const modalForm = modal.querySelector(".modal__form");
const orderButton = document.querySelectorAll(".order-js");

for (let i = 0; i < orderButton.length; i++) {
  const element = orderButton[i];
  element.addEventListener("click", function (evt) {
    evt.preventDefault();
    modal.classList.add("modal-show-js");
  })
}

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27 && modal.classList.contains("modal-show-js")) {
    evt.preventDefault();
    modal.classList.remove("modal-show-js");
  }
})

modal.addEventListener("click", function (evt) {
  let target = evt.target;
  if (target.closest(".modal__wrapper")) {
    evt.stopPropagation();
  } else if (target.closest(".modal__overlay")) {
    modal.classList.remove("modal-show-js");
  }
});

modalForm.onsubmit = function () {
    modal.classList.remove("modal-show-js");
}
