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
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const reminder_routes_1 = __importDefault(require("./routes/reminder.routes"));
const reminder_controller_1 = require("./controllers/reminder.controller");
(0, dotenv_1.config)();
mongoose_1.default.connect(process.env.MONGOOSE_CONNECT || '');
const corsOptions = {
    origin: 'http://localhost:3000',
};
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/auth', auth_routes_1.default);
app.use('/reminder', reminder_routes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        allowedHeaders: ['Access-Control-Allow-Origin', '*'],
        credentials: true,
    },
});
io.on('connection', (socket) => {
    socket.on('getTasks', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield (0, reminder_controller_1.allReminders)(data);
        socket.emit('sendTasks', tasks);
    }));
    socket.on('update-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield (0, reminder_controller_1.updateReminder)(data);
        if (updatedTask !== null) {
            socket.to(data.taskId).emit('getUpdatedTask', data);
        }
    }));
    socket.on('check-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield (0, reminder_controller_1.updateReminder)(data);
        if (updatedTask !== null) {
            socket.to(data.taskId).emit('getCheckedTask', data.checked);
        }
    }));
    socket.on('new-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const newSubtask = yield (0, reminder_controller_1.createSubtask)(data);
        if (!newSubtask.error) {
            socket.to(roomId).emit('getSubtask', data);
        }
    }));
    socket.on('delete-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedSubtask = yield (0, reminder_controller_1.deleteSubtask)(data);
        if (deletedSubtask.success) {
            socket.to(roomId).emit('subtaskDeleted', data);
        }
    }));
    socket.on('update-subtask', (data, roomId) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTask = yield (0, reminder_controller_1.updateSubtask)(data);
        if (!updatedTask.error) {
            socket.to(roomId).emit('updatedSubtask', data);
        }
    }));
    socket.on('delete-task', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedTask = yield (0, reminder_controller_1.deleteReminder)(data);
        if (deletedTask.success) {
            socket.to(data).emit('deleted-reminder', data);
        }
    }));
    socket.on('join-room', (roomData) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(roomData.reminderId);
        const task = yield (0, reminder_controller_1.getReminder)(roomData.reminderId, roomData.userId);
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
