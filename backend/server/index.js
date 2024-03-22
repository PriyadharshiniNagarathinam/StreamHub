require('dotenv').config();
const io = require('socket.io');
const http = require('http');
const app = require('./app');

let rooms = {};
let viewerCount = 0;
const port = 3001;

const httpServer = http.createServer(app); // Create a server instance and use that to create a socket connection
// ensure that this http server is running in the port mentioned

const ioServer = new io.Server(httpServer, {
    cors: {
        origin: '*',
    },
});

//Socket io Connection
ioServer.on('connection', (socket) => {
    viewerCount++;

    //gives the count of the number of connected clients
    console.log(ioServer.engine.clientsCount);
    console.log('a user connected. Total viewer count:', viewerCount);
    // socket.emit('viewer-count', viewerCount);

    socket.on('create-room', (roomName) => {
        rooms[roomName] = [];
        socket.join(roomName);
        console.log(rooms);
    });

    socket.on('join-room', (roomName, userId) => {
        if (rooms[roomName]) {
            rooms[roomName].push(userId);
            socket.join(roomName);
            console.log(rooms);
        }
        else {
            console.log('Room does not exist');
        }
    });

    //io.sockets.emit will send to all the clients

    // socket.broadcast.emit will send the message to all the other clients except the newly created connection
    socket.on('join-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-joined', streamerId);
    });

    socket.on('disconnect-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-disconnected', streamerId);
    });

    socket.on('get-stream', ({ roomName, viewerId }) => {
        console.log("get stream is running");
        console.log(roomName);
        socket.to(roomName).emit('viewer-connected', viewerId);
    });

});


httpServer.listen(port, () => {
    console.log(`http://localhost:3001/`);
});
