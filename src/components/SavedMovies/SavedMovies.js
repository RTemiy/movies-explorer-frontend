import React, {useState} from 'react';
import Searchform from '../Movies/Searchform/Searchform';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function SavedMovies (){

  const [moviesResult,setMoviesResult] = useState([])

  return(
    <section>
      <Searchform setMoviesResult={setMoviesResult} saved={false}/>
      <MoviesCardList saved={false} movies={moviesResult}/>
    </section>
  )
}