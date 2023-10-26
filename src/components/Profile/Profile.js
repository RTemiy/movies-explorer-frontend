import React, {useContext, useState} from "react";
import './Profile.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import useFormValidator from "../../utils/useFormValidator";
import {api} from "../../utils/MainApi";

export default function Profile({logout,setUser}){

  const currentUserContext = useContext(CurrentUserContext);
  const [isRedacted, setIsRedacted] = useState(false);

  const {formValues, isFormValid, handleFormChange, setFormValues} = useFormValidator();

  const  [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    api.sendUserInfo(formValues).then(res => {
      setUser(res.data)
      setIsRedacted(false)
      setErrorMessage('Профиль успешно отредактирован');
    }).catch(err => {
      console.log(err);
      setErrorMessage('При обновлении профиля произошла ошибка');
    })
  }

  function handleEdit(e) {
    e.preventDefault();
    setIsRedacted(true);
    setFormValues(currentUserContext);
  }

  const isSaveAvailable = isFormValid && (formValues.name !== currentUserContext.name || formValues.email !== currentUserContext.email)

  React.useEffect(()=>{
  },[currentUserContext]);

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
          {errorMessage !== '' ? <p style={{textAlign: "center"}}>{errorMessage}</p> : '' }
          <button className="profile__link-button link-hover" onClick={handleEdit} type="button">Редактировать</button>
          <button className="profile__link-button link-hover" onClick={logout} type="button">Выйти из аккаунта</button>
        </div>
      </div>
      <form className={`profile__form ${!isRedacted && 'disabled'}`}>
        <div className="profile__form-block">
          <label className="profile__form-label">Имя</label>
          <input type="text" placeholder="Имя" name="name" className="profile__form-label" required minLength="2" maxLength="20" value={formValues.name || ''} onChange={handleFormChange}>{}</input>
        </div>
        <hr className="profile__form-divider"/>
        <div className="profile__form-block">
          <label className="profile__form-label">Почта</label>
          <input type="email" placeholder="Почта" name="email" pattern='^.+@.+\..+$' className="profile__form-label" required minLength="2" maxLength="20" value={formValues.email || ''} onChange={handleFormChange}></input>
        </div>
        <p className="profile__form-span"></p>
        <button className="profile__form-submit button-hover" disabled={!isSaveAvailable} type="button" onClick={handleSubmit}>Сохранить</button>
      </form>
    </section>
  )
}