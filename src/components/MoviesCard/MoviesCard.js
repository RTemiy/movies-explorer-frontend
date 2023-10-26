import React from 'react';
import './MoviesCard.css';
import transformTime from "../../utils/transformTime";

export default function MoviesCard ({saved, movieInfo, collectFilm, savedFilms}){

  const isLiked = savedFilms.some(film => {
    return film.movieId === movieInfo.movieId;
  })

  return(
    <li className="movie-card">
      <a href={movieInfo.trailerLink} target="_blank"><img className="movie-card__image" alt={`Заставка фильма ${movieInfo.nameRU}`} src={movieInfo.image}/></a>
      <div className="movie-card__main-block">
        <p className="movie-card__name">{movieInfo.nameRU}</p>
        {!saved ? <button onClick={()=>{collectFilm(movieInfo)}} className={`movie-card__like ${isLiked ? 'movie-card__like_active' : ''}`} type="button"></button>
          :
          <button onClick={()=>{collectFilm(movieInfo)}} className="movie-card__delete button-hover" type="button"></button>
        }
        
      </div>
      <p className="movie-card__duration">{transformTime(movieInfo.duration)}</p>
    </li>
  )
}