import React from 'react';
import './Footer.css';

export default function Footer () {
  return(
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__horizontal-rule"/>
      <div className="footer__list">
        <p className="footer__list-item footer__list-item-special">© 2020</p>
        <ul className="footer__list-block">
          <li className="footer__list-item-container">
            <a href="https://practicum.yandex.ru/" rel="external" target="_blank" className="footer__list-item link-hover">Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item-container">
            <a href="https://github.com/RTemiy" rel="external" target="_blank" className="footer__list-item link-hover">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}