import React from 'react';
import Searchform from './Searchform/Searchform';
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies (){
  return(
    <div>
      <Searchform/>
      <MoviesCardList saved={true}/>
    </div>
  )
}