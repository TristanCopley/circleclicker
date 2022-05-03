// Add packages and create server
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io"); // Socket.io setup for when we do the photoboard page after student photo submission
const path = require("path");
const hostname =  'localhost';
const io = new Server(server);

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Server start
app.listen(port, () => {

    console.log(`Photoboard server listening on http://${hostname}:${port}`)

})

// Error detection
server.on('error', (error) => {

    // handle specific listen errors with friendly messages
    switch (error.code) {

        case 'EACCES':
            console.error('Port: ' + port + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error('Port: ' + port + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;

    }

});