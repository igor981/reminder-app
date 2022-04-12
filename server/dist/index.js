var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes.js';
import reminderRouter from './routes/reminder.routes.js';
import { allReminders, getReminder, updateReminder, createSubtask, deleteSubtask, deleteReminder, updateSubtask, } from './controllers/reminder.controller.js';
config();
mongoose.connect(process.env.MONGOOSE_CONNECT || '');
const corsOptions = {
    origin: 'http://localhost:3000',
};
const app = express();
const port = 3001;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/reminder', reminderRouter);
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        allowedHeaders: ['Access-Control-Allow-Origin', '*'],
        credentials: true,
    },
});
io.on('connection', (socket) => {
    socket.on('getTasks', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield allReminders(data);
        socket.emit('sendTasks', tasks);
    }));
    socket.on('update-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield updateReminder(data);
        if (updatedTask !== null) {
            socket.to(data.taskId).emit('getUpdatedTask', data);
        }
    }));
    socket.on('check-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield updateReminder(data);
        if (updatedTask !== null) {
            socket.to(data.taskId).emit('getCheckedTask', data.checked);
        }
    }));
    socket.on('new-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const newSubtask = yield createSubtask(data);
        if (!newSubtask.error) {
            socket.to(roomId).emit('getSubtask', data);
        }
    }));
    socket.on('delete-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedSubtask = yield deleteSubtask(data);
        if (deletedSubtask.success) {
            socket.to(roomId).emit('subtaskDeleted', data);
        }
    }));
    socket.on('update-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield updateSubtask(data);
        if (!updatedTask.error) {
            socket.to(roomId).emit('updatedSubtask', data);
        }
    }));
    socket.on('delete-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedTask = yield deleteReminder(data);
        if (deletedTask.success) {
            socket.to(data).emit('deleted-reminder', data);
        }
    }));
    socket.on('join-room', (roomData) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(roomData.reminderId);
        const task = yield getReminder(roomData.reminderId, roomData.userId);
        if (task === null) {
            const error = { error: 'task not found' };
            io.to(roomData.reminderId).emit('sendTask', error);
            return;
        }
        if (task.unauthorized !== null) {
            socket.emit('sendTask', task);
        }
        else if (task !== null) {
            io.to(roomData.reminderId).emit('sendTask', task);
        }
    }));
});
server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server is listening on Port:${port}`);
});
