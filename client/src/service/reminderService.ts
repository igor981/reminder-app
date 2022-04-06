import axios from "axios"
import {v4 as uuidv4} from 'uuid';
const URL:string = 'http://localhost:3001/reminder/'

export const  createReminder = async (category: string, task: string, desc: string, deadline: string, cost: number, visibility: boolean, creatorId: string) => {
  const taskId = uuidv4();

  let today = new Date();
  let created =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const newReminder = await axios.post(URL + "create-reminder", {
    taskId,
    created,
    creatorId,
    category,
    task,
    desc,
    deadline,
    cost,
    visibility,
  });

  console.log(newReminder);
  

  return newReminder;
}
