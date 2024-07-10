// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(data, deleteCallback) {
  const newCard = cardTemplate.cloneNode(true);
  //   console.log(newCard);
  newCard.querySelector(".card__image").src = data.link;
  newCard.querySelector(".card__title").textContent = data.name;
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);

  return newCard;
}

// @todo: Функция удаления карточки
function deleteCard() {
  const button = document.querySelector(".card__delete-button");
  const deleteButton = button.closest(".places__item");
  deleteButton.remove();
}
// @todo: Вывести карточки на страницу
function insertCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData, deleteCard);
    placesList.append(card);
  });
}

insertCards();
