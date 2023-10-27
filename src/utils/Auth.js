import {BASE_URL} from "./consts";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status)
}

export function register ({password, email, name}) {
  return fetch(`${BASE_URL}/signup`,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({password: password,email: email, name: name})
  }).then(checkResponse)
}

export function authorize(email,password){
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
  }).then(checkResponse)
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(res => res.json()
  ).then(data => data)
}