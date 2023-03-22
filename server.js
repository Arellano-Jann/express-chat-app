const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // creates a socket.io server that listens to the http server
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from the public folder

const botName = 'Bot';

io.on('connection', (socket) => { // runs when client connects
    console.log('New WS connection...');
    
    socket.emit('message', formatMessage(botName, 'Welcome to the chat app!')); // emits an event to the client/user
    socket.broadcast.emit('message', formatMessage(botName, 'A user has fucking joined.')); // emits an event to all clients/users except the one that is connected
    // io.emit(); // emits an event to all clients/users

    socket.on('disconnect', () => { // listens for a disconnect event
        io.emit('message', formatMessage(botName, 'A user has left the fucking chat.')); // to run an emit notifying all users
        console.log('Closing WS connection...')
    })

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });

});

const PORT = 3000 || process.env.PORT; // uses 3000 as a default port unless there exists a preconfigured port environment variable
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));