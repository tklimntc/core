var app = require('express')();
var http = require('http').Server(app);
var router = require('./router.js');
    router.init(app)
var io = require('socket.io')(http);
var mysql = require('mysql');
var key = require('./key.js')
var connection = mysql.createConnection(key);
var port=80;
io.on('connection', function(socket){
    console.log('socket connect : '+ socket.id);
    socket.on('connection', function(){
    });
    socket.on('disconnect', function(){
    });
    socket.on('firstData', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) {
            if (error) throw error;
            // connected!
            socket.emit('firstData', results);
        });
    });
    socket.on('data', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) {
            if (error) throw error;
            // connected!
            socket.emit('data', results);
        });
    });
    socket.on('nodeConfig', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) {
            if (error) throw error;
            // connected!
            socket.emit('nodeConfig', results);
        });
    });
});
http.listen(port, function(){
    console.log('SERVER IS READY FOR [*:'+port+']');
});