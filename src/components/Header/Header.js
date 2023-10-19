import React from 'react';
import logo from '../../images/ui/logo.svg';
import user from '../../images/ui/user.svg';
import './Header.css';
import {Link} from "react-router-dom";

export default function Header ({isLoggedIn, isNavTabOpened, setIsNavTabOpened}) {

  function toggleNavTab() {
    setIsNavTabOpened(!isNavTabOpened);
  }


  return(
      <header className="header">
        <Link to='/' className="header__button-no-background button-hover"><img alt="Логотип сайта" src={logo}/></Link>
        <nav className={`${isLoggedIn? 'header__select-films' : 'disabled'}`}>
          <Link to='/movies' className="header__button header__button-no-background link-hover">Фильмы</Link>
          <Link to='/saved-movies' className="header__button header__button-no-background link-hover">Сохраненные фильмы</Link>
        </nav>
        <nav className={`${!isLoggedIn? 'header__account-block' : 'disabled'}`}>
          <Link to='/signup' className="header__button header__button-no-background link-hover header__account-block-text">Регистрация</Link>
          <Link to='/signin' className="header__button button-hover">Войти</Link>
        </nav>
        <Link to='/profile' className={`${isLoggedIn? 'header__button header__button-no-background link-hover header__account-block' : 'disabled'}`}>
          <p>Аккаунт</p>
          <img className="header__account-logo" alt="Иконка пользователя" src={user}/>
        </Link>
        <button onClick={toggleNavTab} className={`${!isLoggedIn ? 'disabled' : 'header__nav-menu link-hover'}`}></button>
      </header>
  )
}