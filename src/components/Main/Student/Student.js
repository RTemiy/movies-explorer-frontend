import React from 'react';
import './Student.css';
import student from '../../../images/student.png';

export default function Student (){
  return(
    <section className="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__block">
      <article className="student__article">
        <h3 className="student__name">Виталий</h3>
        <p className="student__article-header">Фронтенд-разработчик, 30 лет</p>
        <p className="student__paragraph">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a href="https://github.com/RTemiy" rel="external" target="_blank"  className="student__caption link-hover">Github</a>
      </article>
      <img className="student__picture" src={student} alt="Фотография студента"/>
      </div>
    </section>
  )
}