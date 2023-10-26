export default function searchFilms (dataBase, request, isShort) {
  let result = dataBase.filter(film => { return film.nameRU.toUpperCase().includes(request.toUpperCase())})
  if (isShort===true) {
    result = result.filter(film => parseInt(film.duration) <= 40)
  }
  return result
}