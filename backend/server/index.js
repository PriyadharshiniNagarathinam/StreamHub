const socketIo = require('socket.io');
const http = require('http');
const app = require('./app');

const broadcasters = {};
const viewers = {};
const port = 3001;

const httpServer = http.createServer(app); // Create a server instance and use that to create a socket connection
// ensure that this http server is running in the port mentioned


//iceServers
const iceServers = [];
stunServerUrl = "stun:stun.l.google.com:19302";
iceServers.push({ urls: stunServerUrl });

//Socket io Connection
const io = socketIo(httpServer, {
    cors: {
        origin: "*",
        methods: "[GET, POST]"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('broadcaster', (broadcastID) => {
        handleBroadcaster(socket, broadcastID);
    });

    socket.on('viewer', (roomId, username) => {
        handleViewer(socket, roomId, username);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

function handleBroadcaster(socket, broadcastID) {
    if (!(broadcastID in broadcasters)) broadcasters[broadcastID] = {};
    broadcasters[broadcastID] = socket.id;
    sendToBroadcasterViewers(socket, broadcastID, 'broadcaster');
}

function handleViewer(socket, roomId, username) {
    if (!(socket.id in viewers)) viewers[socket.id] = {};
    viewers[socket.id]['roomId'] = roomId;
    viewers[socket.id]['username'] = username;

    console.log("Viewers");
    console.log(viewers);
    console.log(roomId);
    console.log(broadcasters);
    console.log(broadcasters[roomId]);
    socket.to(broadcasters[roomId]).emit('viewer', socket.id, iceServers, username);
}

function sendToBroadcasterViewers(socket, broadcastID, message) {
    // From Broadcaster socket emit to all viewers connected to a specified broadcaster.id
    for (let id in viewers) {
        if (viewers[id]['broadcastID'] == broadcastID) socket.to(id).emit(message);
    }
}

httpServer.listen(port, () => {
    console.log(`http://localhost:3001/`);
});
