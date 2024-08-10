// index.js

import { escape } from "../node_modules/core-js";
import "./pages/index.css"; //  импорт главного файла стилей
import { initialCards } from "./scripts/cards";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, deleteCallback, likeCallback, viewCallback) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImg.alt = data.name;
  cardImg.src = data.link;
  newCard.querySelector(".card__title").textContent = data.name;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);

  // обработчик события для лайка карточки
  likeButton.addEventListener("click", likeCallback);

  // Обработчик клика по изображению для открытия попапа
  cardImg.addEventListener("click", () => {
    viewCallback(data.link, data.name);
  });

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard(clickEvent) {
  const card = clickEvent.target.closest(".places__item");
  card.remove();
}

// @todo: Вывести карточки на страницу
function insertCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(
      cardData,
      deleteCard,
      handleLikeClick,
      openImagePopup
    );
    placesList.append(card);
  });
}

insertCards();

// ПОПАП

const popupOpenEdit = document.querySelector(".profile__edit-button");
const popupOpenAdd = document.querySelector(".profile__add-button");
const popupContentEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popup = document.querySelector(".popup");


// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);

  // Добавляем обработчик клика на оверлей
  popup.addEventListener("mousedown", handleOverlayClick);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);

  // Удаляем обработчик клика на оверлей
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

// Открытие попапов
popupOpenEdit.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(popupContentEdit);
});

popupOpenAdd.addEventListener("click", (e) => {
  e.preventDefault();
  openPopup(popupNewCard);
});

// Закрытие попапов по клику на кнопку

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  });
});


// Редактирование имени и информации о себе

const formElement = document.querySelector(
  "form.popup__form[name = 'edit-profile'] "
);
const formElementNewCard = document.querySelector(
  "form.popup__form[name = 'new-place'] "
);

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description ");

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(popup);
}

formElement.addEventListener("submit", handleFormSubmit);

// Добавление новой карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");
  const newCardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(
    newCardData,
    deleteCard,
    handleLikeClick,
    openImagePopup
  );

  placesList.prepend(newCard);
  closePopup(popupNewCard);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener("submit", handleNewCardFormSubmit);

// Лайк карточки

function handleLikeClick(event) {
  const likeButton = event.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
}
// Открытие попапа с картинкой

function openImagePopup(imageSrc, imageAlt) {
  const popupImage = document.querySelector(".popup__image");
  const popupCardImg = document.querySelector(".popup_type_image");
  const popupCaption = popupCardImg.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openPopup(popupCardImg);
}

