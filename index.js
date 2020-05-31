let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
io.on('connection', (socket) => {
 
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('set-name', (name) => {
    socket.username = name;
    io.emit('users-changed', {user: name, event: 'joined'});    
  });
  
  socket.on('send-message', (message) => {
    io.emit('message', {msg: message.text, user: socket.username, createdAt: new Date()});    
  });

  socket.on('error', function (err) {
    console.log('received error from client:', socket.id);
    console.log(err);
  });

});

var port = process.env.PORT || 3001;
 
server.listen(port, function(err){
  if (err) throw err
   console.log('listening in http://localhost:' + port);
});