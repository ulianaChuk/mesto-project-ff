// Функция создания карточки
export function createCard(
  cardData,
  viewCallback,
  cardTemplate,
  userId,
  openDeleteCardPopup,
  handleLikeClick
) {
  const newCard = cardTemplate.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const likeButton = newCard.querySelector(".card__like-button");
  const likeCountElement = newCard.querySelector(".card__like-count");
  const cardPlace = newCard.querySelector(".places__item");

  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardImage.id = cardData._id;
  cardPlace.id = cardData._id;

  newCard.querySelector(".card__title").textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  if (cardData.owner._id === userId) {
    newCard
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        openDeleteCardPopup(cardPlace);
      });
  } else {
    newCard.querySelector(".card__delete-button").remove();
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) => {
    handleLikeClick(evt, cardData._id);
  });

  cardImage.addEventListener("click", () => {
    viewCallback(cardData.link, cardData.name);
  });

  return newCard;
}
