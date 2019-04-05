var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var key = {
  host     : 'i.p.add.ress',
  user     : 'root',
  password : 'password'
}
var key = require('./key.js')
var connection = mysql.createConnection(key);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
});
app.get('/jquery.js', function(req, res){
    res.sendFile(__dirname + '/jquery.js');
});
app.get('/socket.io.js', function(req, res){
    res.sendFile(__dirname + '/socket.io.js');
});
app.get('/nv.d3.css', function(req, res){
    res.sendFile(__dirname + '/nv.d3.css');
});
app.get('/d3.min.js', function(req, res){
    res.sendFile(__dirname + '/d3.min.js');
});
app.get('/nv.d3.min.js', function(req, res){
    res.sendFile(__dirname + '/nv.d3.min.js');
});
app.get('/bootstrap.min.css', function(req, res){
    res.sendFile(__dirname + '/bootstrap.min.css');
});
app.get('/popper.min.js', function(req, res){
    res.sendFile(__dirname + '/popper.min.js');
});
app.get('/bootstrap.min.js', function(req, res){
    res.sendFile(__dirname + '/bootstrap.min.js');
});
port=8888
io.on('connection', function(socket){
    console.log('socket connect : '+ socket.id);
    socket.on('connection', function(){
    });
    socket.on('disconnect', function(){
    });
    socket.on('data', function(msg){
        // to do when data requested
        connection.query(msg, function (error, results, fields) {
            if (error) throw error;
            // connected!
            socket.emit('data', results);
        });
    });
});
http.listen(port, function(){
    console.log('SERVER IS READY FOR [*:'+port+']');
});