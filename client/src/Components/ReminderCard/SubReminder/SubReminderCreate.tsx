import React, {useEffect, useState} from 'react'
import { socket } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid';
import './SubReminderCreate.styles.css'
import { addSubtask } from '../../../redux/actions/reminder.actions';



const SubReminderCreate = ({taskId, setNewSubtask} : {taskId: string, setNewSubtask: any}) => {
  const [category, setCategory] = useState("regular");
  const [deadline, setDeadline] = useState("");
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);
  const [nutrients, setNutrients] = useState({protein: 0, carbs: 0, fats: 0})
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.user);




  const handleMacroChange = (e: any) => {
    const newMacros = {
      ...nutrients,
      [e.target.id]: e.target.value,
    };

    setNutrients(newMacros);
  }

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
        nutrients,
      };      
      socket.emit("new-subtask", subtask, taskId);

      dispatch(addSubtask(subtask))
      setNewSubtask(false)
    } else {
      setShowError(true);
      setError("Task & description form cant be empty");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="subtask-container">
      <form className="subtaskform" onSubmit={(e) => onFormSubmit(e)}>
        <div className="subtaskform__task-info">
          <div className="subtaskform__task-info__task">
            <label>{category === 'food' ? 'Product' : 'Task'}</label>
            <input onChange={(e) => handleTaskChange(e)} type="text" />
          </div>
          <div className="subtaskform__task-info__info">
            <div className="taskform__input">
              <label htmlFor=""> category</label>
              <select onChange={(e) => handleCategorySelect(e.target.value)}>
                <option value={"regular"}>regular</option>
                <option value={"work-task"}>work task</option>
                <option value={"food"}>food</option>
              </select>
            </div>
            {category === "food" ? (
              <div className="taskform__input">
                <div className="micro-nutrient">
                  <label>
                    <b>Protein:</b>
                  </label>
                  <input
                    onChange={(e) => handleMacroChange(e)}
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
                    onChange={(e) => handleMacroChange(e)}
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
                    onChange={(e) => handleMacroChange(e)}
                    id="fats"
                    className="cost-input"
                    type="number"
                  />
                </div>
              </div>
            ) : null}
            <div className="taskform__input">
              <label>cost</label>
              <input onChange={(e) => handleCostChange(e)} type="number" />
            </div>

            {category === "work-task" ? (
              <div className="taskform__input">
                <label>deadline</label>
                <input onChange={(e) => handleDateChange(e)} type="date" />
              </div>
            ) : null}
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
  );
}

export default SubReminderCreate