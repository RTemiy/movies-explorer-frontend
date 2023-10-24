import React from 'react';
import './Login.css';
import '../Profile/Form.css';
import logo from '../../images/ui/logo.svg';
import {Link, useNavigate} from "react-router-dom";
import useFormValidator from "../../utils/useFormValidator";
import {authorize} from "../../utils/Auth";
import {api} from "../../utils/MainApi";

export default function Login({setLoggedIn, setCurrentUser}){

  const {formValues, formErrors, isFormValid, handleFormChange, setFormValues} = useFormValidator();
  const navigate = useNavigate()

  function handleLogin(evt){
    evt.preventDefault();
    if (!formValues.email || !formValues.password){
      return;
    }
    authorize(formValues.email, formValues.password)
      .then(data => {
        if (data) {
          setFormValues({email: '', password: ''});
          setLoggedIn(true);
          api.getUserInfo().then(res=>{
            setCurrentUser(res);

          }).catch(e =>{
            console.log(e)
          })
          navigate("/movies", {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return(
    <section className="login">
      <Link to='/' className="button-hover"><img className="login__logo" alt="Иконка приложения" src={logo}/></Link>
      <h1 className="login__header">Рады видеть!</h1>
      <form className="form" id="form-login">
        <label className="form__label">E-mail</label>
        <input className="form__input" type="email" name="email" placeholder="E-mail" required minLength="2" maxLength="20" onChange={handleFormChange} value={formValues.email || ''}/>
        <span className="form__span">{formErrors.email}</span>
        <label className="form__label">Пароль</label>
        <input className="form__input" type="password" name="password" placeholder="Пароль" required value={formValues.password} onChange={handleFormChange} minLength="2" maxLength="20"/>
        <span className="form__span-login">{formErrors.password}</span>
        <button className="form__submit button-hover" disabled={!isFormValid} type="submit" onSubmit={handleLogin}>Войти</button>
      </form>
      <p className="login__span">Еще не зарегистрированы? <Link to='/signup' className="login__link link-hover">Регистрация</Link></p>
    </section>
  )
}