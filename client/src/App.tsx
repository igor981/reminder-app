import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Navbar from './Components/Navbar/Navbar';
import UserPage from './Pages/User/User';

function App() {



  const [user, setUser] = useState<any>()


  const handleUserData = (userData: any) => {
    setUser(userData)
  }

  useEffect(() => {
    const storedString: string = localStorage.getItem('reminder-user') || ''
    if (storedString.length > 0){
      const storedUser = JSON.parse(storedString)
      if(storedUser !== undefined){        
        setUser(storedUser)
      }

    } else {
      setUser(undefined)
    }
  }, [])
  
  return (
    <Router>
    <div className="App">
      <Navbar handleUserData={handleUserData} user={user} />

      <div className='content'>
      <Routes>
      <Route path="/"  element={<Home user={user}/>} />
      <Route path="/login"  element={<Login  handleUserData={handleUserData} />} />
      <Route path="/register"  element={<Register handleUserData={handleUserData} />} />
      <Route path="/profile"  element={<UserPage user={user} />} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
