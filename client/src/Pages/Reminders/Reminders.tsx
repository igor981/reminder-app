import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './Reminders.styles.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from '../../Components/TaskForm/TaskForm';
import ReminderList from '../../Components/ReminderList/ReminderList';

export const Reminders = () => {
    const user = useSelector((state: any ) => state.user)

    const navigate = useNavigate()
    useEffect(() => {      
      if (!user) {
          navigate('/login')
      }
    }, [])
    
  return (
    <div className='home-content'>
      <div className='addtodos'>
        <p>Testing</p>
      </div>
      <div className='reminder__button'>
              <Link  to='create-reminder'>Add a reminder</Link>
        </div>
      <div className='reminder__button'>
              <Link  to='all-reminders'>All reminder</Link>
        </div>
      
      <div>
      <Routes>
      <Route path="create-reminder"  element={<TaskForm/>} />
      <Route path="all-reminders"  element={<ReminderList/>} />
      </Routes>
      </div>
    </div>
      
  )
}
