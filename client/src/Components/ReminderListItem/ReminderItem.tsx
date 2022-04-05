import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './ReminderItem.styles.css'

const ReminderItem = ({item}: {item: any}) => {
  const navigate = useNavigate()

    useEffect(() => {
 
    }, [])
    const handleClick = () => {
      navigate('/reminders/'+item.taskId)
    }
  return (
    <li className='reminder-item'  onClick={() => handleClick()}>
      <div className='reminder-item__info'> 
        <p>{item.task}</p>
        <p>{item.category}</p>
      </div>
      <div className='reminder-item__description'>
        <p>{item.description}</p>
      </div>
    </li>
  )
}

export default ReminderItem