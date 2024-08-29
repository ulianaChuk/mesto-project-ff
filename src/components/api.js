const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "773c1fbd-3d62-4d04-95a5-36b224f586a4",
    "Content-Type": "application/json",
  },
};

// Функция проверки ответа сервера
function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// // Функция получения данных пользователя
export function fetchMe() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// Функция получения карточек
export function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

// Функция обновления данных пользователя
export function updatedUserData(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
}

// Функция добавления новой карточки
export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(handleResponse);
}

//Функция удаления карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
}

//Функция постановки и снятия лайка

export function setLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then(handleResponse);
}

export function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
  }).then(handleResponse);
}

// Обновление аватара пользователя

export function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleResponse);
}
