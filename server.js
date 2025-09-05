const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET","POST"] }
});

io.on('connection', (socket) => {
    console.log('Korisnik povezan:', socket.id);
    socket.on('sendMessage', (data) => {
        io.emit('receiveMessage', data);
    });
    socket.on('disconnect', () => {
        console.log('Korisnik disconnect:', socket.id);
    });
});

app.get('/', (req,res) => res.send('Backend Connexta radi!'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
