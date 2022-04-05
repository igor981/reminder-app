import React, {useEffect, useState} from 'react'
import {logOutAction} from '../../redux/actions/user.actions'
import './Navbar.styles.css'
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import { logOut } from '../../service/authService';
import { useSelector, useDispatch} from 'react-redux';


const Navbar = () => {
  const user = useSelector((state: any ) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut =() => {
        logOut()
        dispatch(logOutAction())
        navigate('/login')        
    }

    useEffect(() => {
        

     
    }, [])
    
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">
          <p className="navbar__logo__text">Reminder.io</p>
        </div>
        <div className="navbar__links">
          <div className="navbar__links__button">
            <Link to="/reminders">
              <b>Reminders</b>
            </Link>
          </div>
          {user ? (
            <>
              <div className="navbar__links__button">
                <Link to="/profile">Profile</Link>
              </div>
              <div
                onClick={() => handleLogOut()}
                className="navbar__links__button"
              >
                <p>
                  <b>Log out</b>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="navbar__links__button">
                <Link to="/login">Login</Link>
              </div>
              <div className="navbar__links__button">
                <Link to="/register">Register</Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar