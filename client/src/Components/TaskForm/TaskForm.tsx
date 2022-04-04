import React, {useState} from 'react'
import './TaskForm.styles.css'
import { createReminder } from '../../service/reminderService'
import { useSelector } from 'react-redux'

const TaskForm = () => {
  const [category, setCategory] = useState('regular')
  const [deadline, setDeadline] = useState('')
  const [task, setTask] = useState('regular')
  const [desc, setDesc] = useState('regular')
  const [cost, setCost] = useState('regular')
  const [visibility, setVisibiltiy] = useState({public: true, private: false})

  const user = useSelector((state: any ) => state.user)

  const handleCategorySelect = (value:string) => {
    setCategory(value)
  }
  const handleDateChange = (e: any) => {
    setDeadline(e.target.value)
  }
  const handleTaskChange = (e: any) => {
    setTask(e.target.value)
  }
  const handleDescChange = (e: any) => {
    setDesc(e.target.value)
    
  }
  const handleCostChange = (e: any) => {
    setCost(e.target.value)
    
  }
  const handlePrivateChange = (e: any) => {
    setVisibiltiy({
      public: false,
      private: false,
      [e.target.value]: true,
    })
  }

  const onFormSubmit = async(e: any) => {
    e.preventDefault()
    const reminder = await createReminder(category, task, desc, deadline, cost, visibility.public, user.userId)
    console.log(reminder);
    
  
  }

  return (
    <div className='taskform-container'>
      TaskForm
      <form className="taskform" onSubmit={(e) => onFormSubmit(e)}>
        <div className="taskform__input">
          <label htmlFor=""> category</label>
          <select onChange={(e) => handleCategorySelect(e.target.value)}>
            <option value={'regular'}>regular</option>
            <option value={'work-task'}>work task</option>
            <option value={'food'}>food</option>
            <option value={'shopping-list'}>shopping list</option>
          </select>
        </div>
        <div className="taskform__input">
          <label>cost</label>
          <input type="number" onChange={(e) => handleCostChange(e)}/>
        </div>
        {category === 'work-task' ? (
        <div className="taskform__input">
          <label>deadline</label>
          <input type="date" onChange={(e) => handleDateChange(e)}/>
        </div>
        ) : null}
        <div className="taskform__input">
          <label>task</label>
          <input type="text" onChange={(e) => handleTaskChange(e)}/>
        </div>
        <div className="taskform__input">
          <label>Desc</label>
          <input type="textarea" onChange={(e) => handleDescChange(e)} />
        </div>
        <div className="taskform__input">
          <label>public</label>
          <input type="radio" checked={visibility.public} value={'public'} onChange={(e) => handlePrivateChange(e)}/>
          <label>private</label>
          <input type="radio" checked={visibility.private} value={'private'} onChange={(e) => handlePrivateChange(e)}/>
        </div>

        <button>Add reminder</button>
      </form>
    </div>
  );
}

export default TaskForm