/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { render, screen, queryByAttribute } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Reminders } from '../Pages/Reminders/Reminders';
import Login from '../Pages/Login/Login';
import store from '../redux/store';
import ReminderList from '../Components/ReminderList/ReminderList';

test('Renders login', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('login-form')).toBeTruthy();
});
test('Renders form inputs', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('user-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
});
test('Renders button', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('login-button')).toBeTruthy();
  expect(queryByTestId('login-button')).toHaveTextContent('Log in');
});
