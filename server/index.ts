/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import { Server, Socket } from 'socket.io';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes';
import reminderRouter from './routes/reminder.routes';
import {
  allReminders,
  getReminder,
  updateReminder,
  createSubtask,
  deleteSubtask,
  deleteReminder,
  updateSubtask,
} from './controllers/reminder.controller';
import { Subtask, Task } from './interfaces';

config();
mongoose.connect(process.env.MONGOOSE_CONNECT || '');
const corsOptions: cors.CorsOptions = {
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
io.on('connection', (socket: Socket) => {
  socket.on('getTasks', async (data: string) => {
    const tasks:any = await allReminders(data);
    socket.emit('sendTasks', tasks);
  });

  socket.on('update-task', async (data: Task) => {
    const updatedTask = await updateReminder(data);
    if (updatedTask !== null) {
      socket.to(data.taskId!).emit('getUpdatedTask', data);
    }
  });
  socket.on('check-task', async (data: Task) => {
    const updatedTask = await updateReminder(data);

    if (updatedTask !== null) {
      socket.to(data.taskId!).emit('getCheckedTask', data.checked);
    }
  });

  socket.on('new-subtask', async (data:Subtask, roomId: string) => {
    const newSubtask = await createSubtask(data);
    if (!newSubtask.error) {
      socket.to(roomId).emit('getSubtask', data);
    }
  });

  socket.on('delete-subtask', async (data: string, roomId: string) => {
    const deletedSubtask = await deleteSubtask(data);
    if (deletedSubtask.success!) {
      socket.to(roomId).emit('subtaskDeleted', data);
    }
  });
  socket.on('update-subtask', async (data: Subtask, roomId: string) => {
    const updatedTask = await updateSubtask(data);
    if (!updatedTask.error) {
      socket.to(roomId).emit('updatedSubtask', data);
    }
  });

  socket.on('delete-task', async (data: string) => {
    const deletedTask = await deleteReminder(data);
    if (deletedTask.success!) {
      socket.to(data).emit('deleted-reminder', data);
    }
  });

  socket.on('join-room', async (roomData: { reminderId: string, userId: string}) => {
    socket.join(roomData.reminderId);
    const task = await getReminder(roomData.reminderId, roomData.userId);
    if (task === null) {
      const error = { error: 'task not found' };
      io.to(roomData.reminderId).emit('sendTask', error);
      return;
    }
    if (task.unauthorized !== null) {
      socket.emit('sendTask', task);
    } else if (task !== null) {
      io.to(roomData.reminderId).emit('sendTask', task);
    }
  });
});

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is listening on Port:${port}`);
});
