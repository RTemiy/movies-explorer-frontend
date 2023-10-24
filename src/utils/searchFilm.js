export default function searchFilm (request, isShort) {
  const films = JSON.parse(localStorage.getItem('filmsData'))
  let result = films.filter(film => { return film.nameRU.toUpperCase().includes(request.toUpperCase())})
  if (isShort===true) {
    result = result.filter(film => parseInt(film.duration) <= 52)
  }
  return result
}