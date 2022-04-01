import express from 'express';
import { Socket } from 'socket.io';
import {config} from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import authRouter from './routes/auth.routes'
config()
mongoose.connect(process.env.MONGOOSE_CONNECT || '')
const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:3000"
};
const app = express();
const port = 3001;
  
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)


const server = http.createServer(app)
//const io = new Socket(server,)



app.listen(port, () => {
    console.log('Server is listening on Port:' + port);
})