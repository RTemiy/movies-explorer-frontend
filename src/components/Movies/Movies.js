import React, {useEffect, useState} from 'react';
import Searchform from './Searchform/Searchform';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export default function Movies (){

  const [isLoading, setIsLoading] = useState(false);
  const [moviesResult,setMoviesResult] = useState([])

  useEffect(() => {
    const lastMovies = localStorage.getItem('searchFormLastResult')
    if (lastMovies !== null) setMoviesResult(JSON.parse(lastMovies))
  }, []);

  return(
    <section>
      <Preloader isLoading={isLoading}/>
      <Searchform setIsSearching={setIsLoading} setMoviesResult={setMoviesResult} isSaved={false}/>
      <MoviesCardList saved={true} movies={moviesResult}/>
    </section>
  )
}