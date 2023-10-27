export const BASE_URL = 'https://api.rtemiysdiploma.nomoredomainsrocks.ru'

export function getHeaders() {
  const token = localStorage.getItem('jwt');
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
}

export const SCREEN_SIZE = {
  MOBILE: {
    WIDTH: 300,
    DEFAULT_CARDS_AMOUNT: 5,
    CARDS_IN_ROW: 2
  },
  TABLET: {
    WIDTH: 654,
    DEFAULT_CARDS_AMOUNT: 4,
    CARDS_IN_ROW: 2,
  },
  MEDIUM: {
    WIDTH: 1101,
    DEFAULT_CARDS_AMOUNT: 6,
    CARDS_IN_ROW: 3
  },
  WIDE: {
    WIDTH: 1279,
    DEFAULT_CARDS_AMOUNT: 8,
    CARDS_IN_ROW: 4
  }
}

export const ERROR_MESSAGE = (code) => {
  switch (code) {
    default:
      return 'Произошла ошибка'

    case 409:
      return 'Пользователь с таким email уже существует'

    case 500:
      return 'На сервере произошла ошибка'

    case 401:
      return 'Вы ввели неправильный логин или пароль'

  }
}