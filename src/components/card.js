// Функция создания карточки
export function createCard(
  cardData,
  deleteCallback,
  likeCallback,
  viewCallback,
  cardTemplate
) {
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
export function deleteCard(evt) {
  const cardElement = evt.target.closest(".places__item");
  cardElement.remove();
}

// Функция лайка карточки
export function handleLikeClick(evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
}
