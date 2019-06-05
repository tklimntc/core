var app = require('express')();
var http = require('http').Server(app);
var router = require('./router.js');
    router.init(app)
var io = require('socket.io')(http);
var mysql = require('mysql');
var key = require('./key.js')
var connection = mysql.createConnection(key);
var port=80;
var defaultSelectionQuery = "";
io.on('connection', function(socket){
    console.log('socket connect : '+ socket.id);
    socket.on('connection', function(){
    });
    socket.on('disconnect', function(){
    });

    socket.on('req', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('res', results);
        }});
    });



});
http.listen(port, function(){
    console.log('SERVER IS READY FOR [*:'+port+']');
});