import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import UserPage from './Pages/User/User';
import { Reminders } from './Pages/Reminders/Reminders';
import {io, Socket} from 'socket.io-client'
import NotFound from './Components/NotFound';
import HomeRouter from './Components/HomeRouting';
import Deleted from './Components/Deleted';
import Private from './Components/Private';

export const socket: Socket = io("ws://localhost:3001");function App() {

  useEffect(() => {
  }, [])
  
  return (
    <Router>
    <div className="App">
      <Navbar  />

      <div className='content'>
      <Routes>
      <Route path="/"  element={<HomeRouter   />} />
      <Route path="/login"  element={<Login   />} />
      <Route path="/register"  element={<Register  />} />
      <Route path="/profile"  element={<UserPage />} />
      <Route path="/reminders/*"  element={<Reminders />} />
      <Route path="/404"  element={<NotFound />} />
      <Route path="/reminder-deleted"  element={<Deleted />} />
      <Route path="/unauthorized"  element={<Private />} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
