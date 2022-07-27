import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditModal from '../components/EditModal'
import BasicModal from '../components/Modal'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/auth-context'
import { UserContextProvider } from '../context/user-context'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Settings from '../pages/Settings'

const AppRouter = () => {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <BasicModal />
          <EditModal />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='settings' element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  )
}

export default AppRouter
