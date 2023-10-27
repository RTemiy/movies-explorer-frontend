import React, {useCallback, useEffect, useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {SCREEN_SIZE} from "../../utils/consts";

export default function MoviesCardList ({movies, saved, collectFilm, savedFilms}){
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const changeWindowWidth = () => {setWindowWidth(window.innerWidth)}
  const [defaultMoviesAmount, setDefaultMoviesAmount] = useState(0)

  const checkMoviesCardAmount = useCallback(() => {

    if(windowWidth>SCREEN_SIZE.WIDE.WIDTH) {
      setDefaultMoviesAmount(SCREEN_SIZE.WIDE.DEFAULT_CARDS_AMOUNT)
    } else if (windowWidth>SCREEN_SIZE.MEDIUM.WIDTH) {
      setDefaultMoviesAmount(SCREEN_SIZE.MEDIUM.DEFAULT_CARDS_AMOUNT)
    } else if (windowWidth>SCREEN_SIZE.TABLET.WIDTH) {
      setDefaultMoviesAmount(SCREEN_SIZE.TABLET.DEFAULT_CARDS_AMOUNT)
    } else if (windowWidth>SCREEN_SIZE.MOBILE.WIDTH) {
      setDefaultMoviesAmount(SCREEN_SIZE.MOBILE.DEFAULT_CARDS_AMOUNT)
    }

    if(saved) setDefaultMoviesAmount(-1)
  },[windowWidth, saved])

  function showMore () {
    if(windowWidth>SCREEN_SIZE.WIDE.WIDTH) {
      setDefaultMoviesAmount(defaultMoviesAmount + SCREEN_SIZE.WIDE.CARDS_IN_ROW)
    } else if (windowWidth>SCREEN_SIZE.MEDIUM.WIDTH) {
      setDefaultMoviesAmount(defaultMoviesAmount + SCREEN_SIZE.MEDIUM.CARDS_IN_ROW)
    } else if (windowWidth>SCREEN_SIZE.MOBILE.WIDTH) {
      setDefaultMoviesAmount(defaultMoviesAmount + SCREEN_SIZE.MOBILE.CARDS_IN_ROW)
    }
  }

  function isShowMore () {
    if(movies=== null){
      return false
    }
    return defaultMoviesAmount < movies.length;
  }

  useEffect(() => {
    window.addEventListener('resize', changeWindowWidth)
    checkMoviesCardAmount()

    return() => {
      window.removeEventListener('resize', changeWindowWidth)
    }
  }, [checkMoviesCardAmount, movies]);

  return(
    <div className="movies-card-list">
      <hr className="movies-card-list__horizontal-rule"/>
      <ul className="movies-card-list__container">
        {movies ? !saved ? movies.slice(0,defaultMoviesAmount).map((movie) => (
          <MoviesCard key={movie.movieId} movieInfo={movie} savedFilms={savedFilms} saved={saved} collectFilm={collectFilm} />
        )) : movies.map((movie) => (
          <MoviesCard key={movie.movieId} movieInfo={movie} savedFilms={savedFilms} saved={saved} collectFilm={collectFilm} />
        )) : ''}
      </ul>
      <div className="movies-card-list__more">
        {isShowMore() && !saved &&<button className="movies-card-list__more-button button-hover" onClick={showMore} type="button">Ещё</button>}
      </div>
    </div>
  )
}