import React, {useEffect,useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addSubtask, fetchedReminder, updateReminder } from '../../redux/actions/reminder.actions';
import './ReminderCard.styles.css'
import { socket } from '../../App';
import { deleteSubtask } from '../../redux/actions/reminder.actions';

import SubReminderCreate from './SubReminder/SubReminderCreate';
import SubTasks from './SubReminder/SubTasks';
import TaskForm from '../TaskForm/TaskForm';




const ReminderCard = () => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [sumState, setSumState] = useState(0)
    const [owner, setOwner] = useState(false)
    const [macros, setMacros] = useState( { protein: 0, carbs: 0, fats: 0 } )
    const [newSubtask, setNewSubtask] = useState(false)
    const reminder = useSelector((state: any ) => state.reminder)
    const user = useSelector((state: any ) => state.user)
    const {reminderId} = useParams()
    const uuidReg = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/i

    const navigate = useNavigate()
    const macroCalculator = (data: any) => {
      let itemAmount = 0
      let newMacros: any = {
        protein: 0,
        carbs: 0,
        fats: 0,
      };

      if (data.subtasks && data.subtasks.length > 0) {
        data.subtasks.map((item: any) => {          
          if (item.category === "food") {
            itemAmount++;
            for (const key of Object.keys(item.nutrients)) {          
              newMacros[key] += parseInt(item.nutrients[key]);
            }
          }
        });
        for (const key of Object.keys(newMacros)) {          
          newMacros[key] /= itemAmount ;
        }
        setMacros(newMacros)
      }

    }

    const handleLock = () => {
      let updatedReminder = {
        ...reminder,
        locked: !reminder.locked,
      };
      dispatch(updateReminder(updatedReminder));
      updateSocket(updatedReminder);
    }

    const changeSum = (cost:number) => {
      const newSum = sumState + cost
      setSumState(newSum)
    }

    const deleteReminder = () => {     
      socket.emit('delete-reminder', reminder.taskId)
      navigate('/reminder-deleted')
    }
    
    const updateSocket = (updatedReminder: any) => {
        socket.emit('update-task', updatedReminder)
    }
    
    const handleChange = (e: any) => {

        let updatedReminder = {
            ...reminder,
            [e.target.id]: e.target.value
        }   
        dispatch(updateReminder(updatedReminder))
       updateSocket(updatedReminder)      
    }

    const handleCheck = () => {
      let updatedReminder = {
        ...reminder,
        checked: !reminder.checked,
      };
      dispatch(updateReminder(updatedReminder));
      updateSocket(updatedReminder);
    }

    const handleMacros = (e: any) => {
      let updatedMacros = {
        ...macros,
        [e.target.id]: e.target.value,
      };

      setMacros(updatedMacros);
      let updatedReminder = {
        ...reminder,
        nutrients: updatedMacros,
      };

      dispatch(updateReminder(updatedReminder));
      updateSocket(updatedReminder);
    }

    const handleDeleteSubtask = (subTaskId: string) => {
      socket.emit('delete-subtask', subTaskId, reminder.taskId)
      dispatch(deleteSubtask(subTaskId))

  }
    

  useEffect(() => {
      socket.on("getUpdatedTask", async (data) => {          
        dispatch(updateReminder(data));
        macroCalculator(reminder)
      });
      socket.on('deleted-reminder', async () => {
        navigate('/reminder-deleted')
      })
      socket.on('subtaskDeleted', async (data) => {
        dispatch(deleteSubtask(data))
         
      })
      socket.on('getSubtask', async (data) => {
        dispatch(addSubtask(data))
        
      })
      socket.on('sendTask', async (data) => {
          if(data.unauthorized) {
            navigate('/unauthorized')
          }
          
          if (!data.error){
            if (data.creatorId === user.userId) {setOwner(true)}
            console.log(data);
            
            dispatch(fetchedReminder(data))   
            macroCalculator(data)
          } else {
            navigate('/404')
            return
          }  
        })

        macroCalculator(reminder);
      }, [socket])
      
      useEffect(() => {
        if (!uuidReg.test(reminderId || "")) {
          navigate("/404");
        } else {
          const roomData = {
            reminderId,
            userId: user.userId,
          };

          socket.emit("join-room", roomData);
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
              <b>Deadline:</b>
              {reminder.deadline.split('T')[0]}
            </p>
          ) : editMode === true && reminder.category === "work-task" ? (
            <input id='deadline' type="date" onChange={(e) => handleChange(e)} />
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
                <option value={"regular"}>Regular</option>
                <option value={"work-task"}>Work</option>
                <option value={"food"}>Recipe</option>
                <option value={"shopping-list"}>Shopping list</option>
              </select>
            </>
          )}
          {editMode === false && reminder.category === "food" ? (
            <div className="macros">
              <p className="macros-data">
                <b>Protein:</b> {macros.protein}g/100g
              </p>
              <p className="macros-data">
                <b>Carbs:</b> {macros.carbs}g/100g
              </p>
              <p className="macros-data">
                <b>Fats:</b> {macros.fats}g/100g
              </p>
            </div>
          ) : editMode === true && reminder.category === "food" ? (
            <div className="taskform__input">
              <div className="micro-nutrient">
                <label>
                  <b>Protein:</b>
                </label>
                <input
                  onChange={(e) => handleMacros(e)}
                  id="protein"
                  className="cost-input"
                  type="number"
                />
              </div>
              <div className="micro-nutrient">
                <label>
                  <b>Carbs:</b>
                </label>
                <input
                  onChange={(e) => handleMacros(e)}
                  id="carbs"
                  className="cost-input"
                  type="number"
                />
              </div>
              <div className="micro-nutrient">
                <label>
                  <b>Fat:</b>
                </label>
                <input
                  onChange={(e) => handleMacros(e)}
                  id="fats"
                  className="cost-input"
                  type="number"
                />
              </div>
            </div>
          ) : null}

          {editMode === false ? (
            <p>
              {" "}
              <b>Cost:</b> {sumState}kr
            </p>
          ) : (
            <div className="micro-nutrient">
              <label>
                <b>Cost:</b>
              </label>
              <input
                onChange={(e) => handleChange(e)}
                id="cost"
                className="cost-input"
                type="number"
              />
            </div>
          )}
          <div className="header-buttons">
            <button
              className={reminder.locked ? 'edit-button locked' : 'edit-button'}
              disabled={reminder.locked}
              onClick={() => setEditMode(!editMode)}
              >
              {reminder.locked ? 'Edit locked' : editMode ? 'Done' : 'Edit'}
            </button>
            <button
              className={reminder.locked ? 'edit-button delete locked' : 'edit-button delete'}
              disabled={reminder.locked}
              onClick={() => deleteReminder()}
            >
              {reminder.locked ? 'Delete locked' : 'Delete'}
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

        <div className="remindercard__content__buttons">
          <button disabled={reminder.locked} className="check" onClick={() => handleCheck()}>
          {reminder.locked ? 'Check Locked' : reminder.checked ? 'Uncheck' : 'Check'}
          </button>
          {owner === true ? (
            <button className="locked" onClick={() => handleLock()}>
              {reminder.locked ? 'Unlock' : 'Lock'}
            </button>
          ) : null}
        </div>
      </div>
      <div
        className={
          reminder.checked || reminder.locked
            ? "remindercard__subtasks reminder-checked"
            : "remindercard__subtasks"
        }
      >
        <div className="remindercard__subtasks__header">
          <h2 className="subtask-title">Subtasks:</h2>
          <button
            className="subtask-create-button"
            disabled={ reminder.locked || reminder.checked }
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
                  return item ? (
                    <SubTasks key={index} item={item} handleDeleteSubtask={handleDeleteSubtask} changeSum={changeSum} />
                  ) : null;
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReminderCard