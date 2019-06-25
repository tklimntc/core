/* 
// =========================================================
// client socket connection javascript file
// =========================================================
*/
/* global io */
/* global node_list_release */
/* global udf_res_search_data */
/* global udf_init */
// default api base construction
var socket = io();

// for debugging, finally deleted.  
socket.on('test',function(res){  }); // for debugging, will be deleted.
socket.on('reconnect',function(){ location.reload() });
// 1. list data fetch
socket.on('res_node_list',function(res){  udf_init(res) });

// 2. stakc data fetch
socket.on('res_search_data',function(res){  udf_res_search_data(res) });
socket.on('res_update_data',function(res){  udf_res_update_data(res) });
socket.on('res_last_date',function(res){  udf_set_last_date(res) });