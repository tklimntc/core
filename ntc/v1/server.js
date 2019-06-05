var app = require('express')();
var http = require('http').Server(app);
var router = require('./router.js');
    router.init(app)
var io = require('socket.io')(http);
var mysql = require('mysql');
var key = require('./key.js')
var connection = mysql.createConnection(key);
var port=8000;
var defaultSelectionQuery = "";
io.on('connection', function(socket){
    console.log('socket connect : '+ socket.id);
    socket.on('connection', function(){
    });
    socket.on('disconnect', function(){
    });
    socket.on('firstData', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('firstData', results);
        }});
    });
    socket.on('data', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('data', results);
        }});
    });
    socket.on('getLastDataTime', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('getLastDataTime', results);
        }});
    });
    socket.on('getRowsBetweenDate', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('getRowsBetweenDate', results);
        }});
    });
    socket.on('nodename', function(msg){
        var truth = typeof(msg)!="undefined" && msg!=null
        if(typeof(msg)!="undefined" && msg!=null && msg.length > 6){
            var query = msg.substr(0,6)
            if(query=="SELECT" || query=="select"){
                connection.query("SELECT * FROM mobiusdb.nodename group by name order by name;", function (error, results, fields) { if (error) { console.log( error ) } else {
                    socket.emit('nodename', results);
                }});
            }
            if(query=="INSERT" || query=="insert" || query=="REPLACE" || query=="replace"){
                connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
                    connection.query("SELECT * FROM mobiusdb.nodename group by name order by name;", function (error, results, fields) {
                        if (error) { console.log( error ) } else {
                            socket.emit('nodename', results);
                    }});
                }});
            }
        }
        else{
            connection.query("SELECT * FROM mobiusdb.nodename group by name order by name;", function (error, results, fields) {
                if (error) { console.log( error ) } else {
                    socket.emit('nodename', results);
            }});
        }
    });
});
http.listen(port, function(){
    console.log('SERVER IS READY FOR [*:'+port+']');
});