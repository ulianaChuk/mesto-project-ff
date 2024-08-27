const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
  headers: {
    authorization: "773c1fbd-3d62-4d04-95a5-36b224f586a4",
    "Content-Type": "application/json",
  },
};

// // Функция получения данных пользователя
export function fetchMe() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Функция получения карточек
export function fetchCards() {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-21/cards", {
    headers: {
      authorization: config.headers.authorization,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Функция обновления данных пользователя
export function updatedUserData(name, about) {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me", {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Функция добавления новой карточки
export function addNewCard(name, link) {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-21/cards", {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": config.headers["Content-Type"],
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

//Функция удаления карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: config.headers.authorization,
      },
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

//Функция постановки и снятия лайка

export function setLikeCard(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": config.headers["Content-Type"],
      },
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function deleteLikeCard(cardId) {
  return fetch(
    `https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": config.headers["Content-Type"],
      },
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

// Обновление аватара пользователя

export function updateAvatar(avatarLink) {
  return fetch(
    "https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me/avatar",
    {
      method: "PATCH",
      headers: {
        authorization: config.headers.authorization,
        "Content-Type": config.headers["Content-Type"],
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}
