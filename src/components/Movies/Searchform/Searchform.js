import React, {useState} from 'react';
import './Searchform.css';
import search from '../../../images/ui/search.svg';

export default function Searchform (){

  const [shortFilmFilterOn, setShortFilmFilterOn] = useState(true);

  function handleSearch(evt) {
    evt.preventDefault()
  }

  return(
    <form id="form-search" className="search-form">
      <div  className="search-form__container">
        <img className="search-form__search-image" alt="иконка поиска" src={search}/>
        <input className="search-form__input" placeholder="Фильм" name="filmToSearch" type="text" required/>
        <button className="search-form__find-button button-hover" onSubmit={handleSearch} type="submit">Найти</button>
        <div className="search-form__vertical-rule"/>
      </div>
      <div className="search-form__container">
        <label className="search-form__switch button-hover">
          <input onChange={()=>{ setShortFilmFilterOn(!shortFilmFilterOn)}} type="checkbox" checked={shortFilmFilterOn}/>
          <span className="search-form__slider search-form__round"></span>
        </label>
        <label className="search-form__checkbox-label">Короткометражки</label>
      </div>
    </form>
  )
}