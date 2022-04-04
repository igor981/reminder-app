import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import UserPage from './Pages/User/User';
import { Reminders } from './Pages/Reminders/Reminders';
import io from 'socket.io-client'


//const socket: any = io.connect("http://localhost:3001");
function App() {



  const [user, setUser] = useState<any>()


  const handleUserData = (userData: any) => {
    
    setUser(userData)
  }

  useEffect(() => {
  }, [])
  
  return (
    <Router>
    <div className="App">
      <Navbar  />

      <div className='content'>
      <Routes>
      <Route path="/login"  element={<Login  handleUserData={handleUserData} />} />
      <Route path="/register"  element={<Register handleUserData={handleUserData} />} />
      <Route path="/profile"  element={<UserPage />} />
      <Route path="/reminders/*"  element={<Reminders />} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
