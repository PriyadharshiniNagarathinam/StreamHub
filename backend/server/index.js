require('dotenv').config();
const io = require('socket.io');
const http = require('http');
const app = require('./app');
const collection = require('./db/connect').db('StreamHub').collection('liveVideos');


let rooms = {};
const port = 3001;

const httpServer = http.createServer(app); // Create a server instance and use that to create a socket connection
// ensure that this http server is running in the port mentioned

httpServer.listen(port, () => {
    console.log(`http://localhost:3001/`);
});

const ioServer = new io.Server(httpServer, {
    cors: {
        origin: '*',
    },
});

//Socket io Connection
ioServer.on('connection', (socket) => {

    socket.on('create-room', (liveID) => {
        roomName = liveID;
        rooms[roomName] = [];
        socket.join(roomName);
        console.log(rooms);
        ioServer.emit('room-created');
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

    socket.on('get-stream', ({ roomName, viewerId }) => {
        console.log("get stream is running");
        console.log(roomName);
        socket.to(roomName).emit('viewer-connected', viewerId);
    });

    socket.on('end-live', (roomName) => {
        ioServer.emit('room-closed', roomName);
        socket.to(roomName).emit('end-live');
        socket.leave(roomName);
    });

    socket.on('videoUploaded', () => {
        ioServer.emit('video-uploaded');
    });

});

