// index.js

import "./pages/index.css"; // Импорт главного файла стилей
import { openPopup, closePopup } from "./components/modal";
import { createCard } from "./components/card";
import {
  validationSettings,
  resetForm,
  enableValidation,
} from "./components/formValidation";
import {
  fetchMe,
  fetchCards,
  updatedUserData,
  addNewCard,
  updateAvatar,
  deleteLikeCard,
  setLikeCard,
  deleteCardFromServer,
} from "./components/api";

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
const profileImg = document.querySelector(".profile__image");
const popupImage = document.querySelector(".popup__image");
const popupCardImg = document.querySelector(".popup_type_image");
const popupCaption = popupCardImg.querySelector(".popup__caption");
const deleteCardPopup = document.querySelector(".popup__delete-confirmation");
const deleteCardConfirmButton = deleteCardPopup.querySelector(
  ".popup__agree-button"
);
const popupAvatar = document.querySelector(".popup__change-avatar");
const avatarInput = popupAvatar.querySelector(".popup__input_type_url");
const avatarButton = document.querySelector(".editingProfile");
let cardToDelete = null;
let userId = null;

// Функция обновления аватара пользователя
function openAvatarPopup(avatarLink) {
  openPopup(popupAvatar);
  avatarInput.value = avatarLink;
}
// Обработчик события клика по кнопке изменения аватара
avatarButton.addEventListener("click", () => {
  const avatarLink = profileImg.style.backgroundImage.slice(5, -2); // Извлекаем URL из backgroundImage
  openAvatarPopup(avatarLink);
});

// Функция обработки формы обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarInput.value;
  const saveButton = evt.target.querySelector(".popup__save-button");
  renderLoading(true, saveButton);
  updateAvatar(avatarLink)
    .then((newAvatar) => {
      profileImg.style.backgroundImage = `url(${newAvatar.avatar})`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении аватара пользователя: ${err}`);
    })
    .finally(() => renderLoading(false, saveButton));
}

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openPopup(popupCardImg);
}

//Функция открытия попапа с согласием на удаление карточки
function openDeleteCardPopup(card) {
  cardToDelete = card;
  openPopup(deleteCardPopup);
  return cardToDelete;
}

deleteCardConfirmButton.addEventListener("click", () => {
  const cardId = cardToDelete.id;

  deleteCardFromServer(cardId)
    .then(() => {
      cardToDelete.remove();
      cardToDelete = null;
      closePopup(deleteCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка при удалении карточки: ${err}`); // Обработка ошибки
    });
});

// Функция обработки формы добавления новой карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__save-button");
  const nameInput = document.querySelector(".popup__input_type_card-name");
  const linkInput = document.querySelector(".popup__input_type_url");
  renderLoading(true, saveButton);
  addNewCard(nameInput.value, linkInput.value)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,

        deleteLikeCard,
        setLikeCard,
        openImagePopup,
        cardTemplate,
        userId,
        openDeleteCardPopup
      );
      placesList.prepend(newCard);
      closePopup(popupNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении новой карточки: ${err}`);
    })
    .finally(() => renderLoading(false, saveButton));
}

// Функция обработки формы редактирования профиля
async function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.target.querySelector(".popup__save-button");

  renderLoading(true, saveButton);
  const nameInput = document.querySelector(".popup__input_type_name").value;
  const aboutInput = document.querySelector(
    ".popup__input_type_description"
  ).value;
  await updatedUserData(nameInput, aboutInput)
    .then((newUserData) => {
      profileTitle.textContent = newUserData.name;
      profileDescription.textContent = newUserData.about;
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении данных пользователя: ${err}`);
    })
    .finally(() => renderLoading(false, saveButton));

  closePopup(popupContentEdit);
}
// Функция заполнения формы редактирования профиля актуальными данными
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Добавление обработчиков событий
popupOpenEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  fillProfileForm();
  openPopup(popupContentEdit);
});

popupOpenAddButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  openPopup(popupNewCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_is-opened");
    const formElement = openedPopup.querySelector(".popup__form");
    closePopup(openedPopup);
    if (formElement) {
      resetForm(formElement, validationSettings);
    }
  });
});

const profileFormElement = document.querySelector(
  "form.popup__form[name='edit-profile']"
);

const newCardFormElement = document.querySelector(
  "form.popup__form[name='new-place']"
);
const avatarFormElement = document.querySelector(
  "form.popup__form[name='change-avatar']"
);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
newCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации форм
enableValidation(validationSettings);

// Функция получения данных пользователя и карточек
function initialFetch() {
  Promise.all([fetchMe(), fetchCards()])
    .then(([me, cards]) => {
      userId = me._id;
      insertMyData(me);
      insertCards(cards);
    })
    .catch((err) => {
      console.error(`Ошибка при получении данных: ${err}`);
    });
}
// Функция вставки данных пользователя
function insertMyData(data) {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.style.backgroundImage = `url(${data.avatar})`;
}
// Функция вставки карточек
function insertCards(data) {
  data.forEach((cardData) => {
    const card = createCard(
      cardData,
      deleteLikeCard,
      setLikeCard,
      openImagePopup,
      cardTemplate,
      userId,
      openDeleteCardPopup
    );
    placesList.append(card);
  });
}

initialFetch();

//Улучшенный UX всех форм
function renderLoading(isLoading, saveButton) {
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}
