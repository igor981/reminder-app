import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import Task from '../models/task.model';
import SubTask from '../models/subtask.model';

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
      nutrients: req.body.nutrients,
    });

    return res.send({ task: newTask });
  } catch (error:any) {
    return res.send({ error: error.message });
  }
};

export const allReminders = async (userId: string) => {
  try {
    const tasks = await Task.find({ creatorId: userId });
    return tasks;
  } catch (error) {
    return { error: 'No task has been found' };
  }
};

export const allSubtasks = async (taskId: string) => {
  try {
    const subtasks = await SubTask.find({ parentId: taskId });
    return subtasks;
  } catch (error) {
    return error;
  }
};

export const getReminder = async (taskId: string, userId: any) => {
  try {
    const task = await Task.findOne({ taskId });

    if (task === null) return null;
    if (task.public === false && userId !== task.creatorId) {
      const noAccess = {
        unauthorized: 'You do not have access to this reminder',
      };
      return noAccess;
    }

    const subtasks = await allSubtasks(task.taskId);

    if (subtasks) {
      const taskWithSubtask = {
        // eslint-disable-next-line no-underscore-dangle
        ...task._doc,
        subtasks,
      };

      return taskWithSubtask;
    }
    return task;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateReminder = async (task: any) => {
  try {
    const updatedTask = await Task.findOneAndReplace({ taskId: task.taskId }, task);
    return updatedTask;
  } catch (error: any) {
    return { error: error.message };
  }
};
export const updateSubtask = async (subtask: any) => {
  try {
    const updatedSubtask = await SubTask.findOneAndReplace(
      { subTaskId: subtask.subTaskId },
      subtask,
    );
    return updatedSubtask;
  } catch (error: any) {
    return { error: error.message };
  }
};

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
      nutrients: subtask.nutrients,
    });
    return newSubtask;
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteSubtask = async (subTaskId: string) => {
  try {
    await SubTask.deleteOne({ subTaskId });
    return { success: 'Subtask deleted' };
  } catch (error: any) {
    return { error: error.message };
  }
};
export const deleteReminder = async (taskId: string) => {
  try {
    await Task.deleteOne({ taskId });
    return { success: 'reminder deleted' };
  } catch (error: any) {
    return { error: error.message };
  }
};
