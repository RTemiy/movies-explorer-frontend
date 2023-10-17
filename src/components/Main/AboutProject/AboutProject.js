import React from 'react';
import './AboutProject.css'

export default function AboutProject (){
  return(
    <section className="about-project">
      <h2 className="about-project__header">О проекте</h2>
      <hr className="about-project__horizontal-rule"/>
      <div className="about-project__blocks">
        <article className="about-project__block">
          <h3 className="about-project__block-header">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__block-paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="about-project__block">
          <h3 className="about-project__block-header">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__block-paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__weeks">
        <div className="about-project__week">
          <div className="about-project__week-container">
            <p className="about-project__week-paragraph">1 неделя</p>
          </div>
          <p className="about-project__week-caption">Back-end</p>
        </div>
        <div className="about-project__week">
          <div className="about-project__week-container_empty">
            <p className="about-project__week-paragraph_empty">4 недели</p>
          </div>
          <p className="about-project__week-caption">Front-end</p>
        </div>
      </div>
    </section>
  )
}