/* 
// =========================================================
// client socket connection javascript file
// =========================================================
*/
/* global io */
/* global node_list_release */

// default api base construction
var socket = io();

// 1. data fetch
socket.on('res_node_list',function(res){ udf_init(res) });

// for debugging, finally deleted.  
socket.on('test',function(res){ console.log(res); }); // for debugging, will be deleted.