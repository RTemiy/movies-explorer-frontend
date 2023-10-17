import React from "react";
import './Profile.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

export default function Profile(){

  const currentUserContext = React.useContext(CurrentUserContext);
  const [isRedacted, setIsRedacted] = React.useState(false);
  const [userName,setUserName] = React.useState(currentUserContext.name);
  const [userEmail,setUserEmail] = React.useState(currentUserContext.email);

  function handleChangeName(e){
    setUserName(e.target.value);
  }

  function handleChangeEmail(e){
    setUserEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  React.useEffect(()=>{
    setUserName(currentUserContext.name);
    setUserEmail(currentUserContext.email);
  },[currentUserContext,isRedacted]);

  return(
    <section className="profile">
      <h1 className="profile__header">Привет, {currentUserContext.name}!</h1>
      <div className={`${isRedacted ? 'disabled' : 'profile__form'}`}>
        <div className="profile__form-block">
          <p className="profile__form-label">Имя</p>
          <p className="profile__form-label">{currentUserContext.name}</p>
        </div>
        <hr className="profile__form-divider"/>
        <div className="profile__form-block">
          <p className="profile__form-label">Почта</p>
          <p className="profile__form-label">{currentUserContext.email}</p>
        </div>
        <div className="profile__button-block">
          <button className="profile__link-button link-hover" onClick={() =>{setIsRedacted(true)}}>Редактировать</button>
          <button className="profile__link-button link-hover">Выйти из аккаунта</button>
        </div>
      </div>
      <form className={`profile__form ${!isRedacted && 'disabled'}`}>
        <div className="profile__form-block">
          <label className="profile__form-label">Имя</label>
          <input type="text" className="profile__form-label" value={userName || ''} onChange={handleChangeName}>{}</input>
        </div>
        <hr className="profile__form-divider"/>
        <div className="profile__form-block">
          <label className="profile__form-label">Почта</label>
          <input type="text" className="profile__form-label" value={userEmail || ''} onChange={handleChangeEmail}></input>
        </div>
        <p className="profile__form-span"></p>
        <button className="profile__form-submit button-hover" onSubmit={handleSubmit}>Сохранить</button>
      </form>
    </section>
  )
}