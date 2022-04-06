import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchedReminder, updateReminder } from '../../redux/actions/reminder.actions';
import './ReminderCard.styles.css'
import { socket } from '../../App';

import SubReminderCreate from './SubReminder/SubReminderCreate';
import SubTasks from './SubReminder/SubTasks';




const ReminderCard = () => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [sumState, setSumState] = useState(0)
    const [newSubtask, setNewSubtask] = useState(false)
    const reminder = useSelector((state: any ) => state.reminder)
    const {reminderId} = useParams()
    const uuidReg = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/i

    const navigate = useNavigate()

    
    const logger = (message: string, message2: string) => {
        console.log(message, message2);
        
    }

    const changeSum = (cost:number) => {
      const newSum = sumState + cost
      setSumState(newSum)

    }

    const deleteReminder = () => {     
      socket.emit('delete-reminder', reminder.taskId)
      navigate('/404')
    }
    
    const updateSocket = (updatedReminder: any) => {
        socket.emit('update-task', updatedReminder, logger)
    }
    
    const handleChange = (e: any) => {        
        let updatedReminder = {
            ...reminder,
            [e.target.id]: e.target.value
        }   

        dispatch(updateReminder(updatedReminder))
       updateSocket(updatedReminder)      
    }
    

    useEffect(() => {
      socket.on('deleted-reminder', async () => {
        navigate('/404')
      })
      socket.on('sendTask', async (data) => {
          if (!data.error){
            dispatch(fetchedReminder(data))   
          } else {
            navigate('/404')
          }  
        })
        socket.on("getUpdatedTask", async (data) => {
          dispatch(updateReminder(data));
        });
      }, [socket])
      
      useEffect(() => {
        if (!uuidReg.test(reminderId || "")) {
          navigate("/404");
        } else {
          socket.emit("join-room", reminderId, logger);
        }
      }, []);
    
  return (
    <div className="remindercard">
      <div className="remindercard__header">
        <div className="remindercard__header__title">
          {editMode === false ? (
            <h1 className="task-name"> {reminder && reminder.task}</h1>
          ) : (
            <>
              <p>Task: </p>
              <input
                type="text"
                id="task"
                placeholder={reminder.task}
                onChange={(e) => handleChange(e)}
              />
            </>
          )}
        </div>
        <div className="remindercard__header__info">
          {editMode === false && reminder.category === "work-task" ? (
            <p className="task-name">
              Deadline need fix
              {/* { reminder.deadline && reminder.deadline.length > 0 ? {e} : null} */}
            </p>
          ) : editMode === true && reminder.category === "work-task" ? (
            <input type="date" onChange={(e) => handleChange(e)} />
          ) : null}
          {editMode === false ? (
            <p>
              <b>Category:</b> {reminder && reminder.category}
            </p>
          ) : (
            <>
              <p>
                <b>Category:</b>
              </p>
              <select id="category" onChange={(e) => handleChange(e)}>
                <option value={"regular"}>Choose Category</option>
                <option value={"regular"}>regular</option>
                <option value={"work-task"}>work task</option>
                <option value={"food"}>food</option>
                <option value={"shopping-list"}>shopping list</option>
              </select>
            </>
          )}
          <p>
            {" "}
            <b>Total sum:</b> {sumState}
          </p>
          <p>
            {" "}
            <b>Cost:</b> {reminder.cost}
          </p>
          <div className="header-buttons">
            <button
              className="edit-button"
              onClick={() => setEditMode(!editMode)}
            >
              Edit
            </button>
            <button
              className="edit-button delete"
              onClick={() => deleteReminder()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="remindercard__content">
        {editMode === false ? (
          <>
            <div className="taskDescription">
              <p className="taskDescription-tag">
                <b>Description: </b>
              </p>
              <p className="taskDescription-text">
                {reminder && reminder.description}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="taskDescription">
              <p className="taskDescription-tag">
                <b>Description:</b>
              </p>
              <input
                className="taskDescription-text"
                id="description"
                type="textarea"
                placeholder={reminder.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </>
        )}
      </div>
      <div className="remindercard__subtasks">
        <div className="remindercard__subtasks__header">
          <h2 className="subtask-title">Subtasks:</h2>
          <button
            className="subtask-create-button"
            onClick={() => setNewSubtask(!newSubtask)}
          >
            {" "}
            Add subtask
          </button>
          {newSubtask ? (
            <SubReminderCreate
              taskId={reminder.taskId}
              setNewSubtask={setNewSubtask}
            />
          ) : null}
        </div>
        <div className="remindercard__subtasks__list">
          <ul className="subtasks__ul">
            {reminder.subtasks !== undefined && reminder.subtasks.length > 0
              ? reminder.subtasks.map((item: any, index: any) => {
                return item ? <SubTasks key={index} item={item} changeSum={changeSum} /> : null
              }
                )
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReminderCard