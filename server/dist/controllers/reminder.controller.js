var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import jwt from 'jsonwebtoken';
import Task from '../models/task.model.js';
import SubTask from '../models/subtask.model.js';
export const createReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield Task.create({
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
    }
    catch (error) {
        return res.send({ error: error.message });
    }
});
export const allReminders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.find({ creatorId: userId });
        return tasks;
    }
    catch (error) {
        return { error: 'No task has been found' };
    }
});
export const allSubtasks = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtasks = yield SubTask.find({ parentId: taskId });
        return subtasks;
    }
    catch (error) {
        return error;
    }
});
export const getReminder = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task.findOne({ taskId });
        if (task === null)
            return null;
        if (task.public === false && userId !== task.creatorId) {
            const noAccess = {
                unauthorized: 'You do not have access to this reminder',
            };
            return noAccess;
        }
        const subtasks = yield allSubtasks(task.taskId);
        if (subtasks) {
            const taskWithSubtask = Object.assign(Object.assign({}, task._doc), { subtasks });
            return taskWithSubtask;
        }
        return task;
    }
    catch (error) {
        return { error: error.message };
    }
});
export const updateReminder = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield Task.findOneAndReplace({ taskId: task.taskId }, task);
        return updatedTask;
    }
    catch (error) {
        return { error: error.message };
    }
});
export const updateSubtask = (subtask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSubtask = yield SubTask.findOneAndReplace({ subTaskId: subtask.subTaskId }, subtask);
        return updatedSubtask;
    }
    catch (error) {
        return { error: error.message };
    }
});
export const createSubtask = (subtask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubtask = yield SubTask.create({
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
    }
    catch (error) {
        return { error: error.message };
    }
});
export const deleteSubtask = (subTaskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield SubTask.deleteOne({ subTaskId });
        return { success: 'Subtask deleted' };
    }
    catch (error) {
        return { error: error.message };
    }
});
export const deleteReminder = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Task.deleteOne({ taskId });
        return { success: 'reminder deleted' };
    }
    catch (error) {
        return { error: error.message };
    }
});
