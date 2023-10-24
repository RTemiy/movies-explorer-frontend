import './App.css';
import React, {useEffect, useState} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Route, Routes, useLocation} from 'react-router-dom';
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
  const [savedMovies, setSavedMovies] = useState([])

  useEffect(() => {

    if (tokenCheck()){
      api.getLikedMovies().then(res=>{
        setSavedMovies(res.movies)
      }).catch(e =>{
        console.log(e)
      })

      api.getUserInfo().then(res=>{
        setCurrentUser(res);

      }).catch(e =>{
        console.log(e)
      })
    }

    return(()=>{})
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


  return (
    <CurrentUserContext.Provider value={currentUser}>
      {['/','/movies','/saved-movies','/profile'].includes(location.pathname) && <Header isLoggedIn={isLoggedIn} isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>}
      <NavTab isNavTabOpened={isNavTabOpened} setIsNavTabOpened={setIsNavTabOpened}/>

      <main>
      <Routes>
        <Route path="/" element={<Main/>}/>

        <Route path="/movies" element={<ProtectedRoute element={Movies}/>}/>
        <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies}/>}/>
        <Route path="/profile" element={<ProtectedRoute element={Profile} logout={()=>{setIsLoggedIn(false)}}/>}/>

        <Route path="/signin" element={<Login setLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser()}/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      {['/','/movies','/saved-movies'].includes(location.pathname) && <Footer/>}
    </CurrentUserContext.Provider>
  );
}

export default App;
