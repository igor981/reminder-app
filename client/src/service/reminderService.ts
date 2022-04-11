/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const URL:string = 'http://localhost:3001/reminder/';

export const createReminder = async (
  category: string,
  task: string,
  desc: string,
  deadline: string,
  visibility: boolean,
  creatorId: string,
) => {
  const taskId = uuidv4();

  const today = new Date();
  const created = today.toLocaleDateString();

  const newReminder = await axios.post(`${URL}create-reminder`, {
    taskId,
    created,
    creatorId,
    category,
    task,
    desc,
    deadline,
    public: visibility,
  });

  return newReminder.data;
};
