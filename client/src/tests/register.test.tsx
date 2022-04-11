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
import Register from '../Pages/Register/Register';
import store from '../redux/store';

test('Renders Register component', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('register-form')).toBeTruthy();
});
test('Renders form inputs', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Register />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('username-input')).toBeTruthy();
  expect(queryByTestId('password-input')).toBeTruthy();
  expect(queryByTestId('lname-input')).toBeTruthy();
  expect(queryByTestId('fname-input')).toBeTruthy();
});
