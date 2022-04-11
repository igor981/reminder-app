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
import { configureStore } from '@reduxjs/toolkit';

import { render, screen, queryByAttribute } from '@testing-library/react';

import { Provider } from 'react-redux';
import ReminderList from '../Components/ReminderList/ReminderList';
import ReminderCard from '../Components/ReminderCard/ReminderCard';
import ReminderItem from '../Components/ReminderList/ReminderListItem/ReminderItem';
import { Reminders } from '../Pages/Reminders/Reminders';
import rootReducer from '../redux/reducers/index';

const preloadedState: any = {
  user: {
    userId: '1231za-21-sa',
    username: '1231za-21-sa',
  },
};
const store = configureStore({ reducer: rootReducer, preloadedState });
test('Renders Reminders without crashing', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Reminders />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('reminders-content')).toBeTruthy();
});
test('Should display sidebuttons', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Reminders />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('view-all')).toBeTruthy();
  expect(queryByTestId('create')).toBeTruthy();
});
test('Renders Reminders page', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Reminders />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('reminders-content')).toBeTruthy();
});
test('Renders buttons on Reminders page', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <Reminders />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('view-all')).toBeTruthy();
  expect(queryByTestId('create')).toBeTruthy();
});
test('Renders list', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <ReminderList />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('reminder-list')).toBeTruthy();
});

test('Renders Reminder Card', () => {
  const { queryByTestId } = render(
    <Provider store={store}>
      <Router>
        <ReminderCard />
      </Router>
    </Provider>,
  );

  expect(queryByTestId('reminder-card')).toBeTruthy();
});
