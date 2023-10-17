import './App.css';
import React, {useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {userData} from '../../utils/consts';
import {Route, Routes} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';
import NotFound from '../NotFound/NotFound';
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isNavTabOpened, setIsNavTabOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setCurrentUser(userData);
    return(()=>{})
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      {/* eslint-disable-next-line no-restricted-globals */}
      {['/','/movies','/saved-movies','/profile'].includes(location.pathname) && <Header isLoggedIn={isLoggedIn} isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>}
      <NavTab isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>
      <Preloader isLoading={isLoading}/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* eslint-disable-next-line no-restricted-globals */}
      {['/','/movies','/saved-movies'].includes(location.pathname) && <Footer/>}
    </CurrentUserContext.Provider>
  );
}

export default App;
