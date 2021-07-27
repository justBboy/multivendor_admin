import React, { useEffect } from 'react';
import Routes from './Routes';
import "./App.css";
import { Login } from './pages';
import { auth } from "./Firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/auth/AuthSlice';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import colors from './constants/colors';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(user => {
      if (user) {
        const userInfo = {
          id: user?.uid,
          displayName: user?.displayName,
          photoUrl: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          email: user?.email
        }
        setLoading(false);
        dispatch(login(userInfo))
      }else{
        setLoading(false);
        dispatch(logout())
      }
    })
    /* if (auth.currentUser) {
      console.log(auth.currentUser)
      const user = auth.currentUser;
      const userInfo = {
        id: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        phoneNumber: user.phoneNumber,
        email: user.email
      }
      dispatch(login(userInfo))
    } */
  }, [auth.currentUser])
  return (
    <>
      {
        loading
        ?
        <div style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(90deg, rgba(255,183,77,1) 0%, rgba(230,81,0,1) 35%, rgba(255,209,128,1) 100%)"
        }}>
          <CircularProgress size={100} />
        </div>
        :
        user
          ?
          <Routes />
          :
          <Login />

      }
    </>
  )
}

export default App;
