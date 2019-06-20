/* 
// =========================================================
// server router javascript file
// =========================================================
*/
module.exports = function(app) {
					 app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client.html');});
					 app.get('/client', function(req, res) {
	res.sendFile(__dirname + '/client.html');});
					 app.get('/client.js', function(req, res) {
	res.sendFile(__dirname + '/client.js');});
					 app.get('/client.css', function(req, res) {
	res.sendFile(__dirname + '/client.css');});

					 app.get('/client_dictionary.js', function(req, res) {
	res.sendFile(__dirname + '/client_dictionary.js');});
					 app.get('/client_dictionary_kr.js', function(req, res) {
	res.sendFile(__dirname + '/client_dictionary_kr.js');});
					 app.get('/client_dictionary_en.js', function(req, res) {
	res.sendFile(__dirname + '/client_dictionary_en.js');});
					 app.get('/client_dictionary_symbol.js', function(req, res) {
	res.sendFile(__dirname + '/client_dictionary_symbol.js');});

					 app.get('/client_prepare_api.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_api.js');});
					 app.get('/client_prepare_html.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_html.js');});
					 app.get('/client_prepare_udf.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_udf.js');});
					 app.get('/client_prepare_event.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_event.js');});
					 app.get('/client_prepare_worker.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_worker.js');});
					 app.get('/client_prepare_sql.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_sql.js');});
					 app.get('/client_prepare_run.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_run.js');});
					 app.get('/client_prepare_global_value.js', function(req, res) {
	res.sendFile(__dirname + '/client_prepare_global_value.js');});

					 app.get('/favicon.ico', function(req, res) {
	res.sendFile(__dirname + '/favicon.ico');});
					 app.get('/logo.png', function(req, res) {
	res.sendFile(__dirname + '/logo.png');});
					 app.get('/logo_footer.png', function(req, res) {
	res.sendFile(__dirname + '/logo_footer.png');});
					 app.get('/stocks.csv', function(req, res) {
	res.sendFile(__dirname + '/stocks.csv');});
					 app.get('/data4.csv', function(req, res) {
	res.sendFile(__dirname + '/data4.csv');});
			
					 app.get('/jquery.js', function(req, res) {
	res.sendFile(__dirname + '/fw/jquery.js');});
					 app.get('/socket.io.js', function(req, res) {
	res.sendFile(__dirname + '/fw/socket.io.js');});
					 app.get('/nv.d3.css', function(req, res) {
	res.sendFile(__dirname + '/fw/nv.d3.css');});
					 app.get('/d3.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/d3.min.js');});
					 app.get('/d3.v3.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/d3.v3.min.js');});
					 app.get('/d3.v5.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/d3.v5.min.js');});
					 app.get('/nv.d3.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/nv.d3.min.js');});
					 app.get('/bootstrap.min.css', function(req, res) {
	res.sendFile(__dirname + '/fw/bootstrap.min.css');});
					 app.get('/popper.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/popper.min.js');});
					 app.get('/bootstrap.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/bootstrap.min.js');});
					 app.get('/bootstrap.bundle.min.js', function(req, res) {
	res.sendFile(__dirname + '/fw/bootstrap.bundle.min.js');});
};
