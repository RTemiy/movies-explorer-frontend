import React from 'react';
import './Register.css';
import '../Profile/Form.css';
import logo from '../../images/ui/logo.svg';
import {Link, useNavigate} from 'react-router-dom';
import useFormValidator from '../../utils/useFormValidator';
import {register} from "../../utils/Auth";

export default function Register(){

  const navigate = useNavigate()
  const {formValues, formErrors, isFormValid, handleFormChange} = useFormValidator();

  function handleRegister(evt){
    evt.preventDefault();
    register(formValues).then(res => {
      if(res.status === false){
        console.log(res)
      }
      else{
        navigate('/signin', {replace: true})
      }

    })
  }

  return(
    <section className="register">
      <Link to='/' className="button-hover"><img className="register__logo" alt="Иконка приложения" src={logo}/></Link>
      <h1 className="register__header">Добро пожаловать!</h1>
      <form className="form" id="form-register">
        <label className="form__label">Имя</label>
        <input className="form__input" type="text" name="name" placeholder="Имя" minLength="2" maxLength="20" onChange={handleFormChange} value={formValues.name || ''}/>
        <span className="form__span">{formErrors.name}</span>
        <label className="form__label">E-mail</label>
        <input className="form__input" type="email" name="email" placeholder="E-mail" required minLength="2" maxLength="20" onChange={handleFormChange} value={formValues.email || ''} />
        <span className="form__span">{formErrors.email}</span>
        <label className="form__label">Пароль</label>
        <input className="form__input" type="password" name="password" placeholder="Пароль" minLength="2" maxLength="20" onChange={handleFormChange} value={formValues.password || ''}/>
        <span className="form__span">{formErrors.password}</span>
        <button className="form__submit" type="submit" disabled={!isFormValid} onClick={handleRegister}>Зарегистрироваться</button>
      </form>
      <p className="register__span">Уже зарегистрированы? <Link to='/signin' className="register__link link-hover">Войти</Link></p>
    </section>
  )
}