import React from 'react';
import Searchform from '../Movies/Searchform/Searchform';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

export default function SavedMovies (){
  return(
    <section>
      <Searchform/>
      <MoviesCardList/>
    </section>
  )
}