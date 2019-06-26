/* 
// =========================================================
// client prepare run code file
// =========================================================
*/
/* global socket */
try{
    socket.emit('req_node_list','');
}catch(e){document.location.reload()}