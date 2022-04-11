import React, { useEffect } from 'react';
import './Subtasks.styles.css';
import { useSelector } from 'react-redux';
import { RootReducerIf, Subtask } from '../../../interfaces';

function SubTasks({
  item,
  changeSum,
  handleDeleteSubtask,
  handleCheckSubtask,
}: {
  item: Subtask;
  changeSum: (parameter: number) => void;
  handleDeleteSubtask: (parameter: string) => void;
  handleCheckSubtask: (parameter: Subtask) => void;
}) {
  const reminder = useSelector((state: RootReducerIf) => state.reminder);

  useEffect(() => {
    changeSum(item.cost!);
  }, []);

  return (
    <li className={item.checked ? 'subtask-item item-checked' : 'subtask-item'} data-testid="reminder-card-subtask-item">
      <div className="subtask-item__info">
        <div className="subtask-item__info__name">
          <p>{item && item.task}</p>
        </div>
        <div className="subtask-item__info__data">
          <p>{item && item.category}</p>
          {item && item.category === 'work-task'
            ? `Deadline: \n ${item.deadline && item.deadline.split('T')[0]}`
            : ''}
          {item && item.category === 'food' ? (
            <div className="subtask-item__info__macros">
              <p>
                {item.nutrients && item.nutrients.protein}
                g protein
              </p>
              <p>
                {item.nutrients.carbs}
                g carbs
              </p>
              <p>
                {item.nutrients.fats}
                g fats
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="subtask-item__description">
        <p>{item && item.description}</p>
        <div className="subtask-item__description__buttons">
          <button
            type="button"
            disabled={reminder.locked}
            onClick={() => handleCheckSubtask(item)}
            id="content-check"
          >
            Check
          </button>
          <button
            type="button"
            disabled={reminder.locked}
            onClick={() => handleDeleteSubtask(item.subTaskId)}
            id="delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default SubTasks;
