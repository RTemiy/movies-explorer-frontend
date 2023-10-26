import './App.css';
import React, {useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NavTab from '../NavTab/NavTab';
import NotFound from '../NotFound/NotFound';
import Movies from "../Movies/Movies";
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {authorize, getContent, register} from "../../utils/Auth";
import {api} from "../../utils/MainApi";
import {ERROR_MESSAGE} from "../../utils/consts";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isNavTabOpened, setIsNavTabOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [allFilms, setAllFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);

  const [isRequestProcess, setIsRequestProcess] = useState(false);

  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  useEffect(() => {
    if (tokenCheck()){
      Promise.all([api.getLikedMovies(), api.getUserInfo()]).then(
        ([liked, user]) => {
          setAllFilms(JSON.parse(localStorage.getItem('moviesData')));
          setSavedFilms(liked.movies)
          setCurrentUser(user);
        }
      ).catch(err => console.log(err))
    } else {
      handleLogout()
    }

  }, [isLoggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      getContent(jwt).then((res) => {
        if (res){
          setIsLoggedIn(true);
          setCurrentUser(res);
        }
      });
      return true;
    }
    else return false;
  }

  function collectFilm(filmData, callback) {
    let id;
    if (savedFilms.some((film) => {
      if(filmData.movieId === film.movieId) {
        id = film._id;
        return true;
      } else return false;
    })){
      api.deleteMovie(id).then(() => {
        setSavedFilms(savedFilms.filter(film => film._id !== id))
        callback()
      }).catch(console.log)
    } else {
      api.postMovie(filmData).then(res => {
        setSavedFilms([res.movie, ...savedFilms])
        callback();
      }).catch(console.log)
    }
  }


  function handleLogout() {
    navigate('/');
    setIsLoggedIn(false);
    localStorage.clear()
  }

  function onLogin({email, password}) {
    setIsRequestProcess(true)
    authorize(email, password).then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        navigate("/movies", {replace: true});
      }
    }).catch(err => {
      console.log(err);
      setRegisterErrorMessage(ERROR_MESSAGE(err));
    }).finally(() => {
      setTimeout(()=> {setLoginErrorMessage('');}, 2000);
      setIsRequestProcess(false);
    })
  }

  function onRegister({name, email, password}){
    setIsRequestProcess(true)
    register({name, email, password}).then(() => {
      onLogin({email, password})
    }).catch(err => {
      console.log(err);
      setRegisterErrorMessage(ERROR_MESSAGE(err));
    }).finally(() => {
      setTimeout(()=> {setRegisterErrorMessage('');}, 2000);
      setIsRequestProcess(false);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {['/','/movies','/saved-movies','/profile'].includes(location.pathname) && <Header isLoggedIn={isLoggedIn} isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>}
      <NavTab isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>

      <main>
      <Routes>
        <Route path="/" element={<Main/>}/>

        <Route path="/movies" element={<ProtectedRoute loggedIn={isLoggedIn} collectFilm={collectFilm} savedFilms={savedFilms} element={Movies}/>}/>
        <Route path="/saved-movies" element={<ProtectedRoute loggedIn={isLoggedIn} collectFilm={collectFilm} savedFilms={savedFilms} initMovies={allFilms} element={SavedMovies}/>}/>
        <Route path="/profile" element={<ProtectedRoute setUser={setCurrentUser} loggedIn={isLoggedIn} element={Profile} logout={handleLogout}/>}/>

        <Route path="/signin" element={<Login onLogin={onLogin} loginErrorMessage={loginErrorMessage} isRequestProcess={isRequestProcess}/>}/>
        <Route path="/signup" element={<Register onRegister={onRegister} registerErrorMessage={registerErrorMessage} isRequestProcess={isRequestProcess}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      {['/','/movies','/saved-movies'].includes(location.pathname) && <Footer/>}
    </CurrentUserContext.Provider>
  );
}

export default App;
