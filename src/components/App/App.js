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
import {getContent} from "../../utils/Auth";
import {api} from "../../utils/MainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isNavTabOpened, setIsNavTabOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [allFilms, setAllFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([])

  useEffect(() => {

    if (tokenCheck()){
      Promise.all([api.getLikedMovies(), api.getUserInfo()]).then(
        ([liked, user]) => {
          setAllFilms(JSON.parse(localStorage.getItem('moviesData')));
          setSavedFilms(liked.movies)
          setCurrentUser(user);

          /*liked.movies.forEach(film=> {
            api.deleteMovie(film._id).then(console.log)
          })*/

        }
      ).catch(err => console.log(err))
    }

  }, [location])


  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      getContent(jwt).then((res) => {
        if (res){
          setIsLoggedIn(true);
          setCurrentUser(res)
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

        <Route path="/signin" element={<Login setLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser}/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      {['/','/movies','/saved-movies'].includes(location.pathname) && <Footer/>}
    </CurrentUserContext.Provider>
  );
}

export default App;
