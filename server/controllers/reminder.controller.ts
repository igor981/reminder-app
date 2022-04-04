import { Request, Response, NextFunction } from "express";
import Task from '../models/task.model';
import jwt from 'jsonwebtoken';

export const createReminder = async (req: Request, res: Response) => {
    try {
      
        /* const newReminder = await axios.post(URL + 'create-reminder', {
            taskId,
            creatorId,
            category,
            task,
            desc,
            deadline,
            cost,
            visibility
        }) */
            const newTask = await Task.create({
                taskId: req.body.taskId,
                creatorId: req.body.creatorId,
                category: req.body.category,
                task: req.body.task,
                description: req.body.desc,
                deadline: req.body.deadline,
                cost: req.body.cost,
                public: req.body.public,
                
            })
            return res.send({task: newTask})

 


        
    } catch (error:any) {
        return res.send({error: error.message})
        
    }
    
}
