const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers }= require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // creates a socket.io server that listens to the http server
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from the public folder

const botName = 'Bot';

io.on('connection', (socket) => { // runs when client connects
    console.log('New WS connection...');
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room); // socket joins a room that the user has specified. the socket can be thought of as a "user" but abstracted

        socket.emit('message', formatMessage(botName, 'Welcome to the chat app!')); // emits an event to the client/user
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has fucking joined.`)); // emits an event to all clients/users IN A SPECIFIC ROOM/PLACE except the one that is connected
        
        // socket.broadcast.emit('message', formatMessage(botName, 'A user has fucking joined.')); // emits an event to all clients/users except the one that is connected
        // io.emit(); // emits an event to all clients/users

        io.to(user.room).emit('roomUsers', { // sends room info. updates room info when someone joins
            room: user.room,
            users: getRoomUsers(user.room)
        });
        
    });
    
    // he put this outside of the join room for some reason idk why. it might break if this is inside of the joinRoom somehow but we'll see idk. it might also be because of the "on" event listener
    socket.on('chatMessage', (msg) => { // listens for a chatMessage event from main.js that comes from the page
        const user = getCurrentUser(socket.id); // gets the user connected to the socket
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
    
    socket.on('disconnect', () => { // listens for a disconnect event
        const user = userLeave(socket.id); // gets the user connected to the socket

        if (user){ // if user exists. don't really know why this is tbh but eh.
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has fucking left.`)); // to run an emit notifying all users
            
            io.to(user.room).emit('roomUsers', { // sends room info. updates room info when someone leaves (identical to the joining counterpart)
                room: user.room,
                users: getRoomUsers(user.room)
            });

            console.log('Closing WS connection...')
        }
    });

});

const PORT = 3000 || process.env.PORT; // uses 3000 as a default port unless there exists a preconfigured port environment variable
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));