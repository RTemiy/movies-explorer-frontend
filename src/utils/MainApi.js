import {BASE_URL, getHeaders} from "./consts";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      'Content-type': 'application/json',
    }
  }

  _waitResponse(prom){
    if(prom.ok) return prom.json()
    else return Promise.reject('Ошибка: ' + prom.status)
  }

  getLikedMovies() {
    return fetch(this._baseUrl + '/movies', {
      headers: getHeaders(),
    })
      .then(res => this._waitResponse(res))
  }

  getUserInfo(){
    return fetch(this._baseUrl + '/users/me', {
      headers: getHeaders(),
    })
      .then(res => this._waitResponse(res))
  }

  sendUserInfo({name, email}){
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      })
    }).then(res => this._waitResponse(res))
  }

  postMovie({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN, owner}){
    return fetch(this._baseUrl + '/movies', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        thumbnail: thumbnail,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
        owner: owner
      })
    }).then(res => this._waitResponse(res))
  }

  deleteMovie(id){
    return fetch(this._baseUrl + '/movies/' + id, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(res => this._waitResponse(res))
      .catch(err=>{
        console.log(err)
      })
  }

}

export const api = new Api({
  baseUrl: BASE_URL,
});