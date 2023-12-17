import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom" 
import Register from "./pages/Register"
import Login from './pages/Login'
import Chat from './pages/Chat'
import Avatar from './pages/Avatar'

export default function App() {
  return <BrowserRouter>
<Routes>
  <Route path="/register" element={<Register/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/" element={<Chat/>} />
  <Route path="/avatar" element={<Avatar/>} />
</Routes>
  </BrowserRouter>
}
