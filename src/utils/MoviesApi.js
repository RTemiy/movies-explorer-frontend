export default function getFilms() {
  const baseURL = 'https://api.nomoreparties.co/';
  return fetch('https://api.nomoreparties.co/beatfilm-movies').then(data => {
    return data.json().then(res => {
      res.forEach(film => {
        const imageData = film.image
        film.image = baseURL + imageData.url
        film.thumbnail = baseURL + imageData.formats.thumbnail.url
        
      })
      return res
    })
  })
}

