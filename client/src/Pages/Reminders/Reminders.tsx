import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './Reminders.styles.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from '../../Components/TaskForm/TaskForm';
import ReminderList from '../../Components/ReminderList/ReminderList';
import ReminderCard from '../../Components/ReminderCard/ReminderCard';

export const Reminders = () => {
    const user = useSelector((state: any ) => state.user)

    const navigate = useNavigate()
    useEffect(() => {      
      if (!user) {
          navigate('/login')
      }
    }, [])
    
  return (
    <div className="home-content">
      <div className="home-content__buttons">
        <div className="reminder__button">
          <Link to="all-reminders"><b>View all reminders</b></Link>
        </div>
        <div className="reminder__button">
          <Link to="create-reminder"><b>Create Reminder</b></Link>
        </div>
      </div>

      <div className='home-content-routes'>
        <Routes>
          <Route path="create-reminder" element={<TaskForm />} />
          <Route path="all-reminders" element={<ReminderList />} />
          <Route path=":reminderId" element={<ReminderCard />} />
        </Routes>
      </div>
    </div>
  );
}
