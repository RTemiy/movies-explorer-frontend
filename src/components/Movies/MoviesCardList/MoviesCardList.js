import React, {useCallback, useEffect, useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList ({movies, saved, collectFilm, savedFilms}){
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const changeWindowWidth = () => {setWindowWidth(window.innerWidth)}
  const [defaultMoviesAmount, setDefaultMoviesAmount] = useState(0)

  const checkMoviesCardAmount = useCallback(() => {

    if(windowWidth>1279) {
      setDefaultMoviesAmount(8)
    } else if (windowWidth>1101) {
      setDefaultMoviesAmount(6)
    } else if (windowWidth>654) {
      setDefaultMoviesAmount(4)
    } else if (windowWidth>300) {
      setDefaultMoviesAmount(5)
    }

    if(saved) setDefaultMoviesAmount(-1)
  },[windowWidth, saved])

  function showMore () {
    if(windowWidth>1279) {
      setDefaultMoviesAmount(defaultMoviesAmount + 4)
    } else if (windowWidth>1101) {
      setDefaultMoviesAmount(defaultMoviesAmount + 3)
    } else if (windowWidth>654) {
      setDefaultMoviesAmount(defaultMoviesAmount + 2)
    } else if (windowWidth>300) {
      setDefaultMoviesAmount(defaultMoviesAmount + 2)
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