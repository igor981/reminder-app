import express from 'express';
import { Server, Socket } from 'socket.io';
import {config} from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes'
import reminderRouter from './routes/reminder.routes'
import {allReminders, getReminder, updateReminder, createSubtask, allSubtasks, deleteSubtask, deleteReminder} from './controllers/reminder.controller'
config()
mongoose.connect(process.env.MONGOOSE_CONNECT || '')
const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000"
};
var app = express()
 
const port = 3001;
  
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)
app.use('/reminder', reminderRouter)


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        allowedHeaders: ["Access-Control-Allow-Origin", "*"],
        credentials: true
      },
})
io.on("connection", (socket: any) => {
    socket.on('getTasks', async (data: any) => {
        const tasks:any = await allReminders(data);
        socket.emit("sendTasks", tasks);
    })


    socket.on('update-task', async (data: any, cb: any) => {
        const updatedTask = await updateReminder(data)  
        if (updatedTask !== null ){
            socket.to(data.taskId).emit('getUpdatedTask', data)
            cb(data.category, updatedTask.category)
        }    

    })

    socket.on('new-subtask', async(data:any, callback: any) => {
        const newSubtask = await  createSubtask(data)
        callback(newSubtask)
    })

    socket.on('delete-subtask', async(data: string) => {        
        await deleteSubtask(data)
    })
    socket.on('delete-reminder', async(data: string) => {        
        await deleteReminder(data)      
       
     socket.to(data).emit('deleted-reminder', data)   

    })

    socket.on('join-room', async (room: string, logger: any) => {
        socket.join(room)
            const task = await getReminder(room)
            if (task !== null) {
                const subtasks = await allSubtasks(task.taskId)
                
                if (subtasks) {
                    const taskWithSubtask = {
                      ...task["_doc"],
                      subtasks,
                    };
                        
                    io.to(room).emit('sendTask', taskWithSubtask)
                    logger('connected', room)
                } else {
    
                    io.to(room).emit('sendTask', task)
                    logger('connected', room)
                }
            }  else {
                const error = {error: 'task not found'}
                io.to(room).emit('sendTask', error)
            }
    })

})



server.listen(port, () => {
    console.log('Server is listening on Port:' + port);
})