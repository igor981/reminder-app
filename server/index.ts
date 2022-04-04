import express from 'express';
import { Server, Socket } from 'socket.io';
import {config} from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes'
import reminderRouter from './routes/reminder.routes'
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
        console.log('user connected' + data);
        
        return 'testing io'
    })

})



server.listen(port, () => {
    console.log('Server is listening on Port:' + port);
})