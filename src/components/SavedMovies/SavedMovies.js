import React, {useEffect, useState} from 'react';
import Searchform from '../Searchform/Searchform';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import searchFilms from "../../utils/searchFilms";

export default function SavedMovies ({collectFilm, savedFilms}){

  const [resultMovies, setResultMovies] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [request, setRequest] = useState('');
  const [requestIsShort, setRequestIsShort] = useState(false);



  function handleChangeSearchValue(evt) {
    setRequest(evt.target.value)
  }

  function handleSearch() {

    checkRequest(savedFilms, () => {
      const result = searchFilms(savedFilms, request, requestIsShort);
      setResultMovies(result);
      if (resultMovies.length>=1){
        setIsError(false)
        setErrorMessage('')
      } else {
        setIsError(true)
        setErrorMessage('Ничего не найдено')
      }
    })

  }

  function checkRequest(request, callback) {
    if (request === '') {
      setIsError(true);
      setErrorMessage('Введите название фильма');
    } else {
      setIsError(false);
      setErrorMessage('');
      callback();
    }
  }

  function handleSwitch(){
    setRequestIsShort(!requestIsShort);
    localStorage.setItem('lastIsShort', requestIsShort.toString());
    handleSearch();
  }

  function handleCollect(filmData) {
    collectFilm(filmData);
  }

  useEffect(() => {
    handleSearch()
  }, [request,requestIsShort, resultMovies])

  return(
    <section>
      <Searchform
        handleChangeSearchValue={handleChangeSearchValue}
        request={request}
        shortFilter={requestIsShort}
        handleSwitch={handleSwitch}
        errorMessage={errorMessage}
        isError={isError}
        savedFilms={savedFilms}
        handleSearch={handleSearch}/>
      <MoviesCardList saved={true} savedFilms={savedFilms} movies={resultMovies} collectFilm={handleCollect}/>
    </section>
  )
}