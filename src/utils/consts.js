export const BASE_URL = 'https://api.rtemiysdiploma.nomoredomainsrocks.ru'

export function getHeaders() {
  const token = localStorage.getItem('jwt');
  return {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
}

