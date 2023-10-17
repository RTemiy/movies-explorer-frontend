import React from 'react';
import './MoviesCard.css';

export default function MoviesCard ({movieInfo, saved}){
  return(
    <div className="movie-card">
      <img className="movie-card__image" alt="Картинка из фильма" src={movieInfo.image}/>
      <div className="movie-card__main-block">
        <p className="movie-card__name">{movieInfo.nameRU}</p>
        {saved ? <button className={`movie-card__like ${movieInfo.owner && 'movie-card__like_active'}`} type="button"></button>
          :
          <button className="movie-card__delete button-hover" type="button"></button>
        }

      </div>
      <p className="movie-card__duration">{movieInfo.duration}</p>
    </div>
  )
}