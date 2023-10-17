import React, {useState} from 'react';
import './Searchform.css';
import search from '../../../images/ui/search.svg';

export default function Searchform (){

  const [shortFilmFilterOn, setShortFilmFilterOn] = useState(true);

  return(
    <section className="search-form">
      <div className="search-form__container">
        <img className="search-form__search-image" alt="иконка поиска" src={search}/>
        <input className="search-form__input" placeholder="Фильм" type="text"/>
        <button className="search-form__find-button button-hover">Найти</button>
        <div className="search-form__vertical-rule"/>
      </div>
      <div className="search-form__container">
        <label className="search-form__switch">
          <input onClick={()=>{ setShortFilmFilterOn(!shortFilmFilterOn)}} type="checkbox" checked={shortFilmFilterOn}/>
          <div className="search-form__slider search-form__round"></div>
        </label>
        <label className="search-form__checkbox-label">Короткометражки</label>
      </div>
    </section>
  )
}