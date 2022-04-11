"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReminder = exports.deleteSubtask = exports.createSubtask = exports.updateSubtask = exports.updateReminder = exports.getReminder = exports.allSubtasks = exports.allReminders = exports.createReminder = void 0;
// import jwt from 'jsonwebtoken';
const task_model_1 = __importDefault(require("../models/task.model"));
const subtask_model_1 = __importDefault(require("../models/subtask.model"));
const createReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTask = yield task_model_1.default.create({
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
exports.createReminder = createReminder;
const allReminders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find({ creatorId: userId });
        return tasks;
    }
    catch (error) {
        return { error: 'No task has been found' };
    }
});
exports.allReminders = allReminders;
const allSubtasks = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subtasks = yield subtask_model_1.default.find({ parentId: taskId });
        return subtasks;
    }
    catch (error) {
        return error;
    }
});
exports.allSubtasks = allSubtasks;
const getReminder = (taskId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield task_model_1.default.findOne({ taskId });
        if (task === null)
            return null;
        if (task.public === false && userId !== task.creatorId) {
            const noAccess = {
                unauthorized: 'You do not have access to this reminder',
            };
            return noAccess;
        }
        const subtasks = yield (0, exports.allSubtasks)(task.taskId);
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
exports.getReminder = getReminder;
const updateReminder = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield task_model_1.default.findOneAndReplace({ taskId: task.taskId }, task);
        return updatedTask;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.updateReminder = updateReminder;
const updateSubtask = (subtask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedSubtask = yield subtask_model_1.default.findOneAndReplace({ subTaskId: subtask.subTaskId }, subtask);
        return updatedSubtask;
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.updateSubtask = updateSubtask;
const createSubtask = (subtask) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSubtask = yield subtask_model_1.default.create({
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
exports.createSubtask = createSubtask;
const deleteSubtask = (subTaskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield subtask_model_1.default.deleteOne({ subTaskId });
        return { success: 'Subtask deleted' };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.deleteSubtask = deleteSubtask;
const deleteReminder = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield task_model_1.default.deleteOne({ taskId });
        return { success: 'reminder deleted' };
    }
    catch (error) {
        return { error: error.message };
    }
});
exports.deleteReminder = deleteReminder;
