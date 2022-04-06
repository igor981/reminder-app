import React, {useEffect, useState} from 'react'
import { socket } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid';
import './Subtasks.styles.css'
import { addSubtask } from '../../../redux/actions/reminder.actions';



const SubReminderCreate = ({taskId, setNewSubtask} : {taskId: string, setNewSubtask: any}) => {
  const [category, setCategory] = useState("regular");
  const [deadline, setDeadline] = useState("");
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user);

  const logger = (data: any) => {    
    if (data.subTaskId) {
        dispatch(addSubtask(data))
        setNewSubtask(false)
    }
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
  };
  const handleDateChange = (e: any) => {
    setDeadline(e.target.value);
  };
  const handleTaskChange = (e: any) => {
    setTask(e.target.value);
  };
  const handleDescChange = (e: any) => {
    setDesc(e.target.value);
  };
  const handleCostChange = (e: any) => {
    setCost(parseInt(e.target.value));
  };

  const onFormSubmit = async (e: any) => {
    setError("");
    setShowError(false);
    e.preventDefault();

    if (task && desc && user.userId) {
      const subTaskId = uuidv4();
      const subtask = {
        subTaskId,
        parentId: taskId,
        category,
        task,
        description: desc,
        deadline,
        cost,
      };
      socket.emit("new-subtask", subtask, logger);
    } else {
      setShowError(true);
      setError("Task & description form cant be empty");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="newsubtask-form">
      <div className="taskform-container subtask-container">
        <form className="taskform" onSubmit={(e) => onFormSubmit(e)}>
          <div className="subtaskform__task-info">
            <div className="subtaskform__task-info__task">
              <label>Subtask</label>
              <input onChange={(e) => handleTaskChange(e)} type="text" />
            </div>
            <div className="subtaskform__task-info__info">
              <div className="taskform__input">
                <label htmlFor=""> category</label>
                <select onChange={(e) => handleCategorySelect(e.target.value)}>
                  <option value={"regular"}>regular</option>
                  <option value={"work-task"}>work task</option>
                  <option value={"food"}>food</option>
                  <option value={"shopping-list"}>shopping list</option>
                </select>
              </div>
              <div className="taskform__input">
                <label>cost</label>
                <input onChange={(e) => handleCostChange(e)} type="number" />
              </div>

              <div className="taskform__input">
                <label>deadline</label>
                <input onChange={(e) => handleDateChange(e)} type="date" />
              </div>
            </div>
          </div>
          <div className="subtaskform__desc">
            <div className="taskform__input">
              <label>Desc</label>
              <textarea
                onChange={(e) => handleDescChange(e)}
                className="subtask-textarea"
              />
            </div>
          </div>
          <div className="subtaskform__button">
            <button className="addsubtask-button">Add reminder</button>
            <button
              onClick={() => setNewSubtask(false)}
              className="addsubtask-button cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubReminderCreate