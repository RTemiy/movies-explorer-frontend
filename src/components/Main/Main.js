import React from 'react';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Promo from './Promo/Promo';
import Student from './Student/Student';
import Portfolio from './Portfolio/Portfolio';

export default function Main() {
  return(
    <main>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <Student/>
      <Portfolio/>
    </main>
  );
}