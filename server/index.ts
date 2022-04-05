import express from 'express';
import { Server, Socket } from 'socket.io';
import {config} from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes'
import reminderRouter from './routes/reminder.routes'
import {allReminders, getReminder, updateReminder} from './controllers/reminder.controller'
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
        const tasks = await allReminders(data)
        socket.emit("sendTasks", tasks);
        
    })


    socket.on('update-task', async (data: any, cb: any) => {
        
        const updatedTask = await updateReminder(data)      
       
        socket.to(data.taskId).emit('getUpdatedTask', data)
        cb(data.category, updatedTask.category)

    })

    socket.on('join-room', async (room: string, logger: any) => {
        console.log(room);
        
        socket.join(room)
        const task = await getReminder(room)        
        io.to(room).emit('sendTask', task)
        logger('connected', room)
    })

})



server.listen(port, () => {
    console.log('Server is listening on Port:' + port);
})