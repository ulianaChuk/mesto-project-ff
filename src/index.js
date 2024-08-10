// index.js

import "./pages/index.css"; // Импорт главного файла стилей
import { initialCards } from "./scripts/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, handleLikeClick } from "./components/card";

// Переменные для работы с DOM
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupOpenAddButton = document.querySelector(".profile__add-button");
const popupContentEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Инициализация начальных карточек
function insertInitialCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(
      cardData,
      deleteCard,
      handleLikeClick,
      openImagePopup,
      cardTemplate
    );
    placesList.append(card);
  });
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

// Функция заполнения формы редактирования профиля актуальными данными
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
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

  const newCard = createCard(
    newCardData,
    deleteCard,
    handleLikeClick,
    openImagePopup,
    cardTemplate
  );

  placesList.prepend(newCard);
  closePopup(popupNewCard);
  evt.target.reset();
}

// Функция обработки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupContentEdit);
}

// Добавление обработчиков событий
popupOpenEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openPopup(popupContentEdit, fillProfileForm);
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

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);

// Вставка начальных карточек на страницу
insertInitialCards();
