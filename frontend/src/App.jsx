"use client"
import { Navigate, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { TbLoader2 } from "react-icons/tb";
import {ToastContainer} from 'react-toastify'

import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {useAuthStore} from './store/authStore.js'
import { useThemeStore } from './store/themeStore.js'

function App() {
  const {authUser, checkAuth, isCheckingAuth, isSigningUp, isLogginIn} = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    if(!isSigningUp && !isLogginIn)
      checkAuth();
  }, [checkAuth, isLogginIn, isSigningUp]); // ? modified

  // console.log({authUser});

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <TbLoader2 size={50} className='animate-spin'/>
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
      </Routes>
    </div>
  )
}

export default App
