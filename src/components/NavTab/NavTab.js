import React from 'react';
import user from "../../images/ui/user.svg";
import {Link} from "react-router-dom";
import './NavTab.css';

export default function NavTab ({isNavTabOpened, setIsNavTabOpened}){
  return(
    <div className={isNavTabOpened ? 'nav-tab' : 'disabled'}>
      <Link to='/' className="nav-tab__button link-hover">Главная</Link>
      <Link to='/movies' className="nav-tab__button link-hover">Фильмы</Link>
      <Link to='/saved-movies' className="nav-tab__button link-hover">Сохранённые&nbsp;фильмы</Link>
      <Link to='/profile' className="nav-tab__button nav-tab__account link-hover">
        <p className="nav-tab__account-text">Аккаунт</p>
        <img className="nav-tab__account-logo" alt="Иконка пользователя" src={user}/>
      </Link>
      <button onClick={()=>{ setIsNavTabOpened(false) }} className="nav-tab__close-button link-hover"></button>
    </div>
  )
}