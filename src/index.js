// index.js

import "./pages/index.css"; // Импорт главного файла стилей
import { initialCards } from "./scripts/cards";

// Переменные для работы с DOM
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupOpenAddButton = document.querySelector(".profile__add-button");
const popupContentEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");

// Функция создания карточки
function createCard(cardData, deleteCallback, likeCallback, viewCallback) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  newCard.querySelector(".card__title").textContent = cardData.name;

  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);

  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", () => {
    viewCallback(cardData.link, cardData.name);
  });

  return newCard;
}

// Функция удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest(".places__item");
  cardElement.remove();
}

// Функция лайка карточки
function handleLikeClick(evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
  popup.addEventListener("mousedown", handleOverlayClick);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
  popup.removeEventListener("mousedown", handleOverlayClick);
}

// Обработчик клика по оверлею
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Обработчик клавиши Esc
function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  const popupImage = document.querySelector(".popup__image");
  const popupCardImg = document.querySelector(".popup_type_image");
  const popupCaption = popupCardImg.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openPopup(popupCardImg);
}

// Функция обработки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupContentEdit);
}

// Функция обработки формы добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");
  const newCardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(newCardData, deleteCard, handleLikeClick, openImagePopup);

  placesList.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset(); // Сброс формы после добавления новой карточки
}

// Инициализация начальных карточек
function insertInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard, handleLikeClick, openImagePopup);
    placesList.append(card);
  });
}

// Добавление обработчиков событий
popupOpenEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openPopup(popupContentEdit);
});

popupOpenAddButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openPopup(popupNewCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  });
});

const profileFormElement = document.querySelector("form.popup__form[name='edit-profile']");
const newCardFormElement = document.querySelector("form.popup__form[name='new-place']");

profileFormElement.addEventListener("submit", handleFormSubmit);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

// Вставка начальных карточек на страницу
insertInitialCards();
