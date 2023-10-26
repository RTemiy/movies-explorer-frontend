import React, {useEffect, useState} from 'react';
import Searchform from './Searchform/Searchform';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import searchFilms from "../../utils/searchFilms";
import getFilms from "../../utils/MoviesApi";

export default function Movies ({collectFilm, savedFilms}){

  const [isLoading, setIsLoading] = useState(false);
  const [resultMovies, setResultMovies] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [request, setRequest] = useState('');
  const [requestIsShort, setRequestIsShort] = useState(false);

  function handleChangeSearchValue(evt) {
    setRequest(evt.target.value)
  }

  function handleSearch() {
    const moviesDatabase = JSON.parse(localStorage.getItem('moviesData'));

    function search(data) {
      checkRequest(request, () => {
        localStorage.setItem('lastRequest', request.toString());
        localStorage.setItem('lastIsShort', requestIsShort);
        const result = searchFilms(data, request, requestIsShort);
        localStorage.setItem('lastResult', JSON.stringify(result));
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
    
    if(moviesDatabase !== null) {
      search(moviesDatabase)
    } else {
      setIsLoading(true);
      getFilms().then(res => {
        setIsLoading(false);
        localStorage.setItem('moviesData', JSON.stringify(res));
        search(res)
      }).catch(console.log)
    }
  }

  function checkRequest(request, func) {
    if (request === '') {
      setIsError(true);
      setErrorMessage('Введите название фильма');
    } else {
      setIsError(false);
      setErrorMessage('');
      func();
    }
  }

  function handleSwitch(){
    setRequestIsShort(!requestIsShort);
    localStorage.setItem('lastIsShort', requestIsShort.toString());
    handleSearch();
  }

  function handleCollect(filmData) {
    collectFilm(filmData, handleSearch);
  }

  useEffect(() => {
    handleSearch()
  }, [request,requestIsShort])

  useEffect(() => {
    const lastRequest = localStorage.getItem('lastRequest');
    if(lastRequest !== null){
      setRequest(lastRequest);
      setRequestIsShort(localStorage.getItem('lastIsShort')==='true');
      setResultMovies(JSON.parse(localStorage.getItem('lastResult')));
    }
  }, []);



  return(
    <section>
      <Preloader isLoading={isLoading}/>
      <Searchform
        handleChangeSearchValue={handleChangeSearchValue}
        request={request}
        shortFilter={requestIsShort}
        handleSwitch={handleSwitch}
        errorMessage={errorMessage}
        isError={isError}
        handleSearch={handleSearch}/>
      <MoviesCardList saved={false} movies={resultMovies} savedFilms={savedFilms} collectFilm={handleCollect}/>
    </section>
  )
}