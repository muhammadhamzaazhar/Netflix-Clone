import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from './pages/homescreen/homescreen.component';
import Profile from './components/profile/profile.component';
import LoginPage from './pages/login/login.component';

import { auth } from './utils/firebase.utils';
import { login, logout, selectUser } from './redux/user/userSlice';

import './App.css'

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email
          })
        )
      } else {
        dispatch(logout());
      }
    })

    return unsubscribe;
  }, [dispatch])

  return (
    <div className="app">
      {
        !user ? (<LoginPage />
        ) : (
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        )
      }

    </div>
  )
}

export default App
