import { Request, Response, NextFunction } from "express";
import Task from '../models/task.model';
import SubTask from '../models/subtask.model'
import jwt from 'jsonwebtoken';

export const createReminder = async (req: Request, res: Response) => {
    try {
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

export const allReminders = async (userId: string) => {
    try {
        const tasks = await Task.find({creatorId: userId})
        return tasks
    } catch (error) {
        return error
    }

}

export const allSubtasks = async (taskId: string) => {
    try {
        const subtasks = await SubTask.find({parentId: taskId})
        return subtasks
        
    } catch (error) {
        return error
    }
}

export const getReminder = async (taskId: string) => {
    try {
        const task = await Task.findOne({taskId: taskId})
        return task
    } catch (error) {
        return error
    }   
}


export const updateReminder = async (task: any) => {
    try {
        const updatedTask = await  Task.findOneAndReplace({taskId: task.taskId}, task)
        return updatedTask
    } catch (error) {
        return error
    }
}


export const createSubtask = async (subtask: any) => {
    try {
        const newSubtask = await SubTask.create({
            parentId: subtask.parentId,
            subTaskId: subtask.subTaskId,
                category: subtask.category,
                task: subtask.task,
                description: subtask.description,
                deadline: subtask.deadline,
                cost: subtask.cost,
                public: subtask.public,
        })
        return newSubtask
    } catch (error) {
        return error
    }
}

export const deleteSubtask = async (subTaskId: string) => {
    try {
        await SubTask.deleteOne({subTaskId: subTaskId})
    } catch (error) {
        
    }
}
export const deleteReminder = async (taskId: string) => {
    try {
        await Task.deleteOne({taskId: taskId})
        return {success: 'reminder deleted'}
    } catch (error) {
        return error
    }
}