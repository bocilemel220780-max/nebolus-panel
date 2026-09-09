const express = require('express');
const { Server } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

let controller = null;
let targets = [];

wss.on('connection', (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const role = urlParams.get('role');

    if (role === 'controller') {
        controller = ws;
        console.log('Panel Controller terhubung.');
    } else if (role === 'target') {
        targets.push(ws);
        console.log('Target baru terhubung.');
    }

    ws.on('message', (message) => {
        if (role === 'target' && controller && controller.readyState === ws.OPEN) {
            controller.send(message.toString());
        }
    });

    ws.on('close', () => {
        if (role === 'controller') {
            controller = null;
            console.log('Controller terputus.');
        } else if (role === 'target') {
            targets = targets.filter(t => t !== ws);
            console.log('Target terputus.');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Railway WebSocket Server Aktif!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
