const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const api = require('./server/routes/api');
const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

let numberOfOnlineUsers = 0;
let users = [];
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {

  socket.on('login', (user) => {
    numberOfOnlineUsers++;
    users.push(user)
    io.emit('numberOfLoginUsers', [numberOfOnlineUsers,users]);
    console.log('New user connected');
    console.log(user);
});

  socket.on('logout', (user) => {
      numberOfOnlineUsers--;
      const index = users.indexOf(user);
      if (index !== -1) {
        users.splice(index, 1);
    }
      io.emit('numberOfLogoutUsers', [numberOfOnlineUsers,users]);
      console.log('User disconnected');
  });

  socket.on('message',(msgDetails) => {
    io.emit('recieveMessage', msgDetails);
    console.log('message sent');
    console.log(msgDetails);
  });

});

server.listen(port, function(){
    console.log("Server running on localhost:" + port);
});