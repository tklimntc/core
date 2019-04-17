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
    socket.on('firstData', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            // connected!
            socket.emit('firstData', results);
        }});
    });
    socket.on('data', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            // connected!
            socket.emit('data', results);
        }});
    });
    socket.on('getLastDataTime', function(msg){
        // prevent crakin
        // to do when data requested
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            // connected!
            socket.emit('getLastDataTime', results);
        }});
    });
    socket.on('nodename', function(msg){
        var truth = typeof(msg)!="undefined" && msg!=null
        // console.log(msg)
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