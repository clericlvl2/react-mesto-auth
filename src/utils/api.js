import { API_ERROR_CONFIG } from './constants';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res, errorMessage = API_ERROR_CONFIG.defaultError) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}: ${errorMessage}.`);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.getUserError);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.updateUserError);
    });
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.updateUserError);
    });
  }

  getAllCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.getCardsError);
    });
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.addCardError);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.deleteCardError);
    });
  }

  setCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.likeCardError);
    });
  }

  unsetCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      return this._handleResponse(res, API_ERROR_CONFIG.likeCardError);
    });
  }

  initializeAppData() {
    return Promise.all([this.getUserData(), this.getAllCards()]);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'dada8704-016b-43db-b43a-5dfe373a30d9',
    'Content-Type': 'application/json',
  },
});

export default api;
