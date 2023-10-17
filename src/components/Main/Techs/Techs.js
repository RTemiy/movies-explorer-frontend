import React from 'react';
import './Techs.css';

export default function Techs (){
  return(
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <hr className="techs__horizontal-rule"/>
      <h3 className="techs__block-header">7 технологий</h3>
      <p className="techs__paragraph">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__list-item"><p>HTML</p></li>
        <li className="techs__list-item"><p>CSS</p></li>
        <li className="techs__list-item"><p>JS</p></li>
        <li className="techs__list-item"><p>React</p></li>
        <li className="techs__list-item"><p>Git</p></li>
        <li className="techs__list-item"><p>Express.js</p></li>
        <li className="techs__list-item"><p>mongoDB</p></li>
      </ul>
    </section>
  )
}