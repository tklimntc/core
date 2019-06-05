/* 
// =========================================================
// server api of socket.io connection javascript file
// =========================================================
*/
// socket reqirement acception
module.exports=function(io, connection, sql){ io.on('connection', function(socket){ console.log('socket connect : '+ socket.id);
    socket.on('connection', function(){
    });
    socket.on('disconnect', function(){
    });
    socket.on('test', function(msg){    // for debugging, will be deleted.
        socket.emit('test',eval(msg));  // for debugging, will be deleted.
    });                                 // for debugging, will be deleted.
    socket.on('req', function(msg){
        connection.query(msg, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('res', results);
        }});
    });
    socket.on('req_node_list', function(msg){
        connection.query(sql.node_list, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('res_node_list', results);
        }});
    });
    socket.on('req_search_data', function(msg){
        console.log(msg)
        connection.query(msg.sql, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('res_search_data', {id:msg.id,res:results});
        }});
    });
});};