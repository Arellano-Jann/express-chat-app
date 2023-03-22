const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // creates a socket.io server that listens to the http server
app.use(express.static(path.join(__dirname, 'public'))); // serves static files from the public folder

io.on('connection', (socket) => { // runs when client connects
    console.log('New WS connection...');
});

const PORT = 3000 || process.env.PORT; // uses 3000 as a default port unless there exists a preconfigured port environment variable
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));