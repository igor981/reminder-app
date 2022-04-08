import React, {useEffect} from 'react'
import './Subtasks.styles.css'
const SubTasks = ({item, changeSum, handleDeleteSubtask} : {item: any, changeSum: any, handleDeleteSubtask: any}) => {


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
                    <button onClick={() => handleDeleteSubtask(item.subTaskId)} className='delete'>Delete</button>
                    </div>
                </div>
              </li>
    
     
  )
}

export default SubTasks