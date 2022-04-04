import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.styles.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from '../../Components/TaskForm/TaskForm';

const Home = ({user}:{user:any}) => {
    const navigate = useNavigate()
    useEffect(() => {      
      if (user === null){
          navigate('/login')
      }
    }, [])
    
  return (
    <div className='home-content'>
      <div className='addtodos'>
        <p>Testing</p>
      </div>
      <div className='todos'>

      </div>
      
      <div>
      <Routes>
      <Route path="create-task"  element={<TaskForm/>} />
      </Routes>
      </div>
    </div>
      
  )
}

export default Home