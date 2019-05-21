/* 
// =========================================================
// client socket connection javascript file
// =========================================================
*/
/* global io */
/* global node_list_release */
var socket = io();
// 1. data fetch
socket.emit('req_node_list','');
socket.on('res_node_list',function(res){ node_list_release(res) });
// for debugging, finally deleted.  // for debugging, will be deleted.
socket.on('test',function(res){     // for debugging, will be deleted.
    console.log(res);               // for debugging, will be deleted.
});                                 // for debugging, will be deleted.