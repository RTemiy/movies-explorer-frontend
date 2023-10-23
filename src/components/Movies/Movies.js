import React from 'react';
import Searchform from './Searchform/Searchform';
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies (){
  return(
    <section>
      <Searchform/>
      <MoviesCardList saved={true}/>
    </section>
  )
}