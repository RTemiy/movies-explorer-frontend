import React from 'react';
import './Portfolio.css';

export default function Portfolio (){
  return(
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="https://github.com/RTemiy/how-to-learn" rel="external" target="_blank" className="portfolio__link link-hover"><p className="portfolio__link-text">Статичный сайт</p><p className="portfolio__link-image">↗</p></a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/RTemiy/russian-travel" rel="external" target="_blank" className="portfolio__link link-hover"><p className="portfolio__link-text">Адаптивный сайт</p><p className="portfolio__link-image">↗</p></a>
        </li>
        <li className="portfolio__list-item">
          <a href="https://github.com/RTemiy/mesto" rel="external" target="_blank" className="portfolio__link link-hover"><p className="portfolio__link-text">Одностраничное приложение</p><p className="portfolio__link-image">↗</p></a>
        </li>
        </ul>
      </section>
  )
}