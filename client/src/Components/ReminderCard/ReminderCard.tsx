import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {
  addSubtask, checkReminder, fetchedReminder, updateReminder,
  deleteSubtask, updateSubtask,
} from '../../redux/actions/reminder.actions';
import './ReminderCard.styles.css';
import { socket } from '../../App';

import SubReminderCreate from './SubReminder/SubReminderCreate';
import SubTask from './SubReminder/SubTasks';
import { RootReducerIf, Task } from '../../interfaces';

function ReminderCard() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [sumState, setSumState] = useState(0);
  const [owner, setOwner] = useState(false);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [newSubtask, setNewSubtask] = useState(false);
  const reminder = useSelector((state: RootReducerIf) => state.reminder);
  const user = useSelector((state: RootReducerIf) => state.user);
  const { reminderId } = useParams();
  const uuidReg = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/i;

  const navigate = useNavigate();
  const sendUpdatedSubtask = (updatedSubtask: any) => {
    socket.emit('update-subtask', updatedSubtask, reminder.taskId);
  };

  const updateReminderSocket = (updatedReminder: any) => {
    socket.emit('update-task', updatedReminder);
  };

  const calculateCost = () => {
    let totalCost = 0;
    if (reminder.subtasks && reminder.subtasks.length > 0) {
      reminder.subtasks.map((item: any) => {
        totalCost += parseInt(item.cost, 10);
      });
    }
    return totalCost;
  };
  const macroCalculator = (data: any) => {
    let itemAmount = 0;
    const newMacros: any = {
      protein: 0,
      carbs: 0,
      fats: 0,
    };

    if (data.subtasks && data.subtasks.length > 0) {
      data.subtasks.map((item: any) => {
        if (item.category === 'food') {
          itemAmount += 1;
          for (const key of Object.keys(item.nutrients)) {
            newMacros[key] += parseInt(item.nutrients[key], 10);
          }
        }
      });
      for (const key of Object.keys(newMacros)) {
        newMacros[key] /= itemAmount;
      }
      setMacros(newMacros);
    }
  };

  const handleLock = () => {
    const updatedReminder: Task = {
      ...reminder,
      locked: !reminder.locked,
    };
    if (updatedReminder.locked === true) setEditMode(false);
    dispatch(updateReminder(updatedReminder));
    updateReminderSocket(updatedReminder);
  };

  const handleCheck = () => {
    const updatedReminder = {
      ...reminder,
      checked: !reminder.checked,
    };
    dispatch(updateReminder(updatedReminder));
    updateReminderSocket(updatedReminder);
  };
  const handleChange = (e: any) => {
    const updatedReminder = {
      ...reminder,
      [e.target.id]: e.target.value,
    };
    dispatch(updateReminder(updatedReminder));
    updateReminderSocket(updatedReminder);
  };
  const changeSum = (cost:number) => {
    const newSum = sumState + cost;
    setSumState(newSum);
  };

  const deleteReminder = () => {
    socket.emit('delete-task', reminder.taskId);
    navigate('/reminder-deleted');
  };

  const handleMacros = (e: any) => {
    const updatedMacros = {
      ...macros,
      [e.target.id]: e.target.value,
    };

    setMacros(updatedMacros);
    const updatedReminder = {
      ...reminder,
      nutrients: updatedMacros,
    };

    dispatch(updateReminder(updatedReminder));
    updateReminderSocket(updatedReminder);
  };

  const handleDeleteSubtask = (subTaskId: string) => {
    socket.emit('delete-subtask', subTaskId, reminder.taskId);
    dispatch(deleteSubtask(subTaskId));
  };

  const handleCheckSubtask = (subtask: any) => {
    const updatedSubtaskItem = {
      ...subtask,
      checked: !subtask.checked,
    };

    dispatch(updateSubtask(updatedSubtaskItem));

    sendUpdatedSubtask(updatedSubtaskItem);
  };

  useEffect(() => {
    socket.on('getUpdatedTask', async (data) => {
      dispatch(updateReminder(data));
      macroCalculator(reminder);
    });
    socket.on('getCheckedTask', async (data) => {
      dispatch(checkReminder(data));
    });
    socket.on('deleted-reminder', async () => {
      navigate('/reminder-deleted');
    });
    socket.on('subtaskDeleted', async (data) => {
      dispatch(deleteSubtask(data));
    });
    socket.on('getSubtask', async (data) => {
      dispatch(addSubtask(data));
    });
    socket.on('updatedSubtask', async (data) => {
      dispatch(updateSubtask(data));
    });
    socket.on('sendTask', async (data) => {
      if (data.unauthorized) {
        navigate('/unauthorized');
      }

      if (!data.error) {
        if (data.creatorId === user.userId) { setOwner(true); }
        dispatch(fetchedReminder(data));
        macroCalculator(data);
      } else {
        navigate('/404');
      }
    });

    macroCalculator(reminder);
  }, [socket]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!uuidReg.test(reminderId || '')) {
      navigate('/404');
    } else {
      const roomData = {
        reminderId,
        userId: user.userId,
      };

      socket.emit('join-room', roomData);
    }
  }, []);

  return (
    <div className="window">
      <div className="remindercard" data-testid="reminder-card">
        <div className="remindercard__header">
          <div className="remindercard__header__title">
            {editMode === false ? (
              <h1>
                {reminder && reminder.task}
              </h1>
            ) : (
              <>
                <label htmlFor="task">
                  <b>Task:</b>
                </label>
                <input
                  type="text"
                  id="task"
                  placeholder={reminder.task}
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
          </div>
          <div className="remindercard__header__info" data-testid="reminder-card-info">
            {editMode === false && reminder.category === 'work-task' ? (
              <p>
                <b>Deadline:</b>
                {reminder.deadline && reminder.deadline.split('T')[0]}
              </p>
            ) : editMode === true && reminder.category === 'work-task' ? (
              <>
                <label htmlFor="deadline">
                  <b>Deadline:</b>
                </label>
                <input
                  id="deadline"
                  type="date"
                  onChange={(e) => handleChange(e)}
                />
              </>
            ) : null}
            {editMode === false ? (
              <p>
                <b>Category:</b>
                {' '}
                {reminder && reminder.category}
              </p>
            ) : (
              <>
                <p>
                  <b>Category:</b>
                </p>
                <select id="category" onChange={(e) => handleChange(e)}>
                  <option value="regular">Choose Category</option>
                  <option value="regular">Regular</option>
                  <option value="work-task">Work</option>
                  <option value="food">Recipe</option>
                  <option value="shopping-list">Shopping list</option>
                </select>
              </>
            )}
            {editMode === false && reminder.category === 'food' ? (
              <div className="macros">
                <p className="macros-label">Nutrients per 100g</p>
                <p className="macros-data">
                  <b>Protein:</b>
                  {' '}
                  {macros.protein}
                  g
                </p>
                <p className="macros-data">
                  <b>Carbs:</b>
                  {' '}
                  {macros.carbs}
                  g
                </p>
                <p className="macros-data">
                  <b>Fats:</b>
                  {' '}
                  {macros.fats}
                  g
                </p>
              </div>
            ) : editMode === true && reminder.category === 'food' ? (
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
                {' '}
                <b>Cost:</b>
                {' '}
                {calculateCost()}
                kr
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
            <div className="remindercard__header__info__buttons">
              <button
                type="button"
                className={reminder.locked ? 'locked' : ''}
                id="edit-button"
                disabled={reminder.locked}
                onClick={() => setEditMode(!editMode)}
              >
                {reminder.locked ? 'Edit locked' : editMode ? 'Done' : 'Edit'}
              </button>
              <button
                type="button"
                className={
                reminder.locked
                  ? 'locked'
                  : ''
              }
                id="delete-button"
                disabled={reminder.locked}
                onClick={() => deleteReminder()}
              >
                {reminder.locked ? 'Delete locked' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
        <div className="remindercard__content" data-testid="reminder-card-content">
          {editMode === false ? (
            <div className="remindercard__content__description">
              <p className="remindercard__content__description__tag">
                <b>Description:</b>
              </p>
              <ReactMarkdown
                data-testid="reminder-card-desc"
                className="remindercard__content__description__text"
                children={reminder.description!}
              />
            </div>
          ) : (
            <div className="remindercard__content__description">
              <p className="remindercard__content__description__tag">
                <b>Description:</b>
              </p>
              <textarea
                className="remindercard__content__description__text"
                id="description"
                value={reminder.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )}

          <div className="remindercard__content__buttons">
            <button
              type="button"
              id="content-check"
              disabled={reminder.locked}
              onClick={() => handleCheck()}
            >
              {reminder.locked
                ? 'Check Locked'
                : reminder.checked
                  ? 'Uncheck'
                  : 'Check'}
            </button>
            {owner === true ? (
              <button
                type="button"
                id="content-lock"
                onClick={() => handleLock()}
              >
                {reminder.locked ? 'Unlock' : 'Lock'}
              </button>
            ) : null}
          </div>
        </div>
        <div
          className={
          reminder.checked || reminder.locked
            ? 'remindercard__subtasks reminder-checked'
            : 'remindercard__subtasks'
        }
        >
          <div className="remindercard__subtasks__header">
            <h2 className="subtask-title">Subtasks:</h2>
            <button
              type="button"
              disabled={reminder.locked || reminder.checked}
              id="content-check"
              onClick={() => setNewSubtask(!newSubtask)}
            >
              {' '}
              Add subtask
            </button>
            {newSubtask ? (
              <SubReminderCreate
                taskId={reminder.taskId!}
                setNewSubtask={setNewSubtask}
              />
            ) : null}
          </div>
          <div className="remindercard__subtasks__list">
            <ul className="subtasks__ul" data-testid="reminder-card-subtasklist">
              {reminder.subtasks !== undefined && reminder.subtasks.length > 0
                ? reminder.subtasks.map((item: any, index: any) => (item ? (
                  <SubTask
                    key={index}
                    item={item}
                    handleDeleteSubtask={handleDeleteSubtask}
                    changeSum={changeSum}
                    handleCheckSubtask={handleCheckSubtask}
                  />
                ) : null))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReminderCard;
