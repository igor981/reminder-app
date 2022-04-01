import React, {useEffect, useState} from 'react'
import './Navbar.styles.css'
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import { logOut } from '../../service/authService';


const Navbar = ({handleUserData, user}:{user: any, handleUserData: any}) => {
    const navigate = useNavigate()

    const handleLogOut =() => {
        logOut()
        navigate('/login')
        handleUserData(null)
    }

    useEffect(() => {
        

     
    }, [])
    
  return (
      <div>
      <nav className='navbar'>
          <div className='navbar__logo'>
              <p>Reminders</p>
          </div>
          <div className='navbar__links'>
              <div className='navbar__links__button'>
              <Link  to='/'>Home</Link>
              </div>
              {user ? (
                  <>
                <div className='navbar__links__button'>
                <Link  to='/profile'>Profile</Link>
                </div>
              <div onClick={() => handleLogOut()}className='navbar__links__button'>
                  <p>Log out</p>
              </div>
                  </>
              ) :
              (
                <>
              <div className='navbar__links__button'>
              <Link to='/login'>Login</Link>
              </div>
                <div className='navbar__links__button'>
                <Link  to='/register'>Register</Link>
                </div>
                </>
              )
              }
          </div>
      </nav>
      </div>
  )
}

export default Navbar