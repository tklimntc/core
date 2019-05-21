/* 
// =========================================================
// server javascript file
// =========================================================
*/
// minimized server
var port=80;
var app = require('express')();
var http = require('http').Server(app);
require('./server_router.js')(app);
require('./server_api.js')(require('socket.io')(http), require('mysql').createConnection(require('./server_key.js')), require('./server_query.js'));
http.listen(port, function(){ console.log('SERVER IS READY FOR [*:'+port+']'); });

// default web server environment construction
// var app = require('express')();
// var http = require('http').Server(app);

// router
// var router = require('./server_router.js');
//     router(app);
// router minimize
// require('./server_router.js')(app);

// database management system connection
// var mysql = require('mysql');
// var key = require('./newk.js');
// var connection = mysql.createConnection(key);
// database management system connection minimize replaced by socket.io contruction minimize
// var connection = require('mysql').createConnection(require('./server_key.js'));

// prepared sql statement with replacable preserved words replaced by socket.io contruction minimize
// var sql = require('./server_query.js');

// socket.io construction replaced by socket.io contruction minimize
// var io = require('socket.io')(http);
// var socket = require('./server_api.js');
//     socket(io, connection, sql);

// socket.io construction minimize with socket.io construction
// socket(io, connection, sql)
// require('./server_api.js')(require('socket.io')(http), require('mysql').createConnection(require('./server_key.js')), require('./server_query.js'));

// server deployment
// var port=80;
// http.listen(port, function(){ console.log('SERVER IS READY FOR [*:'+port+']'); });