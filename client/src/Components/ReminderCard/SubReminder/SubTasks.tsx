import React, {useEffect} from 'react'
import './Subtasks.styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { socket } from '../../../App'
import { deleteSubtask } from '../../../redux/actions/reminder.actions'
const SubTasks = ({item, changeSum} : {item: any, changeSum: any}) => {
    const dispatch = useDispatch()

    const deleteItem = () => {
        socket.emit('delete-subtask', item.subTaskId)
        dispatch(deleteSubtask(item.subTaskId))

    }

    const checkItem = () => {

    }

    useEffect(() => {
        changeSum(item.cost)
    }, [])
    

  return (
            
              <li className='subtask-item' >
                <div className='reminder-item__info'> 
                    <p>{item && item.task}</p>
                    <p>{item && item.category}</p>
                </div>
                <div className='subtask-item__description'>
                    <p>{item && item.description}</p>
                    <div className='reminder-item__description__buttons' >
                    <button className='check'>Check</button>
                    <button onClick={() => deleteItem()} className='delete'>Delete</button>
                    </div>
                </div>
              </li>
    
     
  )
}

export default SubTasks