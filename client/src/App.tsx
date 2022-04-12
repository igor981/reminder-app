import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import './App.css';
import { io, Socket } from 'socket.io-client';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import { Reminders } from './Pages/Reminders/Reminders';
import NotFound from './Components/NotFound';
import HomeRouter from './Components/HomeRouting';
import Deleted from './Components/Deleted';
import Private from './Components/Private';

export const socket: Socket = io('https://reminderio-backend.herokuapp.com/'); function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<HomeRouter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reminders/*" element={<Reminders />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/reminder-deleted" element={<Deleted />} />
            <Route path="/unauthorized" element={<Private />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
