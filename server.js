require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

// Socket.io connection for real-time chat
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    // Example: on joining a room
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);

        // Welcome current user
        socket.emit('message', 'Welcome to the chat!');

        // Broadcast when a user connects
        socket.broadcast.to(room).emit('message', `${username} has joined the chat`);

        // Runs when client disconnects
        socket.on('disconnect', () => {
            io.to(room).emit('message', `${username} has left the chat`);
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.to(socket.room).emit('message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
