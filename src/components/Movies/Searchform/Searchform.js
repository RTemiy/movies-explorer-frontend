import React, {useEffect, useState} from 'react';
import './Searchform.css';
import search from '../../../images/ui/search.svg';
import getFilms from "../../../utils/MoviesApi";
import searchFilm from "../../../utils/searchFilm";

export default function Searchform ({setIsSearching, setMoviesResult, saved}){

  const [shortFilmFilterOn, setShortFilmFilterOn] = useState(true);
  const [searchValue,setSearchValue] = useState('')
  const [placeHolder, setPlaceHolder] = useState('Фильм')
  const [nothingFound, setNothingFound] = useState(false)

  function handleChangeSearchValue(evt) {
    setSearchValue(evt.target.value)
  }

  function handleSearch() {

    function search () {
      localStorage.setItem('searchFormLastRequest', searchValue)
      localStorage.setItem('searchFormLastIsShort', shortFilmFilterOn)
      const moviesResult = searchFilm(searchValue, shortFilmFilterOn)
      localStorage.setItem('searchFormLastResult',JSON.stringify(moviesResult))
      if (moviesResult.length>=1){
        setNothingFound(false)
        setMoviesResult(moviesResult)
      } else {
        setNothingFound(true)
        setMoviesResult([])
      }
    }

    if (searchValue === '') {
      setPlaceHolder('Введите название фильма')
    } else {
      setPlaceHolder('Фильм')
      if(localStorage.getItem('filmsData') === null) {
        setIsSearching(true)
        getFilms().then(res => {
          localStorage.setItem('filmsData', JSON.stringify(res))
          setIsSearching(false)
          search()
        }).catch(err => console.log(err))
      } else {
        search()
      }
    }

  }

  useEffect(() => {
    const lastData = localStorage.getItem('searchFormLastRequest')
    if (lastData!== null) {
      setSearchValue(lastData)
      setShortFilmFilterOn(localStorage.getItem('searchFormLastIsShort') === 'true')
    }
  }, []);

  return(
    <>
    <form id="form-search" className="search-form" noValidate>
      <div  className="search-form__container">
        <img className="search-form__search-image" alt="иконка поиска" src={search}/>
        <input className="search-form__input" placeholder={placeHolder} name="filmToSearch" type="text" onChange={handleChangeSearchValue} value={searchValue || ''} required/>
        <button className="search-form__find-button button-hover" onClick={handleSearch} type="button">Найти</button>
        <div className="search-form__vertical-rule"/>
      </div>
      <div className="search-form__container">
        <label className="search-form__switch button-hover">
          <input onChange={()=>{ setShortFilmFilterOn(!shortFilmFilterOn)}} type="checkbox" checked={shortFilmFilterOn}/>
          <span className="search-form__slider search-form__round"></span>
        </label>
        <label className="search-form__checkbox-label">Короткометражки</label>
      </div>
    </form>
      {nothingFound && <p style={{textAlign: 'center'}}>Ничего не найдено</p>}
    </>
  )
}