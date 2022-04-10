import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import { socket } from '../../../App'
import './ReminderItem.styles.css'
import { checkTask, deleteTask } from '../../../redux/actions/reminderList.actions'

const ReminderItem = ({item}: {item: any}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCheck = ( ) => {
    const updatedItem = {
      ...item,
      checked: !item.checked
    }

    dispatch(checkTask(updatedItem))
   
    socket.emit('check-task', updatedItem)
    
  }
  
  const handleDelete = () => {
    socket.emit('delete-task', item.taskId)
    dispatch(deleteTask(item))
    
  }

    useEffect(() => {
 
    }, [])

  return (
    <li id={item.checked? 'checked' : 'unchecked'} className={item.checked ? 'reminder-item-home item-checked' : 'reminder-item-home'}>
      <div className='reminder-item-home__info'> 
        <p>{item.task}</p>
        <p>{item.category}</p>
      </div>
      <div className='reminder-item-home__description'>
        <div className='reminder-item-home__description__text'>

    
        <ReactMarkdown children={item.description} />
        </div>

        <div className='reminder-item-home__description__buttons'>
          
        <div className='reminder-item-home__description__buttons__top'>

        <button onClick={() =>  navigate('/reminders/'+item.taskId) }>View</button>
        <button onClick={() =>  handleCheck() } >Check</button>
        </div>
        <div className='reminder-item-home__description__buttons__bottom'>
        <button onClick={() =>  handleDelete() } >Delete</button>

        </div>
        </div>

      </div>
    </li>
  )
}

export default ReminderItem