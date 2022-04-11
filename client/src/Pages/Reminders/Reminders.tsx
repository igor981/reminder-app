/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-duplicates */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Reminders.styles.css';
import { Routes, Route, Link } from 'react-router-dom';
import TaskForm from '../../Components/TaskForm/TaskForm';
import ReminderList from '../../Components/ReminderList/ReminderList';
import ReminderCard from '../../Components/ReminderCard/ReminderCard';
import { RootReducerIf } from '../../interfaces';

export function Reminders() {
  const user = useSelector((state: RootReducerIf) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="home-content" data-testid="reminders-content">
      <div className="home-content__buttons">
        <div data-testid="view-all" className="reminder__button">
          <Link to="all-reminders"><b>View all reminders</b></Link>
        </div>
        <div data-testid="create" className="reminder__button">
          <Link to="create-reminder"><b>Create Reminder</b></Link>
        </div>
      </div>

      <div className="home-content-routes">
        <Routes>
          <Route path="create-reminder" element={<TaskForm />} />
          <Route path="all-reminders" element={<ReminderList />} />
          <Route path=":reminderId" element={<ReminderCard />} />
        </Routes>
      </div>
    </div>
  );
}
