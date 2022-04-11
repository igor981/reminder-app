/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutAction } from '../../redux/actions/user.actions';
import './Navbar.styles.css';
import { logOut } from '../../service/authService';

function Navbar() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    dispatch(logOutAction());
    navigate('/login');
  };

  useEffect(() => {

  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">
          <p className="navbar__logo__text">Reminder.io</p>
        </div>
        <div className="navbar__links">
          { user ? (
            <div className="navbar__links__button">
              <Link to="/reminders/all-reminders">
                <p>
                  <b className="navbar-button-text">Reminders</b>
                </p>
              </Link>
            </div>
          ) : null }
          {user ? (

            <div
              onClick={() => handleLogOut()}
              className="navbar__links__button"
            >
              <p>
                <b className="navbar-button-text">Log out</b>
              </p>
            </div>

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

        <div className="github">
          <a href="https://github.com/igor981/reminder-app">Github</a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
