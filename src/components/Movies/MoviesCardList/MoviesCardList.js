import React from 'react';
import './MoviesCardList.css';
import {moviesDatabase} from '../../../utils/consts';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList ({saved}){

  return(
    <div className="movies-card-list">
      <hr className="movies-card-list__horizontal-rule"/>
      <ul className="movies-card-list__container">
        {moviesDatabase.map((movie) => (
          <MoviesCard key={movie.movieId} movieInfo={movie} saved={saved} />
        ))}
      </ul>
      <div className="movies-card-list__more">
        <button className="movies-card-list__more-button button-hover" type="button">Ещё</button>
      </div>
    </div>
  )
}