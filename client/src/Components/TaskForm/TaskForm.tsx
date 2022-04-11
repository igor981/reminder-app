/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './TaskForm.styles.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReminder } from '../../service/reminderService';
import { RootReducerIf } from '../../interfaces';

function TaskForm() {
  const [category, setCategory] = useState('regular');
  const [deadline, setDeadline] = useState('');
  const [task, setTask] = useState('');
  const [desc, setDesc] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibility, setVisibiltiy] = useState({ public: true, private: false });
  const navigate = useNavigate();

  const user = useSelector((state: RootReducerIf) => state.user);

  const handleCategorySelect = (value:string) => {
    setCategory(value);
  };
  const handleDateChange = (input: string) => {
    const dateFormat = input.split('T')[0];
    setDeadline(dateFormat);
  };
  const handleTaskChange = (input: string) => {
    setTask(input);
  };
  const handleDescChange = (input: string) => {
    setDesc(input);
  };

  const handlePrivateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVisibiltiy({
      public: false,
      private: false,
      [e.target.value]: true,
    });
  };

  const onFormSubmit = async (e: FormEvent) => {
    setErrorMessage('');
    setShowError(false);
    e.preventDefault();
    if (task && desc && user !== null) {
      const reminder = await createReminder(
        category,
        task,
        desc,
        deadline,
        visibility.public,
        user.userId,
      );

      if (!reminder.error) {
        navigate(`/reminders/${reminder.task.taskId}`);
      }
    } else {
      setShowError(true);
      setErrorMessage('Task & description form cant be empty');
    }
  };

  return (
    <div className="window">
      <div className="taskform__container">
        <form className="taskform" onSubmit={(e) => onFormSubmit(e)}>
          <div className="taskform__task-info">
            <div className="taskform__task-info__task">
              <div className="taskform__input input-enter">
                <label htmlFor="taskname-input">
                  {' '}
                  <b>Task:</b>
                  {' '}
                </label>
                <input
                  id="taskname-input"
                  className="task-input taskname"
                  type="text"
                  onChange={(e) => handleTaskChange(e.target.value)}
                />
              </div>
            </div>
            <div className="taskform__task-info__info">
              <div className="taskform__input">
                <label htmlFor="select">
                  {' '}
                  <b>Category:</b>
                  {' '}
                </label>
                <select
                  id="select"
                  className="category-input"
                  onChange={(e) => handleCategorySelect(e.target.value)}
                >
                  <option value="regular">Regular</option>
                  <option value="work-task">Work</option>
                  <option value="food">Recipe</option>
                  <option value="shopping-list">Shopping list</option>
                </select>
              </div>

              {category === 'work-task' ? (
                <div className="taskform__input">
                  <label htmlFor="deadline">
                    <b>Deadline:</b>
                  </label>
                  <input
                    id="deadline"
                    className="deadline-input"
                    type="date"
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="taskform__description">
            <label htmlFor="textarea-input">
              <b>Task description:</b>
            </label>
            <textarea
              id="textarea-input"
              className="taskform__description__textarea"
              onChange={(e) => handleDescChange(e.target.value)}
            />
          </div>
          <div className="taskform__buttons">
            <div className="taskform__visibility-options">
              <p className="visibility-title">
                <b>Visibility:</b>
              </p>
              <div className="1">
                <label htmlFor="visibility-public">Public</label>
                <input
                  id="visibility-public"
                  type="radio"
                  checked={visibility.public}
                  value="public"
                  onChange={(e) => handlePrivateChange(e)}
                />
                <label htmlFor="visibility-private">Private</label>
                <input
                  id="visibility-private"
                  type="radio"
                  checked={visibility.private}
                  value="private"
                  onChange={(e) => handlePrivateChange(e)}
                />
              </div>
            </div>
            <div className="create-reminder-divs">
              <button type="submit" className="add-button">Add reminder</button>
              {showError && errorMessage}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
