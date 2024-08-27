// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
  popup.addEventListener("mousedown", handleOverlayClick);
}

// Функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
  popup.removeEventListener("mousedown", handleOverlayClick);
}

// Обработчик клика по оверлею
export function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Обработчик клавиши Esc
export function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}
