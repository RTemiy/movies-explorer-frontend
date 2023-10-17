import React from 'react';
import './Portfolio.css';
import {Link} from "react-router-dom";

export default function Portfolio (){
  return(
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <Link to="" className="portfolio__link"><p className="portfolio__link-text link-hover">Статичный сайт</p><p className="portfolio__link-image">↗</p></Link>
      <hr className="portfolio__horizontal-rule"/>
      <Link to="" className="portfolio__link"><p className="portfolio__link-text link-hover">Адаптивный сайт</p><p className="portfolio__link-image">↗</p></Link>
      <hr className="portfolio__horizontal-rule"/>
      <Link to="" className="portfolio__link"><p className="portfolio__link-text link-hover">Одностраничное приложение</p><p className="portfolio__link-image">↗</p></Link>
    </section>
  )
}