import React, {useEffect, useState} from 'react'
import { io, Socket} from 'socket.io-client'
import { useSelector } from 'react-redux';
import ReminderItem from '../ReminderListItem/ReminderItem';
import './ReminderList.styles.css'
import { socket } from '../../App';



const ReminderList = () => {
  const user = useSelector((state: any ) => state.user)
  const [taskList, setTaskList] = useState([])

  socket.on('sendTasks', (task) => {
    console.log(task);
    
    if (!task.error) {
      setTaskList(task)
    } else {
      console.log('failure');
      
    }
    /* if (!subtask.error) {
      setTaskList(subtask)
    } */
    
  })

    useEffect(() => {
      console.log(Date.now());
      
    socket.emit('getTasks', user.userId)
     
    }, [])
    
  return (
    <div className='reminder-list-container'>
      <ul className='reminder-list__ul'>
        {taskList && taskList.map((item, i) => {
          
          return <ReminderItem key={i} item={item}/>
        })}
      </ul>
    </div>
  )
}

export default ReminderList