var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./app'));
app.get('/', function(req, res){
  res.sendFile('./index.html');
});

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/
/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/

/*io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});*/
io.on('connection', function(client) {
 console.log(client.id); 
});
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    console.log('server',from);
    var from = from;
    io.emit('chatMessage', from, msg);
    /*socket.on('disconnect', function(){
      console.log('disconnected_user',from);
    });*/
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
  

});

http.listen(3001, function(){
  console.log('listening on *:3001');
});