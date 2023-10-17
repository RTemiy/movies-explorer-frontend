import React from 'react';
import './MoviesCardList.css';
import {moviesDatabase} from '../../../utils/consts';
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList ({saved}){

  return(
    <section className="movies-card-list-section">
      <hr className="movies-card-list__horizontal-rule"/>
      <div className="movies-card-list">
        {moviesDatabase.map((movie) => (
          <MoviesCard key={movie.movieId} movieInfo={movie} saved={saved} />
        ))}
      </div>
      <div className="movies-card-list__more">
        <button className="movies-card-list__more-button">Ещё</button>
      </div>
    </section>
  )
}