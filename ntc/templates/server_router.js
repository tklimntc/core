/* 
// =========================================================
// server router javascript file
// =========================================================
*/
module.exports=	function(app){
	app.get(				'/', function(req, res){
	res.sendFile(__dirname+ '/client.html');});
	app.get(				'/client', function(req, res){
	res.sendFile(__dirname+ '/client.html');});
	app.get(				'/client.js', function(req, res){
	res.sendFile(__dirname+ '/client.js');});
	app.get(				'/client_socket_connection.js', function(req, res){
	res.sendFile(__dirname+ '/client_socket_connection.js');});
	app.get(				'/client.css', function(req, res){
	res.sendFile(__dirname+ '/client.css');});
	app.get(				'/client_symbol.js', function(req, res){
	res.sendFile(__dirname+ '/client_symbol.js');});

	app.get(				'/client_prepare_html.js', function(req, res){
	res.sendFile(__dirname+ '/client_prepare_html.js');});
	app.get(				'/client_dom_control.js', function(req, res){
	res.sendFile(__dirname+ '/client_dom_control.js');});
	app.get(				'/client_event_control.js', function(req, res){
	res.sendFile(__dirname+ '/client_event_control.js');});
	app.get(				'/client_worker.js', function(req, res){
	res.sendFile(__dirname+ '/client_worker.js');});

	app.get(				'/client_dictionary.js', function(req, res){
	res.sendFile(__dirname+ '/client_dictionary.js');});
	app.get(				'/client_dictionary_kr.js', function(req, res){
	res.sendFile(__dirname+ '/client_dictionary_kr.js');});
	app.get(				'/client_dictionary_en.js', function(req, res){
	res.sendFile(__dirname+ '/client_dictionary_en.js');});

			
	app.get(				'/favicon.ico', function(req, res){
	res.sendFile(__dirname+ '/favicon.ico');});
	app.get(				'/logo.png', function(req, res){
	res.sendFile(__dirname+ '/logo.png');});
			
	app.get(					'/jquery.js', function(req, res){
	res.sendFile(__dirname + '/fw/jquery.js');});
	app.get(					'/socket.io.js', function(req, res){
	res.sendFile(__dirname + '/fw/socket.io.js');});
	app.get(					'/nv.d3.css', function(req, res){
	res.sendFile(__dirname + '/fw/nv.d3.css');});
	app.get(					'/d3.min.js', function(req, res){
	res.sendFile(__dirname + '/fw/d3.min.js');});
	app.get(					'/nv.d3.min.js', function(req, res){
	res.sendFile(__dirname + '/fw/nv.d3.min.js');});
	app.get(					'/bootstrap.min.css', function(req, res){
	res.sendFile(__dirname + '/fw/bootstrap.min.css');});
	app.get(					'/popper.min.js', function(req, res){
	res.sendFile(__dirname + '/fw/popper.min.js');});
	app.get(					'/bootstrap.min.js', function(req, res){
	res.sendFile(__dirname + '/fw/bootstrap.min.js');});
	app.get(					'/bootstrap.bundle.min.js', function(req, res){
	res.sendFile(__dirname + '/fw/bootstrap.bundle.min.js');});

}








