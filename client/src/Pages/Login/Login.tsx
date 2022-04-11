/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../service/authService';
import { loginAction } from '../../redux/actions/user.actions';
import './Login.styles.css';
import { RootReducerIf } from '../../interfaces';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const user = useSelector((state: RootReducerIf) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUsernameInput = (nameValue: string) => {
    setUsername(nameValue);
  };
  const handlePasswordInput = (passwordValue: string) => {
    setPassword(passwordValue);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setShowMessage(false);
    setMessage('');
    const userFetch = await loginService(username, password);

    if (userFetch.error) {
      setShowMessage(true);
      setMessage(userFetch.error);
    } else {
      dispatch(loginAction(userFetch));
      localStorage.setItem('reminder-user', JSON.stringify(userFetch));
      setTimeout(() => {
        navigate('/');
      }, 300);
    }
  };
  useEffect(() => {
    setShowMessage(false);
    setMessage('');
  }, []);

  return (
    <div className="login__container" data-testid="login-form">
      <form className="login__container__form" onSubmit={(e) => handleLogin(e)}>
        <div data-testid="user-field" className="login__container__username input-field">
          <label htmlFor="username-input">Username</label>
          <input id="username-input" onChange={(e) => handleUsernameInput(e.target.value)} type="text" />

        </div>
        <div data-testid="password-field" className="login__container__password input-field">
          <label htmlFor="password-input">Password</label>
          <input id="password-input" onChange={(e) => handlePasswordInput(e.target.value)} type="password" />

        </div>
        <div className="login__container__button">
          <button data-testid="login-button" type="submit">Log in</button>
        </div>
      </form>
      {showMessage && message.length > 0 ? <p>{message}</p> : null }
    </div>
  );
};

export default Login;
