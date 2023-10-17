import React from 'react';
import './Footer.css';

export default function Footer () {
  return(
    <footer className="footer">
      <p className="footer__paragraph">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__horizontal-rule"/>
      <div className="footer__list">
        <p className="footer__list-item">© 2020</p>
        <div className="footer__list-block">
          <p className="footer__list-item">Яндекс.Практикум</p>
          <p className="footer__list-item">Github</p>
        </div>
      </div>
    </footer>
  )
}