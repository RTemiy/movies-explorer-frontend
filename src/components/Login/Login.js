import React from 'react';
import './Login.css';
import '../Profile/Form.css';
import logo from '../../images/ui/logo.svg';
import {Link} from "react-router-dom";
import useFormValidator from "../../utils/useFormValidator";

export default function Login({onLogin, loginErrorMessage, isRequestProcess}){

  const {formValues, formErrors, isFormValid, handleFormChange} = useFormValidator();

  function handleLogin(evt){
    evt.preventDefault();
    onLogin(formValues)
  }

  return(
    <section className="login">
      <Link to='/' className="button-hover"><img className="login__logo" alt="Иконка приложения" src={logo}/></Link>
      <h1 className="login__header">Рады видеть!</h1>
      <form className="form" id="form-login">
        <label className="form__label">E-mail</label>
        <input readOnly={isRequestProcess} className="form__input" type="email" pattern='^.+@.+\..+$' name="email" placeholder="E-mail" required minLength="2" maxLength="20" onChange={handleFormChange} value={formValues.email || ''}/>
        <span className="form__span">{formErrors.email}</span>
        <label className="form__label">Пароль</label>
        <input readOnly={isRequestProcess} className="form__input" type="password" name="password" placeholder="Пароль" required value={formValues.password} onChange={handleFormChange} minLength="6" maxLength="20"/>
        <span className="form__span-login">{formErrors.password}</span>
        {loginErrorMessage !== '' ? <p style={{textAlign: "center"}}>{loginErrorMessage}</p> : ''}
        <button className="form__submit button-hover" disabled={!isFormValid || isRequestProcess} type="button" onClick={handleLogin}>Войти</button>
      </form>
      <p className="login__span">Еще не зарегистрированы? <Link to='/signup' className="login__link link-hover">Регистрация</Link></p>
    </section>
  )
}