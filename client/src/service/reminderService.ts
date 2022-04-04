import axios from "axios"
import {v4 as uuidv4} from 'uuid';
const URL:string = 'http://localhost:3001/reminder/'

export const  createReminder = async (category: string, task: string, desc: string, deadline: string, cost: string, visibility: boolean, creatorId: string) => {
    const taskId = uuidv4()

    const newReminder = await axios.post(URL + 'create-reminder', {
        taskId,
        creatorId,
        category,
        task,
        desc,
        deadline,
        cost,
        visibility
    })

    return newReminder

}