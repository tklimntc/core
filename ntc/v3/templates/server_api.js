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
    socket.on('reconnect', function(){
        socket.emit('reconnect');
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
            console.log(results[0])
            socket.emit('res_search_data', {id:msg.id,res:results,sql:msg.sql});
        }});
    });
    socket.on('req_update_data', function(msg){
        console.log(msg)
        connection.query(msg.sql, function (error, results, fields) { if (error) { console.log( error ) } else {
            console.log(results[0])
            socket.emit('res_update_data', {id:msg.id,res:results,sql:msg.sql});
        }});
    });
    socket.on('get_last_date', function(msg){
        connection.query(sql.get_time_top, function (error, results, fields) { if (error) { console.log( error ) } else {
            socket.emit('res_last_date', results);
        }});
    });
});};