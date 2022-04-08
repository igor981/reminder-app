import React, {useState} from 'react'
import './TaskForm.styles.css'
import { createReminder } from '../../service/reminderService'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TaskForm = () => {

  const [category, setCategory] = useState('regular')
  const [deadline, setDeadline] = useState('')
  const [task, setTask] = useState('')
  const [desc, setDesc] = useState('')
  const [cost, setCost] = useState(0)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState('')
  const [visibility, setVisibiltiy] = useState({public: true, private: false})
  const navigate = useNavigate()

  const user = useSelector((state: any ) => state.user)

  const handleCategorySelect = (value:string) => {
    setCategory(value)
  }
  const handleDateChange = (e: any) => {
    const dateFormat = e.target.value.split('T')[0]
    setDeadline(dateFormat)
  }
  const handleTaskChange = (e: any) => {
    setTask(e.target.value)
  }
  const handleDescChange = (e: any) => {
    setDesc(e.target.value)
    
  }

  const handlePrivateChange = (e: any) => {
    setVisibiltiy({
      public: false,
      private: false,
      [e.target.value]: true,
    })
    
  }

  const onFormSubmit = async(e: any) => {
    setError('')
    setShowError(false)
    e.preventDefault()
    if ( task && desc && user.userId) {

      console.log(deadline, 'THIS IS THE DEADLINE');
      
      const reminder = await createReminder(
        category,
        task,
        desc,
        deadline,
        cost,
        visibility.public,
        user.userId,
      );

      
      if (!reminder.error) {
        navigate("/reminders/" + reminder.task.taskId);
      }
    } else {
      setShowError(true)
      setError('Task & description form cant be empty')
    }
  
  }

  return (
    <div className="taskform__container">
      <form className="taskform" onSubmit={(e) => onFormSubmit(e)}>
        <div className="taskform__task-info">
          <div className="taskform__task-info__task">
            <div className="taskform__input input-enter">
              <label>
                {" "}
                <b>Task:</b>{" "}
              </label>
              <input
                className="task-input taskname"
                type="text"
                onChange={(e) => handleTaskChange(e)}
              />
            </div>
          </div>
          <div className="taskform__task-info__info">
            <div className="taskform__input">
              <label htmlFor="">
                {" "}
                <b>Category:</b>{" "}
              </label>
              <select
                className="category-input"
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value={"regular"}>Regular</option>
                <option value={"work-task"}>Work</option>
                <option value={"food"}>Recipe</option>
                <option value={"shopping-list"}>Shopping list</option>
              </select>
            </div>
            
            {category === "work-task" ? (
              <div className="taskform__input">
                <label>
                  <b>Deadline:</b>
                </label>
                <input
                  className="deadline-input"
                  type="date"
                  onChange={(e) => handleDateChange(e)}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="taskform__description">
          <label>
            <b>Task description:</b>
          </label>
          <textarea
            className="taskform__description__textarea"
            onChange={(e) => handleDescChange(e)}
          />
        </div>
        <div className="taskform__buttons">
          <div className="taskform__visibility-options">
            <p className="visibility-title">
              <b>Visibility:</b>
            </p>
            <div className="1">
              <label>Public</label>
              <input
                type="radio"
                checked={visibility.public}
                value={"public"}
                onChange={(e) => handlePrivateChange(e)}
              />
              <label>Private</label>
              <input
                type="radio"
                checked={visibility.private}
                value={"private"}
                onChange={(e) => handlePrivateChange(e)}
              />
            </div>
          </div>
          <div className="create-reminder-divs">
            <button className="add-button">Add reminder</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TaskForm