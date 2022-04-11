/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerService } from '../../service/authService';
import './Register.styles.css';
import { RootReducerIf } from '../../interfaces';
import { loginAction } from '../../redux/actions/user.actions';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [fName, setFname] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const user = useSelector((state: RootReducerIf) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUsernameInput = (nameValue: string) => {
    setUsername(nameValue);
  };
  const handleFirstNameInput = (nameValue: string) => {
    setFname(nameValue);
  };
  const handlelastNameInput = (nameValue: string) => {
    setLName(nameValue);
  };
  const handlePasswordInput = (passwordValue: string) => {
    setPassword(passwordValue);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setShowMessage(false);
    setMessage('');

    if (username && password && fName && lName) {
      const userFetch = await registerService(username, password, fName, lName);

      if (userFetch.error) {
        setShowMessage(true);
        setMessage(userFetch.error);
      } else {
        navigate('/');
      }
    } else {
      setShowMessage(true);
      setMessage('All input fields must be filled');
    }
  };

  useEffect(() => {
    setShowMessage(false);
    setMessage('');
  }, []);

  return (
    <div className="register__container" data-testid="register-form">
      <form
        className="login__container__form"
        onSubmit={(e) => handleRegister(e)}
      >
        <div className="input-field">
          <label htmlFor="username-input">Username</label>
          <input
            data-testid="username-input"
            id="username-input"
            onChange={(e) => handleUsernameInput(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-field">
          <label htmlFor="password-input">Password</label>
          <input
            data-testid="password-input"
            id="password-input"
            onChange={(e) => handlePasswordInput(e.target.value)}
            type="password"
          />
        </div>
        <div className="input-field">
          <label htmlFor="fname-input">First name</label>
          <input
            id="fname-input"
            data-testid="fname-input"
            onChange={(e) => handleFirstNameInput(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-field">
          <label htmlFor="lname-input">Last name</label>
          <input
            id="lname-input"
            data-testid="lname-input"
            onChange={(e) => handlelastNameInput(e.target.value)}
            type="text"
          />
        </div>
        <div className="input-field" />
        <div className="login__container__button">
          <button type="submit">Register</button>
        </div>
      </form>
      {showMessage && message.length > 0 ? <p>{message}</p> : null}
    </div>
  );
}

export default Register;
