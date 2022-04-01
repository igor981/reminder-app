const express = require('express')
const { Socket } = require('socket.io')
const cors = require('cors')
const http = require('http');

const app = express();
const port = 3001;

app.use(cors)
const server = http.createServer(app)
const io = new Socket(server,)


app.get('/', (req, res) => {
    res.send('Hello world')
})



app.listen(port, () => {
    console.log('Server is listening on Port:' + port);
})