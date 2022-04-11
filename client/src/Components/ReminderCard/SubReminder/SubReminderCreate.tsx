import React, { useEffect, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../../../App';
import './SubReminderCreate.styles.css';
import { addSubtask } from '../../../redux/actions/reminder.actions';
import { RootReducerIf } from '../../../interfaces';

function SubReminderCreate({ taskId, setNewSubtask } : {taskId: string, setNewSubtask: any}) {
  const [category, setCategory] = useState('regular');
  const [deadline, setDeadline] = useState('');
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState(0);
  const [nutrients, setNutrients] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const user = useSelector((state: RootReducerIf) => state.user);

  const dispatch = useDispatch();

  const handleMacroChange = (e: any) => {
    const newMacros = {
      ...nutrients,
      [e.target.id]: e.target.value,
    };

    setNutrients(newMacros);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
  };
  const handleDateChange = (input: string) => {
    setDeadline(input);
  };
  const handleTaskChange = (input: string) => {
    setTask(input);
  };
  const handleDescChange = (input: string) => {
    setDesc(input);
  };
  const handleCostChange = (input: string) => {
    setCost(parseInt(input, 10));
  };

  const onFormSubmit = async (e: FormEvent) => {
    setErrorMessage('');
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

      socket.emit('new-subtask', subtask, taskId);

      dispatch(addSubtask(subtask));
      setNewSubtask(false);
    } else {
      setShowError(true);
      setErrorMessage('Task & description form cant be empty');
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="subtask-container" data-testid="reminder-card-subtask-form">
      <form className="subtaskform" onSubmit={(e) => onFormSubmit(e)}>
        <div className="subtaskform__task-info">
          <div className="subtaskform__task-info__task">
            <label htmlFor="form-taskname">
              {category === 'food' ? 'Product' : 'Task'}
            </label>
            <input
              id="form-taskname"
              onChange={(e) => handleTaskChange(e.target.value)}
              type="text"
            />
          </div>
          <div className="subtaskform__task-info__info">
            <div className="taskform__input">
              <label htmlFor="form-options"> category</label>
              <select
                id="form-options"
                onChange={(e) => handleCategorySelect(e.target.value)}
              >
                <option value="regular">regular</option>
                <option value="work-task">work task</option>
                <option value="food">food</option>
              </select>
            </div>
            {category === 'food' ? (
              <div className="taskform__input">
                <div className="micro-nutrient">
                  <label htmlFor="protein">
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
                  <label htmlFor="carbs">
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
                  <label htmlFor="fats">
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
              <label htmlFor="form-cost">cost</label>
              <input
                id="form-cost"
                onChange={(e) => handleCostChange(e.target.value)}
                type="number"
              />
            </div>

            {category === 'work-task' ? (
              <div className="taskform__input">
                <label htmlFor="form-deadline">deadline</label>
                <input
                  id="form-deadline"
                  onChange={(e) => handleDateChange(e.target.value)}
                  type="date"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="subtaskform__desc">
          <div className="taskform__input">
            <label htmlFor="form-desc">Desc</label>
            <textarea
              id="form-desc"
              onChange={(e) => handleDescChange(e.target.value)}
              className="subtask-textarea"
            />
          </div>
        </div>
        <div className="subtaskform__button">
          <button type="submit" id="edit-button" className="addsubtask-button">
            Add reminder
          </button>
          <button
            type="button"
            onClick={() => setNewSubtask(false)}
            id="content-lock"
          >
            Cancel
          </button>
          <p>{showError ? errorMessage : ''}</p>
        </div>
      </form>
    </div>
  );
}

export default SubReminderCreate;
